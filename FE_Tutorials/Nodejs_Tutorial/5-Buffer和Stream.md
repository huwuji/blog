## Buffer 与 Stream

1.  Stream 是什么？

    > 流，英文 Stream 是**对输入输出设备的抽象**，这里的设备可以是文件、网络、内存等。

    > 流是为 Node.js 应用程序提供动力的基本概念之一。
    > 它们是**一种以高效的方式处理读/写文件、网络通信、或任何类型的端到端的信息交换**。

    > 流是有方向性的，

这里笔者个人理解：
Stream 是数据件信息传递的方式，是以二进制方式传输；
Node 中的 Buffer 能提供堆二进制流数据的存储，同时也是 js 操作二进制流的工具；当二进制流被存放到 Buffer 中后，通过 Buffer API，js 就能对流进行处理；这样就达到了 js 对二进制的处理；

- 2.1 Stream 的分类:
  Stream 可以分为 4 类：
  - Readable: 可以通过管道读取、但不能通过管道写入的流（可以接收数据，但不能向其发送数据）。 当推送数据到可读流中时，会对其进行缓冲，直到使用者开始读取数据为止。
  - Writable: 可以通过管道写入、但不能通过管道读取的流（可以发送数据，但不能从中接收数据）。
  - Duplex: 可以通过管道写入和读取的流，基本上相对于是可读流和可写流的组合。
  - Transform: 类似于双工流、但其输出是其输入的转换的转换流。

> 双工流（Duplex）是同时实现了可读、可写的流，包括 TCP socket、zlib、crypto。
> 转换流（Transform）是双工流的一种，例 zlib、crypto。
> 区别：Duplex 虽然同时具备可读流和可写流，但两者是独立的；Transform 的可读流的数据会经过一定的处理过程自动进入可写流。

- 2.2 Stream 的实现

  ```
    // 创建一个可读流
    const Stream = require('stream')

    const readableStream = new Stream.Readable();
    //然后实现 _read

    readableStream._read = () => {};


    // 或者
    const readableStream = new Stream.Readable({
        read() {}
    });

    // 数据发送
    readableStream.push('helloworld!')

  ```

  ```
  // 创建一个可写流
    const Stream = require('stream')
    const writableStream = new Stream.Writable({
        write(chunk, encoding, next) => {
            console.log(chunk.toString());
            next();
        }
    });

    // 数据传递
    process.stdin.pipe(writableStream)

  ```

  ```
  // 创建一个双工流，及实现write，read方法
    const { Duplex } = require('stream');

    const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },

    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
        this.push(null);
        }
    }
    });

    inoutStream.currentCharCode = 65;

    process.stdin.pipe(inoutStream).pipe(process.stdout);
  ```

  ```
  // 创建转换流（Transform），需要实现transform方法
    const { Transform } = require('stream');

    const upperCaseTr = new Transform({
        // 流对象模型readableObjectMode和writableObjectMode是设置是否接受js流对象;
        readableObjectMode: true,
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
         this.push(chunk.toString().toUpperCase());
        callback();
        }
    });

    process.stdin.pipe(upperCaseTr).pipe(process.stdout);
  ```

- 2.3 Stream 数据的消费

  - pipe()
  - 通过事件来消耗：
    因为 Stream 是继承自 EventEmitter 的，所以所有的流都是 EventEmitter 的实例。
    如监听 data 或者 end 事件；

    ```
    readable.on(
        'data'
        , (chunk) => {
        writable.write(chunk);
    });

    readable.on(
        'end'
        , () => {
        writable.end();
    });
    ```

    **可读流的暂停与流动模式**
    可读流有两种模式来影响我们消费流：

    - 暂停（Paused）模式；
    - 流动（Flowing）模式。
      > 某种意义上，我们可以将其类比于拉（pull）模式与推（push）模式。
      > 默认情况下，所有的可读流都是以暂停模式启动的，但是可以轻松切换为流动模式，然后在需要的时候切回暂停状态。有时候这个切换会自动执行。
      > 当可读流处于暂停模式的时候，我们可以通过 read() 函数来按需读取，但是对于流动模式来说，数据是源源不断进来的，这时候我们就需要通过监听来消耗它了。
      > 如果你要手动切换的话，只需要使用 resume() 和 pause() 函数。
      > resume： 将 Paused 切换成 Flowing；
      > pause： 将 Flowing 切换成 Paused；

- 2.4 流对象模式
  默认情况下，流接受 Buffer 和字符串类型的数据。不过有一个 objectMode 参数，我们可以通过设置它来使得流接受 JavaScript 对象。
  如上创建转换流（Transform）的方式属性设置，---流对象模型 readableObjectMode 和 writableObjectMode 是设置是否接受 js 流对象;
  Node.js 内置了一些很有用的转换流：
  zlib 和 crypto。

  - zlib.createGzip
  - crypto.createCipher
  - ...

  ```
    const fs = require('fs');
    const zlib = require('zlib');
    const file = process.argv[2];

    const { Transform } = require('stream');

    const reportProgress = new Transform({
    transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
    }
    });

    fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(reportProgress)
    .pipe(fs.createWriteStream(file + '.zz'))
    .on('finish', () => console.log('Done'));
  ```

