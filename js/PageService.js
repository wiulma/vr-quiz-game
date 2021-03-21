import QuestionComponent from "./components/QuestionComponent.js"
import ResultComponent from "./components/ResultComponent.js"
import StartGameComponent from "./components/StartGameComponent.js"
import DataService from "./DataService.js"

export default {

    setup() {
        document.getElementById("toggleFullscreen").addEventListener("click", () => this.fullscreen())
        document.addEventListener("ShowNext", () => {
            const hasNext = DataService.gotoNextQuestion()
            if(hasNext) {
                QuestionComponent.showQuestion()
            } else {
                ResultComponent.showResult()
            }
        })

        document.addEventListener("ShowStart", () => {StartGameComponent.show() }) 
        document.addEventListener("StartGame", () => {this.initGame() }) 
    },

    fullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .catch(err => console.error(err))
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                .catch(err => console.error(err))
            }
        }
    },

    initGame() {
        DataService.resetResult()
        QuestionComponent.showQuestion()
    },
}