# 房价预测平台

全栈房产价格预测与市场分析系统，包含模型服务、估值后端、市场分析后端与统一 Web 门户。

## 组成
- `model-api`：房价预测模型服务（FastAPI + scikit-learn）
- `estimator-backend`：房产估值后端
- `market-analysis-backend`：房产市场分析后端（Spring Boot）
- `portal`：统一门户（Next.js）

## 环境要求
本地开发默认使用工作区内的便携运行时：
- `tools/python312`
- `tools/jdk21`
- `tools/maven`
- `portal/node_modules`（首次需在 portal 目录执行 `npm install`）

## 启动顺序
1. `powershell -ExecutionPolicy Bypass -File .\scripts\install-python-deps.ps1`
2. `powershell -ExecutionPolicy Bypass -File .\scripts\start-model-api.ps1`
3. `powershell -ExecutionPolicy Bypass -File .\scripts\start-estimator-backend.ps1`
4. `powershell -ExecutionPolicy Bypass -File .\scripts\start-market-analysis-backend.ps1`
5. `powershell -ExecutionPolicy Bypass -File .\scripts\start-portal.ps1`

## 访问地址
- 模型 API：`http://127.0.0.1:8000/docs`
- 估值后端：`http://127.0.0.1:8001`
- 市场分析后端：`http://127.0.0.1:8082`
- 门户：`http://127.0.0.1:3000`

## 功能概览
1. 模型 API：`health`、`model-info`、`predict`
2. 估值：表单提交、结果展示、历史记录与多方案对比
3. 市场分析：分段筛选、What-If 情景对比、CSV/PDF 导出

## 详细说明
更完整的架构与接口说明见 [PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md)
