import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const forbidden = [/sk-[a-z0-9]{20,}/i, /gho_[a-z0-9_]+/i];
const ignored = new Set([".git", "node_modules", "dist"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk(root);
const offenders = [];
for (const file of files) {
  const rel = path.relative(root, file);
  if (/\.(png|jpg|jpeg|gif|webp|ico|zip)$/i.test(rel)) continue;
  const text = await fs.readFile(file, "utf8").catch(() => "");
  if (forbidden.some((rx) => rx.test(text))) offenders.push(rel);
}

if (offenders.length) {
  console.error("Potential secrets found:");
  for (const file of offenders) console.error(`- ${file}`);
  process.exit(1);
}

console.log("No obvious API keys found in repository files.");

