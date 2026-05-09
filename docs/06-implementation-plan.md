# 实施计划

前提：等用户确认项目方向后再开始写应用代码。

## 1. 推荐落地节奏

### Phase 0：确认方向

产物：

- 确认项目名。
- 确认 MVP 案例。
- 确认技术栈。
- 确认是否需要真实 API Key 写操作。

建议默认：

- 项目名：ClawForge 社区开荒者。
- MVP 案例：Cron Token Saver。
- 技术栈：Vite + React + TypeScript + Tailwind。
- 写操作：默认 Dry Run；如果时间允许，加入 Publish Mode，但必须有确认和节流。

### Phase 1：项目脚手架

任务：

- 初始化前端项目。
- 配置 Tailwind。
- 建立页面路由。
- 建立数据目录。
- 建立 EasyClaw API client。

验收：

- 本地 dev server 能启动。
- 首页能展示静态数据。

### Phase 2：数据探索与缓存

任务：

- 接入 `/api/stats`。
- 接入 `/api/forum`。
- 接入 `/api/assets`。
- 接入 `/api/bounties`。
- 接入 `/api/leaderboard`。
- 接入 `/api/a2a/agents`。
- 写 fallback mock。

验收：

- 生态雷达页能展示真实或缓存数据。
- 网络失败时页面不崩。
- 能生成 Community Terrain Map 的 5 类地形卡。

### Phase 3：Forge Run 流水线

任务：

- 定义 ForgeRun 数据结构。
- 实现角色化 Agent 函数。
- 做固定案例 Cron Token Saver。
- UI 展示运行状态。
- 保存运行结果。

验收：

- 点击按钮后能看到阶段推进。
- 每个 Agent 有输出。
- 最终生成 Skill 候选。

### Phase 4：Skill 生成、QA、Proof-of-Work 与开荒包

任务：

- 生成 Skill Markdown。
- 生成 QA 报告。
- 生成 Skill Proof-of-Work 对比。
- 生成 Launch Pack。
- 生成论坛图文宣传帖。
- 生成悬赏播种方案。
- 生成 Agent 邀请草稿。
- 实现导出按钮。

验收：

- Skill 页面完整。
- QA 分数合理，有 passed 和 warning。
- Proof-of-Work 能显示 baseline / with skill / delta。
- 发布文案可复制。
- 论坛宣传帖、悬赏和邀请草稿可复制。

### Phase 4.5：可选 Publish Mode

任务：

- 添加 API Key 配置入口。
- 添加发布前确认弹窗。
- 实现 `POST /api/assets`。
- 实现 `POST /api/forum`。
- 实现发布结果记录。

验收：

- Dry Run 不需要密钥。
- Publish Mode 不会自动触发。
- 发布结果有链接或错误信息。

### Phase 5：视觉打磨

任务：

- 优化首页第一屏。
- 优化生态雷达图表。
- 优化流水线动效。
- 优化社区地形图。
- 优化 Campaign Replay 时间线。
- 做响应式。
- 检查移动端不重叠。

验收：

- 桌面端截图好看。
- 移动端基本可读。
- 关键文字不溢出。

### Phase 6：截图、视频、提交包

任务：

- 用浏览器验证页面。
- 截图。
- 录制 30 秒和 90 秒演示。
- 打包代码 ZIP。
- 准备提交说明。

验收：

- 展示网站 URL 可访问。
- ZIP 包不含密钥。
- README 能解释启动方式。

## 2. 目录结构建议

```text
clawforge/
  docs/
  public/
    screenshots/
  src/
    app/
    components/
    lib/
      easyclaw/
      forge/
      qa/
    data/
      mock/
  outputs/
    runs/
    skills/
    campaigns/
  README.md
```

## 3. 关键实现顺序

先做“看起来能跑”的骨架，再做真实数据：

1. 页面骨架。
2. 固定 Forge Run 数据。
3. 动画和视觉。
4. 接 EasyClaw API。
5. 替换固定数据。
6. Launch Center。
7. 导出和截图。

这样风险最低，比赛表现最好。

## 4. 预估时间

如果当前机器环境正常：

| 模块 | 时间 |
| --- | ---: |
| 脚手架 + 样式 | 30-45 分钟 |
| 数据 API + mock | 45-60 分钟 |
| Forge Run UI | 60-90 分钟 |
| Skill + QA + Proof-of-Work + Launch Center | 90-120 分钟 |
| 视觉打磨 | 60 分钟 |
| 截图和录屏 | 30-45 分钟 |

总计：约 4-6 小时做出可提交 MVP。

## 5. 必须保留的降级方案

- API 挂了：使用 `mock/easyclaw-snapshot.json`。
- LLM 不稳定：使用模板生成 Skill。
- 时间不够：只做 Cron Token Saver 一个案例，发布操作全部用 Dry Run。
- 视频来不及：至少保证截图齐全。
- 部署失败：用静态构建 + 本地录屏补救。
