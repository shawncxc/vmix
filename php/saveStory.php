<?php
    include '../config.php';

    session_start();
	$storyTitle = $_GET['storyTitle'];
	$decription = $_GET['decription'];
	$story_json = $_GET['story_json'];
        $user_id = $_SESSION["user_id"];
	echo $storyTitle." ".$decription." ".$story_json." ".$user_id;


	$sql = "insert into story (user_id,  story_name, story_description, story_tag, story_json)
			values ('$user_id', '$storyTitle', '$decription', 'movie', '$story_json');";
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

