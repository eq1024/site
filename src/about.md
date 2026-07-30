---
layout: page.njk
title: About
---

<div class="sec__head">
  <span class="sec__no">00</span>
  <span class="sec__name">About</span>
  <span class="sec__rule" aria-hidden="true"></span>
</div>

<h2 class="sec__title">关于我 — <em>Operator Profile</em></h2>

## 我是谁

98 年生，湖北人，物联网工程专业出身。2020 年实习入行，写了 5 年多前端。

待过 4 家公司——从切页面的实习生到带 2 人团队的前端组长，再到独立负责两个核心项目架构决策的工程师。**Vue 生态最熟**——Vue 2/3、Nuxt、Pinia、Vite 都有深度使用经验。同时 **React 和 React Native 也在实际项目中独立落地**，46 个页面的 App 从零开发到上架。

做过的东西比较杂——中后台、小程序、App、桌面端、官网 SSR 都交付过，不是"用过"而是上线跑在生产环境。最近一份工作独立负责两个核心项目的架构和开发，同时维护 4 个遗留系统。**不是在理想环境里做 greenfield，而是在真实约束下做架构决策。**

## 技术哲学

我比较关注项目的**长期可维护性**。一个好的架构不是一开始就设计出来的，而是在理解业务约束后，找到正确的抽象层次，然后持续重构。

几个我比较在意的原则：

- **配置优于代码**：重复 3 次的东西就该抽象。设计了配置驱动 CRUD 引擎后，40+ 个列表页不需要写前端代码——不是因为偷懒，而是因为重复代码是 bug 的温床。
- **依赖方向要单向**：Monorepo 里 9 个共享包，拓扑严格单向——`config → utils → fetch/i18n → ui → apps`。循环依赖不是技术问题，是认知负担问题。
- **安全问题不能靠运气**：接手遗留项目时主动发现 17 项安全和技术债问题（包括 Sentry Token 明文泄露和 Axios CVE），是因为我相信代码审查应该是进攻性的，而不是等着出事故再修。
- **工具要顺手**：日常主力用 Claude Code，但建立了 Plan-first + Multi-agent + 四维审查的工作流。AI 不是替代思考——先让 AI 出方案，人工审核数据模型和架构边界，确认后再编码。

## 开源与社区

业余写了 **[WinPaste](https://github.com/eq1024)**——一个 Windows 剪贴板增强工具，用 Rust 写的，纯粹因为觉得 Windows 自带的不好用。获得了 **274 GitHub Stars**。

还有一些小东西：pnpm + Turborepo 的 Monorepo 入门模板、个人前端 Skills 库。有写技术博客和文档沉淀的习惯——登录流程、支付流程、微信配置、APP 打包流程、Monorepo 避坑 13 条。

关注前端趋势（stateofjs、bestofjs），习惯从 StackOverflow 和 GitHub 搜索英文技术资料。也面过前端候选人，所以能从面试官视角理解招聘方在找什么样的人。

## 职业方向

目前在找 **高级前端 / 前端架构** 方向的机会。

希望加入一个有技术深度的团队——有 Code Review，有技术分享，业务有复杂度而不只是 CRUD。不限框架，Vue 或 React 为主都行。

<small>不想做的事：纯维护遗留项目 / 唯一前端 / 大小周 / 纯外包纯 toG 项目。</small>

## 关于本站

V2.0 重设计——"Field Manual / Technical Schematic" 工程图纸美学。冷色枪灰 + 工业安全橙，硬边无圆角，制图般的克制。

Built with [Eleventy](https://www.11ty.dev/)，字体使用 Anton + OPPO Sans + Maple Mono（全部自托管），部署在 Cloudflare Pages。无客户端框架，手写 HTML & CSS，4D 超立方体线框渲染在 `<canvas>` 上。

---

*Drawn by hand + Claude Code · © 2026*
