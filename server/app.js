var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8085);

io.on('connection', function (socket) {
    
    socket.on('hello', function (data) {
        console.log(data);
    });
});