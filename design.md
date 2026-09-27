# 🌿 HERBVIAN — DESIGN SYSTEM & STYLE GUIDE
> **Tài liệu quy chuẩn thiết kế giao diện (Single Source of Truth)**  
> Dành cho dự án website thương mại & câu chuyện thương hiệu xơ mướp tự nhiên Việt Nam: **Herbvian – Natural Care From Vietnam for a Healthier You**.  
> Toàn bộ quá trình code giao diện (HTML/CSS/JS/Components) **bắt buộc tuân thủ** các quy chuẩn trong tài liệu này để đảm bảo tính đồng nhất 100%.

---

## 1. TỔNG QUAN THƯƠNG HIỆU & ĐỊNH HƯỚNG NGHỆ THUẬT (ART DIRECTION)

- **Tên thương hiệu:** `Herbvian` (Biểu tượng thảo mộc & giá trị bản địa Việt Nam).
- **Slogan / Tagline chính:** *"Natural Care From Vietnam for a Healthier You"*.
- **Phong cách thị giác (Visual Style):** 
  - **Organic & Earthy Luxury:** Mộc mạc, gần gũi nhưng cao cấp, mang hơi thở thiên nhiên và chăm sóc sức khỏe làn da (Wellness & Eco-lifestyle).
  - **Cảm hứng bản địa Việt Nam (Vietnamese Heritage):** Giàn mướp xanh rợp bóng, hoa mướp vàng ươm, nụ cười người nông dân đội nón lá, cảnh đồng quê thanh bình lúc hoàng hôn/bình minh.
  - **Chất liệu thẩm mỹ:** Sợi xơ mướp tự nhiên, nền giấy xé mộc (Torn paper edge), bố cục ảnh polaroid nghiêng nghệ thuật, kết cấu spa tối giản sang trọng.

---

## 2. BẢNG MÀU CHUẨN (COLOR PALETTE)

Hệ thống màu sắc được trích xuất trực tiếp từ hình ảnh thực tế, mô phỏng màu cây cỏ, hoa mướp, đất mẹ và sợi xơ mướp phơi nắng.

### 2.1. Primary Colors (Màu chủ đạo)
| Tên Màu | Mã Hex | RGB | Ứng Dụng |
| :--- | :--- | :--- | :--- |
| **Forest Deep Green** | `#284B35` | `rgb(40, 75, 53)` | Nút CTA chính, header actions, accent badges, viền nổi bật |
| **Charcoal Deep Green** | `#1B3322` | `rgb(27, 51, 34)` | Tiêu đề lớn (Headings), văn bản nhấn mạnh, logo |
| **Forest Green Hover** | `#1F3A2A` | `rgb(31, 58, 42)` | Trạng thái hover của các nút chính |
| **Olive Moss Green** | `#3E5C43` | `rgb(62, 92, 67)` | Nút phụ, pill tags, viền icon trên nền sáng |

### 2.2. Accent Colors (Màu điểm nhấn)
| Tên Màu | Mã Hex | RGB | Ứng Dụng |
| :--- | :--- | :--- | :--- |
| **Loofah Blossom Gold** | `#EBB434` | `rgb(235, 180, 52)` | Lấy cảm hứng từ sắc vàng tươi của hoa mướp, viền highlight |
| **Star Rating Yellow** | `#F4A81E` | `rgb(244, 168, 30)` | 5 sao đánh giá sản phẩm (Star ratings) |
| **Warm Amber Sunrise** | `#D69438` | `rgb(214, 148, 56)` | Tông ánh nắng sớm mai, gradient nền phụ, viền ảnh polaroid |

### 2.3. Neutral Backgrounds & Surfaces (Màu nền & Bề mặt)
| Tên Màu | Mã Hex | RGB | Ứng Dụng |
| :--- | :--- | :--- | :--- |
| **Warm Linen (Nền chính)** | `#FAF7F2` | `rgb(250, 247, 242)` | Màu nền chủ đạo toàn trang (thay thế pure white chống chói) |
| **Soft Sand / Parchment** | `#F4EFE6` | `rgb(244, 239, 230)` | Nền thẻ sản phẩm, section phụ, background banner nhẹ |
| **Muted Cream / Border** | `#E8E1D5` | `rgb(232, 225, 213)` | Đường kẻ phân cách, viền card, đường nối timeline các bước |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Khung ảnh polaroid, modal popup, card nổi |
| **Dark Spa Slate** | `#1A1B18` | `rgb(26, 27, 24)` | Section "Cleanse. Refresh. Care." (tạo độ tương phản spa cao cấp) |

