# Deployment Guide: Local Demo / 本地演示部署指南

## 1. Target Topology / 目标拓扑
The local demo should run the full PDF scope.
本地演示应运行 PDF 的完整范围。

- `FastAPI` ML model API
- `FastAPI` ML 模型 API
- Python estimator backend
- Python 估值后端
- Java 21 + Spring Boot 3.4.4 market analysis backend
- Java 21 + Spring Boot 3.4.4 市场分析后端
- `Next.js` unified portal
- `Next.js` 统一门户

## 2. Startup Order / 启动顺序
1. Start the ML model API.
1. 启动 ML 模型 API。
2. Verify `health`, `model-info`, and `predict`.
2. 验证 `health`、`model-info` 和 `predict`。
3. Start the Python estimator backend.
3. 启动 Python 估值后端。
4. Start the Java market analysis backend.
4. 启动 Java 市场分析后端。
5. Start the Next.js portal.
5. 启动 Next.js 门户。

## 3. Demo Checklist / 演示检查项
- Swagger/OpenAPI for model API is available.
- 模型 API 的 Swagger/OpenAPI 可访问。
- Estimator app can submit property details and show table/chart results.
- 估值应用可提交房产信息并展示表格/图表结果。
- History and comparison views work.
- 历史与对比视图可用。
- Market analysis dashboard renders visualizations and filters.
- 市场分析仪表盘可展示可视化和筛选器。
- What-if analysis calls the model API.
- what-if 分析调用模型 API。
- CSV and PDF exports work.
- CSV 和 PDF 导出可用。
- Java backend caching can be explained or demonstrated.
- Java 后端缓存可说明或演示。
