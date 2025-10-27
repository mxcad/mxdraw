---
title: Composition and inheritance
author: mxcad
date: '2022-5-7'
---

## Multiple graphics are combined to form a new graphics object

Combining multiple graphics means calling the drawing functions of other graphics in the dynamic drawing function of a new custom object, and finally rendering the desired graphics.

For example, the drawing annotation we provide is achieved by calling the drawing function of the cloud line object and the text annotation object in the drawing function:
```js
class MxDbRectBoxLeadComment extends MxDbEntity {
  // ...
  public worldDraw(pWorldDraw: McGiWorldDraw): void {
    // Instantiate a cloud line object
    let cloudLine = new MxDbCloudLine()
    // ...
    // Draw a rectangular cloud wire frame
    cloudLine.addLine(pt1, pt2)
    cloudLine.addLine(pt2, pt3)
    cloudLine.addLine(pt3, pt4)
    cloudLine.addLine(pt4, pt1)
    // Call the cloud line object's drawing function and pass in the dynamic drawing object
    cloudLine.worldDraw(pWorldDraw)
    
    // Instantiate text annotation objects
    let leadComment = new MxDbLeadComment()
    // ...
    leadComment.point1 = leadPt
    leadComment.point2 = this.point3
    leadComment.text = this.text
    leadComment.textHeight = this.textHeight
    // Dynamic rendering
    leadComment.worldDraw(pWorldDraw)
  }
}
```
We can use these basic graphics provided in mxdraw to achieve more complex graphics and can better manage operational data.

## Inherit graphic objects to achieve more requirements

Under normal circumstances, the basic graphics object can not meet most of the business needs, we can inherit the graphics object class based on the extension reconstruction of a new custom graphics object.

The class that aligns the size object with MxDbAlignedDimension is refactored and extended below to add units to the measurement result
```js
class MyAlignedDimension extends MxDbAlignedDimension {
// The string returned by this method is the text content rendered by the current aligned size object. This method is directly overridden to make the measurement result with the "M" unit
  public getDimText(): string {
    var v2ndPtTo1stPt = new THREE.Vector3(this.point1.x - this.point2.x, this.point1.y - this.point2.y, 0);
    var fLen = v2ndPtTo1stPt.length()
    return fLen.toFixed(3) + "M"
  }

  // Since this is a new custom graphics class, each rendering creation is done through the new class 
  public create(): MyAlignedDimension {
    return new MyAlignedDimension();
  }

  // Same as the create method 
  public getTypeName(): string {
    return "MyAlignedDimension";
  }
}
```

In reconstructing a graphics object in front of the class, can search by [API](https://mxcad.github.io/mxdraw_api_docs/index.html) see the corresponding graphics class what are the attributes and methods as well as its detailed description the properties of the method.

In fact, the base graphics object class is equivalent to inheriting the custom graphics object class, because the graphics object inherits the custom graphics object.