# Document Language and Naming Standard / 文档语言与命名规范

## 1. Why This Standard Exists / 为什么需要这个规范
The project has three practical constraints:
当前项目有三个现实约束：

- The original task brief is written in English.
- 原始任务说明是英文。
- The current working discussion and clarification are happening in Chinese.
- 当前协作与需求澄清主要使用中文。
- The project context is Hong Kong oriented, so both English technical terminology and Chinese explanatory material are useful.
- 项目语境偏香港，因此英文技术术语和中文说明材料都需要保留。

Therefore, this repository should use English filenames and bilingual content.
因此，本仓库应采用英文文件名和中英双语内容。

## 2. Directory Naming / 目录命名规则
Directory names remain in English.
目录名称保持英文。

Reasons:
原因如下：

- It matches the standard spec structure.
- 与标准 spec 结构一致。
- It is more stable for scripts, IDE indexing, terminals, and search.
- 对脚本、IDE、终端和检索更稳定。
- It keeps future automated document generation predictable.
- 有利于后续继续自动化生成同一模式的文档。

## 3. File Naming / 文件命名规则
All Markdown filenames must remain in English.
所有 Markdown 文件名必须保持英文。

Examples:
示例：

- `business-brief.md`
- `requirements.md`
- `design.md`
- `test-strategy.md`

English filenames are required because they are more stable for engineering workflows.
英文文件名更适合工程化工作流，因此这里不使用中文文件名。

## 4. Content Language / 正文语言规则
Document content should be bilingual.
文档正文应采用中英双语。

Recommended style:
推荐方式：

- Use English and Chinese together in section titles.
- 标题采用中英双语。
- Provide both English and Chinese statements for key rules, decisions, and explanations.
- 关键规则、决策和说明同时提供英文和中文表达。
- Keep API paths, DTO fields, package names, SQL object names, and code identifiers in English only.
- API path、DTO 字段名、包名、SQL 对象名和代码标识仅保留英文。

## 5. Bilingual Strategy / 双语策略
Bilingual does not mean using Chinese filenames.
双语并不意味着使用中文文件名。

The required strategy is:
本项目采用的策略是：

- English filenames
- 英文文件名
- Bilingual headings
- 双语标题
- Bilingual descriptive content
- 双语说明内容
- English-only technical identifiers
- 技术标识保持英文

## 6. Exceptions / 例外规则
The following files naturally remain in their conventional English names:
以下文件按惯例保持英文命名：

- `README.md`
- `Dockerfile`
- `package.json`
- `pom.xml`
- code and configuration files / 代码与配置文件

## 7. Future Publishing / 后续发布说明
If a formal external Hong Kong client delivery pack is needed later, a dedicated published document layer can be generated separately.
如果后续需要面向香港客户生成正式外发版本，可在当前工程结构之外额外生成一套发布文档。
