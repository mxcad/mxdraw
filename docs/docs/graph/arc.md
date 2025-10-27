---
title: Arc 圆弧
author: mxcad
date: '2024-2-2'
---

## 圆弧 

### 方法一 Mx3PointArc

我们可以通过实例化一个 Mx.Mx3PointArc() 对象创建一个圆弧。
该方法采用的是三点动态绘制圆弧，point1圆弧起始点、point2是圆弧结束点、 point3圆弧任意一点。

点击 [Mx.Mx3PointArc API](https://mxcad.github.io/mxdraw_api_docs/classes/Mx3PointArc.html) 查看详细属性和方法说明。

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mx3PointArc 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制圆弧函数
    async function draw_arc() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const arc = new Mx.Mx3PointArc()
        getPoint.setMessage("\n确定圆弧开始点:");
        const pt1 = await getPoint.go()
        if (!pt1) return;
        arc.point1 = pt1
        // 设置动态绘制函数
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            worldDraw.drawLine(arc.point1, currentPoint)
        })
        getPoint.setMessage("\n确定圆弧结束点:");
        // 同步获取下次鼠标点击的位置
        const pt2 = await getPoint.go()
        arc.point2 = pt2
        arc.closed = false;
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.point3 = currentPoint;
            worldDraw.drawCustomEntity(arc)
        })
        getPoint.setMessage("\n确定圆弧上任意一点:");
        const pt3 = await getPoint.go()
        if(!pt3) return
        arc.point3 = pt3;
        const mxDraw = Mx.MxFun.getCurrentDraw()
        mxDraw.addMxEntity(arc)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_arc())
</script>

<body>
    <div>
        <button id="btn">绘制圆弧</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制圆弧按钮，执行绘制函数开始绘制
* 点击画布确定圆弧的第一个起始点
* 再次点击画布确定圆弧的结束点
* 最后点击画布确定圆弧上的任意一点并成功绘制圆弧

<demo :url="$withBase('/samples/graph/Mx3PointArc.html')" />   

### 方法二 MxDbCircleArc

我们可以通过实例化一个 Mx.MxDbCircleArc() 对象创建一个圆弧。
该方法采用的是根据圆心、起始点、结束点位置动态绘制圆弧。
点击 [Mx.MxDbCircleArc API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbCircleArc.html) 查看详细属性和方法说明。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbCircleArc 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制圆弧函数
    async function draw_arc() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        const mxObj = Mx.MxFun.getCurrentDraw()
        let arc = new Mx.MxDbCircleArc()
        arc.stroke = '#ff0000'
        getPoint.setMessage('\n确定圆弧中点:')
        // 第一个点确定圆心
        const center = await getPoint.go()
        if(!center) return
        arc.center = center
        getPoint.setMessage('\n确定圆弧开始点:')
        // 第二个点确定半径和开始角
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            const line = new Mx.MxDbLine()
            line.pt1 = arc.center
            line.pt2 = currentPoint
            worldDraw.drawCustomEntity(line)
        })
        const startPt = await getPoint.go()
        if(!startPt) return
        arc.startPoint = startPt
        getPoint.setMessage('\n确定圆弧结束点:')
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            arc.endPoint = currentPoint;
            worldDraw.drawCustomEntity(arc)
        })
        // 第三个点确定结束角
        const endPt = await getPoint.go()
        if(!endPt) return
        arc.endPoint = endPt
        arc.closed = false
        mxObj.addMxEntity(arc)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_arc())
</script>

<body>
    <div>
        <button id="btn">绘制圆弧</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制圆弧按钮，执行绘制函数开始绘制
* 点击画布确定圆弧的圆心
* 再次点击画布确定圆弧的开始点
* 最后点击画布确定圆弧的结束点并成功绘制圆弧

<demo :url="$withBase('/samples/graph/MxDbCircleArc.html')" />   

