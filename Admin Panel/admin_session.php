<?php

session_start();

if(!isset($_SESSION["admin"])){
	header("Location: http://www.gruppe18.tk/login.php?ref=" . $u);
}

?>