### 2.4. Typography Colors (Màu văn bản)
| Tên Màu | Mã Hex | Ứng Dụng |
| :--- | :--- | :--- |
| **Text Primary (Dark)** | `#1E241E` | Tiêu đề H1-H6, tên sản phẩm, giá tiền trên nền sáng |
| **Text Secondary (Muted)** | `#515B52` | Đoạn văn mô tả (paragraph), phụ đề |
| **Text Tertiary (Light)** | `#7F8A80` | Ngày đăng bài, số lượt đánh giá `(285)`, breadcrumb |
| **Text on Dark (Ivory)** | `#FAF7F2` | Tiêu đề & nội dung hiển thị trên nền tối hoặc trên ảnh Hero |
| **Text Gold Accent** | `#E5B869` | Eyebrow caption trên nền tối ("A SIMPLE RITUAL FOR...") |

---

## 3. HỆ THỐNG TYPOGRAPHY (TYPOGRAPHY SYSTEM)

Dự án sử dụng bộ 3 font kết hợp hài hòa tạo nên phong cách vừa sang trọng (Editorial Serif), vừa thủ công cá nhân (Handwritten Cursive), vừa hiện đại dễ đọc (Clean Sans-serif):

```html
<!-- Google Fonts Embed Code -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 3.1. Các họ Font (Font Families)
1. **Font Tiêu đề chính (Serif):** `'Playfair Display', serif`
   - Dùng cho: Logo `Herbvian`, Tiêu đề Section (`Natural Care From Vietnam`, `The Journey of Vietnamese Loofah`, `Best Sellers`,...).
   - Đặc điểm: Chân chữ thanh lịch, nét thanh nét đậm chuẩn phong cách editorial quốc tế.
2. **Font Chữ ký / Điểm xuyết (Script/Handwritten):** `'Caveat', cursive`
   - Dùng cho: Dòng chữ mềm mại uốn lượn như *"for a Healthier You"*, các ghi chú viết tay trên ảnh.
   - Font-weight: `600 - 700`.
3. **Font Nội dung & Giao diện (Sans-serif):** `'Plus Jakarta Sans', sans-serif`
   - Dùng cho: Menu thanh điều hướng, đoạn văn bản mô tả, nút bấm, thông số sản phẩm, giá, footer.

### 3.2. Bảng phân cấp cỡ chữ (Typography Scale & Hierarchy)

| Cấp bậc | Font Family | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Playfair Display | `56px` (`3.5rem`) | `36px` (`2.25rem`) | `600` | `1.15` | `-0.01em` |
| **Hero Script Sub** | Caveat | `40px` (`2.5rem`) | `28px` (`1.75rem`) | `600` | `1.2` | `0` |
| **Section H1 / H2** | Playfair Display | `40px` (`2.5rem`) | `28px` (`1.75rem`) | `600` | `1.2` | `-0.01em` |
| **Section H3 / Card** | Playfair Display | `20px` (`1.25rem`) | `18px` (`1.125rem`) | `600` | `1.3` | `0` |
| **Eyebrow / Overline** | Plus Jakarta Sans | `11px - 12px` | `11px` | `700` | `1.4` | `0.14em` (Uppercase) |
| **Body Large** | Plus Jakarta Sans | `17px` (`1.0625rem`) | `15px` | `400` | `1.65` | `0` |
| **Body Regular** | Plus Jakarta Sans | `15px` (`0.9375rem`) | `14px` | `400` | `1.6` | `0` |
| **Body Small / Meta** | Plus Jakarta Sans | `13px` (`0.8125rem`) | `12px` | `400 / 500` | `1.5` | `0` |
| **Button Text** | Plus Jakarta Sans | `13px` (`0.8125rem`) | `12px` | `600` | `1` | `0.08em` (Uppercase) |

---

## 4. QUY CHUẨN THÀNH PHẦN GIAO DIỆN (UI COMPONENTS SPEC)

### 4.0. Site Header (Thanh điều hướng cố định đa trạng thái)
- **Vị trí cố định (Position Fixed):** Luôn ghim cố định ở đỉnh màn hình (`position: fixed; top: 0; left: 0; width: 100%; z-index: 100;`).
- **Trạng thái tại Hero (Initial / At Hero):**
  - Nền trong suốt (`background-color: transparent`).
  - Lớp làm mờ kính hữu cơ nhẹ: `backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);`.
  - Đường viền đáy siêu mờ: `border-bottom: 1px solid rgba(255, 255, 255, 0.2);`.
  - Cho phép ánh nắng sớm, bầu trời và ngọn hoa vàng của ảnh Hero hòa sắc nhẹ qua thanh điều hướng mà vẫn giữ chữ/logo đọc rõ $100\%$.
- **Trạng thái cuộn trang (Scrolled State - `window.scrollY > 40`):**
  - Chuyển sang class `.scrolled` với hiệu ứng chuyển đổi mượt mà (`transition: all var(--transition-normal)`).
  - Nền vải lanh kem sang trọng: `background-color: rgba(250, 247, 242, 0.94);`.
  - Độ mờ kính tăng cường: `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`.
  - Đổ bóng nhẹ: `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);`.
  - Đường kẻ đáy tinh tế: `border-bottom: 1px solid rgba(232, 225, 213, 0.8);`.
  - Chiều cao thu gọn thanh thoát: từ `80px` xuống `70px`.

### 4.1. Buttons (Nút bấm tương tác)
- **Primary Hero CTA Button (Pill Button with White Outline):**
  - Cấu trúc: `EXPLORE OUR STORY →`
  - Nền: `#244832` (Rừng rậm sâu) | Chữ: `#FFFFFF`
  - Viền: `border: 1.5px solid rgba(255, 255, 255, 0.9)` (Viền trắng sắc nét đặc trưng trên nền ảnh)
  - Bo góc: `border-radius: 9999px` (viên thuốc hoàn toàn)
  - Padding: `11px 26px`
  - Font: `13px` (`0.8125rem`), Uppercase, `letter-spacing: 0.08em`, font-weight `700`
  - Hiệu ứng Hover: Nền chuyển `#1A3624`, nâng nhẹ `-2px`, bóng đổ sâu `0 8px 24px rgba(26, 54, 36, 0.35)`, mũi tên trượt phải `+5px`.
