<?php 
session_start();
include 'condb.php';
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
    <style>
    .table {
        width: 100%;
        margin-bottom: 20px; /* เพิ่มระยะห่างด้านล่างของตาราง */
    }
    .table th,
    .table td {
        text-align: center;
        vertical-align: middle; /* จัดให้อยู่ตรงกลางแนวตั้ง */
    }
    .table img {
        margin-right: 10px;
    }
    .cart-container {
        padding: 30px;
        float: left;
        width: 63%;
        padding-right: 20px;
        margin-top: 130px; /* เพิ่ม margin ด้านบน */
        background-color: black; /* เปลี่ยนสีพื้นหลังเป็นสีดำ */
        color: white; /* ตั้งค่าสีข้อความเป็นสีขาว */
        border: 2px solid white; /* กำหนดขอบเป็นสีขาว */
        border-radius: 30px; /* กำหนดรูปร่างขอบ */
        background-color: rgba(0, 0, 0, 0.7);

    }
    .form-container {

        float: right;
        padding: 30px;
        width: calc(35% - 40px); /* ปรับขนาดของ form-container */
        height: 20%;
        margin-top: 130px; /* เพิ่ม margin ด้านบน */
        background-color: black; /* เปลี่ยนสีพื้นหลังเป็นสีดำ */
        color: white; /* ตั้งค่าสีข้อความเป็นสีขาว */
        border: 2px solid white; /* กำหนดขอบเป็นสีขาว */
        border-radius: 30px; /* กำหนดรูปร่างขอบ */
        background-color: rgba(0, 0, 0, 0.7);
        margin-left: 60px; /* เพิ่มระยะห่างด้านล่าง */

    }
    .alert {
            border-radius: 15px; /* กำหนดรูปร่างขอบ */
        background-color: black; /* เปลี่ยนสีพื้นหลังของแถบแจ้งเตือนเป็นสีดำ */
        color: white; /* ตั้งค่าสีข้อความเป็นสีขาว */
        border-color: white; /* กำหนดขอบเป็นสีขาว */
    }
    .form-container .btn {
        border-radius: 10px; /* กำหนดรูปร่างขอบ */
        margin-top: 10px;
    }
    .cart-container a.btn {
    color: white; /* เปลี่ยนสีข้อความเป็นสีขาว */
    background-color: black; /* เปลี่ยนสีพื้นหลังปุ่มเป็นสีดำ */
    border-color: white; /* เปลี่ยนสีขอบปุ่มเป็นสีขาว */
}

.cart-container a.btn:hover {
    background-color: #333; /* เปลี่ยนสีพื้นหลังเมื่อชี้ (hover) ไปที่ปุ่มเป็นสีเทาเข้ม */
    border-color: white; /* เปลี่ยนสีขอบเป็นสีขาว */
}

.form-container .btn {
    color: white; /* เปลี่ยนสีข้อความเป็นสีขาว */
    background-color: black; /* เปลี่ยนสีพื้นหลังปุ่มเป็นสีดำ */
    border-color: white; /* เปลี่ยนสีขอบปุ่มเป็นสีขาว */
}

.form-container .btn:hover {
    background-color: #333; /* เปลี่ยนสีพื้นหลังเมื่อชี้ (hover) ไปที่ปุ่มเป็นสีเทาเข้ม */
    border-color: white; /* เปลี่ยนสีขอบเป็นสีขาว */
}

.btn.btn-outline-secondary {
    margin-right: 10px;
    color: white; /* เปลี่ยนสีข้อความเป็นสีขาว */
}

.btn.btn-outline-secondary:hover {
    color: white; /* เปลี่ยนสีข้อความเป็นสีดำเมื่อชี้ (hover) ไปที่ปุ่ม */
}

#alert_style {
    text-align: center;
}
    </style>
