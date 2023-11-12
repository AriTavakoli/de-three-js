//@ts-nocheck
const createThreeScene = async (uniqueID) => {
    const el = await webflow.getSelectedElement();
    if (el) {
        const canvas = webflow.createDOM('canvas');
        let canvasStyle = webflow.createStyle('canvas-style');
        canvasStyle.setProperties({ "width": "100%", "height": "100%" }, { breakpoint: 'main', pseudo: 'hover' });
        // await canvasStyle.save();d
        canvas.setAttribute("data-purpose", "threejs-canvas");
        canvas.setAttribute("canvas-id", uniqueID);
        canvas.setAttribute("class", "myNewStyle");
        // canvas.setAttribute("class", "canvas-style")
        el.setChildren([canvas]);
        await el.save();
        const allElements = await webflow.getAllElements();
        const siteInfo = await webflow.getSiteInfo();
    }
};
const initStyles = async () => {
    let myStyle = webflow.createStyle('myNewStyle');
    let styleName = myStyle.getName();
    console.log("Style Name:", styleName);
    let styleProperties = myStyle.getProperties();
    console.log("Style Properties:", styleProperties);
    myStyle.setProperties({ color: 'red', 'font-size': '16px' }, { breakpoint: 'main', pseudo: 'hover' });
    myStyle.setProperty('color', 'blue', { breakpoint: 'main', pseudo: 'hover' });
    await myStyle.save();
};
export { createThreeScene, initStyles };