- **Card "Add to Cart" Button:**
  - Nền: `#284B35` | Chữ: `#FFFFFF`
  - Bo góc: `6px - 8px` hoặc `9999px`
  - Padding: `10px 20px`, chiều rộng: `100%`
  - Font: `13px`, font-weight: `600`
  - Hover: `background-color: #1F3A2A`
- **Arrow Icon Specification (Quy chuẩn icon mũi tên):**
  - Sử dụng SVG Arrow có thân ngang và đầu nhọn bo góc:
    ```html
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.10744 10H15.8926" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5889 15.3033L15.8922 10L10.5889 4.69672" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ```
  - `stroke="currentColor"`: Tự động kế thừa màu chữ (trắng trên nút nền xanh, xanh rừng/charcoal trên link text).
  - Hover effect: Mũi tên trượt mềm mại `+5px` về bên phải (`transition: transform 0.5s var(--ease-soft)`).

### 4.2. Hero Trust Row & Badges (Dải biểu tượng cam kết)
- **4 Biểu tượng trên ảnh Hero:**
  - Đặt trực tiếp trên nền ảnh phong cảnh giàn mướp, không đóng khung tròn để giữ tính phóng khoáng và tinh tế.
  - Icon line-art trắng tinh khôi nét mảnh `1.8px`:
    1. **100% Natural Plant Fiber**: Icon chiếc lá uốn tự nhiên.
    2. **Grown in Vietnam Under the Sun**: Icon cây mầm 3 lá vươn lên.
    3. **No Chemicals No Plastic**: Icon bình hóa nghiệm tam giác sủi bọt.
    4. **Gentle for You Kind to the Earth**: Icon trái tim yêu thương.
  - Phân cách giữa các mục bằng icon mũi tên chevron mảnh `›` màu trắng mờ `rgba(255, 255, 255, 0.75)`.
  - Typography: Dòng trên in đậm `font-weight: 700`, dòng dưới `font-weight: 400`, có đổ bóng chữ `text-shadow: 0 1px 4px rgba(0,0,0,0.7)` đảm bảo 100% dễ đọc.
