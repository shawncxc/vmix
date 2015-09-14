<?php
	include '../config.php';

	//$email = $_POST['loginUsername'];
	$password = $_POST['loginPassword'];
	$username = $_POST['loginUsername'];
	//echo $password." ".$username;

	/*$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "vmix1";*/

	$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

	$sql = "select * from user where user_name = '$username' and user_password = '$password';";
	$result = $conn -> query($sql);

	if($result -> num_rows > 0){
		$row = $result -> fetch_assoc();
		if($row['user_name'] == $username && $row['user_password'] == $password){
			//echo "login successfully!";
			session_start();
			$_SESSION["user_name"] = $row['user_name'];
			$_SESSION["user_id"] = $row['user_id'];
			//header('Location: ../main.php');
			echo "success";
		}
		else{
			echo "error";
			//header('Location: ../login.php');
		}
	}
	else{
		echo "error";
		//header('Location: ../login.php');
	}

	$conn -> close();
?>