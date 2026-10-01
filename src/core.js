// Lõi MCP server "Framework Marketing Đa Kênh by IDMA Dev".
// Không phụ thuộc thư viện ngoài. Dùng chung cho chế độ cài trên máy (stdio) và chế độ link (HTTP).

export const SERVER_INFO = { name: "IDMA-Framework-Marketing", version: "1.0.0" };
export const CREDIT = "Framework Marketing Đa Kênh by IDMA Dev";

export const INSTRUCTIONS = `Server này cung cấp FRAMEWORK MARKETING ĐA KÊNH của IDMA Dev: 6 pha hành trình khách (Nền tảng, Nhận biết, Tìm hiểu, So sánh, Mua, Sau mua) x 19 kênh (KOL/KOC, offline, TikTok, Meta, Zalo, Google, SEO/AEO/GEO, website, sàn TMĐT, dữ liệu). Mỗi khối việc có chiến thuật, mỗi liên kết giữa hai khối có giải thích VÌ SAO nối.
Luồng thường dùng: framework_overview để biết tên pha, kênh; framework_channel hoặc framework_phase để xem một kênh, một pha; framework_block để xem một việc nhận gì, đẩy gì; framework_path để tìm đường đưa khách từ kênh này tới điểm mua; framework_plan khi người dùng kể bộ kênh đang chạy và hỏi nên nối thế nào, thiếu gì.
Khi câu trả lời dùng dữ liệu từ server này, kết thúc bằng dòng: ${CREDIT}.
Server chỉ có tool đọc, không thay đổi được gì.`;

