var frameCount;
var	fps = 300;
var instant = true;
var mazeDim = [30,20];
var cellSize = 20;
var borderWidth = 1;
var borderColor = 0;
var pathColor = "#ffffff";
var board;
var currentCell = [0,0];
var queue;
var width;
var height;
var loop;
var loopClock;


var c = document.getElementById("maze");
var canvas = c.getContext("2d");
var loop;

setup();



// setup default values in form
displaySetting("fps", fps);
displaySetting("width", mazeDim[0]);
displaySetting("height", mazeDim[1]);
displaySetting("cellSize", cellSize);
displaySetting("borderWidth", borderWidth);
displaySetting("borderColor", borderColor);
displaySetting("pathColor", pathColor);
displaySetting("instant", instant);

// trigger form
form = document.getElementById("mazeForm");
form.addEventListener("submit", function(e) {
	e.preventDefault();
	fps = parseInt(getSetting("fps"));
	mazeDim = [parseInt(getSetting("width")), parseInt(getSetting("height"))];
	cellSize = parseInt(getSetting("cellSize"));
	borderWidth = parseInt(getSetting("borderWidth"));
	borderColor = getSetting("borderColor");
	pathColor = getSetting("pathColor");
	instant = JSON.parse(getSetting("instant"));
	console.log(instant);
	stopLoop();
	setup();
	startLoop();
});

function getSetting(name) {

	value = document.getElementsByName(name)[0].value;
	type = document.getElementsByName(name)[0].type;

	console.log(type);
	if (type == "checkbox") {
		return document.getElementsByName(name)[0].checked;
	} else {
		return value;
		
	}

}

function displaySetting(name, value) {
	type = document.getElementsByName(name)[0].type;
	console.log()
	if (type == "checkbox") {
		document.getElementsByName(name)[0].checked = value;
	} else {
		document.getElementsByName(name)[0].value = value;
	}
}

function startLoop() {
	loopClock = setInterval(function(){ step(); }, 1000 / fps);
}

function stopLoop() {
	clearInterval(loopClock);
	loopClock = "";
	console.log("stopping loop");
	loop = false;
}


function setup() {
	board = [];
	currentCell = [0,0];
	loop = true;

	width = (cellSize * mazeDim[0]) + borderWidth;
	height = (cellSize * mazeDim[1]) + borderWidth;
	frameCount = 0;	
	console.log(cellSize + " * " + mazeDim[0] + " + " + borderWidth);
	queue = [];
	c.width = width;
	c.height = height;

	canvas.fillStyle = borderColor;
	canvas.fillRect(0,0,width,height);

	for(var i = 0; i < mazeDim[1];i++) {
		boardRow = [];
		for(var j = 0; j < mazeDim[0];j++) {
			if ([j,i].toString() == currentCell.toString()) {
				boardRow.push(1);
			} else {
				boardRow.push(0);
			}
		}
		board.push(boardRow);

	}

	console.log(board);


	canvas.fillStyle = pathColor;
	drawCell(currentCell);

	if (instant == false) {
		console.log("step mode");
		startLoop();
	} else {
		while (loop == true) {
			step();
		}
		console.log("instant mode");
	}

}

function step() {
	frameCount++;
	// console.log(frameCount);



	// check every surrounding cell

	surroundings = [];
	surroundings.push( [currentCell[0]		, currentCell[1] - 1] ); // top
	surroundings.push( [currentCell[0] + 1	, currentCell[1]	] ); // right
	surroundings.push( [currentCell[0]		, currentCell[1] + 1] ); // bottom
	surroundings.push( [currentCell[0] - 1	, currentCell[1]	] ); // left



	// console.log(surroundings);

	hasMoves = false;
	for (var i = 0; i < surroundings.length; i++) {
		if(checkCell(surroundings[i])) {
			hasMoves = true;
		};
	}

	// console.log(hasMoves);

	// if there are cells available pick a random one

	// if none 


	dir = Math.floor(Math.random() * 4);

	// check if next block in direction is empty;

	var newCell = [];
	newCell = surroundings[dir];

	// console.log(newCell[0] + ":" + newCell[1] + " - " + currentCell[0] + ":" + currentCell[1]);


	if (hasMoves == true) {
		if (checkCell(newCell) == true) {
			drawCell(newCell, dir);
			queue.push(newCell);
			// console.log("legit pos");
			currentCell = newCell;

		} else {
			// console.log("not legit pos");
		}		
	} else {
		// start backtracking
		// console.log("start backtracking");

		// console.log(queue);

		currentCell = queue.pop();
		if (queue.length == 0) {
			
			clearInterval(loopClock);
	loopClock = "";
	console.log("stopping loop");
	loop = false;
		}
	}

}

function checkCell(coordinates) {
	// if out of bounds
	if (coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] > mazeDim[0] - 1 || coordinates[1] > mazeDim[1] - 1) {
		// console.log("out of bounds");
		return false;
	}


	// if cell is already used
	if (board[coordinates[1]][coordinates[0]] == 0 ) {
		return true;
	} else {
		return false;
	}
}


function drawCell(coordinates, dir = -1) {

	rectX = borderWidth + coordinates[0] * cellSize;
	rectY = borderWidth + coordinates[1] * cellSize;
	rectWidth = cellSize - borderWidth;
	rectHeight = cellSize - borderWidth;

	switch (dir) {
		case 0:
			rectHeight+= borderWidth;
			break;
		case 1:
			rectX-= borderWidth;
			rectWidth+= borderWidth;
			break;
		case 2:
			rectY-= borderWidth;
			rectHeight+= borderWidth;
			break;
		case 3:
			rectWidth+= borderWidth;
			break;
	}


	canvas.fillRect(rectX, rectY, rectWidth, rectHeight);

	board[coordinates[1]][coordinates[0]] = 1;
}