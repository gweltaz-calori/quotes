<template>
	<div id="reconnection-container">
		<span id="reconnection-message" class="message">{{formatMessage}}</span>
		<div id="buttons">
			<game-button @click.native="reConnectRoom()" class="disconnect-button" type="button" :min-width="false">YES</game-button>
			<game-button @click.native="leaveRoom()" class="disconnect-button" type="button" :min-width="false">NO</game-button>
		</div>
		
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import socket from '../../../utils/socket'
	import Cookies from 'js-cookie'
	import GameButton from '../../common/GameButton'
	export default {
		components : {
			GameButton
		},
		data() {
			return {
				infos : {}
			}
		},
		computed: {
			formatMessage() {
				return "Do you want to join the room "+this.infos.code+" again ?";
			}
		},
		methods : {
			...mapActions([
				'setReconnected',
				'setInfos'
			]),
			leaveRoom() {
				Cookies.remove('userinfos');
				this.$router.push({ name: 'home' })
				socket.emit('leave-room',this.infos);
			},
			reConnectRoom() {
				Cookies.remove('userinfos');
				socket.emit('player-reconnect',this.infos);
				this.setInfos(this.infos);
				this.setReconnected(true);
				this.$router.push({ name: 'home' })	
			},
		},
		mounted() {
			this.infos = JSON.parse(Cookies.get('userinfos'));
		}

	}
</script>
<style scoped>
#reconnection-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	
	flex: 1;
	padding: 85px 0;
}	
#reconnection-message {
	margin: 0;
	padding: 20px 15px;
}

#buttons {
	display: flex;
	width: 80%;
	margin: auto;
}
.disconnect-button {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.disconnect-button button {
	width: 100%;
}
</style>