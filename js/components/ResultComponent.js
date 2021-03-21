import DataService from "../DataService.js"
import styles from "../styles.js"

export default {

    winnerData: {
        text: "HAI VINTO!! Sarai contattato a breve da un super eroe per una meravigliosa avventura con lui!",
        color: "#ff0",
        gif: "https://media.giphy.com/media/W5UEH6yWLjc0ye37dz/giphy.gif"
    },

    looserData: {
        text: "Non hai vinto... riprova per vincere il tuo premio!",
        color: "#f00",
        gif: "https://media.giphy.com/media/ieW5dfu5bWoP6/giphy.gif"
    },


    getTmpl(data) {
        return `<a-entity id="resultContainer" 
            component-padding="0.5"  
            width="12" 
            height="7" 
            position="0 2.5 -4" 
            rotation="${AFRAME.utils.device.isMobile() ? -30 : 0} 0 0" 
            panel-color="${styles.panelColor}" 
            material="${styles.panelMaterial}" 
            geometry="depth: 0.01; height: 7; width: 12">
            <a-text width="6" height="7" 
                shader= "msdf"
                font="${styles.text.fontUrl}"
                value="${data.text}" 
                text="anchor: center; width: 6; height: 7; align: center; color: ${data.color}; opacity: 0.9; wrapCount: 20" 
                position="-2.8 1 0.1" scale="1 1 1">
            </a-text>
            <a-entity id="gifContainer" geometry="primitive: plane; height: 3.6; width: 4"
                    position="3 1 0.01" visible="true"
                    material="shader:gif; src:url(${data.gif})"></a-entity>
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

    initEvents() {
        const container = document.querySelector("#resultContainer")
        const restartBtn = container.querySelector(".restart")
        this.listeners = {
            restart: this.restart.bind(this)
        }
        restartBtn.addEventListener("click", this.listeners.restart)
    },

    restart() {
        const container =  document.querySelector("#resultContainer")
        const restartBtn = container.querySelector(".restart")
        restartBtn.removeEventListener("click", this.listeners.restart)
        container.parentElement.removeChild(container)
        document.dispatchEvent(new CustomEvent("StartGame"))
    }
}