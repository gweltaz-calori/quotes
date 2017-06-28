export default class Player {

    constructor(socketId,name,score) {
    	this.socketId = socketId;
        this.name = name;
        this.score = score;
        this.connected = true;
    }

	setConnectedStatus(value) {
		this.connected = value;
	}

	setSocketId(value) {
		this.socketId = value;
	}
	
	static hasRooms(rooms,id) {
		return Object.keys(rooms).find(key => key != id) != undefined;
	}

}