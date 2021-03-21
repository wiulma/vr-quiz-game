export default {

    QUESTIONS: [
        {
            text: "Belle e Sebastien - Belle e' un cane da montagna?",
            answer: "YES"
        },
        {
            text: "L'arma di Lady Oscar e' il martello?",
            answer: "NO"
        },
        {
            text: "Pollon e' la figlia di Apollo?",
            answer: "YES"
        },
        {
            text: "Spank e' un cane bulldog?",
            answer: "NO"
        },
        {
            text: "Si chiama Lana la ragazza che Conan trova e cura?",
            answer: "YES"
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