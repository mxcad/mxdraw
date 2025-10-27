---
title: Ellipse 椭圆
author: mxcad
date: '2024-2-2'
---

## 椭圆 MxDbEllipse

我们可以通过实例化一个 Mx.Mx3PointArc() 对象创建一个圆弧。
该方法是通过两个构成矩形的点绘制椭圆形。

点击 [Mx.MxDbEllipse API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEllipse.html) 查看详细属性和方法说明。

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbEllipse 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制椭圆函数
    async function draw_ellipse() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const ellipse = new Mx.MxDbEllipse()
        const pt1 = await getPoint.go()
        if (!pt1) return
        ellipse.point1 = pt1
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            ellipse.point2 = currentPoint
            worldDraw.drawCustomEntity(ellipse)
        })
        // 获取下一次鼠标点击的位置
        const pt2 = await getPoint.go()
        if(!pt2) return
        ellipse.point2 = pt2
        const mxDraw = Mx.MxFun.getCurrentDraw()
        mxDraw.addMxEntity(ellipse)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_ellipse())
</script>

<body>
    <div>
        <button id="btn">绘制椭圆</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制椭圆按钮，执行绘制函数开始绘制
* 点击画布设置椭圆的开始点
* 再次点击画布设置椭圆的结束点并成功绘制椭圆

<demo :url="$withBase('/samples/graph/MxDbEllipse.html')" />   

## 椭圆弧 MxDbEllipseArc

我们可以通过实例化一个 Mx.MxDbEllipseArc() 对象创建一个圆弧。
该方法是根据中心点、椭圆开始点和结束点确定椭圆弧。

点击 [Mx.MxDbEllipseArc API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEllipse.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbEllipseArc 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制椭圆圆弧函数
    async function draw_ellipseArc() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw()
        let arc = new Mx.MxDbEllipseArc()
        const center = await getPoint.go()
        if (!center) return
        // 第一个点确定圆心
        arc.center = center
        // 第二个点确定半径和开始角
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.startPoint = currentPoint
            arc.yRadius = arc.center.distanceTo(currentPoint)
            worldDraw.drawCustomEntity(arc)
        })
        const startPt = await getPoint.go()
        if (!startPt) return
        arc.startPoint = startPt
        // 第三个点确定结束点和结束角
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.endPoint = currentPoint
            worldDraw.drawCustomEntity(arc)
        })
        const endPt = await getPoint.go()
        if (!endPt) return
        arc.endPoint = endPt
        arc.closed = false
        mxObj.addMxEntity(arc);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_ellipseArc())
</script>

<body>
    <div>
        <button id="btn">绘制椭圆弧</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制椭圆圆弧按钮，执行绘制函数开始绘制
* 点击画布确定椭圆弧的圆心
* 再次点击画布确定椭圆弧的半径和开始角
* 最后点击画布确定椭圆弧的结束角并成功绘制椭圆弧

<demo :url="$withBase('/samples/graph/MxDbEllipseArc.html')" />   