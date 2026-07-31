---
title: 为什么我的个人网站不像是 AI 生成的
date: 2026-07-29
description: 从零开始设计一个个人网站的决策记录——为什么手写 CSS、不用框架、以及那个奇怪的十字准星光标。
tags:
  - CSS
  - 设计
  - 工程化
outline: true
---

去年我决定重做个人网站。目标很简单：做一个**不像是从模板抄来的**网站。

听起来不难，对吧？但打开 Dribbble 或者各种开发者主页，你会发现这事儿其实挺难的。大多数个人网站只有两种：Tailwind 卡片流——渐变背景、圆角头像、三列 feature grid，闭着眼睛都能认出来；或者极简到像一张纯文本简历，白底黑字几个链接。

这也没什么不好。这些网站的目的可能就是快速上线、放个链接。但我想要的东西不太一样——我想做一个网站，让人打开之后能感觉到"这个人是在乎设计的"，而不是"会写代码但视觉上随便对付了一下"。

最后搞出来的风格我称之为 **Field Manual / Technical Schematic**——工程图纸、设备手册、军用装备文档那一套视觉语言。冷枪灰配工业安全橙，零圆角，硬边界。

这篇文章不是什么"设计指南"或者"最佳实践"。只是记录一下我做这个网站时的想法和取舍。可能有你觉得不对的地方，这很正常——个人网站本来就是个人的。

## 我不讨厌 Tailwind

先声明一下：我在公司的项目里也用 Tailwind。它解决的问题是真实的——团队协作时，utility class 确实能降低沟通成本。不用想 class 命名，不用在文件之间跳来跳去，一个文件里就能看到元素长什么样。

但个人网站是另一回事。

Tailwind 的问题不在于"丑"或者"限制创造力"——这些都可以靠配置解决。对我来说，真正的问题是 **utility class 把"为什么要这样设计"的上下文拆散了**。

`bg-gray-900 rounded-lg shadow-lg p-6` 这几个 class 告诉你这个元素长什么样，但它不说为什么长这样。当设计意图散落在几十个 HTML 文件的几百个 class 里，你想改一个间距？得全局搜 `mb-6`，然后一个一个判断这个 `mb-6` 是"段落之间的间距"还是"卡片内部 padding 不够补的"。

手写 CSS 的话，我的设计系统自然地活在 CSS 变量里：

```css
:root {
  --bg: #0b0d10;
  --accent: #ff5c1a;
  --border: #222a34;
  --font-display: "Anton", "Arial Narrow", sans-serif;
  --font-mono: "Maple Mono", monospace;
  --gap: clamp(84px, 11vh, 120px);
}
```

要改整个站的色调？改 `--accent` 一行就够了。这种"改一个地方，全局生效"的感觉，在用 Tailwind 的时候是很难有的——除非你一开始就花大量精力去配置 `tailwind.config.js`，但那样的话，你其实已经在做设计系统了，只是用 Tailwind 的语法来表达而已。

说到底这不是 Tailwind 好不好的问题。在团队里我用 Tailwind，在我的个人网站我手写 CSS。不同场景，不同选择。

## 工程图纸这个方向是怎么来的

其实一开始我也不知道要做什么风格。试了几个方向——暗色终端风、极简瑞士风、甚至那种带纹理的"纸质笔记"风——都不太对。

后来某天翻到一本旧的军用设备说明书 PDF，看到里面的排版和标注方式，突然觉得"就是这个"。那种硬朗、精确、功能主义的审美，和我写代码时喜欢的东西是一样的。

### 颜色：一种强调色就够了

两套主题，同一个逻辑：

```
Dark:  #0b0d10 (底) → #12161c (表面) → #222a34 (边界) → #ff5c1a (强调)
Light: #edeff1 (底) → #ffffff (表面) → #c9ced3 (边界) → #e04a0c (强调)
```

只有一种强调色——橙色。没有蓝色做链接、红色做报错、黄色做警告。这不是一个组件库，不需要覆盖所有语义场景。一个颜色就够了，用得越少越有分量。所有链接、hover 状态、重点标记，全是同一个橙色。

### 字体：三款，各干各的

| 字体 | 用在哪 | 为什么选它 |
|------|--------|-----------|
| Anton | 标题、数字、标签 | 窄而重，像设备铭牌上的钢印字 |
| OPPO Sans | 中文正文 | 几何感够但不做作，比 PingFang 更适合全无衬线的场景 |
| Maple Mono | 代码、导航、元数据 | 等宽但没有夸张的 ligature，放 UI 里不违和 |

都是自托管 WOFF2，`font-display: swap`。没有 Google Fonts 的外部请求，离线也能正常显示。

### 零圆角比听起来麻烦

全站 `border-radius: 0`。听起来就是个全局样式的事，对吧？

