console.log('uploading player.js');

function Player(playerId){
	this.id =  playerId;
	this.name = "";
	this.avalible  = false;
	this.complete = 0;
	this.wins = 0;
	this.losses = 0;
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
Player.prototype.setComplete = function(complete){
	return this.complete;
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