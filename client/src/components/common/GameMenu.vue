<template>
	<div class="game-menu">
		<game-badge class="code-badge" theme="light">#{{roomCode}}</game-badge>
		<game-button type="button" :square="true">
			<img src="../../assets/icons/hamburger.svg" alt="" >
		</game-button>
	</div>
</template>
<script>
	import GameBadge from './GameBadge'
	import GameButton from './GameButton'
	export default {
		components : {
			GameBadge,
			GameButton
		},
		props : ['room-code']
	}
</script>
<style scoped>
.game-menu {
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
}
.code-badge {
	margin-right: 21px;
}

img {
	width: 19px;
	height: 19px;
}
</style>