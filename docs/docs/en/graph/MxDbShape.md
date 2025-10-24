---
title: Shape
author: mxcad
date: '2024-2-25'
---
`Mx.MxDbShape` is a graphic Shape base class based on THREE. shape, which can realize dynamic shape drawing. You can realize various 2d and 3d graphics effects by extending the MxDbShape class.

`Mx.MxDbShape` default support shape curve closure, fill, picture fill, dotted line, solid line, line width and other Settings, The class based on [Mx.MxDbEntity](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEntity.html).

Click [Mx.MxDbShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbShape.html) to check the properties and methods in detail.

## MxDbShape extension implementation process

Inheriting MxDbShape => Extending the _propertyDbKeys attribute array => Overrides the worldDraw method

### Extend the _propertyDbKeys property array:

```ts
class MxDbPolygonShape extends MxDbShape {
    points  = []
    constructor() {
        super()
        this._propertyDbKeys = [...this._propertyDbKeys, 'points']
    }
    ...
}
```
The _propertyDbKeys property records the names of the data to be retained, such as the 'points' property in the example, which is constantly redrawn during interactive (command) dynamic drawing, and the points array is reinitialized to an empty array. If you need to perform operations such as archive restoration, dynamic drawing, and drag to pinch points to change graphs, you need to save points data in real time to avoid initialization.

### Rewrite the worldDraw method

worldDraw is a rendering function, and the following is the default implementation:

```ts
worldDraw() {
    // THREE is mounted to the window object by default, and is mounted only after the loadCoreCode function is called
    const THREE:THREE =  Mx.MxFun.getMxFunTHREE()
    // Create shape path
    const paths = this.createPaths(new THREE.Curve<THREE.Vector3>())
    // The point of composition is obtained through the shape path
    const points = this.getShapePoints(paths)
    // Draw shape
    this._draw(pWorldDraw, points)
    // Draw the stroke of the shape
    this._drawStoreLine(pWorldDraw, points)
}

```

We can implement various situations based on THREE.Curve and its derivative classes and create a shape path through the createPaths method, get the shape path points through getShapePoints, and finally draw the shape and stroke from _draw and _drawStoreLine. Or some algorithm that calculates the points that make up the shape and draws them directly from _draw and _drawStoreLine.

The rewriting methods for displaying the clip getGripPoints and moving the clip moveGripPointsAt are shown in [Mx.MxDbEntity Custom Graphic Object](./MxDbEntity.md).

## Example

Let's take drawing an arrow shape as an example.

```ts
export class MxDbArrow extends MxDbShape {
    /** Whether the starting Angle is sharp */
    isSharpCorner = true
    /** Internal offset */
    innerOffset = 10
    /** External offset */
    outerOffset = 22
    /** Top offset */
    topOffset = 36
    startPoint = new THREE.Vector3()
    endPoint = new THREE.Vector3()

    constructor() {
        super()
        this._propertyDbKeys = [...this._propertyDbKeys, 'outerOffset', 'topOffset', 'innerOffset', 'isSharpCorner', 'startPoint', 'endPoint']
    }
    public worldDraw(pWorldDraw: McGiWorldDraw): void {
        const _points = this.getArrowVertex(this.startPoint, this.endPoint)
        if(_points) {
            this._draw(pWorldDraw, _points)
            this._drawStoreLine(pWorldDraw, _points)
        }
    }
    getArrowVertex(p1:THREE.Vector3, p2:THREE.Vector3, isSharpCorner = this.isSharpCorner) {
        let { innerOffset,  topOffset, outerOffset, } = this
        const coord: THREE.Vector3[] = [];
        // 顶点
        coord[3] = p2
        const p1_p2 = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        if (p1_p2 === 0) {
            return;
        }
        const sina = -(p2.x - p1.x) / p1_p2; //The sine of the Angle of rotation
        const cosa = (p2.y - p1.y) / p1_p2;  //Cosine value
        const lInnerx = p1.x + innerOffset;
        const lInnery = p1.y + p1_p2 - topOffset;
        //Original coordinates of the outer turning point (left)
        const lOuterx = p1.x + outerOffset;
        const lOutery = p1.y + p1_p2 - topOffset;
        const rInnerx = p1.x - innerOffset;
        const rInnery = p1.y + p1_p2 - topOffset;
        const rOuterx = p1.x - outerOffset;
        const rOutery = p1.y + p1_p2 - topOffset;
        if(isSharpCorner) {
            coord[0] = p1
            coord[6] = coord[0]
        }else {
            coord[0] = new THREE.Vector3(p1.x - (rInnerx - p1.x) * cosa, p1.y - (rInnerx - p1.x) * sina  )
            coord[6] =  new THREE.Vector3(p1.x + (rInnerx - p1.x) * cosa, p1.y + (rInnerx - p1.x) * sina  )
            coord[7] = coord[0]
        }
        //The new coordinates of the inner and outer rotation point after the rotation Angle a
        coord[1] = new THREE.Vector3(p1.x + (lInnerx - p1.x) * cosa - (lInnery - p1.y) * sina,  p1.y + (lInnerx - p1.x) * sina + (lInnery - p1.y) * cosa);
        coord[2] = new THREE.Vector3(p1.x + (lOuterx - p1.x) * cosa - (lOutery - p1.y) * sina, p1.y + (lOuterx - p1.x) * sina + (lOutery - p1.y) * cosa);
        coord[4] = new THREE.Vector3(p1.x + (rOuterx - p1.x) * cosa - (rOutery - p1.y) * sina, p1.y + (rOuterx - p1.x) * sina + (rOutery - p1.y) * cosa);
        coord[5] = new THREE.Vector3(p1.x + (rInnerx - p1.x) * cosa - (rInnery - p1.y) * sina, p1.y + (rInnerx - p1.x) * sina + (rInnery - p1.y) * cosa);
        return coord
    }
    getGripPoints(): THREE.Vector3[] {
        const center = new THREE.Vector3()
        new THREE.Line3(this.startPoint, this.endPoint).getCenter(center)
        return [
            this.startPoint,
            center,
            this.endPoint,
        ]
    }
    moveGripPointsAt(index: number, offset: Vector3): boolean {
        if(index === 0) this.startPoint.add(offset)
        if(index === 1) this.startPoint.add(offset), this.endPoint.add(offset)
        if(index === 2) this.endPoint.add(offset)
        return true
    }
}
```
Effect: Reference [Mx.MxDbArrow()](./MxDbArrow.md)