class Game {
	constructor() {

		this.gameElem = document.createElement("canvas");
		this.gameElem.id = "game";
		this.gameElem.width = 16;
		this.gameElem.height = 16;
		this.gameElem.style = "display:none";
		document.body.appendChild(this.gameElem);
		this.game = this.gameElem.getContext("2d");
		this.renderer = new FaviconRenderer();
		this.frame = 0;
		this.keySetup = {
			38: "up",
			87: "up",
			37: "left",
			65: "left",
			40: "down",
			83: "down",
			39: "right",
			68: "right",
		};
		this.opposites = {up: "down", down: "up", left: "right", right:"left"};
		this.block = "left";
		this.keys = {};
		this.items = [];
		this.snake = [];

		// game settings
		this.size = [16,16];
		this.bg = "#26292E";
		this.color = "#EB381A";
		this.coinColor = "#FFD02E";
		this.length = 10;
		this.dir = [1, 0];
		this.snakePosition = [0,0];

		this.start();
	}

	start() {	
		this.generateItem();
		this.setupSnake();
		this.setupEventListeners();	
  	window.requestAnimationFrame(this.loop.bind(this));
	}


	gameOver() {
		// alert("gameover");
		this.reset();
	}

	reset() {

		this.items = [];
		this.snake = [];
		this.dir = [1, 0];
		this.length = 10;
		this.snakePosition = [0,0];
		this.generateItem();
		this.setupSnake();
		this.setupEventListeners();	
	}

	setupEventListeners() {
		this.populateKeysObj();
		var keySetup = this.keySetup;
		var keys = this.keys;
		window.onkeydown = function(e) { if (e.keyCode in keySetup) { keys[keySetup[e.keyCode]] = true }; }
		this.keys = keys;
	}

	setupSnake() {
		for (var i = 0; i < this.length; i++) {
			var pos = [this.snakePosition[0] - i, 0];
			this.snake.push(pos);
		}
	}

	generateItem() {
		var pos = [Math.round(Math.random() * this.size[0]) - 1, Math.round(Math.random() * this.size[1]) - 1];
		this.items.push(pos);
	}


	removeItem(pos) {
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			// console.log(item, pos);
			if (item[0] == pos[0] & item[1] == pos[1]) {
				this.items.splice(i, 1);
			}
		}
	}

	populateKeysObj() {
		for (var key in this.keySetup) {
			var dir = this.keySetup[key];
			this.keys[dir] = false;
		}
	}

	resetKeys() {
		for(var key in this.keys) {
			this.keys[key] = false;
		}
	}

	loop() {		
		if (this.frame % 20 == 0) {
			this.step();
		}
		this.frame++;
	  window.requestAnimationFrame(this.loop.bind(this));
	}

	step() {
		//console.log(this.keys);

		this.clearBackground();
		var newDir = [0,0];
		if (this.keys["up"] & this.block != "up") {				
			newDir[1] = -1;
			this.block = "down";
		} else if (this.keys["left"] & this.block != "left") {
			newDir[0] = -1;
			this.block = "right";
		} else if (this.keys["down"] & this.block != "down") {
			newDir[1] = 1;
			this.block = "up";
		} else if (this.keys["right"] & this.block != "right") {
			newDir[0] = 1;
			this.block = "left";
		} 
		if (newDir[0] == 0 & newDir[1] == 0){ // no key pressed
			newDir = false;
		}

		if (newDir) {
			this.dir = newDir;
		}
		this.move(this.dir);
		this.drawItems();
		this.checkItemCollision();
		this.checkSnakeCollision();
		this.checkBorderCollision();
		this.resetKeys();
		this.drawSnake();
		this.renderer.render(this.gameElem.toDataURL("image/png"));
	}

	clearBackground() {		
		this.game.fillStyle = this.bg;
		this.game.fillRect(0, 0, 16, 16);
	}

	move(dir) {
		this.snakePosition[0] += dir[0];
		this.snakePosition[1] += dir[1];
		// console.log(this.snakePosition);
		this.snake.push([this.snakePosition[0], this.snakePosition[1]]);
		this.snake.shift();
	}

	drawSnake() {
		// console.log(this.snake);
		for (var i = 0; i < this.snake.length; i++) {
			this.drawSegment(this.snake[i]);
		}
	}

	drawSegment(segment) {
		this.game.fillStyle = this.color;
		this.game.fillRect(segment[0], segment[1], 1,1);

	}

	increaseLength(amount) {
		this.length+=amount;

		for (var i = 0; i < amount; i++) {
			this.snake.unshift(this.snake[0]);
		}
	}

	checkSnakeCollision() {
		var trail = this.snake.slice(0, -1);

		// console.log(trail, this.snakePosition);
		for(var index in trail) {
			var segment = trail[index];
				// console.log(segment, this.snakePosition);
			if (segment[0] == this.snakePosition[0] & segment[1] == this.snakePosition[1]) {
				this.gameOver();
			}
		}
	}

	checkBorderCollision() {
		if (this.snakePosition[0] < 0 || this.snakePosition[1] < 0 || this.snakePosition[0] > this.size[0] - 1 || this.snakePosition[1] > this.size[1] - 1) {
			this.gameOver();
		}
	}

	checkItemCollision() {
		for(var item in this.items) {
			// console.log(item, this.snakePosition);
			if (this.items[item][0] == this.snakePosition[0] & this.items[item][1] == this.snakePosition[1]) {
				// console.log("collision");
				this.removeItem(this.items[item]);
				this.increaseLength(1);
				this.generateItem();
			}
		}
	}

	drawItems() {
		// console.log(this.items);
		for (var i = 0; i < this.items.length; i++) {
			this.drawItem(this.items[i])
		}
	}

	drawItem(pos) {
		this.game.fillStyle = this.coinColor;
		this.game.fillRect(pos[0], pos[1], 1,1);
	}
		
}

class FaviconRenderer {
	constructor() {
		this.element = this.createElement();
	}

	createElement() {
		let element = document.createElement("link");
		element.rel = "shortcut icon";
		element.type = "image/png";
		element.href = " ";
		document.getElementsByTagName("head")[0].appendChild(element);
		return element;
	}

	render(image) {
		// console.log(image);
		this.element.href = image;
	}
}

let game = new Game();

