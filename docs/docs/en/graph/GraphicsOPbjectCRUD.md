---
title: Graphics Object CRUD
author: mxcad
date: '2022-4-29'
---

::: tip Note
We categorize graphic objects into two types: object-based (e.g. `Mesh`) based on [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D), and graphic-based objects based on [Mx.MxDbEntity](./MxDbEntity).

Here we mainly explain the CURD (create, update, read, delete) methods of graphic-based objects based on [Mx.MxDbEntity](./MxDbEntity).

And the objects based on [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D), such as `Mesh`, also have simple CRUD methods encapsulated. If you feel that the functionality does not fully meet your needs, you can refer to the three.js documentation to achieve more requirements.

We recommend customizing graphic objects based on [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D) to [Mx.MxDbEntity](./MxDbEntity) for better control.
:::


## Graphic Object CRUD

```js
import Mx from "mxdraw"
// Configure mouse-click graphic automatic selection
Mx.MxFun.setIniset({
  EnableIntelliSelect: true,
  IntelliSelectType: 1,
  multipleSelect: false,
});

// Get the current control object
const draw = Mx.MxFun.getCurrentDraw()
const getPoint = new Mx.MrxDbgUiPrPoint()

setTimeout(()=> {
    // Instantiate a line object `line`
    let line = new Mx.MxDbLine();
    //Set the position of the first point
    line.setPoint1(getPoint.value());
    // Set the position of the second point
    line.setPoint2(getPoint.value().clone().addScalar(10000));

    // Add the object to the scene for rendering
    draw.addMxEntity(line)

    // If the graphic selection function is enabled through `setIniset`, click on the graphic will automatically add the ID of the graphic object to the selected list, making the current line in the selected state.
    // By adding `line`'s id to the selected list here, the current line is in the selected state.
    draw.addMxCurrentSelect(line.objectId())
    // You can clear the selected list using `draw.clearMxCurrentSelect()`

    // Get all user-drawn objects
    draw.getAllMxEntity()
}, 1000)
 

// Record the IDs of the selected graphic objects.
let ids = []

// Click continuously
getPoint.goWhile(()=> {
    // Get the current mouse position coordinates and convert them to document coordinates
    const { x, y, z } =  getPoint.value()
    const pt1 = Mx.MxFun.worldCoord2Doc(x, y, z)
    
    // Find the object based on document coordinates
    const objs = draw.findMxEntityAtPoint(pt1)
    console.log(objs[0])

    // Get the ID list of the currently selected graphic objects.
    ids = draw.getMxCurrentSelect()
    if(ids[0]) {
        // Get the first selected graphic object based on its ID.
        const graph = draw.getMxEntity(ids[0])
        
        // Clone the object
        console.log(graph.clone()) 
        
        // Delete the object
        setTimeout(()=> {
            graph.erase()
        }, 1000)
        
    }
})

// You can also use event listening to get the ID list of the currently selected graphic objects.
draw.addEvent("MxEntitySelectChange", (aryId)=> {
    ids = aryId
})


```

Result:
<demo :url="$withBase('/samples/graph/GraphicsOPbjectCRUD.html')" />

+ View the complete source code of this example: [github](https://github.com/mxcad/mxdraw_docs/tree/gh-pages/samples/graph/GraphicsOPbjectCRUD.html) | [gitee](https://gitee.com/mxcadx/mxdraw_docs/tree/gh-pages/samples/graph/GraphicsOPbjectCRUD.html)


### About controlling the graphic object hierarchy

We use the rendering order to control the hierarchy of graphic objects. Use `setRenderOrder` to control the rendering order.

```js
const getPoint = new Mx.MrxDbgUiPrPoint()

const line = new Mx.MxDbLine();
line.setPoint1(getPoint.value())
line.setPoint2(getPoint.value().clone().addScalar(10000))
const line1 = line.clone()

line.setColor('ff0000')
line1.setColor('ffffff')
line.setRenderOrder(1)
line1.setRenderOrder(2)
const draw = Mx.MxFun.getCurrentDraw()
draw.addMxEntity(line)
draw.addMxEntity(line1)
```




## CRUD of object-based (THREE.Object3D) graphical objects

::: tip Note
  `getIntersectObjects` cannot find our custom graphic objects, such as `Mx.MxDbSVG`.
:::

To get an object-based graphic object (such as `Mesh`), use the `getIntersectObjects` method to get the object at the current mouse position.

```js
import Mx from "mxdraw"
import THREE from "mxdraw"
// Get the current control object
const draw = Mx.getCurrentDraw()
// Get point acquisition object
const getPoint = Mx.MrxDbgUiPrPoint()

const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );
// Add object; the second parameter indicates whether it can be selected by `getIntersectObjects`.
draw.addObject(mesh, true)

// Click continuously
getPoint.goWhile(()=> {
    // Get the current mouse position coordinates and convert them to screen coordinates.
    const { x, y, z } =  getPoint.value()
    const pt1 = Mx.MxFun.screenCoordLong2World(x, y, z)
    
    // Find the object based on screen coordinates
    const objs = draw.getIntersectObjects(pt1)
    console.log(objs[0])
    if(objs[0]) {
        // Find the object and modify its color
        mesh.material.color  = "#ff3300"
        setTimeout(()=> {
            // Delete the object. The second parameter indicates whether to delete objects in the selected set.
             draw.removeObject(mesh, true)
        }, 1000)

    }
})
```
