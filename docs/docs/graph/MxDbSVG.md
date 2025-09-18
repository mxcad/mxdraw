---
title: SVG 矢量图
author: mxcad
date: '2022-4-22'
---

## SVG图形 MxDbSVG

我们可以通过实例化一个 Mx.MxDbSVG() 对象创建一个SVG图形。

点击 [Mx.MxDbSVG API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbSVG.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbSVG 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制svg图片函数
    function draw_svg(){
      // 实例化取点对象
      const getPoint = new Mx.MrxDbgUiPrPoint();

      // 鼠标第一次点击
      const pt1 = await getPoint.go()
      if(!pt1) return
      // 当前鼠标位置
      const pt1 = getPoint.value()
      let svg = new Mx.MxDbSVG()
      let svgSrc = "https://img.alicdn.com/imgextra/i2/O1CN01FF1t1g1Q3PDWpSm4b_!!6000000001920-55-tps-508-135.svg"
      svg.setSvgPath(svgSrc)
      svg.setSvgPostion(new THREE.Vector3(pt1.x, pt1.y, pt1.z))
      svg.svgReverse = true
      svg.svgMargin.x = 0.2

       // 默认插入基点，在图片的左下角，通过来设置新的插入基点。
      svg.setSvgAlignmentRatio(new THREE.Vector2(0.5, -1))

      svg.setRenderOrder(100)
      let iSize = 50
      svg.setSvgSize(new THREE.Vector2(iSize, 0))

      svg.fixedSize = true
      svg.color = 0x00ff11
      Mx.MxFun.getCurrentDraw().addMxEntity(svg)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_image())
</script>

<body>
    <div>
        <button id="btn">绘制SVG图片</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

效果：
* 点击绘制SVG图按钮，执行绘制函数开始绘制
* 点击画布展示SVG矢量图

<demo :url="$withBase('/samples/graph/MxDbSVG.html')" />