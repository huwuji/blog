/**
 * babel插件
 * 实现按需引入import
 * 如 import {A } from '@utils';--->import A from '@utils/A'
 */

const myBabelPluginImport = function (babel) {
  const { types, template } = babel;
  console.log('myBabelPluginImport===');
  return {
    visitor: {
      ImportDeclaration(path, state) {
        // 每个函数都会接收两个参数 path state
        const {
          opts: { libraryName, alias },
        } = state;
        // console.log('000000===', libraryName, alias, path.node.source.value);
        // 判断如果不是我们的指定的包名就return 不用处理
        if (!types.isStringLiteral(path.node.source, { value: libraryName })) return;
        // 匹配到我们的包名，做自己的逻辑：替换节点
        // 生成节点
        const newImports = path.node.specifiers.map(item => {
          return types.importDeclaration(
            [types.importDefaultSpecifier(item.local)],
            types.stringLiteral(`${alias}/${item.local.name}`),
          );
        });
        // 替换节点
        path.replaceWithMultiple(newImports);
      },
    },
  };
};

module.exports = myBabelPluginImport;
