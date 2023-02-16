### JS 基础

1. 遍历

- 对于遍历的方式
- for 遍历的是数组下标，可枚举类型的下标,可中断或跳过
- for Each 遍历的是可枚举类型，回调参数可以是 key，也可以是值，还可以是整个对象，三元的；但是它不可以中断或跳过，例如不能通过 return，break 等中断
- for of 遍历数组的值，
- map callback(element,key,array)--》三元
- filter
- find
- findIndex
- every
- some
- redece callback, default//// [1,2,3].reduce((total,cur)=>,total+cur)
-
-
-
- for in 遍历 key,(不一样的是这里是遍历数组对象的所有可枚举属性，包括原型中的可枚举属性，可以通过 Object.hasOwnProperty.call(数组对象，key))
- Object.keys
- Object.values
- Object.entries
- Object.getOwnPropertyNames

2. 位运算 !!!
   原码，反码，补码

3. Js 内置对象

   > https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects

4. undeclared

   > https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Not_defined  
   > https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Undeclared_var

5. undefined
   因为它不是一个关键字，而是一个标识符，所以可以被当作变量来使用和赋值；
   **按惯例我们用 void 0 来获得 undefined 最为安全**

6. Object.getPrototypeOf()方法替代`__proty__`来查找原型和 x.constructor.prototype

7. 判断一个数是不是有穷的，可以使用 isFinite 函数

8. js 整数的安全范围：
   能够被“安全”呈现的最大整数是 2^53 - 1，
   即 9007199254740991，在 ES6 中被定义为 Number.MAX_SAFE_INTEGER。最小整数是-9007199254740991，在 ES6 中
   被定义为 Number.MIN_SAFE_INTEGER。

9. NaN :
   意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出
   数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。  
    typeof NaN; // "number"  
    NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN
   为 true。

   isNaN:
   函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会
   返回 true ，会影响 NaN 的判断。

   Number.isNaN:
   函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为
   准确。

10. **类型系统**

    > ECMAScript 是一个语言标准，JavaScript 就是 ECMAScript 的一个实现：
    > 规则之一：如果 Type(lprim) 和 Type(rprim) 中有一个是 String，则：a. 把 ToString(lprim) 的结果赋给左字符串 (lstr)；b. 把 ToString(rprim) 的结果赋给右字符串 (rstr)；c. 返回左字符串 (lstr) 和右字符串 (rstr) 拼接的字符串。

    > 1+"2"的计算转换流程如下: V8 会提供了一个 ToPrimitive 方法，其作用是将 a 和 b 转换为原生数据类型，其转换流程如下：先检测该对象中是否存在 valueOf 方法，如果有并返回了原始类型，那么就使用该值进行强制类型转换；如果 valueOf 没有返回原始类型，那么就使用 toString 方法的返回值；如果 vauleOf 和 toString 两个方法都不返回基本类型值，便会触发一个 TypeError 的错误。

    - 其他值转字符串
      规范的 9.8 节中定义了抽象操作 ToString ，它负责处理非字符串到字符串的强制类型转换。
      （1）Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
      （2）Boolean 类型，true 转换为 "true"，false 转换为 "false"。
      （3）Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
      （4）Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
      （5）对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）
      来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会
      调用该方法并使用其返回值。
      复制代码

    - 它值转数字
      有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作 ToNumber。
      （1）Undefined 类型的值转换为 NaN。
      （2）Null 类型的值转换为 0。
      （3）Boolean 类型的值，true 转换为 1，false 转换为 0。
      （4）String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
      （5）Symbol 类型的值不能转换为数字，会报错。
      （6）对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。
      为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。
      如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。
      > var a={};+a //是 NaN
      > var a=[];+a//0
    - 它值转布尔
      ES5 规范 9.2 节中定义了抽象操作 ToBoolean，列举了布尔强制类型转换所有可能出现的结果。
      以下这些是假值：
      • undefined
      • null
      • false
      • +0、-0 和 NaN
      • ""
      假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

