import cardsQuestions from '../utils/api'

const MAX_CARDS = 5;

export default class Game {
	
	constructor() {
		this.started = false;
		this.questions = this.getRandomQuestions();
		this.currentQuestion = 0;
		this.responses = [];
	}

	getRandomQuestions() {
		
		let generatedQuestions = [];

		for(let i=0;i<MAX_CARDS;i++) {
			
			let randomQuestion = {};
			do {
				
				randomQuestion = cardsQuestions[Math.floor(Math.random()*cardsQuestions.length)];
				

			} while(generatedQuestions.find(question=> question == randomQuestion) !=undefined)

			
			generatedQuestions.push(randomQuestion)
			
		}
		
		return generatedQuestions;
	}

		


}