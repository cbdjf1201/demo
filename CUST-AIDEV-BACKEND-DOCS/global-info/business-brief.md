# Business Brief / 业务概述

## 1. Project Name / 项目名称
Housing Price Prediction Platform
房产价格预测平台

## 2. Source Materials / 输入材料
This project is based on the original full-stack interview brief and two CSV datasets.
本项目基于原始 full-stack 面试任务说明和两个 CSV 数据集。

- `Interview Tasks Fullstack.pdf`: source requirement document
- `Interview Tasks Fullstack.pdf`：原始需求说明
- `House Price Dataset.csv`: labelled training dataset
- `House Price Dataset.csv`：带价格标签的训练数据集
- `Test Data For Prediction.csv`: sample prediction input dataset
- `Test Data For Prediction.csv`：用于预测验证的输入样例数据

## 3. Requirement Summary / 需求摘要
The PDF defines two major tasks.
PDF 明确定义了两个主要任务。

### Task 1: Housing Price Prediction Model API
Build, containerise, and deploy a regression model API.
构建、容器化并部署一个房价预测回归模型 API。

Required endpoints:
必需接口：

- `predict`: supports single and batch predictions
- `predict`：支持单条和批量预测
- `model-info`: returns model coefficients and performance metrics
- `model-info`：返回模型系数和性能指标
- `health`: simple health check
- `health`：健康检查

### Task 2: Multi-Application Next.js Portal
Create a unified `Next.js` portal hosting two independent applications with different backend technologies.
创建统一的 `Next.js` 门户，承载两个使用不同后端技术的独立应用。

Required applications:
必需应用：

- `Property Value Estimator`: frontend plus Python backend
- `Property Value Estimator`：前端加 Python 后端
- `Property Market Analysis`: frontend plus Java backend
- `Property Market Analysis`：前端加 Java 后端

Both applications must interact with the ML model from Task 1.
两个应用都必须能够与 Task 1 的 ML 模型服务交互。

## 4. Architecture Position / 架构定位
The target scope is not a single-backend shortcut. The required architecture is:
目标范围不是单后端简化版。按 PDF 标准，目标架构为：

- `FastAPI` model API service for ML inference
- `FastAPI` 模型 API 服务负责 ML 推理
- `Next.js` unified portal for both applications
- `Next.js` 统一门户承载两个应用
- Python backend for `Property Value Estimator`
- Python 后端负责 `Property Value Estimator`
- Java 21 + Spring Boot 3.4.4 backend for `Property Market Analysis`
- Java 21 + Spring Boot 3.4.4 后端负责 `Property Market Analysis`

## 5. Business Goal / 业务目标
Deliver a demo-ready full-stack solution that proves the candidate can build ML serving, frontend integration, Python backend integration, and Java backend integration.
交付一个可演示的全栈方案，体现 ML 服务、前端集成、Python 后端集成和 Java 后端集成能力。

Reviewers should be able to:
评审者应能够：

- call the ML API from Swagger/OpenAPI
- 通过 Swagger/OpenAPI 调用 ML API
- submit property details and view prediction results in table and chart form
- 提交房产信息，并以表格和图表查看预测结果
- review previous estimates and compare multiple properties
- 查看历史估值并对比多个房产
- use a market analysis dashboard with filters and what-if analysis
- 使用带筛选和 what-if 分析的市场分析仪表盘
- export analysis results as CSV and PDF
- 以 CSV 和 PDF 导出分析结果

## 6. Out of Scope / 当前非目标
The PDF does not require production-grade security, real market data ingestion, or complex MLOps.
PDF 未要求生产级安全、真实市场数据接入或复杂 MLOps。

Out of scope for this interview implementation:
本次面试交付不包含：

- authentication and authorization
- 权限认证
- real-time external market data
- 实时外部市场数据
- production observability platform
- 生产级可观测平台
- large-scale distributed model training
- 大规模分布式模型训练
