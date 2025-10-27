---
title: Rect
author: mxcad
date: '2024-2-22'
---

We can create a rectangle by instantiating an Mx.MxDbRect() object.

Click [Mx MxDbRect API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRect.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbRect Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw rectangle function
    async function draw_rect() {
        // Instantiate the fetch point object
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // Instantiate the rectangle object rect
        let rect = new Mx.MxDbRect()
        const pt1 = await getPoint.go()
        // Set the first point position
        rect.pt1 = pt1
        // Set the color
        rect.setColor(0xFF22)
        // Set the dynamic drawing callback function
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // Set the position of the second point of the line segment
            rect.pt2 = currentPoint
            // Draw the rectangle object rect
            worldDrawComment.drawCustomEntity(rect)
        })
        // The second mouse click
        rect.pt2 = await getPoint.go()
        Mx.MxFun.getCurrentDraw().addMxEntity(rect)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_rect())
</script>

<body>
    <div>
        <button id="btn">Draw rectangle</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw Rectangle button and execute the draw function to start drawing
* Click on the canvas to determine a point in the rectangle
* Move the mouse to dynamically draw the rectangle and click on the canvas again to finish drawing
* Click on the drawn rectangle to control the rectangle

<demo :url="$withBase('/samples/graph/MxDbRect.html')" />