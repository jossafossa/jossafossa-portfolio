class Game {
	constructor() {
		// settings
		this.width = 16;
		this.height = 16;
		this.bg = "#272727";

		// init vars
		this.loop = new GameLoop(20);
		this.renderer = new FaviconRenderer();
		this.pieceGenerator = new PieceGenerator(this.width, 1);

		this.piece = false;
		this.piecePos = [0,0];
		this.dir = 0;
		this.fall = false;
		this.board = this.generateEmptyBoard();
		this.colors = this.generateEmptyBoard();

		// init canvas
		this.gameElem = document.createElement("canvas");	
		this.gameElem.style.width = "100vmin";
		this.gameElem.style.height = "100vmin";		
		this.gameElem.width = this.width;
		this.gameElem.height = this.height;
		this.gameElem.style.display = "none";

		document.body.appendChild(this.gameElem);
		this.game = this.gameElem.getContext("2d");


		// keyboard
		document.addEventListener("keydown", (e) => this.keyPress(e));

		// start this shit
		this.start();
	}

	start() {
		this.loop.start(() => {this.tick()});
	}

	reset() {
		this.board = this.generateEmptyBoard();
		this.colors = this.generateEmptyBoard();
		this.piece = false;
	}

	tick() {
		console.log("tick");
		this.drawBackground();
		this.drawBoard();
		this.removeFullRows();
		this.checkDeath();

		if (this.piece == false) {
			this.newPiece();
		}



		let newPiecePos = [this.piecePos[0], this.piecePos[1]];

		console.log(this.fall);
		if (this.fall) {
			newPiecePos[1] = this.calcFall(this.piece, this.piecePos[0], this.piecePos[1]);
			console.log(newPiecePos);
		} else {	
			if (this.loop.tick % 2 == 1) {
				newPiecePos[1]++;
			}
		}


		// check if of board
		if (this.isOfBoard( this.piece.calcOffset(newPiecePos[0] + this.dir, newPiecePos[1]) )) {
			this.dir = 0;
			console.log(this.dir, " && colliding");
		}


		let newPieceBlocks = this.piece.calcOffset(newPiecePos[0] + this.dir, newPiecePos[1]);

		// check collision with board
		if (this.isColliding(newPieceBlocks)) {
			this.bakePiece(this.piece, this.piecePos[0], this.piecePos[1]);
			this.newPiece();
		} else {
			newPiecePos[0] += this.dir;
			this.piecePos = newPiecePos;
			this.drawPiece();
		}
	

		this.renderer.render(this.game);

		this.dir = 0;
		this.fall = false;
	}

	checkDeath() {
		if (this.board[0].includes(1)) {
			this.reset();
		}
	}

	newPiece() {
		this.piece = this.pieceGenerator.generate();
		let x = Math.floor(this.width / 2);
		this.piecePos = [x,0];
	}

	isOfBoard(blocks) {
		for (let block of blocks) {
			if (block[0] < 0 || block[0] > this.width - 1) {
				return true;
			}
		}
		return false;
	}

	isColliding(blocks) {
		// console.log(blocks);
		for (let block of blocks) {
			if (this.board.length <= block[1] || this.board[block[1]][block[0]] != 0) {
				return true;
			}
		}
		return false;
	}

	keyPress(e) {
		let key = e.key;
		if (key == "ArrowLeft") {
			this.dir = -1;
		}
		if (key == "ArrowRight") {
			this.dir = 1;
		}
		if (key == "ArrowUp") {
			this.piece.rotateClockwise();
		}
		if (key == "ArrowDown") {
			this.fall = true;
		}
	}

	generateEmptyBoard() {
		let board = [];
		for (var y = 0; y < this.height; y++) {
			board.push(this.generateEmptyRow());
		}
		return board;
	}

	generateEmptyRow() {
		let arr = [];
		for (var i = 0; i < this.width; i++) {
			arr.push(0);
		}
		return arr;
	}

	calcFall(piece, x, y) {
		let found = true;
		while(found) {
			let newPos = this.piece.calcOffset(x, y + 1);
			if (!this.isOfBoard( newPos ) && !this.isColliding( newPos )) {
				y++;
			} else {
				return y;
			}
		}
	}

	drawPiece() {
		this.drawPieceAt(this.piece, this.piecePos[0], this.piecePos[1]);
	}

	removeFullRows() {
		let deleted = [];
		for (var y = 0; y < this.height; y++) {
			let full = false;
			for (var x = 0; x < this.width; x++) {
				let item = this.board[y][x];
				if (item !== 1) {
					break;
				}
				if (x == this.width - 1) {
					full = true;
				}
			}
			if (full) {
				deleted.unshift(y);
			}	
		}
		for (var i = deleted.length - 1; i >= 0; i--) {
		 	let row = deleted[i];
			this.board.splice(row, 1);
			this.board.unshift(this.generateEmptyRow());
		}
		console.log(this.board);
	}

	bakePiece(piece, x, y) {
		let blocks = piece.calcOffset(x,y);
		for (let block of blocks) {
			this.board[block[1]][block[0]] = 1;
			console.log(this.colors);
			this.colors[block[1]][block[0]] = piece.color;
		}
		console.log(this.board);
	}

	drawPieceAt(piece, x, y) {
		this.game.fillStyle = piece.color;
		let blocks = piece.calcOffset(x, y);
		for (let block of blocks) {
			this.game.fillRect(block[0], block[1], 1, 1);
		}
	}

	drawBackground() {
		this.game.fillStyle = this.bg;
		this.game.fillRect(0, 0, 16, 16);
	}

	drawBoard() {
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				if (this.board[y][x] == 1) {
					this.game.fillStyle = this.colors[y][x];
					this.game.fillRect(x, y, 1, 1);
				}
			}
		}
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

