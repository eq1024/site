---
title: 把个人网站做成一张工程图纸——我的设计决策与取舍
date: 2026-07-29
description: 从设计语言、CSS 架构到 Eleventy 定制化，深度拆解 EQ1024 V2.0 的每一个技术决策和美学选择。
tags:
  - CSS
  - 设计
  - 工程化
outline: true
---

去年决定重做个人网站的时候，我给自己定了三条规则：不用模板，不用客户端框架，不做成"又一个开发者的个人主页"。

市面上大多数个人网站是两个极端：要么是千篇一律的 Tailwind 卡片+渐变+圆角，要么是极简到只剩文字和链接。我想做一个**一看就知道这个人是在乎设计的**，而不是"会写代码但不 care 视觉"的那种。

最终的设计方向是 **Field Manual / Technical Schematic**——工程图纸、设备手册、军用装备文档的视觉语言。冷色枪灰+工业安全橙，零圆角，硬边界，图纸般的克制。

这篇文章聊聊背后的设计决策、CSS 架构、以及在这个 AI 辅助编程盛行的时代为什么我依然选择手写每一行样式。

## 为什么不是 Tailwind

不是我对 Tailwind 有意见——我在公司项目里也用。但个人网站是不同的东西。

Tailwind 的 utility class 拆散了"为什么要这样设计"的上下文。`bg-gray-900 rounded-lg shadow-lg p-6` 告诉你这个元素"长什么样"，但不说它"为什么长这样"。当设计意图散落在 HTML 的几十个 class 里，改一个间距可能需要翻遍所有模板文件去找哪些地方用了 `mb-6`。

手写 CSS 时，我的设计系统**天然地存在 CSS 变量里**——所有间距、颜色、字体都在 `:root` 中定义，要改整个站的设计调性只需要改 20 个变量：

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

这不是"Tailwind vs 手写 CSS"的争论——**个人网站是一个人的设计作品，不是团队协作的产物**。在团队里，utility class 降低沟通成本；在个人项目中，我宁愿多写几行 CSS 来保持设计意图的可读性。

## 设计语言：为什么是工程图纸

一个好的设计不是凭空想出来的——它应该是这个人的另一种表达。

我是做前端的，日常和结构、系统、约束打交道。那种工程师审美——硬朗、精确、功能主义的——某种程度上就是我的工作方式在视觉上的映射。

### 色彩

两套主题共用同一个逻辑：冷灰做底，橙色作为唯一的强调色，绿色表示"运行中"状态。

```
Dark:  #0b0d10 (底) → #12161c (表面) → #222a34 (边界) → #ff5c1a (强调)
Light: #edeff1 (底) → #ffffff (表面) → #c9ced3 (边界) → #e04a0c (强调)
```

**只有一种强调色**。没有蓝色做链接、红色做错误、黄色做警告——这不是一个 UI 组件库，不需要覆盖所有场景。一个橙色就够了，用得越少越有视觉重量。

### 字体

三款字体各司其职：

| 字体 | 用途 | 选择理由 |
|------|------|---------|
| Anton | 标题、大号数字、标签 | 窄且重，压缩感强，像设备铭牌上的印刷字 |
| OPPO Sans | 中文正文 | 几何感强但不过分，比 PingFang 更适合无衬线场景 |
| Maple Mono | 代码、元数据、导航 | 等宽且没有夸张的 ligature，适合 UI chrome |

全部自托管 WOFF2，`font-display: swap`，零外部请求。

### 零圆角

这个决定比看起来难做。浏览器默认的 focus ring 是圆角、button 默认有圆角、连 `code` 标签都有默认的 `border-radius`。

全站 `border-radius: 0` 的代价是需要在每个可能引入圆角的地方显式覆盖。但结果是整个网站没有任何"软"的视觉元素——所有转角都是锐利的，就像图纸上的线条。

### 图纸符号系统

每个 section 开头都有一组图纸符号：

```
DWG NO. EQ1024-V2 · SHEET 01/06
SYS.STATUS // OPERATIONAL
SCALE 1:1 · FIELD MANUAL
REV 2.0 · 2026.07
```

这些不是装饰——它们是信息层次的一部分。访客不需要逐行阅读就能感知到：这是一个"文档"，有版本号、有状态标识、有修订记录。就像你拿到一张图纸，不用看内容就知道它在说什么语境。

## CSS 架构：单文件 2000 行

全站所有样式放在一个 `styles.css` 里——没有预处理器、没有构建步骤、没有 purge。

### 为什么单文件

这个决定和项目规模有关。这个网站目前约 40 个页面，CSS 约 2000 行。在这个规模下：

