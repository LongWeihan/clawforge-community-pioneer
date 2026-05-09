const data = window.CLAWFORGE_DATA;

const $ = (selector) => document.querySelector(selector);

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
renderCampaign();
renderProof();
renderLaunch();
renderReplay();
renderArtifacts();
