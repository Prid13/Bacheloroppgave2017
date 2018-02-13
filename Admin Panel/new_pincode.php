<?php

$u = "new_pincode.php";
include('admin_session.php');

include('vendor/httpful/httpful.phar');

if(isset($_POST["submit"])){
	$uri = "http://www.gruppe18.tk:8080/api/pincode";
	$response = \Httpful\Request::post($uri)
		->sendsJson()
		->body(sprintf('{"admin":true, "passkey": "bachelor2017", "navn": "%s", "admin":%u, "testid":%u, "gyldig":%u}', $_POST['navn'], 1, $_POST['testid'], $_POST['gyldig']))
		->send();
		
	$json = json_decode($response);
	
	if(!$json->Error && !is_null($json)){
		$msg = "Pinkode opprettet! PIN: <b>".$json->Pinkode."</b>";
	} else {
		$err = "Noe gikk galt, vennligst prøv igjen!";
	}
}

$uri = "http://www.gruppe18.tk:8080/api/test";

$tests = \Httpful\Request::get($uri)
		->expectsJson()
		->sendsJson()
		->body('{"admin":true, "passkey": "bachelor2017"}')
		->send();
	
	if($tests->body->Error)
		$err = $tests->body->Message;
	
	$tests = $tests->body->Tests;

?>

<!DOCTYPE html>
<html lang="en">

<head>

	<?php include("head.php"); ?>

    <title>MemoFrame Admin - New Test</title>
	
	<style>
	  #custom-handle {
		width: 3em;
		height: 1.6em;
		top: 50%;
		margin-top: -.8em;
		text-align: center;
		line-height: 1.6em;
	  }
	  
	  
	</style>

</head>

<body>

    <?php 	$l = "new_pincode";
			include('nav.php'); ?>

    <div class="content-wrapper py-3">

        <div class="container-fluid">

            <!-- Breadcrumbs -->
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="admin.php">Dashboard</a></li>
                <li class="breadcrumb-item active">New Pincode</li>
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
			
			<form class="form-horizontal p-4 col-md-6" method="post" action="<?= $_SERVER['PHP_SELF']; ?>">
				<div class="form-group">
					<label class="control-label col-xs-3" for="testNavn">Navn for pinkode:</label>
					<div class="col-xs-9">
						<input type="text" class="form-control" name="navn" id="testNavn" placeholder="Navn" required="required">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-3" for="firstName">Velg test:</label>
					<div class="col-xs-9">
						<select class="form-control" name="testid" id="testNavn">
							<?php foreach($tests as $test){ ?>
								<option value="<?= $test->testid; ?>"><?= $test->testnavn . " (ID: " . $test->testid . ")"; ?></option>
							<?php } ?>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-3">Gyldig?</label>
					<div class="col-xs-2">
						<label class="radio-inline">
							<input type="radio" name="gyldig" value="1" checked> Ja
						</label>
					</div>
					<div class="col-xs-2">
						<label class="radio-inline">
							<input type="radio" name="gyldig" value="0"> Nei
						</label>
					</div>
				</div>
				<br>
				<div class="form-group">
					<div class="col-xs-offset-3 col-xs-9">
						<input type="submit" name="submit" class="btn btn-primary" value="Legg til pinkode">
						<input type="reset" class="btn btn-default" value="Tilbakestill">
					</div>
				</div>
			</form>
			
			<!-- /Main Content -->

        </div>
        <!-- /.container-fluid -->

    </div>
    <!-- /.content-wrapper -->

    <?php include("footer.php"); ?>
	
	<script>
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
		  } );
	</script>

</body>

</html>

