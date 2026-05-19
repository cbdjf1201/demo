# Project Deployment Guide / 项目部署指南

## 1. Deployment Position / 部署定位
The project should be demonstrated as the full multi-application platform required by the PDF.
项目应按 PDF 要求作为完整多应用平台演示。

## 2. Required Services / 必需服务
- ML model API
- ML 模型 API
- Python estimator backend
- Python 估值后端
- Java market analysis backend
- Java 市场分析后端
- Next.js unified portal
- Next.js 统一门户

## 3. Startup Principle / 启动原则
Start dependency services before the portal.
先启动依赖服务，再启动门户。

Recommended order:
推荐顺序：

1. ML model API
2. Python estimator backend
3. Java market analysis backend
4. Next.js portal

## 4. Required Demo Proof / 必需演示证明
- Model API Swagger/OpenAPI
- 模型 API Swagger/OpenAPI
- Estimator prediction, history, and comparison
- 估值预测、历史和对比
- Market dashboard, filters, what-if analysis, CSV export, and PDF export
- 市场仪表盘、筛选、what-if 分析、CSV 导出和 PDF 导出
