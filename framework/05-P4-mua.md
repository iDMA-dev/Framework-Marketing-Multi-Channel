# P4 — Mua
Câu khách hỏi: Mua ở đâu chính hãng? Không hợp thì đổi trả được không?
Tạo ra cho pha sau: Đơn gắn nguồn theo kênh · Tệp đã thanh toán · Sự kiện đã khử trùng lặp
Nhịp mùa sale: 10.10, 11.11, 12.12: CPAS, LIVE, PMax, chỉnh ROAS mục tiêu
Framework Marketing Đa Kênh by IDMA Dev

## Khối việc
| ID | Khối | Kênh | Loại | Chiến thuật |
|---|---|---|---|---|
| P4_FRAME | Frame ưu đãi theo tòa nhà | Frame tòa nhà | Paid | Ưu đãi riêng cư dân từng tòa (mã riêng), quét QR đặt qua Zalo Mini App hoặc website, giao tận căn hộ; hợp hàng tiêu dùng, dịch vụ quanh khu |
| P4_TTSHOP | TikTok Shop Ads | TikTok | Paid | Product GMV Max, LIVE GMV Max từ video affiliate; chỉ đưa khách vào gian hàng TikTok Shop, không dẫn ra website |
| P4_CPAS | Meta CPAS | Meta Ads | Paid | Advantage+ catalog ads trên catalog sàn, đích app Shopee, Lazada |
| P4_FBLIVE | Fanpage livestream | Facebook Fanpage | Owned | Livestream chốt đơn qua bình luận, inbox (nhập đơn kèm nguồn phiên live); ghim link website, Shopee; mã giảm giá riêng kênh Fanpage để đối soát |
| P4_ZMA | Zalo Mini App | Zalo | Owned | Mua ngay trong Zalo: giỏ hàng, thanh toán, theo dõi đơn; hợp nhất với luồng khách từ OA |
| P4_ZCHAT | Chốt đơn qua Zalo cá nhân | Zalo | Owned | Lên đơn COD ngay trong tin nhắn, hoặc gửi link website gắn UTM theo từng nhân viên |
| P4_PMAX | Performance Max, Shopping | Google Ads | Paid | Merchant Center feed; mục tiêu ROAS; audience signal từ tệp remarketing |
| P4_AEO | AEO: mua ở đâu, đổi trả | AEO | Organic | Trả lời sẵn "mua ở đâu chính hãng", phí ship, đổi trả; khớp thông tin trên sàn |
| P4_OAI | OpenAI Ads Conversions | OpenAI Ads | Paid | Chiến dịch mới mục tiêu Conversions, order_created; loại trừ người mua |
| P4_WEB | Website (trang mua) | Website, email | Owned | Đơn web, form nhận mẫu; đổi trả cạnh nút mua; nút sang sàn gắn UTM |
| P4_SHOPEE | Shopee Mall, LazMall | Sàn TMĐT | Owned | Trang sản phẩm trong gian hàng Mall: voucher shop, Flash Sale, mã giảm giá riêng từng KOC; chính sách trả hàng của sàn |
| P4_TTSTORE | Gian hàng TikTok Shop | Sàn TMĐT | Owned | Đơn từ video gắn giỏ, LIVE, TikTok Shop Ads và link từ Fanpage, Instagram, Zalo; Affiliate, chính sách đổi trả của sàn |