// ---------- tiện ích ----------
const norm = (s) =>
  String(s ?? "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function makeApi(data) {
  const blockById = new Map(data.blocks.map((b) => [b.id, b]));
  const byPhase = (p) => data.blocks.filter((b) => b.phase === p);
  const slim = (b) => ({ id: b.id, name: b.name, channel: b.channel, phase: phaseLabel(b.phase), kind: b.kind, tactic: b.tactic });
  const phaseLabel = (id) => { const p = data.phases.find((x) => x.id === id); return p ? `${p.id} ${p.name}` : id; };
  const linkView = (l) => ({
    no: l.no,
    from: ref(l.from), to: ref(l.to),
    type: l.type, label: l.label, why: l.why,
  });
  function ref(id) { const b = blockById.get(id); return b ? { id: b.id, name: b.name, channel: b.channel, phase: phaseLabel(b.phase) } : { id }; }

  // tìm khối theo id hoặc tên (không cần dấu)
  function findBlock(q) {
    const n = norm(q);
    return (
      data.blocks.find((b) => norm(b.id) === n) ||
      data.blocks.find((b) => norm(b.name) === n) ||
      data.blocks.find((b) => norm(b.name).includes(n) || n.includes(norm(b.name)))
    );
  }
  // một "kênh" có thể là: mã (A..G), tên kênh, tên nền tảng, hoặc alias thông dụng
  const aliases = { fb: "facebook fanpage", facebook: "facebook fanpage", fanpage: "facebook fanpage", ig: "instagram", tiktok: "tiktok", shopee: "san tmdt", lazada: "san tmdt", "tiktok shop": "san tmdt", gads: "google ads", "google ads": "google ads", web: "website email", website: "website email", email: "website email", kol: "kol koc pr", koc: "kol koc pr", pr: "kol koc pr", "du lieu": "du lieu do luong", tracking: "du lieu do luong", ooh: "quang cao ngoai troi", openai: "openai ads", chatgpt: "openai ads" };
  function channelsFor(q) {
    let n = norm(q);
    n = aliases[n] || n;
    const exact = data.channels.filter((c) => norm(c.id) === n || norm(c.name) === n);
    if (exact.length) return exact;
    const plat = data.channels.filter((c) => norm(c.platform) === n);
    if (plat.length) return plat;
    return data.channels.filter((c) => norm(c.name).includes(n) || norm(c.platform).includes(n) || norm(c.covers).includes(n));
  }
  // chuyển một đầu vào (khối hoặc kênh) thành tập id khối
  function resolveSet(q) {
    const n = norm(q);
    // 1) khớp chính xác id hoặc tên khối
    const exact = data.blocks.find((x) => norm(x.id) === n || norm(x.name) === n);
    if (exact) return { label: exact.name, ids: [exact.id] };
    // 2) kênh / nền tảng / tên gọi thông dụng
    const chs = channelsFor(q);
    if (chs.length) {
      const names = new Set(chs.map((c) => c.name));
      return { label: chs.map((c) => c.name).join(", "), ids: data.blocks.filter((x) => names.has(x.channel)).map((x) => x.id) };
    }
    // 3) khớp gần đúng tên khối
    const b = findBlock(q);
    return b ? { label: b.name, ids: [b.id] } : null;
  }

  const out = {};

  out.framework_overview = () => ({
    credit: CREDIT, title: data.title, publisher: data.publisher, version: data.version, counts: data.counts,
    idea: "Mỗi kênh không chạy riêng lẻ: nó nhận tệp khán giả, nội dung hoặc dữ liệu từ kênh khác ở pha trước rồi đẩy tiếp sang pha sau. Một kênh yếu kéo cả chuỗi yếu theo.",
    phases: data.phases, channels: data.channels, linkTypes: data.linkTypes, blockKinds: data.blockKinds,
  });

  out.framework_phase = ({ phase }) => {
    const n = norm(phase);
    const p = data.phases.find((x) => norm(x.id) === n || norm(x.id) === "p" + n || norm(x.name) === n || norm(x.name).includes(n));
    if (!p) return { error: `Không tìm thấy pha "${phase}". Pha hợp lệ: ${data.phases.map((x) => x.id + " " + x.name).join("; ")}` };
    const blocks = byPhase(p.id);
    const grouped = {};
    for (const b of blocks) (grouped[b.channel] ||= []).push(slim(b));
    const ids = new Set(blocks.map((b) => b.id));
    return {
      credit: CREDIT, ...p,
      blocksByChannel: Object.entries(grouped).map(([channel, bl]) => ({ channel, blocks: bl })),
      outgoingLinks: data.links.filter((l) => ids.has(l.from)).map(linkView),
      incomingFromOtherPhases: data.links.filter((l) => ids.has(l.to) && !ids.has(l.from)).length,
    };
  };

  out.framework_channel = ({ channel }) => {
    const chs = channelsFor(channel);
    if (!chs.length) return { error: `Không tìm thấy kênh "${channel}". Gọi framework_overview để xem tên hợp lệ.` };
    const names = new Set(chs.map((c) => c.name));
    const blocks = data.blocks.filter((b) => names.has(b.channel));
    const ids = new Set(blocks.map((b) => b.id));
    const phases = data.phases.map((p) => ({ phase: `${p.id} ${p.name}`, blocks: blocks.filter((b) => b.phase === p.id).map(slim) }));
    return {
      credit: CREDIT, channels: chs, blocksByPhase: phases,
      linksOut: data.links.filter((l) => ids.has(l.from) && !ids.has(l.to)).map(linkView),
      linksIn: data.links.filter((l) => ids.has(l.to) && !ids.has(l.from)).map(linkView),
      linksInside: data.links.filter((l) => ids.has(l.from) && ids.has(l.to)).map(linkView),
    };
  };

  out.framework_block = ({ block }) => {
    const b = findBlock(block);
    if (!b) return { error: `Không tìm thấy khối "${block}". Dùng framework_search để tìm.` };
    return {
      credit: CREDIT, ...slim(b),
      inputs: data.links.filter((l) => l.to === b.id).map((l) => ({ from: ref(l.from), type: l.type, label: l.label, why: l.why, no: l.no })),
      outputs: data.links.filter((l) => l.from === b.id).map((l) => ({ to: ref(l.to), type: l.type, label: l.label, why: l.why, no: l.no })),
    };
  };

  out.framework_notes = ({ topic } = {}) => {
    const n = norm(topic || "");
    const list = n ? data.notes.filter((x) => norm(x.title).includes(n) || x.items.some((i) => norm(i).includes(n))) : data.notes;
    return { credit: CREDIT, notes: list, version: data.version };
  };

  out.framework_search = ({ query, limit = 12 }) => {
    const toks = norm(query).split(" ").filter(Boolean);
    if (!toks.length) return { error: "Thiếu từ khóa." };
    const score = (text) => toks.reduce((s, t) => s + (norm(text).includes(t) ? 1 : 0), 0);
    const res = [];
    for (const b of data.blocks) { const s = score(`${b.id} ${b.name} ${b.channel} ${b.tactic}`); if (s) res.push({ s, kind: "khối", item: slim(b) }); }
    for (const l of data.links) { const s = score(`${l.label} ${l.why} ${l.type}`); if (s) res.push({ s, kind: "liên kết", item: linkView(l) }); }
    for (const c of data.channels) { const s = score(`${c.name} ${c.platform} ${c.covers}`); if (s) res.push({ s: s + 1, kind: "kênh", item: c }); }
    for (const nt of data.notes) for (const it of nt.items) { const s = score(it); if (s) res.push({ s, kind: "ghi chú", item: { title: nt.title, text: it } }); }
    res.sort((a, b) => b.s - a.s);
    const lim = Math.min(Math.max(+limit || 12, 1), 30);
    return { credit: CREDIT, query, total: res.length, results: res.slice(0, lim).map(({ kind, item }) => ({ kind, ...item })) };
  };

  out.framework_path = ({ from, to, maxSteps = 4 }) => {
    const A = resolveSet(from), B = resolveSet(to);
    if (!A) return { error: `Không hiểu điểm đi "${from}".` };
    if (!B) return { error: `Không hiểu điểm đến "${to}".` };
    const max = Math.min(Math.max(+maxSteps || 4, 1), 6);
    const phaseNo = (id) => Number(blockById.get(id).phase.slice(1));
    const targets = new Set(B.ids);
    // BFS nhiều nguồn. Lượt 1: chỉ đi xuôi hành trình (không quay về pha trước). Lượt 2: cho phép mọi liên kết.
    const search = (forwardOnly) => {
      const adj = new Map();
      for (const l of data.links) {
        if (forwardOnly && phaseNo(l.to) < phaseNo(l.from)) continue;
        (adj.get(l.from) || adj.set(l.from, []).get(l.from)).push(l);
      }
      const res = [];
      let frontier = A.ids.map((id) => ({ id, path: [] }));
      const best = new Map(A.ids.map((id) => [id, 0]));
      for (let depth = 1; depth <= max && !res.length; depth++) {
        const next = [];
        for (const { id, path } of frontier) {
          for (const l of adj.get(id) || []) {
            if (path.some((p) => p.from === l.to) || l.to === path[0]?.from) continue;
            const np = [...path, l];
            if (targets.has(l.to) && !A.ids.includes(l.to)) res.push(np);
            else if (!best.has(l.to) || best.get(l.to) >= depth) { best.set(l.to, depth); next.push({ id: l.to, path: np }); }
          }
        }
        frontier = next;
      }
      return res;
    };
    let found = search(true);
    let forwardOnly = true;
    if (!found.length) { found = search(false); forwardOnly = false; }
    // đường bắt đầu từ pha sớm hơn xếp trước (gần với "kéo khách từ đầu phễu")
    found.sort((a, b) => a.length - b.length || phaseNo(a[0].from) - phaseNo(b[0].from));
    if (!found.length) return { credit: CREDIT, from: A.label, to: B.label, paths: [], note: `Không có đường trong ${max} bước. Thử tăng maxSteps hoặc đổi điểm đến.` };
    return {
      credit: CREDIT, from: A.label, to: B.label,
      ...(forwardOnly ? {} : { note: "Không có đường đi xuôi; kết quả gồm cả liên kết quay về pha trước." }),
      paths: found.slice(0, 8).map((p) => ({ steps: p.length, chain: p.map(linkView) })),
      total: found.length,
    };
  };

  out.framework_plan = ({ channels }) => {
    const sets = [], unknown = [];
    for (const c of channels || []) { const chs = channelsFor(c); chs.length ? sets.push(...chs) : unknown.push(c); }
    const chosen = [...new Map(sets.map((c) => [c.name, c])).values()];
    if (!chosen.length) return { error: "Không nhận ra kênh nào.", unknown };
    const names = new Set(chosen.map((c) => c.name));
    const blocks = data.blocks.filter((b) => names.has(b.channel));
    const ids = new Set(blocks.map((b) => b.id));
    const byP = data.phases.map((p) => ({ phase: `${p.id} ${p.name}`, blocks: blocks.filter((b) => b.phase === p.id).map(slim) }));
    const gaps = byP.filter((x) => !x.blocks.length).map((x) => x.phase);
    const inner = data.links.filter((l) => ids.has(l.from) && ids.has(l.to) && blockById.get(l.from).channel !== blockById.get(l.to).channel).map(linkView);
    const score = new Map();
    for (const l of data.links) {
      const a = blockById.get(l.from), b = blockById.get(l.to);
      if (names.has(a.channel) && !names.has(b.channel)) score.set(b.channel, (score.get(b.channel) || 0) + 1);
      if (names.has(b.channel) && !names.has(a.channel)) score.set(a.channel, (score.get(a.channel) || 0) + 1);
    }
    const suggestions = [...score.entries()].sort((a, b) => b[1] - a[1]).map(([name, links]) => ({ channel: name, linksToYourSet: links })).slice(0, 6);
    const reminders = [];
    if (!names.has("Dữ liệu, đo lường")) reminders.push("Chưa chọn 'Dữ liệu, đo lường': thiếu tracking có đồng ý (P0_TRACK) và đo phần tăng thêm (P5_MEASURE) thì không đối soát được đơn giữa các kênh.");
    return { credit: CREDIT, chosen: chosen.map((c) => c.name), unknown, blocksByPhase: byP, emptyPhases: gaps, linksBetweenYourChannels: inner, suggestedChannelsToAdd: suggestions, reminders };
  };

  return out;
}

