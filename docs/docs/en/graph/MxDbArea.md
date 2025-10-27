---
title: Area
author: mxcad
date: '2024-2-22'
---

## Arbitrary irregular polygon MxDbArea

We can create arbitrary irregular polygons by instantiating an Mx.MxDbArea() object.

Click [Mx MxDbArea API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbArea.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbArea Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Drawing polygon function
    async function draw_area() {
        // Instantiate the fetch point object
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // Instantiate the polygon object area
        const area = new Mx.MxDbArea()
        while (true) {
            const pt = await getPoint.go()
            if (!pt) break;
            area.addPoint(pt)
            getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // Clone polygon objects
            const tmp = area.clone()
            // Add vertices
            tmp.addPoint(currentPoint)
            // Dynamic drawing The clone object can be dynamically drawn
                worldDrawComment.drawCustomEntity(tmp)
            })
        }
        // Gets the control object and adds the polygon area to the canvas
        Mx.MxFun.getCurrentDraw().addMxEntity(area)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_area())
</script>

<body>
    <div>
        <button id="btn">Draw polygon</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

Effect:
* Click the Draw Polygon button and execute the draw function to start drawing
* Click continuously to set the vertices of any polygon
* Press ESC or right mouse button to finish drawing

<demo :url="$withBase('/samples/graph/MxDbArea.html')" />    

## Regular polygon MxDbRegularPolygon

We can create regular polygons by instantiating an Mx.MxDbRegularPolygon() object. Among them, the number of sides of the regular polygon can be controlled by the attribute 'sidesNumber', which can be set directly by the user or combined with [command mode](../commandMode/basedOnnUsing.md) on the drawing page manually input set independently.

Click [Mx MxDbRegularPolygon API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRegularPolygon.html) to check the properties and methods in detail.

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbRegularPolygon Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draws a regular polygon function
    async function draw_regularArea() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        let regularPolygon = new Mx.MxDbRegularPolygon();
        const center = await getPoint.go();
        if(!center) return;
        // Set the center point of the polygon edge
        regularPolygon.centerPoint = center
        // Sets the number of polygonal edges
        regularPolygon.sidesNumber = 6
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // Sets the point at which two sides of the polygon connect
            regularPolygon.otherPoint = currentPoint
            worldDrawComment.drawCustomEntity(regularPolygon);
        });
        regularPolygon.otherPoint = await getPoint.go()
        Mx.MxFun.getCurrentDraw().addMxEntity(regularPolygon);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_regularArea())
</script>

<body>
    <div>
        <button id="btn">Drawing regular polygon</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw Regular polygon button and execute the draw function to start drawing
* Click the canvas and move the mouse to draw a regular polygon
* Click again to end drawing
* Click on the drawn regular polygon to control the regular polygon

<demo :url="$withBase('/samples/graph/MxDbRegularPolygon.html')" /> 