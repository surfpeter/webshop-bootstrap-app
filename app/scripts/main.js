(function(yourcode) {
	'use strict';
	// Skicka global jQuery objektet som en parameter
	yourcode(window.jQuery, window, document);
}(function($) {
'use strict';
// Lokal $ variabel
	$(function() {
		// DOM ready
	});



	var navTabsElement = $('#jsonTabs.nav-tabs[data-href]');
	var navTabContent = $('.tab-content');
	//check if json link exists else just let it be and load static content
	if(navTabsElement.attr('data-href')){
		$.getJSON(navTabsElement.attr('data-href'), function(data) {
			var navtabmenu = '';
			var navtabContent = '';

			for (var i = data.length - 1; i >= 0; i--){
				navtabmenu += '<li class=\"nav\"><a href=\"#nav-tab-id-' +
				i + '\" data-toggle=\"tab\">' + data[i].Title + '</a></li>';
				navtabContent += '<div class=\"tab-pane fade in col-3\" id=\"nav-tab-id-' +
				i + '\">' + data[i].Content + '</div>';
			}

			navTabsElement.html(navtabmenu);
			navTabContent.html(navtabContent);
			// show firt tab
			navTabsElement.find('li:eq(0) a').tab('show');
		});
	/* 	fallbacks to static content
			.fail(function(){
			onsole.log("error could not fetch data for tabs load static content");
			}
		);
	*/
	}
	function showSpinner(){
		$('.response .success').removeClass('show');
		$('.response .danger').removeClass('show');
		$('.response .loading').addClass('show');
	}

	function showResponseMessage(type, message){
		$('.response .loading, .success, .danger').removeClass('show');
		$('.response .' + type).addClass('show').find('p').text(message);
	}


	$('#emailSignup').submit(function(event){

	event.preventDefault();
	var email = $('#emailSignup input').val();
	if (email){
	var request = $.ajax({
		method: 'POST',
		data: {email: email},
		dataType: 'json',
		url: 'newsletter/subscribe',
		beforeSend: function(){
			showSpinner();
		}
	});
		request.done(function(response){
			if (response.email === 'valid'){
				showResponseMessage('success', 'Subscription successful.');
			}else{
				showResponseMessage('danger', 'Email verification failed...');
			}
		});
		request.fail(function(){
			showResponseMessage('danger', 'Subscription server error');
		});
	}
	else{
		showResponseMessage('danger', 'Please fill in Email!');
	}

	});

}));
