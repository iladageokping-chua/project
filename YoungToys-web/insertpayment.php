<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <style>
        body {
            background-color: black; /* ตั้งค่าพื้นหลังเป็นสีดำ */
            color: white; /* ตั้งค่าสีตัวหนังสือเป็นสีขาว */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .loader {
            border: 8px solid #000000; /* White */
            border-top: 8px solid #fff; /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        #countdown {
            font-size: 50px; /* ตั้งขนาดตัวหนังสือเป็น 36px */
            margin-left: 20px; /* เพิ่มระยะห่างข้างซ้าย */
        }
    </style>
</head>
<body>

<div class="loader" id="loader"></div>
<div id="countdown">กำลังโหลด...</div>

<?php
include 'condb.php';

$targetDirectory = 'payment/';
$targetFilePath = $targetDirectory.basename($_FILES["file1"]["name"]);
$imageFileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // ตรวจสอบค่า $_POST ก่อนใช้งาน
    if (isset($_POST['order_id'], $_POST['total_price'], $_POST['pay_date'], $_POST['pay_time'])){
        $orderID=$_POST['order_id'];
        $totalPrice=$_POST['total_price'];
        //$payMoney=$_POST['pay_money'];
        $payDate=$_POST['pay_date'];
        $payTime=$_POST['pay_time'];

        // ตรวจสอบว่า Order_ID มีอยู่ในฐานข้อมูลแล้วหรือไม่
        $check_sql = "SELECT * FROM payment WHERE Order_ID = '$orderID'";
        $check_result = mysqli_query($conn, $check_sql);

        if (mysqli_num_rows($check_result) > 0) {
            // ถ้ามี Order_ID อยู่แล้วในฐานข้อมูล ให้ทำการอัปเดตข้อมูล
            $update_sql = "UPDATE payment 
                           SET pay_money = '$totalPrice', 
                               pay_date = '$payDate', pay_time = '$payTime'
                           WHERE Order_ID = '$orderID'";
            
            $update_result = mysqli_query($conn, $update_sql);

            if ($update_result) {
                echo "<script>alert('อัปเดตข้อมูลเรียบร้อย');</script>";
            } else {
                echo "<script>alert('ไม่สามารถอัปเดตข้อมูลได้');</script>";
            }
        } else {
            // ถ้าไม่มี Order_ID อยู่ในฐานข้อมูล ให้ทำการเพิ่มข้อมูล
            // เตรียมตัวแปรสำหรับชื่อไฟล์รูปภาพ
            $new_image_name = '';

            // ตรวจสอบการอัปโหลดไฟล์และการอัปโหลดที่ถูกต้อง
            if (isset($_FILES['file1']) && is_uploaded_file($_FILES['file1']['tmp_name'])) {
                $new_image_name = 'b_' . uniqid() . "." . pathinfo(basename($_FILES['file1']['name']), PATHINFO_EXTENSION);
                $image_upload_path = "./admin/img/payment/" . $new_image_name;
                move_uploaded_file($_FILES['file1']['tmp_name'], $image_upload_path);
            }

            // เพิ่มข้อมูลพร้อมกับชื่อไฟล์ภาพ (ถ้ามีการอัปโหลดไฟล์)
            $insert_sql = "INSERT INTO payment (Order_ID, pay_money, pay_date, pay_time, pay_image) 
                           VALUES ('$orderID', '$totalPrice', '$payDate', '$payTime', '$new_image_name')";
            
            $insert_result = mysqli_query($conn, $insert_sql);

            if ($insert_result) {
                echo "<script>alert('บันทึกข้อมูลเรียบร้อย');</script>";
            } else {
                echo "<script>alert('ไม่สามารถบันทึกข้อมูลได้');</script>";
            }
        }
    } else {
        echo "<script>alert('ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง');</script>";
  }
}

mysqli_close($conn);
?>
    <script type="text/javascript">
        var count = 3;
        var countdown = setInterval(function(){
            document.getElementById("countdown").innerHTML = "กำลังจะกลับไปหน้าหลักในอีก " + count + " ";
            count--;
            if(count === 0) {
                clearInterval(countdown);
                window.location.href = 'http://localhost:3000'; // URL ของหน้า Home
            }
        }, 1000); // นับถอยหลังทุกๆ 1 วินาที (1000 มิลลิวินาที)
    </script>
</body>
</html>
