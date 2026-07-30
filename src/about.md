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

几个我比较在意的原则：

- **配置优于代码**：重复 3 次的东西就该抽象。设计了配置驱动 CRUD 引擎后，40+ 个列表页不需要写前端代码——不是因为偷懒，而是因为重复代码是 bug 的温床。
- **依赖方向要单向**：Monorepo 里 9 个共享包，拓扑严格单向——`config → utils → fetch/i18n → ui → apps`。循环依赖不是技术问题，是认知负担问题。
- **安全问题不能靠运气**：接手遗留项目时主动发现 17 项安全和技术债问题（包括 Sentry Token 明文泄露和 Axios CVE），代码审查应该是进攻性的，而不是等着出事故再修。
- **工具要顺手**：日常主力用 Claude Code，建立了 Plan-first + Multi-agent + 四维审查的工作流。AI 不是替代思考——先让 AI 出方案，人工审核数据模型和架构边界，确认后再编码。

---

## 成长路径 — 从实习生到独立架构

<div class="record">

<div class="record__head" aria-hidden="true">
  <span>REV</span><span>PERIOD</span><span>ASSIGNMENT</span><span>FIELD REPORT</span><span>EQUIPMENT</span>
</div>

<div class="record__row">
  <span class="record__rev">R4</span>
  <p class="record__date">2024.08 — 至今<b>INDEPENDENT ARCH</b></p>
  <p class="record__role">前端开发工程师<span>跨境电商物流 / 售后平台</span></p>
  <p class="record__detail">
    独立负责两个核心项目从零到一：Vue 3 Monorepo 重构（3 应用 + 9 共享包）和 React Native 移动端（46 页面），同时维护 4 个 Vue 2 遗留项目。最大的成长是<strong>独立做架构决策</strong>——包怎么拆、依赖拓扑怎么设计，全都要自己研究、自己决定、自己承担后果。
  </p>
  <div class="record__tags">
    <span class="tag">Monorepo</span>
    <span class="tag">React Native</span>
    <span class="tag">遗留治理</span>
  </div>
</div>

<div class="record__row">
  <span class="record__rev">R3</span>
  <p class="record__date">2023.02 — 2024.03<b>CROSS-PLATFORM</b></p>
  <p class="record__role">前端工程师<span>物联网智慧办公</span></p>
  <p class="record__detail">
    独立从零构建 Electron + Vue 3 物联网超管平台，双端交付；主导官网 Nuxt 3 SSR 重构。<strong>工位拖拽可视化</strong>——后台拖拽标记 + 小程序缩放选座，从下拉选工位号升级为所见即所得。团队内最早一批探索 AI 辅助开发。后因行业调整，团队解散。
  </p>
  <div class="record__tags">
    <span class="tag">Electron</span>
    <span class="tag">Nuxt 3 SSR</span>
    <span class="tag">拖拽可视化</span>
  </div>
</div>

<div class="record__row">
  <span class="record__rev">R2</span>
  <p class="record__date">2022.03 — 2022.12<b>FIRST LEADERSHIP</b></p>
  <p class="record__role">前端开发组长<span>小程序 / 外包</span></p>
  <p class="record__detail">
    第一次带团队，2 个人。负责技术选型和项目进度，成功交付 4 套小程序。<strong>从零设计通用后台 RBAC 权限体系</strong>（动态菜单 + 角色 + 按钮级指令），主动做了技术文档沉淀。离开是因为想找更有技术深度的工作。
  </p>
  <div class="record__tags">
    <span class="tag">带 2 人</span>
    <span class="tag">RBAC</span>
    <span class="tag">文档沉淀</span>
  </div>
</div>

<div class="record__row">
  <span class="record__rev">R1</span>
  <p class="record__date">2020.10 — 2022.03<b>FULL-STACK BASE</b></p>
  <p class="record__role">前端工程师<span>全栈雏形（含实习）</span></p>
  <p class="record__detail">
    Vue 2 + Element UI 写后台，uni-app 写小程序，兼任 Linux、Docker、Nginx 运维。运维占比偏大，但这段经历让我<strong>对完整部署链路有体感</strong>——前端不只是写浏览器里的代码。
  </p>
  <div class="record__tags">
    <span class="tag">Vue 2</span>
    <span class="tag">uni-app</span>
    <span class="tag">Docker</span>
    <span class="tag">Nginx</span>
  </div>
