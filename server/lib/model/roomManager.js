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
		this.showRooms();
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
}

var instance = new RoomManager([]);

export default instance