---
title: Image 图片
author: mxcad
date: '2024-2-23'
---
## 图片 MxDbImage

我们可以通过实例化一个 Mx.MxDbImage() 对象创建一个图片对象。

点击 [Mx.MxDbImage API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbImage.html) 查看详细属性和方法说明。

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbImage 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制图片函数
    function draw_image() {
        // 实例化取点对象
        const getPoint = new Mx.MrxDbgUiPrPoint()
        // 实例化图片对象
        const image = new Mx.MxDbImage()
        const pt1 = getPoint.go()
        if (!pt1) return
        // 60,40是图片的宽高，单位是屏幕像素.
        const w = Mx.MxFun.screenCoordLong2Doc(500)
        const h = Mx.MxFun.screenCoordLong2Doc(500)
        // 设置点位置
        image.setPoint1(pt1)
        const pt2 = new THREE.Vector3(pt1.x + w, pt1.y + h, pt1.z)
        image.setPoint2(pt2)
        // 设置图片路径
        image.setImagePath("/image/dlyx_icon.png")
        // 获取控件对象并将图片对象image添加到画布中
        Mx.MxFun.getCurrentDraw().addMxEntity(image)
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_image())
</script>

<body>
    <div>
        <button id="btn">绘制图片</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制图片按钮，执行绘制函数开始绘制
* 点击画布绘制图片

<demo :url="$withBase('/samples/graph/MxDbImage.html')" />    