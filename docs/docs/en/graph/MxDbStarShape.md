---
title: Star 
author: mxcad
date: '2024-2-23'
---

## Star MxDbStarShape

We can create a star by instantiating an Mx.MxDbStarShape() object.

Click [Mx MxDbStarShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbStarShape.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbStarShape Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw a star function
    async function draw_star() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw();
        // Create a star instance
        const obj = new Mx.MxDbStarShape()
        // Set the number and center of the star vertices
        obj.numPoints = 5
        const center = await getPoint.go()
        if(!center) return
        obj.center = center
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.innerRadius = currentPoint
            worldDraw.drawCircle(obj.center, obj.center.distanceTo(currentPoint))
        })
        // Set the inner radius of the star
        const innerPt = await getPoint.go()
        if(!innerPt) return
        const innerPoint = innerPt
        obj.innerRadius = obj.center.distanceTo(innerPoint)
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.outerRadius = obj.center.distanceTo(currentPoint)
            worldDraw.drawCustomEntity(obj)
        })
        // Set the outer radius of the star
        const outerPt = await getPoint.go()
        if(!outerPt) return
        const outerPoint = outerPt
        obj.outerRadius = obj.center.distanceTo(outerPoint)
        mxObj.addMxEntity(obj)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_star())
</script>

<body>
    <div>
        <button id="btn">Star drawing</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw Star button and execute the draw function to start drawing
* First click on the canvas to determine the center point of the star
* Move the mouse again and click on the canvas to determine the inner radius of the star
* Finally click on the canvas to determine the outer radius of the star and successfully draw the star

<demo :url="$withBase('/samples/graph/MxDbStarShape.html')" />
