$(function(){
	//initial
	$('#sheets').load('loginSheet.html');

	//change
	$('ul#sheetslink li a').click(
		function(){
			var page = $(this).attr('href');
			$('#sheets').load(page);
			return false;
		}
	);
})