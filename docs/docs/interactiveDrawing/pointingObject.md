---
title: 取点对象
author: mxcad
date: '2024-2-28'
---

在日常生活和工作中，在画布中绘制基本图形前，先要学会点对象的绘制，因为复杂图形都由点、线、面组成，所以要想更好的绘制图形就要先了解点的绘制。mxdraw.js中就提供了API`MrxDbgUiPrPoint`用于构建一个取点对象，并提供一系列方法属性辅助用户绘图。

点击[MrxDbgUiPrPoint API](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html) 查看详细属性和方法说明。

## 基础取点

调用`MrxDbgUiPrPoint`中的方法`go()`记录鼠标开始拖动的点位置，用户可利用该方法记录画布中的目标点位。执行`go()`方法，若取点成功则返回点的位置，默认点值为THREE.Vector3()；若取点失败则返回`null`。

```js
Mx.loadCoreCode().then(async () => {
    // 创建控件对象
    Mx.MxFun.createMxObject({
        canvasId: "mxdraw", // canvas元素的id
        callback: (mxDrawObject, dom ) => {
            //图纸展示控件创建完成后的回调函数 回调参数mxDraw和dom
            console.log(mxDrawObject, dom)
        },
    });
    const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
    const pt = await getPoint.go()
    if(!pt) return
    console.log('目标点位' , pt)
})
```
此外，若用户需要连续取点，则可以结合`while函数`调用`go()`方法。

```js
const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
while(true){
    const pt = await getPoint.go()
    if(!pt) break
}
```
## 辅助命令功能

为了用户有更好的绘图体验，我们可结合[命令功能](./basedOnnUsing.md)和mxdraw.js中取点对象提供的一系列方法对绘图操作时所进行的操作提供相应提示和操作选项。下面以常用方法为例：

+ 设置提示字符串：`setMessage()`方法对绘图操作时所进行的操作进行提示。
```js
const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
getPoint.setMessage('设置提示字符串')
const pt = await getPoint.go()
```
+ 关键字：`setKeyWords()`方法可为当前命令设置关键字选项，`keyWordPicked()`方法可返回用户选择的关键字。
```js
const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
// 设置关键字列表
getPoint.setKeyWords('[闭合(C)/ 放弃(U)]')

// 获取用户选择关键字
getPoint.isKeyWordPicked('关键字')
```

## 动态绘制

取点对象中还提供了`setUserDraw()`方法设置交互过程的动态绘制调用对象，在该过程中所绘制的图像都是临时绘制，不会保存在画布中。该方法提供了两个回调参数：`currentPoint`、`pWorldDraw`。`currentPoint`为当前光标所在点的点位，`pWorldDraw`为一个动态绘制回调对象，可根据用户设置动态绘制目标图形。

点击[动态绘制回调对象](https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html) 查看详细属性和方法说明。

```js
async function draw_line(){
    const line = new Mx.MxDbLine()
    const getPoint = new Mx.MxFun.MrxDbgUiPrPoint()
    const pt1 = await getPoint.go()
    if(!pt1) return
    line.pt1 = pt1
    // 动态绘制
    getPoint.setUserDraw((currentPoint, pWorldDraw)=>{
        line.pt2 = currentPoint
        pWorldDraw.drawCustomEntity(line)
    })
    const pt2 = await getPoint.go()
    if(!pt2) return
    line.pt2 = pt2
    // 获取控件对象并将线段对象line添加到画布中
    Mx.MxFun.getCurrentDraw().addMxEntity(line);
}
```
