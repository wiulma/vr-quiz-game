export default {
    text: {
        fontUrl: "../assets/font/SpaceMono-Bold.json"
    },
    panelColor: "#212121",
    panelRotation: "0 0 0",
    panelPosition: "0 2.5 -2",
    componentPadding: "0.1",
    panelMaterial: "color: #0c0c0c; fog: false; transparent: true; opacity: 0.7",
    panelTextStyle: "anchor: center; height: 5; align: center; color: #68f19d; opacity: 0.9; lineHeight: 50",
    panelTextScale: "2 2 2",
    panelTextWidth: "7.5",
    panelTextHeight: "4",
    buttons: {
        material: "shader: flat; color: #00005b; fog: false; vertexColors: vertex; blending: none",
        geometry: "buffer: false; primitive: plane; skipCache: true; height: 0.8; width: 3.5",
        scale: "1.2 1.2 1.2",
    },

    setup() {
        this.panelRotation = (AFRAME.utils.device.isMobile()) ? "-15 0 0" : "0 0 0";
    }

}