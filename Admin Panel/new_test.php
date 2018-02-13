<?php

$u = "new_test.php";
include('admin_session.php');

include('vendor/httpful/httpful.phar');
$uri = "http://www.gruppe18.tk:8080/api/test";

if(isset($_POST["submit"])){
	
	$response = \Httpful\Request::post($uri)
		->sendsJson()
		->body(sprintf('{"admin":true, "passkey": "bachelor2017", "testnavn": "%s", "beskrivelse":"%s", "tekst":"%s", "delay":%u, "vanskelighetsgrad":%u, "gyldig":%u, "random":%u, "random_runder":%u, "rundetekst":"%s", "antall_bilder":%u}', $_POST['testnavn'], $_POST['beskrivelse'], $_POST['tekst'], $_POST['delay'], $_POST['vanskelighetsgrad'], $_POST['gyldig'], $_POST['random'], $_POST['runder'], $_POST['rundetekst'], $_POST['antallBilder']))
		->send();
		
	$json = json_decode($response);
	
	if(!$json->Error && !is_null($json)){
		$msg = "Testen ble lagret!";
	} else {
		$err = "Noe gikk galt, vennligst prøv igjen!";
	}
}

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

    <?php 	$l = "new_test";
			include('nav.php'); ?>

    <div class="content-wrapper py-3">

        <div class="container-fluid">

            <!-- Breadcrumbs -->
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="admin.php">Dashboard</a></li>
                <li class="breadcrumb-item active">New Test</li>
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
					<label class="control-label col-xs-3" for="firstName">Navn på test:</label>
					<div class="col-xs-9">
						<input type="text" class="form-control" name="testnavn" id="testNavn" placeholder="Navn" required="required">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-3" for="lastName">Kort beskrivelse:</label>
					<div class="col-xs-9">
						<input type="text" class="form-control" name="beskrivelse" id="beskrivelse" placeholder="Beskrivelse" required="required">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-3" for="inputEmail">Oppgavetekst:</label>
					<div class="col-xs-9">
						<input type="text" class="form-control" name="tekst" id="oppgaveTekst" placeholder="Tekst" required="required">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-3" for="phoneNumber">Tidsdelay:</label>
					<div class="col-xs-9">
						<input type="number" class="form-control" name="delay" id="tidsDelay" min="0" max="20" value="2" required="required">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-3" for="phoneNumber">Vanskelighetsgrad:</label>
					<div class="col-xs-9">
						<div id="slider">
							<div id="custom-handle" class="ui-slider-handle"></div>
						</div>
						<input type="hidden" id="vanskelighetsgrad" name="vanskelighetsgrad" value="1">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-3">Random bilder?</label>
					<div class="col-xs-2">
						<label class="radio-inline">
							<input type="radio" class="random" name="random" value="1" checked> Ja
						</label>
					</div>
					<div class="col-xs-2">
						<label class="radio-inline">
							<input type="radio" class="random" name="random" value="0"> Nei
						</label>
					</div>
				</div>
				<div class="form-group box">
					<label class="control-label col-xs-3" for="phoneNumber">Antall runder:</label>
					<div class="col-xs-9">
						<input type="number" class="form-control" name="runder" id="antallRunder" min="1" value="1">
					</div>
				</div>
				<div class="form-group box">
					<label class="control-label col-xs-3" for="antallBilder">Bilder per runde:</label>
					<div class="col-xs-9">
						<input type="number" class="form-control" name="antallBilder" id="antallBilder" min="1" value="4">
					</div>
				</div>
				<div class="form-group box">
					<label class="control-label col-xs-3" for="inputRundetekst">Rundetekst:</label>
					<div class="col-xs-9">
						<input type="text" class="form-control" name="rundetekst" id="inputRundetekst" placeholder="Tekst">
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
						<input type="submit" name="submit" class="btn btn-primary" value="Legg til test">
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
			
			$('.random').click(function(){
				var inputValue = $(this).attr("value");
				
				if(inputValue == "1")
					$(".box").show();
				else
					$(".box").hide();
			});
		  } );
	</script>

</body>

</html>

