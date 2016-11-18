console.log('uploading sudokuGame.js');

function  SudokuGame(gameId)
{
    this.gamePlayerList = [];
	this.gameId =  gameId;
	this.done   = false;
	this.maxPlayers = 5;

}

SudokuGame.prototype.addPlayer = function(player) {
	this.gamePlayerList.push(player);
};

SudokuGame.prototype.sizeLimit = function() {
	if(this.maxPlayers < 6){return true;}
	else{return false;}
};

SudokuGame.prototype.checkForWinner = function(){
	for(var i in this.gamePlayerList)
	{
		if(player.complete == 100){return true;}
		else{return false;}
	}
}

SudokuGame.prototype.gamePlayerList = function() {
	return this.gamePlayerList;
};

SudokuGame.prototype.getGameId = function() {
	return this.gameId;
};
