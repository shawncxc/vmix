<?php
	session_unset(); 
	session_destroy();
	//echo $_SESSION["user_name"];
	header('Location: login.php');
?>