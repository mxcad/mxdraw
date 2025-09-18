---
title: Ellipse
author: mxcad
date: '2024-2-2'
---

## Ellipse MxDbEllipse

We can create an arc by instantiating an Mx.Mx3PointArc() object.
The method is to draw an oval through two points that form a rectangle.

Click [Mx MxDbEllipse API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEllipse.html) to check the properties and methods in detail.

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbEllipse Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Drawing elliptic function
    async function draw_ellipse() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const ellipse = new Mx.MxDbEllipse()
        const pt1 = await getPoint.go()
        if (!pt1) return
        ellipse.point1 = pt1
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            ellipse.point2 = currentPoint
            worldDraw.drawCustomEntity(ellipse)
        })
        // Get the location of the next mouse click
        const pt2 = await getPoint.go()
        if(!pt2) return
        ellipse.point2 = pt2
        const mxDraw = Mx.MxFun.getCurrentDraw()
        mxDraw.addMxEntity(ellipse)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_ellipse())
</script>

<body>
    <div>
        <button id="btn">Draw an ellipse</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw Ellipse button and execute the draw function to start drawing
* Click on the canvas to set the start point of the oval
* Click the canvas again to set the end point of the ellipse and successfully draw the ellipse

<demo :url="$withBase('/samples/graph/MxDbEllipse.html')" />   

## Elliptic arc MxDbEllipseArc

We can create an arc by instantiating an Mx.MxDbEllipseArc() object.
The elliptic arc is determined according to the center point, the beginning point and the end point of the ellipse.

Click [Mx MxDbEllipseArc API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEllipse.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbEllipseArc Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw the ellipse arc function
    async function draw_ellipseArc() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw()
        let arc = new Mx.MxDbEllipseArc()
        const center = await getPoint.go()
        if (!center) return
        // The first point determines the center of the circle
        arc.center = center
        // The second point determines the radius and the starting Angle
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.startPoint = currentPoint
            arc.yRadius = arc.center.distanceTo(currentPoint)
            worldDraw.drawCustomEntity(arc)
        })
        const startPt = await getPoint.go()
        if (!startPt) return
        arc.startPoint = startPt
        // The third point determines the end point and the end Angle
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.endPoint = currentPoint
            worldDraw.drawCustomEntity(arc)
        })
        const endPt = await getPoint.go()
        if (!endPt) return
        arc.endPoint = endPt
        arc.closed = false
        mxObj.addMxEntity(arc);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_ellipseArc())
</script>

<body>
    <div>
        <button id="btn">Ellipsoidal arc drawing</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw ellipse Arc button and execute the draw function to start drawing
* Click on the canvas to determine the center of the elliptic arc
* Click the canvas again to determine the radius and starting Angle of the elliptic arc
* Finally click the canvas to determine the end Angle of the elliptic arc and successfully draw the elliptic arc

<demo :url="$withBase('/samples/graph/MxDbEllipseArc.html')" />   