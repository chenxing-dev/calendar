# v0.1.0 开发计划

**阶段 1：安装与配置核心依赖**
- [x] chore(deps): add react-router and lunar-typescript
- [x] build(ui): initialize tailwindcss and shadcn/ui
    - [x] feat: add Tailwind CSS support
    - [x] feat(ui): initialize shadcn/ui and add card component
    - [x] feat(font):: add next-font Vite plugin (derived from @next/font) and configure Vite
        - [ ] test(font): add a custom local or Google font using the plugin to verify it loads correctly
  
**阶段 2：配置 React Router Data Mode 与哈希路由**
- [ ] feat(router): set up createHashRouter route tree
    - [ ] refactor(app): switch `src/main.tsx` render to `<RouterProvider router={router}>`
    - [ ] feat(routes): add index route and /:date route with YYYY-MM-DD validation
      - [ ] feat(routes): implement route objects with `loader`, `ErrorBoundary`, and `HydrateFallback`
        1.  **`loader` 函数**：解析 URL 中的日期参数，加载对应的农历、提示、历史等数据，并返回一个完整的 `DailyData` 对象。
        2.  **`HydrateFallback` 组件**：在数据加载时显示加载指示器。
        3.  **`Component`**：指定根组件 `App`，在其中使用 `useLoaderData()` 获取 `loader` 返回的数据进行渲染。
- [ ] feat(loader): implement the data loader
        1.  接收 React Router 的 `LoaderFunctionArgs`。
        2.  从 `params` 中解析出日期字符串（处理 `/#/2024-12-25` 格式）。
        3.  调用 `loadDailyData(date)` 函数（下一步创建）获取数据。
        4.  返回数据，如果数据为空或出错，可抛出 `Response` 对象（将被 `ErrorBoundary` 捕获）。

- [ ] feat: create the core data loading logic
    - [ ] feat(data): create src/lib/load-daily-data.ts
        1.  使用 `lunar-typescript` 计算公历、农历、节气信息。
        2.  根据年份，动态导入 (`import()`) 对应的数据文件，并提取当日的条目。
        3.  将所有数据组装成一个结构化的对象并返回。

**阶段 3：配置代码质量与 Git 工作流**
- [ ] chore: configure Prettier
    - [ ] chore(format): add .prettierrc and format script
- [ ] chore: set up Husky and lint-staged
    - [ ] chore(deps): add husky and lint-staged
    - [ ] chore(git): initialize husky prepare script
    - [ ] chore(git): add pre-commit hook for lint-staged
    - [ ] chore(git): configure lint-staged in package.json
        ```json
        "lint-staged": {
          "*.{ts,tsx,js,jsx,json,css,md}": ["prettier --write"]
        }
        ```

**阶段 4：准备 GitHub Pages 部署**
- [ ] chore: configure Vite for GitHub Pages
    - [ ] chore(vite): set base to /calendar/ in vite.config.ts
- [ ] chore: add deployment scripts
    - [ ] chore(deps): add gh-pages
    - [ ] chore(deploy): add predeploy/deploy scripts to package.json
        ```json
        "predeploy": "pnpm run build",
        "deploy": "gh-pages -d dist"
        ```

**阶段 5：验证与初次部署**
- [ ] test: verify build and routing
    - [ ] test(build): run `pnpm run build` and verify `dist` output.
    - [ ] test(preview): run `pnpm run preview` and verify hash routing
- [ ] docs: update README with setup and usage instructions
    - [ ] docs(readme): write intro, local run, and deploy instructions
- [ ] chore(deploy): initial GitHub Pages deployment
    - [ ] chore(deploy): run pnpm deploy and configure Pages source branch