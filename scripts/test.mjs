// Kiểm tra nhanh: chạy server thật ở cả hai chế độ và gọi từng công cụ.
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import assert from "node:assert/strict";

const call = (id, name, args = {}) => ({ jsonrpc: "2.0", id, method: "tools/call", params: { name, arguments: args } });
const body = (r) => JSON.parse(r.result.content[0].text);

const cases = [
  ["framework_overview", {}, (b) => { assert.equal(b.counts.blocks, 69); assert.equal(b.counts.links, 219); assert.equal(b.phases.length, 6); assert.equal(b.channels.length, 19); }],
  ["framework_phase", { phase: "P2" }, (b) => { assert.equal(b.id, "P2"); assert.ok(b.outgoingLinks.length > 30); }],
  ["framework_phase", { phase: "so sánh" }, (b) => assert.equal(b.id, "P3")],
  ["framework_channel", { channel: "Zalo" }, (b) => assert.ok(b.blocksByPhase.flatMap((x) => x.blocks).length >= 4)],
  ["framework_channel", { channel: "Meta" }, (b) => assert.equal(b.channels.length, 4)],
  ["framework_block", { block: "P2_FBMSG" }, (b) => { assert.ok(b.inputs.length > 0 && b.outputs.length > 0); }],
  ["framework_block", { block: "meta cpas" }, (b) => assert.equal(b.id, "P4_CPAS")],
  ["framework_path", { from: "TikTok", to: "Website" }, (b) => { assert.ok(b.paths.length > 0); assert.ok(b.paths[0].steps <= 4); }],
  ["framework_path", { from: "P1_TTCH", to: "P4_WEB" }, (b) => assert.ok(b.paths.length > 0)],
  ["framework_plan", { channels: ["TikTok", "Zalo", "Website, email"] }, (b) => { assert.ok(b.suggestedChannelsToAdd.length > 0); assert.ok(b.reminders.length > 0); }],
  ["framework_search", { query: "retarget" }, (b) => assert.ok(b.total > 0)],
  ["framework_search", { query: "livestream" }, (b) => assert.ok(b.total > 0)],
  ["framework_notes", { topic: "pháp lý" }, (b) => assert.equal(b.notes.length, 1)],
  ["framework_notes", {}, (b) => assert.equal(b.notes.length, 6)],
];

// ---- chế độ stdio ----
async function testStdio() {
  const p = spawn("node", ["src/stdio.js"], { stdio: ["pipe", "pipe", "inherit"] });
  const rl = createInterface({ input: p.stdout });
  const waiters = new Map();
  rl.on("line", (l) => { const m = JSON.parse(l); waiters.get(m.id)?.(m); });
  const rpc = (msg) => new Promise((res) => { waiters.set(msg.id, res); p.stdin.write(JSON.stringify(msg) + "\n"); });
  const init = await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "test", version: "0" } } });
  assert.equal(init.result.serverInfo.name, "IDMA-Framework-Marketing");
  p.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
  const list = await rpc({ jsonrpc: "2.0", id: 2, method: "tools/list" });
  assert.equal(list.result.tools.length, 8);
  let id = 10;
  for (const [name, args, check] of cases) check(body(await rpc(call(id++, name, args))));
  const bad = await rpc(call(id++, "framework_block", { block: "khong-ton-tai" }));
  assert.equal(bad.result.isError, true);
  p.kill();
  console.log(`stdio: OK (${cases.length + 3} kiểm tra)`);
}

// ---- chế độ HTTP ----
async function testHttp() {
  const port = 3999;
  const p = spawn("node", ["src/http.js"], { env: { ...process.env, PORT: String(port) }, stdio: ["ignore", "ignore", "pipe"] });
  await new Promise((r) => p.stderr.once("data", r));
  const url = `http://localhost:${port}/cong-cu/mcp`;
  const get = await fetch(url);
  assert.equal(get.status, 405);
  assert.match((await get.json()).error, /chỉ nhận POST/);
  const post = (msg) => fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(msg) });
  const init = await (await post({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} })).json();
  assert.equal(init.result.serverInfo.name, "IDMA-Framework-Marketing");
  assert.equal((await post({ jsonrpc: "2.0", method: "notifications/initialized" })).status, 202);
  const r = await (await post(call(2, "framework_overview"))).json();
  assert.equal(body(r).counts.links, 219);
  p.kill();
  console.log("http: OK");
}

await testStdio();
await testHttp();
console.log("TẤT CẢ ĐẠT");