</head>
<body>
<?php include 'menu.php';?>
<br><br>
<div class="container">
    <div class="row">
        <div class="col-md-8 cart-container">
            <div class="alert alert-dark h4" role="alert" id="alert_style">การสั่งซื้อสินค้า</div>
            <table class="table table-hover">
                <tr>
                    <th>ลำดับที่</th>
                    <th>ชื่อสินค้า</th>
                    <th>ราคา</th>
                    <th>จำนวน</th>
                    <th>ราคารวม</th>
                    <th>เพิ่ม - ลด</th>
                    <th>ลบรายการ</th>
                </tr>
                <?php 
                $Total = 0;
                $sumPrice = 0;
                $m = 1;
                for($i=0; $i <= (int)$_SESSION["intLine"]; $i++){
                    if(($_SESSION["strProductID"][$i]) != ""){
                        $sql1="SELECT * FROM products WHERE Product_ID = '". $_SESSION["strProductID"][$i]. "'";
                        $result1 = mysqli_query($conn, $sql1);
                        $row_pro = mysqli_fetch_array($result1);

                        $_SESSION["price"] = $row_pro['price'];
                        $Total = $_SESSION["strQty"][$i];
                        $sum = $Total * $row_pro['price'];
                        $sumPrice = $sumPrice + $sum;
                        $_SESSION["sum_price"] = $sumPrice;
             
                ?>
                <tr>
                    <td><?=$m?></td>
                    <td>
                        <img src="./image/<?=$row_pro['image']?>" width="80px" height="100" class="mt-5 p-2 my-2 boder">
                        <?=$row_pro['name']?>
                    </td>
                    <td><?=$row_pro['price']?></td>
                    <td><?=$_SESSION["strQty"][$i]?></td>
                    <td><?=$sum?></td>
                    <td>
                        <a href="order.php?id=<?=$row_pro['Product_ID']?>" class="btn btn-outline-primary">+</a>
                        <?php if($_SESSION["strQty"][$i] > 1){ ?>
                        <a href="del.php?id=<?=$row_pro['Product_ID']?>" class="btn btn-outline-primary">-</a>
                        <?php } ?>
                    </td>
                    <td><a href ="pro_delete.php?Line=<?=$i?>"><img src="./admin/img/delete.png" width="30px"></td>
                </tr>
                <?php
                $m=$m+1;
                }
            }
                ?>
                <tr>
                    <td class="text-end" colspan="5">รวมเป็นเงิน</td>
                    <td class="text-center"><?=$sumPrice?></td>
                    <td>$</td>
                </tr>

            </table>
        </div>
        <div class="col-md-4 form-container">
            <div class="alert alert-success" role="alert" id="alert_style">
                ข้อมูลสำหรับจัดส่งสินค้า
            </div>
            <form id="form1" method="POST" action="insert_cart.php">
                <div class="mb-3">
                    <label for="cus_name" class="form-label">ชื่อ-นามสกุล :</label>
                    <input type="text" name="cus_name" class="form-control" id="cus_name" required placeholder="ชื่อ-นามสกุล...">
                </div>
                <div class="mb-3">
                    <label for="cus_mail" class="form-label">E-mail :</label>
                    <input type="text" name="cus_mail" class="form-control" id="cus_mail" required placeholder="E-mail...">
                </div>
                <div class="mb-3">
                    <label for="cus_add" class="form-label">ที่อยู่การจัดส่ง :</label>
                    <textarea class="form-control" id="cus_add" required placeholder="ที่อยู่..." name="cus_add" row="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="cus_tel" class="form-label">เบอร์โทรศัพท์ :</label>
                    <input type="number" name="cus_tel" class="form-control" id="cus_tel" required placeholder="เบอร์โทรศัพท์...">
                </div>
                            <div style="text-align:right">
            <a href="show_product.php" class="btn btn-outline-secondary">เลือกสินค้า</a>
            <button type="submit" class="btn btn-primary">ยืนยันการสั่งซื้อ</button>   
        </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
