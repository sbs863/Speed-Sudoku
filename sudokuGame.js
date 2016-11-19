console.log('uploading sudokuGame.js');


function  SudokuGame(gameId)
{
    this.gamePlayerList = [];
	this.gameId =  gameId;
	this.done   = false;
	this.maxPlayers = 5;
	this.arrayKey      = [];
	this.arrayUnsolved = [];
};
// SudokuGame.prototype.setGameId = function(this.gameId) {
// 	for(var i in this.gamePlayerList.length)
// 	{
// 		this.gamePlayerList[i]gameId = gameId;
// 	}
// };
SudokuGame.prototype.addPlayer = function(player) {
	this.gamePlayerList.push(player);
};
SudokuGame.prototype.setKey = function(array) {
	this.arrayKey = array;
};
SudokuGame.prototype.setUnsolved = function(array) {
	this.arrayUnsolved = array;
};
SudokuGame.prototype.sizeLimit = function() {
	if(this.gamePlayerList.length < this.maxPlayers){return true;}
	else{return false;}
};

SudokuGame.prototype.checkForWinner = function(){
	console.log("checkForWinner" + this.gamePlayerList.length);
	for(var i in this.gamePlayerList)
	{
		if(this.gamePlayerList[i].complete == 100)
			{
				// remove players
				return true;
			}
		else{return false;}
	}
}

SudokuGame.prototype.gamePlayerList = function() {
	return this.gamePlayerList;
};

SudokuGame.prototype.getGameId = function() {
	return this.gameId;
};

SudokuGame.prototype.startGame = function(){
  for(var i in this.gamePlayerList)
  {
     
  }
}
SudokuGame.prototype.timmer = function(){
	 var counter = 60;
     setInterval(function(){
     counter --; 
     return counter;
     if(counter == 0) {return;}
   }, 1000);   
}

module.exports = SudokuGame;