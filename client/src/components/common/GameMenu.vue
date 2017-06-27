<template>
	<div class="game-menu">
		<router-link v-if="type == 'rules'" :to="{ name: 'rules' }" class="game-menu-item right">
			Rules
		</router-link>
		<router-link v-if="type == 'menu'" :to="{ name: 'home' }" class="game-menu-item right">
			Menu
		</router-link>
	</div>
</template>
<script>
	export default {
		props : ['type']
	}
</script>
<style scoped>
.game-menu {
	position: absolute;
	bottom: 28px;
	width: 100%;
	display: flex;
	align-items: center;
	
}	
.game-menu-item {
	text-decoration: none;
	font-family: "Raleway";
	font-size: 15px;
	color: rgba(255,255,255,0.59);
	margin: 0 25px;
	transition: all 0.25s;
}
.game-menu-item:hover {
	color: rgba(255,255,255,1);
}
.right {
	margin-left: auto;
}
</style>