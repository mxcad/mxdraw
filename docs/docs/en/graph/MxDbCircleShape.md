---
title: Circle  
author: mxcad
date: '2024-2-23'
---

## Roundness MxDbCircleShape

We can create a circle by instantiating an Mx.MxDbCircleShape() object. 'Mx.MxDbCircleShape()' can not only draw circles, but also draw arc, ellipse, etc., can set the corresponding properties according to different needs, the following is to draw a circle as an example.

Click [Mx MxDbRingShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRingShape.html) to check the properties and methods in detail.
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
    // Circle drawing function
    async function draw_circle() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw();
        // Create a ring instance
        const obj = new Mx.MxDbCircleShape()
        // Center a circle
        const center = await getPoint.go() 
        if(!center) return
        obj.center = center
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.innerRadius = currentPoint
            worldDraw.drawCircle(obj.center, obj.center.distanceTo(currentPoint))
        })
        // Set circle radius
        const pt = await getPoint.go()
        if(!pt) return
        obj.xRadius = obj.yRadius = obj.center.distanceTo(pt)
        obj.isClosedToCenter = false
        mxObj.addMxEntity(obj)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_circle())
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
* Click the Draw Circle button and execute the draw function to start drawing
* First click on the canvas to determine the center of the circle
* Move the mouse again and click on the canvas to determine the radius of the circle and successfully draw the circle

<demo :url="$withBase('/samples/graph/MxDbCircleShape.html')" />
