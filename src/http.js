#!/usr/bin/env node
// Chế độ link tự chạy trên máy/VPS của bạn (Node, không cần Cloudflare):
//   node src/http.js        -> http://localhost:3000/mcp
// Biến môi trường: PORT (mặc định 3000)
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { createHandler } from "./core.js";

const data = JSON.parse(readFileSync(new URL("./data.json", import.meta.url), "utf8"));
const handle = createHandler(data);
const port = Number(process.env.PORT) || 3000;
const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-allow-headers": "content-type, mcp-session-id, mcp-protocol-version, authorization",
};
const send = (res, status, body) => {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", ...cors });
  res.end(body === undefined ? undefined : JSON.stringify(body));
};

createServer((req, res) => {
  if (req.method === "OPTIONS") { res.writeHead(204, cors); return res.end(); }
  if (!req.url.split("?")[0].endsWith("/mcp")) return send(res, 200, { name: "Framework Marketing Đa Kênh by IDMA Dev", mcp: "/mcp" });
  if (req.method !== "POST") return send(res, 405, { error: "Endpoint MCP chỉ nhận POST (JSON-RPC). Hãy dán URL này vào phần thêm MCP server của ứng dụng AI, đừng mở bằng trình duyệt." });
  let body = "";
  req.on("data", (c) => { body += c; if (body.length > 1e6) req.destroy(); });
  req.on("end", () => {
    let msg;
    try { msg = JSON.parse(body); } catch { return send(res, 400, { jsonrpc: "2.0", id: null, error: { code: -32700, message: "JSON không hợp lệ" } }); }
    const r = handle(msg);
    if (r === null) { res.writeHead(202, cors); return res.end(); }
    send(res, 200, r);
  });
}).listen(port, () => console.error(`MCP server đang chạy: http://localhost:${port}/mcp`));
