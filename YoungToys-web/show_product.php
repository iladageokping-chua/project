<?php include 'condb.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YoungToys</title>
    <link rel="icon" href="./public/images/logo-removebg-preview.png" type="image/png"> <!-- เปลี่ยน icon.png เป็นที่อยู่ของรูปภาพของคุณ -->
    <!-- Bootstrap CSS -->
    <link href="bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
    <style>

        #footer {
            color: white;
            margin-left: 350px;
            margin-right: 350px;
        }

        #footer h5 {
            font-family: 'Kanit', sans-serif;
            /* เลือก font ชื่อ Kanit */
        }

        #footer ul {
            list-style-type: none;
            padding: 0;
        }

        #footer a {
            color: white;
            text-decoration: none;
            /* ลบการขีดเส้นใต้ลิงก์ */
            transition: color 0.3s ease-in-out;
            /* เพิ่ม transition เพื่อเปลี่ยนสีอย่างนุ่มนวล */
        }

        #footer a:hover {
            color: #ccc;
            /* เปลี่ยนสีของลิงก์เมื่อโฮเวอร์ */
        }

        .container h1,
        .container h2,
        .container span {
            color: white;
            /* เปลี่ยนสีข้อความเป็นสีขาว */
        }
        

        .product img {
            object-fit: cover;
        }

        .product h5 {
            margin-top: 10px; /* ย้ายข้อความชื่อสินค้าขึ้นเล็กน้อย */
            font-size: 18px; /* ปรับขนาดตัวอักษรของชื่อสินค้าให้ใหญ่ขึ้น */
        }

        .product button {
            margin-top: 10px; /* เพิ่มช่องว่างระหว่างปุ่ม Add to Cart กับรายละเอียดสินค้า */
        }

        .colorbtn2 {
            background-color: rgba(0, 0, 0, 0.3);
            /* Transparent black background */
            color: white;
            /* Text color */
            border: 2px solid transparent;
            /* Transparent border */
            transition: border 0.3s ease-in-out;
            /* Add a smooth transition effect for the border */
        }
        .colorbtn2:hover {
            color: white;
            background-color: rgba(0, 0, 0, 0.4);
            /* Darker transparent black background on hover */
            border: 2px solid white;
            /* White border on hover */
        }

        .colorbtn {
            background-color: rgba(0, 0, 0, 0.7);
            /* Transparent black background */
            color: white;
            /* Text color */
            border: 2px solid transparent;
            /* Transparent border */
            transition: border 0.3s ease-in-out;
            /* Add a smooth transition effect for the border */
        }

        .colorbtn:hover {
            color: white;
            background-color: rgba(0, 0, 0, 0.9);
            /* Darker transparent black background on hover */
            border: 2px solid white;
            /* White border on hover */
        }

/* สร้างหน้าต่าง popup */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none; /* ซ่อนเริ่มต้น */
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5); /* สีพื้นหลัง */
    overflow: auto;

}

.popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: auto;
    min-width: 250px;
    min-height: 250px;
}

/* Style for close button */
.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 50px;
    cursor: pointer;
    color: white; /* สีของปุ่มปิด */
    border-radius: 50%; /* ทำให้รูปร่างของปุ่มปิดเป็นวงกลม */
    padding: 5px; /* เพิ่มการเรียงจัดของเนื้อหาในปุ่มปิด */
}



    </style>