实际上浏览器在很多你意想不到的地方偷偷加了圆角——`button` 默认有、`input` 默认有、`code` 标签默认有、focus ring 也是圆的。每个都要显式覆盖。

但这是值得的。零圆角之后整个网站没有任何"软"的视觉元素，所有转角都是锐利的直角——就像图纸上的线条。这个细节单看不明显，但全部叠加在一起，就是"这个网站不一样"的感觉来源之一。

### 图纸符号不是装饰

每个 section 开头都有一行：

```
DWG NO. EQ1024-V2 · SHEET 01/06
SYS.STATUS // OPERATIONAL
SCALE 1:1 · FIELD MANUAL
REV 2.0 · 2026.07
```

这些不是随便加的"氛围组"。访客不需要逐行读——扫一眼就知道：哦，这是个"文档"，有版本号、有状态、有修订记录。就像你拿到一张图纸，不用看内容就知道它在说什么语境。这是信息层次的一部分，不是纯装饰。

## 把 2000 行 CSS 塞一个文件里

全站所有样式在一个 `styles.css` 里。没有 Sass、没有 PostCSS、没有 purge。

我知道这听起来像是不懂工程的人在瞎搞。但在这个项目的规模下（约 40 个页面），拆分文件的代价其实大于收益：

- 拆成 7 个文件意味着 7 个 HTTP 请求（或者多一个构建步骤去合并）。开发时要记住"这个组件的样式到底在哪个文件里"。
- 单文件用注释分区——`/* NAV */`、`/* HERO */`、`/* SPEC SHEETS */`——在 2000 行以内导航完全够用。

当然，超过 3000 行就该拆了。目前刚好在这个临界点上晃悠。等哪天 `Cmd+F` 都救不了我了再拆。

### CSS 变量的命名：能少就少

设计 token 只有一层。没有 `--color-primary-500` 这种三级命名：

```css
:root {
  --t-caption: #5c6672;   /* 最淡 */
  --t-muted: #7f8a96;     /* 次级 */
  --t-secondary: #a9b3bf; /* 正文 */
  --t-primary: #d4dbe3;   /* 强调正文 */
  --t-bright: #f2f5f9;    /* 标题 */
}
```

5 级文字色。没有 `h1-color`、`text-on-card`、`text-on-surface` 这种语义命名——用层级命名就够了，组件里需要什么对比度就选对应的 token。简单粗暴，但管用。

### clamp() 代替 breakpoint

网站里大部分字号和间距用的是 `clamp()`，而不是在特定断点突然跳变：

```css
.sec__title {
  font-size: clamp(1.6rem, 3.2vw, 2.4rem);
}
.hero__title {
  font-size: clamp(4.6rem, 15vw, 12.5rem);
}
```

效果是：**在任意宽度下，字号都是连续的**，不会在 768px 突然变小一号。Media query 只用于真正的布局变化（grid 变单列、sidebar 隐藏），不是用来调字号的。

## 那个旋转的超立方体

Hero 区域右边那个旋转的线框，不是 GIF，也不是视频。是一个 `<canvas>`，实时渲染一个 4 维超立方体（tesseract）在 3 维空间的投影。

### 数学上在干嘛

简化版：

1. 定义 16 个顶点，每个是 4D 坐标 `(x, y, z, w)`——4 维超立方体正好 2⁴ = 16 个顶点
2. 对每个顶点做 4D 旋转——XY、XZ、XW 三个旋转平面同时转
3. 透视投影把 4D → 3D，再映射到 2D 屏幕
4. `requestAnimationFrame` 循环更新

本质上就是矩阵乘法——4D 点乘旋转矩阵，再除以 W 分量做透视除法：

```javascript
// XW 平面的 4D 旋转
const cos = Math.cos(angleXW);
const sin = Math.sin(angleXW);
// x' = x*cos - w*sin
// w' = x*sin + w*cos
// y, z 不变
```

### 性能方面

- `requestAnimationFrame`，目标 60fps
- `IntersectionObserver`——canvas 不在视口里就暂停，不浪费 CPU
- `prefers-reduced-motion`——用户开了减少动画就直接跳过
- Canvas 尺寸跟着窗口 resize，不超过必要分辨率

每条边的颜色根据深度变化——靠近观察者的用亮色，远离的用暗色。最外层 8 条边用橙色强调，让结构可读。

这个效果是全站唯一一个"奢侈"的视觉元素。它不是必需的，但它是那种"一眼就记住"的东西。我觉得个人网站需要至少一个这种东西——不算功能、不算内容，纯粹就是让人觉得"有点意思"。

## CAD 十字准星——我知道很多人会想删掉它

一个几乎所有设计师都会让你去掉的 feature：自定义光标。

隐藏原生光标，用两个 `position: fixed` 的 `<div>` 替代：
- **点**（6×6px 橙色方块）：1:1 跟随鼠标，瞬时响应
- **准星**（30×30px 视框）：带 lerp(0.16) 缓动的 trailing follow，hover 到交互元素时旋转 45° 并放大

