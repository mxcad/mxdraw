export const defaultMxDbEntityParams = [
    {
        name: "color",
        isColor: true,
        label: "color基础颜色"
    },
    {
        name: "opacity",
        box: {
            min: 0,
            max: 1,
            step: 0.01,
        },
        label: "opacity透明度"
    },
    {
        name: "renderOrder",
        label: "renderOrder渲染顺序"
    },
    {
        name: "visible",
        label: "visible隐藏"
    }
]