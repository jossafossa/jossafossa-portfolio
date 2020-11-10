class Notification {
	constructor() {
		this.element = document.createElement("div");
		this.element.classList.add("popup");
		document.body.appendChild(this.element);
		this.timeout = 5000;
		this.timer;
	}

	showText(text, image = false) {
		this.element.innerHTML = "";

		if (image != false || image != "") {
			var popupImage = document.createElement("img");
			popupImage.src = image;
			this.element.appendChild(popupImage);
		}

		var popupText = document.createElement("p");
		popupText.innerHTML = text;
		this.element.appendChild(popupText);

		this.show();
		clearTimeout(this.timer);
		var self = this;
		this.timer = setTimeout(function() {self.hide() }, this.timeout);
	}

	show() {
		this.element.classList.add("active");
	}

	hide() {
		this.element.classList.remove("active");
	}
}