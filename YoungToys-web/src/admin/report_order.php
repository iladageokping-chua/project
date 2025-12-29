<?php include 'condb.php'; ?>

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
                                แสดงข้อมูลการสั่งซื้อสินค้า(ยังไม่ได้ชำระเงิน)
                                
                            <div>
                                <br>
                            <a href="report_order_yes.php"><button type="button" class="btn btn-success ">ชำระเงินแล้ว</button></a>
                            <a href="report_order.php"><button type="button" class="btn btn-success">ยังไม่ชำระเงิน</button></a>
                            <a href="report_order_no.php"><button type="button" class="btn btn-success">ยกเลิกใบสั่งซื้อ</button></a>
                            </div>
                            <br>
                            <div>
<form name="form1" method="POST"action="report_order.php">
 <div class="row">
    <div class="col-sm-2">
      <input type="data" name="dt1"class="form-control">
    </div>
    <div class="col-sm-2">
    <input type="data" name="dt2"class="form-control">
    </div>
    <div class="col-sm-4">
    <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i></button>
    </div>
  </div>
  </form>
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple" class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>เลขที่ใบสั่งซื้อ</th>
                                            <th>ลูกค้า</th>
                                            <th>เบอร์โทรศัพท์</th>
                                            <th>ที่อยู่</th>
                                            <th>ราคารวมสุทธิ</th>
                                            <th>วันที่สั่งซื้อ</th>
                                            <th>สถานะ</th>
                                            <th>รายละเอียด</th>
                                            <th>ปรับสถานะการชำระเงิน</th>
                                            <th>ยกเลิกการสั่งซื้อ</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Order_ID</th>
                                            <th>username</th>
                                            <th>phone_number</th>
                                            <th>address</th>
                                            <th>UnitPrice</th>
                                            <th>order_status</th>
                                        </tr>
                                    </tfoot>


                                    <?php 
                                        $ddt1=@$_POST['dt1'];
                                        $ddt2=@$_POST['dt2'];
                                        $add_date=date('Y/m/d',strtotime($ddt2."+1 days"));
                                        
                                        if(($ddt1 !="") &($ddt2 !="")){
                                             echo "ค้นหาจากวันที่ $ddt1 ถึง $ddt2 ";
                                             $sql ="select * from td_order where order_status='1'and order_date BETWEEN '$ddt1'and '$ddt2'
                                             order by order_date DESC";
                                        }else{
                                            $sql ="select * from td_order where order_status='1'order by order_date DESC";
                                        }
                                        
                                        $result = mysqli_query($conn, $sql);
                                        while ($row = mysqli_fetch_assoc($result)) {
                                        $status = $row['order_status'];
                                        
                                    ?>

                                        <tr>
                                            <td><?=$row['Order_ID']?></td>
                                            <td><?=$row['username']?></td>
                                            <td><?=$row['phone_number']?></td>
                                            <td><?=$row['address']?></td>
                                            <td><?=$row['UnitPrice']?></td>
                                            <td><?=$row['order_date']?></td>
                                            <td>
                                                <?php 
                                                if ($status == 1) {
                                                    echo "ยังไม่ชำระเงิน";
                                                }else if ($status == 2) {
                                                    echo "<b style='color:green'>ชำระเงินแล้ว</b>";
                                                }else if ($status == 0) {
                                                    echo "<b style='color:red'>ยกเลิกการสั่งซื้อ</b>";                                               
                                                }
                                                ?>
                                            </td>
                                            <td><a href="report_order_detail.php?id=<?=$row['Order_ID']?>" class="btn btn-success" 
                                            onclick="del1(this.href); return false;">รายละเอียด</a></td>
                                            
                                            <td><a href="pay_order.php?id=<?=$row['Order_ID']?>" class="btn btn-warning" 
                                            onclick="del1(this.href); return false;">ปรับสถานะ</a></td>
                                           
                                            <td><a href="cancel_order.php?id=<?=$row['Order_ID']?>" class="btn btn-danger" 
                                            onclick="del(this.href); return false;">ยกเลิก</td>
                                        </tr>
                                    <?php 
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action === 'confirm') {
        $sql_update = "UPDATE td_order SET order_status = '2' WHERE Order_ID = $ordernum";
        if ($conn->query($sql_update) === TRUE) {
            echo "อัปเดตสถานะออเดอร์เป็น 2 (Confirmed) เรียบร้อยแล้ว";
        } else {
            echo "มีข้อผิดพลาดในการอัปเดตสถานะ: " . $conn->error;
        }
    } elseif ($action === 'cancel') {
        $sql_update = "UPDATE td_order SET order_status = '0' WHERE Order_ID = $ordernum";
        if ($conn->query($sql_update) === TRUE) {
            echo "อัปเดตสถานะออเดอร์เป็น 0 (Cancelled) เรียบร้อยแล้ว";
        } else {
            echo "มีข้อผิดพลาดในการอัปเดตสถานะ: " . $conn->error;
        }
    }
}

                                    }
                                    mysqli_close($conn);
                                    ?>
                                </table>
                            </div>
                        </div>
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
<script>
function del(mypage){
    var agree=confirm('คุณต้องการยกเลิกใบสั่งซื้อสินค้าหรือไม่');
    if(agree){
        window.location=mypage;
    }
}
function del1(mypage1){
    var agree=confirm('คุณต้องการปรับสถานะการชำระเงินหรือไม่');
    if(agree){
        window.location=mypage1;
    }
}


    </script>

