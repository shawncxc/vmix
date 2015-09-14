$(document).ready(function(){
	//initial
	$('#signupSheet').hide();

	//toggle back and forth, Login and Sign Up
	$('#sig').click(function(){
		$('#loginSheet').hide();
		$('#signupSheet').fadeIn();
		$('#log').removeClass("active");
		$('#sig').addClass("active");
	});
	$('#log').click(function(){
		$('#signupSheet').hide();
		$('#loginSheet').fadeIn();
		$('#sig').removeClass("active");
		$('#log').addClass("active");
	});
	
	//validation variable
	var emailValid = false;
	var usernameValid = false;
	var passValid = false;
	var confrmPassValid = false;

	//check email
	$('#SignupUsername').on('blur', function(e){
		e.preventDefault();
		function isValidEmailAddress(emailAddress) {
    		var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    		return pattern.test(emailAddress);
		};
		var email = $(this).val();
		if(email === ""){
			emailValid = false;
			$('#SignupUsernameError').html('<font color="red">Email can not be empty.</font>');
		} 
		else if(!isValidEmailAddress(email)){
			emailValid = false;
			$('#SignupUsernameError').html('<font color="red">Email is invalid.</font>');
		}
		else{
			emailValid = true;
			$('#SignupUsernameError').html('');
		}

		$.ajax({
			type: "GET",
			data: {email : email},
			url: "http://localhost/VMix/php/emailvalid.php",
			success: function(response){
				console.log(response);
				if(response === "exsisted"){
					mailValid = false;
					$('#SignupUsernameError').html('<font color="red">Email exsisted.</font>');
				}
				else{
					mailValid = true;
					$('#SignupUsernameError').html('');
				}
			}
		});
	});	

	//check username
	$('#Username').on('blur', function(){
		var username = $(this).val();
		if(username === ""){
			usernameValid = false;
			$('#UsernameError').html('<font color="red">Username can not be empty.</font>');
		}
		else{
			usernameValid = true;
			$('#UsernameError').html('');
		}
	});

	//check password
	$('#SignupPassword').on('blur', function(){
		var password = $('#SignupPassword').val();
		if(password === ""){
			passValid = false;
			$('#SignupPasswordError').html('<font color="red">Password can not be empty.</font>');
		}
		else{
			passValid = true;
			$('#SignupPasswordError').html('');
		}
	});

	//check confirmed password
	$('#ConfirmPassword').on('blur', function(){
		var password = $('#SignupPassword').val();
		var confrmpassword = $(this).val();
		if(password !== $(this).val() || confrmpassword === ""){
			confrmPassValid = false;
			$('#ConfirmPasswordError').html('<font color="red">Please confirm your password.</font>');
		}
		else{
			confrmPassValid = true;
			$('#ConfirmPasswordError').html('');
		}
	});

	//php sign up
	$('#signupSheet').on('submit', function(e){
		e.preventDefault();
		
		//insert new user info
		if(usernameValid && emailValid && passValid && confrmPassValid){
			var dataStr = $('#signupSheet').serialize();
			$.ajax({
				type: "POST",
				url: "http://localhost/VMix/php/register.php", 
				data: dataStr,
				success: function(){
					window.location.href="http://localhost/VMix/main.php";
					console.log("shoud jumpto");
				}
			});
		}
		else{
			alert("Please check the sign up form.");
		}
	});

	//php login 
	$('#loginSheet').on('submit', function(e){
		e.preventDefault();
		var dataStr = $('#loginSheet').serialize();
		$.ajax({
			type: "POST",
			url: "http://localhost/VMix/php/login.php",
			data: dataStr,
			success: function(response){
				if(response == "error"){
					$('#loginerror').html('<font color="red">Password or Username is wrong.</font>');
					//console.log("login failed");
				}
				else{
					window.location.href="http://localhost/VMix/main.php";
				}
			}
		});
	});

	var loadpageOnClick = function(tagid){
		//$('iframe').hide();
		$(tagid).click(function(){
			$('#bgvid').remove();
			var page = $(this).attr('href');
			$('#mid').load(page);
			return false;
		});
	}

	loadpageOnClick('#aboutus');
})
