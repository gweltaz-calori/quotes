<template>
	<div id="create-container">
		<span class="message" id="share-code">Share this code with your friends</span>
		<div id="code">
			<div class="code-item">5</div>
			<div class="code-item">7</div>
			<div class="code-item">8</div>
			<div class="code-item">2</div>
		</div>
		<game-button type="button">Start</game-button>
	</div>
</template>
<script>
	import GameButton from '../web/GameButton'
	export default {
		components : {
			GameButton
		}
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