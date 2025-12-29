
<?php 
include 'condb.php'; // Assuming this file contains your database connection

$ids = $_GET['id'];

$sql1 = "SELECT * FROM td_order t, payment m WHERE t.Order_ID=m.Order_ID AND t.Order_ID = '$ids'";

$result1 = mysqli_query($conn, $sql1); // Corrected variable name
$row1 = mysqli_fetch_array($result1);
$image_bill = $row1['pay_image'];
?>



<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>report</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    </head>
    <body class="sb-nav-fixed">
        <?php include 'menu1.php'; ?>

            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">

                        <div class="card mb-4 mt-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                แสดงรายการสินค้า
                                
                            <div>
                                <br>
                            <a href="report_order.php"><button type="button" class="btn btn-success ">กลับหน้าหลัก</button></a>
                            </div>
                            <br>
                         
                            <div class="card-body">
                                <h5>เลขที่ใบสั่งซื้อ : <?=$ids?></h5>
                                <table  class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>รหัสสินค้า</th>
                                            <th>ชื่อสินค้า</th>
                                            <th>ราคา</th>
                                            <th>จำนวน</th>
                                            <th>ราคารวมสุทธิ</th>
                             
                                        </tr>
                                    </thead>
                                  


                                    <?php 

                                        $sql ="select * from td_order t, order_detail d, products p where t.Order_id=d.Order_id 
                                        and d.Product_ID=p.Product_ID and d.Order_id='$ids' order by d.Product_ID ";
                                        $result = mysqli_query($conn, $sql);
                                        $sum_total=0;
                                        while ($row = mysqli_fetch_assoc($result)) {
                                            $sum_total=$row['UnitPrice']

                                        
                                    ?>

                                        <tr>
                                            <td><?=$row['Product_ID']?></td>
                                            <td><?=$row['name']?></td>
                                            <td><?=$row['price']?></td>
                                            <td><?=$row['orderQty']?></td>
                                            <td><?=$row['UnitPrice']?></td>
                                       
                                        </tr>      
                                    <?php 
                                    }
                                    mysqli_close($conn);
                                    ?>
                                </table>
                                <b>ราคารวมสุทธิ $<?=number_format($sum_total,2)?> </b>

                            </div>
                        </div>
                            <?php 
                                if($image_bill <> ""){
                            ?>
                            <h6>หลักฐานการชำระเงิน</h6><br>
                            <img src="./img/payment/<?=$row1['pay_image']?>" width="300px">


                            <?php } else{
                                echo " <h6>ยังไม่ได้ชำระเงิน</h6> ";
                            }
                            ?>
                            
                        


                    </div>
                </main>
                <?php include 'footer.php'; ?>

            </div>
        </div>
        </body>
</html>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>

