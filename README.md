# Framework Marketing Đa Kênh — IDMA Dev

Bộ khung marketing đa kênh cho thị trường Việt Nam, dùng được như một **MCP server**: cài một lần, rồi hỏi AI bằng tiếng Việt.

Framework nối **6 pha hành trình khách** với **19 kênh** (KOL/KOC, offline, TikTok, Meta, Zalo, Google, SEO/AEO/GEO, website, sàn TMĐT, dữ liệu). Mỗi khối việc có chiến thuật, mỗi liên kết giữa hai khối có giải thích **vì sao nối**.

> Ý tưởng cốt lõi: mỗi kênh không chạy riêng lẻ. Nó nhận tệp khán giả, nội dung hoặc dữ liệu từ kênh khác ở pha trước rồi đẩy tiếp sang pha sau. Một kênh yếu kéo cả chuỗi yếu theo.

- Phiên bản dữ liệu: **30/09/2026**
- Quy mô: 6 pha · 19 kênh · 69 khối việc · 219 liên kết

## Bắt đầu trong 1 phút

**Đã có link MCP?** Vào Claude → Settings → Connectors → Add custom connector → dán link `https://.../mcp`.

**Chưa có link? Dùng thẳng từ GitHub, không cần Cloudflare.** Cài Node.js, rồi:

- Claude Code:
  ```
  claude mcp add idma-framework -- npx -y github:iDMA-dev/Framework-Marketing-Multi-Channel
  ```
- Claude Desktop: thêm vào `claude_desktop_config.json`:
  ```json
  { "mcpServers": { "idma-framework": { "command": "npx", "args": ["-y", "github:iDMA-dev/Framework-Marketing-Multi-Channel"] } } }
  ```

Chi tiết: [Cách B trong hướng dẫn](docs/HUONG-DAN-SU-DUNG.md). Muốn có link `https://.../mcp` công khai: xem [Triển khai link MCP](docs/TRIEN-KHAI-LINK-MCP.md) (Render, Cloudflare hoặc máy chủ riêng).

Sau đó hỏi thử: *"Tôi đang chạy TikTok, Zalo OA và Shopee. Còn thiếu pha nào, nên thêm kênh nào?"*

## Tài liệu
| File | Nội dung |
|---|---|
| [docs/HUONG-DAN-SU-DUNG.md](docs/HUONG-DAN-SU-DUNG.md) | Cài và dùng từng bước, câu hỏi mẫu, xử lý lỗi |
| [docs/TRIEN-KHAI-LINK-MCP.md](docs/TRIEN-KHAI-LINK-MCP.md) | Tạo link `/mcp` riêng (Cloudflare hoặc máy chủ) |
| [docs/TINH-NANG.md](docs/TINH-NANG.md) | Danh sách tính năng |
| [framework/](framework/) | Toàn bộ nội dung framework dạng markdown, đọc trực tiếp được |

## Cấu trúc kho
```
├── framework/        # Nội dung: tổng quan + 6 pha (P0 → P5)
├── src/
│   ├── core.js       # Lõi MCP: 8 công cụ
│   ├── stdio.js      # Chạy trên máy (Claude Desktop / Claude Code)
│   ├── http.js       # Chạy dạng link trên máy chủ Node
│   ├── worker.js     # Chạy dạng link trên Cloudflare Workers
│   └── data.json     # Dữ liệu (sinh tự động từ framework/)
├── scripts/
│   ├── build-data.mjs  # framework/*.md → src/data.json
│   └── test.mjs        # Kiểm tra server
├── docs/
└── wrangler.toml     # Cấu hình Cloudflare
```

## Lưu ý
- Quy định pháp lý (Luật Quảng cáo, Luật 91/2025, Luật TMĐT 2025...) và chính sách nền tảng thay đổi thường xuyên. Hãy kiểm tra lại văn bản hiện hành trước khi triển khai.
- Các số liệu tương quan (ví dụ Ahrefs) chỉ mang tính tham khảo, không phải cam kết kết quả.

*Framework Marketing Đa Kênh by IDMA Dev*
