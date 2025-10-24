---
title: SVG
author: mxcad
date: '2022-4-22'
---

## SVG graphics MxDbSVG

We can create an SVG graph by instantiating an Mx.MxDbSVG() object.

Click [Mx MxDbSVG API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbSVG.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbSVG Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw svg picture function
    function draw_svg(){
      // Instantiate the fetch point object
      const getPoint = new Mx.MrxDbgUiPrPoint();

      // The first mouse click
      const pt1 = await getPoint.go()
      if(!pt1) return
      // Current mouse position
      const pt1 = getPoint.value()
      let svg = new Mx.MxDbSVG()
      let svgSrc = "https://img.alicdn.com/imgextra/i2/O1CN01FF1t1g1Q3PDWpSm4b_!!6000000001920-55-tps-508-135.svg"
      svg.setSvgPath(svgSrc)
      svg.setSvgPostion(new THREE.Vector3(pt1.x, pt1.y, pt1.z))
      svg.svgReverse = true
      svg.svgMargin.x = 0.2

       // The default insertion point, in the lower left corner of the image, is set by setting a new insertion point.
      svg.setSvgAlignmentRatio(new THREE.Vector2(0.5, -1))

      svg.setRenderOrder(100)
      let iSize = 50
      svg.setSvgSize(new THREE.Vector2(iSize, 0))

      svg.fixedSize = true
      svg.color = 0x00ff11
      Mx.MxFun.getCurrentDraw().addMxEntity(svg)
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_image())
</script>

<body>
    <div>
        <button id="btn">Draw SVG pictures</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

Effect:
* Click the Draw SVG Diagram button and execute the draw function to start drawing
* Click the canvas to display the SVG vector image

<demo :url="$withBase('/samples/graph/MxDbSVG.html')" />