---
title: 图形对象的动态绘制
author: mxcad
date: '2022-4-24'
---

我们的图形对象是继承自[自定义图形对象](../graph/MxDbEntity.md)的， 而任何的图形对象都可以通过[动态绘制对象](https://mxcad.github.io/mxdraw_api_docs/classes/McEdGetPointWorldDrawObject.html)实现动态绘制的效果。

因为在图形对象或者说自定义图形对象中必须实现动态回调，无论是图形的绘制还是对图形进行操作都会触发这个动态回调。

```js
import Mx from "mxdraw"
 // 实例化取点对象
const getPoint = new Mx.MrxDbgUiPrPoint();

 // 实例化线段对象line
let line = new Mx.MxDbLine();

// 实例化动态绘制对象
const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();

// 设置动态绘制回调函数
worldDrawComment.setDraw((currentPoint) => {
    line.setPoint2(currentPoint);
    // 绘制线段对象
    worldDrawComment.drawCustomEntity(line);

    // 在绘制过程中还可以一起绘制其他图形 绘制过程结束时，不会保留这些图形，如：
    // 绘制以下图形使用红色
    worldDrawComment.setColor('#ff0000')
    // 绘制半径为6的圆
    worldDrawComment.drawCircle(currentPoint, 6)
    // 绘制字体大小为36的 “文字”  角度为0
    worldDrawComment.drawText("文字" ,36 , 0, currentPoint)

});

// 使用动态绘制对象
getPoint.setUserDraw(worldDrawComment)

```

注意：

* 关于图形对象具体如何实现动态绘制的请前往[自定义图形对象](../graph/MxDbEntity.md)查看具体实现

