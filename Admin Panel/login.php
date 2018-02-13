<?php

session_start();

if(isset($_POST["submit"])){
	if($_POST["user"] == "admin" && $_POST["pass"] == "123"){
		$_SESSION["admin"] = "admin";
	}
}

if(isset($_SESSION["admin"])){
	if(isset($_GET["ref"])){
		header("Location: http://www.gruppe18.tk/" . $_GET["ref"]);
	} else {
		header("Location: http://www.gruppe18.tk/admin.php");
	}
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    
	<?php include("head.php"); ?>

    <title>Signin Template for Bootstrap</title>
	
	<style>
	body {
	  padding-top: 40px;
	  padding-bottom: 40px;
	  background-color: #eee;
	  margin-top: 5%;
	}

	.form-signin {
	  max-width: 330px;
	  padding: 15px;
	  margin: 0 auto;
	}
	.form-signin .form-signin-heading,
	.form-signin .checkbox {
	  margin-bottom: 10px;
	}
	.form-signin .checkbox {
	  font-weight: normal;
	}
	.form-signin .form-control {
	  position: relative;
	  height: auto;
	  -webkit-box-sizing: border-box;
		 -moz-box-sizing: border-box;
			  box-sizing: border-box;
	  padding: 10px;
	  font-size: 16px;
	}
	.form-signin .form-control:focus {
	  z-index: 2;
	}
	.form-signin input[type="email"] {
	  margin-bottom: -1px;
	  border-bottom-right-radius: 0;
	  border-bottom-left-radius: 0;
	}
	.form-signin input[type="password"] {
	  margin-bottom: 10px;
	  border-top-left-radius: 0;
	  border-top-right-radius: 0;
	}
	</style>
	
  </head>

  <body>

    <div class="container">

      <form method="post" action="" class="form-signin">
        <h2 class="form-signin-heading text-center">Admin login</h2>
        <label for="inputUser" class="sr-only">User</label>
        <input type="text" id="inputUser" name="user" class="form-control" placeholder="User" required autofocus>
        <label for="inputPassword" class="sr-only">Pass</label>
        <input type="password" id="inputPassword" name="pass" class="form-control" placeholder="Pass" required>
		<p>user: admin<br>pass: 123</p>
        <button class="btn btn-lg btn-primary btn-block" type="submit" name="submit">Sign in</button>
      </form>

    </div> <!-- /container -->

  </body>
</html>
