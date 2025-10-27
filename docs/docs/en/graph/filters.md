---
title: filters
author: mxcad
date: '2022-4-22'
---

## Basic filter effect

```js
import Mx from "mxdraw"

// Instantiate the rectangle object rect
const getPoint = new Mx.MrxDbgUiPrPoint();
let rect = new Mx.MxDbRect();
const pt1 = getPoint.value()
// Set the first point position
rect.pt1 = pt1
// Set the color
rect.setFillImagePath('../../img/dlyx_icon.png')
rect.pt2 = pt1.clone().addScalar(10000)
rect.filter = new Mx.MxFilters()
// Chain call to filter or enhance a color channel R => reverse color => hue rotation
rect.filter.channel({r: 0.5}).invert(0.8).hueRotate(280)
Mx.MxFun.getCurrentDraw().addMxEntity(rect);

```

Attention:

* See more filter effects [MxFilters API]()


Effect:
<demo :url="$withBase('/samples/graph/filters.html')" />    