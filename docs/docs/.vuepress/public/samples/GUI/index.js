
import { MxFun } from "../mxdraw.esm.js";
import GUI from "../lil-gui.module.js"
export { defaultMxDbEntityParams } from "./defaultMxDbEntityParams.js";
let gui
export const removeGui = ()=> gui && gui.domElement && gui.domElement.remove()
export const createGui = (obj, params)=> {
    removeGui()
    gui = new GUI()
    
    parseParams(gui, obj, params)
    return gui
};

/** 创建分栏 */ 
export const createGuiFolder =(gui, name, obj, params)=> {
    const folder = gui.addFolder(name)
    parseParams(folder, obj, params)
    return folder
}

/** 解析参数 */ 
const parseParams = (gui, obj, params)=> {
    if(obj && params) {
        params.forEach((param)=> {
            const { name, box, label, onChange, isColor, defaultValue } = param;
            const add = isColor? gui.addColor.bind(gui) : gui.add.bind(gui);
            if(!(obj)[name]) (obj)[name] = defaultValue
            let boxPrams = []
            if(Array.isArray(box)) {
                boxPrams = [box]
            }else {
                const { min, max, step } = box || {}
                boxPrams = [ min, max, step]
            };
            add(obj, name, ...boxPrams).name(label || name).onFinishChange(v=> {
                onChange && onChange(obj, v);
                (obj).setNeedUpdateDisplay(true)
                MxFun.updateDisplay()
            })
        })
    }
    return gui
}

