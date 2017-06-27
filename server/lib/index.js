const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Model
import Player from './model/player'
import Room from './model/room'
import managerInstance from './model/roomManager'


app.get('/room',(req,res) => {
	let code = Room.generateCode();
	let room = new Room(code,[]);
	managerInstance.addRoom(room);
	res.status(201).send('Room has been created');
})
server.listen(8085);

io.on('connection', socket => {
    
    socket.on('hello', data => {
        console.log(data);
    });

});
