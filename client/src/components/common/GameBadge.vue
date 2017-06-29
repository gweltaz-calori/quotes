<template>
	<div class="badge" :class="[theme,{'no-padding':noPadding}]" :style="{height:height,width:width}">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		props : ['theme','height','width','no-padding'],

	}
</script>
<style scoped>
.badge {
	box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.25);
	border-radius: 50px;
	font-family: "Roboto";
	font-size: 18px;
    padding: 15px 37px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.light {
	background : linear-gradient(124.14deg, #FFFFFF 12.82%, #C2C2C2 210.53%);
	color: #797BE3;
}
.dark {
	color: white;
	background : linear-gradient(127.29deg, #787BE3 56.4%, #919EEA 94.53%);
}
.no-padding {
	padding: 0;
}	
</style>