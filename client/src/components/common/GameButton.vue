<template>
	<div class="button-container">
		<router-link :to="to" class="button" v-if="type == 'link'">
			<slot>
				
			</slot>
		</router-link>
		<button class="button" v-if="type == 'button'" :class="!minWidth ? 'width-auto' : '' ">
			<slot></slot>
		</button>
	</div>
</template>
<script>
	export default {
		props: {
			//Link or Button
			type: { 
		      	type: String,
		      	required: true
		    },
		    to : {
				type:[String, Object],
		    },
		    minWidth : {
		    	type : Boolean,
		    	default:true
		    }
		},

	}
</script>
<style scoped>

.button {
	display: inline-block;
	text-align: center;
	cursor: pointer;
	border:0;
	outline: 0;
	background-color: transparent;
	color: white;
	text-transform: uppercase;
	border: solid rgba(255,255,255,0.15) 1px;
	min-width: 250px;
	padding: 18px 28px;
	font-size: 20px;
	letter-spacing: 4px;
	font-family: "Raleway";
	position: relative;
	overflow: hidden;
	z-index: 1;
	margin: 10px 0;
	text-decoration: none;
	transition: all 0.10s;
}
.width-auto {
	min-width: auto;
	width: 100%;
	margin: 0 12px;
}

.button:hover {
	color: #7174e2;
	background-color: white;
}
	
</style>