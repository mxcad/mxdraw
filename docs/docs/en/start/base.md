---
title: Foundation
author: mxcad
date: "2024-2-22"
---

## Visual area

The view area in mxdraw.js refers to the display area of the canvas, which can be independently panned and scaled by the mouse.
Here are some common operations on viewports in Mxdraw:

```js
// Gets the current control object
const mxobj = MxFun.getCurrentDraw();
// Enable true or disable false to move the mouse around the viewport
mxobj.enablePan(false);
// Enable true or disable false middle mouse button scroll zoom viewport
mxobj.enableZoom(false);

// Start coordinates of the current viewport
const pt1 = new THREE.Vector3(0,0,0); const pt1 = new three. vector3 (0,0,0);
// Get the end of screen coordinates by obtaining the width and height of the canvas
const pt2 = new THREE.Vector3(mxobj.getViewWidth(),mxobj.getViewHeight(), 0);
// Moves the current display range to the specified display range
// isWorld: Default to felse DWG drawing coordinates, set to true is THREEJS coordinates
// minPt: start coordinate maxPt: end coordinate
let minPt = mxobj.screenCoord2Doc(pt1.x,pt1.y);
let maxPt = mxobj.screenCoord2Doc(pt2.x,pt2.y);
let isWorld = false;
mxobj.zoomW( minPt, maxPt, isWorld);

// Gets or modifies the background color of the viewport
let _color = mxobj.getViewColor();
mxobj.setViewColor(0xFFFFFF);

// View area update display
mxobj.updateDisplay();

// Set viewport width and height
mxobj.SetSize(100100).
```

## Take a point object

The MrxDbgUiPrPoint class provided in mxdraw is used to build a fetch point object that gets the mouse's coordinate position on the canvas.

Click [Mx.MrxDbgUiPrPoint](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html) to check the properties and methods in detail.

```js
// Instantiate the fetch object
const getPoint = new Mx.MrxDbgUiPrPoint();

// Click event listening only listens for the first click
const pt1 = await getPoint.go();
if (!pt1) return;

// Promise mode listening mode
getPoint.go().then((pt) => {
  console.log(pt);
});
```

## Coordinate conversion

The following three coordinate forms are defined in mxdraw.js, and a series of apis are provided to convert these three coordinate forms:

- THREE.js coordinates: that is, coordinates in the right hand coordinate system, the default coordinate form returned by the point object is THREE.js coordinates.

- Screen coordinates: The windows window is used as the coordinate system, the Y-axis is facing down, the origin of the coordinate system is in the upper left corner, and the coordinates under the coordinate system are the screen coordinates.

- DWG document coordinates: coordinates in the drawing coordinate system.

The above THREE coordinates are converted to each other (pt1: Three.js coordinates, pt2: screen coordinates, pt3: document coordinates) :

```js
const getPoint = new Mx.MrxDbgUiPrPoint();
// THREE.JS coordinates
let pt1 = await getPoint.go();
// THREE.JS coordinates to screen coordinates
let pt2 = Mx.MxFun.screenCoordLong2World(pt1.x, pt1.y, pt1.z);
// THREE.JS coordinates to DWG document coordinates
let pt3 = Mx.MxFun.worldCoord2Doc(pt1.x, pt1.y, pt1.z);

// Convert document coordinates to THREE.JS coordinates
pt1 = Mx.MxFun.docCoord2World(pt3.x, pt3.y, pt3.z);
// Document coordinates to screen coordinates
pt2 = Mx.MxFun.docCoord2Screen(pt3.x, pt3.y, pt3.z);

// Screen coordinates to DWG document coordinates
pt3 = Mx.MxFun.screenCoord2Doc(pt2.x, pt2.y, pt2.z);
// Screen coordinates to THREE.JS coordinates
pt1 = Mx.MxFun.screenCoord2World(pt2.x, pt2.y, pt2.z);
```

Conversion of length units in different coordinate systems:

