/* constants */
const START = 4;

/* globals */
var turn = 1; // 0 for bot's turn, 1 for player's turn
var board = [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null]
	]
	
var scores = [0, 0]
var gameOver = false;

var botRow = document.getElementById("row-" + 1);
var playerRow = document.getElementById("row-" + 2);
var botHole = document.getElementById("hole-score-" + 1);
var playerHole = document.getElementById("hole-score-" + 2);
var botScore = document.getElementById("score-" + 1);
var playerScore = document.getElementById("score-" + 2);
/**function displayTurn() {
		displayMessage("It is player " + turn + ";s turn.");
}*/

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
	for (var a = 0; a < 2; a++) {
		for (var b = 0; b < 6; b++) {
			//var hole = new Hole(a+1, b+1);
			displayHole(a, b);
			board[a][b] = START;
		}
	}
	
	botScore.text = scores[0];
	playerScore.text = scores[1];
}

/*function updateBoard() {
	holes
}*/

function addPebble(hole) {	
	var pebble = document.createElement('p');
	pebble.classList.add("pebble");
	hole.appendChild(pebble);
}

function removePebble(hole) {
	var pebbles = hole.getElementsByTagName('p');
	console.log(pebbles.length);
	hole.removeChild(pebbles[pebbles.length - 1]);
}

renderBoard();

function makeMove(row, col) {
	const ORIG_ROW = row;
	const ORIG_COL = col;
	var rowElement = document.getElementById("row-" + (row+1));
	var orig_hole = rowElement.childNodes[ORIG_COL];
	//alert(board[ORIG_ROW][ORIG_COL]);
	
	while (board[ORIG_ROW][ORIG_COL] > 0) {	
		if (row == ORIG_ROW && col == ORIG_COL) {
			if (row == 0) {
				col--;
			} else {
				col++;
			}
		} /*else {
			 board[ORIG_ROW][ORIG_COL]--;
			 removePebble(orig_hole);
		}*/
		board[ORIG_ROW][ORIG_COL]--;
			 removePebble(orig_hole);
		if (row == 1) {
			if (col <= 5) {		
				var hole = rowElement.childNodes[col];
				addPebble(hole);
				board[row][col]++;
				col++;
			} else {
				scores[turn]++;
				addPebble(playerHole);
				row = 0;
				col = 5;
				rowElement = document.getElementById("row-" + (row+1));
			}
		} else {
			if (col >= 0) {								
				var hole = rowElement.childNodes[col];
				addPebble(hole);
				board[row][col]++;
				col--;
			} else {
				scores[turn]++;
				addPebble(botHole);
				row = 1;
				col = 0;
				rowElement = document.getElementById("row-" + (row+1));
			}
		}
	}
	turn = 1 - turn;
}

//Attach click listeners to the bottom row's holes
var holes = document.getElementById("row-" + 2).getElementsByClassName("hole");
playerRow = 1;
//var holes1 = document.getElementById("row-" + 1).getElementsByClassName("hole");

	holes[0].addEventListener('click', function(event) {
		event.preventDefault();    
		console.log(event.target);
		if (turn == 1 && board[turn][0] > 0) {
			makeMove(turn, 0);
		}
	});
	holes[1].addEventListener('click', function(event) {
		event.preventDefault();    
		console.log(event.target);
		if (turn == 1 && board[turn][1] > 0) {
			makeMove(turn, 1);
		}
	});
	holes[2].addEventListener('click', function(event) {
		event.preventDefault();    
		console.log(event.target);
		if (turn == 1 && board[turn][2] > 0) {
			makeMove(turn, 2);
		}
	});
	holes[3].addEventListener('click', function(event) {
		event.preventDefault();    
		console.log(event.target);
		if (turn == 1 && board[turn][3] > 0) {
			makeMove(turn, 3);
		}
	});
	holes[4].addEventListener('click', function(event) {
		event.preventDefault();    
		console.log(event.target);
		if (turn == 1 && board[turn][4] > 0) {
			makeMove(turn, 4);
		}
	});
	holes[5].addEventListener('click', function(event) {
		event.preventDefault();    
		console.log(event.target);
		if (turn == 1 && board[turn][5] > 0) {
			makeMove(turn, 5);
		}
	});
	
var botButton = document.getElementById("bot");

botButton.addEventListener('click', function(event) {
	event.preventDefault();
	var randCol = Math.floor(Math.random() * 6);
	console.log("Random colummn: " + randCol);
	setTimeout(makeMove(turn, randCol), 2000);
});
//}
/*while (!gameOver) {
	if (turn = 0) {
		var randCol = Math.floor(Math.random() * 6);
		makeMove(turn, randCol);
	}
}*/