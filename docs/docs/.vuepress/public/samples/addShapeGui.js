import { createGui, createGuiFolder, defaultMxDbEntityParams } from "./GUI/index.js";
export function addShapeGui(obj, params = []) {
    obj._cornerRadius = 0
    const defaultMxDbShapeParams = [...defaultMxDbEntityParams,
    {
        name: "closed",
        label: "closed闭合曲线",
        defaultValue: false
    },
    {
        name: "curveSegments",
        label: "curveSegments曲线细分程度",
        box: {
            min: 5,
            max: 50
        }
    },
    {
        name: "dDashArray",
        label: "dDashArray设置虚线总段数",
        box: {
            min: 0,
            max: 0.05,
            step: 0.001
        },
        defaultValue: 0
    },
    {
        name: "dDashRatio",
        label: "dDashRatio设置虚线比例",
        box: {
            min: 0,
            max: 0.5,
            step: 0.1
        },
        defaultValue: 0
    },
    {
        name: "dLineWidth",
        label: "setLineWidth设置线宽",
        box: {
            min: 2,
            max: 10
        },
        defaultValue: 2
    },
    {
        name: "_cornerRadius",
        label: "cornerRadius圆角",
        defaultValue: 0,
        box: {
            min: 0,
            max: 100
        },
        onChange(obj,v) {
            obj.setCornerRadius(v)
        }
    },
    ...params
    ]
    const gui = createGui(obj, defaultMxDbShapeParams)
    createGuiFolder(gui, "填充", obj, [
        {
            name: "isFill",
            label: "isFill填充",
            defaultValue: false
        },
        {
            name: "stroke",
            label: "stroke描边颜色",
            isColor: true,
            defaultValue: "#ff0000"
        },
        {
            name: "strokeLineWidth",
            label: "strokeLineWidth描边线段宽度",
            box: {
                min: 0,
                max: 10
            }
        },
        {
            name: "isStrokeDashLine",
            label: "isStrokeDashLine描边是否虚线显示",
            defaultValue: false
        },
        {
            name: "fillImageSrc",
            label: "fillImageSrc填充图片路径",
            box: ["./img/wmxs_icon.png", "./img/wjgs_icon.png", "false"],
            defaultValue: false,
            onChange(obj, v) {
                if(v === "false"){
                    obj["fillImageSrc"] = false
                }else {
                    obj["fillImageSrc"] = v
                }
            }
        }
    ])
    gui.width = 500

    return gui
}

export const defaultMxDbEllipseArcParams = [
    {
        name: "clockwise",
        label: "clockwise是否顺时针",
        defaultValue: false
    },
    {
        name: "isClosedToCenter",
        label: "isClosedToCenter是否闭合连接圆心",
        defaultValue: true
    }
]

/** 添加椭圆类参数调整GUI */ 
export const addEllipseShapeGui = (obj)=> {
    addShapeGui(obj, defaultMxDbEllipseArcParams)
}