- **Huy hiệu bảo chứng chân trang (Footer Trust Bar):**
  - Nằm trên nền sáng, đóng khung tròn hoặc icon xanh rừng `#284B35`.

### 4.3. Cards (Thẻ nội dung)
- **Thẻ Sản phẩm (Product Card - Best Sellers):**
  - Nền thẻ: Nền cát sáng `#FAF7F2` hoặc `#FFFFFF`, viền `1px solid #EAE3D6`, bo tròn `12px`.
  - Ảnh sản phẩm: Tỉ lệ `1:1` vuông vắn, bo góc `8px`, chụp với ánh sáng tự nhiên trên nền thạch cao / gỗ ấm.
  - Tên sản phẩm: 2 dòng tối đa, font `Playfair Display` hoặc `Plus Jakarta Sans` `15px`, bold `600`.
  - Rating: 5 ngôi sao vàng `#F4A81E` kèm số lượng đánh giá ví dụ `(285)`.
  - Giá: Giá to đậm `#1E241E`, font-size `18px`, weight `700`.
  - Nút thêm vào giỏ: Nằm sát đáy thẻ, full-width.
- **Thẻ Câu chuyện (Story / Blog Card):**
  - Ảnh bìa: Bo góc `12px`, tỉ lệ `16:10`.
  - Tiêu đề: Font `Playfair Display`, `18px`.
  - Ngày đăng: `12px`, màu `#7F8A80`.
  - Link: `Read more →`.
- **Quy trình 6 bước (Loofah Lifecycle Steps):**
  - Gồm 6 ảnh bo góc vuông tròn (`border-radius: 8px`).
  - Nối với nhau bằng icon mũi tên vòng tròn nhỏ `(→)`.
  - Đánh số thứ tự: `1. Seed`, `2. Vine & Flower`, `3. Growing Fruit`, `4. Mature Fruit`, `5. Remove Skin`, `6. Natural Fiber`.

### 4.4. Section Divider & Visual Treats (Hiệu ứng đặc biệt)
- **Authentic Torn Paper Edge Mask (Mép giấy xé mộc mạc bản địa):**
  - Ngăn cách tự nhiên giữa bức ảnh Hero phong cảnh giàn mướp và Section "The Journey of Vietnamese Loofah".
  - Hero Section đạt chiều cao trọn vẹn màn hình: `min-height: 100vh`, khoảng cách đệm chân `padding-bottom: 125px` đảm bảo dải biểu tượng cam kết (Trust Row) cách xa đỉnh mép giấy xé ~60px-70px, mang lại không gian thở thoáng đãng, cao cấp.
  - Sử dụng hệ thống 2 lớp phủ tinh tế thay vì phủ trắng toàn diện:
    1. **Lớp phủ cục bộ tiêu đề (Top-Left):** `radial-gradient(ellipse ... at 20% 32%, rgba(250, 247, 242, 0.95), transparent)` giúp tiêu đề xanh đậm đọc cực rõ mà không gây đục mờ toàn bộ ảnh.
    2. **Lớp bảo chứng chân ảnh (Bottom-Green):** `linear-gradient(to top, rgba(14, 28, 19, 0.75), transparent)` giữ nguyên nền xanh lá đậm tự nhiên của cỏ cây giàn mướp, tạo độ tương phản cao tuyệt đối cho 4 icon và text màu trắng.
  - Sử dụng trực tiếp tệp mặt nạ kênh Alpha: `imgs/hero-torn-mask.png` làm CSS `mask-image` trên `.hero-section`:
    ```css
    -webkit-mask-image: url('../imgs/hero-torn-mask.png');
    mask-image: url('../imgs/hero-torn-mask.png');
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: bottom;
    mask-position: bottom;
    ```
