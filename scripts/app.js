var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monsterInterval;
var scorInterval;
var a1 = 0.15;
var a2 = 1.85;
var e1 = 5;
var e2 = -15;
var counter = 0;
var barryBool;

var monster_remain;
var monster_Position = new Array();
var extra_scor = new Array();

var upAscii = 0;
var downAscii = 0;
var leftAscii = 0;
var rightAscii = 0;
var first_color_chosen;
var second_color_chosen;
var third_color_chosen;
var time_chosen;
var settingsDone = false;
var music = new Audio("etc/Intro.mp3");

var lifes = 5;
var lifes_ctr;

var medInterval;
var medboll;

var mashroomInterval;
var mashroomboll;

var balls;

function Run() {
	context = canvas.getContext("2d");
	Start();

}

function updateUserSettings() {
	upAscii = document.getElementById("user_up_ouput").value;
	downAscii = document.getElementById("user_down_ouput").value;
	leftAscii = document.getElementById("user_left_ouput").value;
	rightAscii = document.getElementById("user_right_ouput").value;
	time_chosen = document.getElementById("game_time_output").value;
	first_color_chosen = document.getElementById("point5_color").value;
	second_color_chosen = document.getElementById("point15_color").value;
	third_color_chosen = document.getElementById("point25_color").value;
	monster_remain =  document.getElementById("monster_number_output").value;
	Run();
}


function Start() {
	lifes_ctr = 5;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 121;
	var food_remain = document.getElementById("ballsNumber_output").value;
	balls = food_remain;
	var pacman_remain = 1;
	var redballs = food_remain * 0.1;
	var blueballs = food_remain * 0.3;
	food_remain = food_remain * 0.6;
	
	barryBool = true;
	medboll = true;
	mashroomboll = true;

	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 2 && j == 3) ||
				(i == 2 && j == 4) ||
				(i == 1 && j == 4) ||
				(i == 6 && j == 1)

			) {
				board[i][j] = 4;
			} else {
				board[i][j] = 0;
			}
		}
	}
	var pacmenCell = findRandomEmptyCell(board);
	board[pacmenCell[0]][pacmenCell[1]] = 2;
	shape.i = pacmenCell[0];
	shape.j = pacmenCell[1];


	//for balls placing
	while (redballs > 0) { // red = 8
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 8;
		redballs--;
	}

	while (blueballs > 0) { //blue = 9
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 9;
		blueballs--;
	}

	while (food_remain > 0) { //black=1
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}

	for (var c = 0; c < monster_remain; c++) {
		if (c == 0) {
			monster_Position.push(0);
			monster_Position.push(0);

		}
		else if (c == 1) {
			monster_Position.push(9);
			monster_Position.push(0);

		}
		else if (c == 2) {
			monster_Position.push(0);
			monster_Position.push(9);

		}
		else if (c == 3) {
			monster_Position.push(9);
			monster_Position.push(9);

		}
	}
	extra_scor.push(0);
	extra_scor.push(0);


	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);

	interval = setInterval(UpdatePosition, 500);
	monsterInterval = setInterval(UpdateMonsterPos, 1500);
	scorInterval = setInterval(UpdateScorPos, 500);
	medInterval = setInterval(updateMedPos, 10000);
	mashroomInterval = setInterval(updateTime, 20000);
	music.loop = true;
	Draw();
	music.play();
}

function updateMonsterInCorners() {
	for (var c = 0; c < monster_remain * 2; c = c + 2) {
		if (c == 0) {
			monster_Position[c] = 0;
			monster_Position[c + 1] = 0;
		}
		else if (c == 2) {
			monster_Position[c] = 9;
			monster_Position[c + 1] = 0;

		}
		else if (c == 4) {
			monster_Position[c] = 0;
			monster_Position[c + 1] = 9;

		}
		else if (c == 6) {
			monster_Position[c] = 9;
			monster_Position[c + 1] = 9;
		}
	}

	var random_temp = findRandomEmptyCell(board);
	shape.i = random_temp[0];
	shape.j = random_temp[1];
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 10);
	var j = Math.floor(Math.random() * 10);
	while (board[i][j] != 0 || i == 10 || j == 10) {
		i = Math.floor(Math.random() * 10);
		j = Math.floor(Math.random() * 10);
	}
	return [i, j];
}


