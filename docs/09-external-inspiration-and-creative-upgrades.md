# 外部社区检索与创造性升级

日期：2026-05-10  
目标：参考 GitHub、技能注册表、MCP、Agent 评测和观测工具，给 ClawForge 增加更有创造性、更能体现技术深度和平台思维的部分。

## 1. 外部信号摘要

### 1.1 Agent 技能注册表正在快速出现

观察到多个外部技能注册表：

- SkillsMD：https://skillsmd.dev/
- ClaudSkills：https://claudskills.com/
- Open Agent Skill：https://www.openagentskill.com/
- OpenClaw Skills Library：https://open-claw-skills-library.vercel.app/

共同特征：

- 从 GitHub 自动索引技能。
- 校验 `SKILL.md` 结构。
- 做质量评分、分类、标签。
- 支持一键安装或命令安装。
- 逐渐把“技能”变成 Agent 生态里的基本资产。

对 ClawForge 的启发：

> EasyClaw 不该只做一个站内技能市场，而可以成为“Agent 技能资产的发现、评测、发布和传播中心”。

### 1.2 MCP Registry 提供了可信发布范式

来源：https://github.com/modelcontextprotocol/registry

MCP Registry 是社区驱动的 MCP server 注册服务，包含：

- 发布 CLI。
- GitHub OAuth / GitHub OIDC / DNS / HTTP 验证。
- 命名空间所有权校验。
- 服务端数据模型、验证器和发布流程。

对 ClawForge 的启发：

> 自动发布不能只是“发出去”，还要有所有权、来源、版本、审计和可信证明。

### 1.3 多 Agent 框架都在强调工作流、状态和人类审批

参考：

- LangGraph：https://github.com/langchain-ai/langgraph
- CrewAI：https://github.com/crewAIInc/crewAI
- AutoGen：https://github.com/microsoft/autogen

外部趋势：

- LangGraph 强调 long-running、stateful、human-in-the-loop、memory 和 observability。
- CrewAI 把 Crews 的自治协作和 Flows 的精确控制结合。
- AutoGen 强调 multi-agent 应用、Benchmark 和 Studio，但新项目已建议迁移到 Microsoft Agent Framework。

对 ClawForge 的启发：

> ClawForge 的优势不应该是“角色多”，而应该是“自治团队 + 可控流程 + 人类审批 + 可追踪状态”。

### 1.4 Agent 观测和评测正在成为刚需

参考：

- AgentOps：https://github.com/AgentOps-AI/agentops
- Promptfoo：https://github.com/promptfoo/promptfoo
- AgentBench：https://arxiv.org/abs/2308.03688
- SWE-Skills-Bench：https://arxiv.org/abs/2603.15401

关键发现：

- AgentOps 关注 session replay、成本追踪、benchmark 和 agent monitoring。
- Promptfoo 做 prompt、agent、RAG 的自动评测、红队和 CI/CD。
- AgentBench 强调在多环境中评估 Agent 的推理和决策能力。
- SWE-Skills-Bench 结论很重要：很多技能并不能显著提升效果，甚至可能带来 token 开销和负收益。

对 ClawForge 的启发：

> 真正高级的技能市场不是“谁发得多”，而是“谁能证明这个 Skill 真的有用”。

### 1.5 成熟 Agent 产品都在做社区、协作和贡献网络

参考：

- OpenHands：https://github.com/OpenHands/OpenHands
- HumanLayer：https://github.com/humanlayer/humanlayer

外部趋势：

- OpenHands 不只是工具，也强调社区、Slack、贡献者、SDK、CLI、GUI、Cloud、Enterprise。
- HumanLayer 强调 human-in-the-loop 和复杂任务中的人类协作。

对 ClawForge 的启发：

> EasyClaw 要做起来，不能只靠自动化，还要让 Agent、人类、技能作者、评测者形成可见协作网络。

## 2. 建议加入的高创造性模块

### 2.1 Skill Genome 技能基因图谱

一句话：

> 给 EasyClaw 技能市场生成一张“技能基因图谱”，展示技能之间的重复、互补、依赖、可组合关系。

输入：

- 技能标题。
- 描述。
- 标签。
- 调用量。
- 收藏数。
- 作者。
- 论坛引用。

输出：

- 重复簇：哪些技能解决同一类问题。
- 互补簇：哪些技能组合后更强。
- 缺口区域：某个高频需求缺少好技能。
- 过度拥挤区域：重复技能太多。
- 技能血缘：某个新 Skill 来源于哪些帖子、技能和 API。

视觉呈现：

- 节点图。
- 每个节点像“基因片段”。
- 颜色表示分类。
- 边表示相似、依赖、组合、演化。

比赛价值：

- 一眼高级。
- 把 EasyClaw 技能市场变成“生态地图”。
- 很适合截图。

### 2.2 Skill Proof-of-Work 技能有用性证明

一句话：

> 每个 Skill 发布前必须跑一个小型评测，证明它真的改善了任务结果或降低了成本。

灵感来源：

- SWE-Skills-Bench 发现很多技能没有实际收益。
- Promptfoo / AgentBench 强调自动评测和可比较结果。

评分方式：

- Baseline：不用 Skill 完成任务。
- With Skill：使用 Skill 完成同一任务。
- 比较：
  - 是否完成。
  - 输出质量。
  - token 成本。
  - 耗时。
  - 错误率。
  - 人工检查项。

输出：

```json
{
  "skill": "Cron Token Waste Inspector",
  "baseline_score": 62,
  "with_skill_score": 84,
  "delta": "+22",
  "token_delta": "-18%",
  "verdict": "publish_ready"
}
```

比赛价值：

- 这是最能打动技术评委的点。
- 它反驳“自动生成一堆垃圾 Skill”的质疑。
- 可以让 ClawForge 变成 EasyClaw 的质量基础设施。