- **Polaroid Collage:**
  - Nhóm ảnh ở Section Journey gồm: 1 ảnh lớn (hoa mướp vàng rực rỡ) và 2 ảnh nhỏ viền trắng polaroid xếp chồng lớp, nghiêng nhẹ (`transform: rotate(-3deg)` và `rotate(4deg)`).
  - Viền trắng: `padding: 8px`, nền `#FFFFFF`, bóng đổ `box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08)`.

---

## 5. HỆ THỐNG KHOẢNG CÁCH & BỐ CỤC (LAYOUT & SPACING)

### 5.1. Spacing Scale (Đơn vị cơ bản: 4px / 8px)
- `--space-1`: `4px`
- `--space-2`: `8px`
- `--space-3`: `12px`
- `--space-4`: `16px`
- `--space-6`: `24px`
- `--space-8`: `32px`
- `--space-12`: `48px`
- `--space-16`: `64px`
- `--space-20`: `80px`
- `--space-24`: `96px`
- `--space-32`: `128px`

### 5.2. Container & Breakpoints
- **Max Width Container:** `1240px` (Padding 2 bên `24px` trên desktop, `16px` trên mobile).
- **Section Padding Vertical:**
  - Desktop: `96px` đến `120px`
  - Tablet: `64px` đến `80px`
  - Mobile: `48px` đến `56px`
- **Breakpoints chuẩn:**
  - Mobile: `< 640px`
  - Tablet: `640px - 1023px`
  - Desktop: `≥ 1024px`
  - Wide Desktop: `≥ 1280px`

---

## 6. CODE MẪU CSS TOKENS (SẴN SÀNG COPY & DÙNG)

Các lập trình viên và sub-agents khi code file `style.css` hãy đặt đoạn CSS Variables này ở đầu file:

```css
:root {
  /* Brand Colors */
  --color-primary: #284B35;
  --color-primary-dark: #1B3322;
  --color-primary-hover: #1F3A2A;
  --color-primary-light: #3E5C43;
  
  /* Accent Colors */
  --color-accent-gold: #EBB434;
  --color-accent-star: #F4A81E;
  --color-accent-amber: #D69438;

  /* Background & Surface Colors */
  --bg-page: #FAF7F2;
  --bg-surface: #F4EFE6;
  --bg-card: #FFFFFF;
  --bg-dark-section: #1A1B18;
  
  /* Text Colors */
  --text-main: #1E241E;
  --text-muted: #515B52;
  --text-sub: #7F8A80;
  --text-light: #FAF7F2;
  --text-gold-light: #E5B869;

  /* Borders & Dividers */
  --border-subtle: #E8E1D5;
  --border-card: #DCD5C9;
  --border-light-trans: rgba(255, 255, 255, 0.25);

  /* Fonts */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-script: 'Caveat', cursive;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  /* Typography Scale */
  --fs-hero-title: clamp(2.25rem, 5vw, 3.5rem);
  --fs-hero-script: clamp(1.75rem, 4vw, 2.5rem);
  --fs-h1: clamp(1.75rem, 3.5vw, 2.5rem);
  --fs-h2: clamp(1.35rem, 2.5vw, 2rem);
  --fs-h3: clamp(1.1rem, 2vw, 1.35rem);
  --fs-eyebrow: 0.75rem;
  --fs-body: 0.9375rem;
  --fs-body-sm: 0.8125rem;

  /* Border Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 24px rgba(40, 75, 53, 0.08);
  --shadow-polaroid: 0 12px 32px rgba(27, 51, 34, 0.12);

  /* Transitions & Curves - Organic & Fluid Easing */
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);       /* Smooth deceleration for luxury feel */
  --ease-fluid: cubic-bezier(0.25, 0.9, 0.3, 1);      /* Natural fluid response */
  --ease-spring-soft: cubic-bezier(0.34, 1.3, 0.64, 1); /* Gentle subtle spring bounce */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like fluid sheet slide */

  --transition-fast: 0.3s var(--ease-fluid);
  --transition-normal: 0.5s var(--ease-soft);
  --transition-slow: 0.8s var(--ease-soft);
  --transition-image: 1.1s var(--ease-soft);
  --transition-drawer: 0.6s var(--ease-drawer);
}
```

