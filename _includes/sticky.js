$(document).ready(function(){

	var win = $(window);
	var nav = $('nav');
	var navButtons = $('li', nav);
	var sections = $('section');

	var _sections = new Array();
	var _sectionOffset = -100;
	var _navButtons = new Array();
	var _navTop = nav.offset().top;

	sections.each(function(i){
			_sections[i] = new Object();
			_sections[i].id = $(this).attr('id');
	});

	navButtons.each(function(i){
		_navButtons[i] = new Object();
		_navButtons[i].link = $('a', this).attr('href').replace(/^\/|\#|\/$/g, '');
		_navButtons[i].selector = this;
	});

	win.bind('scroll', function(){

		var scroll = win.scrollTop();	
		var id = null;

		for (var i = 0; i < _sections.length; ++i) {
			var top = Math.round($('#'+_sections[i].id).offset().top);
			var height = Math.round($('#'+_sections[i].id).height());
			var diff = scroll - top;
			if ( diff > _sectionOffset*2 && diff <= height + _sectionOffset) {
				id = _sections[i].id;	
			}
		}

		for (var i = 0; i < _navButtons.length; ++i) {
			var button = _navButtons[i];
			if(id === button.link){
				if(!$(button.selector).hasClass('current_page_item')){
					$(button.selector).addClass('current_page_item');
				}	
			} else {
				if($(button.selector).hasClass('current_page_item')){
					$(button.selector).removeClass('current_page_item');
				}		
			}
		}	

		if(scroll > _navTop){ // Toggle sticky nav based on the window scroll position
			if(!$(nav).hasClass('sticky')) {
				$('#'+_sections[0].id).css('margin-top', nav.outerHeight()); // this prevents section to jump up due to layout change
				nav.addClass('sticky');
			}
		} else {
			$('#'+_sections[0].id).css('margin-top', 0);
			if($(nav).hasClass('sticky')) nav.removeClass('sticky');;
		}		

	});
	
	// Initialize scrolling navigation
	nav.localScroll({
		offset: 0,
		duration: 300,
		hash: true,
		onBefore: function(event, target, elem){
			var diff = _sectionOffset;
			if(nav.hasClass('sticky')){
				diff = -nav.outerHeight();
			}
			this.offset = diff;
		}
	});	
	
	$(window).hashchange(function() {
   		_gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
	});

});				