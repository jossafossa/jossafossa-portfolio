/**
 * merges 2 multidimensional arrays
 * @return {array} 
 * @src https://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
 */
function extend(){
  for(var i=1; i<arguments.length; i++)
    for(var key in arguments[i])
      if(arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

class Bouncer {
	constructor(settings) {
		var defaultSettings = {
			element: false,
			parent: false,
			speed: 2,
		}
		this.settings = extend(defaultSettings, settings);
		this.element = this.settings["element"];
		this.parent = this.settings["parent"];
		this.speed = this.settings["speed"];
		if (!this.element) { throw new Error("parameter element not found")};
		if (!this.parent) { throw new Error("parameter parent not found")};
	}

	start() {
		this.el = document.querySelector(this.element);
		var p = this.el.closest(this.parent);
		// console.log(p);
		this.top = -this.el.offsetTop;
		this.left = -this.el.offsetLeft;
		this.right = p.clientWidth - this.el.clientWidth + this.left;
		this.bottom = p.clientHeight - this.el.clientHeight + this.top;
		this.dir = [1,1];
		this.x = 0;
		this.y = 0;
		// console.log(p.clientWidth + " - " + this.el.clientWidth + " - " + this.left);
		requestAnimationFrame(this.step.bind(this));
	}

	step() {
		this.checkCollision();
		// console.log(this.x, this.y);
		this.x =+ this.x + this.dir[0] * this.speed;
		this.y =+ this.y + this.dir[1] * this.speed;
		this.update();
		requestAnimationFrame(this.step.bind(this));
	}

	checkCollision() {
		var nextX = this.x + this.dir[0] * this.speed;
		var nextY = this.y + this.dir[1] * this.speed;
		if (nextX > this.right || nextX < this.left) {
			this.dir[0] *= -1;
			this.bounce();
		}
		if (nextY > this.bottom || nextY < this.top) {
			this.dir[1] *=-1;
			this.bounce();
		}
	}

	bounce() {
		this.el.style.filter = "contrast(50%) sepia(100%) saturate(1000%) hue-rotate(" + Math.floor(Math.random() * 360) + "deg)";
	}

	update() {
		this.el.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0)";
	}
}

