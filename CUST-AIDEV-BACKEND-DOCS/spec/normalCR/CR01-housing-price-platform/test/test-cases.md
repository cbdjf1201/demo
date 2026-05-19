# Test Cases / 测试用例清单

## 1. ML Model API / ML 模型 API
1. `GET /health` returns healthy status.
1. `GET /health` 返回健康状态。
2. `GET /model-info` returns coefficients and metrics.
2. `GET /model-info` 返回模型系数和指标。
3. `POST /predict` supports single prediction.
3. `POST /predict` 支持单条预测。
4. `POST /predict` supports batch prediction.
4. `POST /predict` 支持批量预测。

## 2. Property Value Estimator / 房产估值应用
1. Estimator form renders all model fields.
1. 估值表单渲染所有模型字段。
2. Client-side validation shows clear error messages.
2. 客户端校验显示明确错误提示。
3. Python backend handles form submissions and calls model API.
3. Python 后端处理表单提交并调用模型 API。
4. Prediction result appears in both table and chart format.
4. 预测结果同时以表格和图表展示。
5. History and comparison views show previous estimates.
5. 历史和对比视图展示过往估值。

## 3. Property Market Analysis / 房产市场分析
1. Dashboard renders visualizations.
1. 仪表盘渲染可视化内容。
2. Segment filters update analysis results.
2. 分段筛选更新分析结果。
3. Responsive tables support sorting and filtering.
3. 响应式表格支持排序和过滤。
4. Java backend returns aggregate statistics.
4. Java 后端返回聚合统计。
5. What-if analysis calls model API.
5. what-if 分析调用模型 API。
6. CSV export succeeds.
6. CSV 导出成功。
7. PDF export succeeds.
7. PDF 导出成功。
8. Cache is used for market analysis responses where configured.
8. 已配置的市场分析响应使用缓存。

## 4. Demo Smoke Test / 演示冒烟测试
1. Start model API.
1. 启动模型 API。
2. Start Python estimator backend.
2. 启动 Python 估值后端。
3. Start Java market backend.
3. 启动 Java 市场后端。
4. Start Next.js portal.
4. 启动 Next.js 门户。
5. Complete one estimator flow.
5. 完成一次估值流程。
6. Complete one market analysis and export flow.
6. 完成一次市场分析和导出流程。
