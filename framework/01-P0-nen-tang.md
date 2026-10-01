# P0 — Nền tảng
Câu khách hỏi: Mọi nơi khách hỏi đều nhận cùng một câu trả lời chuẩn?
Tạo ra cho pha sau: Bộ claim đã duyệt · Website, feed sản phẩm chuẩn · Tracking chung có đồng ý
Nhịp mùa sale: Xong trước đợt sale 2-3 tuần, vì CPAS, Merchant Center cần thời gian duyệt
Framework Marketing Đa Kênh by IDMA Dev

## Khối việc
| ID | Khối | Kênh | Loại | Chiến thuật |
|---|---|---|---|---|
| P0_CLAIM | Claim + hợp đồng KOC | KOL, KOC, PR | Owned | Claim khớp hồ sơ công bố sản phẩm; KOC dùng thật, gắn nhãn quảng cáo, cấp quyền dùng video |
| P0_OFFPLAN | Kế hoạch điểm đặt offline | Quảng cáo ngoài trời | Data | Chọn điểm OOH, tòa nhà, sự kiện theo vùng có khách (dùng chung cho sự kiện, Frame); mỗi điểm một QR + UTM hoặc mã giảm giá riêng; chia vùng thử, vùng đối chứng trước khi chạy |
| P0_WEB | Website: sản phẩm + FAQ | Website, email | Owned | FAQ thành phần, cách dùng, đổi trả; mở cho bot tìm kiếm, bot AI, bot duyệt quảng cáo |
| P0_SHOP | Gian hàng Mall 3 sàn | Sàn TMĐT | Owned | Shopee Mall, LazMall, TikTok Shop; mở Affiliate gửi mẫu; nộp hồ sơ CPAS |
| P0_TRACK | Tracking có đồng ý | Dữ liệu, đo lường | Data | Banner đồng ý; Pixel + CAPI Meta, TikTok, OpenAI; Google tag + Consent Mode; chung event_id |
| P0_FEED | Dữ liệu sản phẩm gốc | Dữ liệu, đo lường | Data | Một bảng gốc xuất cho Merchant Center, OpenAI Product Feed, mẫu từng sàn |

## Liên kết đi ra từ P0 (số thứ tự theo framework gốc)
Định dạng: `#. TỪ → ĐẾN · loại · nhãn — vì sao nối`

