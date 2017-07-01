const express = require('express');
const app = express();
const cors = require('cors')
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = express.Router();

//Model
import Player from './model/player'
import Room from './model/room'
import Game from './model/game'
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
		if(data.name.length > 0) {
			 
			if(managerInstance.roomExists({code:data.code,socketId:""})) {

				let room = managerInstance.findRoom({code:data.code,socketId:""});
				if(room.isPlayerNameUnique(data.name)) {
					let player = new Player(socket.id,data.name,0);
					room.addPlayer(player);
					success = true;
					socket.join(room.socketId);
					io.to(room.socketId).emit('infos-changed', {type:'player-joined',player});
				} 
				else 
				{
					message = "Names must be unique";
				}
				
			}
			else { // Means room has been disconnect while user was adding his name
				socket.emit('room-disconnected');
			} 
			
		}
		socket.emit('room-joined',{success,message})

	})

	socket.on('leave-room',(infos) => {

		if(managerInstance.roomExists({code:infos.code,socketId:''})) { // Means the room has been deleted during that time
			let room = managerInstance.findRoom({code:infos.code,socketId:''});
			let player = room.findPlayer({socketId:'',name:infos.name});

			room.removePlayer(player);
			socket.leave(room.socketId);

			io.to(room.socketId).emit('infos-changed', {type:'player-left',player});
		}

	})

	socket.on('player-reconnect',(infos) => {
			
		if(managerInstance.roomExists({code:infos.code,socketId:''})) {

			let room = managerInstance.findRoom({code:infos.code,socketId:''});
			let disconnectedPlayer = room.findPlayer({socketId:'',name:infos.name});

			socket.join(room.socketId);

			disconnectedPlayer.setConnectedStatus(true);
			disconnectedPlayer.setSocketId(socket.id);

			io.to(room.socketId).emit('infos-changed', {type:'player-reconnected',player:disconnectedPlayer});
		}
		else { //Room has been deleted during 
			socket.emit('room-disconnected');
		}
				
	})

   	socket.on('disconnecting',() => {
   		
		if(managerInstance.isSocketARoom(socket.id)) { // If the socket who left is a room
			let room = managerInstance.findRoom({code:'',socketId:socket.id});
   			managerInstance.removeRoom(room);
   			socket.broadcast.to(socket.id).emit('room-disconnected');
   			for(let player of room.players) {
   				let socket = io.sockets.connected[player.socketId];
   				if(socket != undefined) // means player didnt reconnect yet
   					socket.leave(room.socketId);
   			}
		} 
		else if(Player.hasRooms(socket.rooms,socket.id)){ // It's a player an he has rooms

			let idRoom = Object.keys(socket.rooms).find(key => key != socket.id); // Socket.io consider that the client is also a room
      		let room = managerInstance.findRoom({code:"",socketId:idRoom});
      		let player = room.findPlayer({socketId:socket.id,name:''});
			if(player != undefined) {
				player.setConnectedStatus(false);

      			io.to(room.socketId).emit('infos-changed', {type:'player-disconnected',player});
			}
      		
		}  

   	})

   	socket.on('start-game',() => {
		let room = managerInstance.findRoom({code:'',socketId:socket.id});
		room.game.started = true;
		let currentQuestion = room.game.questions[room.game.currentQuestion];
   		io.sockets.in(socket.id).emit('game-started',currentQuestion);

   	})


});
