<template>
	<div id="join-container">
		<transition name="opacity">
			<div v-if="!codeValidation && animations.visibleEnterCode" id="join-container-enter-code">	
				<span v-show="animations.visibleEnterCode" class="message" id="enter-code">Enter the code</span>
				<div id="code">
					<input :key="index"  :class="validatedClass(index)" :ref="'code'+index" v-model="userCode[index]" @input="formatCode(index)" v-for="(item,index) in [0,1,2,3]" type="number" pattern="\d*">
				</div>
			</div>
		</transition> 
		<transition name="validation-appear">
			<span ref="validation" v-show="codeValidation" class="message waiting" >Waiting for the host to start the game</span>
		</transition>
	</div>
</template>
<script>

	export default {
		data() {
			return {
				userCode : [],
				codeValidation:false,
				animations : {
					visibleEnterCode : false,
					visibleInputs : false,
				}

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
	transition: all 0.4s;
	will-change:opacity;
}
#enter-code {
	will-change:opacity;
} 
.waiting {
    padding: 37px;
	margin: auto;
	transition: all 0.9s ease;
	transition-delay: 0.4s;
	will-change:transform;
}

.validation-appear-enter {
	opacity: 0;
	transform: translateY(50px);
}
.validation-appear-enter-to {
	opacity: 1;
	transform: translateY(0px);
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
    font-family: "Roboto";
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