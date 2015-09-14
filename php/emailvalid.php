<?php
	include '../config.php';

	$email = $_GET['email'];

	/*$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "vmix1";*/

	$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

	$sql = "select * from user where user_mail = '$email';";
	//echo $sql;
	$result = $conn -> query($sql);

	if($result -> num_rows > 0){
		echo "exsisted";
	}
	else{
		echo "notexsist";
	}

	$conn -> close();
?>