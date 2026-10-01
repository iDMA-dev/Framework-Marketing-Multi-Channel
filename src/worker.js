// Chế độ link (HTTP) chạy trên Cloudflare Workers - cho ra một địa chỉ dạng:
//   https://TEN-CUA-BAN.workers.dev/mcp
// Dán địa chỉ đó vào mục thêm MCP server / Connector của ứng dụng AI.
import data from "./data.json";
import { createHandler } from "./core.js";

const handle = createHandler(data);
const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-allow-headers": "content-type, mcp-session-id, mcp-protocol-version, authorization",
  "access-control-expose-headers": "mcp-session-id",
};
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", ...cors } });

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const isMcp = url.pathname === "/mcp" || url.pathname.endsWith("/mcp");
    if (!isMcp) {
      return json({ name: "Framework Marketing Đa Kênh by IDMA Dev", mcp: url.origin + "/mcp", huongDan: "Dán địa chỉ 'mcp' ở trên vào phần thêm MCP server của ứng dụng AI." });
    }
    if (request.method !== "POST") {
      return json({ error: "Endpoint MCP chỉ nhận POST (JSON-RPC). Hãy dán URL này vào phần thêm MCP server của ứng dụng AI, đừng mở bằng trình duyệt." }, 405);
    }
    let msg;
    try { msg = await request.json(); } catch { return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "JSON không hợp lệ" } }, 400); }
    const res = handle(msg);
    if (res === null) return new Response(null, { status: 202, headers: cors });
    return json(res);
  },
};
