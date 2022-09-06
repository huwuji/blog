### 制作一个简易的富文本编辑器

1.  富文本的输入方式实现
    可以通过设置 [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)

2.  获取选择区域
    利用[window.getSelection](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection)
    获取 selection 对象
    来自定义一些操作；

    > 更多 selection 对象参考https://developer.mozilla.org/zh-CN/docs/Web/API/Selection

3.  编辑栏实现--及实现对选择区域元素的编辑--document.execCommand('command')

    document 提供了 [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) 方法:

    > 当一个 HTML 文档切换到设计模式时，document 暴露 **execCommand **方法，该方法允许运行命令来操纵可编辑内容区域的元素。
    > 大多数命令影响 document 的 selection（粗体，斜体等），当其他命令插入新元素（添加链接）或影响整行（缩进）。当使用 contentEditable 时，调用 execCommand() 将影响当前活动的可编辑元素。

    调用

    ```
    const bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)

    aCommandName
     一个 DOMString ，命令的名称。可用命令列表请参阅 命令 。

     aShowDefaultUI
     一个 Boolean， 是否展示用户界面，一般为 false。Mozilla 没有实现。

     aValueArgument
     一些命令（例如 insertImage）需要额外的参数（insertImage 需要提供插入 image 的 url），默认为 null。

    ```

    aCommandName 所具有的具体命令包括：

    - backColor --修改文档的背景颜色。在 styleWithCss 模式下，则只影响容器元素的背景颜色。

    - bold -- 开启或关闭选中文字或插入点的粗体字效果

    - ClearAuthenticationCache -- 清除缓存中的所有身份验证凭据。

    - copy -- 拷贝当前选中内容到剪贴板

    - cut -- 剪贴当前选中的文字并复制到剪贴板

    - createLink --将选中内容创建为一个锚链接。这个命令需要一个 hrefURI 字符串作为参数值传入。URI 必须包含至少一个字符，例如一个空格。（浏览器会创建一个空链接）

    - fontSize --在插入点或者选中文字部分修改字体大小。需要提供一个 HTML 字体尺寸 (1-7) 作为参数。

    - foreColor -- 在插入点或者选中文字部分修改字体颜色。需要提供一个颜色值字符串作为参数。

    - hiliteColor -- 更改选择或插入点的背景颜色。需要一个颜色值字符串作为值参数传递。 UseCSS 必须开启此功能。(IE 浏览器不支持)

    - insertHTML --在插入点插入一个 HTML 字符串（删除选中的部分）。需要一个个 HTML 字符串作为参数。

    - insertImage --在插入点插入一张图片（删除选中的部分）。需要一个 URL 字符串作为参数。这个 URL 图片地址至少包含一个字符。空白字符也可以（IE 会创建一个链接其值为 null）

    - italic --在光标插入点开启或关闭斜体字

    - unlink -- 去除所选的锚链接的<a>标签

    - redo --重做被撤销的操作
    - undo --撤销最近执行的命令。

    - ...

    - styleWithCSS
      用这个取代 useCSS 命令。 参数如预期的那样工作，i.e. true modifies/generates 风格的标记属性，false 生成格式化元素。
      > document.execCommand('StyleWithCSS', true, true);及使用 style 来修改

4.  富文本数据的存储
    富文本容器的 innerHTML 即是富文本数据。

    拓展：
    自己实现存储数据以及撤销，回退和还原；
    这里考虑设计一个存储数据队列来实现；
    类似于自定义路由;
    todo ...
