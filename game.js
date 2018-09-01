/* constants */
const START = 4;
const NUM_ROWS = 2;
const NUM_COLS = 6;

/* globals */
var turn = 1; // 0 for bot's turn, 1 for player's turn
var t = ["Computer", "Player"];
var board = [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null]
	];
	
var scores = [0, 0];
var gameOver = false;

/* game objects */
var botRow = document.getElementById("row-1");
var playerRow = document.getElementById("row-2");
var botHole = document.getElementById("hole-score-1");
var playerHole = document.getElementById("hole-score-2");
var botScore = document.getElementById("score-1");
var playerScore = document.getElementById("score-2");
var newGameButton = document.getElementById("New-Game");

function displayTurn() {
	displayMessage("It is the " + t[turn] + "'s turn.");
}

function displayMessage(message) {
  document.getElementById('ui').innerHTML = message;
}

/*function Hole(row, col) {
	this.row = row;
	this.col = col;
	this.numPebbles = numPebbles;
}*/

function displayHole(row, col) {
	var hole = document.createElement('div');
	hole.classList.add("hole");
	hole.classList.add(col);
	var rowElement = document.getElementById("row-" + (row+1));
	rowElement.appendChild(hole);
	for (var i = 0; i < START; i++) {
		addPebble(hole);
	}	
}

function renderBoard() {
	for (var a = 0; a < NUM_ROWS; a++) {
		for (var b = 0; b < NUM_COLS; b++) {
			displayHole(a, b);
			board[a][b] = START;
		}
	}
	
	botScore.innerHTML = "Computer: " + scores[0];
	playerScore.innerHTML = "Player: " + scores[1];
	displayTurn();
}

function updateBoard() {
	botScore.innerHTML = "Computer: " + scores[0];
	playerScore.innerHTML = "Player: " + scores[1];
}

function addPebble(hole) {	
	var pebble = document.createElement('p');
	pebble.classList.add("pebble");
	hole.appendChild(pebble);
}

function removePebble(hole) {
	var pebbles = hole.getElementsByTagName('p');
	console.log("pebbles length: " + pebbles.length);
	hole.removeChild(pebbles[pebbles.length-1]);
}

function makeMove(row, col) {
	const ORIG_ROW = row;
	const ORIG_COL = col;
	var rowElement = document.getElementById("row-" + (row+1));
	var orig_hole = rowElement.childNodes[ORIG_COL];
	//var orig_num = orig_hole.length;
	var hole = rowElement.childNodes[col];
	
	// loop while there are pebbles in the hole clicked
	while (board[ORIG_ROW][ORIG_COL] > 0) {	
		if (row == ORIG_ROW && col == ORIG_COL) {
			if (row == 0) {
				col--;
			} else {
				col++;
			}
		} 	
		console.log(orig_hole.children.length + " children");
		console.log(board[ORIG_ROW][ORIG_COL] + " pebbles");
		//if (orig_hole.children.length > 0) {			
			removePebble(orig_hole);
			board[ORIG_ROW][ORIG_COL]--;
		//}
		
		if (row == 1) {
			if (col <= 5) {		
				hole = rowElement.childNodes[col];
				addPebble(hole);
				board[row][col]++;
				col++;
			} else {
				scores[turn]++;
				addPebble(playerHole);
				row = 0;
				col = 5;
				rowElement = botRow;
			}
		} else {
			if (col >= 0) {								
				hole = rowElement.childNodes[col];
				addPebble(hole);
				board[row][col]++;
				col--;
			} else {
				scores[turn]++;
				addPebble(botHole);
				row = 1;
				col = 0;
				rowElement = playerRow;
			}
		}		
	}
	
	if (col > -1 && col < 6) {
		checkOpposite(hole, col);
	}
	turn ^= 1;
	console.log("turn " + t[turn]);
	displayTurn();
	updateBoard();
}

