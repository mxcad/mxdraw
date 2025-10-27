---
title: 基础
author: mxcad
date: "2024-2-22"
---

## 视区

mxdraw.js 中的视区指的是画布的显示区域，可自主通过鼠标缩放平移显示区域。
以下是对 Mxdraw 中视区的一些常用操作：

```js
// 获取当前控件对象
const mxobj = MxFun.getCurrentDraw();
// 启用true或禁用false鼠标移动视区
mxobj.enablePan(false);
// 启用true或禁用false鼠标中键滚动缩放视区
mxobj.enableZoom(false);

// 当前视区内的开始坐标
const pt1 = new THREE.Vector3(0, 0, 0);
// 通过获取到canvas的宽高 得到屏幕结束坐标
const pt2 = new THREE.Vector3(mxobj.getViewWidth(), mxobj.getViewHeight(), 0);
//将当前显示范围移到指定的显示范围
// isWorld: 默认为felse DWG图纸坐标，设置为true是THREEJS坐标
// minPt:开始坐标  maxPt:结束坐标
let minPt = mxobj.screenCoord2Doc(pt1.x, pt1.y);
let maxPt = mxobj.screenCoord2Doc(pt2.x, pt2.y);
let isWorld = false;
mxobj.zoomW(minPt, maxPt, isWorld);

// 获取或修改视区的背景颜色
let _color = mxobj.getViewColor();
mxobj.setViewColor(0xffffff);

// 视区更新显示
mxobj.updateDisplay();

// 设置视区宽高
mxobj.setSize(100, 100);
```

## 取点对象

通过 mxdraw 中提供的 MrxDbgUiPrPoint 类来构建一个取点对象，获取画布上鼠标所在的坐标位置。

点击 [Mx.MrxDbgUiPrPoint](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html) 查看详细属性和方法说明。

```js
// 实例化取点对象
const getPoint = new Mx.MrxDbgUiPrPoint();

// 点击事件监听 只会监听第一次点击
const pt1 = await getPoint.go();
if (!pt1) return;

// Promise方式的监听方式
getPoint.go().then((pt) => {
  console.log(pt);
});
```

## 坐标转换

mxdraw.js 中定义了以下三种坐标形式，以及提供了一系列 API 对这三种坐标形式进行相互转换：

- THREE.js 坐标：即右手坐标系中的坐标，默认取点对象返回的坐标形式为 THREE.js 坐标。

- 屏幕坐标: 以 windows 窗口作为坐标系，Y 轴朝下，坐标系原点在左上角，该坐标系下的坐标即为屏幕坐标。

- DWG 文档坐标: 即绘图坐标系中的坐标。

以上三种坐标互相转换的方式(pt1:THREE.js 坐标，pt2:屏幕坐标，pt3:文档坐标)：

```js
const getPoint = new Mx.MrxDbgUiPrPoint();
// THREE.JS坐标
let pt1 = await getPoint.go();
// THREE.JS坐标转屏幕坐标
let pt2 = Mx.MxFun.screenCoordLong2World(pt1.x, pt1.y, pt1.z);
// THREE.JS坐标转DWG文档坐标
let pt3 = Mx.MxFun.worldCoord2Doc(pt1.x, pt1.y, pt1.z);

// 文档坐标转THREE.JS坐标
pt1 = Mx.MxFun.docCoord2World(pt3.x, pt3.y, pt3.z);
// 文档坐标转屏幕坐标
pt2 = Mx.MxFun.docCoord2Screen(pt3.x, pt3.y, pt3.z);

// 屏幕坐标转DWG文档坐标
pt3 = Mx.MxFun.screenCoord2Doc(pt2.x, pt2.y, pt2.z);
// 屏幕坐标转THREE.JS坐标
pt1 = Mx.MxFun.screenCoord2World(pt2.x, pt2.y, pt2.z);
```

在不同坐标系中长度单位的转换：