</div>
</div>

---

## 技术能力矩阵 — Equipment List

<div class="matrix">

<div class="matrix__cell">
  <p class="matrix__label">Frontend <i>CAT-A</i></p>
  <p class="matrix__text"><strong>Vue 2/3</strong>（5 年深度使用）、<strong>React</strong>（实际项目独立落地）、<strong>TypeScript</strong>（全面使用）、<strong>Nuxt 3</strong>（SSR + 全栈）、<strong>Pinia</strong>（工厂模式 + 跨应用共享）、<strong>Vite</strong>（Webpack 迁移 10x+）</p>
</div>

<div class="matrix__cell">
  <p class="matrix__label">Cross-Platform <i>CAT-A</i></p>
  <p class="matrix__text"><strong>React Native + Expo</strong>（46 页面独立开发）、<strong>Electron</strong>（桌面端交付）、<strong>Tauri v2</strong>（方案设计）、<strong>uni-app</strong>（190 页面）、<strong>微信小程序</strong>（原生 + 混合）</p>
</div>

<div class="matrix__cell">
  <p class="matrix__label">Architecture <i>CAT-S</i></p>
  <p class="matrix__text"><strong>pnpm Monorepo</strong>（9 共享包 + Turborepo）、<strong>Schema-driven UI</strong>（配置驱动 CRUD 引擎）、<strong>RBAC</strong>（动态菜单 + 按钮级指令）、<strong>DI / Factory</strong>（HTTP 客户端架构）</p>
</div>

<div class="matrix__cell">
  <p class="matrix__label">Data &amp; State <i>CAT-B</i></p>
  <p class="matrix__text"><strong>Zustand</strong>（跨平台持久化）、<strong>TanStack Query</strong>（服务端缓存）、<strong>Vuex</strong>（大型项目维护）、<strong>SSE / WebSocket</strong>（单例连接 + 多事件订阅）、<strong>I18n</strong>（多语言）</p>
</div>

<div class="matrix__cell">
  <p class="matrix__label">Infra <i>CAT-B</i></p>
  <p class="matrix__text"><strong>Docker / Nginx / PM2</strong>（部署运维）、<strong>GitLab CI + EAS Build</strong>（CI/CD）、<strong>Sentry</strong>（全项目接入）、ESLint 9 flat config、<strong>Linux</strong>（运维体感）</p>
</div>

<div class="matrix__cell">
  <p class="matrix__label">AI Workflow <i>CAT-S</i></p>
  <p class="matrix__text"><strong>Claude Code</strong> 日常主力，<strong>Plan-first + Multi-agent</strong> 研发体系，<strong>四维审查</strong>（数据模型一致性、字段复用、架构边界、副作用控制）验收标准</p>
</div>

</div>

<div class="directive">
  <div class="directive__inner">
    <p class="directive__label">Directive — AI-Native 工作流</p>
    <p class="directive__text">
      日常主力使用 Claude Code，建立了 <strong>Plan-first + Multi-agent</strong> 的 AI 辅助研发体系。不是让 AI 直接写代码然后粘贴——先让 AI 出技术方案，人工审核数据模型和架构边界，确认后再编码，最后用四维审查标准验收。有了这套流程，Nuxt 3 全栈项目 <strong>1 个月完成了传统模式下数月的工作量</strong>。业余还写了 <strong>Rust 剪贴板增强工具</strong>（274 GitHub Stars），纯粹因为觉得 Windows 自带的不好用。
    </p>
  </div>
</div>

---

## 开源与社区

业余写了 **[WinPaste](https://github.com/eq1024/WinPaste)**——一个 Windows 剪贴板增强工具，用 Rust 写的，纯粹因为觉得 Windows 自带的不好用。获得了 **274 GitHub Stars**。

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