> {} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"
> [] 的 valueOf 结果为 [] ，toString 的结果为 ""

> == 操作符的强制类型转换规则？
> （1）字符串和数字之间的相等比较，将字符串转换为数字之后再进行比较。
> （2）其他类型和布尔类型之间的相等比较，先将布尔值转换为数字后，再应用其他规则进行比较。
> （3）null 和 undefined 之间的相等比较，结果为真。其他值和它们进行比较都返回假值。
> （4）对象和非对象之间的相等比较，对象先调用 ToPrimitive 抽象操作后，再进行比较。
> （5）如果一个操作值为 NaN ，则相等比较返回 false（ NaN 本身也不等于 NaN ）。
> （6）如果两个操作值都是对象，则比较它们是不是指向同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true，否则，返回 false。

> **解析允许字符串（如 parseInt() ）中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换（如 Number ()）不允许出现非数字字符，否则会失败并返回 NaN。**

11. 假值对象???
    浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来值，这些就是“假值对象”。假值对象看起来和
    普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 最常见的例子是 document.all，它
    是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供给 JavaScript 程序使用。
    复制代码

12. 正则表达式--????

    > 匹配日期，如 yyyy-mm-dd 格式:
    > var regrxp=/^[0-9]{4}-(0[1-9]|1[0-2])-(0[0-9]|[12][0-9]|3[0-1])$/
    > 手机号码正则:
    > var regexp=/^1[34567]\d{9}$/g
    > 用户名正则：??
    > var regexp=//

    > ?= 先行断言

13. Js 创建对象的方式

    - 字面量创建
    - 构造函数创建 new XXX()
    - Object.create()

14. Js 实现继承的方式 !!!

    - 原型继承：利用 prototype 来实现继承

      - 原型链继承
      - 原型式继承

    - 构造函数继承：顾名思义是利用父函数的构造函数继承，目的是继承属性

    - 组合继承：一种组合原型和构造函数的继承的方式，目的是让继承更合理；

    - 寄生式继承：一种依赖于原型式继承，在此基础上新增属性和方法，以增强函数；

    - ES6 继承：
      ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

> ES5/ES6 的继承除了写法以外还有什么区别？ https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20

> ES6 constructor 的 supe 关键字： super 代表的是父类构造函数，但是返回的是子类的实例。比如 A 是 B 的父类，那么 super 的功能相当于 A.prototype.constructor.call(this)。
>
> - super 在 JavaScript 中，super 指的是父类（即超类）的构造函数
> - super 在调用父类的构造函数之前（及 super），你是不能在 constructor 中使用 this 关键字的。JavaScript 不允许这个行为。

```
/**
 * 继承--访问所继承对象的属性；
 * 属性包括：
 * 1）能访问原型链上的原型属性
 * 2）访问其自身的属性
 */
function Father(firstName) {
  this.firstName = firstName || "z";
}

// 原型链继承--继承的是实例
function Son() {}
Son.prototype = new Father("z");

// 原型式继承--继承的是原型
function objectCreate(object) {
  function fn() {}
  fn.prototype = object;
  return fn();
}

// 构造函数继承--继承的是属性
function Son() {
  Father.call(this, ...arguments);
}

// 组合式继承--组合原型继承和构造函数继承
function Son() {
  Father.call(this, ...arguments);
}
Son.prototype = Father.prototype;
Son.prototype.constructor = Son;

```

15. 浏览器事件/DOM0/DOM2/ IE 事件

16. instanceOf
    根据原型链，一层层查找

```
function _instanceof(left, right) {
  let result = false;
  let leftProto = Object.getPrototypeOf();
  const prototype = Object.getPrototypeOf();
  while (leftProto) {
    if (leftProto === prototype) {
      result = true;
      return;
    }
    leftProto = Object.getPrototypeOf();
  }
  return result;
}
```

17. new 和其他涉及 this 的函数

