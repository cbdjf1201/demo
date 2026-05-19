# 房价预测平台

这是一个按面试题 `Interview Tasks Fullstack.pdf` 实现的全栈演示项目。

## 组成
- `model-api`：房价预测模型服务
- `estimator-backend`：房产估值后端
- `market-analysis-backend`：房产市场分析后端
- `portal`：统一门户

## 启动前提
本项目不依赖 Docker，默认使用工作区内的便携运行时：
- `tools/python312`
- `tools/jdk21`
- `tools/maven`

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

## 演示顺序
1. 先演示模型 API 的 `health`、`model-info`、`predict`
2. 再演示估值页面的表单、结果、历史和对比
3. 再演示市场分析页面的筛选、what-if、CSV/PDF 导出

## 详细说明
更完整的项目说明见 [PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md)
