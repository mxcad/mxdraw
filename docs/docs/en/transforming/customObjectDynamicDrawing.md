---
title: Dynamic rendering of graphic objects
author: mxcad
date: '2022-4-24'
---

Our graphics objects are inherited from [Custom graphics objects](../graph/MxDbEntity.md), And any graphics object can be through dynamic map [object] (https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html) to achieve the effect of the dynamic map.

Because the dynamic callback must be implemented in the graph object or custom graph object, whether the graph is drawn or the graph is operated on will trigger this dynamic callback.

```js
import Mx from "mxdraw"
 // Instantiate the fetch point object
const getPoint = new Mx.MrxDbgUiPrPoint();

 // Instantiate the line segment object line
let line = new Mx.MxDbLine();

// Instantiate dynamically drawn objects
const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();

// Set the dynamic drawing callback function
worldDrawComment.setDraw((currentPoint) => {
    line.setPoint2(currentPoint);
    // Draws a line segment object
    worldDrawComment.drawCustomEntity(line);

    // Other graphics can also be drawn during the drawing process. These graphics are not retained at the end of the drawing process, such as:
    // Draw the following graph in red
    worldDrawComment.setColor('#ff0000')
    // Draw a circle with radius 6
    worldDrawComment.drawCircle(currentPoint, 6)
    // Draw "text" with font size 36 at an Angle of 0
    worldDrawComment.drawText("text" ,36 , 0, currentPoint)

});

// Draw objects dynamically
getPoint.setUserDraw(worldDrawComment)

```

Attention:

* For details on how to achieve dynamic drawing of graphic objects, please go to [Custom Graphic Objects](../graph/MxDbEntity.md) to see the implementation

