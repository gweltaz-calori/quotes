<template>
	<div id="create-container">
		<game-menu :room-code="room.code"></game-menu>
		
		<setup :code="room.code" :players="room.players"></setup>
		
	</div>
</template>
<script>
	
	import Setup from '../Setup'
	import Leaderboard from '../Leaderboard'

	import GameMenu from '../../common/GameMenu'
	import GameButton from '../../common/GameButton'
	import socket from '../../../utils/socket'

	export default {
		components : {
			GameButton,
			GameMenu,
			Leaderboard,
			Setup
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
			},
			onRoomCreated() {
				socket.on('room-created',data => {
					this.room = data;
				})
			},
			onInfosChanged() {
				socket.on('infos-changed', room => {
					this.room = room;
				})
			}
		},
		computed : {
			formatedCode() {
				return this.room.code.split('')
			}
		},
		mounted() {
			this.createRoom();
			this.onRoomCreated();
			this.onInfosChanged();
		},
	}
</script>
<style scoped>
#create-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
    z-index: 1;
	padding: 40px;
}
.code-item {
	font-size: 45px;
	color: white;
	font-family: "Roboto";
	text-align: center;
    margin: 0 10px;
}
</style>