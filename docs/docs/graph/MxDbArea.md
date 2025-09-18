---
title: Area 多边形
author: mxcad
date: '2024-2-22'
---

## 任意不规则多边形 MxDbArea

我们可以通过实例化一个 Mx.MxDbArea() 对象创建任意不规则多边形。

点击 [Mx.MxDbArea API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbArea.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbArea 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制多边形函数
    async function draw_area() {
        // 实例化取点对象
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // 实例化多边形对象area
        const area = new Mx.MxDbArea()
        while (true) {
            const pt = await getPoint.go()
            if (!pt) break;
            area.addPoint(pt)
            getPoint.setUserDraw((currentPoint, worldDrawComment) => {
                // 克隆多边形对象
                const tmp = area.clone()
                // 添加顶点
                tmp.addPoint(currentPoint)
                // 动态绘制该克隆对象实现动态绘制的动画效果
                worldDrawComment.drawCustomEntity(tmp)
            })
        }
        // 获取控件对象并将多边形area添加到画布中
        Mx.MxFun.getCurrentDraw().addMxEntity(area)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_area())
</script>

<body>
    <div>
        <button id="btn">绘制多边形</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

效果：
* 点击绘制多边形按钮，执行绘制函数开始绘制
* 连续点击设置任意多边形的顶点
* 按下ESC键或者点击鼠标右键结束绘制、

<demo :url="$withBase('/samples/graph/MxDbArea.html')" />    

## 正多边形 MxDbRegularPolygon

我们可以通过实例化一个 Mx.MxDbRegularPolygon() 对象创建正多边形。其中，正多边形的边数可通过属性`sidesNumber`控制，用户既可以直接设置`sidesNumber`，也可以结合[命令模式](../commandMode/basedOnnUsing.md)在绘制页面手动输入自主设置。

点击 [Mx.MxDbRegularPolygon API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbRegularPolygon.html) 查看详细属性和方法说明。

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbRegularPolygon 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制正多边形函数
    async function draw_regularArea() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        let regularPolygon = new Mx.MxDbRegularPolygon();
        const center = await getPoint.go();
        if(!center) return;
        // 设置多边形边的中心点
        regularPolygon.centerPoint = center
        // 设置多边形边的数量
        regularPolygon.sidesNumber = 6
        getPoint.setUserDraw((currentPoint, worldDrawComment) => {
            // 设置多边形两条边相连的点
            regularPolygon.otherPoint = currentPoint
            worldDrawComment.drawCustomEntity(regularPolygon);
        });
        regularPolygon.otherPoint = await getPoint.go()
        Mx.MxFun.getCurrentDraw().addMxEntity(regularPolygon);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_regularArea())
</script>

<body>
    <div>
        <button id="btn">绘制正多边形</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：  
* 点击绘制正多边形按钮，执行绘制函数开始绘制
* 点击画布移动鼠标 绘制正多边形
* 再次点击 结束绘制
* 点击绘制好的正多边形就可以控制正多边形

<demo :url="$withBase('/samples/graph/MxDbRegularPolygon.html')" /> 