```js
// Screen coordinate length
let len_screen = 36;
// Screen coordinate length to THREE.JS coordinate length
let len_threeJs = Mx.MxFun.screenCoordLong2World(len);
// Convert screen coordinate length to document coordinate length
let len_docs = Mx.MxFun.screenCoordLong2Doc(len);

// THREE.JS coordinate length to screen coordinate length
len_threeJs = Mx.MxFun.worldCoordLong2Doc(len);

// Convert document coordinate length to screen coordinate length
Mx.MxFun.docCoordLong2Screen(len);
// Document coordinate length to ThreeJS coordinate length
Mx.MxFun.docCoordLong2World(len);
```

Special: The McGePoint3d class in the mxcad npm package represents coordinates that are different from the above three types - it represents CAD coordinates.
mxcad uses mxdraw for rendering at its core.
To convert it, we need to use the mxdraw methods in mxcad. mxdraw is the return value of the `MxFun.getCurrentDraw` method.
`MxFun.getCurrentDraw() === mxcad.mxdraw`

```js
import { MxCpp } from "mxcad";
const mxcad = MxCpp.getCurrentMxCAD();
const mxdraw = mxcad.mxdraw;
// Convert screen coordinates to CAD coordinates
const pt = mxdraw.viewCoord2Cad(0, 0, 0);

// Convert CAD coordinates to document coordinates
mxdraw.cadCoord2Doc2(pt);
mxdraw.cadCoord2Doc(0, 0, 0);

// Convert CAD coordinates to small document coordinates
mxdraw.toSmallcoord(pt);
mxdraw.toSmallcoord2(0, 0, 0);

// Convert document coordinates to CAD coordinates
mxdraw.docCoord2Cad2(pt);
mxdraw.docCoord2Cad(0, 0, 0);

// Convert CAD coordinates to screen coordinates
mxdraw.cadCoord2View(0, 0, 0);

const length = 100;
// Convert CAD length to viewport length
mxdraw.cadCoordLong2View(length);

// Convert viewport length to CAD length
mxdraw.viewCoordLong2Cad(length);

// Convert document length to CAD length
mxdraw.docCoordLong2Cad(length);

// Convert CAD length to document length
mxdraw.cadCoordLong2Doc(length);
```

## Dynamic rendering

Mxdraw. Js in [take object Mx.MrxDbgUiPrPoint()](#take-a-point-object) provides a method of [setUserDraw] (https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgU Iprpoint.html #setUserDraw), the combination of the two can achieve the basic dynamic drawing graphics function. The graphics drawn during dynamic drawing are temporary and are not saved directly to the canvas at the end of the drawing process. If you need to save dynamic map graphic on the canvas can call take object [drawReserve method](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html#drawReserve). The following is an example of dynamically drawing line segment functions:

#### Method one

```js
async function draw_line1() {
  // Instantiate the fetch object
  const getPoint = new Mx.MrxDbgUiPrPoint();
  const pt1 = await getPoint.go();
  if (!pt1) return;
  const line = new Mx.MxDbLine();
  line.pt1 = pt1;
  // Instantiate dynamically drawn objects
  getPoint.setUserDraw((currentPoint, worldDrawComment) => {
    line.pt2 = currentPoint;
    worldDrawComment.drawCustomEntity(line);
  });
  line.pt2 = await getPoint.go();
  Mx.MxFun.getCurrentDraw().addMxEntity(line);
}
```

#### Method 2

```js
async function draw_line2() {
  // Instantiate the fetch object
  const getPoint = new Mx.MrxDbgUiPrPoint();
  // Instantiate dynamically drawn objects
  const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();

  const line = new Mx.MxDbLine();
  const pt1 = await getPoint.go();
  if (!pt1) return;
  line.pt1 = pt1;
  // Set the dynamic drawing callback function
  worldDrawComment.setDraw((currentPoint) => {
    worldDrawComment.drawLine(pt1, currentPoint);
  });
  // Draw objects dynamically
  getPoint.setUserDraw(worldDrawComment);
  const pt2 = await getPoint.go();
  if (!pt2) return;
  line.pt2 = pt2;
  MxFun.getCurrentDraw().addMxEntity(line);
}
```
