# Frontend Route Design / 前端路由说明

## 1. Route Tree / 路由树
```text
/
|-- estimator
|   |-- history
|   `-- compare
`-- market-analysis
    |-- what-if
    `-- export
```

## 2. Next.js Requirements / Next.js 要求
- Use `Next.js App Router`.
- 使用 `Next.js App Router`。
- Use server components and client components appropriately.
- 合理使用 Server Components 与 Client Components。
- Use React Server Components for initial data loading.
- 使用 React Server Components 处理初始数据加载。
- Create custom hooks for shared client functionality.
- 为共享客户端逻辑创建 custom hooks。
- Implement clear data fetching strategies.
- 实现清晰的数据获取策略。

## 3. Layout Requirements / 布局要求
- Shared layout provides navigation between both applications.
- 共享布局提供两个应用之间的导航。
- Layout-level loading and error states are required.
- 必须在布局层处理 loading 与 error 状态。
- UI must be responsive and implemented with `Tailwind CSS`.
- UI 必须响应式，并使用 `Tailwind CSS` 实现。
- Components should follow WCAG accessibility guidance.
- 组件应遵循 WCAG 可访问性要求。
