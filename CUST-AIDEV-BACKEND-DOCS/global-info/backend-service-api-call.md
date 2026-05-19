# Backend Service API Call Map / 后端服务调用说明

## 1. Required Service Topology / 必需服务拓扑
The PDF requires two independent applications with different backend technologies, both interacting with the ML model API.
PDF 要求两个独立应用使用不同后端技术，并且都能与 ML 模型 API 交互。

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

## 2. Task 1 Model API Calls / Task 1 模型 API 调用
The model API is the shared inference dependency.
模型 API 是两个应用共同依赖的推理服务。

- `POST /predict`: single and batch predictions
- `POST /predict`：单条与批量预测
- `GET /model-info`: model coefficients and performance metrics
- `GET /model-info`：模型系数与性能指标
- `GET /health`: service health check
- `GET /health`：服务健康检查

## 3. App 1 Flow: Property Value Estimator / 应用一：房产估值流程
1. The user submits property details in the portal.
1. 用户在门户中提交房产信息。
2. The Python estimator backend validates and handles the form submission.
2. Python 估值后端完成表单处理与校验。
3. The Python backend calls the Task 1 model API.
3. Python 后端调用 Task 1 模型 API。
4. Results are returned to the UI as table and chart data.
4. 结果以表格和图表数据形式返回前端。
5. The estimate can be added to history and comparison views.
5. 估值结果可进入历史记录与对比视图。

## 4. App 2 Flow: Property Market Analysis / 应用二：市场分析流程
1. The user opens the analysis dashboard and applies filters.
1. 用户打开市场分析仪表盘并设置筛选条件。
2. The Java backend returns aggregate statistics and table data.
2. Java 后端返回聚合统计和表格数据。
3. The Java backend calls the Task 1 model API for what-if scenarios.
3. Java 后端针对 what-if 场景调用 Task 1 模型 API。
4. The Java backend caches expensive analysis responses.
4. Java 后端对高成本分析响应进行缓存。
5. The Java backend provides CSV and PDF export endpoints.
5. Java 后端提供 CSV 与 PDF 导出接口。
