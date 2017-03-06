
var duel = {
	
	// factory function to create duel opponents
	createDuelOpponent: function(name, honor, speed, accuracy, quip, honorDamage) { 
		return {
			name: name,
			honor: honor,
			speed: speed,
			accuracy: accuracy,
			insult: {quip: quip, honorDamage: honorDamage}
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
			var honorDamage = 10 + i;
			duel.allOpponentObjects[i] = duel.createDuelOpponent(name, honor, speed, accuracy, quip, honorDamage);
		});
	},

	opponentsFaced: 0,

	walkInterval: 0,
	walkAndDraw: function() {
		var stepCount = 0;
		var opponent = duel.allOpponentObjects[duel.opponentsFaced];
		duel.walkInterval = setInterval(function(){
			if (stepCount < 9) {
				stepCount++;
				console.log('step')
			} else {
				clearInterval(duel.walkInterval)
				console.log('turn and shoot');
				duel.opponentTurnAndDraw(opponent.speed, opponent.name);
				opponentAim(opponent.accuracy);
				opponentFire(opponent.HonorDamage);
			}
		}, 1000);
	},

	turnInterval: 0,
	opponentTurnAndDraw: function(speed, name) {
		var timer = speed * 25;
		var counter = 0;
		turnInterval = setInterval(function(){
			if (counter === 0) {
				console.log(name + ' turns and draws');
				counter++;
			} else if (counter === 1) {
				console.log(name + ' levels their weapon');
				counter++;
			} else {
				console.log('bang');
				clearInterval(turnInterval);
			}
		}, timer);
	}

}

function opponentAim(accuracy) {

}

function opponentFire(honorDamage) {

}

function userDraw() {

}