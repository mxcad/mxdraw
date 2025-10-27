---
title: Line 
author: mxcad
date: '2024-2-22'
---

## Base line segment MxDbLine

We can create a line segment by instantiating an Mx.MxDbLine() object.

Click [Mx MxDbLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbLine.html) to check the properties and methods in detail.

You can set the start and end points for a line segment by using the line segment properties pt1,pt2, or by using the `setPoint1()`,`setPoint2()` methods.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLine GIve an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
Mx.loadCoreCode().then(async () => {
    // Create a control object
    Mx.MxFun.createMxObject({
        canvasId: "mxdraw", // id of the canvas element
    });
})
// Line drawing function
async function draw_line() {
    // Instantiate the line segment object line
    let line = new Mx.MxDbLine()
    const getPoint = new Mx.MrxDbgUiPrPoint()
    const pt1 = await getPoint.go()
    if (!pt1) return
    // Sets the starting point of the line segment
    line.setPoint1(pt1);
    // Set color
    line.setColor(0xFF22);
    // Dynamic drawing function
    getPoint.setUserDraw((currentPoint, worldDrawComment) => {
        // Set the position of the second point of the line segment
        line.setPoint2(currentPoint);
        // Draw a line object
        worldDrawComment.drawCustomEntity(line);
    })
    // Set the position of the second mouse click to the end of the line segment
    const pt2 = await getPoint.go()
    if(! pt2) return
    line.setPoint2(pt2)
    // Gets the control object and adds the line object Line to the canvas
    Mx.MxFun.getCurrentDraw().addMxEntity(line);
}
// Bind button click event
document.getElementById('btn').addEventListener('click',() => draw_line())
</script>
<body>
    <div>
        <button id="btn">Draw line segment</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>
</html>
```

Effect:
* Click the Draw Line button to execute the draw function to start drawing
* Click on the canvas to determine the starting point of the line segment
* Click the canvas again to determine the end of the line segment and finish drawing
* Click on the drawn line segment to control the line segment

<demo :url="$withBase('/samples/graph/MxDbLine.html')" />

## Ambiguous line segments MxDbPolyline

We can create a polyline segment by instantiating an Mx.MxDbPolyline() object. The polyline `MxDbPolyline` is an extension of the line segment `MxDbLine`, which can continuously draw multiple interconnected line segments.

Click [Mx MxDbPolyline API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbPolyline.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbPolyline Give an Example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw the polygraph function
    async function draw_polyLine() {
        // instantiation
        let poly_line = new Mx.MxDbPolyline()
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // Continuous access point
        while (true) {
            // Polygonal lines add vertices
            let pt = await getPoint.go()
            if (!pt) break;
            poly_line.addVertexAt(pt)
            getPoint.setUserDraw((currentPoint, worldDrawComment) => {
                // Clone polysemy lines
                let pl = poly_line.clone()
                pl.addVertexAt(currentPoint)
                worldDrawComment.drawCustomEntity(pl)
            });
        }
        // Adds a polysemy line to the canvas
        Mx.MxFun.getCurrentDraw().addMxEntity(poly_line)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_polyLine())
</script>

<body>
    <div>
        <button id="btn">Draw a line of ambiguity</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

Effect:
* Click the Draw Polygraph button to execute the draw function to start drawing
* Click continuously to draw continuous line segments
* Press ESC or right-click to finish drawing
* Click on the drawn line segment to control the line segment

<demo :url="$withBase('/samples/graph/MxDbPolyline.html')" />

## Arbitrary line segment MxDbAnyLine

We can create an arbitrary line segment by instantiating an Mx.MxDbPolyline() object that draws arbitrary lines on the canvas in real time based on mouse position.

Click [Mx MxDbAnyLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbAnyLine.html) to check the properties and methods in detail.


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbAnyLine Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draws any line function
    async function draw_anyLine() {
        // Instantiate the fetch point object
        const getPoint = new Mx.MrxDbgUiPrPoint();
        const line = new Mx.MxDbAnyLine();
        const pt1 = await getPoint.go();
        if (!pt1) return;
        line.points.push(pt1);
        // Set the dynamic drawing callback function
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // Adds the current vertex position push to the vertex array
            line.points.push(currentPoint.clone());
            // Draw a line object
            worldDrawComment.drawCustomEntity(line);
        });
        const pt2 = await getPoint.go();
        if(!pt2) return;
        line.points.push(pt2);
        Mx.MxFun.getCurrentDraw().addMxEntity(line);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_anyLine())
</script>

<body>
    <div>
        <button id="btn">Draw any line</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

Effect:
* Click the Draw any Line button to execute the draw function to start drawing
* Click the canvas to move the mouse and draw the mouse movement path
* Click the canvas again to finish painting
* Click on the drawn line segment to control the line segment

<demo :url="$withBase('/samples/graph/MxDbAnyLine.html')" />


## Cloud line MxDbCloudLine

We can create a cloud line by instantiating an Mx.MxDbPolyline() object.

Click [Mx MxDbCloudLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbCloudLine.html) to check the properties and methods in detail.


```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbCloudLine Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw the cloud line function
    async function draw_cloudLine() {
        let line = new Mx.MxDbCloudLine();
        // Instantiate the fetch object
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // Mouse click
        const pt1 = await getPoint.go()
        if (! pt1) return
        line.addPoint(pt1)
        // Set the radius of the cloud line arc
        line.setRadius(Mx.MxFun.screenCoordLong2Doc(10))
        // Set the dynamic drawing callback function
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // Adds the current vertex position push to the vertex array
            line.addPoint(currentPoint);
            // Draw a line object
            worldDrawComment.drawCustomEntity(line);
        });
        // The second mouse click
        const pt2 = await getPoint.go()
        if(!pt2) return
        line.addPoint(pt2);
        Mx.MxFun.getCurrentDraw().addMxEntity(line);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_cloudLine())
</script>

<body>
    <div>
        <button id="btn">Cloud line</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

Effect:
* Click the Draw Cloud Line button and execute the draw function to start drawing
* Click the canvas to move the mouse and draw the cloud line
* Click the canvas again to finish painting
* Click on the drawn line segment to control the line segment

<demo :url="$withBase('/samples/graph/MxDbCloudLine.html')" />


