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
	for(var i in this.playersList){
		if(this.playersList[i].avalible == true) {counter++;}
	}
	if(counter > 1) {return true;}
	else {return false;}
}

Lobby.prototype.createGame = function(){
	var gameId = Math.random() * 100;
   var sudokuGame = new SudokuGame(gameId); 
   console.log("after create game" + gameId);

   for(var i in this.playersList){
   	  // console.log(this.playersList[i].avalible + "should be true");
   	  // console.log(sudokuGame.sizeLimit());
     if(sudokuGame.sizeLimit() && this.playersList[i].avalible) {
     	console.log("in if createGame " + this.playersList[i].avalible);
     	this.playersList[i].setAvalible (false);
     	console.log("after false " + this.playersList[i].avalible);
     	this.playersList[i].setGameId(gameId);
     	sudokuGame.addPlayer(this.playersList[i]);
     }
   }
  
   sudokuGame.setKey(sudokuArrayAnswer);
   sudokuGame.setUnsolved(sudokuArray);
    this.gameList.push(sudokuGame);
   sudokuGame.startGame();
   for(var i in this.playersList)
   {
     // give array
   }

}
Lobby.prototype.getPlayer = function(playerId) {
	var player = null;
	for(var i = 0; i < this.playersList.length; i++){
		if(this.playersList[i].id == playerId){
			player = this.playersList[i];
			break;
		}
	}
	return player;
};
Lobby.prototype.getGame = function(gameId) {
	var game = null;
	for(var i = 0; i < this.gameList.length; i++){
		if(this.gameList[i].id == gameId){
			game = this.gameList[i];
			break;
		}
	}
	return game;
};

Lobby.gitPlayersInGame = function() {
	
};

Lobby.prototype.checkForWinner = function(){
    for(var i in this.gameList)
    {  
    	if(this.gameList[i].checkGameWinner())
    	{
    		return gameList[i];
    	    delete gameList[i];
    	}
    	else {null};
    	console.log("in fun checkForWinner" + this.gameList.length);
    }
}
Lobby.prototype.updatePlayerArray = function(playerArray) {
	
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
