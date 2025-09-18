---
title: Rect 矩形
author: mxcad
date: '2024-2-22'
---

我们可以通过实例化一个 Mx.MxDbRect() 对象创建矩形。

点击 [Mx.MxDbRect API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRect.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbRect 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制矩形函数
    async function draw_rect() {
        // 实例化取点对象
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // 实例化矩形对象rect
        let rect = new Mx.MxDbRect()
        const pt1 = await getPoint.go()
        // 设置第一个点位置
        rect.pt1 = pt1
        // 设置颜色
        rect.setColor(0xFF22)
        // 设置动态绘制回调函数
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 设置线段第二个点位置
            rect.pt2 = currentPoint
            // 绘制矩形对象rect
            worldDrawComment.drawCustomEntity(rect)
        })
        // 鼠标第二次点击
        rect.pt2 = await getPoint.go()
        Mx.MxFun.getCurrentDraw().addMxEntity(rect)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_rect())
</script>

<body>
    <div>
        <button id="btn">绘制矩形</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制矩形按钮，执行绘制函数开始绘制
* 点击画布确定矩形的一个点
* 移动鼠标动态绘制矩形，再次点击画布结束绘制
* 点击绘制好的矩形就可以控制矩形

<demo :url="$withBase('/samples/graph/MxDbRect.html')" />