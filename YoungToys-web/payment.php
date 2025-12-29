<?php 
session_start();
include 'condb.php';
$order_id="";
$cusname="";
$total=0;
$orderStatus = ""; // กำหนดค่าเริ่มต้นเป็นสตริงเว้นว่าง

// ตรวจสอบว่าตัวแปร $row ถูกกำหนดค่าหรือไม่ก่อนใช้งาน
if(isset($row['order_status'])){
    $orderStatus = $row['order_status'];
}

// หรือตรวจสอบ $order_id ว่าเป็นค่าว่างหรือไม่ เพื่อกำหนดค่า $orderStatus ตามที่ต้องการ
// โดยใช้เงื่อนไขตามต้องการ เช่น
// if($order_id != ""){ 
//     // กำหนดค่า $orderStatus ตามที่ต้องการ
// }

// หลังจากนั้นจึงนำตัวแปร $orderStatus ไปใช้งานต่อในโค้ด

if(isset($_POST['btn1'])){
    $key_word=$_POST['keyword'];
    if($key_word != ""){
        $sql="SELECT * FROM td_order WHERE Order_ID='$key_word'";
        unset($_SESSION['error']);
    }else{
        echo "<script>window.location='payment.php';</script>";
        unset($_SESSION['error']);

    }
    $hand=mysqli_query($conn, $sql);
    $num1=mysqli_num_rows($hand);
    if($num1 == 0){
        echo "<script>window.location='payment.php';</script>";
        $_SESSION['error']="ไม่พบข้อมูลเลขที่ใบสั่งซื้อ";
    }else{

    $row=mysqli_fetch_array($hand);
    $order_id=$row['Order_ID'];
    $cusname=$row['username'];
    $total=$row['UnitPrice'];
    $orderStatus=$row['order_status'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YoungToys</title>
    <link rel="icon" href="./public/images/logo-removebg-preview.png" type="image/png">
    <!-- Bootstrap CSS -->
    <link href="bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>

    <style>
    .container {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 15px; /* กำหนดขอบมนของคอนเทนเนอร์ */
    border: 2px solid white; /* เพิ่มสีขอบเป็นสีขาว */
    width: 1000px;
    height: 850px;

}
    .alert {
        margin-top: 7px;
        border-radius: 15px; /* กำหนดรูปร่างขอบ */
        background-color: black; /* เปลี่ยนสีพื้นหลังของแถบแจ้งเตือนเป็นสีดำ */
        color: white; /* ตั้งค่าสีข้อความเป็นสีขาว */
        border-color: white; /* กำหนดขอบเป็นสีขาว */
    }

#justify-content-center_1 {
    color: black;
}

#alert_text_style {
    text-align: center;
}

.btn-submit {
    background-color: black;
    color: white;
    border: 2px solid white;
}

.btn-submit:hover {
    background-color: #333; /* เปลี่ยนสีเมื่อเม้าส์วางบนปุ่ม */

}

.btn-search {
    background-color: black;
    color: white;
    border: 2px solid white;
}

.btn-search:hover {
    background-color: #333; /* เปลี่ยนสีเมื่อเม้าส์วางบนปุ่ม */
}

        #footer {
            color: white;
            margin-top: 90px;
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
        
.text-yellow {
    color: #FFC400;
}

    </style>
</head>
<body>
    <br><br><br><br><br>
    <div class="container">
        <?php include 'menu.php'?>
        <div class="row justify-content-center mt-3"> <!-- Center the row -->
            <div class="col-md-6"> <!-- Adjust the column width -->
                <div class="alert alert-success" role="alert" id="alert_text_style">
                    <h3>แจ้งชำระเงิน</h3>
                </div>
                <br>
                <!-- Form for searching order number -->
                <div class="border mt-1 p-2 my-2" style="background-color: #f0f0f5;">
                    <form method="POST" action="payment.php">
                        <label id="justify-content-center_1">เลขที่ใบสั่งซื้อ</label>
                        <input type="text" name="keyword">
                        <button type="submit" name="btn1" class="btn btn-search">ค้นหา</button>
                        <?php
                        if(isset($_SESSION['error'])){
                            echo "<div class='text-danger'>";
                            echo $_SESSION['error'];
                            echo "</div>";
                        }
                        ?>
                    </form>
                </div>
            </div>
        </div>
        <div class="row justify-content-center"> <!-- Center the row -->
            <div class="col-md-6"> <!-- Adjust the column width -->
                <form method="POST" action="insertpayment.php" enctype="multipart/form-data">
                    <label class="mt-4">เลขที่ใบคำสั่งซื้อ</label>
                    <input type="text" name="order_id" required value="<?=$order_id?>">

                    <?php
                    if($orderStatus == "1"){
                        echo "<div class='text-yellow'>";
                        echo "ยังไม่ชำระเงิน";
                        echo "</div>";
                    } elseif($orderStatus == "2"){
                        echo "<div class='text-success'>";
                        echo "ชำระเงินแล้ว";
                        echo "</div>";
                    }elseif($orderStatus == "0"){
                        echo "<div class='text-danger'>";
                        echo "ยกเลิกการสั่งซื้อ";
                        echo "</div>";
                    }
                    ?>
                    <br>
                    <label class="mt-4">ชื่อ-นามสกุล</label>
                    <textarea class="form-control" name="cusName" required rows="1"><?=$cusname?></textarea>
                    <label class="mt-4">จำนวนเงิน</label>
                    <input type="number" class="form-control" name="total_price" required value="<?=number_format($total,2)?>">
                    <label class="mt-4">วันที่โอนเงิน</label>
                    <input type="date" class="form-control" name="pay_date" required>
                    <label class="mt-4">เวลาที่โอนเงิน</label>
                    <input type="time" class="form-control" name="pay_time" required>
                    <label class="mt-4">หลักฐานการชำระเงิน</label>
                    <input type="file" class="form-control" name="file1" required><br>
<?php 
if($orderStatus == "1"){ ?>
    <button type="submit" name="btn2" class="btn btn-submit">Submit</button>
<?php } else { ?>
    <button type="submit" name="btn2" class="btn" disabled>Submit</button>
<?php } ?>
                    <br><br>
                </form>
            </div>
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
</body>
</html>
