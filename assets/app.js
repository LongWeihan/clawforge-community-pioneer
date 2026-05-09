const data = window.CLAWFORGE_DATA;

const $ = (selector) => document.querySelector(selector);

const architectureNodes = [
  {
    title: "Signal Scout",
    role: "嗅探需求",
    summary: "抓取技能市场、论坛、悬赏和外部 Agent 社区，把早期社区的真实缺口变成可行动信号。",
    outputs: ["热门技能与冷门荒地", "论坛经验与高频抱怨", "可传播选题"]
  },
  {
    title: "Terrain Cartographer",
    role: "绘制地形",
    summary: "把信号拆成荒地、矿区、拥挤区、绿洲、断桥，让评委一眼看到社区下一步该往哪里建。",
    outputs: ["可交互地形图", "机会优先级", "证据链"]
  },
  {
    title: "Skill Forge",
    role: "铸造技能",
    summary: "把高价值缺口转成可提交 Skill，补齐描述、输入输出、使用场景和失败边界。",
    outputs: ["Skill 草稿", "示例任务", "发布标签"]
  },
  {
    title: "Proof Lab",
    role: "证明有用",
    summary: "发布前跑 baseline 对比、质量评分、token 节省估算和密钥检查，让作品不是空喊概念。",
    outputs: ["Proof-of-Work", "质量差值", "Secret guard"]
  },
  {
    title: "Launch Swarm",
    role: "扩散增长",
    summary: "把一个 Skill 包装成论坛图文、试用悬赏、Agent 联盟邀请和后续反馈任务。",
    outputs: ["论坛宣传", "悬赏播种", "Campaign Replay"]
  }
];

function formatNumber(value) {
  if (value === undefined || value === null) return "0";
  return Number(value).toLocaleString("zh-CN");
}

function renderHeroMetrics() {
  const stats = data.stats;
  const metrics = [
    ["用户数", stats.users, "早期社区体量"],
    ["公开技能", stats.skills, "技能资产池"],
    ["技能调用", stats.calls, "累计使用信号"],
    ["论坛活动", stats.forumActivity, "内容与互动"],
    ["悬赏总数", stats.bountiesTotal, "任务市场"],
    ["命中率", stats.hitRate, "技能市场效率"]
  ];
  $("#heroMetrics").innerHTML = metrics.map(([label, value, hint]) => `
    <div class="metric">
      <span>${label}</span>
      <strong>${typeof value === "number" ? formatNumber(value) : value}</strong>
      <small>${hint}</small>
    </div>
  `).join("");
}

function renderTerrain() {
  const cards = data.terrainCards;
  const container = $("#terrainHotspots");
  const detail = $("#terrainDetail");
  const typeLabel = {
    wasteland: "荒地",
    mine: "矿区",
    crowded: "拥挤区",
    oasis: "绿洲",
    broken_bridge: "断桥"
  };
  const positions = [
    { x: 64, y: 31 },
    { x: 50, y: 58 },
    { x: 72, y: 68 },
    { x: 28, y: 64 },
    { x: 39, y: 34 }
  ];

  function selectTerrain(index) {
    const card = cards[index];
    [...container.children].forEach((node, idx) => node.classList.toggle("active", idx === index));
    detail.innerHTML = `
      <p class="eyebrow">${typeLabel[card.type]} · Urgency ${card.urgency}</p>
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <h3>建议动作</h3>
      <p>${card.recommendedActionText}</p>
      <h3>证据</h3>
      <ul>${card.evidence.map(item => `<li>${item}</li>`).join("")}</ul>
      <div class="tag-row">${card.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
    `;
  }

  container.innerHTML = cards.map((card, index) => {
    const position = positions[index % positions.length];
    return `
    <button class="terrain-hotspot ${card.type}" style="left:${position.x}%; top:${position.y}%;" type="button" aria-label="${typeLabel[card.type]}：${card.title}">
      <span class="hotspot-dot"></span>
      <span class="hotspot-label">
        <strong>${typeLabel[card.type]}</strong>
        <small>${card.title}</small>
      </span>
    </button>
  `;
  }).join("");
  [...container.children].forEach((node, index) => node.addEventListener("click", () => selectTerrain(index)));
  selectTerrain(0);
}

function renderBars() {
  const items = data.topAssets.slice(0, 8);
  const max = Math.max(...items.map(item => item.calls || 0), 1);
  $("#assetBars").innerHTML = items.map(item => `
    <div class="bar-item">
      <div class="bar-label">
        <strong title="${item.title}">${item.title}</strong>
        <span>${item.grade} · ${formatNumber(item.stars)} 收藏</span>
      </div>
      <strong>${formatNumber(item.calls)}</strong>
      <div class="bar-track"><span style="width:${Math.max(8, (item.calls / max) * 100)}%"></span></div>
    </div>
  `).join("");
}

function renderSignalMix() {
  const colors = ["var(--cyan)", "var(--mint)", "var(--amber)", "var(--rose)", "var(--violet)"];
  const total = data.signalMix.reduce((sum, item) => sum + item.value, 0);
  $("#signalMix").innerHTML = data.signalMix.map((item, index) => `
    <div class="donut-row">
      <strong>${item.label}</strong>
      <div class="mini-track"><span style="width:${(item.value / total) * 100}%; background:${colors[index % colors.length]}"></span></div>
      <span>${item.value}</span>
    </div>
  `).join("");
}

function renderExternalSignals() {
  $("#externalSignals").innerHTML = data.externalSignals.map(signal => `
    <li>
      <strong>${signal.name}</strong>
      <span>${signal.idea}</span>
    </li>
  `).join("");
}

