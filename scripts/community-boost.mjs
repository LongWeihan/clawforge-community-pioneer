import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const easyclawBase = "https://easyclaw.link";
const deepseekBase = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
const deepseekModel = process.env.DEEPSEEK_MODEL || "deepseek-chat";

const args = new Set(process.argv.slice(2));
const shouldPublish = args.has("--publish");
const shouldComment = args.has("--comment");
const maxPosts = Number(process.argv.find((arg) => arg.startsWith("--max-posts="))?.split("=")[1] || 2);
const draftArg = process.argv.find((arg) => arg.startsWith("--draft="));
const draftFile = draftArg ? draftArg.slice("--draft=".length) : null;
const username = process.env.EASYCLAW_USERNAME || "longwh";
const password = process.env.EASYCLAW_PASSWORD;
const explicitToken = process.env.EASYCLAW_TOKEN;
const deepseekKey = process.env.DEEPSEEK_API_KEY;

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(root, file), "utf8"));
  } catch {
    return fallback;
  }
}

async function readText(file, fallback = "") {
  try {
    return await fs.readFile(path.join(root, file), "utf8");
  } catch {
    return fallback;
  }
}

function sanitizeTags(tags = []) {
  return [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))].slice(0, 5);
}

function validatePost(post) {
  const title = String(post.title || "").trim();
  const summary = String(post.summary || "").trim();
  const content = String(post.content || "").trim();
  const category = ["skills", "lounge", "announce"].includes(post.category) ? post.category : "skills";
  if (title.length < 5 || title.length > 100) throw new Error(`Invalid title length: ${title}`);
  if (summary.length < 10) throw new Error(`Invalid summary: ${title}`);
  if (content.length < 100) throw new Error(`Content too short: ${title}`);
  return {
    title,
    summary,
    content,
    category,
    tags: sanitizeTags(post.tags),
    purpose: String(post.purpose || "community_campaign").trim()
  };
}

function fallbackPack(context) {
  const demoUrl = context.demoUrl;
  const skillUrl = context.publications.asset?.url;
  const forumUrl = context.publications.forumPost?.url;
  const bountyUrls = (context.publications.bounties || []).map((item) => item.url).join("、");
  return {
    posts: [
      {
        title: "ClawForge 开荒日志：我把 EasyClaw 做成了一张社区地形图",
        summary: "分享 ClawForge 如何把论坛、技能市场、悬赏和 A2A 信号转成可点击的社区地形图。",
        category: "skills",
        tags: ["ClawForge", "Hackathon", "Agent", "社区开荒", "EasyClaw"],
        purpose: "explain_terrain_map",
        content: `我这次黑客松做的 ClawForge，不想只停留在“又提交了一个 Skill”。我更想验证一件事：早期 Agent 社区能不能被 Agent 自己持续建设起来。

所以我把 EasyClaw 的论坛、技能市场、悬赏、排行榜和 A2A Agent 信号整理成了一张“社区地形图”。地形分成五类：矿区代表已经有真实需求和高价值信号，荒地代表能力存在但新手路径不清楚，拥挤区代表同类技能太多需要合并，绿洲代表已经被社区验证的方向，断桥代表技能和论坛讨论之间还没有连接起来。

这个地图不是装饰，它会直接决定 ClawForge 下一步做什么：该生成 Skill、写教程、播种悬赏、邀请 Agent 试用，还是先做重复度审计。

当前演示案例是 Cron Token Waste Inspector：从 cron 省 token 经验出发，生成 Skill、跑 Proof-of-Work，再配套论坛帖和 3 个试用悬赏。

演示网站：${demoUrl}
Skill：${skillUrl}
原始开荒帖：${forumUrl}
悬赏入口：${bountyUrls}

欢迎大家从“地形分类是否准确”和“下一块应该开荒哪里”两个角度挑刺。`
      },
      {
        title: "ClawForge 技术拆解：从 Signal Scout 到 Launch Swarm",
        summary: "拆解 ClawForge 多 Agent 流水线如何把社区信号变成 Skill、Proof、论坛帖和悬赏。",
        category: "skills",
        tags: ["ClawForge", "Agent", "Skill", "ProofOfWork", "A2A"],
        purpose: "technical_deep_dive",
        content: `ClawForge 的核心不是生成一段漂亮文案，而是一条有质量门禁的多 Agent 流水线。

我的当前实现把 Agent 拆成几类角色：

1. Signal Scout：读取 EasyClaw 论坛、技能市场、悬赏和 A2A Agent，找真实信号。
2. Terrain Cartographer：把信号转成社区地形，判断是矿区、荒地、拥挤区、绿洲还是断桥。
3. Skill Forge：把高价值缺口变成可提交 Skill，补齐触发场景、输入输出和安全边界。
4. Proof Lab：发布前做 baseline / with skill 对比，证明不是凭感觉说有用。
5. Launch Swarm：把一个 Skill 包装成论坛图文、试用悬赏和 Agent 协作邀请。

这次 Cron Token Waste Inspector 的 Proof-of-Work 里，baseline 质量分是 62，with skill 是 84，质量差值 +22，并估算 token 成本可下降 18%。我知道这还不是严格学术评测，但它至少让 Skill 发布前先过一道“真的有用吗”的门。

项目已经部署成静态网站，里面有可交互地形图和 AI 架构图：${demoUrl}

如果你也在做 EasyClaw Skill，我特别想听两个反馈：你觉得 Skill 发布前最应该检查什么？以及论坛帖、悬赏、A2A 邀请这三件事，哪一个最能带动早期社区互动？`
      },
      {
        title: "邀请大家来拆 ClawForge：三个试用入口和三个挑刺方向",
        summary: "我把 ClawForge 的 Skill、演示网站和悬赏入口整理出来，欢迎社区试用和挑刺。",
        category: "lounge",
        tags: ["ClawForge", "试用", "悬赏", "反馈", "Hackathon"],
        purpose: "feedback_call",
        content: `我想把 ClawForge 这次黑客松作品当成一个公开开荒实验来跑，而不是只等最后提交。

三个试用入口：

1. 看演示网站：${demoUrl}
2. 试用 Skill：${skillUrl}
3. 参加悬赏：${bountyUrls}

三个最需要大家挑刺的方向：

第一，Cron Token Waste Inspector 的判断边界是否合理。比如哪些 cron 任务绝对不应该合并？哪些 heartbeat 任务其实不能捎带？

第二，社区地形图是否真的能帮助 EasyClaw 增长。矿区、荒地、拥挤区、绿洲、断桥这五类是否够用？有没有更适合 Agent 社区的分类？

第三，自动造势要怎么避免变成灌水。我的设计里限制了每次只围绕一个明确机会，Skill 必须经过 Proof-of-Work，每个 Skill 最多一篇主帖，悬赏也要有验收标准。但这套边界可能还需要社区一起打磨。

如果你愿意帮忙，最简单的方式是在悬赏里提交一个 cron 浪费案例，或者在评论里直接指出一个误判场景。`
      }
    ],
    comments: [
      {
        slug: "agent-cron-token-moyo2c5v",
        purpose: "campaign_update",
        content: `更新一下：ClawForge 的演示网站和 README 已经继续打磨，首屏改成了更准确的“Agent 社区开荒引擎”。现在页面里有可交互社区地形图、AI 架构图、Proof-of-Work 对比和已发布战果入口。

演示网站：${demoUrl}
我接下来会围绕“不要刷屏、只发高质量开荒内容”继续跑几条社区反馈线，欢迎大家直接挑错。`
      }
    ]
  };
}

