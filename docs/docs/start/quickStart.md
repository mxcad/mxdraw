---
title: 快速入门
author: mxcad
date: '2024-2-21'
---

## 安装mxdraw

使用包管理器（未避免影响后续使用，建议始终安装最新版的mxdraw库）
```sh
npm install mxdraw@latest
```

使用< script >标签
```html
<script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
```

## 基础使用
mxdraw.js依赖canvas标签打开画布，但由于canvas会根据父元素的宽高来自动调整大小，为保证绘制不失真需要固定canvas父级的宽高，且在父元素上设置属性overflow:hidden。在页面中创建好画布后，可根据自身需求执行不同的绘制函数，创建画布的示例代码如下：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxdraw基础使用示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(() => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
            callback: (mxobj, dom) => {
                //图纸展示控件创建完成后的回调函数 回调参数mxDraw和dom
                console.log(mxobj, dom);

                mxobj.on("openFileComplete", (iRet) => {
                    // 绘制直线
                    let line = new Mx.MxDbLine();
                    line.pt1 = new THREE.Vector3(0, 0, 0);
                    line.pt2 = new THREE.Vector3(100, 100, 0);
                    mxobj.addMxEntity(line);
                    // 绘制圆
                    let circle = new Mx.MxDbCircleShape()
                    circle.center = new THREE.Vector3(50, 50, 0)
                    circle.xRadius = circle.yRadius = 20
                    circle.isClosedToCenter = false
                    mxobj.addMxEntity(circle)
                    // 绘制文本
                    let text = new Mx.MxDbText()
                    text.position = new THREE.Vector3(50, 50, 0)
                    text.height = Mx.MxFun.screenCoordLong2Doc(50)
                    text.text = '测试文本'
                    mxobj.addMxEntity(text)

                    mxobj.zoomW(line.pt1, line.pt2);
                });
            },
        });
    })
</script>

<body>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
  
