import PageService from "./PageService.js"

function startup () {

    PageService.setup()

    setTimeout(() => {
        document.dispatchEvent(new CustomEvent("ShowStart"))
    }, 1000)
}


window.addEventListener("load", startup, false);