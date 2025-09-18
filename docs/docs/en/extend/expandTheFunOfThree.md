# Extend three.js functionality

mxdraw is a plug-in written based on three.js. Users can display graphic objects implemented in three.js in mxdraw project based on canvas canvas. Among them, mxdraw.js provides a method 'MxFun.getCurrentDraw().addobject ()' for adding THREE.Object3D objects to the current scene.

Click to [addObject()](https://mxcad.github.io/mxdraw_api_docs/classes/MxDrawObject.html#addObject) for see more method details。

## Basic drawing example

Draw a triangle with three.js in mxdraw, the three vertices of which are set by parameters.

```ts
import { MxFun } from 'mxdraw';
import * as THREE from 'three';

function draw_Triangle(){
        // Define the vertex position of the triangle
    const vertices = new Float32Array([
      0, 10, 0, // Vertex 1 (top)
      -10, -10, 0, // Vertex 2 (lower left)
      10, -10, 0 // Vertex 3 (lower right
    ]);

    // Create a BufferGeometry object
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create material
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });//黄色

    // Create a grid
    const mesh = new THREE.Mesh(geometry, material);
    MxFun.getCurrentDraw().addObject(mesh);
}
```

Effect display:

<demo :url="$withBase('/samples/extend/extendThreeJs3.html')" />  

## Extended function example (three.js combined with mxdraw)

1. Draw a rectangle in mxdraw through three.js, and the position of the rectangle is set by the interactive fetch point of mxdraw. In addition, users can also set the position of the rectangle according to their own needs through parameters.

```ts
import { MxFun, MrxDbgUiPrPoint} from 'mxdraw';
import * as THREE from 'three';

function draw_react(){
    // Cross fetch point
    const getPoint = new MrxDbgUiPrPoint();
    getPoint.setMessage("\n Set rectangle position:");
    let ptVal: THREE.Vector3 | null = await getPoint.go();
    if (ptVal == null) {
      return;
    }
    // Create geometry (rectangle with length 10 by width 10)
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    // Create material
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })//green
    // Create a grid
    const cube = new THREE.Mesh(geometry, material);
    // Set rectangle position
    cube.position.set(ptVal.x, ptVal.y, ptVal.z);
    // You can also determine the position of the cube directly by setting parameters
    // cube.position.set(0,0,0)
    MxFun.getCurrentDraw().addObject(cube);
}
```

Effect display:Draw a rectangle
* Click the Draw Rectangle button and execute the draw function to start drawing
* Click on the canvas to locate the center of the rectangle
* Successfully drew the rectangle

<demo :url="$withBase('/samples/extend/extendThreeJsReact.html')" />  

2. In mxdraw, an arrow is drawn by three.js. The arrow is linked with the method in mxdraw to realize the function of dynamically drawing the arrow. Through MrxDbgUiPrPoint() in mxdraw and the dynamic drawing function provided in mxdraw, users can manually select the starting position and direction of the arrow, and can more clearly observe the interaction between user operations and graphics.

```ts
import { MxFun, MrxDbgUiPrPoint } from 'mxdraw';
import * as THREE from 'three';

async function draw_arrow() {
  // Set the starting point of the arrow
  const getPt1 = new MrxDbgUiPrPoint();
  getPt1.setMessage("\n Set the starting point of the arrow:");
  let pt1: THREE.Vector3 | null = await getPt1.go();
  if (pt1 == null) {
    return;
  }

  // Set the end point of the arrow
  const getPt2 = new MrxDbgUiPrPoint();
  getPt2.setMessage("\n Set the end point of the arrow:");
  getPt2.setUserDraw((pt, pw) => {
    if (pt1 !== null) {
      pw.drawLine(pt1, pt)
    }
  })
  let pt2: THREE.Vector3 | null = await getPt2.go();
  if (pt2 == null) {
    return;
  }
  // Create the start and end coordinates of the plane arrow
  const origin = pt1;
  const XWeeks = new THREE.Vector3(1, 0, 0);
  // Create the start and end of the arrow
  const arrow = new THREE.ArrowHelper(
    XWeeks, // Arrow direction
    origin.clone(), // Starting point
    pt1.distanceTo(pt2), // Arrow length
    0xff0000 // Arrow color
  );

  // Calculate the arrow rotation Angle
  const vec = pt2.clone().sub(pt1);
  let angle = vec.angleTo(XWeeks);
  if (pt2.y < pt1.y) {
    angle = -angle;
  };
  arrow.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle)
  MxFun.getCurrentDraw().addObject(arrow)
}
```

Effect display:Draw arrows
* Click the Draw arrow button to execute the draw function to start drawing
* Click on the canvas to determine the starting point of the arrow
* Dynamically draw the arrow direction and click the canvas again to determine the end point of the arrow
* Arrow successfully drawn

<demo :url="$withBase('/samples/extend/extendThreeJsArrow.html')" />  

3. In mxdraw, the object material color is modified by three.js to achieve the flicker effect `MxThreeJS.loadSVG()` method is provided in mxdraw.js to load svg. After users call this method to input the SVG path address and set the initial color of svg, they will get the callback function after SVG loading is completed. The parameters of the callback function are as follows: THREE.Object3D and Array<THREE.MeshBasicMaterial>. Users can modify the object Settings based on their own requirements.

```ts
import { MxFun, MrxDbgUiPrPoint, MxThreeJS } from 'mxdraw';
import * as THREE from 'three';

async function draw_twinkle() {

  // Gets the current mxobj object
  let mxobj = MxFun.getCurrentDraw();
  
  // Set the svg insertion point
  const getPoint = new MrxDbgUiPrPoint();
  getPoint.setMessage("\n点取插入位置:");
  const pt = await getPoint.go();
  if (!pt) return;
  // Set the svg scaling factor
  let dScale = MxFun.screenCoordLong2Doc(100);
  // Sets the svg initial color
  let color = new THREE.Color(0xff4e95); //Change the color of the loaded svg model, undefined default svg itself color

  // Loading SVG
  MxThreeJS.loadSVG(
    `models/svg/mark.svg`,
    color,
    (obj: any, meterials: Array<THREE.MeshBasicMaterial>): any => {
      if (obj) {
        obj.scale.multiplyScalar(dScale / 1000);
        obj.position.x = pt.x;
        obj.position.y = pt.y;
        obj.scale.y *= -1;
        obj.renderOrder = 12000;
        mxobj.addObject(obj, true);
        // Start a clock and randomly modify the color of the model material to achieve the flicker effect
        setInterval(()=>{
          // Set random colors
          const color = 0xffffff * Math.random();
          meterials.forEach(item=>{item.color.set(color)});
          mxobj.updateDisplay();
        }, 500); 
      }
    }
  );
}
```
Effect display: Flicker
* Click the blinking button to execute the draw function to start drawing
* Click the canvas to locate the SVG image
* Draw an SVG object and start flashing

<demo :url="$withBase('/samples/extend/extendThreeJsWink.html')" />  