<template>
	<div class="leaderboard-card" :class="{'disabled' : !player.connected}">
		<div class="leaderboard-status">
			<img v-if="player.connected" src="../../assets/icons/connected.svg" alt="">
			<img v-else src="../../assets/icons/disconnected.svg" alt="">
		</div>
		<div class="leaderboard-infos">
			<span class="player-name">{{player.name}}</span>
			<game-badge class="player-score" theme="dark" no-padding="true" height="30px" width="81px">{{player.score}} pts</game-badge>
		</div>
	</div>
</template>
<script>
	import GameBadge from '../common/GameBadge'
	export default {
		components : {
			GameBadge
		},
		props : ['player']
	}
</script>
<style scoped>
.disabled {
	opacity: 0.2;
}
.player-name {
	font-size: 18px;
	color: #797BE3;
}
.player-score {
	margin-left: auto;
}
.leaderboard-card {
	display: flex;
	align-items: center;
	margin: 18px 0;
}
.leaderboard-status {
	margin-right: 20px;
	height: 50px;
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	border-radius: 50%;
	box-shadow: 1px 3px 50px rgba(0, 0, 0, 0.11);
}
.leaderboard-status img {

    width: 15px;
}
.leaderboard-infos {
	display: flex;
	align-items: center;
	padding: 26px;
	width: 282px;
	height: 50px;
	background: #FFFFFF;
	box-shadow: 1px 3px 50px rgba(0, 0, 0, 0.11);
	border-radius: 15px;
}
</style>