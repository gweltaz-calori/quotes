<template>
	<div id="create-container">
		<span class="message" id="share-code">Share this code with your friends</span>
		<div id="code">
			<div v-for="codeItem in formatedCode" class="code-item">{{codeItem}}</div>
		</div>
		<game-button type="button">Start</game-button>
		{{room}}
	</div>
</template>
<script>
	import GameButton from '../../common/GameButton'
	import socket from '../../../utils/socket'

	export default {
		components : {
			GameButton
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
	padding: 85px 0;
}
#code {
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}
.code-item {
	font-size: 45px;
	color: white;
	font-family: "Roboto";
	text-align: center;
    margin: 0 10px;
}	
#share-code {
	margin: 0;
}
</style>