function extractJson(text) {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("DeepSeek response did not contain JSON.");
  return JSON.parse(raw.slice(start, end + 1));
}

async function askDeepSeek(context) {
  if (!deepseekKey) return fallbackPack(context);

  const prompt = `你是 ClawForge 社区运营 Agent。请为 EasyClaw 黑客松作品生成一组高质量社区造势内容。

要求：
- 必须透明说明这是参赛作品，不要伪装成第三方推荐。
- 不要刷屏、不要夸大、不要承诺未经证明的数据。
- 使用第一人称“我”或项目名“ClawForge”，不要写“我们团队”，因为这是个人参赛作品。
- 悬赏奖励单位写“龙虾币”，不要写 token。
- 不要说“无需人工干预”“全自动发布”；正确说法是：ClawForge 生成和编排内容，真实发布经过人工确认。
- 不要声称生成了代码或完整自动测试；当前真实产物是 Skill Markdown、Proof-of-Work 报告、论坛图文、悬赏和静态演示网站。
- Cron Token Waste Inspector 的准确能力是：检查 cron 碎片化、重复上下文加载、低价值巡检、heartbeat/main session 合并机会和回滚边界。不要泛泛写“标准 cron 表达式检测器”。
- 每篇内容都要有真实技术信息、反馈请求和社区参与入口。
- 输出 3 篇论坛帖和 1 条原帖更新评论。
- 论坛帖 content 至少 500 个中文字符，标题 5-100 字，summary 至少 10 字。
- category 只能是 skills 或 lounge。
- tags 最多 5 个。
- 只输出 JSON，不要输出解释。

项目上下文：
${JSON.stringify(context, null, 2)}

JSON 格式：
{
  "posts": [
    {"title":"","summary":"","category":"skills","tags":[""],"purpose":"","content":""}
  ],
  "comments": [
    {"slug":"agent-cron-token-moyo2c5v","purpose":"","content":""}
  ]
}`;

  const response = await fetch(`${deepseekBase}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${deepseekKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: deepseekModel,
      messages: [
        { role: "system", content: "你是谨慎、真实、反刷屏的 Agent 社区运营助手。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`DeepSeek request failed: ${response.status} ${body.slice(0, 300)}`);
  }
  const json = await response.json();
  return extractJson(json.choices?.[0]?.message?.content || "");
}

async function login() {
  if (explicitToken) return explicitToken;
  if (!password) throw new Error("Publishing requires EASYCLAW_TOKEN or EASYCLAW_PASSWORD.");
  const response = await fetch(`${easyclawBase}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: `${username}@easyclaw.link`,
      password
    })
  });
  if (!response.ok) throw new Error(`EasyClaw login failed: ${response.status} ${await response.text()}`);
  const json = await response.json();
  if (!json.token) throw new Error("EasyClaw login did not return token.");
  return json.token;
}

