const express = require('express');
const app = express();
const cors = require('cors')
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = express.Router();

//Model
import Player from './model/player'
import Room from './model/room'
import managerInstance from './model/roomManager'


app.use(cors());

app.use('/api/', router);

server.listen(8085);

io.on('connection', socket => {
    
    // Page create
	socket.on('create-room', () => {
		console.log("create room")
		let host = new Player("Jean",0,true);
		let code = Room.generateCode();
		let room = new Room(code,[host]);
		managerInstance.addRoom(room);
		socket.emit('room-created',room)
	})

	socket.on('remove-room',(room) => {
		managerInstance.removeRoom(room)
	})
	
	// End Page create

	
	socket.on('join-room',(data) => {

		let success = false;
		if(managerInstance.isCodeInRooms(data.code)){
			let room = managerInstance.findRoom(data.code);
			room.addPlayer(new Player("denis",0,false));
			success = true;
		}
		socket.emit('room-joined',{success})
	})






	socket.on('disconnect', data => {
      	console.log(socket+' Got disconnect');
   	});


});
