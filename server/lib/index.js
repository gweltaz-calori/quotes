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
		let message = "";
		let room = managerInstance.findRoom(data.code);
		if(data.name.length > 0){
			
			if(room != undefined) {
				room.addPlayer(new Player(data.name,0));
				success = true;
				socket.join(room.socketId);
			}
			else { // Means room has been disconnect while user was adding his name
				message = "This room has been disconnected. Go back to the";
			} 
			
		}
		socket.emit('room-joined',{success,message})
	})

	socket.on('leave-room',(data) => {
		console.log("----------")
		console.log("leaving the room for the client",socket.id)
		console.log("----------")
		socket.leave(data.socketId);
	})

	socket.on('disconnect', () => {
      	let isRoomRemoved = managerInstance.removeRoom(socket.id);
      	if(isRoomRemoved) // Means the person who leaves was a web client
			socket.broadcast.to(socket.id).emit('room-disconnected',{socketId:socket.id});
      	

   	});


});
