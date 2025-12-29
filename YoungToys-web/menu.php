<head>
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-... (ข้อมูล integrity จะแตกต่างกันตามเวอร์ชัน)" crossorigin="anonymous" />
  <title>YoungToys</title>
  <link rel="icon" href="./public/images/logo-removebg-preview.png" type="image/png">
<style>
  /* src/App.css */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

}

h2 {
  color: #333;
  text-align: center;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* Adjusted justify-content */
}

.product {
  flex: 0 1 calc(30% - 20px);
  /* Adjusted flex and width */
  margin: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 25px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  max-width: calc(30% - 20px);
  /* Adjusted max-width */
  padding: 20px; /* เพิ่ม padding ให้สินค้ามีช่องว่างด้านใน */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* เพิ่มเงาให้กับสินค้า */
  min-width: 300px;
}

.product h4,b {
  color: white;

}

.product:hover {
  transform: scale(1.05);
}

.product-image {
  overflow: hidden;
  height: 200px;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.product:hover .product-image img {
  transform: scale(1.2);
}

.product-details {
  padding: 15px;
  text-align: center;
}

.product button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.product button:hover {
  background-color: #45a049;
}

.product-details {
  padding: 15px;
  text-align: center;
}

.product button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.product button:hover {
  background-color: #45a049;
}

h2#product_style {
  padding-top: 125px;
}
/* Updated styling for the tab bar */
.tab-bar {
  list-style: none;
  padding: 10px 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  /* Adjusted to space between */
  background-color: #343a40;
  /* Dark background color */
  top: 0;
  width: 100%;
  z-index: 1000;
}

.tab-bar .left-buttons,
.tab-bar .right-buttons {
  display: flex;
  align-items: center;
}

.tab-bar .left-buttons {
  margin-right: auto; /* ย้ายปุ่มไปอยู่ฝั่งซ้าย */
}

.tab-bar .right-buttons {
  margin-left: 0; /* ลบ margin ด้านซ้ายออก เพื่อไม่ให้มีระยะห่างด้านซ้าย */
}


.tab-bar li {
  margin: 0 20px;
}

.tab-bar a {
  color: white;
  text-decoration: none;
  padding: 17px;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.tab-bar a:hover {
  background-color: #7b7b7b;
}

.logo {
  width: 30px;
  height: auto;
  margin-right: 5px;
}

.tab-bar li.home-tab {
  margin-right: 20px;
}

.tab-bar ul {
  display: flex;
  padding: 0;
  margin: 0;
}

.tab-bar li {
  margin: 0;
}

.nav-link {
  color: black;
}

.nav-link:hover {
  color: black;
}

.navbar-brand {
  color: black;
}

.navbar-brand:hover {
  color: black;
}

.tab-bar {
  background-color: rgba(0, 0, 0, 0.7);
  /* Adjust the alpha value for transparency */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  /* Adjust padding as needed */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.tab-item {
  color: #fff;
  /* Set text color to white */
  text-decoration: none;
  margin-right: 20px;
  /* Adjust margin as needed */
}

.tab-item:hover {
  text-decoration: underline;
  /* Add underline on hover if desired */
}

.tab-item:last-child {
  margin-right: 0;
}

#product_style {
  margin-top: 20px;
  color: white;
  /* Adjust the margin as needed */
}

.video-bg {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  filter: brightness(0.3);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 1, 1, 1);
  /* Increase the alpha value for more darkness */
  z-index: -1;
}

.user-info p {
  color: white;
  /* เปลี่ยนสีข้อความเป็นสีขาว */
}

/* ตำแหน่งภาพ sponsor */
.content .carousel {
  padding-top: 6%;
}

/* ตำแหน่งภาพ พวก hi email, ปุ่มlogout */
.user-info {
  display: flex;
  align-items: center;
}

.user-email {
  margin-top: 15px;
  margin-right: 15px;
  /* ปรับระยะห่างระหว่างข้อความและปุ่ม */
}

.cart-product-image {
  max-width: 100px;
  /* ปรับขนาดภาพให้มีความกว้างสูงสุด 100px */
  max-height: 100px;
  /* ปรับขนาดภาพให้มีความสูงสูงสุด 100px */
}

/* Preloader */
.preloader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: #000;
  /* เปลี่ยนสีพื้นหลังเป็นสีดำ */
}

.preloader-text {
  margin-top: 10px;
  font-size: 16px;
  color: #fff;
  /* เปลี่ยนสีข้อความเป็นสีขาว */
}

/* CSS for Logo Animation */
@keyframes logo-animation {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-5px);
  }

  50% {
    transform: translateY(0);
  }

  75% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0);
  }
}

.preloader-logo {
  width: 100px;
  height: auto;
  margin-bottom: 1%;
  animation: logo-animation 1s infinite;
  /* เพิ่มอนิเมชั่น logo-animation เข้าไปใน preloader-logo */
}

/* CSS for Dot Animation */
.dot-loader {
  display: flex;
  justify-content: center;
}

.dot {
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
  animation: dot-animation 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-animation {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.tab-bar {
  backdrop-filter: blur(8px);
  /* เพิ่มเบลอให้ Navbar */
  background-color: rgba(0, 0, 0, 0.8);
  /* สีพื้นหลังดำทึบ */
}

.tab-bar li {
  list-style-type: none; /* ลบจุดดำ */
  margin: 0; /* กำหนด margin เป็น 0 เพื่อลบการเว้นระยะห่างรอบขอบของแต่ละ <li> ออกไป */
}

#product_style2 {
  color:white;
  text-align: center;
}

.navbar-brand {
  margin-left: 30px;
  margin-right: 5px;
  margin-top: 4px;
}


</style>

</head>
<div class="app-container">
  <Preloader />
  <!-- Navbar -->
  <video autoplay loop muted class="video-bg">
    <source src="./public/images/MEGASPACEMOLLY.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <nav class="tab-bar">
    <img
      class="navbar-brand"
      src="./public/images/logo-removebg-preview.png"
      style="width: 50px; height: 50px;"
      alt="logo"
    />
    <p>᲼᲼᲼</p>
    <ul class="left-buttons">
      <li class="nav-item">
        <a aria-current="page" href="http://localhost:3000/" class="tab-item"><i class="fas fa-home"></i>᲼Home</a>
      </li>
      <li class="nav-item">
        <a href="http://localhost:3000/products" class="tab-item"><i class="fas fa-book"></i>᲼News</a>
      </li>
      <li class="nav-item">
        <a href="http://localhost/youngtoys_project/show_product.php" class="tab-item">
          <i class="fas fa-shopping-cart"></i>᲼All Products
        </a>
      </li>
      <li class="nav-item">
        <a href="http://localhost:3000/aboutus" class="tab-item"><i class="fas fa-address-card"></i>᲼About Us</a>
      </li>
    </ul>
    <ul class="right-buttons">
                <li class="nav-item">
        <a href="cart.php" class="tab-item"><i class="fas fa-cart-plus"></i></a>
      </li>
                <li class="nav-item">
        <a href="payment.php" class="tab-item"><i class="fas fa-caret-down"></i>᲼Payment</a>
      </li>
      </ul>
  </nav>

  <!-- Routes -->
  <div>
    <Route path="/products" element="<Products products={products} addToCart={addToCart} />"></Route>
    <Route path="/aboutus" element="<AboutUs cart={cart} />"></Route>
    <Route path="/login" element="<Login />"></Route>
    <Route path="/register" element="<Register />"></Route>
    <Route path="/show_product" element="<ShowProduct />"></Route>
    <Route path="/" element="<Home products={products} addToCart={addToCart} />"></Route>
  </div>
</div>
