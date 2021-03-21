import PageService from "./PageService.js"
import BroserCheckService from "./BrowserCheckService.js"


function startup () {

    PageService.setup()

    setTimeout(() => {
        document.dispatchEvent(new CustomEvent("StartGame"))
    }, 1000)
}


window.addEventListener("load", startup, false);