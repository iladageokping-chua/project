
<?php
include 'condb.php'; // Assuming this file contains your database connection

$ids = $_GET['id'];

$sql = "UPDATE td_order SET order_status = '2' WHERE Order_ID = $ids";
$result = mysqli_query($conn, $sql);

if ($result) {
    // Redirect to report_order.php if the update was successful
    echo "<script>window.location='report_order.php';</script>";
} else {
    // Display an alert message if the update failed
    echo "<script>alert('ไม่สามารถอัปเดตข้อมูลได้');</script>";
}

mysqli_close($conn);
?>
