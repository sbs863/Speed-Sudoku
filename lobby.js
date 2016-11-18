console.log('uploading lobby.js');
var sudokuArrayAnswer = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var sudokuArray       = [1,'','',4,'',6,'',8,''];
var SudokuGame = require('./sudokuGame.js');

function Lobby() {
    this.playersList = [];
    this.gameList    = [];
    }


Lobby.prototype.addPlayer = function(player) {
	this.playersList.push(player);
}

Lobby.prototype.checkIfEnoughPlayers = function(){
	var counter = 0;
	for(var i in this.playerList){
		if(playerList[i].avalible == true) {counter++;}
	}
	if(counter > 1) {return true;}
	else {return false;}
}

Lobby.prototype.createGame = function(){
	var sudokuGame = new SudokuGame(Math.random() * 100); 
   for(var i in this.playerList){
     while(sudokuGame.sizeLimit && playerList[i].avalible)
     {
     	sudokuGame.addPlayer(playerList[i]);
     	playerList[i].avalible == false;
     }
   }
   this.gameList.push(sudokuGame);
}
Lobby.prototype.getPlayer = function(playerId) {
	var player = null;
	for(var i = 0; i < this.playerList.length; i++){
		if(this.playerList[i].id == playerId){
			player = this.playerList[i];
			break;
		}
	}
	return player;
};

Lobby.gitPlayersInGame = function(gameList) {
	
};

//     this.startGame = function() {  // need to sent everyone in room an array
//         for (var i in this.playerList) {
//         	console.log("in start function");
//             socket.emit("startGame", sudokuArray);
//         }
//     }
//     this.updateWinner = function() {
//         for (var i in this.playerList) {
//         	 var player = this.playerList[i];
//             socket.emit('checkForWinner', {
//                 message: player.name + 'has won the game'
//             });
//         }
//     }
//     this.printPlayers = function(){
//     	for(var i in this.playerList){
//     		var player = this.playerList[i];
//             console.log("player.name " + player.name);
//     	}
//     }
// }
module.exports = Lobby;
