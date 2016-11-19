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
		if(playersList[i].avalible == true) {counter++;}
	}
	if(counter > 1) {return true;}
	else {return false;}
}

Lobby.prototype.createGame = function(){
   var sudokuGame = new SudokuGame(Math.random() * 100); 

   for(var i in this.playersList){
   	   console.log(this.playersList[i].avalible + "should be true");
   	   console.log(sudokuGame.sizeLimit());
     if(sudokuGame.sizeLimit && this.playersList[i].avalible) {
     	sudokuGame.addPlayer(this.playersList[i]);
     	this.playersList[i].avalible == false;
     	this.playersList[i].gameId == sudokuGame.id;
     }
   }
   this.gameList.push(sudokuGame);
   sudokuGame.setKey(sudokuArrayAnswer);
   sudokuGame.setUnsolved(sudokuArray);
   sudokuGame.startGame();
   for(var i in this.playersList)
   {
     // give array
   }

}
Lobby.prototype.getPlayer = function(playerId) {
	var player = null;
	for(var i = 0; i < this.playerList.length; i++){
		if(this.playersList[i].id == playerId){
			player = this.playersList[i];
			break;
		}
	}
	return player;
};

Lobby.gitPlayersInGame = function() {
	
};

Lobby.prototype.checkForWinner = function(){
    for(var i in this.gameList)
    {  
    	if(this.gameList[i].checkForWinner())
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
