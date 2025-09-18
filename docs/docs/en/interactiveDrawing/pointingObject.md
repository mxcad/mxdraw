---
title: Fetch point object
author: mxcad
date: '2024-2-28'
---

In daily life and work, before drawing basic graphics in the canvas, we must first learn to draw point objects, because complex graphics are composed of points, lines, and surfaces, so in order to better draw graphics, we must first understand the drawing of points. mxdraw.js provides an API `MrxDbgUiPrPoint` to build a fetch point object and provide a series of method properties to assist users in drawing.

Click [MrxDbgUiPrPoint API](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html) to check the properties and methods in detail.

## Base take point

Call `go()` in `MrxDbgUiPrPoint` to record the point where the mouse starts dragging, the user can use this method to record the target point in the canvas. Execute the `go()` method and return the position of the point if the point is successfully fetched. The default point value is THREE.Vector3(); Return `null` if the fetch point fails.

```js
Mx.loadCoreCode().then(async () => {
    // Create a control object
    Mx.MxFun.createMxObject({
        canvasId: "mxdraw", // id of the canvas element
        callback: (mxDrawObject, dom ) => {
            //The drawing display control is created after the callback function callback parameters mxDraw and dom
            console.log(mxDrawObject, dom)
        },
    });
    const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
    const pt = await getPoint.go()
    if(!pt) return
    console.log('Target point position' , pt)
})
```
In addition, if the user needs to take points continuously, the `go()` method can be called in combination with the `while function`.

```js
const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
while(true){
    const pt = await getPoint.go()
    if(!pt) break
}
```
## Auxiliary command function

In order to provide better drawing experience for users, we can combine a series of methods provided by [command function](./basedOnnUsing.md) and mxdraw.js to provide corresponding tips and operation options for drawing operations. The following uses common methods as an example:

+ Set the prompt string: the `setMessage()` method prompts the action taken during the drawing operation.
```js
const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
getPoint.setMessage('Set prompt string')
const pt = await getPoint.go()
```
+ Keywords: The `setKeyWords()` method sets keyword options for the current command, and the `keyWordPicked()` method returns a keyword selected by the user.
```js
const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
// 设置关键字列表
getPoint.setKeyWords('[Close (C)/ abandon (U)]')

// 获取用户选择关键字
getPoint.isKeyWordPicked('keyword')
```

## Dynamic rendering

The `setUserDraw()` method is also provided in the fetch object to set the dynamic drawing call object of the interaction process. The images drawn during the process are temporary drawing and will not be saved in the canvas. This method provides two callback parameters: `currentPoint` and `pWorldDraw`. `currentPoint` is the point at which the current cursor is located, and `pWorldDraw` is a dynamically drawn callback object that can dynamically draw the target graph according to user Settings.

Click [dynamic drawing a callback object](https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html) to check the properties and methods in detail.

```js
async function draw_line(){
    const line = new Mx.MxDbLine()
    const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
    const pt1 = await getPoint.go()
    if(!pt1) return
    line.pt1 = pt1
    // Dynamic rendering
    getPoint.setUserDraw((currentPoint, pWorldDraw)=>{
        line.pt2 = currentPoint
        pWorldDraw.drawCustomEntity(line)
    })
    const pt2 = await getPoint.go()
    if(!pt2) return
    line.pt2 = pt2
    // Gets the control object and adds the line segment object Line to the canvas
    Mx.MxFun.getCurrentDraw().addMxEntity(line);
}
```