</head>
<body>
    <?php include 'menu.php';?>
    <div class="container mb-5">
      <h2 id="product_style" class="display-1 mb-3">YoungToys</h2>
    <p class="text-light text-center mx-5 mb-5 pb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, incidunt? Nam dolor aliquam aperiam iure sed nulla culpa error excepturi blanditiis laboriosam labore recusandae, reprehenderit totam nostrum ducimus natus temporibus, saepe aut vero? Quam omnis pariatur itaque accusamus</p>
        <div class="row">
            <?php 
            $sql="SELECT * FROM products ORDER BY Product_ID";
            $result = mysqli_query($conn, $sql);
            while($row=mysqli_fetch_array($result)){
            ?>
            <div class="col-md-4">
                <div class="text-center product pb-5">
                    <img src="./image/<?=$row['image']?>"width="200px" height="200px" class="mt-5 p-2 my-2"><br>
                    <h4 class="text"><?=$row['name']?></h4>
                    <b>$</b><b class="text-danger"><?=$row['price']?></b><br>
                    <br><a class="btn colorbtn2" href="#" onclick="showDetail('<?=$row['description']?>'); return false;">Detail</a>
                    <a class="btn colorbtn" href="order.php?id=<?=$row['Product_ID']?>">Add cart</a>
                  </div>
                <br>
               <!-- Popup -->
<div class="popup-overlay" id="popup">
    <div class="popup-content">
        <span onclick="hideDetail();" class="close">&times;</span>
        <h4 id="description"></h4>
    </div>
</div>
 
            </div>
                <?php

            }
            mysqli_close($conn);
            ?>
        </div>
    </div>

    <!-- Footer section -->
    <footer id="footer">
        <div class="row">
            <div class="col-xl-6 col-12">
                <div class="row">
                    <div class="col-xl-2 col-3">
                        <img src="./public/images/logo-removebg-preview.png" alt="Logo" width="80" class="ml-4" />
                    </div>
                    <div class="mt-xl-3 col-xl-4 col-6">
                        <div class="text-display pl-2">
                            <h5>YoungToys</h5>
                            <span>Best Store</span>
                        </div>
                    </div>
                </div>
                <p class="mt-xl-2 mt-4">เว็บไซต์ของเราเป็นเว็บเกี่ยวกับการขายของเล่น ซึ่งมีหลากหลายประเภทให้เลือกซื้อ สามารถเข้าไปชมสินค้าของเราได้เลย หรือถ้ามีปัญหาอยากติดต่อสอบถามสามารถทักมาทางช่องทางที่เราได้แนบไว้ได้เลย พวกเราผมให้บริการเสมอค่ะ</p>
            </div>
            <div class="col-xl-3 col-6">
                <h5>หมวดหมู่</h5>
                <ul>
                    <li><a href="http://localhost:3000/products" class="nuxt-link-exact-active nuxt-link-active" aria-current="page">Toys</a></li>
                    <li><a href="http://localhost:3000/products" class="nuxt-link-exact-active nuxt-link-active" aria-current="page">Doll</a></li>
                    <li><a href="http://localhost:3000/products" class="nuxt-link-exact-active nuxt-link-active" aria-current="page">Gun</a></li>
                    <li><a href="http://localhost:3000/products" class="nuxt-link-exact-active nuxt-link-active" aria-current="page">Kid</a></li>
                </ul>
            </div>
            <div class="col-xl-3 col-6">
                <h5>ช่องทางต่างๆ</h5>
                <ul>
                    <li><a href="https://www.tiktok.com">Tiktok</a></li>
                    <li><a href="https://facebook.com">Facebook</a></li>
                    <li><a href="https://youtube.com">Youtube</a></li>
                    <li><a href="https://discord.gg">Discord</a></li>
                </ul>
            </div>
        </div>
        <hr class="divide-hr" />
        <div class="row">
            <div class="col-xl-6 col-12">
                <p>Copyright © 2024 YoungToys</p>
            </div>
        </div>
        
    </footer>
<script>
    function showDetail(description) {
        // หา DOM element ของหน้าต่าง popup
        var popup = document.getElementById("popup");

        // หา DOM element ของเนื้อหารายละเอียด
        var descriptionElement = document.getElementById("description");

        // กำหนดข้อความรายละเอียด
        descriptionElement.innerHTML = description;

        // แสดงหน้าต่าง popup
        popup.style.display = "flex";
    }

    function hideDetail() {
        // หา DOM element ของหน้าต่าง popup
        var popup = document.getElementById("popup");

        // ซ่อนหน้าต่าง popup
        popup.style.display = "none";
    }
</script>

</body>
</html>
