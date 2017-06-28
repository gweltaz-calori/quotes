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
		let room = managerInstance.findRoom({code:data.code,socketId:""});
		if(data.name.length > 0){
			
			if(room != undefined) {
				room.addPlayer(new Player(socket.id,data.name,0));
				success = true;
				socket.join(room.socketId);
				io.to(room.socketId).emit('infos-changed', room);
			}
			else { // Means room has been disconnect while user was adding his name
				message = "This room has been disconnected. Go back to the";
			} 
			
		}
		socket.emit('room-joined',{success,message})
	})

	socket.on('leave-room',(infos) => {

		let room = managerInstance.findRoom({code:infos.code,socketId:''});
		let player = room.findPlayer({socketId:'',name:infos.name});
		room.removePlayer(player);
		socket.leave(room.socketId);
		io.to(room.socketId).emit('infos-changed', room);
	})

	socket.on('player-reconnect',(infos) => {
		let room = managerInstance.findRoom({code:infos.code,socketId:''});
		let disconnectedPlayer = room.findPlayer({socketId:'',name:infos.name});
		socket.join(room.socketId);
		disconnectedPlayer.setConnectedStatus(true);
		disconnectedPlayer.setSocketId(socket.id);
		io.to(room.socketId).emit('infos-changed', room);
		
	})

   	socket.on('disconnecting',() => {
   		
		if(managerInstance.isSocketARoom(socket.id)) { // If the socket who left is a room
			let room = managerInstance.findRoom({code:'',socketId:socket.id});
   			managerInstance.removeRoom(room);
   			socket.broadcast.to(socket.id).emit('room-disconnected',{socketId:socket.id});
   			for(let player of room.players) {
   				let socket = io.sockets.connected[player.socketId];
   				socket.leave(room.socketId);
   			}
		} 
		else if(Player.hasRooms(socket.rooms,socket.id)){ // It's a player
			let idRoom = Object.keys(socket.rooms).find(key => key != socket.id); // Socket.io consider that the client is also a room
      		let room = managerInstance.findRoom({code:"",socketId:idRoom});
      		let player = room.findPlayer({socketId:socket.id,name:''});
      		player.setConnectedStatus(false);
      		io.to(room.socketId).emit('infos-changed', room);
		}  

   		
   	})

   	


});
