---
title: measure
author: mxcad
date: '2022-4-28'
---
The mxdraw.js library provides some apis for measuring drawings, for example [Dimension marking MxDbAlignedDimension()](#dimension-marking-mxdbaligneddimension)、[Lead coordinate measurement MxDbCoord()](#lead-coordinate-measurement-mxdbcoord)、[Lead text annotation MxDbLeadComment()](#lead-text-annotation-mxdbleadcomment)、[Lead review drawing annotation MxDbRectBoxLeadComment()](#lead-review-drawing-annotation-mxdbrectboxleadcomment)、[Angle labeling MxDb2LineAngularDimension()](#angle-labeling-mxdb2lineangulardimension),Users can draw annotations on the canvas according to their own needs.

## Dimension marking MxDbAlignedDimension

You can use it to draw the ignedDimension() object by instantiating an Mx.MxDbAlignedDimension() object.

Click [Mx MxDbAlignedDimension API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbAlignedDimension.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbAlignedDimension Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draws a dimensioning function
    async function draw_alignedDimension() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        // Current mouse position
        const pt1 = await getPoint.go()
        // Instantiate the alignment annotation
        let alignedDimension = new Mx.MxDbAlignedDimension();
        // Set the first point position
        alignedDimension.setPoint1(pt1);
        // Set the dynamic drawing callback function
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // Set the second point location
            alignedDimension.setPoint2(currentPoint);
            // draw
            worldDrawComment.drawCustomEntity(alignedDimension);
        })
        // The second mouse click
        const pt2 = await getPoint.go()
        if(!pt2) return
        alignedDimension.setPoint2(pt2)
        Mx.MxFun.getCurrentDraw().addMxEntity(alignedDimension);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_alignedDimension())
</script>

<body>
    <div>
        <button id="btn">Dimension marking</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the dimensioning button and execute the draw function to start drawing
* Click on the canvas to select the starting point of the target measurement object
* Move the mouse and click on the canvas again to select the end point of measuring the target object and successfully draw the dimensioned graph

<demo :url="$withBase('/samples/graph/MxDbAlignedDimension.html')" />

## Lead coordinate measurement MxDbCoord

We can instantiate an Mx.MxDbCoord() object to draw the lead coordinates of the annotation graph.

Click [Mx MxDbCoord API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbCoord.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbAlignedDimension Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw a lead coordinate label
    async function draw_coord() {
        // Instantiate the fetch point object
        const getPoint = new Mx.MrxDbgUiPrPoint()
        let coord = new Mx.MxDbCoord()
        const pt1 = await getPoint.go()
        if(!pt1) return
        coord.point1 = pt1
        // Set the dynamic drawing callback function
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            coord.point2 = currentPoint
            // Draws a line segment object
            worldDrawComment.drawCustomEntity(coord)
        });
        // The second mouse click
        const pt2 = await getPoint.go()
        if(!pt2) return
        coord.point2 = pt2
        Mx.MxFun.getCurrentDraw().addMxEntity(coord)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_coord())
</script>

<body>
    <div>
        <button id="btn">Lead coordinate marking</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the lead coordinate label button and execute the draw function to start drawing
* Click on the canvas to select the coordinates you want to mark
* Move the mouse and click the canvas again to select the coordinate display position and successfully draw the lead coordinate label graph

<demo :url="$withBase('/samples/graph/MxDbCoord.html')" />

## Lead text annotation MxDbLeadComment

We can instantiate an Mx.MxDbLeadComment() object to draw a lead text annotation graph. Users can use [command mode](./combination.md) to set the annotated text content.

Click [Mx MxDbLeadComment API] (https://mxcad.github.io/mxdraw_api_docs/classes/MxDbLeadComment.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLeadComment Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw lead text annotations
    async function draw_leadComment() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        let leadComment = new Mx.MxDbLeadComment();
        // Set markers
        const pt1 = await getPoint.go()
        if(!pt1) return
        leadComment.point1 = pt1
        leadComment.text = "Text annotation"
        leadComment.textHeight = Mx.MxFun.screenCoordLong2Doc(20)

        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // The location of the tagged text
            leadComment.point2 = currentPoint
            worldDrawComment.drawCustomEntity(leadComment);
        });
        const pt2 = await getPoint.go()
        if(!pt2) return
        leadComment.point2 = pt2
        Mx.MxFun.getCurrentDraw().addMxEntity(leadComment);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_leadComment())
