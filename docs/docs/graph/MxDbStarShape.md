---
title: Star 星形 
author: mxcad
date: '2024-2-23'
---

## 星形 MxDbStarShape

我们可以通过实例化一个 Mx.MxDbStarShape() 对象创建一个星形。

点击 [Mx.MxDbStarShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbStarShape.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbStarShape 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制星形函数
    async function draw_star() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw();
        // 创建星形实例
        const obj = new Mx.MxDbStarShape()
        // 设置星形顶点数和中心
        obj.numPoints = 5
        const center = await getPoint.go()
        if(!center) return
        obj.center = center
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.innerRadius = currentPoint
            worldDraw.drawCircle(obj.center, obj.center.distanceTo(currentPoint))
        })
        // 设置星形内半径
        const innerPt = await getPoint.go()
        if(!innerPt) return
        const innerPoint = innerPt
        obj.innerRadius = obj.center.distanceTo(innerPoint)
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.outerRadius = obj.center.distanceTo(currentPoint)
            worldDraw.drawCustomEntity(obj)
        })
        // 设置星形外半径
        const outerPt = await getPoint.go()
        if(!outerPt) return
        const outerPoint = outerPt
        obj.outerRadius = obj.center.distanceTo(outerPoint)
        mxObj.addMxEntity(obj)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_star())
</script>

<body>
    <div>
        <button id="btn">绘制星形</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制星形按钮，执行绘制函数开始绘制
* 首先点击画布确定星形的中心点
* 再移动鼠标点击画布确定星形的内半径
* 最后点击画布确定星形的外半径并成功绘制星形

<demo :url="$withBase('/samples/graph/MxDbStarShape.html')" />
