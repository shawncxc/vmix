<?php
	include '../config.php';

	$email = $_POST['SignupUsername'];
	$password = $_POST['SignupPassword'];
	$username = $_POST['Username'];
	//echo $email." ".$password." ".$username;

	$sql = "insert into user (user_name, user_mail, user_password)
			values ('$username', '$email', '$password');";
	//echo $sql;
	/*$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "vmix1";*/

	$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
	if($conn -> connect_error){
		die("Connection failed: " . $conn -> connect_error);
	}

	$conn -> query($sql);
	$conn -> close();
?>

