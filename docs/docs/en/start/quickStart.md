---
title: Quick Start
author: mxcad
date: '2024-2-21'
---

## Install mxdraw

Use the package manager (it is recommended to always install the latest version of the mxdraw library to avoid affecting subsequent use)
```sh
npm install mxdraw@latest
```

Use the < script > tag
```html
<script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
```

## Basic use
mxdraw.js relies on the canvas tag to open the canvas, but since canvas will automatically resize according to the width and height of the parent element, in order to ensure that the drawing is not distorted, it is necessary to fix the width and height of the canvas parent, and set the attribute overflow:hidden on the parent element. After creating a canvas in the page, you can perform different drawing functions according to your needs. The example code for creating a canvas is as follows:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxdraw Basic Usage example </title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(() => {
        // Create a control object
        Mx.MxFun.createMxObject({
                canvasId: "mxdraw", the id of the canvas element
                callback: (mxobj, dom) => {
                // After the creation of the drawing display control callback function callback parameters mxDraw and dom
                console.log(mxobj, dom);

                mxobj.on("openFileComplete", (iRet) => {
                    // Draw a straight line
                    let line = new Mx.MxDbLine();
                    line.pt1 = new THREE.Vector3(0, 0, 0);
                    line.pt2 = new THREE.Vector3(100, 100, 0);
                    mxobj.addMxEntity(line);
                    // Draw a circle
                    let circle = new Mx.MxDbCircleShape()
                    circle.center = new THREE.Vector3(50, 50, 0)
                    circle.xRadius = circle.yRadius = 20
                    circle.isClosedToCenter = false
                    mxobj.addMxEntity(circle)
                    // Draw text
                    let text = new Mx.MxDbText()
                    text.position = new THREE.Vector3(50, 50, 0)
                    text.height = Mx.MxFun.screenCoordLong2Doc(50)
                    text.text = 'Test text'
                    mxobj.addMxEntity(text)

                    mxobj.zoomW(line.pt1, line.pt2);
                });
            },
        });
    })
</script>

<body>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
  
