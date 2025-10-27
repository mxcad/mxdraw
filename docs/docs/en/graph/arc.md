---
title: Arc
author: mxcad
date: '2024-2-2'
---

## Arc

### Method one Mx3PointArc

We can create an arc by instantiating an Mx.Mx3PointArc() object.
The method uses three points to draw the arc dynamically. The starting point of point1 arc, point2 is the end point of point3 arc and any point of POINT3 arc.

Click [Mx Mx3PointArc API](https://mxcad.github.io/mxdraw_api_docs/classes/Mx3PointArc.html) to check the properties and methods in detail.

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mx3PointArc Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // 绘制圆弧函数
    async function draw_arc() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const arc = new Mx.Mx3PointArc()
        getPoint.setMessage("\n Determine the start point of the arc:");
        const pt1 = await getPoint.go()
        if (!pt1) return;
        arc.point1 = pt1
        // 设置动态绘制函数
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            worldDraw.drawLine(arc.point1, currentPoint)
        })
        getPoint.setMessage("\n Determine the end point of the arc:");
        // Get the position of the next mouse click synchronously
        const pt2 = await getPoint.go()
        arc.point2 = pt2
        arc.closed = false;
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.point3 = currentPoint;
            worldDraw.drawCustomEntity(arc)
        })
        getPoint.setMessage("\n Determine any point on the arc:");
        const pt3 = await getPoint.go()
        if(!pt3) return
        arc.point3 = pt3;
        const mxDraw = Mx.MxFun.getCurrentDraw()
        mxDraw.addMxEntity(arc)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_arc())
</script>

<body>
    <div>
        <button id="btn">Arc drawing</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw Arc button and execute the draw function to start drawing
* Click on the canvas to determine the first starting point of the arc
* Click the canvas again to determine the end point of the arc
* Finally click the canvas to determine any point on the arc and successfully draw the arc

<demo :url="$withBase('/samples/graph/Mx3PointArc.html')" />   

### Method 2 MxDbCircleArc

We can create an arc by instantiating an Mx.MxDbCircleArc() object.
In this method, the arc is dynamically drawn according to the position of the center, starting point and ending point.
Click [Mx MxDbCircleArc API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbCircleArc.html) to check the properties and methods in detail.
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbCircleArc Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw circular arc function
    async function draw_arc() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw()
        let arc = new Mx.MxDbCircleArc()
        arc.stroke = '#ff0000'
        getPoint.setMessage('\n Determine the midpoint of the arc:')
        // The first point determines the center of the circle
        const center = await getPoint.go()
        if(!center) return
        arc.center = center
        getPoint.setMessage('\n Determine the start point of the arc:')
        // The second point determines the radius and the starting Angle
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            const line = new Mx.MxDbLine()
            line.pt1 = arc.center
            line.pt2 = currentPoint
            worldDraw.drawCustomEntity(line)
        })
        const startPt = await getPoint.go()
        if(!startPt) return
        arc.startPoint = startPt
        getPoint.setMessage('\n Determine the end point of the arc:')
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.endPoint = currentPoint;
            worldDraw.drawCustomEntity(arc)
        })
        // The third point determines the end Angle
        const endPt = await getPoint.go()
        if(!endPt) return
        arc.endPoint = endPt
        arc.closed = false
        mxObj.addMxEntity(arc)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_arc())
</script>

<body>
    <div>
        <button id="btn">Arc drawing</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw Arc button and execute the draw function to start drawing
* Click on the canvas to determine the center of the arc
* Click the canvas again to determine the starting point of the arc
* Finally click on the canvas to determine the end point of the arc and successfully draw the arc

<demo :url="$withBase('/samples/graph/MxDbCircleArc.html')" />   

