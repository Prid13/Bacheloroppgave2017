<?php

$u = "pincodes.php";
include('admin_session.php');
	
include('vendor/httpful/httpful.phar');

if(isset($_GET["pin"])){
	$pincodeID = $_GET["pin"];
	
	$uri = "http://www.gruppe18.tk:8080/api/pincode/test?pincode=" . $pincodeID;
	$pintest = \Httpful\Request::get($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017"}')
		->send();
	
	if($pintest->body->Error)
		$err = $pintest->body->Message;
	
	$pintest = $pintest->body->Tests;
} else {
	$uri = "http://www.gruppe18.tk:8080/api/pincode";
	$pincodes = \Httpful\Request::get($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017"}')
		->send();

	$pincodes = $pincodes->body->Pincodes;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<meta name="description" content="">
<meta name="author" content="">

<!-- Bootstrap core CSS -->
<link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

<!-- Custom fonts for this template -->
<link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

<!-- Plugin CSS -->
<link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">

<!-- jQuery UI -->
<link href="css/jquery-ui.min.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="css/sb-admin.css" rel="stylesheet">
    <title>MemoFrame Admin - New Test</title>
	
	<link href="vendor/image-picker/image-picker.css" rel="stylesheet" type="text/css">
	<link href="vendor/dropzonejs/dropzone.css" rel="stylesheet" type="text/css">
	
	<style>
	  #custom-handle {
		width: 3em;
		height: 1.6em;
		top: 50%;
		margin-top: -.8em;
		text-align: center;
		line-height: 1.6em;
	  }
	  
	  .image_picker_image {
		  width: 200px;
	  }
	</style>

</head>

<body>

    <!-- Navigation -->
	<?php $l = "all_pincodes";
		  include('nav.php'); ?>
	
    <div class="content-wrapper py-3">

        <div class="container-fluid">

            <!-- Breadcrumbs -->
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="admin.php">Dashboard</a></li>
				<?php if(isset($testId)){ ?>
					<li class="breadcrumb-item"><a href="pincodes.php">All Pincodes</a></li>
					<li class="breadcrumb-item active">Pincode: <?= $pincodeID; ?></li>
				<?php } else { ?>
					<li class="breadcrumb-item active">All Pincodes</li>
				<?php } ?>
			</ol>

			<!-- Main Content -->
			
			<?php if(isset($msg)){ ?>
				<div class="alert alert-success">
				  <strong><?= $msg ?></strong>
				</div>
			<?php } else if(isset($err)){ ?>
				<div class="alert alert-danger">
				  <strong><?= $err ?></strong>
				</div>
			<?php } ?>
			
			<div class="p-4">
			
				<?php if(isset($pincodeID) && !isset($err)){ ?>
				
					<!-- Show One Pincode -->
											
						<div class="card mb-3">
							<div class="card-header">
								<span>Opprettet av: <?= $pintest->admin_brukernavn; ?></span>
								<span class="pull-right"><?= date('d. M Y', strtotime($pintest->dato)); ?></span>
							</div>
							<div class="card-block">
								<h4 class="card-title"><?= $pintest->pinkode; ?></h4>
								<h6 class="card-subtitle mb-2 text-muted"><?= $pintest->navn; ?></h6>
							</div>
							<ul class="list-group list-group-flush">
								<li class="list-group-item list-group-item-info"><strong style="padding-right: 5px;">Test ID: </strong><?= $pintest->testid; ?>&nbsp;<a href="http://www.gruppe18.tk/tests.php?id=<?= $pintest->testid; ?>">(Details)</a></li>
								<li class="list-group-item list-group-item-info"><strong style="padding-right: 5px;">Testnavn: </strong><?= $pintest->testnavn; ?></li>
								<li class="list-group-item list-group-item-info"><strong style="padding-right: 5px;">Oppgave: </strong><?= $pintest->oppgavetekst; ?></li>
								<li class="list-group-item list-group-item-<?= $pintest->gyldig ? "success" : "danger"; ?>"><strong style="padding-right: 5px;">Status: </strong> <?= $pintest->gyldig ? "Gyldig" : "Ikke gyldig"; ?></li>
							</ul>
						</div>
						
				<?php } else { ?>
				
					<!-- Show All Pincodes -->
					
					<div class="list-group">
					  <?php foreach($pincodes as $pin){ ?>
					  <a href="pincodes.php?pin=<?= $pin->pinkode; ?>" class="list-group-item list-group-item-action flex-column align-items-start">
						<div class="d-flex w-100 justify-content-between">
						  <h5 class="mb-1"><?= $pin->navn; ?></h5>
						  <small><?= $pin->gyldig ? "gyldig" : "ikke gyldig"; ?></small>
						</div>
						<p><?= $pin->pinkode; ?></p>
						<small>Test ID: <?= $pin->testid; ?></small>
					  </a>
					  <?php } ?>
					</div>
					
				<?php } ?>
				
			</div>
			
			<!-- /Main Content -->

        </div>
        <!-- /.container-fluid -->

    </div>
    <!-- /.content-wrapper -->

    <a class="scroll-to-top rounded" href="#">
	<i class="fa fa-chevron-up"></i>
</a>

<!-- Bootstrap core JavaScript -->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/tether/tether.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>

<!-- Plugin JavaScript -->
<script src="vendor/chart.js/Chart.min.js"></script>
<script src="vendor/datatables/jquery.dataTables.min.js"></script>
<script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

<!-- jQuery UI -->
<script src="vendor/jquery-ui/jquery-ui.min.js"></script>

<!-- Custom scripts for this template -->
<script src="js/sb-admin.min.js"></script>	
	<script src="vendor/image-picker/image-picker.min.js"></script>
	<script src="vendor/imagesloadedjs/imagesloaded.pkgd.min.js"></script>
	<script src="vendor/masonryjs/masonry.pkgd.min.js"></script>
	<script src="vendor/dropzonejs/dropzone.js"></script>
	
	<script>
		Dropzone.autoDiscover = false;
		var $container;
		var toggle = true;
		
		$( function() {
			var handle = $( "#custom-handle" );
			var field = $("#vanskelighetsgrad");
			$( "#slider" ).slider({
			  min: 1,
			  max: 10,
			  value: 1,
			  create: function() {
				handle.text( $( this ).slider( "value" ) );
				field.val(1);
			  },
			  slide: function( event, ui ) {
				handle.text( ui.value );
				field.val(ui.value);
			  }
			});
			
			$("#img-gallery").imagepicker({limit: 4});
			
			initMasonry();
			
			$("div#myDropzone").dropzone({ url: "upload.php" });
			var drop_zone = $("div#myDropzone").get(0).dropzone;
			
			drop_zone.on("complete", function(file) {
				//console.log("images/" + file.name);
				if(file.status == "success"){
					$("#img-gallery").prepend("<option data-img-src='images/"+file.name+"' value='http://www.gruppe18.tk/images/"+file.name+"'>");
					start_val++;
					$("#img-gallery").imagepicker({limit: 4});
					
					initMasonry();
					
					drop_zone.removeAllFiles();
				}
			});
			

		  } );
		  
		  function initMasonry(){
			$container = $('.image_picker_selector');
			
			$container.masonry({
				columnWidth: 30,
				itemSelector: '.thumbnail'
			});
			
			$container.imagesLoaded(function () {
				$container.masonry('layout');
				$container.height('500px');
			});
			
			$('#newRundeModal').on('shown.bs.modal', function () {
			   $container.masonry('layout');
			   $container.height('500px');
			});
			
			$container.on( 'layoutComplete',
			  function( event, laidOutItems ) {
				$container.height('500px');
			  }
			);
		  }
		  
		  function toggleBtn(el){
			  toggle = !toggle;
			  
			  if(toggle)
				el.innerHTML = "<span class='fa fa-plus fa-fw align-middle' aria-hidden='true'></span> Last opp bilder";
			  else
				el.innerHTML = "<span class='fa fa-minus fa-fw align-middle' aria-hidden='true'></span> Skjul opplasting";
		  }
		  
		  function onSubmit(){
			  if($("#img-gallery :selected").length >= 4){
				  return true;
			  } else {
				  alert("Du må velge 4 bilder!");
				  return false;
			  }
		  }
	</script>

</body>

</html>