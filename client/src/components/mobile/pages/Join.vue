<template>
	<div id="join-container">
		<div ref="codeContainer" id="join-container-enter-code">	
			<span class="message" id="enter-code">Enter the code</span>
			<div id="code">
				<input class="code-item" :key="index" :class="validatedClass(index)+' '+errorClass()" :ref="'code'+index" v-model="userCode[index]" @input="formatCode(index)" v-for="(item,index) in [0,1,2,3]" type="number" pattern="\d*">
			</div>
		</div>	
		<div ref="whoContainer" id="who-container">
			<span ref="whoMessage" class="message" id="who-are-you">Who are you ?</span>
			<input v-model="userName" maxlength="22" ref="whoInput" placeholder="Enter your name" type="text" id="userName">
			<game-button @click.native="joinRoom()" ref="whoButton" type="button">JOIN</game-button>
			<span class="error">{{roomErrorMessage}}
				<a v-if="roomErrorMessage.length > 0" href="/join">menu</a>
			</span>
		</div>
		<span ref="validation" class="message waiting" >Waiting for the host to start the game</span>
	</div>
</template>
<script>
	import {TimelineMax} from 'gsap'
	import GameButton from '../../common/GameButton'
	import socket from '../../../utils/socket'
	export default {
		components : {
			GameButton,
		},
		data() {
			return {
				userCode : [],
				nameValidation : false,
				errors:false,
				animations : {
					visibleEnterCode : false,
					visibleInputs : false,
				},
				userName : "",
				roomErrorMessage : "",
			}
		},
		methods : {
			formatCode(index) {
				let currentNumber = this.userCode[index];
				let nextInput = this.$refs['code'+(index+1)];

				if(currentNumber.length >= 1 ) {
					this.userCode[index] = currentNumber.substr(0,1);

					if(this.isNext(nextInput)) 
						nextInput[0].focus();
					else {

						this.checkCode();
					}
				}		
			},
			isNext(input) {
				return input != undefined;
			},
			validatedClass(index) {
				let itemNumber = parseInt(this.userCode[index]);
				let isNumber = !isNaN(itemNumber);
				let isLengthCorrect = this.userCode[index] != undefined && this.userCode[index].length == 1;
				return isNumber && isLengthCorrect ? 'validated' : ''; 
			},
			errorClass() {
				return this.errors ? 'invalid' : '';
			},
			checkCode() {
				socket.emit('check-code',{code:this.userCode.join('')})
				this.onCodeChecked();
			},
			onCodeChecked() {
				socket.on('code-checked',(data) => {
					if(data.success)
						this.animateCodeValid();
					else 
						this.errors = true;
				})
			},
			joinRoom() {
				socket.emit('join-room',{code:this.userCode.join(''),name:this.userName})	
				this.onRoomJoined();
			},
			onRoomJoined() {
				socket.on('room-joined',(data) => {
					if(data.success) {
						this.animateRoomJoined();
					} else {
						this.roomErrorMessage = data.message;
					}
				})
			},
			animateCodeValid() {
				let tl = new TimelineMax({});
				tl.to(this.$refs.codeContainer,0.5,{autoAlpha:0,display:'none'})
					.set(this.$refs.whoContainer,{display:'flex'})
					.to(this.$refs.whoMessage,0.5,{y:0,autoAlpha:1})
					.to(this.$refs.whoInput,0.3,{autoAlpha:1})
					.to(this.$refs.whoButton,2,{y:10,autoAlpha:1})
			},
			animateRoomJoined() {
				let tl = new TimelineMax({});
				tl.to(this.$refs.whoContainer,0.4,{autoAlpha:0,display:'none'})
					.to(this.$refs.validation,0.4,{y:0,autoAlpha:1,display:'block'})
			}
		},
		mounted() {
			this.animations.visibleEnterCode = true;
			this.animations.visibleInputs = true;
		},
		computed: {
			
		}
	}
</script>
<style scoped>
#join-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	height: 100%;
}
#join-container-enter-code {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100% - 115px - 40px);
}
#who-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	padding: 85px 0;
	display: none;
}
#enter-code {
	will-change:opacity;
} 
.waiting {
    padding: 37px;
	margin: auto;
	will-change:transform;
	opacity: 0;
	display: none;
	transform: translateY(50px);
}

.code-item {
	border: 0;
    outline: 0;
    background-color: transparent;
    text-align: center;
    color: white;
    border-bottom: solid rgba(255,255,255,0.17) 2px;
    width: 50px;
    margin: 0 5px;
    font-size: 45px;
    padding: 10px 0;
    font-family: "Roboto";
}
.code-item.validated {
	border-color: white;
}
.code-item.invalid {
	border-color: #FF4F56;
}
.code-item:invalid {
	border-color: #FF4F56;
}
#who-are-you {
	transform: translateY(5px);
    margin: 0;
}
#code {
    margin: auto;
}
#userName {
	background-color: transparent;
	border:0;
	outline: 0;
	text-align: center;
	color: white;
	font-size: 24px;
	margin: auto;
}

#userName::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  	color: rgba(255,255,255,0.33);
}
#userName::-moz-placeholder { /* Firefox 19+ */
  	color: rgba(255,255,255,0.33);
}
#userName:-ms-input-placeholder { /* IE 10+ */
  	color: rgba(255,255,255,0.33);
}
#userName:-moz-placeholder { /* Firefox 18- */
  	color: rgba(255,255,255,0.33);
}
.error 
{
	text-align: center;
	padding: 20px;
	color: #de3434;
}
.error a {
	color: white;
}
</style>