$(function(){
	$('#userprofile').hide();
	$('#signout').hide();
	$('#header_show').on('mouseover',function(){
		//alert("ok");
		$('#userprofile').delay(200).show();
		$('#signout').delay(400).show();
	});
	$('#header_show').on('mouseleave',function(){
		$('#userprofile').delay(200).hide();
		$('#signout').delay(400).hide();
	});
})