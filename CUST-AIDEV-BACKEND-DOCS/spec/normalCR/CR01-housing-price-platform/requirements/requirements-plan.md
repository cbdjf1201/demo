# Requirements Plan / 需求规划

## 1. Planning Basis / 规划依据
The plan follows the full PDF scope: Task 1 model API, Task 2 unified portal, Python backend application, and Java backend application.
本规划遵循 PDF 完整范围：Task 1 模型 API、Task 2 统一门户、Python 后端应用和 Java 后端应用。

## 2. Stage 1: Model API / 阶段一：模型 API
- Load and validate `House Price Dataset.csv`.
- 加载并校验 `House Price Dataset.csv`。
- Train a simple regression model using `scikit-learn`.
- 使用 `scikit-learn` 训练简单回归模型。
- Expose `predict`, `model-info`, and `health`.
- 暴露 `predict`、`model-info` 和 `health`。
- Support single and batch prediction.
- 支持单条和批量预测。
- Return model coefficients and performance metrics.
- 返回模型系数和性能指标。
- Provide Dockerfile and Swagger/OpenAPI demo.
- 提供 Dockerfile 和 Swagger/OpenAPI 演示。

## 3. Stage 2: Unified Next.js Portal / 阶段二：统一 Next.js 门户
- Implement shared layout and navigation between both applications.
- 实现两个应用之间的共享布局与导航。
- Use App Router for routing between and within applications.
- 使用 App Router 处理应用之间和应用内部路由。
- Implement layout-level loading and error states.
- 实现布局层 loading 与 error 状态。
- Establish a consistent design system using `Tailwind CSS`.
- 使用 `Tailwind CSS` 建立一致设计系统。
- Use server and client components appropriately.
- 合理使用 Server Components 和 Client Components。

## 4. Stage 3: Property Value Estimator / 阶段三：房产估值应用
- Build estimator form with all model fields.
- 构建包含所有模型字段的估值表单。
- Add client-side validation and error messages.
- 添加客户端校验和错误提示。
- Implement Python backend form handling, validation, and error handling.
- 实现 Python 后端表单处理、校验和错误处理。
- Integrate Python backend with the model container.
- 将 Python 后端与模型容器集成。
- Display results in tables and charts.
- 以表格和图表展示结果。
- Add estimate history and comparison view.
- 添加历史记录和对比视图。

## 5. Stage 4: Property Market Analysis / 阶段四：房产市场分析应用
- Build interactive dashboard with property market visualizations.
- 构建带市场可视化的交互式仪表盘。
- Implement filters for property segments.
- 实现房产分段筛选。
- Build what-if analysis using the model API.
- 基于模型 API 构建 what-if 分析。
- Implement responsive data tables with sorting/filtering.
- 实现带排序和过滤的响应式数据表。
- Implement Java 21 + Spring Boot 3.4.4 backend.
- 实现 Java 21 + Spring Boot 3.4.4 后端。
- Create market analysis REST APIs and aggregate statistics.
- 创建市场分析 REST API 和聚合统计。
- Integrate Java backend with the model container.
- 将 Java 后端与模型容器集成。
- Implement caching for performance optimization.
- 实现缓存优化。
- Provide CSV and PDF exports.
- 提供 CSV 与 PDF 导出。

## 6. Completion Definition / 完成定义
- Every required PDF feature is mapped to at least one implementation task.
- PDF 中每个必需功能都映射到至少一个实现任务。
- The three backend-facing services have clear boundaries.
- 三个后端相关服务边界清晰。
- The portal can demonstrate both applications live.
- 门户可现场演示两个应用。
