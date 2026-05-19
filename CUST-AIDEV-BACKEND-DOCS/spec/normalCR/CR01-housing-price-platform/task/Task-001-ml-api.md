# Task-001 ML Model API / ML 模型 API

## Objective / 目标
Build, containerise, and expose the housing price prediction model API.
构建、容器化并暴露房价预测模型 API。

## Scope / 范围
- Train or load a regression model using `House Price Dataset.csv`.
- 使用 `House Price Dataset.csv` 训练或加载回归模型。
- Expose `predict` supporting single and batch inputs.
- 暴露支持单条和批量输入的 `predict`。
- Expose `model-info` returning coefficients and performance metrics.
- 暴露返回模型系数和性能指标的 `model-info`。
- Expose `health`.
- 暴露 `health`。
- Provide Dockerfile and OpenAPI documentation.
- 提供 Dockerfile 和 OpenAPI 文档。

## Acceptance Criteria / 验收标准
- Swagger/OpenAPI shows all three endpoints.
- Swagger/OpenAPI 展示全部三个接口。
- `predict` handles single and batch input.
- `predict` 支持单条和批量输入。
- `model-info` includes `coefficients`, `intercept`, and `metrics`.
- `model-info` 包含 `coefficients`、`intercept` 和 `metrics`。
- The service can run in a container.
- 服务可在容器中运行。