</script>

<body>
    <div>
        <button id="btn">Lead text annotation</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the lead text annotation button and execute the draw function to start drawing
* Click on the canvas to select the object you want to annotate
* Move the mouse and click on the canvas again to select the position of the text label and successfully draw the lead text label graph

<demo :url="$withBase('/samples/graph/MxDbLeadComment.html')" />

## Lead review drawing annotation MxDbRectBoxLeadComment

We can instantiate an Mx.MxDbLeadComment() object to draw a lead review annotation graph. Users can combine [command mode](./combination.md) to independently set the text content of the annotation.

Click on [Mx MxDbRectBoxLeadComment API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRectBoxLeadComment.html) View detailed property and method descriptions.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLeadComment Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw lead review mark
    async function draw_rectBoxLeadComment() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        let rectBoxLeadComment = new Mx.MxDbRectBoxLeadComment()
        const pt1 = await getPoint.go()
        if (!pt1) return
        rectBoxLeadComment.point1 = pt1
        // Set the radius of the arc of the cloud wire frame
        rectBoxLeadComment.radius = Mx.MxFun.screenCoordLong2Doc(10)
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            rectBoxLeadComment.point2 = currentPoint
            worldDrawComment.drawCustomEntity(rectBoxLeadComment)
        });

        // Second click
        const pt2 = await getPoint.go()
        if(!pt2) return
        rectBoxLeadComment.point2 = pt2
        // Text annotation
        rectBoxLeadComment.text = "Text annotation"
        rectBoxLeadComment.textHeight = Mx.MxFun.screenCoordLong2Doc(20)
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            rectBoxLeadComment.point3 = currentPoint
            worldDrawComment.drawCustomEntity(rectBoxLeadComment)
        });
        // Text location
        const pt3 = await getPoint.go()
        if(!pt3) return
        rectBoxLeadComment.point3 = pt3
        Mx.MxFun.getCurrentDraw().addMxEntity(rectBoxLeadComment)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_rectBoxLeadComment())
</script>

<body>
    <div>
        <button id="btn">Lead review drawing annotation</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the lead review annotation button and execute the draw function to start drawing
* Click on the canvas to draw the cloud wireframe for the review
* Move the mouse and click the canvas again to determine the position of the text mark, and successfully draw the lead review mark graph

<demo :url="$withBase('/samples/graph/MxDbRectBoxLeadComment.html')" />

## Angle labeling MxDb2LineAngularDimension

We can instantiate an Mx. MxDb2LineAngularDimension () object is used to draw up the angular dimension graph.

Click on [Mx MxDb2LineAngularDimension API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDb2LineAngularDimension.html) View detailed property and method descriptions.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDb2LineAngularDimension Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw Angle labeling
    async function draw_angleDimension() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        // Mouse click
        let ang = new Mx.MxDb2LineAngularDimension();
        // The starting point of the measurement Angle
        const pt1 = await getPoint.go()
        if(!pt1) return
        ang.point1 = pt1
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // Measure the specific location of the Angle
            ang.point2 = currentPoint
            // Draw a line segment dynamically
            worldDrawComment.drawLine(ang.point1, currentPoint)
        });
        const pt2 = await getPoint.go()
        if(!pt2) return
        ang.point2 = pt2
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // The termination point of the measurement Angle
            ang.point3 = currentPoint
            worldDrawComment.drawCustomEntity(ang);
        });
        const pt3 = await getPoint.go()
        if(!pt3) return
        ang.point3 = pt3
        Mx.MxFun.getCurrentDraw().addMxEntity(ang);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_angleDimension())
</script>

<body>
    <div>
        <button id="btn">Angle labeling</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Angle label button and execute the draw function to start drawing
* Click on the canvas to select the starting point of the measurement Angle
* Move the mouse and click on the canvas again to select the specific position of the measurement Angle
* Finally move the mouse to click on the canvas to determine the end point of the measurement Angle and successfully draw the Angle measurement graph

<demo :url="$withBase('/samples/graph/MxDb2LineAngularDimension.html')" />