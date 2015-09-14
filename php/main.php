<?php
//echo $_GET['first']." ".$_GET['second'];
	include '../config.php';

	/*$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "vmix";*/

	$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
	$sql = "select * from clients;";
	$result = $conn -> query($sql);

	$row = $result -> fetch_assoc();
	//echo $row;
	echo json_encode($row);
?>