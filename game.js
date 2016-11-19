var path = require('path');
var Player = require('./player.js');
var Lobby = require('./lobby.js');
var Model = require('./models');
// console.log(sid);
var PlayerList = {};
//app.use(express.static(path.join(__dirname, 'assets')));
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/client/main.html'), (__dirname + '/client/assets/css/style.css');
// });

// app.use(express.static('client/'));

// var io = require('socket.io')(serv, {});

var rooms = ['room1', 'room2', 'room3'];

var testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var testArray2 = [5, 8, 3, 8, 9, 2, 4, 6, 7, 8];
var testArray3 = ['', '', '', ''];

var tempArray = ['bill', 'john', 'mike', 'mando', 'sarah', 'pip', 'lucky', 'christy', 'katie', 'maddox', 'ella'];

var SOCKET_LIST = {};
var PLAYER_LIST = {};
var GAME_LIST = {};
var USER_LIST = {
    bob: 'abc',
    mike: 'def',
    sam: 'ghi',

};
module.exports = function(io) {
    Player.connectPlayer = function(socket) { // this is where the database code needs to go
        var player = new Player(socket.id);
        Model.users.findAll({
            where: {
                username: 'test',
            }
        });
        player.setName(tempArray[Math.floor(10 * Math.random())]);
        console.log(player.name + " player naem");
        PLAYER_LIST[socket.id] = player;
        console.log("player " + JSON.stringify(player));
    }
    Player.disconnect = function(socket) {
        delete PLAYER_LIST[socket.id];
    }

    io.sockets.on('connection', function(socket) {
        console.log("connected ");
        socket.id = Math.random() * 100;
        Player.connectPlayer(socket);
        console.log(Object.keys(PLAYER_LIST).length + "player list length");

        socket.on("numberPressed", function(data) // listens for number pressed
            {
                var playerFromList = lobby.getPlayer()
                var numberOfCorrect = checkArray(data.array, testArray);
                console.log("numberPressed " + numberOfCorrect);
                var percentComplete = (numberOfCorrect / testArray.length) * 100;
                player.completed = percentComplete;
                console.log(percentComplete + " pecent complerte");
                if (percentComplete === 100) {
                    console.log("winner");
                }
            });
        socket.on('arrayTester', function(data) {
            var numberOfCorrect = checkArray(data, testArray);
            console.log("numberPressed " + numberOfCorrect);
            var percentComplete = (numberOfCorrect / testArray.length) * 100;

            player.completed = percentComplete;
            if (percentComplete === 100) {
                console.log("winner");
            }
        })

        socket.on("disconnect", function() { // TODO fix this
            delete PLAYER_LIST[socket.id];
        });


        socket.on("chatMessage", function(data) { // TODO fix this
            console.log("chat " + data);

            // console.log("socket name " + PLAYER_LIST[i].player.name);
            // socket.emit("addchat", ": " + data);
            var playerName = (" " + socket.id).slice(2, 4);
            for (var i in SOCKET_LIST) {
                PLAYER_LIST[i].emit("addchat", playerName + ": " + data);
            }

        });

    }); // end of io on

    var checkArray = function(ary1, ary2) { // TODO move this
        var correctAnsewers = 0;
        for (var i = 0; i < ary1.length; i++) {
            if (parseInt(ary1[i]) === parseInt(ary2[i])) {
                correctAnsewers++;
            }

        }
        return correctAnsewers;
    }
    console.log("check array " + checkArray(testArray, testArray2));
    console.log("%correct " + (checkArray(testArray, testArray2) / 10) * 100);


    setInterval(function() { // TODO maybe 2 of these??

        var packet = [];

        for (var i in PLAYER_LIST) {
            var player = PLAYER_LIST[i];
            // console.log("player.name " + player.name);
            packet.push({
                name: player.name,
            });
            var socket = PLAYER_LIST[i];
            // socket.emit("updateBoard", packet);
        }
        // for (var i in SOCKET_LIST) {
        //     var socket = SOCKET_LIST[i];
        //     socket.emit("updateBoard", packet);
        //}
        console.log(Object.keys(PLAYER_LIST).length + "player list length in setInterval");
        if (Object.keys(PLAYER_LIST).length > 1) {
            console.log('inside if player');
            //var gameId = Math.random() * 100;
            // var lobby = new Lobby(gameId, PLAYER_LIST);
            // lobby.id = gameID;
            //GAME_LIST[gameID] = lobby;



        }
        // {
        //   sent everyone an array
        //var player =  Player.update() // CHECK how many right and gieve a % then updat boards with %
        //     var socket = PlayerList[i].id;
        //     socket.emit('updateboard',);
        //    
        // }
    }, 10000 / 5); // this runs every 2 seconds.

};