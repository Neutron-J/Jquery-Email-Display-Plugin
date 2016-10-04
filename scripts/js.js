var controller = {
	config: {
	},
	init: function(input){ 
		if (controller.widthCheck()){ //Make sure being viewed on a bigger enough window. 
			controller.setup(input); //input comes from selection in initial call.
			} else {
				return;
			}
	},
	widthCheck: function(){
		var w = $(window).width();
		if (w > 650){ //Emails generally between 550px - 620px wide
			return true;
		} else {
			return false;
		}
	},
	heightCheck: function(){
		var h = $(window).height() - 150;
		controller.config.height = h; //Save the window height in the config, determine the iframe height.
	},
	setup: function(input){
		controller.heightCheck();
		input.append(controller.iframe); //adds iframe at end of selected div/section
		$('#iframe-outer').hide();
		$('a.button').on('click', function(e){
			e.preventDefault(); 
			controller.populateFrame(e);
		});
		controller.buttonControl();
		controller.closeFunctions(); 
	},
	iframe: '<div id="iframe-outer">'+ 
				'<div class="iframe-holder">'+
				'<div class="top-row cf">'+
					'<div class="button-holder">'+
						'<button id="mobile"><img src="images/mob_icon.png" alt="Mobile" class="icon"/></button>'+
						'<button id="desktop"><img src="images/desktop_icon.png" alt="Desktop" class="icon"/></button>'+	
						'<button id="close"><img src="images/close_icon.png" alt="Close" class="icon"/></button>'+
					'</div>'+
					'</div>'+
					'<iframe id="iframe" width="100%;"></iframe>'+
				'</div>'+
			'</div>',
	buttonControl: function(){
		$('.button-holder').on('click', 'button', function(){
				var buttonName = $(this).attr('id');
				switch (buttonName) {
					case 'mobile':
						controller.changeView('360px');
						break;
					case 'desktop':
						controller.changeView('100%');
						break;
					case 'close':
						controller.closeIframe();
						break;
					default:
						return;
				}
			});
	},
	changeView: function(width){
		$('#iframe').prop('width', width);
		controller.refreshIframe();
	},
	refreshIframe: function(){
		 $('#iframe').attr("src", $('#iframe').attr("src"));
	},
	populateFrame: function(e){
		var location = $(e.target).attr('href');
		$('#iframe').prop({src: location, height: controller.config.height+'px', width: '100%'});
		$('#iframe-outer').show();
	},
	closeIframe: function(){
		$('#iframe-outer').hide();
		$('#iframe').prop('src', ' ');
	},
	closeFunctions: function(){
		$('#iframe-outer').on('click', function(e){
			var ct = e.target.id;
			if (ct == 'iframe-outer') {
				controller.closeIframe();
			}
		});
		$(document).keyup(function(e) {     
			if (e.keyCode == 27) { // escape key maps to keycode `27`
        	controller.closeIframe();
			}
		});
	}
};

/*Returning to jQuery*/
$.fn.emailpreviewer = function() {
	return this.each(function() {
		controller.init($(this));
	});
};