2. Buffer 是什么？
   > Buffer 是内存区域。 它表示在 V8 JavaScript 引擎外部分配的固定大小的内存块（无法调整大小）。
   > Buffer 被引入用以帮助开发者处理二进制数据，在此生态系统中传统上只处理字符串而不是二进制数据,没有用于读取或操作二进制数据流的机制。
   > Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。
   > 可以将 buffer 视为整数数组，每个整数代表一个数据字节。----《Node 官网 》

简单来说我们可以理解成：**Buffer 是 Node.js 用来处理二进制流数据或者与之进行交互的工具**。

- 2.1 Buffer 的创建：

  - Buffer.from()
  - Buffer.alloc()
  - Buffer.allocUnsafe()

  ```
  const buf = Buffer.from('hello');
  // 或
  const buf = Buffer.alloc(1024);
  //或
  const buf = Buffer.allocUnsafe(1024);
  ```

  > 虽然 alloc 和 allocUnsafe 均分配指定大小的 Buffer（以字节为单位），但是 alloc 创建的 Buffer 会被使用零进行初始化，而 allocUnsafe 创建的 Buffer 不会被初始化。 这意味着，尽管 allocUnsafe 比 alloc 要快得多，但是分配的内存片段可能包含可能敏感的旧数据。

- 2.2 Buffer 字符编码  
  通过使用字符编码，可实现 Buffer 实例与 JavaScript 字符串之间的相互转换，目前所支持的字符编码如下所示：

  - 'ascii' - 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。
  - 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。
  - 'utf16le' - 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
  - 'ucs2' - 'utf16le' 的别名。
  - 'base64' - Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。
  - 'latin1' - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。
  - 'binary' - 'latin1' 的别名。
  - 'hex' - 将每个字节编码成两个十六进制的字符。

- 2.3 字符串和 Buffer 之间的转换

  - 字符串转 Buffer 可以在创建的时候指定字符和编码方式；
    如：
    new Buffer('hello','UTF-8');
    或
    const buf= Buffer.from('hello','UTF-8');
    或通过 write 持续写入到 Buffer 中：
    write 写入规则是 buf.write(str,[offset],[length],[encoding])
    buf.write('a','1','1','UFT-8');//hallo

- Buffer 转字符串
  利用 toStrig([encofing],[start],[end]);
  如
  buf.toString('UFT-8','1','2');//al

```
  const buf = Buffer.from('hello','UTF-8');// 即使不传字符编码，默认是UTF-8编码
  buf.length = 5; //可以像数组一样访问长度；
  //可以像数组一样访问
  console.log(buf[0]) //104
  //  buf.toString 的编码参数不传的话，默认也是UTF-8编码
  console.log(buf.toString('UTF-8'));// hello
```

- 2.3 的基本使用

  - 迭代访问和修改
    Buffer 可以像数组一样，被迭代访问；

    ```
    const buf = Buffer.from('Hey!')
    for (const item of buf) {
       console.log(item) //72 101 121 33
    }
    // 修改数据
    buf[1] = 111 //o
    console.log(buf.toString()) //Hoy!
    ```

  - 复制--- 利用 copy 方法

    ```
    const buf = Buffer.from('Hey!')
    let bufcopy = Buffer.alloc(4) //分配 4 个字节。
    buf.copy(bufcopy)
    ```

  - slice 截取

    - 写入 ---利用 write

    ```
    const buf = Buffer.alloc(4)
    buf.write('Hey!')

    ```

    - 判断 Buffer 不支持的编码类型
      Buffer.isEncoding([encoding]);//boolen

> Buffer 操作时，如果遇到乱码问题，基本上都是编码方式不对或字符长度截取不对导致编码方式不对；

- 2.4 Buffer 的内存分配：

  > Buffer 所占用的内存不再由 V8 分配，而是在 Node.js 的 C++ 层面完成申请，在 JavaScript 中进行内存分配。因此，这部分内存我们称之为堆外内存。

  **Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制。**
  **简单来说：slab 是一块申请好的固定大小的内存区域；**
  slab 具有如下三种状态：

  - full：完全分配状态
  - partial：部分分配状态
  - empty：没有被分配状态

    **Node 以 8KB 为界限来区分 Buffer 是大对象还是小对象；**
    **8KB 也是没个 slab 的大小，在 JS 层面，以它作为单位单元进行内存的分配；**

    区分大小对象的原因是，在分配内存机制上不同；
    对于小对象，Node 会基于当前 slab 的状态，及通过状态判断是否还可以在分配来进行更细小的空间分配；
    而对于大对象，则直接使用 C++层面提供的大内存（SlowBuffer 对象），无需细腻的分配操作；

    **简单来说，无论是大对象还是小对象，都是由 Node 的 C++层面来提供，JS 层面知识使用；当进行小而频繁的 Buffer 操作时，采用 slab 的机制进行预先申请和事后分配，使得 JS 和操作系统之间不用有过多的申请方面的系统调用；**

参照：

> 《深入浅出 Node》
> Stream 流 Node 官网：http://nodejs.cn/api/stream.html

> Buffer Node 官网：http://dev.nodejs.cn/learn/nodejs-buffers

> [Node.js 中的缓冲区（Buffer）究竟是什么?](https://cloud.tencent.com/developer/article/1476277)

> [Node.js Streams: Everything you need to know:](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93)

> [译] 你所需要知道的关于 Node.js Streams 的一切 ：https://mp.weixin.qq.com/s/huPERCsDnDpk6jRnbD6n-Q
