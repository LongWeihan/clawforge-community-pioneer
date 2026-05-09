# 展示与可视化方案

比赛项目很看表现力。ClawForge 的 UI 要让人一眼看懂“多 Agent 团队正在工作”，并且能看到真实 EasyClaw 数据。

## 1. 演示主线

建议 90 秒演示脚本：

1. 打开首页：展示 EasyClaw 当前生态数据，说明早期社区有技能资产但需求信号稀疏。
2. 进入生态雷达：展示论坛、技能市场、赏金、A2A Agent 的信号图谱。
3. 展示 Community Terrain Map：荒地、矿区、拥挤区、绿洲、断桥。
4. 点击“Cron Token Saver”机会卡片。
5. 启动 Forge Run：多个 Agent 依次工作，时间轴推进。
6. 查看 Skill Proof-of-Work：展示使用技能前后的质量 delta。
7. 查看 Skill 候选：展示完整 Skill Markdown。
8. 查看 QA 报告：展示评分、风险、重复度、发布准备度。
9. 查看 Launch Center：展示技能发布、论坛图文帖、悬赏播种、Agent 邀请。
10. 查看 Campaign Replay：展示整个开荒战役回放。
11. 收尾：展示 Founder Dashboard 的下一步建议。

结束语：

> ClawForge 不是生成一个技能，而是派出一支 Agent 开荒队，帮社区持续长出技能、内容、悬赏和协作关系。

## 2. 视觉风格

关键词：

- 控制台。
- 研究实验室。
- 开荒控制台。
- 工厂流水线。
- 生态雷达。
- 清晰、克制、技术可信。

不要做：

- 纯聊天框。
- 普通 SaaS 营销页。
- 大段说明文字。
- 只有卡片堆叠，没有流程。

配色建议：

- 背景：近白或深墨二选一，建议用深色控制台更有舞台感。
- 主色：电光青 / 荧光绿用于运行状态。
- 辅色：琥珀色用于 warning，红色用于 failed。
- 避免全紫、全蓝、全 beige。

## 3. 首页布局

第一屏：

```text
┌────────────────────────────────────────────┐
│ ClawForge                                  │
│ 让早期 Agent 社区自动开荒                   │
│                                            │
│ [启动开荒战役] [查看生态雷达]               │
│                                            │
│ 1809 users  698 skills  13691 calls        │
│ 472 posts   132 bounties  40.6% hit rate   │
└────────────────────────────────────────────┘
```

第二屏露出：

- 流水线总览。
- Agent 队伍头像或标识。
- 最近一次运行卡片。

## 4. 生态雷达页

核心可视化：

- 技能类别分布柱状图。
- 技能调用量 Top 10。
- 论坛近 30 天发帖趋势。
- 信号来源漏斗：forum / assets / bounty / docs / user。
- 机会评分矩阵。

信号卡片字段：

- 来源。
- 标题。
- 证据数量。
- 置信度。
- 建议动作：生成新技能 / 合并技能 / 改进技能 / 写教程。

## 5. Forge Run 控制台

核心视觉：

```text
左侧 Agent 队伍        中间流水线             右侧输出
Commander              Signal Scout  passed   signals.json
Signal Scout           Demand Analyst running opportunity.json
Demand Analyst         Skill Architect wait   ...
Skill Architect
Skill Builder
QA Sentinel
Launch Producer
Evolution Keeper
```

动效：

- 当前 Agent 高亮。
- 时间轴节点逐个点亮。
- 输出面板逐段出现。
- QA 分数仪表盘从 0 动到最终分数。

## 6. Skill Proof-of-Work 对比

要做成比赛里最硬的一页：

```text
Baseline            With Skill
62 / 100            84 / 100
Token: 1.0x         Token: 0.82x
误判 2 项           误判 0 项
```

核心表达：

- 自动生成不是终点。
- 发布前先证明这个技能真的改善任务。
- 低质量技能会被拦截。

## 7. Launch Center 发布中心

必须做成很有表现力的一页，因为这是升级后的核心：

```text
技能市场发布      论坛图文宣传      悬赏播种      Agent 联盟
ready            ready            3 drafts       4 targets
[发布 Skill]     [发布论坛帖]      [创建悬赏]     [复制邀请]
```

每张卡都要显示：

- 质量状态。
- 风险提示。
- 发布动作。
- Dry Run 输出。
- Publish Mode 状态。

## 8. Skill 详情页

需要有两个视图：

- Preview：给普通评委看。
- Markdown：给技术评委看。

重点组件：

- Skill 标题和评分。
- 适用场景。
- 输入输出。
- 步骤。
- 安全边界。
- 示例。
- 与已有技能差异。

## 9. QA 报告页

展示为“发布前验收单”：

| 检查项 | 状态 | 分数 |
| --- | --- | ---: |
| 平台契合度 | passed | 92 |
| 可复用性 | passed | 86 |
| 重复度风险 | warning | 68 |
| 示例完整度 | passed | 90 |
| 安全边界 | passed | 84 |

必须有 warning，不要全绿。全绿会显得假。

## 10. 截图清单

最终提交前至少准备：

- `screenshots/01-home.png`
- `screenshots/02-ecosystem-radar.png`
- `screenshots/03-forge-run.png`
- `screenshots/04-skill-draft.png`
- `screenshots/05-qa-report.png`
- `screenshots/06-launch-pack.png`
- `screenshots/07-community-campaign.png`
- `screenshots/08-proof-of-work.png`
- `screenshots/09-terrain-map.png`
- `screenshots/10-campaign-replay.png`

## 11. 演示视频清单

推荐录制：

- `demo/clawforge-90s.mp4`
- `demo/clawforge-short-30s.mp4`

90 秒视频结构：

- 0-10s：问题与定位。
- 10-25s：真实平台数据。
- 25-38s：社区地形图。
- 38-58s：多 Agent 运行。
- 58-70s：Skill Proof-of-Work。
- 70-82s：发布中心：论坛图文、悬赏、Agent 邀请。
- 82-90s：Campaign Replay 和创始人驾驶舱。

## 12. 评委会记住的画面

一定要做出这三个画面：

1. “社区地形图”：荒地、矿区、拥挤区、绿洲、断桥，一眼看出社区该怎么建设。
2. “Agent 流水线”：多个 Agent 依次接力生成 Skill。
3. “Proof-of-Work”：技能发布前证明有用，显示质量 delta。
4. “发布中心”：一个 Skill 自动变成市场资产、论坛图文、悬赏任务和合作邀请。
5. “开荒战役回放”：像 AgentOps 一样复盘整个 Agent 团队做了什么。
