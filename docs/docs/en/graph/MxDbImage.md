---
title: Image
author: mxcad
date: '2024-2-23'
---
## Image MxDbImage

We can create a picture object by instantiating an Mx.MxDbImage() object.

Click [Mx MxDbImage API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbImage.html) to check the properties and methods in detail.

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbImage Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw picture function
    function draw_image() {
    // Instantiate the fetch object
    const getPoint = new Mx.MrxDbgUiPrPoint()
    // Instantiate the image object
    const image = new Mx.MxDbImage()
    const pt1 = getPoint.go()
    if (! pt1) return
    // 60,40 are the width and height of the picture, in screen pixels.
    const w = Mx.MxFun.screenCoordLong2Doc(500)
    const h = Mx.MxFun.screenCoordLong2Doc(500)
    // Set the point position
    image.setPoint1(pt1)
    const pt2 = new THREE.Vector3(pt1.x + w, pt1.y + h, pt1.z)
    image.setPoint2(pt2)
    // Set the image path
    image.setImagePath("/image/dlyx_icon.png")
    // Gets the control object and adds the image object to the canvas
        Mx.MxFun.getCurrentDraw().addMxEntity(image)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_image())
</script>

<body>
    <div>
        <button id="btn">Draw a picture</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw picture button and execute the draw function to start drawing
* Click on the canvas to draw the picture

<demo :url="$withBase('/samples/graph/MxDbImage.html')" />    