---
title: 组合与继承
author: mxcad
date: '2022-5-7'
---

## 多个图形组合构成一个新的图形对象

组合多个图新也就是在一个新的自定义对象中的动态绘制函数中调用其他图形的绘制函数，最终渲染出我们想要的图形。

例如我们提供的审图标注，就是通过在绘制函数中调用云线对象和文字标注对象的绘制函数实现：
```js
class MxDbRectBoxLeadComment extends MxDbEntity {
  // ...
  public worldDraw(pWorldDraw: McGiWorldDraw): void {
    // 实例化一个云线对象
    let cloudLine = new MxDbCloudLine()
    // ...
    // 绘制一个矩形的云线框
    cloudLine.addLine(pt1, pt2)
    cloudLine.addLine(pt2, pt3)
    cloudLine.addLine(pt3, pt4)
    cloudLine.addLine(pt4, pt1)
    // 调用云线对象的绘制函数并传入动态绘制对象
    cloudLine.worldDraw(pWorldDraw)
    
    // 实例化文字标注对象
    let leadComment = new MxDbLeadComment()
    // ...
    leadComment.point1 = leadPt
    leadComment.point2 = this.point3
    leadComment.text = this.text
    leadComment.textHeight = this.textHeight
    // 动态绘制
    leadComment.worldDraw(pWorldDraw)
  }
}
```
我们可以服用mxdraw中提供的这些基本的图形绘制实现更多复杂的图形，并可以更好的管理操作数据。

## 继承图形对象实现更多需求

通常情况下，基本的图形对象并不能满足大部分的业务需求，我们可以通过继承该图形对象类的基础上扩展重构一个新的自定义图形对象。

下面对MxDbAlignedDimension对齐尺寸对象的类进行重构扩展，让测量结果带上单位
```js
class MyAlignedDimension extends MxDbAlignedDimension {
  // 通过这个方法返回的字符串为当前对齐尺寸对象渲染的文字内容 这里直接重写了这个方法，使测量结果带上了"M"这个单位
  public getDimText(): string {
    var v2ndPtTo1stPt = new THREE.Vector3(this.point1.x - this.point2.x, this.point1.y - this.point2.y, 0);
    var fLen = v2ndPtTo1stPt.length()
    return fLen.toFixed(3) + "M"
  }

  // 因为这是一个新的自定义图形类 所有，每次渲染创建都是通过new 这个类来实现  
  public create(): MyAlignedDimension {
    return new MyAlignedDimension();
  }

  // 与create方法同理 
  public getTypeName(): string {
    return "MyAlignedDimension";
  }
}
```

在重构某个图形对象的类前，可以通过[API文档](https://mxcad.github.io/mxdraw_api_docs/index.html)搜索查看对应的图形类有哪些属性和方法以及其详细的属性方法说明。

其实基础图形对象类相当于是继承自定义图形对象类，因为图形对象是继承自自定义图形对象的。