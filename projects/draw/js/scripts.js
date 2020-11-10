$( document ).ready(function(){
	var canvas = document.getElementById("1");
	var	c = canvas.getContext("2d");
	var w = window.innerWidth;
	var h = window.innerHeight;
	var	PosX, oldPosX;
	var	PosY, oldPosY;
	var click;
	var lineWidth = 5;
	var cookies = Cookies.getJSON('settings');
	console.log(cookies);

	//settings
	if (typeof cookies === 'undefined') {
		console.log(settings);
		var settings = new Object();
		settings['symmetry'] = true;
		settings['rainbowColor'] = true;
		settings['increment'] = true;
		settings['negativeIncrement'] = false;
		settings['stripes'] = false;
	} else {
		settings = cookies;
		console.log(settings);
	}

	


	//shortcuts
	var toggleShortcuts = {
		'r': 'rainbowColor',
		's': 'symmetry',
		'i': 'increment',
		'n': 'negativeIncrement',
		'l': 'stripes',
	}

	var actionShortcuts = {		
		'z': 'undo',
		']': 'lineWidthPlus',
		'[': 'lineWidthMin',
	}

	for (var key in toggleShortcuts) {
	  if (toggleShortcuts.hasOwnProperty(key)) {
	  	$('menu #shortcuts').append('<div class="menu-item">' + toggleShortcuts[key] + '<div class="shortcut"n>' + key +'</div></div>')
	  	$('menu #toggle-btns').append('<button class="toggle-btn menu-item" setting="' + toggleShortcuts[key] + '">' + toggleShortcuts[key] + '<span class="fa"></span></button>')
	    console.log(key + " -> " + toggleShortcuts[key]);
	  }
	}


	//var settings = {
	//	symmetry: false,
	//	rainbowColor: true
	//}
	var $input = $('input');
	var red = 255;
	var green = 0;
	var blue = 0;
	var id = 1;
	var oldPosX;
	var newPosX;
	var oldPosY;
	var newPosY;
	var mousePosX;
	var mousePosY;
	var avePos;
	var firstLine;
	var stripe = 1;






	//check mobile version
	if(typeof window.orientation !== 'undefined'){mobile = true;}else{mobile = false;}
	//alert(mobile);

	//update symmetry cursor
	function updateSettings() {
		if (settings['symmetry'] == true) {
			console.log(settings['symmetry']);
			$('.cursor-right').remove();
			$('#cursors').append('<div class="cursor-right"></div>');
		} else {
			$('.cursor-right').remove();
		}
	}

	


	//fit canvas on screen
	$('#paper canvas').attr('height', h + 'px').attr('width', w + 'px');

	$('#paper').on('mouseleave', function() {			
		$('#cursors').removeClass('visible');
		firstLine = true;
	})

	$('#paper').on('mouseenter', function() {		
		$('#cursors').addClass('visible');
	})

	$("#paper").on('touchstart mousedown', function() {
		// if (mobile == false) {
		// 	id++;

		// 	$('#paper').append('<canvas id="' + id + '" height="' + h + 'px" width="' + w +'px">')

		// 	canvas = document.getElementById(id);
		// 	c = canvas.getContext("2d");

			
		// }
		click = 1;
	});

	$(window).on('touchend mouseup', function() {
		click = 0;
		console.log('mouseup')

	});


		//when clicked once make a sphere
	$('#paper').on('mousedown touchstart', function (e) {
		c.beginPath();
		c.arc(PosX,PosY,lineWidth / 2,0,2*Math.PI);

		c.fillStyle="rgb(" + red + "," + green + "," + blue + ")";
		if (settings['symmetry'] == true) {
			c.arc((w - PosX),PosY,lineWidth / 2,0,2*Math.PI);
		};
		c.fill();
		if (mobile == false) {
			PosX = e.clientX;
			PosY = e.clientY;
		};
		if (mobile == true) {
			PosX = e.originalEvent.touches[0].pageX;
			PosY = e.originalEvent.touches[0].pageY;
		};

		c.lineCap = 'round';
		c.strokeStyle = 'black';
		c.lineWidth = lineWidth;
		c.beginPath();
		c.moveTo(PosX, PosY);
		c.lineTo(PosX + 1, PosY + 1);
		console.log('asdasd')
	});

	

	$('#paper').on('mousemove touchmove', function (e) {

		if (settings['stripes'] == true) {
			if (stripe == 1) {
				stripe = 0;
			} else {
				stripe = 1;
			}
		} else {
			stripe = 1;
		}




		//get position data	
		oldPosY = PosY;
		oldPosX = PosX;

		if (mobile == false) {
			PosX = e.clientX;
			PosY = e.clientY;
		};
		if (mobile == true) {
			PosX = e.originalEvent.touches[0].pageX;
			PosY = e.originalEvent.touches[0].pageY;
		};

		

		//if clicked draw path
		if (click == 1) {
			if (settings['rainbowColor'] == true) {
				if (red >= 255 && green <= 0) {
					blue = blue + 5
				};
				if (green <= 0 && blue >= 255) {
					red = red - 5
				};
				if (red <= 0 && blue >= 255) {
					green = green + 5
				};
				if (red <= 0 && green >= 255) {
					blue = blue - 5
				};
				if (blue <= 0 && green >= 255) {
					red = red + 5
				};
				if (blue <= 0 && red >= 255) {
					green = green - 5
				};
			}

			
			
			
			if (mobile == false) {
				newPosX = mousePosX = e.clientX;
			};
			if (mobile == true) {
				newPosX = mousePosX = e.originalEvent.touches[0].pageX;
				//alert(mousePosY + ', ' + mousePosX)
			};
			
			if (mobile == false) {
				newPosY = mousePosY = e.clientY;
			};
			if (mobile == true) {
				newPosY = mousePosY = e.originalEvent.touches[0].pageY;
				//alert(mousePosY + ', ' + mousePosX)
			};	


			if (settings['increment'] == true) {
				difPosX = (oldPosX - newPosX);
				difPosXab = Math.abs(difPosX);
				difPosY = (oldPosY - newPosY);
				difPosYab = Math.abs(difPosY);

				//console.log((difPosXab + difPosYab) / 2 + lineWidth)
				if (settings['negativeIncrement'] == true) {
					avePos = ((difPosXab + difPosYab));
					//console.log(avePos)
					avePos = -0.1 * avePos + lineWidth;
				} else {					
					avePos = (difPosXab + difPosYab) / 2 + lineWidth;
				}
				//console.log('(difPosXab: ' + difPosXab + ' + difPosYab: ' + difPosYab + ' ) / 2 + ' + 'lineWidth: ' + lineWidth + ' = ' + avePos)
			} else {
				avePos = lineWidth;
			}
			
			if (stripe == 1 && firstLine == false) {
				c.lineCap = 'round';
				c.strokeStyle = 'rgb(' + red + ','  + green + ',' + blue + ')';
				c.lineWidth = avePos;

				c.beginPath();
				c.moveTo(oldPosX, oldPosY);
				c.lineTo(PosX, PosY);
				c.stroke();
				if (settings['symmetry'] == true) {
					c.beginPath();
					c.moveTo((w - oldPosX), oldPosY);
					c.lineTo((w - PosX), PosY);
					c.stroke();
				}
			}
			firstLine = false;

			//c.fillStyle= "rgba(255,255,255,0.01)";
			//c.fillRect(0,0,4300,2560);

		};

		//move custom cursor to mouse position
		updateCursor();
	});

	//detect when ']' is pressed
	$(window).keypress(function(e) {
		if (e.keyCode == 0 || e.keyCode == 93) {
			lineWidth++;
			updateLineThicknessInput();
			updateCursor();
			openTextNotification('lineWidth is now ' + lineWidth + 'px');
		}
	});

	//detect when '[' is pressed
	$(window).keypress(function(e) {
		if (e.keyCode == 0 || e.keyCode == 91) {
			if (lineWidth > 1) {
				lineWidth--;
			}
			console.log(lineWidth)
			updateLineThicknessInput();
			updateCursor();
			openTextNotification('lineWidth is now ' + lineWidth + 'px');
		}
	});


	// DEBUG MENU //
	var i = 1;

	$('.menu-toggle').click(function(){
		$(this).parent().toggleClass('closed');
	});

	$('#hide-menu').on('click',function(){
		$('menu').toggleClass('active')
	})

	//update menu toggles on load
	updateMenuToggles();

	// update option buttons to display correct setting
	function updateMenuToggles() {
		for (var i = 1; i < $('#toggle-btns').children().length + 1; i++) {
			var $this = $('#toggle-btns .toggle-btn:nth-child(' + i + ')')
			//console.log(i + ' buttons');
			setting = $this.attr('setting');
			//console.log(setting)
			if (settings[setting] == true) {
				$this.addClass('active')
			} else {
				$this.removeClass('active')
			}
		}
	}

	// toggle symmetry
	$('.toggle-btn').on('click', function(){
		setting = $(this).attr('setting');
		if (settings[setting] == true) {
			settings[setting] = false;
			$(this).addClass('active')
		} else {
			settings[setting] = true;
			$(this).removeClass('active')
		}
		$(this).toggleClass('active')
		console.log(settings[setting]);
		openSettingsNotification(setting);
		updateSettings();
	})


	$('#line-properties input').on('input', function() {
		getInput(this);
	})

	function getInput(input) {
		
		var input = $(input).val();
		console.log(lineWidth)
		if (input > 0) {			
			lineWidth = parseInt(input);
		};
		console.log(lineWidth)
		updateLineThicknessInput();
		updateCursor();

	}



	// SHORTCUTS //

	//check when key is pressed
	$(document).keydown(function(evt) {
		var key = evt.keyCode;
		key = String.fromCharCode(key).toLowerCase();
		if (toggleShortcuts[key]) {
			key = toggleShortcuts[key];
			console.log('iets anders')
			toggleSettings(key);
		} 
		if (actionShortcuts[key]) {
			key = actionShortcuts[key];
			console.log('undo' + key)
			actionSettings(key);
		}
		updateSettings();
	});

	// action settings
	function actionSettings(setting) {
		//console.log(key)
		if ( actionSettings[key] == 'undo' ) {
			console.log('whooooops');
			undoLastAction();
		}

		if ( actionSettings[key] == 'lineWidthPlus' ) {
			lineWidth++;			
			openTextNotification('lineWidth is now ' + lineWidth + 'px');
			updateLineThicknessInput();
			updateCursor();
		}

		if ( actionSettings[key] == 'lineWidthMin' ) {
			lineWidth--;			
			openTextNotification('lineWidth is now ' + lineWidth + 'px');
			updateLineThicknessInput();
			updateCursor();
		}
	}

	// toggle settings
	function toggleSettings(setting) {
		//console.log(key)
		if (settings[setting] == true) {
			settings[setting] = false;
		} else {
			settings[setting] = true;
		}
		openSettingsNotification(setting);
	}

	///undo
	function undoLastAction(key) {
		openTextNotification('undo');
		if (id > 1) {
			$('#paper canvas:nth-child(' + id + ')').remove();
			id--;

			console.log('undo')
		}
	}



	// NOTIFICATIONS //

	var myVar;

	// show the defined text in notification
	function openTextNotification(text) {
		Cookies.set('settings', settings);
		console.log('cooookies!!!');
		$('#notifications').html('<div class="notification"><p>' + text + '</p></div>')
		clearTimeout(myVar);
		myVar = setTimeout(fadeoutNotifications, 3000); // fadeout time
	}

	// show changed setting in notification
	function openSettingsNotification(setting) {
		Cookies.set('settings', settings);
		console.log('cooookies!!!');
		$('#notifications').html('<div class="notification"><p>' + setting + ' is set to ' + settings[setting] + '</p></div>');
		clearTimeout(myVar);
		myVar = setTimeout(fadeoutNotifications, 3000); // fadeout time
		updateMenuToggles()
	}

	// fadeout notification
	function fadeoutNotifications() {
		$('#notifications .notification').addClass('fadeout').delay( 1000 ).queue(function() {
      $(this).remove();
		});
	}




	function updateCursor() {
		$('.cursor').css({'left': (PosX - (lineWidth / 2)) + 'px','top': (PosY - (lineWidth / 2)) + 'px', 'background-color':'rgb(' + red + ','  + green + ',' + blue + ')', 'height': lineWidth + 'px', 'width': lineWidth + 'px'});
		$('.cursor-right').css({'left': ((w - PosX) - (lineWidth / 2)) + 'px', 'top': (PosY - (lineWidth / 2)) + 'px', 'background-color':'rgb(' + red + ','  + green + ',' + blue + ')', 'height': lineWidth + 'px', 'width': lineWidth + 'px'});
	}

	function updateLineThicknessInput() {
		$( "menu #line-properties input").val(lineWidth);
	}

	
	updateSettings();

});