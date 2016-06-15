Template.summit.onRendered(function(){
	console.log('summit');



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


})
