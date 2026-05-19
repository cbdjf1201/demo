# API Document / 核心平台接口文档

## 1. API Groups / 接口分组
The platform has three API groups aligned with the PDF scope.
平台按 PDF 范围划分为三组接口。

- ML Model API / ML 模型 API
- Python Estimator Backend API / Python 估值后端 API
- Java Market Analysis Backend API / Java 市场分析后端 API

## 2. ML Model API / ML 模型 API
Base path suggestion:
建议基础路径：

`/api/v1`

### `GET /health`
Returns model service health.
返回模型服务健康状态。

```json
{
  "status": "ok",
  "service": "housing-price-model-api"
}
```

### `GET /model-info`
Returns model coefficients and performance metrics.
返回模型系数和性能指标。

```json
{
  "model_name": "linear_regression",
  "features": [
    "square_footage",
    "bedrooms",
    "bathrooms",
    "year_built",
    "lot_size",
    "distance_to_city_center",
    "school_rating"
  ],
  "coefficients": {
    "square_footage": 0.0,
    "bedrooms": 0.0,
    "bathrooms": 0.0,
    "year_built": 0.0,
    "lot_size": 0.0,
    "distance_to_city_center": 0.0,
    "school_rating": 0.0
  },
  "intercept": 0.0,
  "metrics": {
    "rmse": 0.0,
    "mae": 0.0,
    "r2": 0.0
  }
}
```

### `POST /predict`
Accepts either single or batch housing feature input and returns price predictions.
接收单条或批量房产特征输入，并返回价格预测。

Single request example:
单条请求示例：

```json
{
  "square_footage": 1550,
  "bedrooms": 3,
  "bathrooms": 2,
  "year_built": 1997,
  "lot_size": 6800,
  "distance_to_city_center": 4.1,
  "school_rating": 7.6
}
```

Batch request example:
批量请求示例：

```json
{
  "items": [
    {
      "square_footage": 1550,
      "bedrooms": 3,
      "bathrooms": 2,
      "year_built": 1997,
      "lot_size": 6800,
      "distance_to_city_center": 4.1,
      "school_rating": 7.6
    }
  ]
}
```

## 3. Python Estimator Backend API / Python 估值后端 API
Base path suggestion:
建议基础路径：

`/api/estimator/v1`

### `POST /estimates`
Handles form submission and calls the ML model API.
处理估值表单提交，并调用 ML 模型 API。

### `GET /estimates/history`
Returns previous estimates.
返回历史估值记录。

### `POST /estimates/compare`
Compares multiple properties side by side by using model predictions.
通过模型预测并排比较多个房产。

## 4. Java Market Analysis Backend API / Java 市场分析后端 API
Base path suggestion:
建议基础路径：

`/api/market/v1`

### `GET /summary`
Returns aggregate statistics from the housing dataset.
返回基于房价数据集的聚合统计。

### `GET /segments`
Returns filtered market segment data.
返回筛选后的市场分段数据。

Suggested query parameters:
建议查询参数：

- `min_bedrooms`
- `max_bedrooms`
- `min_school_rating`
- `max_distance_to_city_center`
- `min_price`
- `max_price`

### `POST /what-if`
Runs what-if analysis by calling the ML model API.
通过调用 ML 模型 API 执行 what-if 分析。

### `GET /exports/market.csv`
Exports market analysis data as CSV.
将市场分析数据导出为 CSV。

### `GET /exports/market.pdf`
Exports market analysis data as PDF.
将市场分析数据导出为 PDF。

## 5. Contract Notes / 契约说明
- Frontend business flows call the Python or Java application backends, not the model API directly.
- 前端业务流程调用 Python 或 Java 应用后端，不直接调用模型 API。
- Both application backends call the ML model API for prediction needs.
- 两个应用后端都在需要预测时调用 ML 模型 API。