---

## 7. CẤU TRÚC SECTIONS & DANH MỤC NỘI DUNG

Khi xây dựng trang chủ (`index.html`), cấu trúc phải đi theo trình tự mượt mà đúng như bản thiết kế:

1. **Header / Navigation:** Logo `Herbvian` bên trái, Menu liên kết ở giữa (`Home`, `Shop`, `Our Story`, `Benefits`, `How to Use`, `Reviews`, `Blog`, `Wholesale`), Icon tiện ích bên phải (`Search`, `Account`, `Cart [0]`).
2. **Hero Banner:** Cảnh người nông dân Việt chạm vào quả mướp trên giàn, tiêu đề kết hợp Serif & Script, CTA `Explore Our Story →`, thanh 4 huy hiệu bảo chứng dưới chân hero.
3. **The Journey Section (Nền giấy xé):** Tiêu đề *"The Journey of Vietnamese Loofah"*, mô tả, cụm ảnh Polaroid hoa mướp vàng và xơ mướp, quy trình 6 bước từ hạt giống tới thành phẩm xơ mướp.
4. **Spa & Wellness Ritual Section (Nền tối):** Tiêu đề *"Cleanse. Refresh. Care."*, ảnh cô gái dùng cây chà lưng xơ mướp thư giãn, 5 đặc tính: `Natural Exfoliation`, `Deep Cleansing`, `Gentle on Skin`, `Plastic-Free`, `Biodegradable`.
5. **Best Sellers Section:** Tiêu đề *"Best Sellers"*, link xem tất cả, lưới 4 sản phẩm chính kèm giá, sao đánh giá và nút thêm vào giỏ hàng.
6. **Stories from the Fields Section:** 3 bài viết blog mang tính văn hóa và con người: *"Why Vietnamese Loofah Is Special"*, *"The People Behind Our Loofahs"*, *"A Simple Plant with Extraordinary Benefits"*.
7. **Mission Banner (From Our Fields to a Healthier Tomorrow):** Cảnh đồng quê hoàng hôn và người đi xe đạp ven mương nước thanh bình, lời cam kết đồng hành cùng nông dân Việt.
8. **Value Guarantee Bar (Thanh cam kết chân trang):** Free Shipping, 30-Day Money-Back Guarantee, Natural & Safe Plant-Based, Loved by Thousands.
9. **Footer:** Thông tin công ty, liên kết nhanh, đăng ký bản tin giảm giá (Newsletter), mạng xã hội và bản quyền.

---

## 8. NGUYÊN TẮC HÌNH ẢNH (IMAGERY GUIDELINES)

- **Ảnh phải tự nhiên, ấm áp:** Sử dụng ánh sáng ban mai hoặc chiều vàng (Golden hour), không dùng ảnh render giả tạo hoặc màu sắc lạnh lẽo.
- **Tôn vinh sản phẩm thật:** Các sợi xơ mướp phải có độ sắc nét cao, thấy rõ cấu trúc xơ rỗng tự nhiên, các tông màu ngà, be cát, vàng óng tự nhiên.
- **Thư mục lưu trữ tài nguyên:** Mọi hình ảnh phải được lưu vào thư mục `imgs/` hoặc `asset/imgs/` với tên file chuẩn tiếng Anh không dấu, viết thường nối dấu gạch ngang (ví dụ: `hero-farmer.jpg`, `loofah-blossom.jpg`, `product-back-scrubber.jpg`).

---

## 9. QUY CHUẨN CẤU TRÚC HTML & HƯỚNG DẪN TÍCH HỢP LAYOUT (HTML INTEGRATION RULES)