```
// 以某个构建函数的原型为基础，构建一个新的对象;
function _new(base) {
  //   const obj = Object.create(base.prototype);
  const obj = {};
  obj.__proto__ = base.prototype;
  const newObj = base.apply(obj);
  return typeof newObj === "object" ? newObj : obj;
}
```

```
// apply
//  a.apply(this)
// 改变this，执行
// 及在this['key']=a;this['key']的方式调用

function _apply(left, right) {
  const obj = right;
  const key = Symbol("rightKey");
  obj[key] = left;
  const params = Array.prototype.slice.call(arguments, 2, 3);
  const result = obj[key]([...params]);
  delete obj[key];
  return result;
}

// bind
// fn.bind(obj)
function _bind(left, right) {
  const param1 = Array.prototype.slice.call(arguments, 2);
  return function () {
    return Function.prototype.apply.call(
      left,
      right,
      Array.prototype.concat.call(param1, [...arguments])
    );
  };
}

// a.bind
function _bind(context) {
  const self = this;
  const params = Array.prototype.slice.call(arguments, 1);
  return function () {
    Function.prototype.apply.call(self, context, params.concat([...arguments]));
  };
}
```

18. 查找对象的自身属性
    利用 Object.prototype.hasOwnProperty

```
//  查找自身属性
function _getProperty() {
  const self = this;
  const result = [];
  for (const key in self) {
    if (Object.hasOwnProperty.call(self, key)) {
      const element = self[key];
      result.push(element);
    }
  }
  return result;
}
```

19. ES6 模块与 CommonJS 模块、AMD、CMD 的差异：

    - 1.CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
    - 2.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。CommonJS 模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

20. requireJS 的核心原理是什么？
    require.js 的核心原理是通过动态创建 script 脚本来异步引入模块，然后对每个脚本的 load 事件进行监听，如果每个脚本都加载完成了，再调用回调函数。

21. !!!怎么实现一个模块加载器？

    > 参考：https://github.com/huwuji/blog/tree/master/Demo/simple-webpack 中 lib/compiler.js 的实现

22. JavaScript 类数组对象的定义
    一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。
    常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。

    > 通过 Array.from 方法来实现转换成数组

23. 稀疏数组--[,,,]
    带有间隙的数组叫做稀疏数组（密致数组没有间隙）。稀疏数组的长度为逗号的数
    量。

24. 如何编写高性能的 Javascript ？

    - 利用 V8 隐藏类的特性，创建对象后，尽量不要做类型修改，以及增删，避免重新创建隐藏类；
    - 使用位运算代替一些简单的四则运算；
    - 多利用缓存；

25. V8 垃圾回收：
    主要分为： 新生代和老生代；

    新生代对象晋升到老生代有两个条件：
    （1）第一个是判断是对象否已经经过一次 Scavenge 回收。若经历过，则将对象从 From 空间复制到老生代中；若没有经历，则复制到 To 空间。

    （2）第二个是 To 空间的内存使用占比是否超过限制。当对象从 From 空间复制到 To 空间时，若 To 空间使用超过 25%，则对象直接晋升到老生代中。设置 25% 的原因主要是因为算法结束后，两个空间结束后会交换位置，如果 To 空间的内存太小，会影响后续的内存分配。

    老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。

    由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。 为了解决这个问题 V8 引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完一小步就让运行逻辑执行一会，就这样交替运行。

26. 哪些操作会造成内存泄漏？

    - 意外的全局变量
    - 被遗忘的计时器或回调函数
    - 脱离 DOM 的引用：获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。
    - 不合理的闭包 ：不合理的使用闭包，从而导致某些变量一直被留在内存当中。

27. 节流--throttle  
    1.利用闭包保存私有变量；  
     2.每次执行间隔至少 await(一段)时间

```
function throttle(cb, await) {
 let preTime = Date.now();
 return function () {
   let nowTime = Date.now();
   if (nowTime - preTime < await) {
     return;
   }
   return cb.apply(this, [...arguments]);
 };
}
```

28. 防抖 -- debounce

