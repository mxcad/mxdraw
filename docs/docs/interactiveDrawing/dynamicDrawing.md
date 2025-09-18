---
title: 动态绘制
author: mxcad
date: '2024-2-28'
---

## 基础绘制

 mxdraw.js提供了两种实现动态绘制的方式，它们可以在不改变图形类的情况下,改变图形的大小、方向等,帮助用户更快捷地绘制目标图形。这两种动态绘制的方式都是结合[取点对象](./pointingObject.md)来实现动态绘制图形的功能。

### 方式一 

利用API`McEdGetPointWorldDrawObject`构建一个动态绘制回调对象，再通过取点对象中的`setUserDraw()`方法调用该对象。

点击[Mx.McEdGetPointWorldDrawObject API](https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html) 查看详细属性和方法说明。
``` js
 // 实例化取点对象
const getPoint = new Mx.MrxDbgUiPrPoint();
// 实例化线段对象line
let line = new Mx.MxDbLine()
const pt1 = await getPoint.go()
line.setPoint1(pt1)
// 实例化动态绘制对象
const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();
// 设置动态绘制回调函数
worldDrawComment.setDraw((currentPoint) => {
    line.setPoint2(currentPoint);
    worldDrawComment.drawCustomEntity(line)
});
// 使用动态绘制对象
getPoint.setUserDraw(worldDrawComment)

```
### 方式二

直接运用取点对象提供的`setUserDraw()`方法设置交互过程的动态绘制调用对象。详细描述可参考[取点对象动态绘制](./pointingObject.md#动态绘制)

```js
const getPoint = new Mx.MrxDbgUiPrPoint()
// 实例化线段对象line
let line = new Mx.MxDbLine();
const pt1 = await getPoint.go()
if(!pt1) return
line.pt1 = pt1
// 实例化动态绘制对象
getPoint.setUserDraw((currentPoint, worldDrawComment)=>{
    line.pt2 = currentPoint
    worldDrawComment.drawCustomEntity(line)
});
const pt2 = await getPoint.go()
if(!pt2) return
line.pt2 = pt2;

```
::: tip
在动态绘制中的绘制的图形都是临时的，意味着这些图形最终是不会保持在画布上的，如果需要将动态绘制的图形保存在画布上请调用[取点对象的drawReserve方法](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html#drawReserve)
:::

## 图形对象的动态绘制

我们的图形对象是继承自[自定义图形对象](../graph/MxDbEntity.md)的， 而任何的图形对象都可以通过[动态绘制对象](https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html)实现动态绘制的效果。图形对象具体如何实现动态绘制的请前往[自定义图形](../graph/MxDbEntity.md)查看详情。

```js
// 实例化取点对象
const getPoint = new Mx.MrxDbgUiPrPoint();

// 实例化动态绘制对象
const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();
const pt1 = await getPoint.go()
if(!pt1) return
// 设置动态绘制回调函数
worldDrawComment.setDraw((currentPoint) => {
    // 绘制线段对象
    worldDrawComment.drawLine(pt1, currentPoint);
    // 在绘制过程中还可以一起绘制其他图形 绘制过程结束时，不会保留这些图形，如：
    // 绘制以下图形使用红色
    worldDrawComment.setColor('#ff0000')
    // 绘制半径为6的圆
    worldDrawComment.drawCircle(currentPoint, 6)
    // 绘制字体大小为36的 “文字”  角度为0
    worldDrawComment.drawText("文字" ,36 , 0, currentPoint)
    // 绘制矩形 pt1, currentPoint为矩形两对角
    worldDrawComment.drawRect(pt1, currentPoint)
});

// 使用动态绘制对象
getPoint.setUserDraw(worldDrawComment)

```



