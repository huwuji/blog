### content-visibility

> The content-visibility CSS property controls whether or not an element renders its contents at all, along with forcing a strong set of containments, allowing user agents to potentially omit large swathes of layout and rendering work until it becomes needed. Basically it enables the user agent to skip an element's rendering work (including layout and painting) until it is needed — which makes the initial page load much faster.

> content-visibility 是一个 css 属性，它控制一个元素是否呈现其内容，能让用户潜在地控制元素的呈现。用户可以使用它跳过元素的呈现(包括布局和绘制)，直到用户需要为止，让页面的初始渲染得到极大的提升。

属性：

- visible：没有效果。元素的内容被正常布局和渲染。
- hidden：该元素跳过其内容。用户代理功能（例如在页面中查找、标签顺序导航等）不能访问跳过的内容，也不能选择或聚焦。这类似于设置 display:none;
- auto：对于用户可见区域的元素，浏览器会正常渲染其内容；对于不可见区域的元素，浏览器会暂时跳过其内容的呈现，等到其处于用户可见区域时，浏览器在渲染其内容。

配合 contain-intrinsic-size 属性，利用 content-visibility 提升类似懒加载的更优体验；

> The contain-intrinsic-size CSS property controls the natural size of an element specified by content-visibility.

> MDN:<https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility> > <https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility>
