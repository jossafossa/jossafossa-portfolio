$(document).ready(function(){
	// chess settings
	

	settings = {
		"width":8,
		"height":8,
		"color1":"#e9c88b",
		"color2": "#be7f49",
	}
	maxSize = 64;

	if (localStorage.getItem("settings") !== null) {
		settings = JSON.parse(localStorage.getItem("settings"));
		console.log("getting settings from localstorage");
		console.log(settings);
	} else {
		updateSettings(settings);
		console.log("no localstorage settings found");
	}

	function updateSettings(settings) {
		localStorage.setItem("settings", JSON.stringify(settings));
	}


	// CHESSPIECES ID'S //
	// 1 	= white pawn
	// 2 	= white knight
	// 3 	= white bishop
	// 4 	= white rook
	// 5 	= white king
	// 6 	= white queen
	
	// 7 	= black pawn
	// 8 	= black knight
	// 9 	= black bishop
	// 10 	= black rook
	// 11 	= black king
	// 12 	= black queen
	var defaultBoard = [
		4 ,2 ,3 ,6 ,5 ,3 ,2 ,4 ,
		1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,
		0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,
		0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,
		0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,
		0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,
		7 ,7 ,7 ,7 ,7 ,7 ,7 ,7 ,
		10,8 ,9 ,12,11,9 ,8 ,10,
	];



	customCSSElem = $("<style class='customCSS'></style>");
	customCSSElem.appendTo("body");
	customCSS = ``;
	cell = "<div class='cell'></div>";


	// 
	// MENU

	var menu = "#main-menu > .menu-items";
	var menuElem = $(menu);
	var elem;
	var menuItems = [];


	// menu
	function createMenuItem(label, items = [] ) {
		elem = "";
		for (var i = 0; i < items.length; i++) {
			slug = items[i][0];
			type = items[i][1];
			value = items[i][2];

			switch (type) {
			case "text":
				elem += generateTextMenuItem(slug, type, value);
				break;
			case "color":
				elem += generateColorMenuItem(slug, type, value);
				break;
			case "number":
				elem += generateNumberMenuItem(slug, type, value);
				break;
			}

			menuItems.push([slug,type,value]);

		}
		

		console.log(menu);
		console.log(elem);

		menuItem = `<li><label>${label}</label><div class="input-group">${elem}</div>`; 


		$(menuItem).appendTo(menu);
	}

	function generateNumberMenuItem(slug, type, value) {
		return `<input name="${slug}" type="${type}" value="${value}">`;
	}

	function generateColorMenuItem(slug, type, value) {
		return `<input name="${slug}" type="${type}" value="${value}">`;
	}

	

	createMenuItem("dimensions", [["width", "number", settings["width"]], ["height", "number", settings["height"]]]);
	createMenuItem("Colors", [["color1", "color", settings["color1"]], ["color2", "color", settings["color2"]]]);


	$(".menu-button").on("click", function() {
		var targetMenu = $(this).closest("menu");
		targetMenu.toggleClass("collapsed");
		$(this).toggleClass("open");
	});

	function getMenuValue(slug) {
		return $(".menu-items  input[name=" + slug + "]").val();
	}

	function setMenuValue(slug, value) {
		$(".menu-items  input[name=" + slug + "]").val(value);
	}

	function updateMenuList() {
		for (var i = 0; i < menuItems.length; i++) {
			menuItems[i][2] = getMenuValue(menuItems[i][0]);
		}
	}



	

	// END MENU


	var boardDimensions = [settings["width"], settings["height"]];
	var color1 = settings["color1"];
	var color2 = settings["color2"];

	$('.update-settings').on("click", function() {
		updateMenuList();
		console.log(menuItems);	

		if (getMenuValue("width") > maxSize) {
			setMenuValue("width", maxSize);
		}
		if (getMenuValue("height") > maxSize) {
			setMenuValue("height", maxSize);
		}

		boardDimensions = [getMenuValue("width"), getMenuValue("height")];
		color1 = getMenuValue("color1");
		color2 = getMenuValue("color2");

		settings = {
			"width":boardDimensions[0],
			"height":boardDimensions[1],
			"color1":color1,
			"color2": color2,
		}

		updateSettings(settings);
		clearBoard();
		setupBoard();
	})


	// piece rules
	/*

	markup:
	; = rule seperator
	, = coordinates sepetator
	
	prefixes:
	m = move rule
	c = capture rule
	f = first move rule

	suffixes:
	i = infinite

	*/

	// [id, name, player, image, logic]

	pieces = [		
		[1, 	"pawn", 	1, "img/pawn1.svg", "m0,1;f0,1i2;c1,1;c-1,1;tr8:6"],
		[2, 	"knight", 	1, "img/knight1.svg", "mc1,2;mc2,1;mc2,-1;mc1,-2;mc-1,-2;mc-2,-1;mc-2,1;mc-1,2"],
		[3, 	"bishop", 	1, "img/bishop1.svg", "mc1,1i;mc1,-1i;mc-1,-1i;mc-1,1i"],
		[4, 	"rook", 	1, "img/rook1.svg", "mc0,1i;mc1,0i;mc0,-1i;mc-1,0i"],
		[5, 	"king", 	1, "img/king1.svg", "mc0,1;mc1,1;mc1,0;mc1,-1;mc0,-1;mc-1,-1;mc-1,0;mc-1,1"],
		[6, 	"queen", 	1, "img/queen1.svg", "mc0,1i;mc1,1i;mc1,0i;mc1,-1i;mc0,-1i;mc-1,-1i;mc-1,0i;mc-1,1i"],
		[7, 	"pawn", 	2, "img/pawn2.svg", "m0,-1;f0,-1i2;c1,-1;c-1,-1;tr1:12"],
		[8, 	"knight", 	2, "img/knight2.svg", "mc1,2;mc2,1;mc2,-1;mc1,-2;mc-1,-2;mc-2,-1;mc-2,1;mc-1,2"],
		[9, 	"bishop", 	2, "img/bishop2.svg", "mc1,1i;mc1,-1i;mc-1,-1i;mc-1,1i"],
		[10, 	"rook", 	2, "img/rook2.svg", "mc0,1i;mc1,0i;mc0,-1i;mc-1,0i"],
		[11, 	"king", 	2, "img/king2.svg", "mc0,1;mc1,1;mc1,0;mc1,-1;mc0,-1;mc-1,-1;mc-1,0;mc-1,1"],
		[12, 	"queen", 	2, "img/queen2.svg", "mc0,1i;mc1,1i;mc1,0i;mc1,-1i;mc0,-1i;mc-1,-1i;mc-1,0i;mc-1,1i"],
		[13, 	"queen2", 	2, "img/queen2.svg", "mc0,1i3;mc1,1i3;mc1,0i3;mc1,-1i3;mc0,-1i3;mc-1,-1i3;mc-1,0i3;mc-1,1i3"],
	]



	// prepare pieces

	function preparePieces() {
		css = "";
		for (var i = 0; i < pieces.length; i++) {
			id = pieces[i][0];
			image = pieces[i][3];
			css += `#board .cell[piece="${id}"] {background-image:url(${image})} `;
		}
		addCustomCSS(css);
	}
	


	board = $("#board");	
	activePlayer = 2;
	scores = [
		{"nrOfPieces" : 0, "pieces": [] },
		{"nrOfPieces" : 0, "pieces": [] }
	];

	// console.log(score);

	function updateScore(player, piece) {
		// console.log(piece);
		incrementScore(player, piece);
		showScore();
	}

	// score
	function incrementScore(player, piece) {
		console.log(score);
		console.log(player - 1);
		scores[player - 1]["nrOfPieces"]++;
		scores[player - 1]["pieces"].push(piece);
	}

	function showScore() {
		scoreElem = $("#score");
		scoreText = "";
		for (var i = 0; i < scores.length; i++) {
			
			player = i + 1;

			score = scores[i]["nrOfPieces"];

			scoreText += `player ${player} = ${score}\n `;
		}

		// scoreElem.text(scoreText);

		console.log(scores);
	}


	setupBoard();

	function clearBoard() {
		$("#board").empty();
		$("#player-message-container").empty();		
		removeCellEvent();
		activePiece = false;
		activePlayer = 2;
	}

	function setupBoard() {
		drawBoard();
		createCellEvent();
		setupPlayerBoard();
		preparePieces();
		sendMessageToPlayer(2, "It's your turn");
		populateBoard(defaultBoard);
	}

	function drawBoard() {
		console.log("drawing board");
		color = 1;
		isEven = (boardDimensions[0] % 2) == 0 ? true : false;
		// console.log(isEven);
		id = 0;

		for (var y = 0; y < boardDimensions[1]; y++) {

			for (var x = 0; x < boardDimensions[0]; x++) {
				(color == 1) ? color = 2 : color = 1;

				$(cell).appendTo("#board").attr({"bgcolor": color});
				id++;
			}

			if (isEven) {				
				(color == 1) ? color = 2 : color = 1;
			}
		}

		boardWidth = boardDimensions[0] / boardDimensions[1];


		customCSS = `.cell {width:calc(100% / ${boardDimensions[0]}); height:calc(100% / ${boardDimensions[1]});}`;
		customCSS += `.cell[bgcolor="1"] {background-color:${color1}} .cell[bgcolor="2"] {background-color:${color2}}`;
		customCSS += `#board { height:80vmin; width:calc(80vmin * ${boardWidth} ) } @media screen and (max-width:40rem) { #board { height:100vmin; width:calc(100vmin * ${boardWidth} ) } }`;
		addCustomCSS(customCSS);
	}

	var cells;

	function populateBoard(boardLayout) {
		console.log("populating board");
		// console.log(boardLayout);
		cells = $('#board .cell');
		cells.each(function(index) {
			piece = boardLayout[index];
			if (piece > 0) {
				player = pieces[piece - 1][2];
			} else {
				player = 0;
			}
			$(this).attr({"piece": piece, "player": player, "firstMove": true});
		});
	}


	function setupPlayerBoard() {
		nrOfPlayers = 2;
		playerNames = ["black", "white"];
		playerContainer = "#player-message-container";

		for (var i = 0; i < nrOfPlayers; i++) {
			playerMessageBoard = "<div player=" + (i + 1) + " class='player-board'><h1>" + playerNames[i] + "</h1><div class='player-messages'></div></div>";
			console.log(playerMessageBoard);
			$(playerMessageBoard).appendTo(playerContainer);
		}
	}

	function sendMessageToPlayer(player, message) {
		$(".player-board[player=" + player + "] > .player-messages").text(message);
	}

	function clearMessages() {
		$(".player-messages").html("");
	}

	function getCellIndexByPos(pos) {
		return pos[1] * boardDimensions[0] + pos[0];
	}

	function getCellPosByIndex(index) {
		total = boardDimensions[0] * boardDimensions[1];
		x = index % boardDimensions[0];
		y = Math.floor(index / boardDimensions[0]);
		pos = [x,y];
		// console.log(pos);
		return pos;
	}


	function getElemByIndex(index) {
		elem = cells.eq(index);
		return elem;
	}

	function addCustomCSS(css) {
		currentCSS = customCSSElem.text();
		customCSSElem.text(currentCSS + css);
	}

	activePiece = false;


	function createCellEvent() {		
		$('.cell').on("click touch", function() {
			elem = $(this);
			player = elem.attr("player");
			if (activePiece == false) {

				if (playerIsActive(player)) {
					selectPiece(elem);
				}

				
			} else {

				placePieceSequence(elem);

			}
		})
	}

	function removeCellEvent() {
		$('.cell').unbind("click touch");
	}

	function playerIsActive(player) {
		console.log(player + " == " + activePlayer);
		return (player == activePlayer) ? true : false;
	}

	function SwitchPlayer() {
		activePlayer = (activePlayer == 1) ? 2 : 1;
		clearMessages();
		sendMessageToPlayer(activePlayer, "It's your turn");
	}

	function selectPiece(elem) {
		index = elem.index();
		// console.log(index);
		piece = elem.attr("piece");


		// if cell has piece
		if (piece !== "0") {

			logic = pieces[piece - 1][4];

			ppos = getCellPosByIndex(index);

			parsedLogic = parseLogic(logic);

			console.log(parsedLogic);

			player = getPieceByCell(ppos)["player"];

			moves = getMoves(ppos, parsedLogic, player);
			console.log(moves);



			cells.removeClass("piece-hover");
			elem.addClass("piece-hover");

			activePiece = {"elem": elem, "moves": moves};

		}
	}

	function placePieceSequence(elem) {
		index = elem.index();
		pos = getCellPosByIndex(index);
		piece = getPieceByCell(pos);
		console.log(piece);
		validMoves = activePiece["moves"]["validMoves"];
		transformLocations = activePiece["moves"]["transformLocations"];
		validCaptures = activePiece["moves"]["validCaptures"];
		prefLocation = activePiece["elem"];
		if (cellIncludedInMoves(pos,validMoves)) {

			

			// update board
			SwitchPlayer();
			placePiece(prefLocation, elem);

			for (var i = transformLocations.length - 1; i >= 0; i--) {
				transformLocation = transformLocations[i];
				pieceID = transformLocation[1];
				if (cellIsTransformLocation(pos,transformLocation)) {
					changePieceAtCell(pos, pieceID);
				}
			}
		} else if (cellIncludedInMoves(pos,validCaptures)) {

			// update board

			// update score
			updateScore(activePlayer, piece);

			SwitchPlayer();
			placePiece(prefLocation, elem);
		} else {
			abortPlacing();
		}

	}

	function cellIncludedInMoves(needle, haystack) {
		for (var i = 0; i < haystack.length; i++) {
			x = haystack[i][0] == needle[0];
			y = haystack[i][1] == needle[1];
			if ( x && y ) {
				return true;
			}
		}
	}

	function cellIsTransformLocation(pos, transformLocation) {
		axis = transformLocation[2];
		rowOrCol = transformLocation[0];

		if (axis == "r") {
			if ( cellPosOnRow(pos, rowOrCol)) {
				return true;
			}				
		}

		if (axis == "c") {
			if ( cellPosOnCol(pos, rowOrCol)) {
				return true;
			}				
		}
		return false;

		console.log(axis);
		console.log(transformLocation);
	}



	function cellPosOnRow(pos, row) {
		if (pos[1] == row - 1) {
			return true;
		} else {
			return false;
		}
	}

	function cellPosOnCol(pos, col) {
		if (pos[0] == col - 1) {
			return true;
		} else {
			return false;
		}
	}

	// function compareCells
	// - determines if two positions are the same
	// param cell1: pos 1
	// param cell2: pos 2
	// returns boolean

	function compareCells(cell1, cell2) {
		for (var i = 0; i < cell1.length; i++) {
			if (cell1[i] != cell2[i]) {
				return false;
			}
		}
		return true
	}

	function abortPlacing() {		
		activePiece = false;
		cells.removeClass("piece-hover");
		removeHighlight();

	}

	function changePieceAtCell(pos, pieceID) {
		index = getCellIndexByPos(pos);
		elem = getElemByIndex(index);
		console.log("transforming to " + pieceID);
		console.log(elem);
		elem.attr({"piece": pieceID});
	}

	function placePiece(from, to) {
		piece = from.attr("piece");
		player = from.attr("player");
		from.attr({"piece": 0, "player": 0, "firstmove" : false});
		to.attr({"piece": piece, "player":player });
		to.attr({"firstmove": false});
		activePiece = false;		
		removeHighlight();
	}



	// 	function parseLogic
	//	parameter logic: string of logic rules
	// 	returns array with logic
	// 	array contains:
	// 	moves[x,y,infinite]
	//	captureMoves[x,y,infinite]
	//	firstMoves[x,y,infinite]

	function parseLogic(logic) {
		logic = logic.split(";");
		moves = [];
		captureMoves = [];
		captureCaptures = [];
		firstCaptures = [];
		firstMoves = [];
		transformLocations = [];

		for (var i = 0; i < logic.length; i++) {
			rule = logic[i];

			regex = /^[a-zA-Z]+/g;
			prefixes = rule.match(regex)[0].split("");

			regex = /[a-zA-Z]+[0-9]*$/g;
			console.log(rule.match(regex));
			var suffixes = [];
			suffixes = rule.match(regex);
			if ( suffixes !== null ) {
				suffixes = suffixes[0].split("");
			} else {
				suffixes = [];
			}
			console.log(suffixes);

			regex = /[\-0-9]+,[\-0-9]+/g;

			// is coordinate
			if (rule.match(regex) !== null) {
				pos = rule.match(regex)[0].split(",");
				for (var j = 0; j < pos.length; j++) {
					pos[j] = parseInt(pos[j]);
				}

				if (suffixes.includes("i")) {
					pos.push(true);
				} else {
					pos.push(false);
				}

				if (suffixes.length > 1 ) {				
					pos.push(suffixes[1]);
				} else {			
					pos.push(64);				
				}


			// 
			

			

				// if move add to moves[]
				if (prefixes.includes("m")) {
					moves.push(pos);
				}

				// if capturemove add to captureMoves[]
				if (prefixes.includes("c")) {
					captureMoves.push(pos);
				}


				// if firstMoves
				if (prefixes.includes("f")) {
					firstMoves.push(pos);
				}

				// if firstMoves
				if (prefixes.includes("f") && prefixes.includes("c")) {
					firstCaptures.push(pos);
				}
			}
			regex = /[\-0-9]+:[\-0-9]+/g;
			if (rule.match(regex) !== null) {
				pos = rule.match(regex)[0].split(/[:]+/);
				for (var j = 0; j < pos.length; j++) {
					pos[j] = parseInt(pos[j]);
				}
			}

			

			


			console.log(prefixes);


			if (prefixes.includes("t")) {
				if (prefixes.includes("r")) {
					pos.push("r");
					transformLocations.push(pos);
				} else if (prefixes.includes("c")){
					pos.push("c");
					transformLocations.push(pos);
				}
			}

		}



		return {
			"moves" : moves,
			"captureMoves" : captureMoves,
			"firstMoves" : firstMoves,
			"firstCaptures" : firstCaptures,
			"transformLocations" : transformLocations,
		};
	}

	function getMoves(piecePos, logic, player) {

		removeHighlight();
		moves = logic["moves"];
		captures = logic["captureMoves"];
		firstMoves = logic["firstMoves"];
		firstCaptures = logic["firstCaptures"];
		transformLocations = logic["transformLocations"];
		validMoves = [];
		validCaptures = [];
		firstMove = getPieceByCell(piecePos)["firstMove"];

		// console.log(logic);

		if (firstMove == true) {
			// first time extra moves
			for (var i = 0; i < firstMoves.length; i++) {
				moves.push(firstMoves[i]);
			}


			// first time extra captures
			for (var i = 0; i < firstCaptures.length; i++) {
				captures.push(firstCaptures[i]);
			}
		}



		// loop through moves and get pieces
		for (var i = 0; i < moves.length; i++) {
			// console.log(moves[i]);
			// if infinite
			if (moves[i][2]) {
				limit = moves[i][3];

				infinite = getInfiniteCells(piecePos, moves[i]);

				var k = 0;	
				loop = true;
				while (loop == true && k < infinite.length && k < limit ) {	
					pos = infinite[k];	
					

					// console.log("posIsEmpty(pos) = " + posIsEmpty(pos) + " &&  posIsOnBoard(pos) = " + posIsOnBoard(pos))

					if (posIsEmpty(pos) && posIsOnBoard(pos)) {			
								
						validMoves.push(pos);
						highlightMoveCell(pos);
					} else {		
								
						loop = false;
					}
					k++;
				}
			} else {
				pos = calcPos(piecePos, moves[i]);
				if (posIsOnBoard(pos) && posIsEmpty(pos, player)) {
					piece = getPieceByCell(pos);

					highlightMoveCell(pos);
					validMoves.push(pos);	
				}
			}

			
		}

		for (var i = 0; i < captures.length; i++) {

			// if infinite
			if (captures[i][2]) {

				infinite = getInfiniteCells(piecePos, moves[i]);


				// console.log(infinite);

				// for (var j = 0; j < infinite.length; j++) {
				// 	highlightCell(infinite[j], "green");
				// }

				var k = 0;	
				loop = true;
				while (loop == true && k < infinite.length ) {	
					pos = infinite[k];
					// console.log(pos);	

					if (piece !== false) {

						// console.log("/////////////");
						// console.log(pos);
						// console.log("active player = " + player);
						// console.log("player = " + player);
						// console.log("is opponent = " + posIsOpponent(pos, player));
						// console.log("/////////////");

						if (!posIsEmpty(pos) && !posIsOpponent(pos, player)) {
							loop = false;
						} else {
							if (posIsOpponent(pos, player)) {
									
								loop = false;			
									
								validCaptures.push(pos);
								highlightCaptureCell(pos);
							} 
							k++;
						}
						
					} else {
						loop = false;
					}

					
				}

			} else {
				pos = calcPos(piecePos, captures[i]);
				// console.log(pos);
				// console.log(posIsOpponent(pos));
				if (posIsOpponent(pos,player)) {				
					highlightCaptureCell(pos);
					validCaptures.push(pos);
				}
			}


			
		}



		return {"validMoves": validMoves, "validCaptures" : validCaptures, "transformLocations" : transformLocations };


	}

	// adds two xy positions together
	function calcPos(pos, newPos) {
		return [pos[0] + newPos[0], pos[1] + newPos[1]];
	}


	// returns a list with "infinite" places
	function getInfiniteCells(pos, newPos) {
		var cellsAvailable = true;
		var positions = [];
		while (cellsAvailable == true) {

			pos = calcPos(pos, newPos);

			if (posIsOnBoard(pos)) {
				positions.push(pos);
			} else {
				cellsAvailable = false;
			}
		}
		return positions;
	}

	// function getPieceByCell
	// returns array
	// 	id
	// 	player

	function getPieceByCell(pos) {
		if (posIsOnBoard(pos)) {			
			index = getCellIndexByPos(pos);
			piece = cells.eq(index).attr("piece");
			player = cells.eq(index).attr("player");
			firstMove = cells.eq(index).attr("firstMove");
			return {"id" : piece, "player" : parseInt(player), "firstMove": JSON.parse(firstMove)};
		} else {
			return false;
		}
	}

	function removeHighlight() {		
		cells.removeClass("capture-cell");
		cells.removeClass("move-cell");
	}

	function highlightCaptureCell(pos) {
		index = getCellIndexByPos(pos);
		cells.eq(index).addClass("capture-cell");
	}

	function highlightMoveCell(pos) {
		index = getCellIndexByPos(pos);
		cells.eq(index).addClass("move-cell");
	}

	function posIsOnBoard(pos) {
		if (pos[0] > boardDimensions[0] - 1 || pos[0] < 0 || pos[1] > boardDimensions[1] - 1 || pos[1] < 0) {
			return false;
		} else {
			return true;
		}
	}

	// function posIsOpponent
	// - returns if cell is opponent
	// param pos: x,y position
	// param player: 1 or 2
	// returns: boolean
	function posIsOpponent(pos, player) {	
		if (posIsOnBoard(pos)) {	
			piece = getPieceByCell(pos);			
			if (piece["player"] !== player && piece["player"] !== 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}


	// function posIsEmpty
	// - returns if cell is empty
	// param pos: x,y position
	// param player: 1 or 2
	// returns: boolean
	function posIsEmpty(pos, player) {
		if (posIsOnBoard(pos)) {
			piece = getPieceByCell(pos);
			// console.log("this is piece:::");
			// console.log(piece);
			
			if (piece["player"] == 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

		
	}

})