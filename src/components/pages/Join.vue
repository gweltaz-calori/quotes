<template>
	<div id="join-container">
		<div v-if="!codeValidation" id="join-container-enter-code">
			<span class="message" id="enter-code">Enter the code</span>
			<div id="code">
				<input :class="validatedClass(index)" :ref="'code'+index" v-model="userCode[index]" @input="formatCode(index)" v-for="(item,index) in [0,1,2,3]" type="number" pattern="\d*">
			</div>
		</div>
		
		<span v-if="codeValidation" class="message" id="waiting">Waiting for the host to start the game</span>
	</div>
</template>
<script>

	export default {
		data() {
			return {
				userCode : [],
				codeValidation:false,
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
			checkCode() {
				this.codeValidation = true;
				//TODO Check that the code is right and then emit a socket
			}
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
.message {
	font-size: 25px;
	color: white;
	text-align: center;
}
#join-container-enter-code {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100% - 112px - 40px);
}
#enter-code {
	margin-top: 85px;
	padding: 20px 0;
}
#waiting {
    padding: 37px;
	margin: auto;
}
input {
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
    transition: all 0.2s;
}
input.validated {
	border-color: white;
}
input:invalid {
	border-color: #FF4F56;
}
#code {
    margin: auto;
}
</style>