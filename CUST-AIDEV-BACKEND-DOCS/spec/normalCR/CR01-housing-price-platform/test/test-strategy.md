# Test Strategy / 测试策略

## 1. Test Scope / 测试范围
The test strategy covers the full PDF scope.
测试策略覆盖 PDF 完整范围。

- ML model API tests
- ML 模型 API 测试
- Python estimator backend tests
- Python 估值后端测试
- Java market analysis backend tests
- Java 市场分析后端测试
- Next.js portal integration tests
- Next.js 门户集成测试
- end-to-end demo smoke tests
- 端到端演示冒烟测试

## 2. Focus Areas / 测试重点
- `predict` single and batch behavior
- `predict` 单条与批量行为
- `model-info` coefficients and metrics
- `model-info` 模型系数和指标
- estimator form validation and backend error handling
- 估值表单校验和后端错误处理
- table and chart result rendering
- 表格和图表结果展示
- market aggregation and filters
- 市场聚合与筛选
- Java backend model integration for what-if analysis
- Java 后端在 what-if 分析中的模型集成
- CSV and PDF export
- CSV 与 PDF 导出
- caching behavior for market analysis responses
- 市场分析响应缓存行为

## 3. Test Levels / 测试层级
- unit tests for model and service logic
- 模型与服务逻辑单元测试
- API contract tests for all backend groups
- 所有后端分组的 API 契约测试
- UI integration tests for portal flows
- 门户流程 UI 集成测试
- local demo smoke tests
- 本地演示冒烟测试
