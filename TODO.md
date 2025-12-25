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

- [x] feat: create the core data loading logic
  - [x] feat(data): create `src/lib/calendar.ts` for calendar data logic
  - [x] refactor(date): move calendar data loading logic into `calendar.ts`
  - [x] refactor(date): rename `date.ts` tp `date-parser.ts`
  - [x] feat(data): implement a CalendarDateData getter function
    - [x] feat(data): use `tyme4ts` to compute solar, lunar, and solar-term information for a given date.
      - [x] feat(date): extract `getSolarData(date: UTCDate)`)
      - [x] feat(date): extract `getLunarData(date: UTCDate)`
      - [x] feat(date): extract `getSolarTermData(date: UTCDate)`
    - [x] feat(data): assemble and return a structured object containing all calendar data for the day.

**阶段 3：配置代码质量与 Git 工作流**

- [x] chore: configure Prettier
  - [x] chore(format): add .prettierrc
  - [x] chore(format): format codebase with Prettier
- [x] chore: set up Husky and lint-staged
  - [x] chore: add husky and initialize husky
  - [x] chore(deps): add lint-staged
  - [x] chore(git): add pre-commit hook for lint-staged
  - [x] chore(git): configure lint-staged in package.json

**阶段 4：更新UI和日历显示组件**

- [x] feat(ui): implement Calendar layout
- [x] feat(ui): implement Date page
  - [x] feat(style): change font to Zpix
  - [x] refactor: 用 dayjs 替换 date-fns 进行日期处理
    - [x] chore: 创建分支 feat/migrate-to-dayjs
    - [x] chore(deps): add dayjs and dayjs-plugin-utc
    - [x] refactor(date): replace date-fns usages with dayjs equivalents
    - [x] chore(deps): add dayjs-plugin-lunar
    - [x] refactor: 用 dayjs-plugin-lunar 替换直接用 tyme4ts 进行农历计算
    - [x] chore(deps): remove date-fns, @date-fns/utc and tyme4ts
  - [x] feat(calendar): add festivals/holidays display
    - [x] feat(observances): confirm observance upcoming window to 14 days
    - [x] feat(observances): add an observance registry
    - [x] feat(observances): implement matchers for fixed solar date observances
    - [x] refactor(observances): rework `getObservancesData` to compute `today` and scan future UTC days for `upcoming` observances
    - [x] test(observances): add tests for observances in `calendar.test.ts`
  - [x] feat(calendar): add a minimal accordion for "历史上的今天"
    - [x] refactor(calendar): move the example entries into a separate file
    - [x] feat(calendar): create a helper to load historical events for a given date
    - [x] feat(ui): add shadcn/ui accordion component
    - [x] feat(ui): integrate accordion into CalendarPage
- [x] feat(ui): implement Cover page

**阶段 5：测试与优化**

- [x] chore(deps): add Vitest to the project
- [x] test: add unit tests to verify calendar data
  - [x] test(lunar): verify lunar calendar data and formatting for leap April (闰四月) and first day of month (初一)
- [ ] chore: optimize bundle size
  - [x] chore: replace zpix.ttf with zpix.woff2
  - [x] chore(vite): analyze bundle with a visualizer
  - [ ] chore(vite): implement code splitting and React Router’s route-level `lazy` loading
    - [x] perf: convert route components to lazy imports
    - [x] perf: move `tyme4ts`/`dayjs-plugin-lunar` out of the initial bundle
    - [ ] perf: measure bundle size after code splitting
- [ ] test(ui): add UI tests with Playwright
  - [ ] chore: learn about UI test with Playwright
  - [ ] test(ui): set up Playwright testing framework
  - [ ] test(ui): add tests for main pages and navigation
  - [ ] test(ui): test on different viewport sizes (iPhone, iPad, ThinkPad)

**阶段 6：准备 GitHub Pages 部署**

- [ ] feat: favicon and metadata
  - [ ] chore: create a simple favicon.ico
  - [ ] feat(meta): add basic meta tags in index.html
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
