# Test Report / 测试报告

## 1. Execution Date / 执行日期
2026-05-14

## 2. Executed Checks / 已执行检查
- `cmd /c npm install` completed for `portal`.
- `portal` 已完成 `cmd /c npm install`。
- `cmd /c npx tsc --noEmit` passed for `portal`.
- `portal` 已通过 `cmd /c npx tsc --noEmit`。
- `cmd /c npm run build` passed for `portal`.
- `portal` 已通过 `cmd /c npm run build`。
- Static file and scope checks were run across generated service files.
- 已对生成的服务文件执行静态文件和范围一致性检查。

## 3. Environment Limitations / 环境限制
- Local Python execution is blocked because `python.exe` points to the WindowsApps placeholder and cannot execute.
- 本机 Python 执行受阻，因为 `python.exe` 指向 WindowsApps 占位程序且无法执行。
- Local Java is `11.0.19`, while the required backend target is `Java 21`.
- 本机 Java 为 `11.0.19`，而后端目标要求是 `Java 21`。
- Maven is not installed locally, so the Spring Boot backend was not locally compiled.
- 本机未安装 Maven，因此 Spring Boot 后端未在本机编译。

## 4. Recommended Verification Path / 建议验证路径
Use Docker Compose for full system verification:
建议使用 Docker Compose 验证完整系统：

```powershell
docker compose up --build
```

Then verify:
随后验证：

- `http://localhost:8000/docs`
- `http://localhost:3000`
- `http://localhost:8082/api/market/v1/summary`
