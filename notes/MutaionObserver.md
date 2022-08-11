### MutationObserver

MutationObserver 接口提供了监视对 DOM 树进行更改的能力。它旨在替代旧的 Mutation Events 功能，该功能是 DOM3 事件规范的一部分。

- 使用方式

```
function callback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    switch(mutation.type) {
      case 'childList':
        /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
           mutation.removedNodes */
        break;
      case 'attributes':
        /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
           该属性之前的值为 mutation.oldValue */
        break;
    }
  });
}

var observer = new MutationObserver(callback);

var targetNode = document.querySelector("#someElement");
var observerOptions = {
  childList: true,  // 观察目标子节点的变化，是否有添加或者删除
  attributes: true, // 观察属性变动
  subtree: true     // 观察后代节点，默认为 false
}

observer.observe(targetNode, observerOptions);

```

- 构造函数
  创建并返回一个新的观察器，它会在触发指定 DOM 事件时，调用指定的回调函数。MutationObserver 对 DOM 的观察不会立即启动；而必须先调用 observe() 方法来确定，要监听哪一部分的 DOM 以及要响应哪些更改。

- 参数：
  回调函数：每当被指定的节点或子树以及配置项有 DOM 变动时会被调用；
  该回调函数拥有两个参数：

  - 一个是描述所有被触发改动的 MutationRecord 对象数组，
  - 另一个是调用该函数的 MutationObserver 对象。

- 返回值
  返回一个新的、包含监听 DOM 变化回调函数的 MutationObserver 对象。

#### [MutationObserver 对象](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)

MutationObserver 对象的 observe 方法：

- 设置观察目标，根据配置，观察者会观察 DOM 树中的单个 Node，也可能会观察被指定节点的部分或者所有的子孙节点。
- 接受两个参数:

  - target：观察目标，DOM 树中的一个要观察变化的 DOM Node (可能是一个 Element)，或者是被观察的子节点树的根节点。
  - options：一个可选的[MutationObserverInit 对象](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/API/MutationObserver/observe_2f2addbfa1019c23a6255648d6526387),通过对象成员来设置观察选项。
    具体如下：
    - childList：设置 true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
    - attributes：设置 true，表示观察目标属性的改变
    - characterData：设置 true，表示观察目标数据的改变
    - subtree：设置为 true，目标以及目标的后代改变都会观察
    - attributeOldValue：如果属性为 true 或者省略，则相当于设置为 true，表示需要记录改变前的目标属性值，设置了 attributeOldValue 可以省略 attributes 设置
    - characterDataOldValue：如果 characterData 为 true 或省略，则相当于设置为 true,表示需要记录改变之前的目标数据，设置了 - - - characterDataOldValue 可以省略 characterData 设置
    - attributeFilter：如果不是所有的属性改变都需要被观察，并且 attributes 设置为 true 或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表

- 返回值：
  undefined

#### 特点

MutationObserver 有以下特点：

- 它等待所有脚本任务完成后才会运行，即采用异步方式，是一个微任务；
- 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条地个别处理 DOM 变动。
- 它即可以观察发生在 DOM 节点的所有变动，也可以观察某一类变动
- 当 DOM 发生变动会触发 MutationObserver 事件。但是，它与 一般 DOM 事件有一个本质不同： 一般 DOM 事件是同步触发，也就是说 DOM 发生变动立刻会触发相应的事件；MutationObserver 则是异步触发，DOM 发生变动以后，并不会马上触发，而是要等到当前所有 DOM 操作都结束后才触发。
  比如：
  在监听大量 DOM 事件的时候，如果监听每一个 DOM 事件，一次操作触发大量事件的回调函数执行，可能会造成浏览器卡顿。而如果用 MutationObserver 来监听的话，就只会触发一次，有利于性能；

> <https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver>

> <https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver>

> <https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe>

> <https://developer.mozilla.org/zh-CN/docs/conflicting/Web/API/MutationObserver/observe_2f2addbfa1019c23a6255648d6526387>
