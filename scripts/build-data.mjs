// Đọc các file markdown trong framework/ và sinh ra src/data.json cho MCP server.
// Chạy: node scripts/build-data.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "framework");
const files = readdirSync(dir).filter((f) => f.endsWith(".md")).sort();

const overview = readFileSync(join(dir, files.find((f) => f.startsWith("00"))), "utf8");

// --- phiên bản ---
const version = (overview.match(/Phiên bản dữ liệu: \*\*(.+?)\*\*/) || [])[1] || "";

// --- bảng markdown -> mảng hàng ---
function tableAfter(text, headingRegex) {
  const lines = text.split("\n");
  const i = lines.findIndex((l) => headingRegex.test(l));
  const rows = [];
  for (let j = i + 1; j < lines.length; j++) {
    const l = lines[j].trim();
    if (!l.startsWith("|")) { if (rows.length) break; else continue; }
    if (/^\|[-| ]+\|$/.test(l)) continue;
    rows.push(l.slice(1, -1).split("|").map((c) => c.trim()));
  }
  return rows.slice(1); // bỏ dòng tiêu đề
}

const phases = tableAfter(overview, /^## 6 pha/).map(([id, name, q, produces, rhythm]) => ({
  id, name, customerQuestion: q,
  producesForNextPhase: produces.split(" · ").length > 1 ? produces.split(" · ") : produces.split("; "),
  saleSeasonRhythm: rhythm,
}));

const channels = tableAfter(overview, /^## 19 kênh/).map(([platform, id, name, covers]) => ({
  id, name, platform, covers,
}));

const linkTypes = (overview.match(/## 6 loại liên kết \(số lượng\)\n(.+)/) || [])[1]
  .split(" · ").map((s) => {
    const m = s.match(/^(.*) \((\d+)\)$/);
    return { type: m[1], count: Number(m[2]) };
  });

const blockKinds = (overview.match(/## Nhãn loại khối\n(.+)/) || [])[1]
  .split(" · ").map((s) => { const [label, meaning] = s.split(" = "); return { label, meaning }; });

// --- ghi chú xuyên kênh ---
const notesPart = overview.split("## Ghi chú xuyên kênh")[1].split("\nNguồn tham chiếu")[0];
const notes = notesPart.split(/\n### /).slice(1).map((sec) => {
  const [title, ...rest] = sec.split("\n");
  return { title: title.trim(), items: rest.filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim()) };
});

// --- khối + liên kết từ các file pha ---
const blocks = [];
const links = [];
for (const f of files.filter((x) => /^0[1-6]/.test(x))) {
  const text = readFileSync(join(dir, f), "utf8");
  const phaseId = text.match(/^# (P\d)/m)[1];
  for (const line of text.split("\n")) {
    if (/^\| P\d_/.test(line)) {
      const c = line.slice(1, -1).split("|").map((x) => x.trim());
      blocks.push({ id: c[0], name: c[1], channel: c[2], kind: c[3], tactic: c[4], phase: phaseId });
    }
    const m = line.match(/^(\d+)\. (P\d_\w+) → (P\d_\w+) · (.+?) · (.+?) — (.+)$/);
    if (m) links.push({ no: +m[1], from: m[2], to: m[3], type: m[4], label: m[5], why: m[6] });
  }
}

const kindMap = { Paid: "Paid - trả phí (quảng cáo)", Organic: "Organic - tự nhiên (tìm kiếm, AI)", Owned: "Owned - kênh sở hữu", Earned: "Earned - kênh lan tỏa (người khác nói về thương hiệu)", Data: "Data - dữ liệu, đo lường" };
for (const b of blocks) b.kind = kindMap[b.kind] || b.kind;
links.sort((a, b) => a.no - b.no);

const data = { title: "Framework Marketing Đa Kênh", publisher: "IDMA Dev", version, counts: { phases: phases.length, channels: channels.length, blocks: blocks.length, links: links.length }, phases, channels, linkTypes, blockKinds, blocks, links, notes };
writeFileSync(join(root, "src", "data.json"), JSON.stringify(data, null, 1));
console.log("OK", data.counts, "phiên bản", version);
if (data.counts.blocks !== 69 || data.counts.links !== 219) { console.error("CẢNH BÁO: số khối/liên kết không phải 69/219"); process.exitCode = 1; }
