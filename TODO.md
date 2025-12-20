# v0.1.0 开发计划

**阶段 1：安装与配置核心依赖**
- [x] chore(deps): add react-router and lunar-typescript
- [x] build(ui): initialize tailwindcss and shadcn/ui
    - [x] feat: add Tailwind CSS support
    - [x] chore(tailwind): add @tailwindcss/typography plugin
        - [x] test(ui): verify prose styles render correctly
    - [x] feat(ui): initialize shadcn/ui and add card component
    - [x] feat(font):: add next-font Vite plugin (derived from @next/font) and configure Vite
        - [x] test(font): add Noto Serif SC Google font using the plugin to verify it loads correctly
        - [x] refactor(font): create a font utility file to centralize font configuration and usage

**阶段 2：配置 React Router Data Mode 与哈希路由**
- [x] feat(router): set up createHashRouter route tree
    - [x] feat(router): switch `src/main.tsx` render to `<RouterProvider router={router}>`
    - [x] feat(routes): add index route and /:date route
      - [x] feat(router): set up routing with Calendar layout and pages
      - [x] feat(routes): implement route objects with `loader`, `ErrorBoundary`
- [x] feat(loader): implement the data loader
    - [x] feat(routes): implement data YYYY-MM-DD validation
        - [x] build(deps): add date-fns dependency
        - [x] refactor(validation): extract the date validation logic into the utility function
        - [x] refactor(validation): use date-fns to validate date strings instead of `new Date()`
        - [x] feat(loader): canonicalize the URL date format to YYYY-MM-DD
          - [x] feat(router): format date to YYYY-MM-DD in loader and return it instead of Date object
          - [x] feat(router): implement `redirect` to canonical date format in loader
        - [x] feat(validation): add explicit year range check (e.g., 1900-2100)
    - [x] feat(loader): return a typed loader result
        - [x] chore(types): define loader result TypeScript interface
        - [x] feat(loader): update route loader to return `Promise<T>`

- [ ] feat: create the core data loading logic
    - [x] feat(data): create `src/lib/calendar.ts` for calendar data logic
    - [ ] refactor(loader): move calendar data loading logic into `calendar.ts`
    - [ ] refactor(loader): rename `date.ts`
      - This file contains date parsing and validation logic. May be renamed to something that better reflects its purpose.
    - [ ] feat(data): implement a CalendarDateData getter function
        - [ ] feat(data): use `tyme4ts` to compute solar, lunar, and solar-term information for a given date.
          - [ ] feat(date): implement `getLunarInfo(date: UTCDate)`
          - [ ] feat(date): implement `getSolarTerm(date: UTCDate)`
        - [ ] feat(data): dynamically import (`import()`) year-specific data files and extract the entry for the selected day.
        - [x] feat(data): assemble and return a structured object containing all calendar data for the day.

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

**阶段 4：更新UI和日历显示组件**
- [ ] feat(ui): implement Calendar layout
- [ ] feat(ui): implement Cover page
- [ ] feat(ui): implement Date page

**阶段 5：测试**
- [ ] test: set up testing framework
    - [ ] chore(deps): learn about Vitest and React Testing Library
    - [ ] test: add unit tests to verify lunar date calculations, solar terms, and data loading logic

**阶段 6：准备 GitHub Pages 部署**
- [ ] chore: configure Vite for GitHub Pages
    - [ ] chore(vite): set base to /calendar/ in vite.config.ts
- [ ] chore: add deployment scripts
    - [ ] chore(deps): add gh-pages
    - [ ] chore(deploy): add predeploy/deploy scripts to package.json
        ```json
        "predeploy": "pnpm run build",
        "deploy": "gh-pages -d dist"
        ```

**阶段 7：验证与初次部署**
- [ ] test: verify build and routing
    - [ ] test(build): run `pnpm run build` and verify `dist` output.
    - [ ] test(preview): run `pnpm run preview` and verify hash routing
- [ ] docs: update README with setup and usage instructions
    - [ ] docs(readme): write intro, local run, and deploy instructions
- [ ] chore(deploy): initial GitHub Pages deployment
    - [ ] chore(deploy): run pnpm deploy and configure Pages source branch