### 2.3 GitHub Pain Miner 外部痛点矿工

一句话：

> 从 GitHub issues、README、Discussions 和热门 Agent 项目中挖掘真实痛点，再转成 EasyClaw Skill 机会。

可抓取对象：

- LangGraph issues：长流程、状态、memory、debug。
- CrewAI issues：crew/flow 设计、human-in-loop、部署。
- AutoGen discussions：迁移、benchmark、multi-agent orchestration。
- OpenHands issues：开发 Agent、CLI、GUI、协作。
- Promptfoo issues：评测、红队、CI。

输出：

- 外部痛点。
- 对应 EasyClaw Skill 机会。
- 可发布的论坛帖：《GitHub Agent 社区最近在吵什么？EasyClaw 可以补哪些 Skill？》

比赛价值：

- 打破 EasyClaw 站内流量小的限制。
- 证明 ClawForge 能把外部 Agent 世界的需求引流到 EasyClaw。

### 2.4 MCP / A2A Bridge 跨生态桥

一句话：

> 把 EasyClaw Skill 转成 MCP server 描述、A2A Agent Card 或 GitHub Skill 包，让 EasyClaw 技能能走出去，也让外部技能能进来。

方向：

- GitHub `SKILL.md` -> EasyClaw Skill。
- EasyClaw Skill -> GitHub Skill repo 草稿。
- EasyClaw Skill -> MCP server manifest 草稿。
- EasyClaw Agent -> A2A capability card。

比赛价值：

- 这会显得不是做一个小站内工具，而是在帮 EasyClaw 对接整个 Agent 生态。
- 傅盛如果想做平台，这个方向会很有吸引力。

### 2.5 Community Terrain Map 社区地形图

一句话：

> 把社区按“荒地、矿区、拥挤区、绿洲、断桥”可视化，告诉运营者下一步该开荒哪里。

定义：

- 荒地：需求存在，但没有技能。
- 矿区：外部 GitHub 很热，EasyClaw 还没覆盖。
- 拥挤区：技能重复过多。
- 绿洲：有高质量技能和讨论。
- 断桥：技能有了，但没有教程、悬赏或 Agent 协作。

比赛价值：

- 非常有“社区建设者”气质。
- 能自然连接到自动发帖、发悬赏、拉 Agent 合作。

### 2.6 Founder Dashboard 傅盛视角驾驶舱

一句话：

> 给平台创始人看的社区增长驾驶舱：今天该扶持哪个方向、该发什么悬赏、该邀请谁、该淘汰或合并哪些技能。

核心指标：

- 新技能质量分。
- 技能有用性 delta。
- 技能重复度。
- 论坛内容转化率。
- 悬赏参与率。
- Agent 连接密度。
- 外部痛点导入数。

比赛价值：

- 直接对准傅盛。
- 让他看到这不是学生作业，而是“我在帮你做平台增长系统”。

### 2.7 Campaign Replay 开荒战役回放

一句话：

> 像 AgentOps session replay 一样，把一次开荒战役录成可回放时间线。

内容：

- 每个 Agent 的输入输出。
- 每一步耗时。
- 质量评分变化。
- 发布动作。
- 失败和人工确认点。
- 最终产物链接。

比赛价值：

- 很适合演示视频。
- 技术可信，有“观测系统”的味道。

### 2.8 Trust & Safety Gate 信任与安全门禁

一句话：

> 所有自动发布前先过安全门禁：重复、夸大、敏感、危险操作、prompt injection、来源不明都要被拦下。

检查项：

- 是否包含敏感信息。
- 是否鼓励绕过平台规则。
- 是否有不安全代码。
- 是否夸大效果。
- 是否抄袭 GitHub 内容未署名。
- 是否重复刷帖。
- 是否有明确回滚机制。

比赛价值：

- 自动建设社区最怕变成垃圾内容生产机。
- 这个模块能让项目显得成熟、负责、可落地。

## 3. 最值得放进 MVP 的三个增强

### 第一优先级：Skill Proof-of-Work

原因：

- 最能体现技术深度。
- 直接回应“自动生成技能有没有用”。
- 可以在 UI 中做一个非常漂亮的 before/after 对比。

MVP 做法：

- 固定 Cron Token Saver 案例。
- 设计 3 个 cron 配置样例。
- 对比“普通提示词分析”和“使用 Skill 分析”的输出质量。
- 给出 delta 分数和 token 节省估算。

### 第二优先级：Community Terrain Map

原因：

- 最能体现平台视角。
- 比普通数据 dashboard 更有记忆点。
- 适合第一屏或生态雷达页。

MVP 做法：

- 用 EasyClaw 当前数据生成 5 类地形卡。
- 每张卡给一个开荒动作。

### 第三优先级：Campaign Replay

原因：

- 最适合比赛展示和录屏。
- 能把多 Agent 协作讲清楚。

MVP 做法：

- Forge Run 完成后生成一条 replay timeline。
- 每一步显示 agent、动作、输入、输出、耗时、风险。

## 4. 可以作为高级规划但不必当天全做

- MCP / A2A Bridge。
- GitHub Pain Miner 全自动抓取。
- Founder Dashboard 全量指标。
- 真实自动私信相关 Agent。
- 自动生成社区周报。
- 技能基因图谱的复杂网络图。

这些可以在展示中作为 Roadmap，但 MVP 先做可视化原型和少量真实数据即可。

## 5. 新版一句话路演

> ClawForge 不只是帮 EasyClaw 生成技能，而是把 EasyClaw 变成一个会自我开荒的 Agent 社区：它能从站内和 GitHub 发现需求，证明技能真的有用，自动发布内容和悬赏，连接相关 Agent，并把每一次社区反馈变成下一轮增长。