1.每次延迟 delay 时间执行；  
2.延迟时间内，每次有新的调用，清除上一次的定时器；

```
function debounce(cb, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      timer = setTimeout(() => {
        return cb.apply(this, [...arguments]);
      }, delay);
    }
  };
}
```

29. Object.is() 与原来的比较操作符 “===”、“==” 的区别？
    两等号判等，会在比较时进行类型转换。
    三等号判等（判断严格），比较时不进行隐式类型转换，（类型不同则会返回 false）；

    Object.is 在三等号判等的基础上特别处理了 NaN 、-0 和 +0 ，保证 -0 和 +0 不再相同，但 Object.is(NaN, NaN) 会返回 true.

    Object.is 应被认为有其特殊的用途，而不能用它认为它比其它的相等对比更宽松或严格。
    复制代码

30. encodeURI 和 encodeURIComponent
    encodeURI 是对整个 URI 编码的，它对输入的 URL 的格式有要求，并且它会对一些字符不会编码（不会编码的字符比 encodeURIComponent 多）；
    如 encodeURI 方法不会对下列字符编码： ASCII 字母，数字，~!@#$&()=:/,;?+'

    encodeURIComponent 是对 URI 部分进行编码的，它对输入的字符不会严格要求，并且它的编码范围更广；不会对下列字符编码 ASCII 字母，数字， ~!()'

    所以：encodeURIComponent 更适用于对 URL 的 params 参数部分编码；

31. Unicode 和 UTF-8

    > Unicode 只是一个符号集，它只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储。
    > UTF-8 是 Unicode 的实现方式之一；它规定了存储的方式；
    > UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用 1~4 个字节表示一个符号，根据不同的符号而变化字节长度。
    > UTF-16（字符用两个字节或四个字节表示）和 UTF-32（字符用四个字节表示）

    > UTF-8 的编码规则很简单，只有二条：
    > 1）对于单字节的符号，字节的第一位设为 0，后面 7 位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。
    > 2）对于 n 字节的符号（n > 1），第一个字节的前 n 位都设为 1，第 n + 1 位设为 0，后面字节的前两位一律设为 10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。

    > https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html

32. js 中的深浅拷贝实现？
    浅拷贝

```
function shallowCopy(object) {
  let result = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result[key] = object[key];
    }
  }
  return result;
}
```

深拷贝

```
function deepCopy(object) {
  if (!object) {
    return object;
  }
  let result = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      result[key] = typeof element === "object" ? deepCopy(element) : element;
    }
  }
  return result;
}
```

33. 函数柯里化的实现?
    降元处理

```
function _curry(fn) {
  const fnLen = fn.length;
  let paramsAll = Array.prototype.slice.call(arguments, 1);
  return function () {
    paramsAll = [...paramsAll, ...arguments];
    if (paramsAll.length >= fnLen) {
      return fn.apply(this, paramsAll);
    }
    return _curry(fn, ...paramsAll);
  };
}
```

35. Promise 的实现