```js
// 屏幕坐标长度
let len_screen = 36;
// 屏幕坐标长度转THREE.JS坐标长度
let len_threeJs = Mx.MxFun.screenCoordLong2World(len);
// 屏幕坐标长度转文档坐标长度
let len_docs = Mx.MxFun.screenCoordLong2Doc(len);

// THREE.JS坐标长度转屏幕坐标长度
len_threeJs = Mx.MxFun.worldCoordLong2Doc(len);

// 文档坐标长度转屏幕坐标长度
Mx.MxFun.docCoordLong2Screen(len);
// 文档坐标长度到ThreeJS坐标长度
Mx.MxFun.docCoordLong2World(len);
```

特殊: mxcad npm 包中的 McGePoint3d 类表示的坐标与上面三种都不相同, 它是 CAD 的坐标。
mxcad 底层使用的就是 mxdraw 去做的渲染
我们要对它进行转换则需要用 mxcad 中的 mxdraw 的方法去转换， mxdraw 就是`MxFun.getCurrentDraw`方法的返回值。
`MxFun.getCurrentDraw() === mxcad.mxdraw`

```js
import { MxCpp } from "mxcad";
const mxcad = MxCpp.getCurrentMxCAD();
const mxdraw = mxcad.mxdraw;
// 将屏幕坐标转换为CAD坐标
const pt = mxdraw.viewCoord2Cad(0, 0, 0);

// 将CAD坐标转换为文档坐标
mxdraw.cadCoord2Doc2(pt);
mxdraw.cadCoord2Doc(0, 0, 0);

// 将CAD坐标转小文档坐标
mxdraw.toSmallcoord(pt);
mxdraw.toSmallcoord2(0, 0, 0);

// 将文档坐标转CAD坐标
mxdraw.docCoord2Cad2(pt);
mxdraw.docCoord2Cad(0, 0, 0);

// 将CAD坐标转屏幕坐标
mxdraw.cadCoord2View(0, 0, 0);

const length = 100;
// CAD长度转换为视区长度
mxdraw.cadCoordLong2View(length);

// 视区长度转换为CAD长度
mxdraw.viewCoordLong2Cad(length);

// 文档长度转换为CAD长度
mxdraw.docCoordLong2Cad(length);

// CAD长度转换为文档长度
mxdraw.cadCoordLong2Doc(length);
```

## 动态绘制

Mxdraw.js 在[取点对象 Mx.MrxDbgUiPrPoint()](#取点对象)中提供了一个方法[setUserDraw](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html#setUserDraw)，二者结合使用可实现基础的动态绘制图形功能。在动态绘制过程中绘制的图形都是临时的，在绘制结束的时候不会直接保存在画布上，如果需要将动态绘制的图形保存在画布上可调用取点对象的[drawReserve 方法](https://mxcad.github.io/mxdraw_api_docs/classes/MrxDbgUiPrPoint.html#drawReserve)。下面以动态绘制线段函数为例：

#### 方法一

```js
async function draw_line1() {
  // 实例化取点对象
  const getPoint = new Mx.MrxDbgUiPrPoint();
  const pt1 = await getPoint.go();
  if (!pt1) return;
  const line = new Mx.MxDbLine();
  line.pt1 = pt1;
  // 实例化动态绘制对象
  getPoint.setUserDraw((currentPoint, worldDrawComment) => {
    line.pt2 = currentPoint;
    worldDrawComment.drawCustomEntity(line);
  });
  line.pt2 = await getPoint.go();
  Mx.MxFun.getCurrentDraw().addMxEntity(line);
}
```

#### 方法二

```js
async function draw_line2() {
  // 实例化取点对象
  const getPoint = new Mx.MrxDbgUiPrPoint();
  // 实例化动态绘制对象
  const worldDrawComment = new Mx.McEdGetPointWorldDrawObject();

  const line = new Mx.MxDbLine();
  const pt1 = await getPoint.go();
  if (!pt1) return;
  line.pt1 = pt1;
  // 设置动态绘制回调函数
  worldDrawComment.setDraw((currentPoint) => {
    worldDrawComment.drawLine(pt1, currentPoint);
  });
  // 使用动态绘制对象
  getPoint.setUserDraw(worldDrawComment);
  const pt2 = await getPoint.go();
  if (!pt2) return;
  line.pt2 = pt2;
  MxFun.getCurrentDraw().addMxEntity(line);
}
```
