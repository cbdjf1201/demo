# Java Conventions / Java 编码规范

本文件仅在引入第二后端时生效。

- 使用 `Java 21`
- 使用 constructor injection
- controller 保持轻薄，业务逻辑进入 service
- transport DTO 与内部领域模型分离
- 如果 `FastAPI` 仍是模型主服务，`Java` 中不要复制 ML 推理逻辑
