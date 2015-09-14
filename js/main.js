$(document).ready(function(){
	//alert("ok");
	$('#testaj').click(function(e){
		/*e.preventDefault();
		$.ajax({
			type: "GET",
			url: "http://localhost/VMix/php/main.php",
			data: {first: "firstname",
				second: "lastname",
				content: "words"},
			success: function(data){
				$('#testfield').html("<p>" + data + "</p>");
			}
		});*/

		$.ajax({
			url: "http://localhost/VMix/php/main.php",
			data: "",
			datatype: "json",
			success: function(data){
				var objData = JSON.parse(data);
				var email = objData.email;
				var password = objData.password;
				$('#testfield').html("<p>" + email +
				 ": " + password + "</p>");
				//$('#testfield').html("<p>" + data + "</p>");
				/*for(var i in data){
					var email = data[i].email;
					var password = data[i].password;
					$('#testfield').html("<p>" + email +
					 ": " + password + "</p>");
					$('#testfield').html("<p>" + data + "</p>");
				}*/
/*				var htmlStr = '';
				$.each(data, function(key, value){
					htmlStr += value.email + value.password + '</br>';
				});
				$('##testfield').html(htmlStr);*/
			}
		});
	});	
});