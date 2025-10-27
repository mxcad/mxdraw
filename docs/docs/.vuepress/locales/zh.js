const { link } = require("fs")


const zhConfig = {
    // 多语言下拉菜单的标题
    selectText: '选择语言',
    // 该语言在下拉菜单中的标签
    label: '简体中文',
    // Service Worker 的配置
    serviceWorker: {
        updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
        }
    },
    lastUpdated: '上次更新', // string | boolean
    nav: [
        {
            text: 'mxcad文档',
            items: [
                 {
                    text: "github",
                    link: 'https://github.com/mxcad/mxcad'
                }
                , {
                    text: "gitee",
                    link: 'https://gitee.com/mxcadx/mxcad'
                }, {
                    text: "官网",
                    link: "https://help.mxdraw.com/mxcad_docs/"
                }
            ]
        },
        { text: '首页', link: '/' },
        {
            text: '官网',
            items: [
                { text: 'CAD梦想画图', link: 'https://www.mxdraw3d.com/' },
                { text: '梦想CAD绘图插件', link: 'https://www.mxdraw.com/' }
            ]
        },
         {
            text: 'API 文档', 
            items: [
                { text: 'API文档[github]', link: 'https://mxcad.github.io/mxdraw/api/' },
                { text: '官方API文档', link: 'https://help.mxdraw.com/mxdraw_docs/api/' }
            ]
        }
    ],
    sidebar: [
        {
            title: '开始',
            children: [
                { title: "简介", path: "/start/abstract" },
                { title: "快速入门", path: "/start/quickStart" },
                { title: "基础", path: "/start/base"},
                { title: "数据保存", path: "/start/data"},
            ],
        },
        {
            title: '图形',
            children: [
                { title: "Line 线段", path: "/graph/MxDbLine" },
                { title: "Rect 矩形", path: "/graph/MxDbRect" },
                { title: "Area 多边形", path: "/graph/MxDbArea" },
                { title: "Arc 圆弧", path: "/graph/arc" },
                { title: "Ellipse 椭圆", path: "/graph/ellipse" },
                { title: "Circle 圆形", path: "/graph/MxDbCircleShape" },
                { title: "Arrow 箭头", path: "/graph/MxDbArrow" },
                { title: "Star 星形", path: "/graph/MxDbStarShape" },
                { title: "Ring 环形", path: "/graph/MxDbRingShape" },
                { title: "Text 文字", path: "/graph/MxDbText" },
                { title: "Image 图片", path: "/graph/MxDbImage" },
                { title: "SVG 矢量图", path: "/graph/MxDbSVG" },
                { title: "Measure 测量", path: "/graph/measurement" },
                { title: "Custom 自定义图形", path: "/graph/MxDbEntity" },
                { title: "Shape 形状图形", path: "/graph/MxDbShape" },
                // { title: "CRUD 图形对象的增删改查", path: "/graph/GraphicsOPbjectCRUD" },
            ],
        },
        {
            title: '交互绘图',
            children: [
                { title: '命令功能', path: "/interactiveDrawing/basedOnnUsing" },
                { title: "取点对象", path: "/interactiveDrawing/pointingObject" },
                { title: "动态绘制", path: "/interactiveDrawing/dynamicDrawing" },
                // { title: "选择变换图形", path: "/interactiveDrawing/transformation" },
            ],
        },
        {
            title: '扩展',
            children: [
                { title: '打开CAD图纸', path: "/extend/openDrawing" },
                { title: '扩展three.js功能', path: "/extend/expandTheFunOfThree" },
                // { title: 'MapBox地图与CAD图纸结合', path: "/extend/MapBoxCombinedWithGISSystem" },
            ],
        },
    ]
}


module.exports = zhConfig