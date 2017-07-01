<template>
	<div id="game-leaderboard">
		<transition-group name="list" class="transition-container">
			<leaderboard-card v-for="(player,index) in players" :key="player" :player="player"></leaderboard-card>
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
    display: flex;
}
.list-enter {
  	opacity: 0;
  	transform: translateY(30px);
}
.list-enter-to {
	transform: translateY(0);
}

.list-leave-active {
	
	position: absolute;
}
.list-leave-to  {
  	opacity: 0;
}
.transition-container {
	width: 357px;
}
</style>