---
title: Dynamic rendering
author: mxcad
date: '2024-2-28'
---

## Base drawing

mxdraw.js provides two ways to achieve dynamic drawing, which can change the size and direction of the graphics without changing the graphics class to help users draw the target graphics more quickly. These two dynamic rendering methods are combined with [take point object](./pointingObject.md) to achieve the function of dynamic drawing graphics.

### Way one

Using API `McEdGetPointWorldDrawObject` build a dynamic map a callback object, and through take the object of `setUserDraw` () method calls the object.

Click on [Mx McEdGetPointWorldDrawObject API](https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html) View detailed property and method descriptions.
``` js
// Instantiate the fetch object
const getPoint = new Mx.MrxDbgUiPrPoint();
// Instantiate the line segment object line
let line = new Mx.MxDbLine()
const pt1 = await getPoint.go()
line.setPoint1(pt1)
// Instantiate dynamically drawn objects
const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();
// Set the dynamic drawing callback function
worldDrawComment.setDraw((currentPoint) => {
    line.setPoint2(currentPoint);
    worldDrawComment.drawCustomEntity(line)
});
// Draw objects dynamically
getPoint.setUserDraw(worldDrawComment)

```
### Way two

The 'setUserDraw()' method provided by the fetch object is directly used to set the dynamic drawing call object of the interaction process. Detailed description can refer to [Take point object dynamic rendering](./pointingObject.md#dynamic-rendering)
```js
const getPoint = new Mx.MrxDbgUiPrPoint()
// Instantiate the line segment object line
let line = new Mx.MxDbLine();
const pt1 = await getPoint.go()
if(! pt1) return
line.pt1 = pt1
// Instantiate dynamically drawn objects
getPoint.setUserDraw((currentPoint, worldDrawComment)=>{
    line.pt2 = currentPoint
    worldDrawComment.drawCustomEntity(line)
});
const pt2 = await getPoint.go()
if(!pt2) return
line.pt2 = pt2;

```
::: tip
Graphics drawn in dynamic rendering are temporary, meaning they don't end up on the canvas, Dynamic rendering graphics if you need to save on the canvas please call] [take object drawReserve method](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html#drawReserve)
:::

## Dynamic drawing of graphic objects

Our graphics objects are inherited from [Custom graphics objects](../graph/MxDbEntity.md), And any graphics object can be [through dynamic map object](https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html) to achieve the effect of the dynamic map. Graphic objects how to achieve dynamic drawing please go to [Custom graphics](../graph/MxDbEntity.md) View details.

```js
// Instantiate the fetch point object
const getPoint = new Mx.MrxDbgUiPrPoint();

// Instantiate dynamically drawn objects
const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();
const pt1 = await getPoint.go()
if(!pt1) return
    // Set the dynamic drawing callback function
    worldDrawComment.setDraw((currentPoint) => {
    // Draw a line object
    worldDrawComment.drawLine(pt1, currentPoint);
    // Other graphics can also be drawn during the drawing process. These graphics are not retained at the end of the drawing process, such as:
    // Draw the following graph in red
    worldDrawComment.setColor('#ff0000')
    // Draw a circle with radius 6
    worldDrawComment.drawCircle(currentPoint, 6)
    // Draw "text" with font size 36 at an Angle of 0
    WorldDrawComment. DrawText (" text ", 36, 0, currentPoint)
    // Draw a rectangle pt1 with currentPoint being two opposite corners of the rectangle
    worldDrawComment.drawRect(pt1, currentPoint)
});

// Draw objects dynamically
getPoint.setUserDraw(worldDrawComment)

```



