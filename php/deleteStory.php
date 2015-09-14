<?php
	include '../config.php';

    session_start();
    $story_id = $_GET['story_id'];


	$sql = "delete from story where story_id = $story_id;";
	echo $sql;

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
