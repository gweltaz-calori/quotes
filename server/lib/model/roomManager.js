class RoomManager {

    constructor(rooms) {
        
        this.rooms = rooms;
    }
	
	showRooms() {
		console.group('rooms');
		console.log(this.rooms);
		console.groupEnd();
	}

	addRoom(room) {
		this.rooms.push(room)
		console.log("----------------");
		console.log("room added");
		this.showRooms();
		console.log("----------------");
	}
	
	removeRoom(socketId) {
		
		let roomIndex = this.rooms.findIndex((room) => room.socketId == socketId);
		if(roomIndex != -1 ) {
			
			this.rooms.splice(roomIndex,1);
			console.log("----------------");
			console.log("room removed");
			this.showRooms();
			console.log("----------------");
		}
		
	}

	clearRooms() {
		this.rooms = [];
	}

	getRooms() {
		return this.rooms;
	}

	isCodeInRooms(code) {
		return this.rooms.find(roomItem => roomItem.code == code) != undefined;
	}

	findRoom(code) {
		return this.rooms.find(room => room.code == code);
	}

	
}

var instance = new RoomManager([]);

export default instance