
var duel = {
	
	// factory function to create duel opponents
	createDuelOpponent: function(name, honor, speed, accuracy, quip, damage) { 
		return {
			name: name,
			honor: honor,
			speed: speed,
			accuracy: accuracy,
			insult: {quip: quip, damage: damage}
		};
	},

	listOfOpponents: ["Tom Bambler", "Jessica Stephens", "Alexander Hambleton"],
	listOfQuips: ["You smell!", "You are bad.", "Your mom!"],
	allOpponentObjects: [],

	// initialize list of duel opponent objects in order to be faced
	setDuelOpponentsInOrder: function() {
		duel.listOfOpponents.forEach(function(name, i){
			var name = duel.listOfOpponents[i];
			var honor = 20 + i;
			var speed = 10 - i;
			var accuracy = 1 - (0.1 * 1);
			var quip = duel.listOfQuips[i];
			var damage = 10 + i;
			duel.allOpponentObjects[i] = duel.createDuelOpponent(name, honor, speed, accuracy, quip, damage);
		});
	},

	opponentsFaced: 0,
	readyToStep: false,
	hasNotStepped: true,
	walkInterval: 0,
	walkAndDraw: function() {

		var stepCount = 0;
		var opponent = duel.allOpponentObjects[duel.opponentsFaced];
		duel.walkInterval = setInterval(function(){
			if (stepCount < 9) {
				duel.readyToStep = true;
				display.step(duel.stepCount);
				stepCount++;
				var stepKey = 1;
				display.log('step [' + stepKey + ']', 'step' + duel.stepCount + '-' + duel.opponentsFaced);
				duel.hasNotStepped = true;
				stepTimeout = setTimeout(function() {
					if (duel.hasNotStepped) {
						clearInterval(duel.walkInterval);
						display.log('You tripped <br>------x------');
						duel.readyToStep = false;
					};
				}, 500);
			} else {
				duel.readyToStep = false;
				clearInterval(duel.walkInterval)
				console.log('turn and shoot');
				duel.opponentTurnDrawAimFire(opponent.speed, opponent.name);
				duel.userTurnDrawAimFire()
			}
		}, 1000);
		duel.opponentsFaced++;
	},

	turnInterval: 0,
	opponentTurnDrawAimFire: function(speed, name) {
		var timer = speed * 100;
		var counter = 0;
		duel.turnInterval = (function(){
			if (counter === 0) {
				console.log(name + ' turns and draws');
				counter++;
			} else if (counter === 1) {
				console.log(name + ' levels their weapon');
				counter++;
			} else {
				console.log('bang');
				clearInterval(duel.turnInterval);
				duel.opponentAim(opponent.accuracy);
				duel.opponentFire(opponent.damage);
			}
		}, timer);
	},

	opponentAim: function(accuracy) {
		
	},

	opponentFire: function(damage) {

	},

	userTurnDrawAimFire: function() {

	}

}

var display = {
	log: function(message, id) {
		var logDiv = $('#log');
		logDiv.append('<div class="logMessage" id="' + id + '">*: ' + message + '</div>');
		logDiv.scrollTop(logDiv.prop('scrollHeight'));
	},
	step: function(stepCount) {
		$('#spacer').append('___');
	}
}

$('#display').click(function(){
	duel.setDuelOpponentsInOrder();
	duel.walkAndDraw();
})

$('body').keyup(function(event) {
  	if (duel.readyToStep) {
    	duel.hasNotStepped = false;
    	console.log('stepped');
    	duel.readyToStep = false;
  	}
});