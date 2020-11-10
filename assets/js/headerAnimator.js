class ImageAnimator {
	constructor(element, backgrounds, prefix) {
		this.element = document.querySelectorAll(element)[0];
		this.backgroundImages = backgrounds;
		this.prefix = prefix;
		this.index = 0;
		this.backgroundQueue = [];
		this.maxSize = this.element.offsetWidth + this.element.offsetHeight;
		this.x = 0;
		this.y = 0;
		this.element.classList.add("image_animator");

		var self = this;
		this.element.addEventListener("click", function(e) {
			  var rect = self.element.getBoundingClientRect();
			  var x = e.clientX - rect.left; //x position within the element.
			  var y = e.clientY - rect.top;  //y position within the element.
			self.loadNewHeader(x, y);
		})
	}

	chaos() {
		console.log("chaos mode");
		let index = 0;
		var self = this;
		this.element.addEventListener("mousemove", function(e) {
			index++;
			if (index % 5 === 0) {
			  var rect = self.element.getBoundingClientRect();
			  var x = e.clientX - rect.left; //x position within the element.
			  var y = e.clientY - rect.top;  //y position within the element.
				self.loadNewHeader(x, y);
			}
		})
	}

	loadRandomHeader() {		
		this.x = Math.random() * this.element.offsetWidth;
		this.y = Math.random() * this.element.offsetHeight;

		this.loadNewHeader(this.x, this.y);
	}

	loadNewHeader(x, y) {
		var clip = "clip-path:circle(0% at " + x + "px " + y + "px);";
		var backgroundElem = document.createElement("div");
		backgroundElem.classList.add("image");
		backgroundElem.setAttribute("style", clip + "background-image:url(" + this.getNextBackground() + ")");
		this.element.appendChild(backgroundElem);
		this.backgroundQueue.push(backgroundElem);

		var self = this;
		setTimeout(function() {self.animateLastElement(self.x, self.y)}, 100);
		setTimeout(function() {self.removeFirstBackgroundElement()}, 3000);
	}

	removeFirstBackgroundElement() {
		if (this.backgroundQueue.length > 1) {
			this.backgroundQueue.shift().remove();
		}
	}

	animateLastElement(x, y) {
		var element = this.backgroundQueue[this.backgroundQueue.length - 1];
		element.style.clipPath = "circle(" + this.maxSize + "px at " + this.x + "px " + this.y + "px)";
	}

	getNextBackground() {
		this.index = (this.index + 1) % (this.backgroundImages.length);
		return this.prefix + this.backgroundImages[this.index];	
	}
}