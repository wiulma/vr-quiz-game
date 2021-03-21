import DataService from "../DataService.js"
import styles from "../styles.js"

export default {

    winnerData: {
        text: "HAI VINTO!! Sarai contattato a breve da un super eroe per una meravigliosa avventura con lui!",
        color: "#ff0",
        img: ""
    },

    looserData: {
        text: "Non hai vinto... riprova per vincere il tuo premio!",
        color: "#f00",
        img: ""
    },


    getTmpl(data) {
        return `<a-entity id="resultContainer" 
            component-padding="0.5"  
            width="12" 
            height="7" 
            position="0 2.5 -4" 
            rotation="-5 0 0" 
            panel-color="${styles.panelColor}" 
            material="${styles.panelMaterial}" 
            geometry="depth: 0.01; height: 7; width: 12">
            <a-text width="8" height="6" 
                shader= "msdf"
                font="${styles.text.fontUrl}"
                value="${data.text}" 
                text="anchor: center; width: 8; height: 62; align: center; color: ${data.color}; opacity: 0.9" 
                position="0 1 0.1" scale="2 2 2">
            </a-text>
            <a-image
                src="#btn-restart"
                class="clickable restart"
                geometry="width: 4; height: 1"
                material="side: front"
                position="0 -1.5 0.1" 
                ></a-image>
        </a-entity>`
    },

    showResult() {
        const rootContainer = document.querySelector("#sceneContainer")
        rootContainer.insertAdjacentHTML('beforeEnd',  
            DataService.isWinner() ? 
                this.getTmpl(this.winnerData) : 
                this.getTmpl(this.looserData)
            );
        this.initEvents()
    },

    initEvent() {
        const container = document.querySelector("#resultContainer")
        const restartBtn = container.querySelector(".restart")
        this.listeners = {
            restart: this.restart.bind(this)
        }
        restartByn.addEventListener("click", this.listeners.restart)
    },

    restart() {
        const container =  document.querySelector("#resultContainer")
        const restartBtn = container.querySelector(".restart")
        restartBtn.removeEventListener("click", this.listeners.restart)
        container.parentElement.removeChild(container)
        document.dispatchEvent(new CustomEvent("StartGame"))
    }
}