Để thuận tiện cho việc chuyển giao mã nguồn và đưa layout HTML tĩnh này vào các hệ thống backend / framework (như React/Next.js, Vue/Nuxt, Laravel Blade, Django, Shopify Liquid hoặc WordPress), mã nguồn HTML tĩnh được tổ chức theo quy chuẩn sau:

### 9.1. Phân tách Module & Khối Semantic chuẩn (Component Blocks)
| Module / Section | Selector ID / Class chính | Mục đích & Lưu ý khi tích hợp động |
| :--- | :--- | :--- |
| **Header** | `<header class="site-header" id="siteHeader">` | Header cố định/mờ kính khi cuộn trang (`.scrolled`). Giữ nguyên các ID `#cartToggleBtn`, `#cartBadge`, `#mobileMenuToggle`. |
| **Hero Section** | `<section class="hero-section" id="hero">` | Background chính `imgs/hero.png`. Dưới chân có `.hero-trust-bar` với 4 cam kết nguồn gốc. |
| **The Journey** | `<section class="journey-section" id="journey">` | Có `.torn-paper-divider` viền giấy xé. Cụm `.journey-collage` hiệu ứng Polaroid và `.journey-steps-grid` (6 bước có thể map từ mảng tĩnh/động). |
| **Spa Ritual** | `<section class="spa-section" id="spa">` | Nền tối phong cách phòng tắm spa sang trọng với 5 huy hiệu eco `.spa-features-grid`. |
| **Best Sellers** | `<section class="products-section" id="products">` | Khối danh sách sản phẩm. Thẻ `<article class="product-card">` được thiết kế để render lặp qua vòng lặp dữ liệu (`v-for`, `@foreach`, `.map()`). |
| **Blog Stories** | `<section class="blog-section" id="blog">` | Lưới 3 bài viết `<article class="story-card">` dễ dàng nối với CMS bài viết. |
| **Mission Banner** | `<section class="mission-section" id="mission">` | Khối tuyên ngôn thương hiệu và cam kết cùng người nông dân Việt Nam. |
| **Trust Bar** | `<section class="value-props-bar">` | 4 huy hiệu chính sách vận chuyển & đổi trả trước footer. |
| **Footer** | `<footer class="site-footer">` | Chân trang với form đăng ký email `.newsletter-form`, mạng xã hội và menu điều hướng. |
| **Cart Drawer** | `<aside class="cart-drawer" id="cartDrawer">` | Ngăn kéo giỏ hàng trượt ra từ bên phải màn hình. Chứa `#drawerCartItems`, `#drawerSubtotal`. |
| **Mobile Drawer** | `<nav class="mobile-nav-drawer" id="mobileNavDrawer">` | Menu trượt cho thiết bị di động và tablet. |
| **Toast Alert** | `<div class="toast-msg" id="toastMsg">` | Hộp thông báo nhanh nổi ở góc dưới khi tương tác giỏ hàng hoặc gửi form. |

### 9.2. Quy tắc đặt tên CSS & Class Names
- Tuân thủ cấu trúc tên lớp dễ hiểu, nhất quán theo danh từ tiếng Anh: `.block-name`, `.block-element`, `.block-modifier`.
- Mọi biến số màu, font, kích thước, khoảng cách đều tham chiếu qua biến CSS `--color-...`, `--font-...`, `--fs-...` định nghĩa tại `:root`.
- Không sử dụng các class inline ngẫu hứng hoặc ghi đè `!important`.

### 9.3. Xử lý Logic JavaScript (`js/main.js`)
- Viết bằng **Pure Vanilla JavaScript (ES6+)**, không phụ thuộc jQuery hay thư viện bên ngoài nặng nề.
- Độc lập sự kiện (Event-driven): Dễ dàng chuyển đổi thành State Management trong React (Zustand/Redux), Vue (Pinia) hoặc Alpine.js.
- Các hàm quản lý giỏ hàng (`updateCartUI`, `showToast`, `openCartDrawer`) đều thao tác trên mảng dữ liệu `cart = []`, sẵn sàng nối trực tiếp với LocalStorage hoặc REST API giỏ hàng.

---
*Tài liệu này là quy chuẩn cao nhất cho toàn bộ giao diện dự án Herbvian.*

