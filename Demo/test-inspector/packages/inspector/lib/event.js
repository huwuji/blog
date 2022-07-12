class EventTask {
  constructor() {
    this.taskList = null;
  }

  on(name, fn) {
    console.log('on=', name, fn, this.taskList)

    if (this.taskList) {
      if (this.taskList[name]) {
        this.taskList[name].push(fn);
      }
    } else {
      this.taskList = { [name]: [fn] };
    }
  }

  off(name, fn) {
    if (!name) {
      throw Error('can not find the event key!please input key.')
    }
    try {
      if (name && this.taskList[name]) {
        if (fn) {
          this.taskList[name] = this.taskList[name].filter(v => v !== fn)
        } else {
          this.taskList[name] = null;
          delete this.taskList[name];
        }
      }
    } catch (e) {
      throw Error(e);
    }
  }

  once(name, fn) {
    function newFn() {
      fn.apply(this, arguments);
      this.off.apply(tthis, [name, fn])
    }
    this.on(newFn);
  }

  async emit(name) {
    console.log('name=', name, this.taskList)
    if (this.taskList[name] && this.taskList[name].length) {
      // this.taskList[name].forEach(async fn => {
      //   console.log('fn', fn)
      //   await fn();
      // });
      for (const fn of this.taskList[name]) {
        await fn();
      }
      this.taskList[name] = null;
      delete this.taskList[name];
    }
  }

  clear() {
    this.taskList = null;
  }

}

module.exports = {
  EventTask
}