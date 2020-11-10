class Ripple {
	constructor(elementSelector) {
		this.elements = document.querySelectorAll(elementSelector);
		
		var self = this;
		this.elements.forEach(
			(el) => {
				el.addEventListener('click', function(e) {
					self.createRipple(el, e);
				});				
				el.classList.add("ripple");
			}
		);
	}

	createRipple(element, e) {
		var rect = element.getBoundingClientRect();
		var x = e.clientX - rect.left; //x position within the element.
  	var y = e.clientY - rect.top;  //y position within the element.
		console.log(x, y);
		var clip = "clip-path:circle(0px at " + x + "px " + y + "px);";
		var ripple = document.createElement("span");	
		ripple.setAttribute("style", clip); 
		element.prepend(ripple);
		var self = this;
		setTimeout(function() {
			self.doRipple(ripple, x, y);
		}, 100);
		setTimeout(function() {
			self.removeRipple(ripple);
		}, 1000);
	} 

	doRipple(ripple, x, y) {
		ripple.style.clipPath = "circle(200% at " + x + "px " + y + "px)";
		ripple.style.opacity = "0";

	}

	removeRipple(ripple) {
		ripple.remove();  
	}

}
