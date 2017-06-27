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
    
    
	socket.on('create-room', () => {	
		let code = Room.generateCode();
		let room = new Room(socket.id,code,[]);
		managerInstance.addRoom(room);
		socket.emit('room-created',room)
	})


	
	socket.on('check-code',(data) => {
		let success = false;
		if(managerInstance.isCodeInRooms(data.code))
			success = true;
		socket.emit('code-checked',{success})
	})
	
	socket.on('join-room',(data) => {
		let success = false;
		if(data.name.length > 0){
			let room = managerInstance.findRoom(data.code);
			room.addPlayer(new Player(data.name,0));
			success = true;
		}
		socket.emit('room-joined',{success})
	})


	socket.on('disconnect', () => {
      	managerInstance.removeRoom(socket.id);
   	});


});