async function postForum(token, post) {
  const response = await fetch(`${easyclawBase}/api/forum`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });
  const body = await response.json().catch(async () => ({ error: await response.text() }));
  if (!response.ok) throw new Error(`Forum post failed: ${response.status} ${JSON.stringify(body)}`);
  return body;
}

async function commentForum(token, comment) {
  const response = await fetch(`${easyclawBase}/api/forum/${comment.slug}/comments`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content: comment.content, parent_id: null })
  });
  const body = await response.json().catch(async () => ({ error: await response.text() }));
  if (!response.ok) throw new Error(`Forum comment failed: ${response.status} ${JSON.stringify(body)}`);
  return body;
}

function toMarkdown(pack) {
  const posts = pack.posts.map((post, index) => `## Post ${index + 1}: ${post.title}

- Purpose: ${post.purpose}
- Category: ${post.category}
- Tags: ${post.tags.join(", ")}
- Summary: ${post.summary}

${post.content}
`).join("\n");
  const comments = pack.comments.map((comment, index) => `## Comment ${index + 1}: ${comment.slug}

- Purpose: ${comment.purpose}

${comment.content}
`).join("\n");
  return `# ClawForge Community Boost Pack

Generated at: ${new Date().toISOString()}

${posts}
${comments}`;
}

async function main() {
  const publications = await readJson("data/publication-results.json", {});
  const snapshot = await readJson("data/easyclaw-snapshot.json", {});
  const readme = await readText("README.md");
  const context = {
    project: "ClawForge 社区开荒者",
    positioning: "Agent 社区开荒引擎",
    demoUrl: "https://longweihan.github.io/clawforge-community-pioneer/",
    repoUrl: "https://github.com/LongWeihan/clawforge-community-pioneer",
    releaseZip: "https://github.com/LongWeihan/clawforge-community-pioneer/releases/download/v1.0.0/clawforge-community-pioneer-submission.zip",
    publications,
    stats: snapshot.stats,
    readmeHighlights: readme.split("\n").slice(0, 80).join("\n")
  };

  const generated = draftFile
    ? await readJson(draftFile, null)
    : await askDeepSeek(context);
  if (!generated) throw new Error(`Draft file not found or invalid: ${draftFile}`);
  const pack = {
    generatedAt: new Date().toISOString(),
    generator: generated.generator || (deepseekKey ? `deepseek:${deepseekModel}` : "fallback"),
    posts: (generated.posts || []).map(validatePost),
    comments: (generated.comments || []).map((comment) => ({
      slug: String(comment.slug || "").trim(),
      purpose: String(comment.purpose || "campaign_update").trim(),
      content: String(comment.content || "").trim()
    })).filter((comment) => comment.slug && comment.content.length >= 20)
  };

  const id = timestamp();
  const jsonPath = path.join(root, "outputs/campaigns", `community-boost-${id}.json`);
  const mdPath = path.join(root, "outputs/campaigns", `community-boost-${id}.md`);
  await fs.writeFile(jsonPath, JSON.stringify(pack, null, 2), "utf8");
  await fs.writeFile(mdPath, toMarkdown(pack), "utf8");

  const result = {
    generatedAt: pack.generatedAt,
    generator: pack.generator,
    draftJson: path.relative(root, jsonPath).replace(/\\/g, "/"),
    draftMarkdown: path.relative(root, mdPath).replace(/\\/g, "/"),
    published: [],
    comments: []
  };

  if (shouldPublish || shouldComment) {
    const token = await login();
    if (shouldPublish) {
      for (const post of pack.posts.slice(0, Math.max(0, maxPosts))) {
        const body = await postForum(token, {
          title: post.title,
          summary: post.summary,
          content: post.content,
          category: post.category,
          tags: post.tags
        });
        result.published.push({
          title: post.title,
          id: body.id || body.post?.id,
          slug: body.slug || body.post?.slug,
          url: body.slug || body.post?.slug ? `${easyclawBase}/zh/forum/${body.slug || body.post.slug}` : null
        });
      }
    }
    if (shouldComment) {
      for (const comment of pack.comments.slice(0, 1)) {
        const body = await commentForum(token, comment);
        result.comments.push({
          slug: comment.slug,
          id: body.id || body.comment?.id,
          url: `${easyclawBase}/zh/forum/${comment.slug}`
        });
      }
    }
  }

  const resultPath = path.join(root, "data/community-boost-results.json");
  let history = [];
  try {
    history = JSON.parse(await fs.readFile(resultPath, "utf8"));
  } catch {
    history = [];
  }
  history.unshift(result);
  await fs.writeFile(resultPath, JSON.stringify(history, null, 2), "utf8");

  console.log(JSON.stringify({
    draftMarkdown: result.draftMarkdown,
    postsGenerated: pack.posts.length,
    postsPublished: result.published.length,
    commentsPublished: result.comments.length,
    published: result.published,
    comments: result.comments
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
