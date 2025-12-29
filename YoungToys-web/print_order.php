<?php
session_start();
include 'condb.php';
$sql="SELECT * FROM td_order WHERE Order_ID= '".$_SESSION["order_id"]."'";
$result = mysqli_query($conn, $sql);
$rs = mysqli_fetch_array($result);
$total_price = $rs['UnitPrice'];
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
#video-background {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    filter: brightness(0.2); /* ทำให้วิดีโอมืดลง */

}


.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* ทำให้คอนเทนเนอร์เต็มหน้าจอ */
}
.row {
    padding: 20px;
    border: 2px solid white; /* กำหนดขอบเป็นสีขาว */
    border-radius: 20px;
}
        .alert {
        background-color: black; /* เปลี่ยนสีพื้นหลังของแถบแจ้งเตือนเป็นสีดำ */
        color: white; /* ตั้งค่าสีข้อความเป็นสีขาว */
        border-color: white; /* กำหนดขอบเป็นสีขาว */
        border-radius: 10px;
        }
        #text_color {
            color: white;
        }
                /* เพิ่ม CSS เพื่อเปลี่ยนสีปุ่ม */
        .btn-print, .btn-back {
            margin-left: 10px;
            background-color: black; /* กำหนดสีเป็นดำ */
            color: white; /* กำหนดสีข้อความเป็นขาว */
            border: 2px solid white; /* กำหนดขอบเป็นสีขาว */
        }

        /* เพิ่ม CSS เพื่อเมื่อเมาส์วางบนปุ่ม สีของปุ่มเปลี่ยนเป็นสีเทาเข้ม */
        .btn-print:hover, .btn-back:hover {

            color: white;
            border: 2px solid white; /* กำหนดขอบเป็นสีขาว */
            background-color: #333; /* เปลี่ยนสีเมื่อเมาส์วางบนปุ่ม */
        }
    </style>
</head>
<body>
<video autoplay muted loop id="video-background">
    <source src="./admin/img/vid1.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="alert alert-primary h4 text-center mt-4" role="alert">
                    การสั่งซื้อเสร็จสมบูรณ์
                </div>
                <br>
                <div id="text_color">
                เลขที่ใบการสั่งซื้อ : <?=$rs['Order_ID']?> <br>
                ชื่อ-นามสกุล (ลูกค้า) : <?=$rs['username']?> <br>
                ที่อยู่การจัดส่ง : <?=$rs['address']?> <br>
                เบอร์โทรศัพท์ : <?=$rs['phone_number']?> <br>
                </div>
                <br>
                <div class="card mb-4 mt-4">
                    <div class="card-body">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                            <th>ราคารวม</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $sql1="SELECT * FROM order_detail d, products p WHERE d.Product_ID=p.Product_ID and d.Order_ID= '".$_SESSION["order_id"]."'";
                        $result1 = mysqli_query($conn, $sql1);
                        while($row = mysqli_fetch_array($result1)){
                        ?>
                        <tr>
                            <td><?=$row['Product_ID']?></td>
                            <td><?=$row['name']?></td>
                            <td><?=$row['orderPrice']?></td>
                            <td><?=$row['orderQty']?></td>
                            <td><?=$row['Total']?></td>
                        </tr>
                    </tbody>
                    <?php
                        }
                    ?>
                </table>
                <h6 class="text-end">รวมเป็นเงิน <?=number_format($total_price,2)?> บาท </h6>
                </div>
                </div>
                <div id="text_color">*** กรุณาโอนเงินภายใน 7 วัน หลังจากทำการสั่งซื้อ</div>
                <div id="text_color">*** ธนาคาร : กสิกรไทย เลขที่บัญชี : xxx-xxxxx-xxx-xx ชื่อบัญชี : xxxx xxxxx </div>
                <br><br>
    <div class="text-center">
        <a href="show_product.php" class="btn btn-back">Back</a>
        <button onclick="window.print()" class="btn btn-print">Print</button>
        <br><br>
    </div>
        </div>
    </div>
</body>
</html>





