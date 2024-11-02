# Yagu-sk

## Yeu cau tieu luan

**\
TIỂU LUẬN**

**Năm học: 2024-2025**

**DKP1201 (Nhóm 2)**

---------------------------------

Hình thức: cá nhân

Thời gian nộp: 02/11/2024

Yêu cầu nộp:

- File PDF:

- Trang bìa theo mẫu của Khoa: ghi thông tin của năm học (2024-2025), tên môn học ("SEMINAR CHUYÊN ĐỀ"), tiêu đề ("TIỂU LUẬN"), tên đề tài ("Xây dựng công cụ phân tích cú pháp"), lớp môn học (không phải lớp CVHT) ...;

- Danh sách nhóm (ghi chính xác và đầy đủ mã số sinh viên, họ tên) ...;

- Toàn bộ nội dung tiểu luận, tài liệu tham khảo, phụ lục (chương trình nguồn, thông tin về dữ liệu thử nghiệm...).

- Cuốn báo cáo giấy.

*** Hệ thống nộp bài (file PDF):

1. Hệ thống học trực tuyến (REDACTED): https://hoctructuyen.redacted.edu.vn/

2. Google Classroom: https://classroom.google.com/c/REDACTED?cjc=redacted

*** Nộp cuốn báo cáo giấy: sẽ thông báo khi có danh sách sinh viên của Phòng Đào tạo. Yêu cầu tất cả sinh viên phải có mặt để ký tên, nếu không sẽ bị hủy điểm.

---------------------------------

**ĐỀ BÀI:**

Xây dựng bộ phân tích cú pháp dựa trên văn phạm DCG (Definite Clause Grammar) để phân tích cú pháp các câu phái sinh đúng cú pháp và có nghĩa từ một tập ngữ liệu cho trước.

Cho tập ngữ liệu gồm các câu sau:

a. Nam thường đến thư viện.

b. Nam rất thích đọc sách ở thư viện.

c. Nhà của Nam ở gần trường.

d. Nam mới mua mấy cuốn sách mới.

e. Nam tặng Lan một cuốn sách rất hay.

Yêu cầu trình bày nội dung tiểu luận:

1. Lịch sử nghiên cứu phân tích cú pháp trong khoa học máy tính

2. Cách tiếp cận phân tích cú pháp dựa trên luật và lập trình logic

3. Xây dựng công cụ phân tích cú pháp dựa trên luật

1. Dữ liệu: tập dữ liệu gốc và các câu phái sinh

2. Văn phạm DCG (Definite Clause Grammar)

4. Thử nghiệm: trình bày hình vẽ cây cú pháp của mỗi câu thử nghiệm.

***** HƯỚNG DẪN *****

**CÂU PHÁI SINH**

Ví dụ 1: Nam đang đọc sách ở thư viện.

Các câu phái sinh từ câu trên có thể là:

- Nam đang ở thư viện.

- Nam ở thư viện.

- Nam đang đọc sách.

- Nam đọc sách.

...

Ví dụ 2: Nam thích đọc sách.

Các câu phái tính từ câu trên có thể là:

- Nam đọc sách.

- Nam thích sách.

...

Các câu phái sinh từ hai câu trong ví dụ 1 và ví dụ 2 có thể là:

- Nam thích đọc sách.

- Nam đang ở thư viện.

...

## Yeu cau qua trinh

BÀI TẬP QUÁ TRÌNH

MÔN: SEMINAR CHUYÊN ĐỀ

LỚP: DKP1201 (NHÓM 2)

NĂM HỌC: 2024-2025, HỌC KỲ 1

Đặt tên file (PDF): MSSV_Họ-Lót-Tên_Seminar_QT

Họ tên:

Mã số sinh viên:

|

BÀI 1:
======

Bài toán "Ba nhà truyền giáo và ba con quỉ ăn thịt người" yêu cầu đưa ba nhà truyền giáo và ba con quỉ ăn thịt người qua sông an toàn bằng một chiếc thuyền có tải trọng tối đa là 2 đối tượng. Điều kiện là tại bất kỳ thời điểm nào, số lượng con quỉ ăn thịt người không được nhiều hơn số lượng nhà truyền giáo ở bất kỳ bờ nào của sông, vì điều đó sẽ dẫn đến việc các nhà truyền giáo bị những con quỉ ăn thịt người (có số lượng đông hơn những nhà truyền giáo ở một bờ sông) tấn công và ăn thịt.

Hãy giải bài toán trên bằng lập trình logic.

 |

BÀI LÀM
=======

**(Sinh viên không được xóa đề bài và bắt đầu làm bài theo mẫu bên dưới)**

1\. Số lượng đối tượng tham gia vào trạng thái của bài toán:

- Số nhà truyền giáo: ____

- Số con quỉ ăn thịt người: ____

- Sức chứa của thuyền: ____

2\. Biểu diễn trạng thái của bài toán:

- Định nghĩa một trạng thái: _____

(Giải thích hình thức biểu diễn một trạng thái)

- Trạng thái ban đầu: _____

- Trạng thái đích: _____

3\. Các thao tác / hành động có thể tác động lên các trạng thái:

Liệt kê đầy đủ các thao tác có thể thực hiện để di chuyển qua sông, kèm theo hướng di chuyển:

1\. Di chuyển ____ từ ____ sang ____.

2\. Di chuyển ____ từ ____ sang ____.

3\. Di chuyển ____ từ ____ sang ____.

...

4\. Mô tả không gian trạng thái:

- Các ràng buộc là gì?

- Hình vẽ?

- Số lượng trạng thái trong không gian trạng thái là bao nhiêu?

5\. Áp dụng thuật toán DFS để tìm nghiệm:

            Khởi tạo:

                        OPEN: [<trạng thái ban đầu>]

CLOSED: []

● Bước 1:

            Trạng thái đang xét (lấy từ OPEN):

Trạng thái sinh ra (áp dụng các thao tác vào trạng thái đang xét):

            OPEN:

CLOSED:

...

6\. Chương trình Prolog:

|

BÀI 2:
======

Bài toán "Gia đình thuê thuyền qua sông" yêu cầu một gia đình gồm có hai người lớn và hai đứa trẻ phải thuê một chiếc thuyển nhỏ để tự chèo qua sông.

Các quy tắc bao gồm:

1. Thuyền có sức chứa tối đa là 1 người lớn hoặc 2 đứa trẻ mỗi lần đi.

2. Sau khi cả gia đình đã qua sông, thuyền phải được trả lại cho người chủ thuyền.

3. Người lớn, đứa trẻ, và người chủ thuyền đều có thể tự chèo thuyền.

Hãy giải bài toán trên bằng lập trình logic.

 |

BÀI LÀM
=======

**(Sinh viên không được xóa đề bài và làm bài theo mẫu tương tự như bài 1)**

Hướng dẫn: để giải bài toàn này, người chủ thuyền cũng phải qua sông cùng với gia đình.