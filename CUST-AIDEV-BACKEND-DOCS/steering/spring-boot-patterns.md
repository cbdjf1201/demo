# Spring Boot Patterns / Spring Boot 最佳实践

本文件属于扩展交付约束，不是当前基线的默认实现要求。

- 使用 `Spring Boot 3.4.4`
- 使用明确的 request / response DTO
- 聚合分析逻辑放在 application service，不要塞进 controller
- 将 `FastAPI` 模型接口封装为内部 client abstraction
- 缓存是性能优化手段，不是先验必需品
