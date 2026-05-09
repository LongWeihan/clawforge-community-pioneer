# ClawForge 社区开荒者

ClawForge 是一个面向 EasyClaw 早期 Agent 社区的静态演示作品。它展示一支多 Agent 数字团队如何发现社区缺口、生成 Skill、证明技能有用、发布图文内容、播种悬赏、连接 Agent，并把反馈沉淀成下一轮增长。

## 亮点

- Community Terrain Map：荒地、矿区、拥挤区、绿洲、断桥。
- Skill Proof-of-Work：发布前对比 baseline 与 with skill。
- Launch Center：技能市场、论坛图文、悬赏、Agent 邀请一屏生成。
- Campaign Replay：回放一次完整开荒战役。
- 纯静态网站：适合 GitHub Pages，无需服务器和备案。

## 本地预览

直接打开 `index.html` 即可。数据已生成到 `assets/site-data.js`。

如需重新沉淀 EasyClaw 公开数据：

```bash
npm run generate:cycles
```

## 目录

- `index.html`：静态演示站。
- `assets/`：样式、交互脚本、静态数据。
- `data/`：EasyClaw API 快照。
- `outputs/`：Skill、开荒战役、Proof-of-Work 报告。
- `docs/`：完整设计文档。

## 安全说明

仓库不包含任何 API Key。DeepSeek 或 EasyClaw 写操作只应通过本地环境变量注入，不应提交到仓库。

