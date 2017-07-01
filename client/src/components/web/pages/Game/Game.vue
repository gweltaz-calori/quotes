<template>
	<div id="game-container">
		<game-menu :room-code="room.code"></game-menu>
		<router-view :code="room.code" :players="room.players"></router-view>
	</div>
</template>
<script>
	import GameMenu from '../../../common/GameMenu'
	import socket from '../../../../utils/socket' 
	export default {
		components : {
			GameMenu
		},
		data() {
			return {
				room : {
					code : "",
					players: [],
					room : {}
				}
			}
		},	
		methods : {
			createRoom() {
				socket.emit('create-room');
				this.onRoomCreated();
			},
			onRoomCreated() {
				socket.on('room-created',data => {
					this.room = data;
					
				})
			},
			onInfosChanged() {
				let vueContext = this;
				socket.on('infos-changed', room => {
					
					//Necessary for the animations
					switch(room.type) {
					    case 'player-joined':  	
					        vueContext.room.players.push(room.player);
					        break;
					    case 'player-disconnected':
					    	vueContext.room.players.find(roomPlayer => roomPlayer.name == room.player.name).connected = false;
					        break;
					    case 'player-reconnected':
					    	vueContext.room.players.find(roomPlayer => roomPlayer.name == room.player.name).connected = true;
					    	break;
					    case 'player-left':
					    	vueContext.room.players.splice(vueContext.room.players.findIndex(roomPlayer => roomPlayer.name == room.player.name),1);
					    	break;
					} 
					
				})
			}
		},
		mounted() {
			this.createRoom();
			this.onInfosChanged();
		},

	}
</script>
<style>
#game-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
    z-index: 1;
	padding: 40px;
}	

</style>