;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		//$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if (!isMobileDevice()){
				if ($win.scrollTop() > 200) {
					$('.js-top').addClass('active');
				} else {
					$('.js-top').removeClass('active');
				}
			}
		});
	
	};

	function isMobileDevice(){
		return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	}


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	function timestamp() {
		// Create a new Date object
		let currentDate = new Date();

		// Helper function to pad single-digit values with leading zeros
		function padWithZero(value) {
			return value < 10 ? '0' + value : value;
		}

		// Format the date and time components
		let day = padWithZero(currentDate.getDate());
		let month = padWithZero(currentDate.getMonth() + 1);
		let year = currentDate.getFullYear().toString().slice(-2);
		let hours = padWithZero(currentDate.getHours());
		let minutes = padWithZero(currentDate.getMinutes());
		let seconds = padWithZero(currentDate.getSeconds());

		// Combine the formatted date and time
		return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	}

	function addComment(name, comment, datetime) {
		let clonedDiv = $('#comment').clone().removeClass('d-none').removeAttr('id');
		clonedDiv.hide();
		clonedDiv.find('h6').text(name);
		clonedDiv.find('p').eq(0).text(comment);
		clonedDiv.find('time').eq(0).text(datetime);
		$('.media-chat').last().after(clonedDiv);
		clonedDiv.fadeIn(1500);
	}

	$("#comment-submit").click(function(e){
		e.preventDefault();

		let rule = /^[A-Za-z\s]+$/;
		let name = $("#name-input").val();
		let comment = $("#comment-input").val();
		let datetime = timestamp();

		console.log(name+'   '+comment+' '+datetime);
		
		if (rule.test(name) == true && rule.test(comment) == true) {
			addComment(name, comment, datetime);
			$('#sent-comment')[0].play();
			$('#chat-content').animate({ scrollTop: $(document).height() - $('#chat-content').height() }, 1000);
			$.ajax({
				url: 'https://icypeach26-30cd.restdb.io/rest/comments?apikey=64928a82acb4d41a96344b00',
				crossDomain: true,
				data: {name, comment, datetime},
				dataType : 'json',
				type: 'POST',
				success: function(data){
				},
				error: function(data){
					console.log(data);
				}
			});
		} else {
			alert('Yang bener kalo input');
		}

		$("#name-input").val('');
		$("#comment-input").val('');

	});

	function disableScrolling() {
		var scrollPosition = [
			self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
			self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
		];
		var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
		html.data('scroll-position', scrollPosition);
		html.data('previous-overflow', html.css('overflow'));
		html.css('overflow', 'hidden');
		window.scrollTo(scrollPosition[0], scrollPosition[1]);
	}

	// Button
	function startUp() {

		let fullName = new URLSearchParams(window.location.search).get('to');
		disableScrolling();
		
		$("#name-input").val(fullName);
		$('#full-name').text(fullName);

		$.ajax({
			url: 'https://icypeach26-30cd.restdb.io/rest/comments?apikey=64928a82acb4d41a96344b00',
			crossDomain: true,
			type: 'GET',
			success: function(data){
				$.each(data ,function(index, value) {
					addComment(value.name, value.comment, value.datetime)
				})
			},
			error: function(data){
				console.log(data);
			}
		});
	}
	
	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		// counter();
		// counterWayPoint();
		startUp();
	});


}());