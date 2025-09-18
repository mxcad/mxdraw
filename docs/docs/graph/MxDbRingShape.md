---
title: Ring 环形 
author: mxcad
date: '2024-2-23'
---

## 环形 MxDbRingShape

我们可以通过实例化一个 Mx.MxDbRingShape() 对象创建一个环形。

点击 [Mx.MxDbRingShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRingShape.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbRingShape 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制环形函数
    async function draw_ring() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw();
        // 创建环形实例
        const obj = new Mx.MxDbRingShape()
        // 设置环形圆心
        const center = await getPoint.go()
        obj.center = center
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.innerRadius = currentPoint
            worldDraw.drawCircle(obj.center, obj.center.distanceTo(currentPoint))
        })
        // 设置环形内半径
        const innerPt = await getPoint.go()
        const innerPoint = innerPt
        obj.innerRadius = obj.center.distanceTo(innerPoint)
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.outerRadius = obj.center.distanceTo(currentPoint)
            worldDraw.drawCustomEntity(obj)
        })
        // 设置环形外半径
        const outerPt = await getPoint.go()
        const outerPoint = outerPt
        obj.outerRadius = obj.center.distanceTo(outerPoint)
        mxObj.addMxEntity(obj)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_ring())
</script>

<body>
    <div>
        <button id="btn">绘制环形</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制环形函数，执行绘制函数开始执行
* 首先点击画布确定环形的中心点
* 再移动鼠标点击画布确定环形的内半径
* 最后点击画布确定环形的外半径并成功绘制环形

<demo :url="$withBase('/samples/graph/MxDbRingShape.html')" />