- **拆分文件是有代价的**——7 个 CSS 文件的 `@import` 会增加 6 次请求（或者需要构建工具合并）。开发时需要记住"这个组件样式在哪个文件里"。
- **单文件用注释分区**在 2000 行以内是完全可行的。`/* NAV */`、`/* HERO */`、`/* SPEC SHEETS */` 这些区块标记让文件内导航足够快。

当然，超过 3000 行就该拆了。目前刚好在临界点。

### CSS 变量的层级

设计 token 只有一层——没有 `--color-primary-500` 这种三级命名。因为不需要。

```css
:root {
  --t-caption: #5c6672;   /* 最淡的辅助文字 */
  --t-muted: #7f8a96;     /* 次级文字 */
  --t-secondary: #a9b3bf; /* 正文 */
  --t-primary: #d4dbe3;   /* 强调正文 */
  --t-bright: #f2f5f9;    /* 标题 */
}
```

5 级文字色。没有 `h1-color`、`h2-color`、`text-on-card`、`text-on-surface`——用语义化的层级命名，组件里需要什么程度的对比度就直接选对应的 token。

### `clamp()` 代替 breakpoint

网站大量使用 `clamp()` 做 fluid typography 和间距，而不是 discrete breakpoints：

```css
.sec__title {
  font-size: clamp(1.6rem, 3.2vw, 2.4rem);
}
.hero__title {
  font-size: clamp(4.6rem, 15vw, 12.5rem);
}
```

这样做的结果是：**没有"断点跳跃"**。在任意宽度下，标题大小都是连续的，而不是在 768px 突然变小一号。

Media query 只用于真正的布局变化（grid 变单列、sidebar 隐藏），而非字体大小调整。

## 那个 4D 超立方体是怎么来的

Hero 右侧的旋转线框不是 GIF 也不是视频——是一个 `<canvas>` 渲染的 **4 维超立方体（tesseract）在 3 维空间的投影**。

### 数学原理（简化版）

1. 定义 16 个顶点，每个顶点是一个 4D 坐标 `(x, y, z, w)`——超立方体在 4 维空间中有 16 个顶点（2⁴）
2. 对每个顶点做 **4D 旋转**——3 个旋转平面同时旋转：XY 平面（我们熟悉的 3D 旋转）、XZ 平面、XW 平面（第 4 维参与的旋转）
3. 用 **透视投影** 把 4D → 3D 再 → 2D 屏幕坐标
4. 用 `requestAnimationFrame` 循环更新旋转角度

投影公式本质上是一个矩阵乘法——4D 坐标点乘以旋转矩阵，再除以 W 分量做透视除法：

```javascript
// 4D 旋转矩阵（XW 平面旋转）
const cos = Math.cos(angleXW);
const sin = Math.sin(angleXW);
// 旋转后的 x' = x*cos - w*sin
// 旋转后的 w' = x*sin + w*cos
// y', z' 保持不变
```

### 性能考虑

- `requestAnimationFrame` 驱动，60fps
- `IntersectionObserver` 检测——canvas 不在视口内时暂停动画
- `prefers-reduced-motion` 检测——用户偏好减少动画时彻底跳过
- Canvas 尺寸随窗口 resize 调整，不超出必要分辨率

### 配色

每一条边根据深度着色——靠近观察者的用亮色（`#d4dbe3`），远离的用暗色（`#2e3846`）。加上最外层 8 条边用橙色强调，让结构可读——你能看出哪些面"在前面"。

这个效果是整个网站唯一一个"奢侈"的视觉元素。它不是必需的，但它是那种"一眼就记住"的东西。个人网站需要至少一个这样的东西。

## 自定义光标：CAD 十字准星

一个几乎所有设计师都会让你删掉的 feature——但我认为它对这个站的美学完整性至关重要。

```css
@media (pointer: fine) {
  * { cursor: none !important; }
}
```

隐藏原生光标后，用两个 `position: fixed` 的 `<div>` 渲染新的光标：
- **点**（6×6px 橙色方块）：1:1 跟随鼠标，瞬时响应
- **准星**（30×30px 视框括号）：trailing follow，`lerp(0.16)` 缓动，hover 交互元素时旋转 45° 并放大

这个准星的视觉语言直接引用了 CAD 软件里的十字准星——再次强化"工程图纸"的美学叙事。

**但我承认这里有问题**：当前实现对输入框也没有恢复 text cursor，对 `[contenteditable]` 也没有适配。这是 TODO 列表上的高优项。

## Eleventy 定制化：不只是"搭个博客"

### 大纲生成

文章右侧的目录不是手写的——是一个自定义 Nunjucks filter，在构建时解析 Markdown 渲染后的 HTML，提取 `h2`/`h3`/`h4` 的 `id` 和文本，递归构建成嵌套 `<ul>`：

