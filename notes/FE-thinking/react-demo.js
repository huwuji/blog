/**
 * 个人学习源码笔记
 * 学习魔术师卡颂的react视频。代码大多与原作者一致，个人做了一些注释
 */
let isMount = true;
let workInProgressHook = null;

/**
 * fiber：作为存储单元，也是执行单元；源码文件参见: react-reconciler/src/ReactInternalTypes
 */
const fiber = {
  stateNode: app,
  memoizedState: null, // 存储当前的数据，如hook。单链表结构
  // key,
  // tag,//标识fiber类型的标签；标明函数组件或者是类组件，如FunctionComponent｜ClassComponent；源码文件参见: react-reconciler/src/ReactWorkTags.js
  // type,// 对于 FunctionComponent，指函数本身，对于 ClassComponent，指 class，对于 HostComponent，指 DOM 节点 tagName
  // return,//父节点
  // child,//孩子节点
  // sibling,//兄弟节点
  // alternate,//指向currenttree的指针
};

/**
 *
 * @param {any} action
 * @param {object} hook - 指明不同hook（useState）调用下，当前的关联的hook对象；
 */
function dispatchAction(hook, action) {
  //存储当前hook一次更新中的多次调用值，环状链表，原因是任务执行受优先级影响，可能会被跳过；所以判断还要根据标识判断，但这里不考虑任务优先级的情况；
  const pending = {
    action: action,
    next: null,
  };
  if (!hook.queue.pending) {
    hook.queue.pending = pending;
    pending.next = pending; // 环状链表
  } else {
    pending.next = hook.queue.pending.next; // pending的next指针指向第一个；hook.queue.pending.next这个时候是指向的第一个
    hook.queue.pending.next = pending; // 插入
  }
  schedual();
}

/**
 * useState的逻辑:
 * 添加自身到当前fiber的hook链表上,同时记录（通过数据结构queue.pending链表记录）事件参入的调用函数（dispatchAction的参数）以及数据值（memoizedState）;
 * 再不断的更新重复执行时，根据优先级和加载状态，把之前存储的记录消费掉（及执行完queue.pending链）；
 * ，，
 * @param {*} initial
 * @returns
 */
function useState(initial) {
  // 同步当前hook到memoizedState的链表中
  let hook;
  if (isMount) {
    hook = {
      memoizedState: initial,
      next: null,
      queue: {
        pending: null, //存储当前hook一次更新中的多次调用值，环状链表，原因是任务执行受优先级影响，可能会被跳过；所以判断还要根据标识判断，但这里不考虑任务优先级的情况；
      },
    };
    // 组件中第一个hook执行
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      // fiber.memoizedState有值，则说明有执行过的hook---workInProgressHook存在
      workInProgressHook.next = hook;
    }
    // 重新设置当前的workInProgressHook
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  // 执行更新
  let baseState = hook.memoizedState;
  // setState的调用action链表， 当前hook.queue.pending是第一个
  // 调用。执行setState的action
  if (hook.queue.pending) {
    // hook.queue.pending.next一定指向的是第一个。
    let firstUpdate = hook.queue.pending.next;
    do {
      const action = firstUpdate.action;
      baseState = typeof action === "function" ? action(baseState) : action;
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next); // 环状链表，需要判断是否执行回到第一个
    // 该hook的多次调用更新执行完成
    hook.queue.pending = null;
  }
  // 同步该hook最新的值
  hook.memoizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook)];
}

function app() {
  const [num, setNum] = useState(1);
  const [num1, setNum1] = useState(10);
  console.log("isMount===", isMount);
  console.log("num===", num);
  console.log("num1===", num1);
  return {
    onNumEvent: () => setNum((num) => num + 1),
    onNum1Event: () => setNum1((num) => num + 1),
  };
}

/**
 * 调度
 * @returns
 */
function schedual() {
  workInProgressHook = fiber.memoizedState;
  const appInstance = fiber.stateNode();
  isMount = false;
  return appInstance;
}

window.appInstance = schedual();
