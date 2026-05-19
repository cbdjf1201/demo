# Backend Tech Stack Components / 后端技术栈组件

## 1. Required Stack / 必需技术栈
The following technologies are required by the PDF brief.
以下技术由 PDF 原始需求明确要求。

### ML Model API / 模型 API
- `Python 3.12+`
- `FastAPI`
- `scikit-learn`
- `pydantic`
- `pandas`
- `joblib`
- `uvicorn`
- `Docker`

### Property Value Estimator Backend / 房产估值后端
- `Python 3.12+`
- `FastAPI`
- request validation and error handling
- 请求校验与错误处理
- integration with the Task 1 model container
- 与 Task 1 模型容器集成

### Property Market Analysis Backend / 房产市场分析后端
- `Java 21`
- `Spring Boot 3.4.4`
- REST APIs for market analysis
- 市场分析 REST API
- aggregate statistics from the housing dataset
- 基于房价数据集生成聚合统计
- model service integration
- 集成模型服务
- caching for performance optimization
- 缓存优化

### Unified Portal / 统一门户
- `Next.js`
- `React`
- `TypeScript`
- `Tailwind CSS`
- `Next.js App Router`

## 2. Supporting Components / 支撑组件
- CSV export library for analysis export
- 用于分析导出的 CSV 工具
- PDF generation library for PDF export
- 用于 PDF 导出的生成工具
- frontend charting library for prediction and market visualizations
- 用于预测与市场可视化的前端图表库
- local persistence for estimate history
- 用于历史估值的本地持久化能力

## 3. Technology Boundary / 技术边界
`FastAPI` owns model inference and estimator backend flows.
`FastAPI` 负责模型推理和估值后端流程。

`Spring Boot` owns market analysis, aggregation, caching, and export orchestration.
`Spring Boot` 负责市场分析、聚合、缓存和导出编排。

`Next.js` owns the unified user experience across both applications.
`Next.js` 负责两个应用的统一用户体验。
