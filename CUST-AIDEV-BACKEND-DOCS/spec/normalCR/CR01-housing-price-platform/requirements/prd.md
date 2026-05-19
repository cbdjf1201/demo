# PRD / Product Requirements Document / 产品需求文档

## 1. Change Request
`CR01-housing-price-platform`

## 2. Product Context / 产品背景
This CR implements the full scope described in `Interview Tasks Fullstack.pdf`.
本 CR 按照 `Interview Tasks Fullstack.pdf` 的完整范围实施。

The deliverable is a live interview-ready full-stack platform, not a reduced single-backend prototype.
交付物是可现场演示的 full-stack 平台，不是缩减版单后端原型。

## 3. Required Product Scope / 必需产品范围
The PDF defines two major tasks.
PDF 定义了两个主要任务。

### Task 1: Housing Price Prediction Model API
Build, containerise, and deploy a regression model API that predicts housing prices from the provided dataset.
构建、容器化并部署一个基于给定数据集预测房价的回归模型 API。

Required endpoints:
必需接口：

- `predict`: accepts housing features and returns price predictions for single and batch input
- `predict`：接收房产特征，支持单条和批量预测
- `model-info`: returns model coefficients and performance metrics
- `model-info`：返回模型系数和性能指标
- `health`: simple health check endpoint
- `health`：健康检查接口

Required technologies:
必需技术：

- `Python 3.12+`
- `FastAPI`
- `Scikit-learn`

### Task 2: Multi-Application Next.js Portal
Create a unified `Next.js` portal that hosts two independent applications with different backend technologies.
创建统一的 `Next.js` 门户，承载两个使用不同后端技术的独立应用。

Required applications:
必需应用：

- `Property Value Estimator` with a Python backend
- `Property Value Estimator`，使用 Python 后端
- `Property Market Analysis` with a Java backend
- `Property Market Analysis`，使用 Java 后端

Both applications must interact with the ML model API from Task 1.
两个应用都必须与 Task 1 的 ML 模型 API 交互。

## 4. Product Goals / 产品目标
- Provide housing price predictions from structured property inputs.
- 基于结构化房产输入提供价格预测。
- Provide a unified portal with consistent navigation and layout.
- 提供统一门户、统一导航和一致布局。
- Demonstrate Python backend integration with the ML model service.
- 展示 Python 后端与 ML 模型服务的集成。
- Demonstrate Java backend integration with the ML model service.
- 展示 Java 后端与 ML 模型服务的集成。
- Provide market analysis, what-if analysis, and CSV/PDF exports.
- 提供市场分析、what-if 分析以及 CSV/PDF 导出。

## 5. User Scope / 用户范围
- Interview reviewer using Swagger/OpenAPI and the live portal.
- 使用 Swagger/OpenAPI 与现场门户的面试评审者。
- Candidate demonstrating the system end to end.
- 执行端到端演示的候选人。

## 6. Must Have / 必须具备
- ML model API with `predict`, `model-info`, and `health`.
- 具备 `predict`、`model-info` 和 `health` 的 ML 模型 API。
- Dockerfile for the model API.
- 模型 API 的 Dockerfile。
- Live Swagger/OpenAPI demonstration for the model API.
- 模型 API 可通过 Swagger/OpenAPI 现场演示。
- Unified `Next.js` portal using App Router.
- 使用 App Router 的统一 `Next.js` 门户。
- Shared navigation and layout between applications.
- 两个应用之间共享导航与布局。
- Layout-level loading and error states.
- 布局层 loading 与 error 状态。
- `Property Value Estimator` frontend and Python backend.
- `Property Value Estimator` 前端与 Python 后端。
- Estimator form with all model fields and client-side validation.
- 包含所有模型字段和客户端校验的估值表单。
- Prediction result shown in both table and chart form.
- 预测结果同时以表格和图表展示。
- Estimate history and side-by-side comparison.
- 历史估值和并排对比。
- `Property Market Analysis` frontend and Java backend.
- `Property Market Analysis` 前端与 Java 后端。
- Interactive market dashboard with visualizations and filters.
- 带可视化和筛选器的交互式市场仪表盘。
- What-if analysis using the ML model.
- 使用 ML 模型的 what-if 分析。
- CSV and PDF export.
- CSV 与 PDF 导出。
- Responsive data tables with sorting and filtering.
- 支持排序和过滤的响应式数据表。
- Java backend aggregate statistics and caching.
- Java 后端聚合统计与缓存优化。

## 7. Non-Goals / 非目标
- Production authentication and authorization.
- 生产级认证与授权。
- Real-time external market data ingestion.
- 实时外部市场数据接入。
- Complex MLOps platform.
- 复杂 MLOps 平台。
- Production-grade distributed deployment.
- 生产级分布式部署。

## 8. Acceptance Criteria / 验收标准
- Model API can be started, inspected through OpenAPI, and called for single and batch prediction.
- 模型 API 可启动、可通过 OpenAPI 查看，并支持单条与批量预测调用。
- `model-info` returns coefficients and performance metrics.
- `model-info` 返回模型系数和性能指标。
- The portal provides navigation between both applications.
- 门户可在两个应用之间导航。
- App 1 calls the Python backend, and the Python backend calls the model API.
- 应用一调用 Python 后端，Python 后端调用模型 API。
- App 2 calls the Java backend, and the Java backend calls the model API for what-if analysis.
- 应用二调用 Java 后端，Java 后端在 what-if 分析中调用模型 API。
- Market analysis supports filters, visualizations, responsive tables, CSV export, and PDF export.
- 市场分析支持筛选、可视化、响应式表格、CSV 导出和 PDF 导出。
