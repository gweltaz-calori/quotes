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
	
	removeRoom(room) {
		
		let roomIndex = this.rooms.findIndex((listRoom) => room == listRoom);
		if(roomIndex != -1 ) {

			this.rooms.splice(roomIndex,1);
			console.log("----------------");
			console.log("room removed");
			this.showRooms();
			console.log("----------------");
			return true;
		}
		
		return false;
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

	findRoom(filters) {
		
		return this.rooms
			.find(room => room.code == filters.code 
				|| room.socketId == filters.socketId);
	}

	isSocketARoom(socketId) {
		return this.rooms.find(listRoom => listRoom.socketId == socketId) != undefined;
	}

	


	
}

var instance = new RoomManager([]);

export default instance