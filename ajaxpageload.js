/*
	AJAX PAGE LOAD
	------

	Fetch Content from other pages on link click.

 */
;
fetch_content = (function($) {

	/*
		Initialise
	*/
	(function init() {
		changePage();
		historyStates();

		// Show Loading animation on first page load
		setTimeout(function() {
			$('.loading').addClass('hidden');
			$('.loading__overlay').fadeOut();
			$('.loading').fadeOut();
			$('#page__content').css('opacity', 1);
		}, 1500);

	})();


	/*
		Trigger page change on History back
	 */
	function historyStates() {
		if (typeof history.pushState === 'function') {
			window.onpopstate = function() {

				var href = location.href;

				// Loading Animation
				$('#page__content').css('opacity', 0);
				showLoadingAnimation(href);

				// fetch content & change URL
				ajaxFetchPage(href);

			};
		}
	}


	/*
		Change page
		Trigger the action when the user click on a link
	*/
	function changePage() {
		$('a.pagelink, li.pagelink a').unbind('click');
		$('a.pagelink, li.pagelink a').click(function(e) {

			// Link Variables
			var href = $(this).attr('href');
			var title = $(this).attr('title');

			// Current State
			$(this).siblings().removeClass('current');
			$(this).addClass('current');

			// Loading Animation
			$('#page__content').css('opacity', 0);
			showLoadingAnimation(href);

			// fetch content & change URL
			ajaxFetchPage(href);
			changeUrl(href, title);

			// Allow History Navigation
			historyStates();

			// Prevent click on href
			e.preventDefault();

		});
	}


	/*
		Show the Loading Animation
		When called, show the loading animation, then the logo, and finaly hide the animation after 2.5 seconds.
	*/
	function showLoadingAnimation() {
		$('body').addClass('is__loading');
		$('.loading').removeClass('hidden');
		$('.loading').fadeIn();
		setTimeout(function() {
			$('.loading__overlay').fadeIn();
		}, 500);

		setTimeout(function() {
			hideLoadingAnimation();
		}, 1500);
	}


	/*
		Hide the Loading Animation
		When called, hide the logo animation, then the logo.
	*/
	function hideLoadingAnimation() {
		$('body').removeClass('is__loading');
		$('.loading').addClass('hidden');
		$('.loading__overlay').fadeOut();

		// Scroll way back to the top
		window.scrollTo(0, 0);

		// Hide the laoding animation
		setTimeout(function() {
			$('#page__content').css('opacity', 1);
			$('.loading').fadeOut();
		}, 500);
	}


	/*
		Fetch the distant page content with Ajax, then append it to the current page__content.
	*/
	function ajaxFetchPage(href) {
		$.ajax({
			url: href,
			type: 'GET',
			success: function(data) {
				var content = $('<div>').append(data).find('#page__content').contents();
				$('#page__content').html(content);
				document.title = $('#js-pageTitle').text();

				// Reinit all functions
				reInitFunc();
			}
		});
	}


	/*
		Change the URL dynamicly
	*/
	function changeUrl(href, title) {
		history.pushState('', title, href);
		document.title = title;
	}


	/*
		Reinit functions
	*/
	function reInitFunc() {
		// If you need to init functions on your new page (like a carousel, add them here). Functions in other files must have public method.
		// Ex.: carousel.InitCarousel();
		changePage();
	}


	/*
		Return public methods
	 */
	return {
		changePage: changePage,
	}

})(jQuery);
