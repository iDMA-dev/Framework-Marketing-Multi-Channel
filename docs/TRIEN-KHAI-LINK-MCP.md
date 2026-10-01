# Triển khai link MCP của IDMA Dev

Mục tiêu: có một link dạng `https://.../mcp` để dán vào Claude (Connectors) giống bản gốc.

Có 2 cách. **Cách 1** (Cloudflare) miễn phí, không cần quản lý máy chủ, nên chọn trước.

---

## Cách 1 — Cloudflare Workers (khuyên dùng)

**Chuẩn bị:** tài khoản Cloudflare miễn phí (https://dash.cloudflare.com/sign-up) và Node.js 18+ (https://nodejs.org).

**Bước 1.** Tải kho về máy và vào thư mục:
```
git clone https://github.com/iDMA-dev/Framework-Marketing-Multi-Channel.git
cd Framework-Marketing-Multi-Channel
```

**Bước 2.** Đăng nhập Cloudflare (trình duyệt sẽ mở, bấm Allow):
```
npx wrangler login
```

**Bước 3.** Triển khai:
```
npx wrangler deploy
```
Cuối kết quả sẽ có địa chỉ dạng:
```
https://idma-framework-marketing.TEN-TAI-KHOAN.workers.dev
```

**Bước 4.** Link MCP của bạn là địa chỉ trên **thêm `/mcp`**:
```
https://idma-framework-marketing.TEN-TAI-KHOAN.workers.dev/mcp
```

**Bước 5. Kiểm tra:**
- Mở link `/mcp` bằng trình duyệt → phải thấy thông báo "Endpoint MCP chỉ nhận POST...". Thấy vậy là server đang chạy.
- Hoặc dán lệnh sau vào Terminal, sửa địa chỉ cho đúng:
  ```
  curl -s -X POST https://.../mcp -H "content-type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
  ```
  Thấy danh sách 8 công cụ `framework_*` là đạt.

**Bước 6.** Dán link vào Claude: Settings → Connectors → Add custom connector (xem [HUONG-DAN-SU-DUNG.md](HUONG-DAN-SU-DUNG.md)).

### Dùng tên miền riêng (tùy chọn)
Trong Cloudflare Dashboard: Workers & Pages → `idma-framework-marketing` → Settings → Domains & Routes → Add. Ví dụ `mcp.ten-mien-cua-ban.com`. Link MCP sẽ là `https://mcp.ten-mien-cua-ban.com/mcp`.

### Cập nhật nội dung sau này
```
node scripts/build-data.mjs
node scripts/test.mjs
npx wrangler deploy
```
Link không đổi.

---

## Cách 2 — Tự chạy trên máy chủ (VPS)

Cần một máy chủ có Node.js 18+ và địa chỉ HTTPS (Claude chỉ nhận connector qua HTTPS, nên cần Nginx/Caddy hoặc dịch vụ tương tự đặt phía trước).

```
git clone https://github.com/iDMA-dev/Framework-Marketing-Multi-Channel.git
cd Framework-Marketing-Multi-Channel
PORT=3000 node src/http.js
```

Server nghe tại `http://localhost:3000/mcp`. Đặt reverse proxy HTTPS trỏ vào cổng này, link MCP sẽ là `https://ten-mien-cua-ban.com/mcp`. Nên chạy bằng `pm2` hoặc `systemd` để tự khởi động lại.

---

## Lưu ý bảo mật
- Server này **chỉ đọc**, không có tài khoản, không lưu dữ liệu người dùng và không gọi dịch vụ ngoài.
- Link công khai nghĩa là ai có link đều dùng được. Nếu cần hạn chế, hãy thêm lớp xác thực ở phía trước (Cloudflare Access hoặc reverse proxy).

*Framework Marketing Đa Kênh by IDMA Dev*
