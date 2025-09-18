---
title: Arrow 
author: mxcad
date: '2024-2-23'
---

## Arrow MxDbArrow

We can create an arrow by instantiating an Mx.MxDbArrow() object.

Click [Mx MxDbArrow API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbArrow.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbCircleShape Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    //Draw arrow function
    async function draw_arrow() {
        const lines = new Mx.MxDbArrow()
        const mxDraw = Mx.MxFun.getCurrentDraw();
        const getPoint = new Mx.MrxDbgUiPrPoint();
        lines.setLineWidth(10)
        const startPt = await getPoint.go()
        if (!startPt) return
        lines.innerOffset = getScreenPixel(10)
        lines.outerOffset = getScreenPixel(22)
        lines.topOffset = getScreenPixel(36)
        lines.startPoint = startPt
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            lines.endPoint = currentPoint;
            worldDraw.drawCustomEntity(lines)
        })
        const endPt = await getPoint.go()
        lines.endPoint = endPt
        mxDraw.addMxEntity(lines)
    }
    /** Accepts a screen pixel and returns an actual screen pixel calculated according to the three.js coordinate system
    * @param pixel Screen pixel
    * @param isFontSize Pass true when calculating font size
    * */
    function getScreenPixel(pixel, isFontSize) {
        let _pixel = Mx.MxFun.screenCoordLong2World(isFontSize ? pixel : pixel - pixel / 3)
        _pixel = Mx.MxFun.worldCoordLong2Doc(_pixel)
        return _pixel
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_arrow())
</script>

<body>
    <div>
        <button id="btn">Draw arrow</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

Effect:
* Click the Draw arrow button to execute the draw function to start drawing
* Click on the canvas to determine the starting point of the arrow
* Move the mouse and click on the canvas to determine the end point of the arrow and successfully draw the arrow

<demo :url="$withBase('/samples/graph/MxDbArrow.html')" />
