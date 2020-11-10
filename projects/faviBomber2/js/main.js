class Game {
	constructor() {
		// settings
		this.width = 16;
		this.height = 16;
		this.colors = {
			background: "#F8DEA6",
			walls: "#24211E",
			crates: "#A0623C", 
			bombs: "#FFF83E",
			explosion: "#FFFFFF", 
		}
		this.playerPos = {x: 0,}
		this.nrOfPlayers = 3;
		this.playerOptions = [
			new ActivePlayer(1, 1, "purple"),
			new Opponent(this.width-2, 1, "blue"),
			new Opponent(this.width-2, this.height-2, "red"),
			new Opponent(1, this.height-2, "green"),
		]
		// init vars
		this.loop = new GameLoop(20);
		this.renderer = new FaviconRenderer();
		// 

		// init canvas
		this.gameElem = document.createElement("canvas");	
		this.gameElem.style.width = "100vmin";
		this.gameElem.style.height = "100vmin";		
		this.gameElem.width = this.width;
		this.gameElem.height = this.height;
		// this.gameElem.style.display = "none";

		document.body.appendChild(this.gameElem);
		this.game = this.gameElem.getContext("2d");

		// setup this shit
		this.setup();
	}

	setup() {		
		this.board = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,2,0,0,2,2,2,2,2,0,0,0,1],
			[1,0,1,2,1,2,1,2,2,1,2,1,2,1,0,1],
			[1,0,2,0,2,2,0,2,2,2,0,2,2,0,0,1],
			[1,0,1,2,1,0,1,2,2,1,0,1,2,1,2,1],
			[1,0,2,2,2,2,0,2,2,2,2,2,0,2,2,1],
			[1,0,1,0,1,0,1,2,0,1,0,1,2,1,2,1],
			[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
			[1,2,0,2,2,2,2,2,2,2,2,2,2,0,0,1],
			[1,2,1,0,1,0,1,2,2,1,2,1,0,1,2,1],
			[1,2,2,2,0,2,2,2,2,0,2,2,2,2,2,1],
			[1,2,1,0,1,2,1,2,2,1,2,1,0,1,0,1],
			[1,0,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
			[1,0,1,2,1,0,1,2,0,1,2,1,2,1,0,1],
			[1,0,0,0,0,0,2,2,2,2,2,2,2,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		]
		this.players = this.generatePlayers();
		this.player = this.players[0];
		this.activeBombs = [];

		console.log(this.players);
		this.start()
	}

	start() {
		this.loop.start(() => {this.tick()});
	}


	generatePlayers() {
		let players = [];
		for (let i = 0; i < this.nrOfPlayers; i++) {
			if (i <= this.playerOptions.length) {
				let player = this.playerOptions[i];
				players.push(player)
			}
		}
		return players;
	}

	tick() {
		// console.log("tick");
		this.drawBackground();
		this.drawBombs();
		this.drawPlayers();
		this.notifyPlayers();
		this.tickBombs();
		
		this.renderer.render(this.game);
	}

	drawBackground() {
		this.game.fillStyle = this.colors.background;
		this.game.fillRect(0, 0, 16, 16);

		for (let y = 0; y < this.board.length; y++) {
			let row = this.board[y];
			for (let x = 0; x < row.length; x++) {
				let cell = row[x];
				switch (cell) {
					case 1:
						this.drawWall(x, y);
						break;
					case 2:
						this.drawCrate(x,y);
						break;
				}
			}
		}
	}

	drawPlayers() {
		for (var i = 0; i < this.players.length; i++) {
			let player = this.players[i];
			
			// if player is alive
			if (player.health > 0) {
				this.game.fillStyle = player.color;
				this.game.fillRect(player.pos.x, player.pos.y, 1, 1);
			}
		}
	}

	drawBombs() {
		console.log(this.activeBombs);
		for (let bomb of this.activeBombs) {
			this.game.fillStyle = this.colors.bombs;
			this.game.fillRect(bomb.pos.x, bomb.pos.y, 1, 1);
		}
	}

	drawWall(x, y) {
		this.game.fillStyle = this.colors.walls;
		this.game.fillRect(x, y, 1, 1);
	}

	drawCrate(x, y) {
		this.game.fillStyle = this.colors.crates
		this.game.fillRect(x, y, 1, 1);
	}

	notifyPlayers() {
		for( let player of this.players) {
			// console.log(player);
			
			// if player is alive
			if (player.health > 0) {

				let move = player.update(this.board);
				if (player.bombQueue.length > 0) {
					this.plantBomb(player.bombQueue.pop());
				}
			}	
		}
	}

	plantBomb(bomb) {
		console.log("bomb planted");
		this.activeBombs.push(bomb);
	}

	tickBombs() {
		for (let i in this.activeBombs) {
			let bomb = this.activeBombs[i];

			let timeUp = bomb.tick();
			if (timeUp) {
				this.explodeBomb(bomb);
				this.activeBombs.splice(i,1);
			}
		}
	}

	explodeBomb(bomb) {
		let damage = bomb.getDamage(this.board);
		let explosion = bomb.getExplosion(this.board);
		bomb.owner.nrOfBombs++;

		this.showExplosion(explosion);
		this.destroyCrates(damage);
		this.damagePlayersInsideExplosion(explosion);
	}

	destroyCrates(positions) {
		for (let pos of positions) {
			this.board[pos.y][pos.x] = 0;
		}
	}

	damagePlayersInsideExplosion(explosion) {
		for (let pos of explosion) {
			for (let player of this.players) {
				if (player.pos.x == pos.x && player.pos.y == pos.y) {
					player.damage();
				}
			}
		}
	}

	showExplosion(explosion) {
		for (let pos of explosion) {
			this.game.fillStyle = this.colors.explosion;
			this.game.fillRect(pos.x, pos.y, 1, 1);
		}
	}

}


class Player {
	constructor(x, y, color) {
		this.pos = {x: x, y: y};
		this.color = color;
		this.bombQueue = [];
		this.nrOfBombs = 1;
		this.radius = 3;
		this.health = 3;
	}

	update(board) {		
		
	}

	plantBomb() {
		if (this.nrOfBombs > 0) {
			this.bombQueue.push(new Bomb(this, this.pos.x, this.pos.y, this.radius, 10));
			this.nrOfBombs--;
		}
	}

	damage() {
		this.health--;
		console.log("ouch... Damage! Health is at" + this.health);
	}

	getSurroundingCells(board) {
		let cells = [[1,0],[0,1],[-1,0],[0,-1]];
		let valid = [];

		for (let cell of cells) {
			let x = this.pos.x + cell[0];
			let y = this.pos.y + cell[1];

			if (y <= board.length && x <= board[0].length) {
				if (board[y][x] == 0) {
					valid.push({x: x, y: y});
				}
			}
		}
		return valid;
	}

	calcMove(move) {
		return {x: this.pos.x + move.x, y: this.pos.y + move.y}
	}
}

class Opponent extends Player {
	constructor(x, y, color) {
		super(x, y, color);
	}

	update(board) {
		let valid = this.getSurroundingCells(board);
		let move = valid[Math.floor(Math.random() * valid.length)];		
		this.pos = move;

		if (Math.round(Math.random()*20) == 1) {
			this.plantBomb();
		}
	}
}

class ActivePlayer extends Player {
	constructor(x, y, color) {
		super(x, y, color);
		this.dir = {x: 0, y: 0};
		this.keys = {};
		this.armBomb = false;
		document.onkeyup = document.onkeydown = (e) => this.listKeys(e);
		// document.addEventListener("keydown", (e) => this.onKeydown(e));
	}

	listKeys(e) {
		this.keys[e.key] = e.type == 'keydown';
		this.setKeyStates();
	}

	isPressed(key) {
		if (key in this.keys) {
			return this.keys[key];
		}
		return false;
	}

	setKeyStates(e) {
		if (this.isPressed("ArrowLeft")) this.dir = {x: -1, y: 0}
		if (this.isPressed("ArrowRight")) this.dir = {x: 1, y: 0}
		if (this.isPressed("ArrowUp")) this.dir = {x: 0, y: -1}
		if (this.isPressed("ArrowDown")) this.dir = {x: 0, y: 1}
		if (this.isPressed(" ")) this.armBomb = true;
	}

	update(board) {
		let move = this.calcMove(this.dir);
		if (this.armBomb) {
			this.plantBomb();
		}

		if (board[move.y][move.x] == 0) {
			this.pos = move;
		}
		this.dir = {x: 0, y: 0};
		this.armBomb = false;
	}
}

class Bomb {
	constructor(owner, x, y, radius, timeout) {
		this.owner = owner;
		this.pos = {x: x, y: y};
		this.radius = radius;
		this.timeout = timeout;
	}

	tick() {
		this.timeout--;
		if (this.timeout < 0) {
			return true;
		}
		return false;
	}

	calcOffset(offset) {
		return {x: this.pos.x + offset.x, y: this.pos.y + offset.y}
	}

	getDamage(board) {		
		let dirs = [[1,0],[0,1],[-1,0],[0,-1]];
		let damage = [];
		for (let dir of dirs) {
			for (var i = 1; i < this.radius; i++) {
				let pos = this.calcOffset({x: dir[0]*i, y: dir[1]*i});
				if (pos.y >= 0 && pos.y < board.length && pos.x >= 0 && pos.x < board[0].length) {
					console.log(pos);
					if (board[pos.y][pos.x] == 2) {
						damage.push(pos);
						break;
					}					
					if (board[pos.y][pos.x] != 0) {
						break;
					}

				} else {					
					break;
				}
			}
		}
		return damage;
	}

	getExplosion(board) {
		let dirs = [[1,0],[0,1],[-1,0],[0,-1]];
		let explosion = [];
		explosion.push(this.pos);
		for (let dir of dirs) {
			for (var i = 1; i < this.radius; i++) {
				let pos = this.calcOffset({x: dir[0]*i, y: dir[1]*i});
				if (pos.y >= 0 && pos.y < board.length && pos.x >= 0 && pos.x < board[0].length) {		
					
					if (board[pos.y][pos.x] == 0) {
						explosion.push(pos);
					} else if (board[pos.y][pos.x] == 2) {
						explosion.push(pos);							
						break;
					} else {
						break;
					}
				} else {					
					break;
				}
			}
		}
		console.log(explosion);
		return explosion;
	}
}


class GameLoop {
	constructor(tickSpeed) {
		this.tickSpeed = tickSpeed;
		this.frame = 0;
		this.tick = 0;
	}

	start(tickCallback) {
		this.tickCallback = tickCallback;
		this.loop();
	}

	loop() {	
		if (this.frame % this.tickSpeed == 0) {
			this.tick++;
			this.tickCallback();
		}
		this.frame++;
	  	window.requestAnimationFrame(this.loop.bind(this));
	}
}

class FaviconRenderer {

	createElement(image) {
		this.element = document.createElement("link");
		this.element.rel = "shortcut icon";
		this.element.type = "image/ico";
		this.element.href = image;
		document.getElementsByTagName("head")[0].appendChild(this.element);
	}

	render(canvas) {
		if (this.element) {
			this.element.remove();
		}
		let canvasElem = canvas.canvas;
		this.createElement(canvasElem.toDataURL("image/png"));
	}
}

let game = new Game();

