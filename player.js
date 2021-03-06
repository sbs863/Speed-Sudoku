console.log('uploading player.js');

function Player(playerId){
	this.id =  playerId;
	this.name = "";
	this.avalible  = true;
	this.complete = 0;
	this.wins = 0;
	this.losses = 0;
	this.isWinner = false;
	this.gameId = 0;
};

Player.prototype.setName = function(name){
	this.name = name;
};
Player.prototype.setWins = function(wins){
	this.wins = wins;
};
Player.prototype.setLosses = function(losses){
	this.losses = losses;
};
Player.prototype.setAvalible = function(bool) {
	this.avalible = bool;
};
Player.prototype.setComplete = function(complete){
	return this.complete;
};
Player.prototype.setGameId = function(gameID) {
	this.gameID = gameID;
};
Player.prototype.getName = function(){
	return this.name;
};
Player.prototype.getWins = function(){
	return this.wins;
};
Player.prototype.getLosses = function(){
	return this.losses;
};
Player.prototype.getComplete = function(){
	return this.complete;
};


module.exports = Player;