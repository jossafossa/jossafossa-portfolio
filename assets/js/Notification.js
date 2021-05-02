class Notification {
	constructor() {
		this.element = document.createElement("div");
		this.element.classList.add("popup");
		document.body.appendChild(this.element);

		this.container = document.createElement("div");
		this.container.classList.add("popup-container");
		document.body.appendChild(this.container);

		this.timeout = 4000;
		this.timer;
	}

	showText(text, image = false, classes = []) {
		let element = document.createElement("div");
		element.classList.add("notification");
		classes.forEach(e => {element.classList.add(e); });
		element.innerHTML = "";
		element.innerHTML += (image) ? `<img src=${image}></img>` : "";
		element.innerHTML += `<span>${text}</span>`;
		this.container.appendChild(element);

		setTimeout(e => {
			element.remove();
		}, this.timeout);
	}


	show() {
		this.element.classList.add("active");
	}

	hide() {
		this.element.classList.remove("active");
	}
}