```
class _Promise {
  constructor(fn) {
    this.state = "pedding"; //'fulfilled','rejected'
    this.cbList = [];
    this.resolveValue = "";
    this.rejectValue = "";

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    fn(this.resolve, this.reject);
  }

  resolve(value) {
    if (this.state !== "pedding") return;
    this.state = "fulfilled";
    this.resolveValue = value;
    while (this.cbList.length) {
      const elem = this.cbList.shift();
      const fn = elem.resolve;
      this.resolveValue = fn(this.resolveValue);
    }
  }

  reject(reason) {
    if (this.state !== "pedding") return;
    this.state = "rejected";
    this.rejectValue = reason;
    while (this.cbList.length) {
      const elem = this.cbList.shift();
      const fn = elem.reject;
      this.rejectValue = fn(this.rejectValue);
    }
  }
}

_Promise.prototype.then = function (resolveFn, rejectFn) {
  const newresolveFn =
    typeof resolveFn === "function" ? resolveFn : () => resolveFn;
  const newrejectFn =
    typeof rejectFn === "function" ? rejectFn : () => rejectFn;
  if (this.state === "pedding") {
    this.cbList.push({
      resolve: newresolveFn,
      reject: newrejectFn,
    });
  } else if (this.state === "fulfilled") {
    this.resolveValue = newresolveFn(this.resolveValue);
  } else if (this.state === "rejected") {
    this.rejectValue = newrejectFn(this.rejectValue);
  }
};

_Promise.prototype.catch = function () {};
_Promise.prototype.finally = function () {};

// 静态方法
_Promise.resolve = function (value) {
  // 判断
  if (value instanceof _Promise) {
    return value;
  } else {
    return new _Promise((resolve) => {
      resolve(value);
    });
  }
};

//  all---所有都兑换
_Promise.all = function (promises) {
  const len = promises.length;
  let result = new Array(len); // 收集每个promise的结果值
  let count = 0;

  return new _Promise((resolve, reject) => {
    promises.forEach((prom, index) => {
      const newPron = prom instanceof _Promise ? prom : _Promise.resolve(prom);
      newPron.then(
        function (res) {
          count++;
          result[index] = res;
          if (count === len) {
            // console.log("result==", result);
            resolve(result);
          }
        },
        (res) => {
          return reject(res);
        }
      );
    });
  });
};

// any -- 一个兑换
_Promise.any = function (promises) {
  const len = promises.length;
  let result = null;
  let count = 0;
  return new _Promise((resolve, reject) => {
    promises.forEach((prom) => {
      const newProm = prom instanceof _Promise ? prom : _Promise.resolve(prom);
      newProm.then(
        (res) => {
          result = res;
          resolve(result);
        },
        (res) => {
          count++;
          if (count === len) {
            reject(res);
          }
        }
      );
    });
  });
};

// race -- 返回最快一个敲定的结果
_Promise.race = function (promises) {
  let result = null;
  return new _Promise((resolve, reject) => {
    promises.forEach((prom) => {
      const newProm = prom instanceof _Promise ? prom : _Promise.resolve(prom);
      newProm.then(
        (res) => {
          result = res;
          resolve(result);
        },
        (res) => {
          reject(res);
        }
      );
    });
  });
};

// .catch
myPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}
```

36. Generator

```
/**
 * Generator
 * 1. 先定义生成器函数的内部处理方式
 * 2. 定义生气器函数
 */

// 1. 处理方式
function deal(value) {
  if (value > 3) {
    return {
      value: undefined,
      done: false,
    };
  }

  value++;
  return {
    value: value,
    done: value > 3 ? true : false,
  };
}
//2. 定义生成器函数
function _gen() {
  let param = arguments[0];
  return {
    next: function () {
      // console.log("param", param);
      const obj = deal(param);
      // console.log("obj", obj);

      param = obj.value;
      return {
        value: obj.value,
        done: obj.done,
      };
    },
  };
}

const gen = _gen(1);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

```

generator 的不足：

- 1.函数外部无法捕获异常
- 2.多个 yield 会导致调试困难，需要手动调用 next()

37. !!! async/await

    > async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。

    > async 函数是 generator 函数的语法糖，async 和 await 关键字让我们可以用一种更简洁的方式写出基于 Promise 的异步行为，而无需刻意地链式调用 promise;

    要在 generator 的基础上实现这样一个语法糖，主要是实现让 generator 函数自动调用，利用 promise 的 then 方法，使其自动调用；

```
function asyncToGenerator(generatorFunc) {
    return function() {
      const gen = generatorFunc.apply(this, arguments)
      return new Promise((resolve, reject) => {
        function step(key, arg) {
          let generatorResult
          try {
            generatorResult = gen[key](arg)
          } catch (error) {
            return reject(error)
          }
          const { value, done } = generatorResult
          if (done) {
            return resolve(value)
          } else {
            return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
          }
        }
        step("next")
      })
    }
}
```
