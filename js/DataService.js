export default {

    QUESTIONS: [
        {
            text: "test question 1",
            answer: "YES"
        },
        {
            text: "test question 2",
            answer: "NO"
        }
        
    ],
    
    questionIndex: 0,
    totalScore: 0,

    getCurrentQuestion() {
        return this.QUESTIONS[this.questionIndex]
    },

    gotoNextQuestion() {
        if(this.questionIndex < this.QUESTIONS.length-1) {
            this.questionIndex += 1
            return true
        } else {
            return false
        }
    },

    setAnswer(response) {
        if(this.QUESTIONS[this.questionIndex].answer === response) {
            this.totalScore += 1
        }
        console.log("total score", this.totalScore)
    },

    resetResult() {
        this.totalScore = 0
        this.questionIndex = 0
    },

    isWinner() {
        return this.totalScore > Math.floor(this.QUESTIONS.length / 2)+1
    }

}