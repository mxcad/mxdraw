---
title: Line 线段
author: mxcad
date: '2024-2-22'
---

## 基础线段 MxDbLine

我们可以通过实例化一个 Mx.MxDbLine() 对象创建一条线段。

点击 [Mx.MxDbLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbLine.html) 查看详细属性和方法说明。

你可以通过线段属性pt1,pt2为线段设置起始点和结束点，也可以利用`setPoint1()`,`setPoint2()`方法为线段设置起始点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLine 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
Mx.loadCoreCode().then(async () => {
    // 创建控件对象
    Mx.MxFun.createMxObject({
        canvasId: "mxdraw", // canvas元素的id
    });
})
// 绘线函数
async function draw_line() {
    // 实例化线段对象line
    let line = new Mx.MxDbLine()
    const getPoint = new Mx.MrxDbgUiPrPoint()
    const pt1 = await getPoint.go()
    if (!pt1) return
    // 设置线段的起始点
    line.setPoint1(pt1);
    // 设置颜色
    line.setColor(0xFF22);
    // 动态绘制函数
    getPoint.setUserDraw((currentPoint, worldDrawComment) => {
        // 设置线段第二个点位置
        line.setPoint2(currentPoint);
        // 绘制线段对象
        worldDrawComment.drawCustomEntity(line);
    })
    // 将第二次鼠标点击的位置设置为线段的结束点
    const pt2 = await getPoint.go()
    if(!pt2) return
    line.setPoint2(pt2)
    // 获取控件对象并将线段对象line添加到画布中
    Mx.MxFun.getCurrentDraw().addMxEntity(line);
}
// 绑定按钮click事件
document.getElementById('btn').addEventListener('click',() => draw_line())
</script>
<body>
    <div>
        <button id="btn">绘制线段</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>
</html>
```

效果：
* 点击绘制线段按钮，执行绘制函数开始绘制
* 点击画布确定线段的起点
* 再次点击画布确定线段的终点，结束绘制
* 点击绘制好的线段就可以控制线段

<demo :url="$withBase('/samples/graph/MxDbLine.html')" />

## 多义线段 MxDbPolyline

我们可以通过实例化一个 Mx.MxDbPolyline() 对象创建一条多义线段。多义线段`MxDbPolyline`是线段`MxDbLine`的扩展，它可以不间断绘制多条相互连接的线段。

点击 [Mx.MxDbPolyline API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbPolyline.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbPolyline 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制多义线函数
    async function draw_polyLine() {
        // 实例化
        let poly_line = new Mx.MxDbPolyline()
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // 连续取点
        while (true) {
            // 多义线添加顶点
            let pt = await getPoint.go()
            if (!pt) break;
            poly_line.addVertexAt(pt)
            getPoint.setUserDraw((currentPoint, worldDrawComment) => {
                // 克隆多义线
                let pl = poly_line.clone()
                pl.addVertexAt(currentPoint)
                worldDrawComment.drawCustomEntity(pl)
            });
        }
        // 将多义线添加到画布
        Mx.MxFun.getCurrentDraw().addMxEntity(poly_line)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_polyLine())
</script>

<body>
    <div>
        <button id="btn">绘制多义线</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

效果：
* 点击绘制多义线按钮，执行绘制函数开始绘制
* 连续点击绘制连续的线段
* 按下ESC键或者点击鼠标右键结束绘制
* 点击绘制好的线段就可以控制线段

<demo :url="$withBase('/samples/graph/MxDbPolyline.html')" />

## 任意线段 MxDbAnyLine

我们可以通过实例化一个 Mx.MxDbPolyline() 对象创建一条任意线段，它能根据鼠标位置在画布上实时绘制任意线条。

点击 [Mx.MxDbAnyLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbAnyLine.html) 查看详细属性和方法说明。


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbAnyLine 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制任意线函数
    async function draw_anyLine() {
        // 实例化取点对象
        const getPoint = new Mx.MrxDbgUiPrPoint();
        const line = new Mx.MxDbAnyLine();
        const pt1 = await getPoint.go();
        if (!pt1) return;
        line.points.push(pt1);
        // 设置动态绘制回调函数
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 将当前的顶点位置push添加到顶点数组中
            line.points.push(currentPoint.clone());
            // 绘制线段对象
            worldDrawComment.drawCustomEntity(line);
        });
        const pt2 = await getPoint.go();
        if(!pt2) return;
        line.points.push(pt2);
        Mx.MxFun.getCurrentDraw().addMxEntity(line);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_anyLine())
</script>

<body>
    <div>
        <button id="btn">绘制任意线</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

效果：
* 点击绘制任意线段按钮，执行绘制函数开始绘制
* 点击画布移动鼠标，绘制鼠标运动路径
* 再次点击画布，结束绘制
* 点击绘制好的线段就可以控制线段

<demo :url="$withBase('/samples/graph/MxDbAnyLine.html')" />


## 云线 MxDbCloudLine

我们可以通过实例化一个 Mx.MxDbPolyline() 对象创建一条云线。

点击 [Mx.MxDbCloudLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbCloudLine.html) 查看详细属性和方法说明。


```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbCloudLine 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制云线函数
    async function draw_cloudLine() {
        let line = new Mx.MxDbCloudLine();
        // 实例化取点对象
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // 鼠标点击
        const pt1 = await getPoint.go()
        if (!pt1) return
        line.addPoint(pt1)
        // 设置云线圆弧的半径
        line.setRadius(Mx.MxFun.screenCoordLong2Doc(10))
        // 设置动态绘制回调函数
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 将当前的顶点位置push添加到顶点数组中
            line.addPoint(currentPoint);
            // 绘制线段对象
            worldDrawComment.drawCustomEntity(line);
        });
        // 鼠标第二次点击
        const pt2 = await getPoint.go()
        if(!pt2) return
        line.addPoint(pt2);
        Mx.MxFun.getCurrentDraw().addMxEntity(line);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_cloudLine())
</script>

<body>
    <div>
        <button id="btn">绘制云线</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

效果：
* 点击绘制云线按钮，执行绘制函数开始绘制
* 点击画布移动鼠标，绘制云线
* 再次点击画布，结束绘制
* 点击绘制好的线段就可以控制线段

<demo :url="$withBase('/samples/graph/MxDbCloudLine.html')" />


