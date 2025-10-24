---
title: filters 滤镜
author: mxcad
date: '2022-4-22'
---

## 基础的滤镜效果

```js
import Mx from "mxdraw"

// 实例化矩形对象rect
const getPoint = new Mx.MrxDbgUiPrPoint();
let rect = new Mx.MxDbRect();
const pt1 = getPoint.value()
// 设置第一个点位置
rect.pt1 = pt1
// 设置颜色
rect.setFillImagePath('../../img/dlyx_icon.png')
rect.pt2 = pt1.clone().addScalar(10000)
rect.filter = new Mx.MxFilters()
// 链式调用  过滤或增强某个颜色通道R => 反色=> 色相旋转 
rect.filter.channel({r: 0.5}).invert(0.8).hueRotate(280)
Mx.MxFun.getCurrentDraw().addMxEntity(rect);

```

注意: 

* 更多滤镜效果请查看 [MxFilters API]()


效果：
<demo :url="$withBase('/samples/graph/filters.html')" />    