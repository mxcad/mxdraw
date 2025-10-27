---
title: Text 
author: mxcad
date: '2024-2-23'
---

## Text MxDbText

We can create a text by instantiating an Mx.MxDbText() object. Can be combined with [command mode](../commandMode/basedOnnUsing.md) setting the text content.

Click [Mx MxDbLine API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbLine.html) to check the properties and methods in detail.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbText Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    // Draw text function
    async function draw_text() {
        const getPoint = new Mx.MrxDbgUiPrPoint()
        getPoint.setMessage('\n Tap text insertion point:')
        let ptVal = await getPoint.go()
        if (!ptVal) return
        let text = new Mx.MxDbText()
        text.position = ptVal
        text.height = Mx.MxFun.screenCoordLong2Doc(50)
        text.text = 'Test text'
        Mx.MxFun.getCurrentDraw().addMxEntity(text);
    }
    // Bind button click event
    document.getElementById('btn').addEventListener('click', () => draw_text())
</script>

<body>
    <div>
        <button id="btn">Draw text</button>
    </div>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
</body>

</html>
```
Effect:
* Click the Draw Text button to execute the draw function to start drawing
* Click the canvas to determine the text display position and successfully display the text

<demo :url="$withBase('/samples/graph/MxDbText.html')" />
