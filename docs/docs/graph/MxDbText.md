---
title: Text 文字
author: mxcad
date: '2024-2-23'
---

## 文字 MxDbText

我们可以通过实例化一个 Mx.MxDbText() 对象创建一个文本。可结合[命令模式](../commandMode/basedOnnUsing.md)自主设置文本内容。

点击 [Mx.MxDbLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbLine.html) 查看详细属性和方法说明。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbText 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    // 绘制文字函数
    async function draw_text() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        getPoint.setMessage('\n 点取文字插入点:')
        let ptVal = await getPoint.go()
        if (!ptVal) return
        let text = new Mx.MxDbText()
        text.position = ptVal
        text.height = Mx.MxFun.screenCoordLong2Doc(50)
        text.text = '测试文本'
        Mx.MxFun.getCurrentDraw().addMxEntity(text);
    }
    // 绑定按钮click事件
    document.getElementById('btn').addEventListener('click', () => draw_text())
</script>

<body>
    <div>
        <button id="btn">绘制文本</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
效果：
* 点击绘制文字按钮，执行绘制函数开始绘制
* 点击画布确定文本显示位置并成功显示文本

<demo :url="$withBase('/samples/graph/MxDbText.html')" />
