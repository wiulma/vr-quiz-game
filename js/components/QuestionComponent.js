import DataService from "../DataService.js";
import styles from "../styles.js"

export default {

    getTmpl(data) {
        return `<a-entity id="questionContainer" 
            component-padding="0.5"  
            width="12" 
            height="7" 
            position="0 2.5 -4" 
            rotation="-5 0 0" 
            panel-color="${styles.panelColor}" 
            material="${styles.panelMaterial}" 
            geometry="depth: 0.01; height: 7; width: 12">
            <a-text width="9" height="2" 
                shader= "msdf"
                font="${styles.text.fontUrl}"
                value="${data.text}" 
                text="anchor: center; width: 8; height: 2; align: center; color: #68f19d; opacity: 0.9" 
                position="0 2 0.1" scale="2 2 2">
            </a-text>
                <a-image
                    src="#btn-yes"
                    class="clickable yes"
                    geometry="width: 2; height: 1"
                    material="side: front"
                    position="-3.5 -1.8 0.1" 
                    ></a-image>

                <a-image
                    src="#btn-no"
                    class="clickable no"
                    geometry="width: 2; height: 1"
                    material="side: front"
                    position="3.7 -1.8 0.1" 
                    ></a-image>
        </a-entity>`
    },

    showQuestion () {
        const question = DataService.getCurrentQuestion()
        const rootContainer = document.querySelector("#sceneContainer")
        rootContainer.insertAdjacentHTML('beforeEnd', this.getTmpl(question));
        this.listeners = {
            'yes': this.reply.bind(this, "YES"),
            'no': this.reply.bind(this, "NO")
        };
        const questionContainer = document.querySelector("#questionContainer")
        questionContainer.querySelector(".yes").addEventListener("click",this.listeners.yes);
        questionContainer.querySelector(".no").addEventListener("click", this.listeners.no);
    },

    removeQuestion() {
        const questionContainer = document.querySelector("#questionContainer")
        questionContainer.querySelector(".yes").removeEventListener("click",this.listeners.yes);
        questionContainer.querySelector(".no").removeEventListener("click", this.listeners.no);
        questionContainer.parentElement.removeChild(questionContainer)
    },

    reply(answer) {
        DataService.setAnswer(answer)
        this.removeQuestion()
        setTimeout(() => {
            document.dispatchEvent( new CustomEvent("ShowNext"));
        }, 500)
    }

}