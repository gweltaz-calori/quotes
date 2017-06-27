import managerInstance from './roomManager'
export default class Room {

    constructor(socketId,code, players) {
    	this.socketId = socketId;
        this.code = code;
        this.players = players;
    }

    addPlayer(player) {
    	this.players.push(player);
    	console.log("----------------");
		console.log("added player");
		console.log(this);
		console.log("----------------");
    }
	
	static generateCode() {
		
		let code = "";
		do {
			for(let i=0;i<=3;i++) {
				code+= Math.floor((Math.random() * 9) + 1).toString();
			}
			
		} while(managerInstance.isCodeInRooms(code))
		return code;
	}
}