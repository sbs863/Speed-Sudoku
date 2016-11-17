console.log('uploading player.js');
var tempArray = ['bill','john','mike','mando','sarah','pip','lucky','christy','katie','maddox','ella'];
var Player = function(id)
{
	var player = {
	   name        : tempArray[ Math.floor(10 * Math.random())],
	   wins        : 0,
	   losses      : 0,
	   id          : id,
       completed   : 0,
    // testForWinner = functio
	// url of pic
	//board = create board; need own board each time
	// updatePlayer = function()
	//                {
	//                	// updade everyone boards, check winner!
	//                }
	//return player;
             }
   return player; 
}

module.exports = Player;