<template>
	<div id="create-container">
		<div class="messages">
			<span class="message" id="share-code">Join on your phone</span>
			<span id="url">quotes.com</span>
		</div>
		<leaderboard :players="players"></leaderboard>
		<game-button rounded id="start-button" type="button" @click.native="startGame()">Start</game-button>
	</div>
</template>
<script>
	
	import socket from '../../../../utils/socket'
	import GameButton from '../../../common/GameButton'
	import Leaderboard from '../../Leaderboard'

	export default {
		props : ['code','players'],
		components : {
			Leaderboard,
			GameButton
		},
		methods : {
			startGame() {
				socket.emit('start-game');

			},
			onGameStarted() {
				socket.on('game-started',(question) => {
					this.$router.replace({name:'game'})
				})
			}
		},
		mounted() {
			this.onGameStarted();
		}
	
	}
</script>
<style scoped>
#create-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	position:relative;
}

#share-code,#url {
	font-family: "Roboto";
	display: block;
	text-align: center;
}
#share-code {
	padding: 0;
	margin: 0;
	font-weight: 300;
	color: rgba(255,255,255,0.43);
	font-size: 36px;
}
#url {
	color: rgba(255,255,255,1);
	font-size: 27px;
}
#code-badge {
	margin-top: 24px;
}

#start-button {
	position: absolute;
    bottom: 17px;
}
.messages {
    margin-top: 126px;
}
.game-invalid {
	cursor: not-allowed;
	pointer-events: none;
}

</style>