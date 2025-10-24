const { link } = require("fs")

const enConfig = {
    selectText: 'Languages',
    label: 'English',
    ariaLabel: 'Languages',
    serviceWorker: {
        updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
        }
    },
    lastUpdated: 'last update', // string | boolean
    nav: [
        {
            text: 'mxcad',
            items: [
                 {
                    text: "github",
                    link: 'https://github.com/mxcad/mxcad'
                }
                , {
                    text: "gitee",
                    link: 'https://gitee.com/mxcadx/mxcad'
                }, {
                    text: "Official website",
                    link: "https://help.mxdraw.com/mxcad_docs/en/"
                }
            ]
        },
        { text: 'Home page', link: '/' },
        {
            text: 'Official website',
            items: [
                { text: 'CAD dream drawing', link: 'https://www.mxdraw3d.com/' },
                { text: 'Dream CAD drawing plug-in', link: 'https://www.mxdraw.com/' }
            ]
        },
        {
            text: 'API docs', 
            items: [
                { text: 'API docs[github]', link: 'https://mxcad.github.io/mxdraw/api/' },
                { text: 'official website API docs', link: 'https://help.mxdraw.com/mxdraw_docs/api/' }
            ]
        }
    ],
    sidebar: [
        {
            title: 'Initiate',
            children: [
                { title: "Intro", path: "../../en/start/abstract" },
                { title: "Quick start", path: "../../en/start/quickStart" },
                { title: "Basics", path: "../../en/start/base"},
                { title: "Data preservation", path: "../../en/start/data"},
            ],
        },
        {
            title: 'graph',
            children: [
                { title: "Line", path: "../../en/graph/MxDbLine" },
                { title: "Rect", path: "../../en/graph/MxDbRect" },
                { title: "Area", path: "../../en/graph/MxDbArea" },
                { title: "Arc", path: "../../en/graph/arc" },
                { title: "Ellipse", path: "../../en/graph/ellipse" },
                { title: "Circle", path: "../../en/graph/MxDbCircleShape" },
                { title: "Arrow", path: "../../en/graph/MxDbArrow" },
                { title: "Star", path: "../../en/graph/MxDbStarShape" },
                { title: "Ring", path: "../../en/graph/MxDbRingShape" },
                { title: "Text", path: "../../en/graph/MxDbText" },
                { title: "Image", path: "../../en/graph/MxDbImage" },
                { title: "SVG", path: "../../en/graph/MxDbSVG" },
                { title: "Measure", path: "../../en/graph/measurement" },
                { title: "Custom", path: "../../en/graph/MxDbEntity" },
                { title: "Shape", path: "../../en/graph/MxDbShape" },
            ],
        },
        {
            title: 'Interactive drawing',
            children: [
                { title: 'Command function', path: "../../en/interactiveDrawing/basedOnnUsing" },
                { title: "Fetch point object", path: "../../en/interactiveDrawing/pointingObject" },
                { title: "Dynamic rendering", path: "../../en/interactiveDrawing/dynamicDrawing" },
            ],
        },
        {
            title: 'Extend',
            children: [
                { title: 'Open CAD drawing', path: "../../en/extend/openDrawing" },
                { title: 'Open CAD drawing', path: "../../en/extend/expandTheFunOfThree.md" },
                // { title: 'MapBox maps are combined with CAD drawings', path: "../../en/extend/MapBoxCombinedWithGISSystem" },
            ],
        },
    ]
}
module.exports = enConfig