1. P0_CLAIM → P1_KOL · Nội dung dùng lại · Brief, mẫu, nhãn quảng cáo — KOL, KOC nhận hồ sơ công bố, bộ claim và mẫu để dùng thật; công khai là quảng cáo (Luật 75/2025, Điều 15a).
2. P0_CLAIM → P1_SEO · Nội dung dùng lại · Claim đã duyệt cho bài viết — Bài blog, bài giải thích dùng đúng claim trong hồ sơ công bố; không nói quá công dụng.
3. P0_CLAIM → P2_GSEARCH · Nội dung dùng lại · Claim cho quảng cáo tìm kiếm — Tiêu đề, mô tả Responsive Search Ads lấy từ claim đã duyệt; tránh claim điều trị vì chính sách y tế của Google Ads.
4. P0_CLAIM → P2_OAI · Nội dung dùng lại · Claim ngắn cho chat card — Chat card chỉ 3-50 ký tự tiêu đề, 100 ký tự mô tả; OpenAI cấm claim điều trị, cả trên landing.
5. P0_CLAIM → P3_KOC · Nội dung dùng lại · Brief đi kèm mẫu affiliate — KOC Kế hoạch mở làm nội dung số lượng lớn nên rủi ro nói quá công dụng cao nhất.
6. P0_WEB → P2_ZALO · Nội dung dùng lại · FAQ làm kịch bản OA — Cùng bộ FAQ làm tin trả lời tự động, menu OA; câu khó chuyển người tư vấn.
7. P0_WEB → P2_ZCN · Nội dung dùng lại · Kịch bản tư vấn 1-1 — Cùng bộ FAQ, claim đã duyệt làm mẫu câu trả lời cho nhân viên tư vấn qua Zalo cá nhân.
8. P0_WEB → P2_SEO · Nội dung dùng lại · Trang chuẩn kỹ thuật để index — Trang sản phẩm, danh mục có tốc độ tốt, dữ liệu có cấu trúc, sitemap; nền cho SEO trên Google, Bing, Cốc Cốc.
9. P0_WEB → P2_AEO · Nội dung dùng lại · FAQ viết theo câu hỏi — Mỗi câu hỏi một H2, câu trả lời ngắn ngay đầu để có cơ hội được chọn làm đoạn trích, People Also Ask.
10. P0_WEB → P2_GEO · Nội dung dùng lại · FAQ mở cho bot AI — Trang được index, không bị robots, WAF chặn OAI-SearchBot, Bingbot mới có cơ hội được trích dẫn.
11. P0_WEB → P2_OAI · Nội dung dùng lại · Cùng trang làm landing — OAI-AdsBot duyệt landing; nội dung landing là một tín hiệu để chọn khi nào hiện quảng cáo.
12. P0_SHOP → P3_KOC · Nội dung dùng lại · Affiliate gửi mẫu cho KOC — Kế hoạch mở trên TikTok Shop cho gửi mẫu, để nhiều KOC đúng tệp khách dùng thật trước khi quay.
13. P0_SHOP → P4_CPAS · Dữ liệu, insight · Sàn duyệt, chia sẻ catalog — Shopee, Lazada chia sẻ catalog segment sang Business Manager; Lazada cần ký TEA; cần thời gian duyệt.
14. P0_TRACK → P3_META · Tệp khán giả chuyển tiếp · Pixel + CAPI thành tệp website — Mọi traffic vào web (tìm kiếm, AI, quảng cáo) thành Website Custom Audience, lưu tới 180 ngày.
15. P0_TRACK → P3_GADS · Tệp khán giả chuyển tiếp · Google tag thành tệp remarketing — Google tag + Consent Mode ghi người vào web (có đồng ý) thành tệp cho Demand Gen, Display, RLSA.
16. P0_TRACK → P4_OAI · Dữ liệu, insight · event_id chung, lưu oppref — OpenAI CAPI không tự bắt oppref: server lưu và gửi order_created cùng event_id để khử trùng lặp.
17. P0_TRACK → P5_MEASURE · Dữ liệu, insight · Chuỗi đơn đã khử trùng lặp — Lift test và MMM cần chuỗi đơn thống nhất theo ngày, theo tỉnh.
18. P0_FEED → P3_AEO · Dữ liệu, insight · Merchant Center, markup Product — Google khuyến nghị Merchant Center feed; markup Product trên website phải khớp feed về giá, tồn kho.
19. P0_FEED → P3_OAI · Dữ liệu, insight · Nạp Product Feed OpenAI — Feed CSV qua hosted URL hoặc SFTP; kiểm tra Product Feed campaign đã mở cho tài khoản VN.
20. P0_FEED → P4_PMAX · Dữ liệu, insight · Feed cho Shopping, PMax — Cùng Merchant Center feed chạy Shopping ads, Performance Max; giá, tồn kho khớp website.
21. P0_WEB → P2_FBMSG · Nội dung dùng lại · FAQ làm kịch bản Messenger — Cùng bộ FAQ, claim đã duyệt làm tin trả lời nhanh trong Messenger và câu trả lời bình luận của Fanpage.
22. P0_TRACK → P3_TT · Tệp khán giả chuyển tiếp · TikTok Pixel thành tệp website — TikTok Pixel + Events API (có đồng ý) ghi người vào web từ mọi nguồn (tìm kiếm, AI, quảng cáo) thành tệp cho TikTok Ads thường.
23. P0_FEED → P0_SHOP · Dữ liệu, insight · Mẫu đăng sản phẩm từng sàn — Cùng bảng gốc xuất ra mẫu đăng Shopee, Lazada, TikTok Shop: tên, ảnh, thành phần, giá khớp website và feed quảng cáo.
24. P0_CLAIM → P0_OFFPLAN · Nội dung dùng lại · Claim đã duyệt cho bảng quảng cáo — Pano, băng rôn, frame dùng đúng claim trong hồ sơ công bố; nội dung bảng quảng cáo, băng rôn phải thông báo với cơ quan có thẩm quyền về quảng cáo cấp tỉnh (thường là Sở Văn hóa, Thể thao và Du lịch) 15 ngày trước khi treo (Luật Quảng cáo sửa đổi 2025). Đơn vị OOH thường lo thủ tục, kiểm tra với đơn vị.
25. P0_OFFPLAN → P1_BILLBOARD · Dữ liệu, insight · QR, UTM riêng từng điểm đặt — Mỗi pano, màn LED một mã QR trỏ link gắn UTM riêng (utm_content là mã điểm) hoặc một mã giảm giá riêng; lượt quét, lượt dùng mã cho biết điểm nào kéo được khách.
26. P0_OFFPLAN → P1_TRANSIT · Dữ liệu, insight · Chọn tuyến, vị trí theo hành trình khách — Chọn tuyến xe buýt, khu taxi, nhà ga, sân bay đi qua vùng có khách mục tiêu (dữ liệu đơn theo tỉnh, phường, địa giới sau sáp nhập 7/2025); mỗi tuyến, mỗi vị trí một QR hoặc mã riêng để so sánh.
27. P0_OFFPLAN → P1_FRAME · Dữ liệu, insight · Chọn tòa nhà theo vùng khách — Chọn tòa chung cư, văn phòng theo khu có khách mục tiêu; đơn vị Frame báo danh sách tòa, số màn, tần suất phát để đối chiếu với ngân sách trước khi ký.
28. P0_OFFPLAN → P1_EVENT · Dữ liệu, insight · Bộ QR, form đồng ý cho sự kiện — QR đăng ký, form nhận quà dùng chung một mẫu có ô đồng ý nhận tin và UTM riêng từng sự kiện; nhân viên quầy không phải ghi tay số điện thoại lên giấy.
29. P0_OFFPLAN → P5_MEASURE · Dữ liệu, insight · Vùng thử, vùng đối chứng cho OOH — OOH không có pixel: chọn trước vùng có quảng cáo và vùng tương đồng không có, rồi so doanh số, lượt tìm tên thương hiệu (GeoLift hoặc so sánh chênh lệch trước sau giữa vùng thử và vùng đối chứng). Lượt tìm tên thương hiệu theo tỉnh đo bằng Google Trends và báo cáo vị trí người dùng của chiến dịch Search thương hiệu; Search Console (bộ lọc Branded queries) chỉ cho xu hướng cả nước. 34 tỉnh là ít vùng cho GeoLift; OOH thường chỉ ở TP.HCM, Hà Nội nên chia vùng thử theo phường, cụm phường cần dữ liệu đơn đủ chi tiết.
