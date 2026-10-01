# Hướng dẫn sử dụng (bản dễ hiểu)

Framework này giúp bạn trả lời các câu hỏi như:
- "Tôi đang chạy TikTok và Zalo, còn thiếu kênh nào?"
- "Làm sao đưa khách từ Instagram sang đơn trên Shopee?"
- "Chuẩn bị cho 11.11 thì việc nào làm trước?"

Cách dùng: **cài một lần**, sau đó hỏi AI (Claude…) bằng tiếng Việt như nói chuyện bình thường. AI sẽ tự tra framework để trả lời.

Có 3 cách dùng. Chọn **một** cách:

| Cách | Hợp với ai | Cần gì |
|---|---|---|
| **A. Dùng link MCP** | Muốn dán link giống bản gốc | Link `.../mcp` của IDMA Dev (xem mục A) |
| **B. Dùng thẳng từ GitHub** | Không có link, muốn dùng ngay, không qua Cloudflare | Cài Node.js (miễn phí), chép 1 đoạn cấu hình |
| **C. Không cài gì** | Chỉ cần đọc, hỏi thử | Chỉ cần gửi file cho AI |

---

## Cách A — Dùng link MCP

Link có dạng: `https://TEN-MIEN-CUA-BAN/mcp`

> Link chỉ có sau khi đã triển khai một lần. Chưa có link? Làm theo [TRIEN-KHAI-LINK-MCP.md](TRIEN-KHAI-LINK-MCP.md) (khoảng 5 phút), hoặc dùng cách B.

**Trên Claude (web hoặc ứng dụng máy tính):**
1. Mở **Settings** (Cài đặt) → **Connectors**.
2. Bấm **Add custom connector** (Thêm connector tùy chỉnh).
3. Đặt tên: `IDMA Framework Marketing`. Dán link `.../mcp` vào ô địa chỉ.
4. Bấm **Add**. Xong.

**Trên Claude Code:**
```
claude mcp add --transport http idma-framework https://TEN-MIEN-CUA-BAN/mcp
```

> Đừng mở link `/mcp` bằng trình duyệt. Bạn sẽ thấy thông báo "chỉ nhận POST". Đó là bình thường: link này dành cho ứng dụng AI, không phải trang web.

---

## Cách B — Dùng thẳng từ GitHub (không cần link, không cần Cloudflare)

Cách này chạy ngay từ kho GitHub này. **Không cần tải kho về, không cần tạo máy chủ.** Chỉ cần Node.js.

**Bước 1.** Cài Node.js phiên bản 18 trở lên: https://nodejs.org (chọn bản LTS).

**Bước 2.** Thêm vào Claude:

- **Claude Desktop:** mở file cấu hình
  - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

  Thêm đoạn sau (chép nguyên, không cần sửa gì):
  ```json
  {
    "mcpServers": {
      "idma-framework": {
        "command": "npx",
        "args": ["-y", "github:iDMA-dev/Framework-Marketing-Multi-Channel"]
      }
    }
  }
  ```
  Tắt hẳn rồi mở lại Claude Desktop. Lần đầu có thể chờ vài chục giây để tải về.

- **Claude Code:**
  ```
  claude mcp add idma-framework -- npx -y github:iDMA-dev/Framework-Marketing-Multi-Channel
  ```

> Muốn lấy nội dung mới nhất: tắt hẳn rồi mở lại ứng dụng. Nếu vẫn thấy bản cũ, chạy `npx clear-npx-cache` rồi mở lại.

> Kho GitHub phải để chế độ **Public** thì lệnh trên mới tải được mà không cần đăng nhập.

**Bước 3. Kiểm tra:** hỏi Claude "Cho tôi tổng quan Framework Marketing Đa Kênh". Nếu thấy 6 pha và 19 kênh là đã chạy.

---

## Cách C — Không cài gì

1. Mở thư mục `framework/` trong kho này.
2. Gửi các file `.md` cho AI (đính kèm file, hoặc dán nội dung).
3. Hỏi như bình thường, ví dụ: "Dựa vào các file này, tôi đang chạy TikTok và Zalo thì còn thiếu gì?"

Cách này đơn giản nhất nhưng AI phải đọc cả bộ file mỗi lần, nên chậm hơn và dễ sót hơn cách A, B.

---

## Hỏi gì? (câu mẫu)

Sau khi cài, bạn chỉ cần hỏi bình thường:

| Bạn muốn | Hỏi như vậy |
|---|---|
| Xem toàn cảnh | "Cho tôi tổng quan framework marketing đa kênh." |
| Kiểm tra bộ kênh đang chạy | "Tôi chạy TikTok, Zalo OA và Shopee. Còn thiếu pha nào, nên thêm kênh nào?" |
| Đưa khách tới điểm mua | "Làm sao đưa khách từ Instagram tới đơn trên Shopee?" |
| Xem một kênh | "Zalo làm được những việc gì ở từng pha?" |
| Hiểu một việc cụ thể | "Meta CPAS nhận gì từ đâu, đẩy gì đi đâu?" |
| Chuẩn bị mùa sale | "Chuẩn bị cho 11.11 thì làm gì trước, bao lâu?" |
| Kiểm tra pháp lý | "Quy định quảng cáo 2026 với KOC và livestream là gì?" |
| Tìm theo từ khóa | "Tìm các việc liên quan đến retarget." |

## Các công cụ AI sẽ tự dùng (bạn không cần gọi tên)

| Công cụ | Dùng để |
|---|---|
| `framework_overview` | Xem 6 pha, 19 kênh |
| `framework_phase` | Xem một pha |
| `framework_channel` | Xem một kênh hoặc cả nền tảng |
| `framework_block` | Xem một việc: nhận gì, đẩy gì, vì sao |
| `framework_path` | Tìm đường đưa khách từ kênh này tới kênh kia |
| `framework_plan` | Lập khung cho bộ kênh bạn đang chạy |
| `framework_search` | Tìm theo từ khóa |
| `framework_notes` | Ghi chú xuyên kênh và pháp lý |

## Gặp lỗi?

| Triệu chứng | Cách xử lý |
|---|---|
| Mở link `/mcp` trên trình duyệt thấy "chỉ nhận POST" | Bình thường. Dán link vào ứng dụng AI, đừng mở bằng trình duyệt. |
| Claude Desktop không thấy công cụ | Kiểm tra đường dẫn trong file cấu hình, rồi tắt hẳn và mở lại ứng dụng. |
| Báo `npx: command not found` hoặc `node: command not found` | Chưa cài Node.js. Cài ở https://nodejs.org rồi mở lại ứng dụng. |
| Báo lỗi đường dẫn trên Windows | Dùng dấu `/` hoặc viết đôi `\\`, ví dụ `C:/Users/ban/Framework-Marketing-Multi-Channel/src/stdio.js`. |
| Muốn kiểm tra server có chạy không | Vào thư mục kho, chạy `node scripts/test.mjs`. Thấy "TẤT CẢ ĐẠT" là ổn. |

## Cập nhật nội dung framework

Nội dung nằm ở `framework/*.md`. Sau khi sửa, chạy một lệnh để server nhận nội dung mới:
```
node scripts/build-data.mjs
node scripts/test.mjs
```

## Lưu ý

Quy định pháp lý và chính sách nền tảng thay đổi thường xuyên. Hãy kiểm tra lại văn bản hiện hành trước khi triển khai. Đây là tài liệu tham khảo, không thay thế tư vấn pháp lý.

*Framework Marketing Đa Kênh by IDMA Dev*
