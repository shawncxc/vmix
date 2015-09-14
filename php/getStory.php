<?php
    session_start();
    $user_id = $_SESSION["user_id"];
    include '../config.php';

	$sql = "select * from story where user_id = $user_id;";
	//echo $sql;
/*	$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "vmix1";*/

	$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
	if($conn -> connect_error){
		die("Connection failed: " . $conn -> connect_error);
	}

	$result = $conn -> query($sql);
        
        
        $array = array();
	while($row = $result -> fetch_assoc()){
		//echo json_encode($row);
		array_push($array, json_encode($row));
	}

	echo json_encode($array);

        
	$conn -> close();
?>