class PieceGenerator {
	constructor(width, height) {
		this.pieces = [
			[[0,0], [0,1], [0,2], [0,3]], 	// long
			[[0,0], [0,1], [0,2], [1,1]], 	// T-shape
			[[0,0], [0,1], [1,0], [1,1]], 	// cube
			[[0,0], [1,0], [1,1], [2,1]], 	// stair
			[[0,0], [0,1], [0,2], [1,2]] 	// L shape
		]
	
	}

	getRandomPiece() {
		let pieceLayout = this.pieces[Math.floor( Math.random() * this.pieces.length )];
		return new Piece(pieceLayout);
	}

	generate() {
		let x = Math.floor( Math.random() * this.width );
		return this.getRandomPiece(); 
	}

	
}

class Piece {
	constructor(blocks) {
		this.blocks = blocks;
		this.colors = ["#FF6200", "#FF1A00", "#4B2AFF", "#188518", "#F6B900", "#C832E1", "#1F99A9"];
		this.color = this.randomColor();
	}

	randomColor() {
		return this.colors[Math.floor(Math.random()*this.colors.length)];
	}

	calcOffset(x, y) {
		let offset = [];
		for (let block of this.blocks) {
			offset.push([block[0] + x, block[1] + y]);
		}
		return offset;
	}

	prettyPrint() {
		var arr = [[" "," "," "," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," "]];
		for (let block of this.blocks) {
			arr[block[1]][block[0]] = "#";
		}

		var str = "";
		for (let row of arr) {
			str += row.join("");
			str += "\n";
		}
		console.log("\n-----------------------");
		console.log(str);
		console.log("-----------------------");
	}

	rotateClockwise() {
		let rotation = []
		for (let block of this.blocks) {
			rotation.push([-block[1], block[0]]);
		}
		this.blocks = rotation;
		this.cleanup();
	}

	getBlocks() {
		return this.blocks;
	}

	cleanup() {
		var xOffset = 0; var yOffset = 0;
		for (let block of this.blocks) {
			var x = block[0];
			var y = block[1];
			if (x < xOffset && x < 0) {
				xOffset = x;
			}
			if (y < yOffset && y < 0) {
				yOffset = y;
			}
		}
		this.blocks = this.calcOffset(-xOffset, -yOffset);
	}

	rotateCounterClockwise() {

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

	render(canvas) {
		let element = canvas.canvas;
		this.element.href = element.toDataURL("image/png");
	}
}

let game = new Game();