function GetKeyPressed() {
	if (keysDown[upAscii]) { //up
		a1 = -0.35;
		a2 = 1.35;
		e1 = -15;
		e2 = 5;
		return 1;
	}
	if (keysDown[downAscii]) {//down
		a1 = 0.65;
		a2 = 2.35;
		e1 = -15;
		e2 = 5;
		return 2;
	}
	if (keysDown[leftAscii]) {//left
		a1 = 1.15
		a2 = 2.85;
		e1 = 5;
		e2 = -15;
		return 3;
	}
	if (keysDown[rightAscii]) {//right
		a1 = 0.15;
		a2 = 1.85;
		e1 = 5;
		e2 = -15;
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLife.value = lifes_ctr;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { // pacman loctation
				context.beginPath();
				context.arc(center.x, center.y, 30, a1 * Math.PI, a2 * Math.PI); // pacman body
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color;
				context.fill();
				context.beginPath();
				context.arc(center.x + e1, center.y + e2, 5, 0, 2 * Math.PI); // pacman eyes
				context.fillStyle = "black"; //eyes
				context.fill();
			}
			else if (board[i][j] == 8) {// first ball color
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = first_color_chosen;
				context.fill();
			}
			else if (board[i][j] == 9) {//second ball color
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = second_color_chosen;
				context.fill();
			}
			else if (board[i][j] == 1) {//third ball color
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = third_color_chosen;
				context.fill();
			}
			else if (board[i][j] == 4) { //walls location
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "blue";
				context.fill();
			}
			else if (board[i][j] == 15) {
				var med = new Image();
				med.src = "./images/med.png";
				context.drawImage(med, center.x - 30, center.y - 30, 50, 50);
			}

			for (var k = 0; k < monster_remain * 2; k = k + 2) {
				if (monster_Position[k] == i && monster_Position[k + 1] == j) {
					var monsetrImage = new Image();
					monsetrImage.src = "./images/ghost_new.png";
					context.drawImage(monsetrImage, center.x - 30, center.y - 30);

				}
			}
			if (extra_scor[0] == i && extra_scor[1] == j && barryBool == true) {
				var barryImage = new Image();
				barryImage.src = "./images/barry.png";
				context.drawImage(barryImage, center.x - 30, center.y - 30, 50, 50);
			}
			else if (board[i][j] == 16) {
				var mashroom = new Image();
				mashroom.src = "./images/mushroom.png";
				context.drawImage(mashroom, center.x - 30, center.y - 30, 50, 50);
			}

		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	var bool = false;
	if (x == 1) {//up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {//down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {//left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {//right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	for (var k = 0; k < monster_remain * 2; k = k + 2) {
		if (monster_Position[k] == shape.i && monster_Position[k + 1] == shape.j) {
			score = score - 10;
			lifes_ctr--;
			updateMonsterInCorners();
			bool = true;
			break;
		}
	}

	if (board[shape.i][shape.j] == 1 && bool == false) {
		balls--;
		score = score + 5;
	}
	else if (board[shape.i][shape.j] == 8 && bool == false) {
		balls--;
		score = score + 25;
	}
	else if (board[shape.i][shape.j] == 9 && bool == false) {
		balls--;
		score = score + 15;
	}
	if (extra_scor[0] == shape.i && extra_scor[1] == shape.j && barryBool == true) {
		score = score + 50;
		barryBool = false;
	}
	else if (board[shape.i][shape.j] == 15 && bool == false) {
		lifes_ctr++;
		medboll = true;
	}
	else if (board[shape.i][shape.j] == 16 && bool == false) {
		score = score + 100;
		mashroomboll = true;
	}

	board[shape.i][shape.j] = 2; //empty cell
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }
	if (score == 1000) {
		window.clearInterval(interval);
		window.alert("Game Completed");
	} else if (lifes_ctr == 0) {
		music.pause();
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		window.clearInterval(scorInterval);
		window.clearInterval(medInterval);
		window.clearInterval(mashroomInterval);
		window.alert("Loser!");
	}
	else if (time_elapsed > time_chosen || balls == 0) {
		music.pause();
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		window.clearInterval(scorInterval);
		window.clearInterval(medInterval);
		window.clearInterval(mashroomInterval);
		if (score > 100) {
			window.alert("Winner!!!");
		}
		else {
			window.alert("You are better than " + score + " points");
		}
	}
	else {
		Draw();
	}
}

