# Requirements Analysis / 需求分析

## 1. Requirement Judgment / 需求判断
The PDF should be treated as the source of truth. The required solution is a multi-application portal with Python and Java backends, both integrating with the ML model API.
PDF 应作为需求事实来源。目标方案是一个多应用门户，包含 Python 和 Java 后端，并且两个后端都要集成 ML 模型 API。

## 2. Model API Requirements / 模型 API 需求
### FR-001 Prediction API
The system shall provide `predict` for single and batch housing price prediction.
系统必须提供 `predict`，支持单条和批量房价预测。

### FR-002 Model Info API
The system shall provide `model-info` returning model coefficients and performance metrics.
系统必须提供 `model-info`，返回模型系数和性能指标。

### FR-003 Health API
The system shall provide `health` for service status checks.
系统必须提供 `health` 用于服务健康检查。

### FR-004 Model Containerization
The model API shall include a Dockerfile and be runnable as a model container.
模型 API 必须包含 Dockerfile，并可作为模型容器运行。

## 3. Portal Requirements / 门户需求
### FR-005 Unified Navigation and Layout
The portal shall provide shared layout and navigation between the two applications.
门户必须在两个应用之间提供共享布局和导航。

### FR-006 App Router
The portal shall use `Next.js App Router` for routing between and within applications.
门户必须使用 `Next.js App Router` 处理应用之间和应用内部路由。

### FR-007 Consistent Design System
The portal shall provide a consistent design system across both applications.
门户必须为两个应用提供一致设计系统。

### FR-008 Layout-Level States
The portal shall handle loading and error states at the layout level.
门户必须在布局层处理 loading 和 error 状态。

## 4. App 1: Property Value Estimator / 应用一：房产估值
### FR-009 Estimator Form
The frontend shall provide a form for all model fields.
前端必须提供包含所有模型字段的表单。

Required fields:
必需字段：

- `square_footage`
- `bedrooms`
- `bathrooms`
- `year_built`
- `lot_size`
- `distance_to_city_center`
- `school_rating`

### FR-010 Client Validation
The frontend shall implement client-side validation with appropriate error messages.
前端必须实现客户端校验和明确错误提示。

### FR-011 Table and Chart Result Display
Prediction results shall be displayed in both tabular format and visual chart.
预测结果必须同时以表格和可视化图表展示。

### FR-012 Estimate History
The frontend shall provide a history feature showing previous estimates.
前端必须提供历史记录功能，展示过往估值。

### FR-013 Comparison View
The frontend shall provide a side-by-side comparison view for multiple properties.
前端必须提供多房产并排对比视图。

### FR-014 Python Backend
The Python backend shall handle form submissions, integrate with the model container, and implement validation and error handling.
Python 后端必须处理表单提交、集成模型容器，并实现校验和错误处理。

## 5. App 2: Property Market Analysis / 应用二：房产市场分析
### FR-015 Interactive Dashboard
The frontend shall provide an interactive dashboard with property market visualizations.
前端必须提供带房产市场可视化的交互式仪表盘。

### FR-016 Segment Filters
The frontend shall provide filters for analyzing different property segments.
前端必须提供用于分析不同房产分段的筛选器。

### FR-017 What-If Analysis
The frontend and Java backend shall provide a what-if analysis tool using the model.
前端和 Java 后端必须提供使用模型的 what-if 分析工具。

### FR-018 CSV and PDF Export
The system shall provide data export options for CSV and PDF.
系统必须提供 CSV 和 PDF 数据导出。

### FR-019 Responsive Tables
The frontend shall provide responsive data tables with sorting and filtering.
前端必须提供支持排序和过滤的响应式数据表。

### FR-020 Java Backend REST APIs
The Java backend shall provide REST API endpoints for market analysis.
Java 后端必须提供市场分析 REST API。

### FR-021 Aggregate Statistics
The Java backend shall generate aggregate statistics from the housing dataset.
Java 后端必须基于房价数据集生成聚合统计。

### FR-022 Java Model Integration
The Java backend shall integrate with the Task 1 model container.
Java 后端必须集成 Task 1 模型容器。

### FR-023 Caching
The Java backend shall implement caching for performance optimization.
Java 后端必须实现缓存以优化性能。

## 6. Technical Requirements / 技术要求
- `Python 3.12+`
- `FastAPI`
- `Scikit-learn`
- `Next.js App Router`
- `Tailwind CSS`
- `Java 21`
- `Spring Boot 3.4.4`
- WCAG-aligned accessible UI components
- 符合 WCAG 指导原则的可访问 UI 组件
- React Server Components for initial data loading
- 使用 React Server Components 进行初始数据加载
- custom hooks for shared client functionality
- 使用 custom hooks 封装共享客户端功能

## 7. Assumptions / 假设
- Authentication is not required by the PDF.
- PDF 未要求认证鉴权。
- The provided dataset is sufficient for model training and market analysis demonstration.
- 给定数据集足以支撑模型训练和市场分析演示。
- Local demo deployment is acceptable for interview presentation.
- 本地演示部署可满足面试展示。
