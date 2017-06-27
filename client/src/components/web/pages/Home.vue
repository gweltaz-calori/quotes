<template>
	<div id="home-container">
		<img id="controller-picture" src="../../../assets/icons/controller.svg" alt="Game Controller">
		<game-button :to="{ path: 'join' }" type="link">join</game-button>
		<game-button :to="{ path: 'create' } "type="link">create</game-button>
		<game-menu type="rules"></game-menu>
	</div>
</template>
<script>
import GameButton from '../../common/GameButton'
import GameMenu from '../../common/GameMenu'
	export default {
		components :  {
			GameButton,
			GameMenu,
		},
	}
</script>
<style scoped>
#home-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
}	
#controller-picture {
	margin-bottom: 18%;
    width: 141px;
}
</style>