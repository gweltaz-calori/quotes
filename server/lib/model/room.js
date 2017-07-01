import managerInstance from './roomManager'
import Game from './game'
export default class Room {

    constructor(socketId,code, players) {
    	this.socketId = socketId;
        this.code = code;
        this.players = [];
        this.game = new Game();
    }

    addPlayer(player) {
    	this.players.push(player);
    }
	
	removePlayer(player) {
		let playerIndex = this.players.findIndex(listPlayer => listPlayer == player);
		if(playerIndex != -1)
			this.players.splice(playerIndex,1);
	}
    
    findPlayer(filters) {
		return this.players.find(player => player.socketId == filters.socketId || player.name == filters.name);
    }

    isPlayerNameUnique(name) {
		
		return this.players.find(player => player.name == name) === undefined;

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