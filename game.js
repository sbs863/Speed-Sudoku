var express = require('express');
var app = express();
var serv = require('http').Server(app);
var path = require('path');
var Player = require('./player.js');
var Lobby = require('./lobby.js');

var PlayerList = {};

//app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', function(req, res)
{
   res.sendFile(__dirname + '/client/main.html'),(__dirname + '/client/assets/css/style.css');
});

app.use(express.static('client/'));
serv.listen(2000); 
var io = require('socket.io')(serv,{});

var rooms = ['room1','room2','room3'];

var testArray =  [1,2,3,4,5,6,7,8,9,0];
var testArray2 = [5,8,3,8,9,2,4,6,7,8];
var testArray3 = ['','','',''];

var tempArray = ['bill','john','mike','mando','sarah','pip','lucky','christy','katie','maddox','ella'];

var SOCKET_LIST = {};  
var PLAYER_LIST = {};
var GAME_LIST   = {};
var USER_LIST   = {
                     bob :'abc',
                     mike:'def',
                     sam :'ghi',

                    };

Player.connectPlayer = function(socket)
{
    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;
   
    console.log(player.name + "player on connect");

}
Player.disconnect = function(socket)
{
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
}
// acivated everytime someone goes to page

var isValidPassword = function(data)
{
   return USER_LIST[data.name === data.passWord];
}
var isUserNameTaken = function(data)
{
   return USER_LIST[data.name];
}
var addUser = function(data)
{
  USER_LIST[data.name] == data.passWord;
}
io.sockets.on('connection', function(socket)
{
  var connectonCounter = 0; 
 	console.log("connected ");
 	socket.id = Math.random() * 100;
 	SOCKET_LIST[socket.id] = socket; 
  Player.connectPlayer(socket);

console.log(Object.keys(PLAYER_LIST).length + "player list length");

  //var player = new Player(socket.id);
  // console.log("player " + JSON.stringify(player));
  //Player.connect(socket);
  // socket.on('signIn', function(data)
  // {
  //     console.log("user name = " + data.name);
  //     if(isValidPassword)
  //     {
  //        console.log("inside if beb= ");
  //        Player.connectPlayer(socket);
  //         // PLAYER_LIST[socket.id] = player;
  //        //console.log(PLAYER_LIST.length + 'player length');
  //         socket.emit('signInResponce',{success:true});
  //     }
  //     else
  //     {
  //       socket.emit('signInResponce',{success:false});
  //     }
  //   }); 
  // socket.on('signUp', function(data)
  // {
  //   if(isUserNameTaken)
  //   {
  //      socket.emit('signInResponce',{success:false});
  //   }
  //   else
  //   {
  //     addUser(data);
  //     socket.emit('signInResponce',{success:true});
  //   }
  // });
   socket.join("room1");
 //  console.log(io.sockets.clients().length + " client length");

   // console.log("socket name #1" + data.name);
  
 	 socket.on("numberPressed", function(data) // listens for number pressed
     {
        for(var i in data.array)
        {
           console.log('array ' + data.array[i]);

        }
        var numberOfCorrect = checkArray(data.array,testArray);
        console.log("numberPressed " + numberOfCorrect);
        var percentComplete = (numberOfCorrect/testArray.length) * 100;
        player.completed = percentComplete;
        console.log(percentComplete + " pecent complerte");
        if(percentComplete === 100)
        {
           console.log("winner");
        }
     });
 //    sudo code
 //    if SOCKET_LIST == 4
 //    	start game();

   

    socket.on('arrayTester', function(data)
    {
      var numberOfCorrect = checkArray(data,testArray);
      console.log("numberPressed " + numberOfCorrect);
      var percentComplete = (numberOfCorrect/testArray.length) * 100;

      player.completed = percentComplete;
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
      if(parseInt(ary1[i]) === parseInt(ary2[i]))
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
    if(Object.keys(PLAYER_LIST).length > 1)
    {  
       var gameId    =  Math.random() * 100;
       var lobby     = new Lobby(gameId,PLAYER_LIST);
       console.log('inside if player');
          // this will give the each socket a name and put in list
    }
    // {
      //   sent everyone an array
    	  //var player =  Player.update() // CHECK how many right and gieve a % then updat boards with %
    //     var socket = PlayerList[i].id;
    //     socket.emit('updateboard',);
    //    
    // }
},10000/5);// this runs every .20 seconds. 


