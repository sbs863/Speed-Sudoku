console.log('uploading lobby.js');
var sudokuArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Lobby(id, playerList) {
	isWinner = false;
    this.id = id;
    this.players = playerList;
    this.joinRoom = function(array) {
        for (var i in playerArray) {
            var player = this.array[i]; // this??
            player.id.join(gameId);  
            console.log("in join room function");    // join room??
        }
    }
    this.startGame = function() {  // need to sent everyone in room an array
        for (var i in this.playerList) {
            socket.emit("startGame", sudokuArray);
        }
    }
    this.updateWinner = function() {
        for (var i in this.playerList) {
            socket.emit('checkForWinner', {
                message: player.name + 'has won the game'
            });
        }
    }
}
module.exports = Lobby;
