# 💄 Cosmetic Shop Website

Website bán mỹ phẩm trực tuyến được xây dựng nhằm phục vụ bài tập lớn môn **Thiết Kế Web**.

Dự án mô phỏng một website thương mại điện tử chuyên kinh doanh mỹ phẩm với giao diện hiện đại, thân thiện với người dùng và tích hợp các chức năng mua sắm cơ bản được xử lý hoàn toàn ở phía Frontend.

---

# 📌 Giới Thiệu Đề Tài

**Cosmetic Shop** là website bán mỹ phẩm trực tuyến được phát triển bằng các công nghệ Web Frontend hiện đại, giúp người dùng dễ dàng tìm kiếm, lựa chọn và quản lý các sản phẩm mỹ phẩm.

Dự án được xây dựng nhằm mục đích:

- Thực hành thiết kế giao diện web hiện đại.
- Áp dụng kỹ thuật Responsive Design.
- Thao tác với DOM bằng JavaScript.
- Xử lý dữ liệu phía Frontend.
- Thực hành làm việc nhóm thông qua GitHub.

---

# ✨ Chức Năng Chính

## 👤 Người Dùng

- Xem danh sách sản phẩm.
- Tìm kiếm sản phẩm.
- Xem thông tin chi tiết sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Quản lý giỏ hàng.
- Đặt hàng.
- Xem lịch sử đơn hàng.
- Đăng nhập và đăng ký tài khoản.
- Trải nghiệm giao diện Responsive trên nhiều thiết bị.
- Tương tác với các hiệu ứng và animation hiện đại.

---

## 🛠️ Quản Trị Viên

- Thêm sản phẩm mới.
- Chỉnh sửa thông tin sản phẩm.
- Xóa sản phẩm.
- Quản lý danh sách sản phẩm.

---

# 🖥️ Các Trang Trong Website

| Trang          | Mô tả              |
| -------------- | ------------------ |
| Home           | Trang chủ          |
| Products       | Danh sách sản phẩm |
| Product Detail | Chi tiết sản phẩm  |
| Cart           | Giỏ hàng           |
| Orders         | Lịch sử đơn hàng   |
| Login          | Đăng nhập          |
| Register       | Đăng ký            |
| About          | Giới thiệu         |
| Contact        | Liên hệ            |
| Admin          | Quản lý sản phẩm   |

---

# 🏗️ Kiến Trúc Hệ Thống

Website được xây dựng theo mô hình xử lý phía Client:

```text
Giao diện người dùng
(HTML + CSS + Bootstrap)
            ↓
     JavaScript Logic
            ↓
        LocalStorage
            ↓
 Dữ liệu sản phẩm, tài khoản,
 giỏ hàng và đơn hàng
```

Toàn bộ dữ liệu được lưu trữ bằng LocalStorage của trình duyệt, giúp mô phỏng hoạt động của một website thương mại điện tử mà không cần sử dụng Backend hoặc Cơ sở dữ liệu.

---

# 🧰 Công Nghệ Sử Dụng

| Công nghệ    | Vai trò                           |
| ------------ | --------------------------------- |
| HTML5        | Xây dựng cấu trúc website         |
| CSS3         | Thiết kế giao diện                |
| Bootstrap 4  | Responsive Layout                 |
| JavaScript   | Xử lý logic hệ thống              |
| jQuery       | Thao tác DOM                      |
| Font Awesome | Hiển thị biểu tượng               |
| LocalStorage | Lưu trữ dữ liệu phía Client       |
| GitHub       | Quản lý mã nguồn và làm việc nhóm |

---

# 📂 Cấu Trúc Thư Mục

```text
project-folder/

├── index.html
├── products.html
├── cart.html
├── orders.html
├── about.html
├── contact.html
├── login.html
├── register.html

├── admin/
│   └── admin.html

├── css/
│   └── style.css

├── js/
│   ├── main.js
│   ├── products.js
│   ├── cart.js
│   ├── orders.js
│   └── admin.js

├── images/
│   ├── banner/
│   ├── products/
│   └── icons/

└── README.md
```

---

# 🎨 Thiết Kế Giao Diện

Website được thiết kế theo phong cách:

- Hiện đại.
- Tối giản.
- Mềm mại.
- Thân thiện với người dùng.
- Phù hợp với lĩnh vực mỹ phẩm và làm đẹp.

### Tone màu chủ đạo

- Hồng.
- Trắng.
- Đen.
- Xám nhạt.

---

# 📱 Responsive Design

Website hỗ trợ hiển thị trên nhiều thiết bị khác nhau:

- Desktop.
- Tablet.
- Mobile.

Giao diện được xây dựng bằng Bootstrap Grid System kết hợp với CSS tùy chỉnh nhằm đảm bảo trải nghiệm người dùng nhất quán trên mọi kích thước màn hình.

---

# 💾 Quản Lý Dữ Liệu

Website sử dụng LocalStorage để lưu trữ dữ liệu cục bộ trên trình duyệt.

Các dữ liệu được quản lý bao gồm:

| Dữ liệu     | Chức năng                |
| ----------- | ------------------------ |
| users       | Tài khoản người dùng     |
| currentUser | Phiên đăng nhập hiện tại |
| products    | Danh sách sản phẩm       |
| cart        | Giỏ hàng                 |
| orders      | Lịch sử đơn hàng         |

---

# 🚀 Hướng Phát Triển Trong Tương Lai

- Kết nối Backend bằng Node.js hoặc ASP.NET.
- Tích hợp cơ sở dữ liệu MySQL hoặc SQL Server.
- Hỗ trợ thanh toán trực tuyến.
- Bổ sung Wishlist (Danh sách yêu thích).
- Xây dựng bộ lọc sản phẩm nâng cao.
- Thêm chức năng đánh giá sản phẩm.
- Quản lý đơn hàng hoàn chỉnh.
- Tích hợp Dark Mode.
- Phát triển ứng dụng Mobile.

---

# 👨‍💻 Quy Trình Làm Việc Nhóm

Dự án sử dụng GitHub để quản lý mã nguồn và phối hợp làm việc nhóm.

### Các lệnh Git cơ bản

```bash
git pull
git add .
git commit -m "update feature"
git push
```

---

# 🌐 Website Tham Khảo

Các website được tham khảo về giao diện và trải nghiệm người dùng:

- Sephora
- Ulta Beauty
- Fenty Beauty
- Rare Beauty
- Laneige
- Innisfree
- The Body Shop
- MAC Cosmetics
- Shopee

---

# 📖 Kết Luận

Dự án Cosmetic Shop giúp nhóm vận dụng và củng cố kiến thức về:

- Thiết kế giao diện Web.
- Responsive Design.
- JavaScript và thao tác DOM.
- Quản lý dữ liệu bằng LocalStorage.
- Thiết kế UI/UX.
- Làm việc nhóm và quản lý mã nguồn với GitHub.

Website mô phỏng tương đối đầy đủ quy trình hoạt động của một hệ thống bán hàng trực tuyến cơ bản, đồng thời tạo nền tảng để phát triển thành một hệ thống thương mại điện tử hoàn chỉnh trong tương lai.
