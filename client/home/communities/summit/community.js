Template.community.onRendered(function(){
	console.log('new ccommunity rendered');

	//TABS
	$(".tabs-menu a").click(function(event) {
		event.preventDefault();
		$(this).parent().addClass("fp_tab--selected");
		$(this).parent().siblings().removeClass("fp_tab--selected");
		var tab = $(this).attr("href");
		$(".tab-content").not(tab).css("display", "none");
		$(tab).fadeIn();
	});


	$('body').click(function(e){ //nikoLightBox

		if(e.target.className != 'fp-card_img'){
		
			$('.fp-card_img').removeClass('big');
			$('ul').removeClass('xxx');
			$('.details').removeClass('show');
			
		}
		//console.log(e);
		//console.log(e.target.className);
		
		if(e.target.className == 'fp-card_img'){
			$(e.target).addClass('big');
			$(e.target).parent()[0].children[1].className = 'fp-card_text xxx';
			$(e.target).parent()[0].children[2].className = 'details show';
		}

	})







	/**WHAT SHOULD BE LOADED JUST ONCE?**/	
	$('#header_nav li a').click(function(e){ //STICKY HEADER SCROLL 
		e.preventDefault();
		var tag = $(e.currentTarget.hash);
		var t = tag.offset().top - $('#header_nav').height();

		$('html,body').animate({scrollTop: t},'slow',function(){
			window.location.hash = e.currentTarget.hash
		});
	})
	$(function(){ //STICKY HEADER STICK 
		// Check the initial Poistion of the Sticky Header
		var stickyHeaderTop = $('#header_nav').offset().top;
		$(window).scroll(function(){
			var summaryTop = $('#summary').offset().top - $('#header_nav').height();
			var floorPlanTop = $('#floor-plans').offset().top - $('#header_nav').height();
			var featureTop = $('#features').offset().top - $('#header_nav').height();		
			var galleryTop = $('#gallery').offset().top - $('#header_nav').height();
			var contactTop = $('#contact').offset().top - $('#header_nav').height();
			
			
			var links = [
				"#summary",
				"#floor-plans",
				"#features",			
				"#gallery",
				"#contact"	
			]
			var tops = [
				summaryTop,
				floorPlanTop,
				featureTop,			
				galleryTop,
				contactTop
			]

			for(var a=0; a<tops.length; a++){
				var l;
		
				if(($(window).scrollTop() + 10) >= tops[a] && (($(window).scrollTop()+10)<tops[a+1])){

					l = links[a];
					$('#header_nav a').removeClass('active');	
					$('a[href="'+l+'"]').addClass('active');
					return;
				}
				if(($(window).scrollTop() + 10) >= contactTop){
					$('#header_nav a').removeClass('active');	
					$('a[href="#contact"]').addClass('active')
					return;
		
				}
			}
		})

		$(window).scroll(function(){
			if( $(window).scrollTop() > stickyHeaderTop ) {
				$('#header_nav').css({position: 'fixed', top: '0px'});
				$('#stickyalias').css('display', 'block');
			} else {
				$('#header_nav').css({position: 'static', top: '0px'});
				$('#stickyalias').css('display', 'none');
			}
		});


		/*
		$(window).scroll(function(){
			if( $(window).scrollTop() > stickyHeaderTop ) {
				//console.log($('#header_nav').offset().top);
				console.log($(window).scrollTop());
				var t = $('#header_nav').offset().top;
				var t = $(window).scrollTop();
				console.log($('#header_nav').offset().top);
				console.log(stickyHeaderTop);
				console.log(' ');
				
				$('#header_nav').offset({ top: t})
			}
		})
		*/

	})

		$( document ).on( "ready", function() {
			$.mobile.loading().hide();
		});



	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}


	$(window).on('load', function(){
		$('.message_sent').hide();
	});

	$('form input, form textarea').focus(function() {
		this.className = 'contact_form-input';
	})

	$('form').on('submit', function (e) {

		console.log(err);
		var err = 0;
		e.preventDefault();
		$('form input, form textarea').each(function(i){
			if(this.value.length > 0 || this.name == "telephone"){
			}else{
				$(this).addClass('contact_form-input--invalid');
				err++; 
				console.log(this.name +' is invalid');
			}
			if(this.name == "email"){	
				if(!validateEmail(this.value)){
					err++;
					console.log(this.name +' is invalid');
					
					$(this).addClass('contact_form-input--invalid');			
				}
			}
			
		})
		if(err > 0){
			console.log('dont submit')
		} else {
			console.log('submit');
			$.ajax({
				type: 'POST', //hide url
				url: 'send_form_email.php', //your form validation url
				data: $('form').serialize(),
				success: function () {
					$('.message_sent').show();
					$('input:not(#contact_form-submit), textarea').val('');
				}
			});
			err = 0;	
		}
	});






	//SLIDER



	var counter = 0;  //Set default image
	function foo(){
	    if ( 0 < counter){
		counter--
		//console.log(counter)   
		classes();
	    }
		window.setTimeout(foo, 1);
	}

	foo()
	$('#nikoSlider #gallery_btn-next').click(function(e){
	    //if(counter==0){classes();} I need soemthing better here
	    counter++;
	})

	$('#nikoSlider #gallery_btn-prev').click(function(e){
	    counter--;
	})

	function classes(){
		$('#nikoSlider ul').append($('#nikoSlider li:first-child')) 
		middleSpan(1);
	}

	function backClasses(){
		$('#nikoSlider ul').prepend($('#nikoSlider li:last-child')) 
		middleSpan(-1);	
	}

	function bar(){
	    if ( 0 > counter){
		counter++;
		//console.log(counter)   
		backClasses();
	    }
		window.setTimeout(bar, 1);
	}

	bar()

	/* Find num of pics*/
	var i = 1;
	var j = $('#nikoSlider li').length + 1;
	function middleSpan(k){
		i = i + k;
		if(i < 1){
			i = j; 
		}
		if (i > j){
			i = 1; 
		}
		$('#middleSpan').html(i+'/'+j);
	}
	middleSpan(0)	


	/*Infinite Slider*/


	window.setInterval(function(){
		$('#infiniteSlider ul').append($('#infiniteSlider li:first-child'))
	},
	3000); 




	/*Drag Event*/
	$(function(){
	    // Bind the swiperightHandler callback function to the swipe event on div.box
	  $( "#nikoSlider" ).on( "swiperight", function(){
		counter--;
	  });
	  $( "#nikoSlider" ).on( "swipeleft", function(){
		counter++; 
	  });



	})



})
