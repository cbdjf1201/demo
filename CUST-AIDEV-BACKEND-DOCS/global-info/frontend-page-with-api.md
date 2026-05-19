# Frontend Pages With API Mapping / 前端页面与接口映射

## 1. Portal Scope / 门户范围
The `Next.js` portal hosts two independent applications under one shared layout.
`Next.js` 门户在统一布局下承载两个独立应用。

## 2. Page to API Mapping / 页面与接口映射
| Route | Purpose | Backend |
| --- | --- | --- |
| `/` | service overview and navigation / 服务概览与导航 | portal server components |
| `/estimator` | property estimate form / 房产估值表单 | Python estimator backend |
| `/estimator/history` | previous estimates / 历史估值 | Python estimator backend |
| `/estimator/compare` | side-by-side property comparison / 多房产对比 | Python estimator backend |
| `/market-analysis` | interactive market dashboard / 交互式市场分析仪表盘 | Java market backend |
| `/market-analysis/what-if` | scenario analysis using model predictions / 基于模型的假设分析 | Java market backend plus model API |
| `/market-analysis/export` | CSV and PDF export / CSV 与 PDF 导出 | Java market backend |

## 3. Required UI Behaviors / 必需前端行为
- App Router handles routing between and within applications.
- 使用 App Router 处理应用之间和应用内部路由。
- Shared layout provides navigation, loading states, and error states.
- 共享布局提供导航、加载状态和错误状态。
- Estimator results are shown in both table and chart form.
- 估值结果必须同时以表格和图表展示。
- Market tables are responsive and support sorting/filtering.
- 市场分析表格必须响应式并支持排序与过滤。
- Segment filters and what-if analysis are first-class dashboard controls.
- 分段筛选和 what-if 分析必须作为仪表盘核心控制项。
