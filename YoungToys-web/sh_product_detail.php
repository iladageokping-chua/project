<?php include 'condb.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Young Toys</title>
        <!-- Bootstrap CSS -->
        <link href="bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <?php include 'menu.php';?>
    <div class="container">
        <div class="row">
            <?php 
            $ids=$_GET['id'];
            $sql="SELECT * FROM products WHERE Product_ID and products.Product_ID='$ids' ";
            $result = mysqli_query($conn, $sql);
            $row=mysqli_fetch_array($result);
            ?>
                <div class="col-md-4">
                    <img src="img/<?=$row['image']?>" width="350px" class="mt-5 p-2 my-2 boder"/>
                </div>
                <div class="col-md-6">
                    <br></br>
                ID: <?=$row['Product_ID']?><br>
                <h5 class="text-success"><?=$row['name']?></h5><br>
                detail: <?=$row['description']?><br>
                price: <b class="text-danger"><?=$row['price']?></b> $<br>
                <a class="btn btn-outline-success mt-3" href="order.php?id=<?=$row['Product_ID']?>">Add cart</a>

                </div>
        </div>
    </div>
    
</body>
</html>