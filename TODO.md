# TODO

AI部分少了

个人项目 且能跳转

最新文章 

邮箱直接写出来 而不是只有邮箱按钮


> 来源：2026-07-29 网站审计报告
> 分级：P0 致命 / P1 高危 / P2 中危 / P3 增强

---

## P0 — 致命级（必须修复）

- [ ] **P0-2 移动端导航菜单** — 小屏幕（<640px）导航项溢出，需要 hamburger menu + off-screen drawer
- [ ] **P0-3 自定义光标隐藏问题** — `cursor: none !important` 对 `input`/`textarea` 也生效，需恢复文本输入光标

## P1 — 高危级（发布前应处理）

- [x] ~~P1-1 About 页面内容不足~~ ✅ 2026-07-29
- [x] ~~P1-2 Blog 内容薄弱~~ ✅ 2026-07-29 新增 3 篇深度文章
- [ ] **P1-3 缺少「面向 HR」的信息层** — 在 Profile 区域增加 At a Glance 数据条（年限/学历/专业/可到岗时间）
- [x] ~~P1-4 Footer CTA 措辞~~ ⚠️ 暂不改动（确认可公开求职）
- [ ] **P1-5 4D 超立方体 canvas 无障碍回退** — sr-only 描述或静态 SVG fallback
- [x] ~~P1-6 缺少 Open Graph 图片~~ ✅ 已添加 og-image.png

## P2 — 中危级（边际收益高）

- [ ] **P2-1 缺少结构化数据（JSON-LD）** — 添加 schema.org/Person 提高搜索引擎理解
- [ ] **P2-2 CSS 单文件过大** — 拆分 tokens / base / nav / hero / sections / footer / cursor
- [x] ~~P2-3 缺少 favicon~~ ✅ 2026-07-29 已从 ../web/ 复制全部图标
- [ ] **P2-4 Hero 数据表述精确化** — "1700 个文件" 改为 "~1,720 个 .vue 文件" 或 "代码规模缩减 92%"
- [ ] **P2-5 Record 区域空档期说明** — 2024.03–2024.08 约5个月空档（C# 上位机探索），面试话术备好
- [ ] **P2-6 缺少英文版** — 考虑至少英文首页（目标外企HR/海外远程团队）
- [ ] **P2-7 打印样式缺失** — `@media print` 隐藏导航/canvas/cursor，白底黑字

## P3 — 增强级（锦上添花）

- [ ] **P3-1 添加 RSS/Atom Feed** — 11ty `eleventy-plugin-rss` 三行配置
- [ ] **P3-2 埋点分析** — Plausible / Umami / Cloudflare Web Analytics
- [ ] **P3-3 面试官经验引用** — About 页面一笔带过"面过前端候选人"
- [ ] **P3-4 Rust 项目链接** — Hero 274★ 数字链接到实际 GitHub 仓库 + 一行简介
- [ ] **P3-5 添加 /uses 页面** — 展示日常工具链（编辑器/终端/硬件），技术圈社交货币

## 其他

- [ ] 决定 `index-v2.html` 去留 — 是否保留独立副本、统一字体策略（Google Fonts vs 自托管）
- [ ] Hero wireframe JS 去重 — `hero-wireframe.js` 和 `base.njk` 内联实现重复
- [ ] 添加 `robots.txt` + `sitemap.xml`
- [ ] 自定义 404 页面
- [ ] 博客文章标签可点击 — 链接到按标签筛选的列表页
- [ ] CSS/JS 文件名加 hash — 缓存更新

## 已完成

- [x] P0-1 Email/Résumé 占位符 — 替换为 mailto:xhxjxk14@foxmail.com + Blog 链接
- [x] Favicon 及图标完整套件 — 从 ../web/ 复制 + base.njk <head> 引用
- [x] P1-1 About 页面重写 — 个人简介/技术哲学/开源/职业方向
- [x] P1-2 Blog 深度文章 3 篇 — Monorepo 避坑 / AI 工作流 / 配置驱动引擎