## Liên kết đi ra từ P4
159. P4_TTSHOP → P4_TTSTORE · Luồng khách · TikTok Shop Ads đưa khách vào gian hàng — GMV Max tự phân phối video, LIVE tới người có khả năng mua; khách bấm quảng cáo vào trang sản phẩm trong gian hàng, đơn ghi nhận trong TikTok Shop.
160. P4_TTSTORE → P5_TT · Tệp khán giả chuyển tiếp · Tệp Complete Payment — Đơn trong gian hàng TikTok Shop sinh tệp đã thanh toán (7-180 ngày) để loại trừ, làm Lookalike.
161. P4_TTSTORE → P5_REVIEW · Bằng chứng xã hội · Đánh giá, tỷ lệ hoàn trên Shop — Đánh giá là bằng chứng cho lứa video KOC sau; tỷ lệ hoàn ảnh hưởng việc giữ Affiliate.
162. P4_CPAS → P5_MEASURE · Dữ liệu, insight · Purchases with shared items — Pixel thuộc sàn, thương hiệu chỉ thấy số tổng hợp để đối soát với đơn thực.
163. P4_FBLIVE → P4_WEB · Luồng khách · Link website ghim trong live — Bình luận ghim trong livestream chứa link trang sản phẩm gắn UTM riêng của phiên live; khách đặt trên web khi muốn thanh toán online.
164. P4_FBLIVE → P4_SHOPEE · Luồng khách · Ghim link Shopee trong live — Ghim link gian hàng Shopee kèm mã giảm giá riêng của kênh Fanpage để đối soát đơn đến từ livestream.
165. P4_PMAX → P5_MEASURE · Dữ liệu, insight · Enhanced Conversions để đối soát — Enhanced Conversions + Consent Mode; tách brand, non-brand; so với đơn thực tế.
166. P4_AEO → P4_WEB · Luồng khách · Câu trả lời dẫn tới trang mua — Khách bấm từ đoạn trích, AI Overviews vào trang sản phẩm; theo dõi trong Search Console.
167. P4_OAI → P5_MEASURE · Dữ liệu, insight · Order Created để đối soát — Cửa sổ click 7/14/30 ngày, view 0 hoặc 1 ngày; đối chiếu mã giảm giá riêng của kênh ChatGPT.
168. P4_ZMA → P5_CRM · Dữ liệu, insight · Đơn Mini App về CRM — Mini App chỉ lấy số điện thoại khi khách cho phép; đơn đồng bộ về CRM để loại trừ quảng cáo, chăm sóc sau mua.
169. P4_ZMA → P5_ZNS · Dữ liệu, insight · Xác nhận, cập nhật đơn qua ZNS — Đơn trong Mini App gửi ZNS xác nhận, báo giao hàng theo mẫu đã duyệt.
170. P4_ZCHAT → P5_CRM · Dữ liệu, insight · Nhập đơn chat kèm nguồn — Đơn chốt qua tin nhắn nhập vào CRM, POS với nguồn "Zalo cá nhân" và tên nhân viên để đối soát.
171. P4_WEB → P4_ZCHAT · Luồng khách · Nút chat Zalo trên trang mua — Khách còn phân vân bấm nút chat Zalo trên trang sản phẩm để hỏi nhân viên; link gắn nguồn website để đối soát đơn chốt qua chat.
172. P4_WEB → P5_CRM · Dữ liệu, insight · Người mua có đồng ý marketing — Có đồng ý mới được tải danh sách lên Meta, TikTok, Google, Zalo, OpenAI (Luật 91/2025).
173. P4_WEB → P5_EMAIL · Dữ liệu, insight · Đơn web kèm đồng ý nhận tin — Khách chọn nhận email, SMS khi đặt hàng; lưu thời điểm và nội dung đồng ý.
174. P4_SHOPEE → P5_REVIEW · Bằng chứng xã hội · Đơn hoàn thành, thưởng Xu review — Shopee thưởng Xu cho đánh giá có ảnh, video trong thời hạn quy định (kiểm tra điều kiện trên app).
175. P4_CPAS → P4_SHOPEE · Luồng khách · CPAS dẫn vào trang sản phẩm trên sàn — Quảng cáo catalog mở thẳng trang sản phẩm trong app Shopee, Lazada; đơn ghi nhận trên sàn và báo về dưới dạng số tổng hợp.
176. P4_PMAX → P4_WEB · Luồng khách · Shopping, PMax dẫn vào trang sản phẩm — Quảng cáo mua sắm hiện ảnh, giá từ Merchant Center feed; khách bấm vào đúng trang sản phẩm trên website.
177. P4_OAI → P4_WEB · Luồng khách · Chiến dịch Conversions dẫn về trang mua — Khách bấm quảng cáo dưới câu trả lời ChatGPT vào landing; oppref được giữ để gửi order_created về OpenAI.
178. P4_WEB → P4_SHOPEE · Luồng khách · Nút mua trên Shopee, Lazada — Nút "Mua trên Shopee" trên trang sản phẩm gắn UTM ngoại sàn cho khách muốn dùng voucher, ví của sàn.
179. P4_WEB → P4_TTSTORE · Luồng khách · Nút mua trên TikTok Shop — Nút "Mua trên TikTok Shop" gắn link sản phẩm trong gian hàng cho khách quen thanh toán trong TikTok.
180. P4_FBLIVE → P5_CRM · Dữ liệu, insight · Đơn chốt từ live vào CRM — Đơn chốt qua bình luận, inbox trong phiên live nhập POS, CRM kèm nguồn phiên live; có đồng ý mới dùng cho quảng cáo.
181. P4_SHOPEE → P5_MEASURE · Dữ liệu, insight · Doanh số sàn cho MMM — Doanh số Shopee, Lazada theo ngày kèm UTM ngoại sàn, mã giảm giá từng kênh; thiếu doanh số sàn thì MMM chia ngân sách sai.
182. P4_TTSTORE → P5_MEASURE · Dữ liệu, insight · Doanh số TikTok Shop cho MMM — Doanh số gian hàng theo ngày, tách video, LIVE, affiliate, GMV Max để đối chiếu phần tăng thêm.
183. P4_FRAME → P4_ZMA · Luồng khách · Quét mã đặt qua Zalo Mini App — QR trên frame ưu đãi mở Zalo Mini App kèm mã riêng của tòa: cư dân đặt hàng, chọn giao tận căn hộ ngay trong Zalo.
184. P4_FRAME → P5_MEASURE · Dữ liệu, insight · Mã riêng từng tòa để đo — Lượt quét, lượt dùng mã riêng từng tòa so với tòa không chạy cho thấy phần tăng thêm của Frame; tòa hiệu quả được giữ ở đợt sau.
