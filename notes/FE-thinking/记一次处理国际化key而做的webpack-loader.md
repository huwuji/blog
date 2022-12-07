## 记一次处理国际化 key 而做的 webpack-loader

### 目的：

找出源码中关于国际化的 key，后面与国际化配置文件比较，查缺补录，同时去掉国际化文件中多余的 key，减小体积；

### 思路：

1. 通过 webpack 的 loader 实现，在静态编译时查出 key，同时去除被注释的无用 key；
   缺点：对于复杂的调用，处理起来比较麻烦，后面实现时会将到，本文也没有实现对各种复杂情况的处理；

2. 通过字符串匹配---针对与处理国际化配置文件的多余 key(及 key 值为被源码使用)
   如普通情况匹配`_t("aaa")`
   通过我们的国际化 key 会比较多；直接这里有一个比较巧妙的方式:
   先逐个文件处理普通模式`_t("aaa")`，收集后，用国际化配置文件**减去**收集的普通 key，剩下的需要确认的 key 就不多了。
   如：
   剩余=国际化配置文件(all)-收集的普通 key(大多数)；
   对于这部分剩余的 key,可以再次遍历文件查找每个文件是否有匹配这些 key（字符串匹配）；
   这中方式下面不具体实现；

### 实现：

loader.js 如下：

```
/**
 * 处理_t('aaa')与_tHTML('bbb')
 * 中没有存在于多语配置文件中的key
 *
 * 思路：
 * 在线查看 ast生成的结构。https://astexplorer.net/
 * 1. 确定要针对处理的几种类型，主要针对第一个参数。
 *  - 字面量(一般类型)：_t('aaa'); ---对应ast判断：arguments[0].type: "Literal"||"StringLiteral";
 *  - 标识符：const a='aaa';_t(a);  ---对应ast判断：arguments[0].type: "Identifier"||"ObjectExpression";
 *  - todo:表达式&标识符：_t(true?a:'bbb');---对应ast判断：arguments[0].type: "ConditionalExpression";
 *
 * 2. 针对以上三种类型在[astexplorer](https://astexplorer.net/)中查看结构
 * 3. 针对结构做逻辑处理
 */
const babel = require("@babel/core");
const fs = require("fs");

const keys = [];

function i18nLoader(source) {
  // 收集的变量
  let variableMap = new Map();
  // 特殊形式变量
  let identifierKeys = new Set();

  const parsedAst = babel.parse(source, {
    sourceType: "module",
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      ["@babel/plugin-proposal-class-properties"],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  });
  babel.traverse(parsedAst, {
    // VariableDeclarator是收集标识符
    VariableDeclarator: ({ node = {} }) => {
      const _id = node.id.name;
      console.log(
        "VariableDeclarator---_id==",
        _id,
        node.init.type,
        node.init.value
      );

      // todo 这里还有好多情况
      if (node.init && node.init.type === "StringLiteral") {
        console.error("正常==", _id);

        variableMap.set(_id, node.init.value);
      } else {
        console.error("_id 异常==", _id);
      }
    },
    CallExpression: ({ node }) => {
      if (node.callee.name === "_t" || node.callee.name === "_tHTML") {
        // 这里要区分_t方法的第一个参数的类型
        const argType = node.arguments[0].type || "";
        let consequent = node.arguments[0].consequent;
        let alternate = node.arguments[0].alternate;
        switch (argType) {
          case "StringLiteral": //Literal
            if (node.arguments[0].value) keys.push(node.arguments[0].value);
            break;
          case "Identifier":
            // todo
            // 收集标识符
            node.arguments[0].name &&
              identifierKeys.add(node.arguments[0].name);
            break;
          case "ConditionalExpression":
            if (consequent.type === "Literal") {
              keys.push(consequent.value);
            } else if (consequent.type === "Identifier") {
              // todo
            }
            if (alternate.type === "Literal") {
              keys.push(alternate.value);
            }
            break;
          default:
            console.error("参数类型属于特殊类型");
            return;
        }
      }
    },
  });
  // console.log("identifierKeys==", identifierKeys, variableMap);
  // 对收集的特殊类型的变量，找出其值

  for (const _key of identifierKeys) {
    if (variableMap.has(_key)) {
      keys.push(variableMap.get(_key));
    }
  }

  fs.writeFileSync("./i18n-keys.json", JSON.stringify(keys));
  return source;
}

module.exports = i18nLoader;
```

webpack-chain 配置本地 loader 如下：

```
chainWebpack(config){
  config.module
  .rule('i18n')
  .test(/\/src(.*)\.js$/) //--匹配要处理的文件
  .include
  .add(path.resolve(__dirname,'src'))
  .end()
  .use('i18n-loader.js')
  .loader('./loader.js') //--具体loader文件地址
}

```

{
test: /\.js$/,
use: [
"replace-loader",
{
loader: "replace-loader-async",
options: {
name: "loaderName",
},
},
],
},

webpack config 配置本地 loader 如下

```
 module: {
    rules: [
    {
      test:/\/src(.*)\.js$/,
      use: path.resolve(__dirname, 'loader.js'),
      include: [path.resolve(__dirname,'src')],
    }
  ]
}
```
