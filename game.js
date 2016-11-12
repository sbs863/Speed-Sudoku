var express = require('express');
var app = express();
var serv = require('http').Server(app);
var path = require('path');

var PlayerList = {};

//app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', function(req, res)
{
   res.sendFile(__dirname + '/client/main.html'),(__dirname + '/client/assets/css/style.css');
});

app.use(express.static('client/'));
serv.listen(2000); 
var io = require('socket.io')(serv,{});
var testArray =  [1,4,3,8,2,9,5,0,7,6];
var testArray2 = [5,8,3,8,9,2,4,6,7,8];
var testArray3 = ['','','',''];
//console.log("length = " + testArray3.length);

var tempArray = ['bill','john','mike','mando','sarah','pip','lucky','christy','katie','maddox','ella'];


// player stuff
var Player = function(id)
{
	var player = 
	{
	   name : tempArray[ Math.floor(10 * Math.random())],
	   wins : 0,
	   losses : 0,
	   id : id,
    }
	// url of pic
	//board = create board; need own board each time
	// updatePlayer = function()
	//                {
	//                	// updade everyone boards, check winner!
	//                }
	return player;
}


var SOCKET_LIST = {};  
var PLAYER_LIST = {};
var USER_LIST   = {};

Player.connect = function(socket)
{
    var player = Player(socket.id);

}
Player.disconnect = function(socket)
{
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
}
// acivated everytime someone goes to page
io.sockets.on('connection', function(socket)
{
 	console.log("connected ");
 	socket.id = Math.random();
 	SOCKET_LIST[socket.id] = socket;  // this will give the each socket a name and put in list
   // var player = new Player(socket.id);
  Player.connect(socket);
  socket.on('signIn', function(data)
  {
      console.log("user name = " + data.name);
      if(data.name === "bob")
      {
         console.log("inside beb= ");
       
          // PLAYER_LIST[socket.id] = player;
         console.log(PLAYER_LIST.length + 'player length');
          socket.emit('signInResponce',{success:true});
      }
      else
      {
        socket.emit('signInResponce',{success:false});
        console.log("no name in database");
      }
    }); 

   // console.log("socket name #1" + data.name);
  
 	 socket.on("numberPressed", function(data) // listens for number pressed
     {
        console.log('array ' + data.array[0]);
     });
 //    sudo code
 //    if SOCKET_LIST == 4
 //    	start game();

    socket.on('buttonListner', function(data)
    {
 	   console.log("someone pressed a button");
 	   console.log(data.mess);
    });
   

    socket.on('arrayTester', function(data)
    {
      var numberOfCorrect = checkArray(data,testArray);
      console.log("numberPressed " + numberOfCorrect);
      var percentComplete = (numberOfCorrect/testArray.length) * 100;
      if(percentComplete === 100)
      {
        console.log("winner");
      }
    })
    socket.emit('testFromServer',
    {
       message : 'hi from server'
    });
    socket.on("disconnect", function()
    {
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
    socket.on("chatMessage", function(data)
    {
      console.log("chat " + data);
      
       // console.log("socket name " + PLAYER_LIST[i].player.name);
       // socket.emit("addchat", ": " + data);
        var playerName = (" "+ socket.id).slice(2,4);
        for(var i in SOCKET_LIST)
        {
          SOCKET_LIST[i].emit("addchat", playerName + ": " + data);
        }
      
    });

});  // end of io on
// var startGame = fucntion(PlayerList.length)
// {  
	// set every player ids
   // create same board = PlayerList.length;
   // give everyone their board
   // give everyone an id == math random
//}
var checkArray = function(ary1,ary2)
{
  var correctAnsewers = 0;
   for(var i = 0; i < ary1.length; i++)
   {
      if(ary1[i] === ary2[i])
      { 
        correctAnsewers ++;
      }

   }
   return correctAnsewers;
}
console.log( "check array " + checkArray(testArray,testArray2));
console.log("%correct " + (checkArray(testArray,testArray2)/10) * 100);


setInterval(function()
{  

    var packet = [];
    //console.log(SOCKET_LIST.length + "length of SOCKET_LIST");
    for(var i in PLAYER_LIST)
    {
       var player = PLAYER_LIST[i];
       console.log("player.name " + player.name);
       packet.push({
                	 name:player.name,
                   });
    }
     for(var i in SOCKET_LIST)
    {
    	var socket = SOCKET_LIST[i];
        socket.emit("updateBoard",packet); 
    }
    // {
    	  //var player =  Player.update() // CHECK how many right and gieve a % then updat boards with %
    //     var socket = PlayerList[i].id;
    //     socket.emit('updateboard',);
    // }
},10000/5);// this runs every .20 seconds. 


