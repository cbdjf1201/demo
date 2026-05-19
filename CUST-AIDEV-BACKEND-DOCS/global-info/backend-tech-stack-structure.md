# Backend Tech Stack Structure / 后端技术栈结构

## 1. Services / 服务划分
The implementation should be structured as three backend-facing services.
实现上应按三个后端相关服务划分。

### ML Model API Service / ML 模型 API 服务
```text
model-api/
  app/
    routers/
    schemas/
    services/
    model_store/
  Dockerfile
```

### Python Estimator Backend / Python 估值后端
```text
estimator-backend/
  app/
    routers/
    schemas/
    services/
    repositories/
  Dockerfile
```

### Java Market Analysis Backend / Java 市场分析后端
```text
market-analysis-backend/
  src/main/java/
    controller/
    service/
    client/
    cache/
    dto/
  pom.xml
```

## 2. Responsibility Boundaries / 职责边界
- The model API trains, loads, and serves the regression model.
- 模型 API 负责训练、加载和服务回归模型。
- The Python backend handles estimator form submissions, validation, history, and comparison.
- Python 后端负责估值表单提交、校验、历史记录和对比。
- The Java backend handles market analysis, aggregation, filtering, caching, what-if orchestration, and export.
- Java 后端负责市场分析、聚合、筛选、缓存、what-if 编排和导出。
- The portal handles navigation, layout, client validation, visualization, and UI state.
- 门户负责导航、布局、客户端校验、可视化和 UI 状态。

## 3. Integration Rule / 集成规则
Both the Python backend and the Java backend integrate with the Task 1 ML model API over HTTP.
Python 后端和 Java 后端都通过 HTTP 与 Task 1 ML 模型 API 集成。

The frontend should not directly call the model API for business flows unless it is only for demo diagnostics.
除非只是用于演示诊断，前端业务流程不应直接调用模型 API。
