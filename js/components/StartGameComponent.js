import styles from "../styles.js"

export default {


    getTmpl() {
        return `<a-entity id="startContainer" 
            component-padding="0.5"  
            width="12" 
            height="7" 
            position="0 2.5 -4" 
            rotation="${AFRAME.utils.device.isMobile() ? -30 : 0} 0 0" 
            panel-color="${styles.panelColor}" 
            material="${styles.panelMaterial}" 
            geometry="depth: 0.01; height: 7; width: 12">
            <a-text width="10" height="7" 
                shader= "msdf"
                font="${styles.text.fontUrl}"
                value="Inizia il gioco!!" 
                text="anchor: center; width: 10; height: 7; align: center; color: #00d0ff; opacity: 0.9; wrapCount: 30" 
                position="0 2 0.1" scale="1 1 1">
            </a-text>

            <a-entity gltf-model="#avatar-0" scale="1 1 1" position="-4 -.9 0.4" rotation="0 40 0"></a-entity>
            <a-entity gltf-model="#avatar-1" scale=".5 .5 .5" position="4 -.9 0.4"  rotation="0 -40 0"></a-entity>

            <a-image
                src="#btn-start"
                class="clickable start"
                geometry="width: 4; height: 1"
                material="side: front"
                position="0 -1.5 0.1" 
                ></a-image>
        </a-entity>`
    },

    show() {
        const rootContainer = document.querySelector("#sceneContainer")
        rootContainer.insertAdjacentHTML('beforeEnd', this.getTmpl());
        const container = document.querySelector("#startContainer")
        const startBtn = container.querySelector(".start")
        this.listeners = {
            start: this.start.bind(this)
        }
        startBtn.addEventListener("click", this.listeners.start)
    },


    start() {
        const container =  document.querySelector("#startContainer")
        const startBtn = container.querySelector(".start")
        startBtn.removeEventListener("click", this.listeners.start)
        container.parentElement.removeChild(container)
        document.dispatchEvent(new CustomEvent("StartGame"))
    }
}