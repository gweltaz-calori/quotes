import managerInstance from './roomManager'
export default class Room {

    constructor(code, players) {
        this.code = code;
        this.players = players;
    }

    addPlayer(player) {
    	this.players.push(player);
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