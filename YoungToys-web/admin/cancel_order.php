<?php
include 'condb.php';
$ids=$_GET['id'];


$sql = "UPDATE td_order SET order_status = '0' WHERE Order_ID = $ids";
$result=mysqli_query($conn,$sql);
if($result){
    
    echo "<script>window.location='report_order.php';</script>";
}else{
    echo "<script>alert('ไม่สามารถลบข้อมูลได้');</script>";
}

mysqli_close($conn);

?>