function renderArchitecture() {
  const nodes = $("#architectureNodes");
  const detail = $("#architectureDetail");

  function selectNode(index) {
    const node = architectureNodes[index];
    [...nodes.children].forEach((item, idx) => item.classList.toggle("active", idx === index));
    detail.innerHTML = `
      <p class="eyebrow">${node.title} · ${node.role}</p>
      <h3>${node.summary}</h3>
      <ul>${node.outputs.map(output => `<li>${output}</li>`).join("")}</ul>
      <div class="tag-row">
        <span class="tag">agentic workflow</span>
        <span class="tag">quality gate</span>
        <span class="tag">community flywheel</span>
      </div>
    `;
  }

  nodes.innerHTML = architectureNodes.map((node, index) => `
    <button class="arch-node" type="button" aria-label="${node.title}：${node.role}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${node.title}</strong>
      <small>${node.role}</small>
    </button>
  `).join("");
  [...nodes.children].forEach((node, index) => node.addEventListener("click", () => selectNode(index)));
  selectNode(0);
}

function renderCampaign() {
  $("#agentRail").innerHTML = data.agents.map(agent => `
    <div class="agent-chip">${agent.name}<small>${agent.role}</small></div>
  `).join("");

  const timeline = $("#campaignTimeline");
  const detail = $("#stageDetail");
  const stages = data.campaign.stages;

  function selectStage(index) {
    const stage = stages[index];
    [...timeline.children].forEach((node, idx) => node.classList.toggle("active", idx === index));
    detail.innerHTML = `
      <p class="eyebrow">${stage.agent} · ${stage.status}</p>
      <h3>${stage.title}</h3>
      <p>${stage.summary}</p>
      <h3>产物</h3>
      <ul>${stage.outputs.map(item => `<li>${item}</li>`).join("")}</ul>
      <div class="tag-row">
        <span class="tag">耗时 ${stage.duration}s</span>
        <span class="tag">风险 ${stage.risk}</span>
      </div>
    `;
  }

  timeline.innerHTML = stages.map((stage, index) => `
    <button class="stage" type="button">
      <span class="stage-index">${index + 1}</span>
      <span><strong>${stage.title}</strong><span>${stage.agent}</span></span>
      <span class="status">${stage.status}</span>
    </button>
  `).join("");
  [...timeline.children].forEach((node, index) => node.addEventListener("click", () => selectStage(index)));
  selectStage(0);
}

function renderProof() {
  const proof = data.proofOfWork;
  $("#baselineScore").textContent = proof.baselineScore;
  $("#withSkillScore").textContent = proof.withSkillScore;
  $("#qualityDelta").textContent = `+${proof.qualityDelta}`;
  $("#tokenDelta").textContent = `Token 成本变化：${proof.tokenDeltaPct}%；发布结论：${proof.verdict}`;
  $("#proofCases").innerHTML = proof.cases.map(item => `
    <article class="case-card">
      <h3>${item.name}</h3>
      <p><strong>Baseline:</strong> ${item.baselineVerdict}</p>
      <p><strong>With Skill:</strong> ${item.withSkillVerdict}</p>
      <span class="tag">${item.passed ? "passed" : "needs revision"}</span>
    </article>
  `).join("");
}

function renderLaunch() {
  const pack = data.launchPack;
  const pubs = data.publications || {};
  const cards = [
    [
      "技能市场发布",
      pubs.asset ? `submitted · ${pubs.asset.status}` : "ready",
      pubs.asset ? `#${pubs.asset.id} ${pubs.asset.title}` : pack.skillMarketDraft.title,
      pack.skillMarketDraft.description,
      pack.skillMarketDraft.tags,
      pubs.asset?.url
    ],
    [
      "论坛图文宣传",
      pubs.forumPost ? "published" : "ready",
      pubs.forumPost ? `#${pubs.forumPost.id} ${pubs.forumPost.title}` : pack.forumPostDraft.title,
      pack.forumPostDraft.summary,
      ["tutorial", "case-study", "feedback"],
      pubs.forumPost?.url
    ],
    [
      "悬赏播种",
      pubs.bounties ? `${pubs.bounties.length} open` : "dry run",
      pubs.bounties ? `${pubs.bounties.length} 个悬赏已发布` : `${pack.bountyDrafts.length} 条悬赏草稿`,
      pubs.bounties ? pubs.bounties.map(item => `#${item.id} ${item.title}`).join("；") : pack.bountyDrafts.map(item => item.title).join("；"),
      ["trial", "bug-bash", "extension"],
      pubs.bounties?.[0]?.url
    ],
    ["Agent 联盟", "draft", `${pack.allianceDrafts.length} 个邀请对象`, pack.allianceDrafts.map(item => item.targetAgent).join("、"), ["A2A", "collaboration"]]
  ];
  $("#launchCards").innerHTML = cards.map(([title, mode, headline, text, tags, url]) => `
    <article class="launch-card">
      <span class="mode">${mode}</span>
      <h3>${title}</h3>
      <p><strong>${headline}</strong></p>
      <p>${text}</p>
      <div class="tag-row">${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      ${url ? `<p><a href="${url}">查看线上结果</a></p>` : ""}
    </article>
  `).join("");
}

function renderReplay() {
  $("#replayTimeline").innerHTML = data.campaign.stages.map(stage => `
    <div class="replay-item">
      <strong>${stage.agent}</strong>
      <span>${stage.title}</span>
      <span>${stage.duration}s · ${stage.status}</span>
    </div>
  `).join("");
}

function renderArtifacts() {
  $("#artifactLinks").innerHTML = data.artifacts.map(item => `
    <article class="artifact-card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.href}">打开文件</a>
    </article>
  `).join("");
}

renderHeroMetrics();
renderTerrain();
renderBars();
renderSignalMix();
renderExternalSignals();
renderArchitecture();
renderCampaign();
renderProof();
renderLaunch();
renderReplay();
renderArtifacts();
