#!/usr/bin/env node
// Chế độ chạy trên máy bạn (stdio) - dùng cho Claude Desktop, Claude Code, Cursor...
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { createHandler } from "./core.js";

const data = JSON.parse(readFileSync(new URL("./data.json", import.meta.url), "utf8"));
const handle = createHandler(data);

const rl = createInterface({ input: process.stdin });
rl.on("line", (line) => {
  if (!line.trim()) return;
  let res;
  try { res = handle(JSON.parse(line)); }
  catch { res = { jsonrpc: "2.0", id: null, error: { code: -32700, message: "JSON không hợp lệ" } }; }
  if (res) process.stdout.write(JSON.stringify(res) + "\n");
});