```javascript
eleventyConfig.addFilter("outline", (content) => {
  const headingRegex = /<h([2-4])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-4]>/g;
  // 解析 → 构建树 → 渲染嵌套 ul
});
```

### 中文友好的 slugify

`markdown-it-anchor` 默认的 slugify 会丢弃所有中文字符。我写了一个保留中文的版本：

```javascript
slugify: (text) => text.trim().toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9一-龥-]/g, "");
```

这让中文标题的锚点链接可读——`#配置驱动-crud-引擎` 而不是 `#section-3`。

### 分页和标签筛选

38 篇博客文章，8 篇一页分页，15 个标签各有一个独立的筛选页——全部在构建时生成，零运行时 JS。

实现方式：Eleventy 的 `pagination` + 自定义 `tagList` collection + `selectByTag` filter。每次 `npm run build`，61 个 HTML 文件在 250ms 内生成完毕。

## 主题切换：少即是多

暗色/亮色主题切换的实现只有一个按钮、一段 20 行的 JS、和 CSS 变量覆盖：

```javascript
toggle.addEventListener('click', function () {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

没有动画、没有过渡、没有 system preference 的复杂判断——就是直接切换 `data-theme` 属性，让 CSS 变量接管一切。

亮色主题叫 "blueprint paper"——`#edeff1` 底色模拟蓝图的浅蓝灰，比纯白更有温度。暗色主题的 `#0b0d10` 几乎全黑但留了一丝灰度，让橙色对比更强烈。

## 为什么不用框架

React、Vue、Svelte——在这个项目里都没有。

不是反框架，而是**这个项目不需要框架**。一个静态网站——Markdown 构建为 HTML、少量 JS 做交互、CSS 做样式——用框架能获得什么？Virtual DOM diffing？组件状态管理？SPA 路由？这些在这个场景里全是负资产。

Eleventy 做它该做的（模板引擎+静态生成），CSS 做它该做的（样式），Vanilla JS 做它该做的（主题、滚动、光标）。三个职责清晰分离，各不越界。

最后的结果是：
- **零运行时依赖**：所有页面是纯 HTML，JS 不到 15KB 且都是可选的增强
- **无 hydration**：页面加载即完整，不需要等待 JS 启动
- **Lighthouse 四项 100**：Performance、Accessibility（接近）、Best Practices、SEO

## 个人品牌：EQ1024 的身份设计

"EQ1024" 这个名字来自一个想法：把个人 ID 做成设备型号。"EQ" 可以理解为 "Engineer Quality"，"1024"——你懂的。

整个网站的文案系统围绕这个身份构建：
- Profile 是 "Operator File"
- 工作经历是 "Service Record"（R1→R4）
- 项目是 "Spec Sheets"（Problem / Solution / Key Decisions / Field Notes）
- 技能是 "Inventory / Equipment List"
- 导航数字编号不是装饰——01 Profile → 02 Record → 03 Systems → 04 Inventory → 05 Blog

这些不是噱头。**好的设计系统让内容更容易被浏览**。HR 不需要读懂 Monorepo 是什么，但她能看明白"System 01 ■ Deployed / −92% Code / 10× Build Speed"——数字是跨语言的。

## 遗憾与反思

做完了不等于做好了。几个我知道但还没修的问题：

1. **移动端导航**——小屏幕下 5 个导航项挤在 54px 高的 bar 里，没有 hamburger menu
2. **自定义光标的无障碍**——`cursor: none !important` 对文本输入框也生效
3. **CSS 文件即将需要拆分**——2000+ 行单文件已经开始需要 `Cmd+F` 导航
4. **没有英文版**——限制了外企/海外招聘方的覆盖

这些都是已知的、有待解决的东西。一个网站永远在 WIP 状态。

## 总结

做这个网站最大的收获是：**个人网站是你的最后一片可以完全控制的设计空间**。在工作项目里，你有产品需求、设计规范、团队约定、浏览器兼容性的约束。个人网站里，只有你自己的品味做决定。

如果你也在考虑重新做自己的网站，我的建议是：

1. **不要从模板开始**——模板把你框在一个现成的视觉系统里，从空白 CSS 文件开始，让设计随着内容生长出来
2. **选一个故事讲**——你的网站应该有一个人格，而不是"一个前端工程师的在线简历"
3. **有一个奢侈的细节**——大多数人不会注意到，但注意到的人会记住
4. **手写 CSS 没那么可怕**——CSS 变量的生态已经足够成熟，2000 行的 CSS 比 200 个 utility class 更容易维护

这个网站花了我不少夜晚和周末。但每次打开看到那个旋转的超立方体和橙色的准星光标——我觉得值。
