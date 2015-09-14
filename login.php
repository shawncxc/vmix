<!doctype html>
<html lang="en">
	<head>
		<!--bootstrap-->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<!-- jquery -->
		<link href="css/login-style.css" type="text/css" rel="stylesheet">
		<script src="js/jquery-ui/jquery.js"></script>
		<script src="js/login.js"></script>
		<title>Welcome To V-Mix</title>
	</head>
	<body>
		<div id="top">
			<nav class="navbar navbar-static-top navbar-inverse">
				<div class="container-fluid">
					<div class="navbar-header">
						<div id="logoname" class="navbar-brand">mr. V mix</div>
					</div>
					<div>
						<ul class="nav navbar-nav navbar-right">
							<li><a href="login.php">V home</a></li>
							<li><a href="#aboutproj">About Project</a></li>
							<li><a href="aboutus.php" id="aboutus">About Us</a></li>
							
						</ul>
					</div>
				</div>
			</nav>
			<div id="block">
			</div>
		</div>
		<!--<iframe id="bgvid" src="https://www.youtube.com/embed/P5_GlAOCHyE?controls=0&&enablejsapi=1&disablekb=1&autoplay=1&loop=1&playlist=P5_GlAOCHyE&fs=0" frameborder="0"></iframe>
		<video id="bgvid" autoplay loop>
			<source src="http://localhost/VMix/video/login.mp4" type="video/mp4"/>
		</video>-->
		<img id="bgvid" src="img/rose.gif">
		<!-- <div class="container"> -->
			
		<div id="mid">
			<div id="display">
				<img id="logo" src="img/MrVmix.png"></img>
			</div>
			<div id="logSig">
				<div id="loginAndsignup" class="loginpage">
					<ul class="nav nav-pills" id="sheetslink" >
						<li id="log" class="active"><a href="#">Login</a></li>
						<li id="sig"><a href="#">Sign Up</a></li>
					</ul>
					<div id="sheets" class="form-group">
						<form id="loginSheet" action="php/login.php" method="post">
							<label for="loginUsername">Username:</label>
							<input class="form-control" id="loginUsername" name="loginUsername" type="text" placeholder="Enter Username here"/>
							<label for="loginPassword">Password:</label> 
							<input class="form-control" id="loginPassword" name="loginPassword" type="text" placeholder="Enter Password here"/>
							<li><input type="submit" class="btn btn-success btn-block" value="Login"/></li>
							<li id="loginerror"></li>
						</form>
						<form id="signupSheet" action="php/register.php" method="post">
							<label for="SignupUsername">Email Address:</label> 
							<input class="form-control" id="SignupUsername" name="SignupUsername" type="text" placeholder="Enter Your Email here"/>
							<div id="SignupUsernameError"></div>

							<label for="Username">Username:</label> 
							<input class="form-control" id="Username" name="Username" type="text" placeholder="Enter your own username"/>
							<div id="UsernameError"></div>

							<label for="SignupPassword">Password:</label> 
							<input class="form-control" id="SignupPassword" name="SignupPassword" type="text" placeholder="Enter Password here"/>
							<div id="SignupPasswordError"></div>

							<label for="ConfirmPassword">Confirm Password:</label> 
							<input class="form-control" id="ConfirmPassword" name="ConfirmPassword" type="text" placeholder="Confirm Password here"/></li>
							<div id="ConfirmPasswordError"></div>

							<li><input type="submit" class="btn btn-warning btn-block" value="Sign Up"/></li>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div id="bottom">
			<div class="margin"></div>
			<div id="bottom_container">
				<div class="foot_info">
					<a>Learn</a><br>
					<a>Engagement</a><br>
					<a>MrVmix</a><br>
				</div>
				<div class="foot_info">
					<a>About</a><br>
					<a>Our Team</a><br>
					<a>Privacy</a><br>
					<a>Terms of use</a><br>
				</div>
				<div class="foot_info">
					<a>Support</a><br>
					<a>FAQ</a><br>
					<a>Contact us</a><br>
				</div>				
			</div>
			<div class="margin"></div>

		</div>
	</body>
</html>