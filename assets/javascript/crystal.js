//crystal colector

var winCount = 0;
var currentScore = 0;
var targetScore = 0;
var crystalArray = [{'color': 'green'}, { 'color': 'red'}, {'color': 'yellow'}, {'color': 'blue'}];

// Game logic - these functions are the inner logic of the game
// mix crystal array
function randomizeArrayOrder(arrayToMix) {
	var mixReference = [0, 1, 2, 3];
	var mixedArray = [];
	for (var i = 0; i < arrayToMix.length; i++) {
		var indexOfReference = mixReference.splice(Math.floor(Math.random() * mixReference.length), 1);
		mixedArray[indexOfReference] = arrayToMix[i];
	}
	return mixedArray;
}


// returns a new target score
function getTargetScore(high, low) {
	return Math.floor((Math.random() * (high - low) + low));
}

// reaturns a value to set to a crystl
function getNewValue() {
	return Math.floor((Math.random() * 12)) + 1;
}

// adds the value of a crystal to the current score
function addCrystalValueToScore(crystalValue) {
	return currentScore += crystalValue;
}

// checks if the game is over
function isGameOver(score, target) {
	return (score >= target);
}

// checks if the user won
function isGameWon(score, target) {
	return (score === target);
}	

function initializeCrystals() {
	crystalArray = randomizeArrayOrder(crystalArray);
	crystalArray.forEach(function(crystal) {
		crystal.value = getNewValue();
	});
}

// Game display - these functions display the game

function getCrystal(idString) {
	var returnCrystal;
	crystalArray.forEach(function(crystal){
		if (idString === crystal.color) {
			returnCrystal = crystal;
		}
	});
	return returnCrystal;
}

function resetDom() {
	$('#crystalHolder').empty();	
}

function addCrystalsToDom() {
	crystalArray.forEach(function(crystal) {
		$('#crystalHolder').append('<div id="' + crystal.color + '" class="crystal"></div>');
		$('#' + crystal.color).append('<i class="fa fa-diamond fa-3x" aria-hidden="true"></i>'); //use the icon tag
	});
}

function updateCurrentScoreDisplay() {
	$('#currentScore').html(currentScore);	
}

function displayTargetScore() {
	$('#targetScore').html(targetScore);
}

function updateWinsDisplay() {
	$('#wins').html(winCount);
}

function displayWinMessage() {
	$('#youWin').attr('class', 'gameOver displayed');
}

function displayLoseMessage() {
	$('#youLose').attr('class', 'gameOver displayed');
}

function hideMessage() {
	$('.gameOver').attr('class', 'gameOver notDisplayed')
}
	
// Game execution - collect user actions, feed them to game logic and game display

// initializes the game
function startNewGame() {
	currentScore = 0;
	updateCurrentScoreDisplay();
	targetScore = getTargetScore(60, 120);
	displayTargetScore();
	initializeCrystals();
	resetDom();
	addCrystalsToDom();
}

$('document').ready(function() {

	startNewGame();

	// when a crystal is clicked
	$('#crystalHolder').on('click', '.crystal', function() { 
		console.log('clicked')
		currentScore = addCrystalValueToScore(getCrystal(this.id).value); // update the current score
		updateCurrentScoreDisplay();
		if (isGameOver(currentScore, targetScore)) {
			if (isGameWon(currentScore, targetScore)) {
				winCount++;
				updateWinsDisplay();
				displayWinMessage();
			} else {
				displayLoseMessage();
			}
		}
	});

	$('.reset').click(function() {
		startNewGame();
		hideMessage()
	})

});

