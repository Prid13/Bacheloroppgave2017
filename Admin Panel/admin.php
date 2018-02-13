<?php

$u = "admin.php";
include('admin_session.php');

$servername = "localhost";
$username = "root";
$password = "raspberry";
$dbname = "TouchPad";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT COUNT(*) AS test_count FROM Test";
$result = $conn->query($sql);

if($result->num_rows > 0){
	$row = $result->fetch_assoc()["test_count"];
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <?php include("head.php"); ?>
    <title>MemoFrame - Dashboard</title>

</head>

<body>

    <?php $l = "dashboard"; include('nav.php'); ?>

    <div class="content-wrapper py-3">

        <div class="container-fluid">

            <!-- Breadcrumbs -->
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">My Dashboard</li>
            </ol>

            <!-- Icon Cards -->
            <div class="row">
                <div class="col-xl-3 col-sm-6 mb-3">
                    <div class="card card-inverse card-primary o-hidden h-100">
                        <div class="card-block">
                            <div class="card-block-icon">
                                <i class="fa fa-fw fa-file-o"></i>
                            </div>
                            <div class="mr-5">
                                <?= $row ?> Tests
                            </div>
                        </div>
                        <a href="new_test.php" class="card-footer clearfix small z-1">
                            <span class="float-left">Create New Test</span>
                            <span class="float-right"><i class="fa fa-angle-right"></i></span>
                        </a>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-3">
                    <div class="card card-inverse card-success o-hidden h-100">
                        <div class="card-block">
                            <div class="card-block-icon">
                                <i class="fa fa-fw fa-list"></i>
                            </div>
                            <div class="mr-5">
                                11 New Tasks!
                            </div>
                        </div>
                        <a href="#" class="card-footer clearfix small z-1">
                            <span class="float-left">View Details</span>
                            <span class="float-right"><i class="fa fa-angle-right"></i></span>
                        </a>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-3">
                    <div class="card card-inverse card-warning o-hidden h-100">
                        <div class="card-block">
                            <div class="card-block-icon">
                                <i class="fa fa-fw fa-shopping-cart"></i>
                            </div>
                            <div class="mr-5">
                                123 New Orders!
                            </div>
                        </div>
                        <a href="#" class="card-footer clearfix small z-1">
                            <span class="float-left">View Details</span>
                            <span class="float-right"><i class="fa fa-angle-right"></i></span>
                        </a>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-3">
                    <div class="card card-inverse card-danger o-hidden h-100">
                        <div class="card-block">
                            <div class="card-block-icon">
                                <i class="fa fa-fw fa-support"></i>
                            </div>
                            <div class="mr-5">
                                13 New Tickets!
                            </div>
                        </div>
                        <a href="#" class="card-footer clearfix small z-1">
                            <span class="float-left">View Details</span>
                            <span class="float-right"><i class="fa fa-angle-right"></i></span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
        <!-- /.container-fluid -->

    </div>
    <!-- /.content-wrapper -->

    <a class="scroll-to-top rounded" href="#">
        <i class="fa fa-chevron-up"></i>
    </a>

    <?php include("footer.php"); ?>

</body>

</html>