function UpdateMonsterPos() {
	for (var i = 0; i < monster_remain; i++) {
		var num = Math.floor(Math.random() * 2) + 1;
		var randomMove;
		var x;
		var monster_x = monster_Position[2 * i];
		var monster_y = monster_Position[2 * i + 1];


		if (monster_x > shape.i && monster_y < shape.j) {// lefr or down
			x = 1;
		}
		else if (monster_x > shape.i && monster_y > shape.j) { // left or up
			x = 2;
		}
		else if (monster_x < shape.i && monster_y < shape.j) {// right or down
			x = 3;
		}
		else if (monster_x < shape.i && monster_y > shape.j) {// right or up
			x = 4;
		}
		else if (monster_x == shape.i && monster_y < shape.j) { //down
			x = 5;
		}
		else if (monster_x == shape.i && monster_y > shape.j) { //up
			x = 6;
		}
		else if (monster_x < shape.i && monster_y == shape.j) { //right
			x = 7;
		}
		else if (monster_x > shape.i && monster_y == shape.j) { // left
			x = 8;
		}


		if (x == 1) {
			if (num == 1) {
				randomMove = 3;
			}
			else {
				randomMove = 2;
			}
		}
		else if (x == 2) {
			if (num == 1) {
				randomMove = 3;
			}
			else {
				randomMove = 1;
			}
		}
		else if (x == 3) {
			if (num == 1) {
				randomMove = 2;
			}
			else {
				randomMove = 4;
			}
		}
		else if (x == 4) {
			if (num == 1) {
				randomMove = 4;
			}
			else {
				randomMove = 1;
			}
		}
		else if (x == 5) {
			randomMove = 2;
		}
		else if (x == 6) {
			randomMove = 1;
		}
		else if (x == 7) {
			randomMove = 4;
		}
		else if (x == 8) {
			randomMove = 3;
		}


		if (randomMove == 1) {//up
			if (monster_Position[2 * i + 1] > 0 && board[monster_Position[2 * i]][monster_Position[2 * i + 1] - 1] != 4) {
				monster_Position[2 * i + 1]--;
			}
		}
		if (randomMove == 2) {//down
			if (monster_Position[2 * i + 1] < 9 && board[monster_Position[2 * i]][monster_Position[2 * i + 1] + 1] != 4) {
				monster_Position[2 * i + 1]++;
			}
		}
		if (randomMove == 3) {//left
			if (monster_Position[2 * i] > 0 && board[monster_Position[2 * i] - 1][monster_Position[2 * i + 1]] != 4) {
				monster_Position[2 * i]--;
			}
		}
		if (randomMove == 4) {//right
			if (monster_Position[2 * i] < 9 && board[monster_Position[2 * i] + 1][monster_Position[2 * i + 1]] != 4) {
				monster_Position[2 * i]++;
			}
		}

	}
}

function UpdateScorPos() {
	var randomMove = Math.floor(Math.random() * 4) + 1;
	if (randomMove == 1) {//up
		if (extra_scor[1] > 0 && board[extra_scor[0]][extra_scor[1] - 1] != 4) {
			extra_scor[1]--;
		}
	}
	if (randomMove == 2) {//down
		if (extra_scor[1] < 9 && board[extra_scor[0]][extra_scor[1] + 1] != 4) {
			extra_scor[1]++;
		}
	}
	if (randomMove == 3) {//left
		if (extra_scor[0] > 0 && board[extra_scor[0] - 1][extra_scor[1]] != 4) {
			extra_scor[0]--;
		}
	}
	if (randomMove == 4) {//right
		if (extra_scor[0] < 9 && board[extra_scor[0] + 1][extra_scor[1]] != 4) {
			extra_scor[0]++;
		}
	}
}

function updateMedPos() {
	if (medboll == true) {
		var emptyCell_med = findRandomEmptyCell(board);
		board[emptyCell_med[0]][emptyCell_med[1]] = 15;
		medboll = false;
	}
}

function updateTime() {
	if (mashroomboll == true) {
		var emptyCell_clock = findRandomEmptyCell(board);
		board[emptyCell_clock[0]][emptyCell_clock[1]] = 16;
		mashroomboll = false;
	}
}