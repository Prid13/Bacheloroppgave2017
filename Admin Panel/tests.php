<?php

include("config.php");

$u = "tests.php";
include('admin_session.php');
	
include('vendor/httpful/httpful.phar');

if(isset($_POST["submit"])){
	$str = "[";
	
	foreach($_POST["imagesSelect"] as $img){
		$str .= "\"" . $img . "\", ";
	}
	
	$str = substr($str, 0, -2) . "]";
	
	$uri = "http://www.gruppe18.tk:8080/api/test/runde";
	$ny_test = \Httpful\Request::post($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017", "testid": '.$_POST["testId"].', "rundenr": '.$_POST["rundenr"].', "tekst": "'.$_POST["rundenavn"].'", "bilder": '.json_encode($str).'}')
		->send();
		
	$error = $ny_test->body;
	
	if($error->Error)
		$err = $error->Message;
	else
		$msg = "Testrunden ble lagt til!";
}

if(isset($_GET["id"])){
	$testId = $_GET["id"];
	
	$uri = "http://www.gruppe18.tk:8080/api/test/" . $testId;
	$test = \Httpful\Request::get($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017"}')
		->send();
	
	$uri = "http://www.gruppe18.tk:8080/api/test/runde?testid=" . $testId;
	$testrunder = \Httpful\Request::get($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017"}')
		->send();
		
	$uri = "http://www.gruppe18.tk:8080/api/images";
	$images = \Httpful\Request::get($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017"}')
		->send();
	
	if($test->body->Error)
		$err = $test->body->Message;
	
	$test = $test->body->Tests[0];
	$testrunder = $testrunder->body->Testrunder;
	$images = $images->body->images;
} else {
	$uri = "http://www.gruppe18.tk:8080/api/test";
	$tests = \Httpful\Request::get($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017"}')
		->send();

	$tests = $tests->body->Tests;
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
	<?php $l = "all_tests";
		  include('nav.php'); ?>
	
    <div class="content-wrapper py-3">

        <div class="container-fluid">

            <!-- Breadcrumbs -->
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="admin.php">Dashboard</a></li>
				<?php if(isset($testId)){ ?>
					<li class="breadcrumb-item"><a href="tests.php">All Tests</a></li>
					<li class="breadcrumb-item active">Test ID: <?= $testId; ?></li>
				<?php } else { ?>
					<li class="breadcrumb-item active">All Tests</li>
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
			
				<?php if(isset($testId) && !isset($err)){ ?>
									
					<!-- Show One Test -->
											
						<div class="card mb-3">
							<div class="card-header">
								<span>Opprettet av: <?= $test->creator; ?></span>
								<span class="pull-right"><?= date('d. M Y', strtotime($test->dato)); ?></span>
							</div>
							<div class="card-block">
								<h4 class="card-title"><?= $test->testnavn; ?></h4>
								<h6 class="card-subtitle mb-2 text-muted"><?= $test->testbeskrivelse; ?></h6>
							</div>
							<ul class="list-group list-group-flush">
								<li class="list-group-item list-group-item-info"><strong style="padding-right: 5px;">Oppgave: </strong><?= $test->oppgavetekst; ?></li>
								<li class="list-group-item list-group-item-info"><strong style="padding-right: 5px;">Tidsdelay: </strong> <?= $test->tidsdelay; ?></li>
								<li class="list-group-item list-group-item-info"><strong style="padding-right: 5px;">Vanskelighetsgrad: </strong> <?= $test->vanskelighetsgrad; ?></li>
								<li class="list-group-item list-group-item-<?= $test->gyldig ? "success" : "danger"; ?>"><strong style="padding-right: 5px;">Status: </strong> <?= $test->gyldig ? "Gyldig" : "Ikke gyldig"; ?></li>
							</ul>
						</div>
						
						<div class="card">
							<div class="card-block clearfix">
								<h5 class="card-title pull-left">Testrunder: <?= count($testrunder); ?></h5>
								<div class="btn-group pull-right">
									<a class="btn btn-success" href="#" data-toggle="modal" data-target="#newRundeModal" role="button"><span class="fa fa-plus align-middle" aria-hidden="true"></span></a>
								</div>
							</div>
							<ul class="list-group list-group-flush">
								<?php foreach($testrunder as $testrunde){ ?>
									<li class="list-group-item list-group-item-action">
										<div class="container">
											<div class="row">
												<div class="col-md-1"><strong style="padding-right: 5px;">#<?= $testrunde->rundenr; ?> </strong></div>
												<div class="col-md-9"><?= $testrunde->tekst; ?></div>
												<div class="col-md-2 text-right"><button type="button" class="btn btn-sm btn-info" data-toggle="collapse" data-target="#bilder<?= $testrunde->rundenr; ?>">Vis bilder</button></div>
											</div>
											<div class="container row collapse" id="bilder<?= $testrunde->rundenr; ?>">
												<div class="row">
													<?php foreach($testrunde->bilder as $bilde){ ?>
														<div class="col-sm-2"><a target="_blank" href="<?= $bilde; ?>"><img src="<?= $bilde; ?>" class="img-fluid img-thumbnail"></a></div>
													<?php } ?>
												</div>
											</div>
										</div>
									</li>
								<?php } ?>
							</ul>
						</div>
						
						<!-- Modal -->
						
						<div class="modal fade" id="newRundeModal">
						  <div class="modal-dialog modal-lg" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<h5 class="modal-title">Ny Testrunde</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								  <span aria-hidden="true">&times;</span>
								</button>
							  </div>
							  <div class="modal-body">
								<form class="form-horizontal p-4" method="post" action="/tests.php">
									<h5 class="mb-4">Runde #<?= count($testrunder) + 1; ?></h5>
									<div class="form-group">
										<label class="control-label col-xs-3" for="firstName">Tekst for runden:</label>
										<div class="col-xs-9">
											<input type="text" class="form-control" name="testnavn" id="testNavn" placeholder="Tekst" required="required" value="Ikke finn Zain">
										</div>
									</div>
									
										<label class="control-label col-xs-3" for="lastName">Velg bilder:</label>
										<div class="btn-group pull-right">
											<a class="btn btn-primary" href="#" data-toggle="collapse" data-target="#myDropzone" role="button"><span class="fa fa-plus fa-fw align-middle" aria-hidden="true"></span> Last opp bilder</a>
										</div>
										<div id="myDropzone" class="collapse dropzone" style="margin-top: 10px;"></div>
										<div class="col-xs-9 mt-4">
											<select class="image-picker masonry" multiple="multiple" id="img-gallery">
												<?php $i = 1; foreach($images as $image){ ?>
													<option data-img-src="<?= $image; ?>" value="<?= $i++; ?>">
												<?php } ?>
											</select>
										</div>
									
								</form>
							  </div>
							  <div class="modal-footer">
								<button type="button" class="btn btn-primary">Legg til runde</button>
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Avbryt</button>
							  </div>
							</div>
						  </div>
						</div>
						
				<?php } else { ?>
				
					<!-- Show All Tests -->
					
					<div class="list-group">
					  <?php foreach($tests as $test){ ?>
					  <a href="tests.php?id=<?= $test->testid; ?>" class="list-group-item list-group-item-action flex-column align-items-start">
						<div class="d-flex w-100 justify-content-between">
						  <h5 class="mb-1"><?= $test->testnavn; ?></h5>
						  <small><?= $test->gyldig ? "gyldig" : "ikke gyldig"; ?></small>
						</div>
						<p class="mb-1"><?= $test->testbeskrivelse; ?></p>
					    <small>Testrunder: <?= $test->antall_runder ? $test->antall_runder : 0; ?></small>
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

	<?php include("footer.php"); ?>
	
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
			
			$("#img-gallery").imagepicker({limit: <?= $config["img_gallery_limit"]; ?>});
			
			initMasonry();
			
			$("div#myDropzone").dropzone({ url: "upload.php" });
			var drop_zone = $("div#myDropzone").get(0).dropzone;
			
			drop_zone.on("complete", function(file) {
				//console.log("images/" + file.name);
				if(file.status == "success"){
					$("#img-gallery").prepend("<option data-img-src='images/"+file.name+"' value='http://www.gruppe18.tk/images/"+file.name+"'>");
					$("#img-gallery").imagepicker({limit: <?= $config["img_gallery_limit"]; ?>});
					
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
				
			});
			
			$('#newRundeModal').on('shown.bs.modal', function () {
			   $container.masonry('layout');
			   
			});
			
			$container.on( 'layoutComplete',
			  function( event, laidOutItems ) {
				
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