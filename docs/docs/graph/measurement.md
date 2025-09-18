---
title: measure 测量
author: mxcad
date: '2022-4-28'
---
mxdraw.js库中为测量图纸提供了一些API，例如[尺寸标注MxDbAlignedDimension()](#尺寸标注-mxdbaligneddimension)、[引线坐标测量MxDbCoord()](#引线坐标标注-mxdbcoord)、[引线文字标注MxDbLeadComment()](#引线文字标注-mxdbleadcomment)、[引线审图标注MxDbRectBoxLeadComment()](#引线审图标注-mxdbrectboxleadcomment)、[角度标注MxDb2LineAngularDimension()](#角度标注-mxdb2lineangulardimension)等，用户可结合自身需求在画布中绘制标注。

## 尺寸标注 MxDbAlignedDimension

我们可以通过实例化一个 Mx.MxDbAlignedDimension() 对象用于绘制尺寸标注图形。

点击 [Mx.MxDbAlignedDimension API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbAlignedDimension.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbAlignedDimension 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制尺寸标注函数
    async function draw_alignedDimension() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        // 当前鼠标位置
        const pt1 = await getPoint.go()
        // 实例化对齐标注
        let alignedDimension = new Mx.MxDbAlignedDimension();
        // 设置第一个点位置
        alignedDimension.setPoint1(pt1);
        // 设置动态绘制回调函数
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 设置第二个点位置
            alignedDimension.setPoint2(currentPoint);
            // 绘制
            worldDrawComment.drawCustomEntity(alignedDimension);
        })
        // 鼠标第二次点击
        const pt2 = await getPoint.go()
        if(!pt2) return
        alignedDimension.setPoint2(pt2)
        Mx.MxFun.getCurrentDraw().addMxEntity(alignedDimension);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_alignedDimension())
</script>

<body>
    <div>
        <button id="btn">尺寸标注</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击尺寸标注按钮，执行绘制函数开始绘制
* 点击画布选择目标测量对象的起点
* 移动鼠标后再次点击画布选择测量目标对象的终点并成功绘制尺寸标注图形

<demo :url="$withBase('/samples/graph/MxDbAlignedDimension.html')" />

## 引线坐标标注 MxDbCoord

我们可以通过实例化一个 Mx.MxDbCoord() 对象用于绘制引线坐标标注图形。

点击 [Mx.MxDbCoord API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbCoord.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbAlignedDimension 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制引线坐标标注
    async function draw_coord() {
        // 实例化取点对象
        const getPoint = new Mx.MrxDbgUiPrPoint()
        let coord = new Mx.MxDbCoord()
        const pt1 = await getPoint.go()
        if(!pt1) return
        coord.point1 = pt1
        // 设置动态绘制回调函数
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            coord.point2 = currentPoint
            // 绘制线段对象
            worldDrawComment.drawCustomEntity(coord)
        });
        // 鼠标第二次点击
        const pt2 = await getPoint.go()
        if(!pt2) return
        coord.point2 = pt2
        Mx.MxFun.getCurrentDraw().addMxEntity(coord)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_coord())
</script>

<body>
    <div>
        <button id="btn">引线坐标标注</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击引线坐标标注按钮，执行绘制函数开始绘制
* 点击画布选择需要标注的坐标
* 移动鼠标后再次点击画布选择坐标显示位置并成功绘制引线坐标标注图形

<demo :url="$withBase('/samples/graph/MxDbCoord.html')" />

## 引线文字标注 MxDbLeadComment

我们可以通过实例化一个 Mx.MxDbLeadComment() 对象用于绘制引线文字标注图形。用户可结合[命令模式](./combination.md),自主设置标注的文字内容。

点击 [Mx.MxDbLeadComment API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbLeadComment.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLeadComment 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制引线文字标注
    async function draw_leadComment() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        let leadComment = new Mx.MxDbLeadComment();
        // 设置标志点
        const pt1 = await getPoint.go()
        if(!pt1) return
        leadComment.point1 = pt1
        leadComment.text = "文字标注"
        leadComment.textHeight = Mx.MxFun.screenCoordLong2Doc(20)

        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 标注的文字所在位置
            leadComment.point2 = currentPoint
            worldDrawComment.drawCustomEntity(leadComment);
        });
        const pt2 = await getPoint.go()
        if(!pt2) return
        leadComment.point2 = pt2
        Mx.MxFun.getCurrentDraw().addMxEntity(leadComment);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_leadComment())