只有支持 fine pointer 的设备才会启用——手机上不显示。

这个准星直接引用了 CAD 软件的十字光标，算是整个"工程图纸"叙事的最后一笔。

但我也得承认现在有问题：输入框也没有恢复 text cursor，`contenteditable` 也没适配。这是我 TODO 列表上的事，还没搞。

## Eleventy 上做的一些小事

### 大纲是构建时生成的

文章右边的目录不是手写的。一个自定义的 Nunjucks filter，在构建时解析 Markdown 渲染后的 HTML，提取 `h2`/`h3`/`h4` 的 id 和文本，递归生成嵌套 `<ul>`：

```javascript
eleventyConfig.addFilter("outline", (content) => {
  const headingRegex = /<h([2-4])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-4]>/g;
  // 解析 → 构建树 → 渲染嵌套 ul
});
```

### 中文标题的锚点不能丢

`markdown-it-anchor` 默认的 slugify 会直接丢弃中文字符，导致锚点变成 `#section-1`、`#section-2` 这种毫无意义的东西。写了一个保留中文的版本：

```javascript
slugify: (text) => text.trim().toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9一-龥-]/g, "");
```

这样中文标题的锚点至少是可读的——`#配置驱动-crud-引擎`，你一眼就知道链接指向哪里。

### 38 篇文章，零运行时 JS 做分页

8 篇一页的分页、15 个标签的筛选页——全部在 `npm run build` 时生成完毕，61 个 HTML 文件在 250ms 内出来。Eleventy 的 `pagination` + 自定义 `tagList` collection + 一个 `selectByTag` filter 就搞定了。

## 主题切换：20 行 JS

暗色/亮色切换的实现就一个按钮、一段 20 行的 JS、和 CSS 变量覆盖：

```javascript
toggle.addEventListener('click', function () {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

没有过渡动画，没有 system preference 的复杂判断——直接切 `data-theme`，CSS 变量接管剩下的一切。

亮色主题我管它叫 "blueprint paper"——`#edeff1` 底色模拟蓝图的浅蓝灰，比纯白多了一点温度。暗色的 `#0b0d10` 几乎全黑但留了一丝灰度，让橙色的对比更狠。

## 为什么不用 React/Vue

不是我对框架有意见。我在工作中写 Vue 和 React。

但这个项目不需要。一个静态网站——Markdown 构建成 HTML、少量 JS 做交互、CSS 做样式——用框架能获得什么？Virtual DOM diffing？组件状态管理？SPA 路由？

Eleventy 处理模板和静态生成，CSS 处理样式，Vanilla JS 处理主题和交互。三个东西各干各的，互不越界。

最终的结果：
- **零运行时依赖**：所有页面是纯 HTML，JS 不到 15KB 且全是可选增强
- **不需要 hydration**：页面加载完就完事，不用等 JS 启动
- **Lighthouse 四项接近全 100**（Accessibility 还有一些要修）

## EQ1024 这个身份

"EQ1024" 这个名字的想法很简单：把个人 ID 做成设备型号。"EQ" 可以是 "Engineer Quality"，"1024" 嘛……你懂的。

整个站的文案系统围绕这个身份来：
- Profile → "Operator File"
- 工作经历 → "Service Record"（R1→R4）
- 项目 → "Spec Sheets"（Problem / Solution / Key Decisions / Field Notes）
- 技能 → "Inventory / Equipment List"
- 导航编号 → 01 Profile · 02 Record · 03 Systems · 04 Inventory · 05 Blog

这些不是噱头。好的设计系统让内容更容易被扫读。一个 HR 可能看不懂"Monorepo"是什么，但她能看懂 `System 01 ■ Deployed / −92% Code / 10× Build Speed`——数字是跨语言的。

## 还没搞定的事

做完了不等于做好了。几个我知道但还没修的东西：

1. **移动端导航**——小屏幕下 5 个导航项挤在 54px 的 bar 里，没有 hamburger menu
2. **自定义光标无障碍**——`cursor: none !important` 对文本输入框也生效了
3. **CSS 该拆了**——2000+ 行单文件，已经开始依赖 `Cmd+F`
4. **只有中文**——外企和海外招聘方覆盖不到

一个网站永远是 WIP。慢慢修吧。

---

做这个网站花了我不少晚上和周末。但每次打开看到那个旋转的超立方体和橙色的十字准星——我觉得值。

如果你也在考虑做自己的网站，我只有一条建议：**不要从模板开始**。模板把你框在一个现成的视觉系统里，你只能往里面填内容。从空白 CSS 文件开始，让设计跟着内容长出来。不用一次做到完美——先有一个方向，然后慢慢磨。个人网站本来就是一个人慢慢打磨的东西。

当然，你也可以觉得我说的这些都不重要。毕竟这是**你的**个人网站。