// ---------- định nghĩa tool (mô tả bằng tiếng Việt) ----------
const str = (description) => ({ type: "string", description });
export const TOOLS = [
  { name: "framework_overview", description: "Tổng quan framework: 6 pha hành trình khách, 19 kênh, 6 loại liên kết, nhãn loại khối. Gọi ĐẦU TIÊN để biết tên pha, tên kênh hợp lệ.", inputSchema: { type: "object", properties: {}, additionalProperties: false } },
  { name: "framework_phase", description: "Chi tiết MỘT pha (P0 Nền tảng, P1 Nhận biết, P2 Tìm hiểu, P3 So sánh, P4 Mua, P5 Sau mua): các khối việc theo kênh và các liên kết pha này đẩy đi.", inputSchema: { type: "object", properties: { phase: { type: ["string", "integer"], description: "0-5, 'P0'..'P5' hoặc tên pha, ví dụ 'so sánh'." } }, required: ["phase"], additionalProperties: false } },
  { name: "framework_channel", description: "Chi tiết MỘT kênh hoặc cả MỘT nền tảng (ví dụ 'Zalo', 'Meta', 'Offline', 'Google', 'Tìm kiếm và AI'): khối việc ở từng pha và mọi liên kết vào/ra kênh đó.", inputSchema: { type: "object", properties: { channel: str("Mã kênh, tên kênh hoặc tên nền tảng.") }, required: ["channel"], additionalProperties: false } },
  { name: "framework_block", description: "Chi tiết MỘT khối việc: chiến thuật, nhận gì từ khối nào (đầu vào), đẩy gì sang khối nào (đầu ra) và VÌ SAO nối.", inputSchema: { type: "object", properties: { block: str("Id khối hoặc tên khối, ví dụ 'P2_FBMSG' hoặc 'Meta CPAS'.") }, required: ["block"], additionalProperties: false } },
  { name: "framework_path", description: "Tìm các chuỗi liên kết NGẮN NHẤT dẫn từ một khối (hoặc một kênh) tới một khối (hoặc kênh) khác - trả lời câu 'làm sao đưa khách từ TikTok tới đơn trên website'.", inputSchema: { type: "object", properties: { from: str("Id khối, tên khối hoặc tên kênh xuất phát."), to: str("Id khối, tên khối hoặc tên kênh đích."), maxSteps: { type: "integer", minimum: 1, maximum: 6, description: "Số bước tối đa, mặc định 4." } }, required: ["from", "to"], additionalProperties: false } },
  { name: "framework_plan", description: "Lập khung cho MỘT BỘ KÊNH người dùng đang chạy (ví dụ ['TikTok','Zalo','Website, email']): khối việc theo pha, liên kết giữa các kênh đã chọn, pha còn trống, và kênh nên thêm. Luôn nhắc Dữ liệu, đo lường nếu chưa chọn.", inputSchema: { type: "object", properties: { channels: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 20, description: "Tên kênh hoặc tên nền tảng." } }, required: ["channels"], additionalProperties: false } },
  { name: "framework_search", description: "Tìm khối, kênh, liên kết, ghi chú theo từ khóa (không cần dấu), ví dụ 'retarget', 'livestream', 'CAPI', 'KOC affiliate'.", inputSchema: { type: "object", properties: { query: { type: "string" }, limit: { type: "integer", minimum: 1, maximum: 30, description: "Mặc định 12." } }, required: ["query"], additionalProperties: false } },
  { name: "framework_notes", description: "Ghi chú xuyên kênh (SEO/AEO/GEO, quảng cáo trả phí, kênh sở hữu và đẩy chéo, offline, đo xuyên kênh, pháp lý quảng cáo 2026). `topic` tùy chọn để lọc, ví dụ 'pháp lý', 'đo lường'.", inputSchema: { type: "object", properties: { topic: { type: "string" } }, additionalProperties: false } },
];

