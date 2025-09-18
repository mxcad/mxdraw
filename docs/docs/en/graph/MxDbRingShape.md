---
title: Ring 
author: mxcad
date: '2024-2-23'
---

## Toroidal MxDbRingShape

We can create a ring by instantiating an Mx.MxDbRingShape() object.

Click [Mx MxDbRingShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRingShape.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbRingShape Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw ring function
    async function draw_ring() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw();
        // Create a ring instance
        const obj = new Mx.MxDbRingShape()
        // Set the center of the ring
        const center = await getPoint.go()
        obj.center = center
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.innerRadius = currentPoint
            worldDraw.drawCircle(obj.center, obj.center.distanceTo(currentPoint))
        })
        // Set the inner radius of the ring
        const innerPt = await getPoint.go()
        const innerPoint = innerPt
        obj.innerRadius = obj.center.distanceTo(innerPoint)
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.outerRadius = obj.center.distanceTo(currentPoint)
            worldDraw.drawCustomEntity(obj)
        })
        // Set the outer radius of the ring
        const outerPt = await getPoint.go()
        const outerPoint = outerPt
        obj.outerRadius = obj.center.distanceTo(outerPoint)
        mxObj.addMxEntity(obj)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_ring())
</script>

<body>
    <div>
        <button id="btn">Draw a circle</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click Draw Ring function and execute Draw function to start execution
* First click on the canvas to determine the center point of the ring
* Move the mouse again and click on the canvas to determine the inner radius of the ring
* Finally click the canvas to determine the outer radius of the ring and successfully draw the ring

<demo :url="$withBase('/samples/graph/MxDbRingShape.html')" />
