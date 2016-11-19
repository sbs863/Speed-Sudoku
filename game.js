var path = require('path');
var Player = require('./player.js');
var Lobby = require('./lobby.js');
var Model = require('./models');
// console.log(sid);
var PlayerList = {};
var SudokuGame = require('./sudokuGame.js');

var sudokuGame = new SudokuGame(3);
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
    var lobby = new Lobby();
    Player.connectPlayer = function(socket) { // this is where the database code need to go
        var player = new Player(socket.id);
        player.setName(tempArray[Math.floor(10 * Math.random())]);
        PLAYER_LIST[socket.id] = player;
        lobby.addPlayer(player);
        socket.emit("playerObject", player);

    }
    Player.disconnect = function(socket) {
        delete PLAYER_LIST[socket.id];
    }

    io.sockets.on('connection', function(socket) {
        console.log("connected ");
        socket.id = Math.random() * 100;
        Player.connectPlayer(socket);
        SOCKET_LIST[socket.id] = socket;

        socket.on("numberPressed", function(data) // listens for number pressed
            {
                console.dir("data id " + JSON.stringify(data));
                var player = lobby.getPlayer(data.id);
                //  console.log(JSON.stringify(player));
                var game = lobby.getGame(player.gameId);
                console.log(game.getGameId());

                //  var playerFromList = lobby.getPlayer()
                //  var numberOfCorrect = checkArray(data.array, lobby.testArray);
                // console.log("numberPressed " + numberOfCorrect);
                // var percentComplete = (numberOfCorrect / testArray.length) * 100;
                // player.completed = percentComplete;
                //  console.log(percentComplete + " pecent complerte");
                console.log("number pressed " + data.number);
            });
        socket.on('arrayTester', function(data) { // todo
            var numberOfCorrect = checkArray(data, testArray);
            console.log("numberPressed " + numberOfCorrect);
            var percentComplete = (numberOfCorrect / testArray.length) * 100;

            player.completed = percentComplete;
            if (percentComplete === 100) {
                console.log("winner");
            }
        })

        socket.on("disconnect", function() {
            delete PLAYER_LIST[socket.id];
        });


        socket.on("chatMessage", function(data, playerName) {
            console.log("chat " + data);
            for (var i in SOCKET_LIST) {
                SOCKET_LIST[i].emit("addchat", playerName + ":" + data);
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


    setInterval(function() {
        //console.log()                           
        if (lobby.checkIfEnoughPlayers()) {
            console.log("inside checkIfEnoughPlayers if statement");
            lobby.createGame();
        }

        if (lobby.checkForWinner() != null) {
            var list = lobby.checkForWinner();
            for (var i in list) {
                console.log(list[i].name);
            }
        }

    }, 10000 / 5);
}