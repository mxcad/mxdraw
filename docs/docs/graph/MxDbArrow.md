---
title: Arrow 箭头 
author: mxcad
date: '2024-2-23'
---

## 箭头 MxDbArrow

我们可以通过实例化一个 Mx.MxDbArrow() 对象创建一个箭头。

点击 [Mx.MxDbArrow API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbArrow.html) 查看详细属性和方法说明。

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
    //绘制箭头函数
    async function draw_arrow() {
        const lines = new Mx.MxDbArrow()
        const mxDraw = Mx.MxFun.getCurrentDraw();
        const getPoint = new Mx.MrxDbgUiPrPoint();
        lines.setLineWidth(10)
        const startPt = await getPoint.go()
        if (!startPt) return
        lines.innerOffset = getScreenPixel(10)
        lines.outerOffset = getScreenPixel(22)
        lines.topOffset = getScreenPixel(36)
        lines.startPoint = startPt
        getPoint.setUserDraw((currentPoint, worldDraw) => {
            lines.endPoint = currentPoint;
            worldDraw.drawCustomEntity(lines)
        })
        const endPt = await getPoint.go()
        lines.endPoint = endPt
        mxDraw.addMxEntity(lines)
    }
    /** 接受一个屏幕像素返回一个根据three.js坐标系计算出的实际屏幕像素
     * @param pixel 屏幕像素
     * @param isFontSize 计算字体大小时传入true
     * */
    function getScreenPixel(pixel, isFontSize) {
        let _pixel = Mx.MxFun.screenCoordLong2World(isFontSize ? pixel : pixel - pixel / 3)
        _pixel = Mx.MxFun.worldCoordLong2Doc(_pixel)
        return _pixel
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_arrow())
</script>

<body>
    <div>
        <button id="btn">绘制箭头</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```

效果：
* 点击绘制箭头按钮，执行绘制函数开始绘制
* 点击画布确定箭头的起始点
* 移动鼠标点击画布确定箭头的结束点并成功绘制箭头

<demo :url="$withBase('/samples/graph/MxDbArrow.html')" />
