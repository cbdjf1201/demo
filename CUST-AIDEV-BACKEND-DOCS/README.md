# Documentation Index / 文档导航

## 1. Purpose / 文档定位
This directory contains the standardized delivery documentation for `Housing Price Prediction Platform`.
本目录用于承载 `Housing Price Prediction Platform` 的标准化交付文档，结构遵循既定的 `CUST-AIDEV-BACKEND-DOCS` 规范。

## 2. Naming and Language Policy / 命名与语言策略
- Directory names remain in English for consistency with the standard structure.
- 目录名称保持英文，以确保与标准结构、工具链和检索方式一致。
- Markdown filenames remain in English.
- Markdown 文件名保持英文，不使用中文文件名。
- Document content is bilingual, using English and Chinese together.
- 文档正文采用中英双语表达，而不是只保留单一语言。

## 3. Recommended Reading Order / 建议阅读顺序
### Global Information / 全局信息
- [business-brief.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/global-info/business-brief.md)
- [document-language-and-naming-standard.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/global-info/document-language-and-naming-standard.md)
- [backend-tech-stack-components.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/global-info/backend-tech-stack-components.md)
- [backend-tech-stack-structure.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/global-info/backend-tech-stack-structure.md)

### CR01 Main Delivery Flow / CR01 需求交付主线
- [prd.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/spec/normalCR/CR01-housing-price-platform/requirements/prd.md)
- [requirements-plan.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/spec/normalCR/CR01-housing-price-platform/requirements/requirements-plan.md)
- [requirements.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/spec/normalCR/CR01-housing-price-platform/requirements/requirements.md)
- [design.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/spec/normalCR/CR01-housing-price-platform/design/design.md)
- [api-001-core-platform.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/spec/normalCR/CR01-housing-price-platform/api/api-001-core-platform.md)
- [tasks.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/spec/normalCR/CR01-housing-price-platform/task/tasks.md)

### Delivery Assurance / 交付保障
- [deployment-guide.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/deployment-guide.md)
- [monitoring-strategy.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/monitoring-strategy.md)
- [audit-log.md](C:/Users/kcui/Tools/workspace/HSBC/CUST-AIDEV-BACKEND-DOCS/audit-log.md)

## 4. Architecture Position / 架构定位
The current document set follows the full scope of `Interview Tasks Fullstack.pdf`.
当前文档集遵循 `Interview Tasks Fullstack.pdf` 的完整范围。

- Task 1 is the `FastAPI` ML model API.
- Task 1 是 `FastAPI` ML 模型 API。
- Task 2 is a unified `Next.js` portal hosting two independent applications.
- Task 2 是统一 `Next.js` 门户，承载两个独立应用。
- App 1 is `Property Value Estimator` with a Python backend.
- 应用一是带 Python 后端的 `Property Value Estimator`。
- App 2 is `Property Market Analysis` with a Java 21 + Spring Boot 3.4.4 backend.
- 应用二是带 Java 21 + Spring Boot 3.4.4 后端的 `Property Market Analysis`。

## 5. Maintenance Rule / 维护要求
- New Markdown filenames should stay in English.
- 新增 Markdown 文件名必须保持英文。
- API paths, DTO fields, package names, SQL object names, and code identifiers should stay in English.
- API path、DTO 字段名、包名、SQL 对象名和代码标识保持英文。
- Explanatory content should remain bilingual.
- 说明性内容应持续保持中英双语。