function checkOpposite(hole, col) {
	//rowElement = document.getElementById("row-" + (row+1));
	//hole = rowElement.childNodes[col];
	console.log("Number of pebbles" + hole.children.length);
	if (hole.children.length == 1) { // if last hole was empty
		if (turn == 0) {
			//col--;		
			rowElement = playerRow;	
			addPebble(botHole);
		} else {
			//col++;
			rowElement = botRow;
			addPebble(playerHole);
		}
		removePebble(hole);
		board[turn][col]--;	
		scores[turn]++;
		console.log("col: " + col);
		var oppositeHole = rowElement.childNodes[col];
		console.log(oppositeHole);
		for (var i = oppositeHole.children.length; i > 0; i--) {
			removePebble(oppositeHole);
			board[1-turn][col]--;
			if (turn == 0) {
				addPebble(botHole);
			} else {
				addPebble(playerHole);
			}
			scores[1-turn]++;
		}
	}
}
function emptyBoard(turn) {
	turn ^= 1;
	for (var i = 0; i < NUM_COLS; i++) {
		var hole = rowElement.childNodes[i];
		while (board[turn][i] > 0) {			
			removePebble(hole);
			scores[turn]++;
			if (turn == 0) {
				addPebble(botHole);
			} else {
				addPebble(playerHole);
			}
		}
	}
}

function wait() {
	console.log("waiting")
}

function botRoutine() {
	do {
		var randCol = Math.floor(Math.random() * NUM_COLS);
		if (botRow.childNodes[randCol].children.length > 0) {
			setTimeout(function() { makeMove(turn, randCol)}, 2000);
		}
	} while (board[0][randCol] < 1);
}

function checkMoves() {
	for (var i = 0; i < NUM_COLS; i++) {
		if (board[turn][i] > 0) {
			return true;
		}
	}
	return false
}
function determineWinner() {
	if (scores[0] > scores[1]) {
		displayMessage("Bot wins");
	} else if (scores[0] == scores[1]) {
		displayMessage("Tie");
	} else {
		displayMessage("Player wins");
	}
}

// render board
renderBoard();
//displayTurn();

//Attach click listeners to the bottom row's holes
var holes = document.getElementById("row-" + 2).getElementsByClassName("hole");
//playerRow = 1;
// check to see if there are any possible moves
var possibleMove = false;

/* Add event listeners to the six holes */
holes[0].addEventListener('click', function(event) {
	event.preventDefault();    
	console.log(event.target);
	if (turn == 1 && board[turn][0] > 0) {
		makeMove(turn, 0);
		displayTurn();
		updateBoard();
		botRoutine();
	}
	if (!checkMoves()) {
		gameOver = true;
		emptyBoard();
		determineWinner();
	}
});
holes[1].addEventListener('click', function(event) {
	event.preventDefault();    
	console.log(event.target);
	if (turn == 1 && board[turn][1] > 0) {
		makeMove(turn, 1);
		displayTurn();	
		updateBoard();	
		botRoutine();
	}
	if (!checkMoves()) {
		gameOver = true;
		emptyBoard();
		determineWinner();
	}
});
holes[2].addEventListener('click', function(event) {
	event.preventDefault();    
	console.log(event.target);
	if (turn == 1 && board[turn][2] > 0) {
		makeMove(turn, 2);
		displayTurn();
		updateBoard();
		botRoutine();
	}
	if (!checkMoves()) {
		gameOver = true;
		emptyBoard();
		determineWinner();
	}
});
holes[3].addEventListener('click', function(event) {
	event.preventDefault();    
	console.log(event.target);
	if (turn == 1 && board[turn][3] > 0) {
		makeMove(turn, 3);
		displayTurn();
		updateBoard();
		botRoutine();
	}
	if (!checkMoves()) {
		gameOver = true;
		emptyBoard();
		determineWinner();
	}
});
holes[4].addEventListener('click', function(event) {
	event.preventDefault();    
	console.log(event.target);
	if (turn == 1 && board[turn][4] > 0) {
		makeMove(turn, 4);
		displayTurn();
		updateBoard();
		botRoutine();
	}
	if (!checkMoves()) {
		gameOver = true;
		emptyBoard();
		determineWinner();
	}
});
holes[5].addEventListener('click', function(event) {
	event.preventDefault();    
	console.log(event.target);
	if (turn == 1 && board[turn][5] > 0) {
		makeMove(turn, 5);
		displayTurn();
		updateBoard();
		botRoutine();
		displayTurn();
	}
	if (!checkMoves()) {
		gameOver = true;
		emptyBoard();
		determineWinner();
	}
});

newGameButton.addEventListener('click', function(event) {
	event.preventDefault();
	location.reload();
});