</script>

<body>
    <div>
        <button id="btn">引线文字标注</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击引线文字标注按钮，执行绘制函数开始绘制
* 点击画布选择需要标注文字的对象
* 移动鼠标后再次点击画布选择文字标注的位置并成功绘制引线文字标注图形

<demo :url="$withBase('/samples/graph/MxDbLeadComment.html')" />

## 引线审图标注 MxDbRectBoxLeadComment

我们可以通过实例化一个 Mx.MxDbLeadComment() 对象用于绘制引线审图标注图形。用户可结合[命令模式](./combination.md),自主设置审图标注的文字内容。

点击 [Mx.MxDbRectBoxLeadComment API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRectBoxLeadComment.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLeadComment 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制引线审图标注
    async function draw_rectBoxLeadComment() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        let rectBoxLeadComment = new Mx.MxDbRectBoxLeadComment()
        const pt1 = await getPoint.go()
        if (!pt1) return
        rectBoxLeadComment.point1 = pt1
        // 设置审图的云线框圆弧的半径
        rectBoxLeadComment.radius = Mx.MxFun.screenCoordLong2Doc(10)
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            rectBoxLeadComment.point2 = currentPoint
            worldDrawComment.drawCustomEntity(rectBoxLeadComment)
        });

        // 第二次点击
        const pt2 = await getPoint.go()
        if(!pt2) return
        rectBoxLeadComment.point2 = pt2
        // 文字标注
        rectBoxLeadComment.text = "文字标注"
        rectBoxLeadComment.textHeight = Mx.MxFun.screenCoordLong2Doc(20)
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            rectBoxLeadComment.point3 = currentPoint
            worldDrawComment.drawCustomEntity(rectBoxLeadComment)
        });
        // 文字所在位置
        const pt3 = await getPoint.go()
        if(!pt3) return
        rectBoxLeadComment.point3 = pt3
        Mx.MxFun.getCurrentDraw().addMxEntity(rectBoxLeadComment)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_rectBoxLeadComment())
</script>

<body>
    <div>
        <button id="btn">引线审图标注</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击引线审图标注按钮，执行绘制函数开始绘制
* 点击画布绘制审图的云线框
* 移动鼠标后再次点击画布确定文字标注的位置，并成功绘制引线审图标注图形

<demo :url="$withBase('/samples/graph/MxDbRectBoxLeadComment.html')" />

## 角度标注 MxDb2LineAngularDimension

我们可以通过实例化一个 Mx.MxDb2LineAngularDimension() 对象用于绘制角度标注图形。

点击 [Mx.MxDb2LineAngularDimension API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDb2LineAngularDimension.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDb2LineAngularDimension 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制角度标注
    async function draw_angleDimension() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        // 鼠标点击
        let ang = new Mx.MxDb2LineAngularDimension();
        // 测量角度的起始点
        const pt1 = await getPoint.go()
        if(!pt1) return
        ang.point1 = pt1
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 测量角度的具体位置
            ang.point2 = currentPoint
            // 动态绘制一条线段
            worldDrawComment.drawLine(ang.point1, currentPoint)
        });
        const pt2 = await getPoint.go()
        if(!pt2) return
        ang.point2 = pt2
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 测量角度的终止点
            ang.point3 = currentPoint
            worldDrawComment.drawCustomEntity(ang);
        });
        const pt3 = await getPoint.go()
        if(!pt3) return
        ang.point3 = pt3
        Mx.MxFun.getCurrentDraw().addMxEntity(ang);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_angleDimension())
</script>

<body>
    <div>
        <button id="btn">角度标注</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击角度标注按钮，执行绘制函数开始绘制
* 点击画布选择测量角起始点
* 移动鼠标再次点击画布选择测量角具体位置
* 最后移动鼠标点击画布确定测量角的终止点并成功绘制角度测量图形

<demo :url="$withBase('/samples/graph/MxDb2LineAngularDimension.html')" />