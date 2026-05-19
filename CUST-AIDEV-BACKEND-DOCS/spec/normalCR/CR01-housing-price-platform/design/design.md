# Technical Design / 技术设计文档

## 1. Target Architecture / 目标架构
The target architecture follows the PDF full scope.
目标架构遵循 PDF 的完整范围。

```text
Next.js Unified Portal
  |- Property Value Estimator
  |    -> Python Estimator Backend
  |        -> FastAPI ML Model API
  |
  `- Property Market Analysis
       -> Java Spring Boot Market Backend
           -> FastAPI ML Model API
```

## 2. Components / 组件
### ML Model API / ML 模型 API
- Built with `Python 3.12+`, `FastAPI`, and `scikit-learn`.
- 使用 `Python 3.12+`、`FastAPI` 和 `scikit-learn` 构建。
- Trains or loads the regression model.
- 训练或加载回归模型。
- Provides `predict`, `model-info`, and `health`.
- 提供 `predict`、`model-info` 和 `health`。
- Runs as a containerized service.
- 以容器化服务运行。

### Python Estimator Backend / Python 估值后端
- Handles estimator form submissions.
- 处理估值表单提交。
- Performs backend validation and error handling.
- 执行后端校验和错误处理。
- Calls the ML model API for prediction.
- 调用 ML 模型 API 进行预测。
- Supports history and comparison data.
- 支持历史记录和对比数据。

### Java Market Analysis Backend / Java 市场分析后端
- Built with `Java 21` and `Spring Boot 3.4.4`.
- 使用 `Java 21` 和 `Spring Boot 3.4.4` 构建。
- Provides market analysis REST APIs.
- 提供市场分析 REST API。
- Generates aggregate statistics from the housing dataset.
- 基于房价数据集生成聚合统计。
- Calls the ML model API for what-if analysis.
- 为 what-if 分析调用 ML 模型 API。
- Implements caching for performance optimization.
- 实现缓存优化。
- Provides CSV and PDF exports.
- 提供 CSV 与 PDF 导出。

### Next.js Portal / Next.js 门户
- Uses `App Router` for routing between and within applications.
- 使用 `App Router` 处理应用之间和应用内部路由。
- Provides shared navigation and layout.
- 提供共享导航和布局。
- Uses Server Components for initial data loading where appropriate.
- 在适当场景使用 Server Components 进行初始数据加载。
- Uses Client Components for forms, filters, charts, and interactive tables.
- 使用 Client Components 处理表单、筛选器、图表和交互式表格。
- Uses `Tailwind CSS` and accessible components aligned with WCAG.
- 使用 `Tailwind CSS` 和符合 WCAG 的可访问组件。

## 3. Data Flows / 数据流
### Estimator Flow / 估值流程
```text
User -> Next.js Estimator UI -> Python Backend -> ML Model API -> Python Backend -> Next.js UI
```

### Market Dashboard Flow / 市场仪表盘流程
```text
User -> Next.js Market UI -> Java Backend -> Dataset Aggregation/Cache -> Next.js UI
```

### What-If Flow / 假设分析流程
```text
User -> Next.js Market UI -> Java Backend -> ML Model API -> Java Backend -> Next.js UI
```

## 4. API Ownership / API 归属
- Model API endpoints belong to the ML service.
- 模型 API 接口归属 ML 服务。
- Estimator APIs belong to the Python backend.
- 估值相关接口归属 Python 后端。
- Market analysis, export, and caching-backed APIs belong to the Java backend.
- 市场分析、导出和缓存相关接口归属 Java 后端。

## 5. Error Handling / 错误处理
- Validation errors return structured field-level responses.
- 校验错误返回结构化字段级响应。
- Model service unavailability is mapped to user-readable backend errors.
- 模型服务不可用时转换为用户可读的后端错误。
- Layout-level error boundaries handle portal-level failures.
- 布局层错误边界处理门户级失败。

## 6. Design Decisions / 设计决策
- Java backend is required for App 2 because the PDF explicitly defines `Property Market Analysis (Java Backend)`.
- Java 后端是应用二必需项，因为 PDF 明确定义了 `Property Market Analysis (Java Backend)`。
- The model API remains the single inference authority.
- 模型 API 保持为唯一推理来源。
- The portal keeps a unified user experience while the backend responsibilities are split by application.
- 门户保持统一体验，后端职责按应用拆分。
