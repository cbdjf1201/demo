# 房价预测平台项目说明

## 1. 项目背景
这是一个基于面试题 `Interview Tasks Fullstack.pdf` 实现的全栈演示项目，核心目标不是做生产级系统，而是在面试现场展示完整的模型服务、Python 后端、Java 后端和 Next.js 门户集成能力。

## 2. 项目组成
### 2.1 `model-api`
房价预测模型服务，使用 `Python 3.12 + FastAPI + scikit-learn`。

提供接口：
- `GET /health`
- `GET /model-info`
- `POST /predict`

### 2.2 `estimator-backend`
房产估值后端，使用 `Python 3.12 + FastAPI`。

职责：
- 接收估值表单
- 调用 `model-api`
- 返回单条预测结果
- 保留历史估值
- 提供对比数据

### 2.3 `market-analysis-backend`
房产市场分析后端，使用 `Java 21 + Spring Boot 3.4.4`。

职责：
- 生成市场聚合统计
- 支持分段筛选
- 支持 what-if 分析
- 调用 `model-api`
- 提供 `CSV` 和 `PDF` 导出
- 做缓存优化

### 2.4 `portal`
统一门户，使用 `Next.js App Router`。

页面：
- 首页
- `Property Value Estimator`
- 历史记录
- 对比页面
- `Property Market Analysis`
- `What-if`
- 导出页面

## 3. 当前实现特点
- 文件名保持英文
- 文档内容中文为主，保留关键英文术语
- 不依赖 Docker 作为默认运行方式
- 使用工作区内的便携运行时启动

## 4. 本地运行前提
需要以下工具已经准备好：
- `tools/python312`
- `tools/jdk21`
- `tools/maven`
- `portal/node_modules`

如果这些已经存在，直接运行启动脚本即可。

## 5. 启动步骤
请按顺序打开多个 PowerShell 窗口执行。

### 5.1 安装 Python 依赖
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-python-deps.ps1
```

### 5.2 启动模型 API
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-model-api.ps1
```

确认地址：
- `http://127.0.0.1:8000/health`
- `http://127.0.0.1:8000/docs`

### 5.3 启动估值后端
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-estimator-backend.ps1
```

确认地址：
- `http://127.0.0.1:8001/health`
- `http://127.0.0.1:8001/api/estimator/v1/estimates/history`

### 5.4 启动市场分析后端
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-market-analysis-backend.ps1
```

确认地址：
- `http://127.0.0.1:8082/api/market/v1/summary`

### 5.5 启动门户
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-portal.ps1
```

确认地址：
- `http://127.0.0.1:3000`

## 6. 演示步骤
建议现场按下面顺序演示：

### 6.1 先看模型 API
打开 `http://127.0.0.1:8000/docs`。

演示：
- `GET /health`
- `GET /model-info`
- `POST /predict`

### 6.2 再看房产估值
打开门户首页 `http://127.0.0.1:3000`，进入 `Property Value Estimator`。

演示：
- 填写房产信息
- 点击估值
- 查看表格结果
- 查看图表结果
- 进入历史页面查看记录
- 进入对比页面做多房产比较

### 6.3 再看市场分析
进入 `Property Market Analysis` 页面。

演示：
- 查看市场摘要
- 调整筛选条件
- 查看响应式表格
- 进入 `What-if` 页面
- 查看基线和场景对比
- 进入导出页面下载 `CSV` 和 `PDF`

## 7. 可能遇到的问题
- 如果门户打不开，先检查 `3000` 端口是否被别的进程占用。
- 如果估值页报错，先确认 `8000` 和 `8001` 都已启动。
- 如果市场分析页面报错，先确认 `8082` 已启动。
- 如果 Java 后端启动失败，先确认当前使用的是 `tools/jdk21` 和 `tools/maven`，不要回退到系统 Java 11。

## 8. 结论
这是一个按面试题完整范围实现的演示项目，最适合用“模型 API -> Python 估值应用 -> Java 市场分析应用 -> 统一门户”的顺序来讲解和演示。
