<template>
	<div id="game-leaderboard">
		<transition-group name="list">
			<leaderboard-card class="leaderboard-card" v-for="(player,index) in players" :key="player.socketId" :player="player"></leaderboard-card>
		</transition-group>
	</div>
</template>
<script>
	import {TimelineMax} from 'gsap'
	import LeaderboardCard from './LeaderboardCard'
	export default {
		components :  {
			LeaderboardCard
		},
		props : ['players'],
		
	}
</script>
<style scoped>
#game-leaderboard {
    margin-top: 45px;
}
.list-enter-active, .list-leave-active {
  	transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  	opacity: 0;
  	transform: translateY(30px);
}
</style>