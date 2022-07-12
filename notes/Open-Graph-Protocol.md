### Open Graph protocol

> 来源：<https://ogp.me/#metadata>

> Open Graph 是一种互联网协议，最初由 Facebook 创建，用于标准化网页中元数据的使用，使得社交媒体得以以丰富的“图形”对象来表示共享的页面内容。
> 它使任何网页都可以成为社交图中的丰富对象。例如，这在 Facebook 上用于允许任何网页具有与 Facebook 上的任何其他对象相同的功能。

basic metadata：
要将您的网页变成图形对象，您需要将基本元数据添加到您的页面。我们基于 RDFa 协议的初始版本，这意味着您将在网页的 <head> 中放置额外的 <meta> 标记。每个页面的四个必需属性是:

- og:title - The title of your object as it should appear within the graph, e.g., "The Rock".
- og:type - The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
- og:image - An image URL which should represent your object within the graph.
- og:url - The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".

```
    <html prefix="og: https://ogp.me/ns#">
    <head>
    <title>The Rock (1996)</title>
    <meta property="og:title" content="The Rock" />
    <meta property="og:type" content="video.movie" />
    <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
    <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
    ...
    </head>
    ...
    </html>
```

更多请查看 [来源](https://ogp.me/#metadata)
