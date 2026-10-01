# Triển khai link MCP của IDMA Dev

Mục tiêu: có một link dạng `https://.../mcp` để dán vào Claude (Connectors) giống bản gốc.

> **Lưu ý:** GitHub chỉ lưu mã, không chạy được máy chủ, nên bản thân GitHub không tạo được link `/mcp`. Nếu bạn chỉ cần dùng cho mình, không cần link: dùng lệnh `npx -y github:iDMA-dev/Framework-Marketing-Multi-Channel` (xem Cách B trong [HUONG-DAN-SU-DUNG.md](HUONG-DAN-SU-DUNG.md)). Tài liệu này chỉ dành cho khi bạn muốn một link công khai.

Muốn link mà không dùng Cloudflare: **Cách 0** (Render, tự triển khai từ GitHub) hoặc **Cách 2** (máy chủ riêng).

---

## Cách 0 — Render, triển khai thẳng từ kho GitHub (không dùng Cloudflare)

> Chưa kiểm tra thực tế trên Render. Cấu hình dùng lệnh `node src/http.js` đã chạy tốt khi thử trên máy.

1. Đăng ký tài khoản https://render.com và liên kết với GitHub.
2. New → **Web Service** → chọn kho `iDMA-dev/Framework-Marketing-Multi-Channel`.
3. Điền: Runtime **Node**, Build Command để trống (hoặc `echo ok`), Start Command `node src/http.js`, gói **Free**. (Kho đã có sẵn file `render.yaml`, bạn cũng có thể chọn New → Blueprint.)
4. Bấm Deploy. Xong sẽ có địa chỉ `https://TEN-DICH-VU.onrender.com`. Link MCP là địa chỉ đó **thêm `/mcp`**.
5. Mỗi lần đẩy mã mới lên GitHub, Render tự cập nhật. Link không đổi.

Gói miễn phí của Render sẽ "ngủ" khi lâu không dùng, lần gọi đầu có thể chậm vài chục giây.

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
