---
title: Custom
author: mxcad
date: '2022-4-22'
---

## How to implement a custom graph

We can implement a custom graphics class by inheriting Mx.MxDbEntity. The following is an example of implementing a custom graphics object that can draw any line segment.

Click on [Mx MxDbEntity API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEntity.html) to check the detailed implementation rules.
``` js
import Mx from "mxdraw"
import THREE from "three"

// Inherit custom graphics objects to achieve the function of drawing arbitrary line segments
class MxAnyLine extends  Mx.MxDbEntity {
    // List of vertices
    points = []

    // Line center point
    centerPt = new THREE.Vector3()

    // Dynamic rendering
    worldDraw(pWorldDraw) {
        // Create a line object for any line segment three.js
        const line = createAnyLine(this.points)
        // Calculate the bounding box of the line object
        line.geometry.computeBoundingBox()
        // Get the center point
        line.geometry.boundingBox.getCenter(this.centerPt)
        // Draw the line object dynamically
        pWorldDraw.drawEntity(line)
    }
    // Show the vertex of the operation Click on this vertex to move the operation
    getGripPoints() {
        return [this.centerPt]
    }

    // Displays the vertex move event, index indicates which point was moved and offset is the offset of the move
    moveGripPointsAt(index, offset) {
        this.points.forEach((pt)=> {
            pt.add(offset);
        })
        
        return true;
    }

    // Custom objects are recreated when drawn
    create() {
        return new MxAnyLine()
    }

    // Since drawing is constantly creating new objects, here we copy the properties of the previous object to the new object
    dwgIn(obj) {
        // Here are the public attributes
        this.onDwgIn(obj);

        // Here is the custom object's own property
        let ary = obj["points"];
        this.points = [];
        this.centerPt  = obj["centerPt"];
        ary.forEach((val) => {
            this.points.push(val.clone());
        });
        return true;
    }
    // The output is similarly a copy of the properties of the new object and the old object to ensure that those values are present at the time of drawing
    dwgOut(obj) {
        // Here are the public attributes
        this.onDwgOut(obj);
        obj["points"] = [];
        obj["centerPt"] = this.centerPt
        this.points.forEach((val) => {
            obj["points"].push(val.clone());
        });
        return obj
    }
}


// Please refer to the three.js documentation for the code for creating three.js line segment objects for arbitrary lines
function createAnyLine(points) {
    const curve = new THREE.CatmullRomCurve3(points, false,  "chordal"); 
    points = curve.getPoints( 50 )
    const geometry = new THREE.BufferGeometry()
    const divisions = Math.round( 12 * points.length );
    let point = new THREE.Vector3();
    const positions =[]
    const colors = []
    const color = new THREE.Color("#ff0000");
    for ( let i = 0, l = divisions; i < l; i ++ ) { 
        const t = i / l;
        point = curve.getPoint( t );
        positions.push( point.x, point.y, point.z );
        colors.push( color.r, color.g, color.b );
    }
    geometry.setAttribute( 'position',new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color',new THREE.Float32BufferAttribute( colors, 3 ) );
    const material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 10 } )
    const splineObject = new THREE.Line( geometry, material )
    splineObject.computeLineDistances();
    return splineObject
}

```
Instructions for dynamic drawing of custom graphics objects:

1, the dynamic drawing 'worldDraw' method is essentially creating three.js object objects and adding them to the scene rendering

2, each time the dynamic draw 'worldDraw' is triggered, the original instance object will be deleted (it will also delete the rendered three.js object object), and the instance will be recreated through the 'create' method

3, some data is needed to save in the custom object, 'dwgIn' and 'dwgOut' method is to ensure that the data used in the execution of 'worldDraw' method will not be lost after creation

4, 'getGripPoints' method is to provide an action point when clicking this rendered graph, click the action point to move the callback function' moveGripPointsAt ', obviously these operations will also trigger 'worldDraw' method

::: tip
+ The realization of custom graphics objects requires the knowledge of three.js, Recommended in combination with the example code in [three.js document](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Line) to find not three. Js knowledge to learn
: : :

Effect: Reference [Draw anyline mxdbanyline](./MxDbLine.md#arbitrary-line-segment-mxdbanyline)


JSON format custom graphics objects to save and restore

```js
import Mx from "mxdraw"
// Gets the current control object
let mxobj = Mx.MxFun.getCurrentDraw();

// Converts a custom graphic object in the canvas to a JSON string
const sSaveData = mxobj.saveMxEntityToJson();

// Delete all custom graphics objects from the canvas
mxobj.eraseAllMxEntity();


// Restore all deleted custom graphics objects using JSON strings
mxobj.loadMxEntityFromJson(sSaveData)

// Finally update the display view
mxobj.updateDisplay();
```