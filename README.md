<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
catalogue

- [Overview](#overview)
- [Main features](#main-features)
- [Compatibility](#compatibility)
- [Install mxdraw](#install-mxdraw)
- [Basic use](#basic-use)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Welcome to your visit, and reading this document will help you get started quickly with mxdraw. If you encounter any problems in the use of the process, you can leave a comment or github consultation oh.

## Overview

mxdraw is an HTML5 Canvas JavaScript framework, which is extended and developed on the basis of THREE.js, and provides users with a set of solutions that are more convenient, fast and efficient in front end drawing. The essence of mxdraw is a front end two-dimensional drawing platform. You can use mxdraw to draw graphics on the canvas, add events to the graphics, move, scale and rotate the graphics, and more.

## Main features

* Customizable extension of three.js function

* Efficient and convenient implementation of front-end drawing content

* Support online secondary development, to achieve custom comment objects

## Compatibility

It supports most modern mainstream browsers such as Chrome and Edge, but does not support Internet Explorer.

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

For more information about mxdraw, please refer to the development documentation link below：https://mxcad.github.io/mxdraw/en/