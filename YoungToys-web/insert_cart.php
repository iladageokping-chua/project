<?php
session_start();
include 'condb.php';
$cusName=$_POST['cus_name'];
$cusMail=$_POST['cus_mail'];
$cusAddress=$_POST['cus_add'];
$cusTel=$_POST['cus_tel'];

$sql="INSERT INTO td_order(username, email, address, phone_number, UnitPrice, order_status)
values('$cusName', '$cusMail', '$cusAddress', '$cusTel', '".$_SESSION["sum_price"]."','1')";

mysqli_query($conn, $sql);

$orderID = mysqli_insert_id($conn);
$_SESSION["order_id"] = $orderID;

for($i=0; $i <= (int)$_SESSION["intLine"]; $i++){
    if(($_SESSION["strProductID"][$i]) != ""){
        //ดึงข้อมูลสินค้า
        $sql1 = "SELECT * FROM products WHERE Product_ID = '".$_SESSION["strProductID"][$i]."' ";
        $result1 = mysqli_query($conn, $sql1);
        $row1 = mysqli_fetch_array($result1);
        $price = $row1['price'];
        $total = $_SESSION["strQty"][$i]*$price;

        $sql2 = "INSERT INTO order_detail(Order_ID, Product_ID, orderPrice, orderQty, Total)
        values('$orderID', '".$_SESSION["strProductID"][$i]."','$price', 
        '".$_SESSION["strQty"][$i]."', '$total')";
        if(mysqli_query($conn, $sql2)){
            $sql3 = "UPDATE products SET stock= stock -'".$_SESSION["strQty"][$i]."'
            WHERE Product_ID='".$_SESSION["strProductID"][$i]."'";
            mysqli_query($conn, $sql3);
            //echo "<script>alert('บันทึกเรียบร้อยแล้ว')</script>";
            echo "<script> window.location='print_order.php'; </script>";
        }
    }
}
mysqli_close($conn);
unset($_SESSION["intLine"]);
unset($_SESSION["strProductID"]);
unset($_SESSION["strQty"]);
unset($_SESSION["sum_price"]);

?>