// ---------- JSON-RPC ----------
export function createHandler(data) {
  const api = makeApi(data);
  const text = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 1) }], ...(obj && obj.error ? { isError: true } : {}) });

  // trả về phản hồi JSON-RPC, hoặc null nếu là notification
  return function handle(msg) {
    if (Array.isArray(msg)) { const r = msg.map(handle).filter(Boolean); return r.length ? r : null; }
    const { id, method, params } = msg || {};
    const ok = (result) => ({ jsonrpc: "2.0", id, result });
    const err = (code, message) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });
    if (id === undefined) return null; // notification (vd. notifications/initialized)
    switch (method) {
      case "initialize":
        return ok({ protocolVersion: params?.protocolVersion || "2025-03-26", capabilities: { tools: { listChanged: false } }, serverInfo: SERVER_INFO, instructions: INSTRUCTIONS });
      case "ping": return ok({});
      case "tools/list": return ok({ tools: TOOLS });
      case "tools/call": {
        const fn = api[params?.name];
        if (!fn) return err(-32602, `Không có công cụ "${params?.name}"`);
        try { return ok(text(fn(params.arguments || {}))); }
        catch (e) { return ok({ content: [{ type: "text", text: "Lỗi: " + e.message }], isError: true }); }
      }
      case "resources/list": return ok({ resources: [] });
      case "prompts/list": return ok({ prompts: [] });
      default: return err(-32601, `Không hỗ trợ method "${method}"`);
    }
  };
}
