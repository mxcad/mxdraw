---
title: Circle 圆形 
author: mxcad
date: '2024-2-23'
---

## 圆形 MxDbCircleShape

我们可以通过实例化一个 Mx.MxDbCircleShape() 对象创建一个圆形。`Mx.MxDbCircleShape()`不止可以绘制圆形，还能绘制圆弧，椭圆等，可根据不同需求设置相应属性，下面以绘制圆形为示例。

点击 [Mx.MxDbRingShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRingShape.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbCircleShape 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘圆函数
    async function draw_circle() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw();
        // 创建环形实例
        const obj = new Mx.MxDbCircleShape()
        // 设置圆心
        const center = await getPoint.go() 
        if(!center) return
        obj.center = center
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            obj.innerRadius = currentPoint
            worldDraw.drawCircle(obj.center, obj.center.distanceTo(currentPoint))
        })
        // 设置圆形半径
        const pt = await getPoint.go()
        if(!pt) return
        obj.xRadius = obj.yRadius = obj.center.distanceTo(pt)
        obj.isClosedToCenter = false
        mxObj.addMxEntity(obj)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_circle())
</script>

<body>
    <div>
        <button id="btn">绘制圆</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

效果：
* 点击绘制圆形按钮，执行绘制函数开始绘制
* 先点击画布确定圆心
* 再移动鼠标点击画布确定圆形的半径并成功绘制圆形

<demo :url="$withBase('/samples/graph/MxDbCircleShape.html')" />
