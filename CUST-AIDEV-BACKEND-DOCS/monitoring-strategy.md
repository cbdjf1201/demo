# Monitoring Strategy / 监控策略

## 1. Minimum Signals / 最小监控信号
- ML model API health and model load status
- ML 模型 API 健康状态和模型加载状态
- Python estimator backend request errors
- Python 估值后端请求错误
- Java market backend request errors and cache usage
- Java 市场后端请求错误和缓存使用情况
- model API call failures from both application backends
- 两个应用后端调用模型 API 的失败情况
- export failures for CSV and PDF
- CSV 和 PDF 导出失败情况

## 2. Demo-Level Observability / 演示级可观测性
For the interview implementation, application logs and health endpoints are sufficient.
对于面试实现，应用日志和健康检查接口足够。

Each service should log startup, downstream call failures, and validation errors.
每个服务应记录启动、下游调用失败和校验错误。
