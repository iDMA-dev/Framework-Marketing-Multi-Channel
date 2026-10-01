# Hướng dẫn sử dụng — Framework Marketing Đa Kênh (IDMA Dev)

## 1. Cách đọc framework

**Khối việc** là một việc cụ thể trên một kênh ở một pha, có mã dạng `P{pha}_{TÊN}`. Ví dụ `P2_ZALO` là "Zalo OA tư vấn" ở pha Tìm hiểu.

**Liên kết** nối hai khối theo dạng:

```
#. TỪ → ĐẾN · loại · nhãn — vì sao nối
```

Ví dụ: `94. P2_ZALO → P4_ZMA · Luồng khách · OA dẫn vào Mini App — Menu OA, tin tư vấn gắn link Mini App; khách mua ngay trong Zalo.`

Mỗi file pha (`framework/01` đến `06`) gồm: thông tin pha, bảng khối việc, danh sách liên kết **đi ra** từ pha đó. Liên kết về pha trước (vòng lặp) nằm ở file của pha phát ra nó, thường là P5.

## 2. Lập kế hoạch cho bộ kênh đang chạy
1. Liệt kê kênh bạn đang dùng (ví dụ: TikTok, Zalo, Website, Sàn TMĐT).
2. Với mỗi pha, tìm các khối thuộc kênh đó. Pha nào không có khối nào là **pha còn trống**.
3. Tìm liên kết giữa các kênh của bạn. Thiếu liên kết nghĩa là hai kênh đang chạy rời nhau.
4. Tìm khối của kênh chưa dùng mà nhận được nhiều liên kết từ kênh bạn đã có. Đó là kênh nên thêm tiếp theo.
5. Luôn kiểm tra khối **Tracking có đồng ý** (`P0_TRACK`) và **Đo phần tăng thêm** (`P5_MEASURE`). Thiếu hai khối này thì không đối soát được.

Mẹo tìm nhanh (Mac/Linux, trong thư mục kho):

```bash
grep -n "P2_ZALO" framework/*.md          # mọi liên kết có Zalo OA
grep -n "→ P4_WEB" framework/*.md         # mọi đường dẫn khách vào trang mua website
grep -n "Vòng lặp về pha trước" framework/*.md
```

## 3. Tìm đường đưa khách từ kênh này tới điểm mua
Ví dụ: từ TikTok tới đơn trên website.
1. Tìm khối đích: `P4_WEB`. Chạy `grep -n "→ P4_WEB" framework/*.md` để biết khối nào dẫn vào.
2. Chọn khối thuộc kênh xuất phát (ví dụ `P3_TT` → `P4_WEB`: "TikTok Ads thường dẫn về website").
3. Nếu chưa có đường trực tiếp, đi qua khối trung gian (ví dụ `P1_TTCH → P2_ZALO → P4_WEB`).
4. Đọc cột "vì sao nối" để biết điều kiện cần làm (gắn UTM riêng, mã giảm giá riêng, đồng ý dữ liệu...).

Lưu ý quan trọng: quảng cáo sàn (Shopee Ads, TikTok Shop Ads) chỉ dẫn khách trong sàn, không đưa ra website.

## 4. Lập kế hoạch mùa sale (10.10, 11.11, 12.12)
Dùng dòng "Nhịp mùa sale" ở đầu mỗi file pha:
- **Trước sale 2-3 tuần:** xong P0 (claim, website, feed, tracking, hồ sơ CPAS, Merchant Center) và bắt đầu gom tệp ở P1.
- **Giai đoạn nuôi tệp:** P2 trả lời câu hỏi thật; P3 KOC gắn mã riêng cho ngày sale.
- **Ngày sale:** P4 chạy CPAS, LIVE, PMax, chỉnh ROAS mục tiêu.
- **Sau sale:** P5 thu review, giữ điểm shop, đo phần tăng thêm để chia lại ngân sách.

## 5. Kiểm tra tuân thủ trước khi chạy
Đối chiếu mục "Pháp lý quảng cáo 2026" và "Offline" trong `framework/00-tong-quan-va-ghi-chu.md`:
- Claim khớp hồ sơ công bố sản phẩm, không nói quá công dụng.
- KOL/KOC dùng thật sản phẩm và gắn nhãn quảng cáo.
- Chỉ bắn pixel và tải danh sách khách khi đã có đồng ý.
- Quảng cáo ngoài trời: thông báo cơ quan có thẩm quyền trước khi treo; phát mẫu thử là khuyến mại.
- Không đổi quà lấy đánh giá tốt trên sàn.

Đây là tóm tắt tham khảo, không thay thế tư vấn pháp lý. Hãy xác nhận với văn bản hiện hành.

## 6. Dùng cùng trợ lý AI
Đưa các file trong `framework/` vào ngữ cảnh của trợ lý AI (đính kèm file hoặc dán nội dung), rồi dùng các câu lệnh mẫu:

- *"Tôi đang chạy TikTok, Zalo OA và Shopee. Dựa vào framework, pha nào còn trống và nên thêm kênh nào?"*
- *"Vẽ đường đưa khách từ Instagram tới đơn trên Shopee, kèm điều kiện gắn UTM và mã giảm giá."*
- *"Lập kế hoạch cho đợt 11.11 theo nhịp từng pha, chia mốc theo tuần."*
- *"Rà soát kế hoạch KOC của tôi theo mục pháp lý và brief KOC trong framework."*
- *"Liệt kê các liên kết loại 'Dữ liệu, insight' đi vào khối Website FAQ và đề xuất cách thu thập câu hỏi thật."*

## 7. Cập nhật framework
- Số phiên bản dữ liệu nằm ở đầu `framework/00-tong-quan-va-ghi-chu.md`.
- Khi cập nhật, sửa các file pha và ghi lại ngày vào dòng "Phiên bản dữ liệu".
- Kiểm tra lại số lượng (69 khối, 219 liên kết) bằng:

```bash
cat framework/0[1-6]*.md | grep -cE '^[0-9]+\. P'      # số liên kết
cat framework/0[1-6]*.md | grep -cE '^\| P[0-9]_'      # số khối
```

---
*Framework Marketing Đa Kênh by IDMA Dev*
