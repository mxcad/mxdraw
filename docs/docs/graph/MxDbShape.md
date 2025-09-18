---
title: Shape 形状图形
author: mxcad
date: '2024-2-25'
---
`Mx.MxDbShape`是基于THREE.Shape 实现的图形形状基类，能够实现动态绘制形状，可以通过扩展MxDbShape类来实现各种2d、3d图形效果。

`Mx.MxDbShape`默认支持形状曲线闭合、填充、图片填充、虚线、实线、线宽等设置, 该类基于[Mx.MxDbEntity](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEntity.html)实现。

点击 [Mx.MxDbShape API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbShape.html) 查看详细属性和方法说明。

## MxDbShape 扩展的实现流程

继承 MxDbShape => 扩展_propertyDbKeys属性数组 => 重写worldDraw方法

### 一、扩展_propertyDbKeys属性数组:

```ts
class MxDbPolygonShape extends MxDbShape {
    points  = []
    constructor() {
        super()
        this._propertyDbKeys = [...this._propertyDbKeys, 'points']
    }
    ...
}
```
_propertyDbKeys属性记录要保留的数据名称，如示例中的'points' 属性，在交互(命令)式动态绘制过程中的不断重绘， points数组会重新初始化为空数组。如果需要在图形需要实现 归档还原等操作、动态绘制、选择拖到夹点改变图形等功能时都需要points数据实时保存，避免被初始化。

### 二、重写worldDraw方法
worldDraw 是渲染函数，以下是默认实现：

```ts
worldDraw() {
    // THREE默认是挂载在window对象上的， 并且需要调用loadCoreCode函数执行后才会挂载
    const THREE:THREE =  Mx.MxFun.getMxFunTHREE()
    // 创建形状路径
    const paths = this.createPaths(new THREE.Curve<THREE.Vector3>())
    // 通过形状路径获取构成的点
    const points = this.getShapePoints(paths)
    // 绘制形状
    this._draw(pWorldDraw, points)
    // 绘制形状的描边
    this._drawStoreLine(pWorldDraw, points)
}

```

我们可以基于THREE.Curve以及它的衍生类来实现各种现状并通过 createPaths 方法创建一条形状路径，通过getShapePoints获取形状路径的点， 最终通过_draw和_drawStoreLine来绘制形状和描边。或通过一些算法将构成形状的点计算出来直接通过_draw和_drawStoreLine来绘制。

其中，显示夹点getGripPoints和移动夹点moveGripPointsAt的重写方法可参考[Mx.MxDbEntity 自定义图形对象](./MxDbEntity.md)

## 示例

下面以绘制一个箭头形状的图形为例。

```ts
export class MxDbArrow extends MxDbShape {
    /** 开始是否为尖角 */
    isSharpCorner = true 
    /** 内部偏移量 */ 
    innerOffset = 10
    /** 外部偏移量 */ 
    outerOffset = 22
    /** 顶部偏移量 */ 
    topOffset = 36
    startPoint = new THREE.Vector3()
    endPoint = new THREE.Vector3()

    constructor() {
        super()
        this._propertyDbKeys = [...this._propertyDbKeys, 'outerOffset', 'topOffset', 'innerOffset', 'isSharpCorner', 'startPoint', 'endPoint']
    }
    public worldDraw(pWorldDraw: McGiWorldDraw): void {
        const _points = this.getArrowVertex(this.startPoint, this.endPoint)
        if(_points) {
            this._draw(pWorldDraw, _points)
            this._drawStoreLine(pWorldDraw, _points)
        }
    }
    getArrowVertex(p1:THREE.Vector3, p2:THREE.Vector3, isSharpCorner = this.isSharpCorner) {
        let { innerOffset,  topOffset, outerOffset, } = this
        const coord: THREE.Vector3[] = [];
        // 顶点
        coord[3] = p2
        const p1_p2 = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        if (p1_p2 === 0) {
            return;
        }
        const sina = -(p2.x - p1.x) / p1_p2; //旋转角度的正弦值
        const cosa = (p2.y - p1.y) / p1_p2;  //余弦值
        const lInnerx = p1.x + innerOffset;
        const lInnery = p1.y + p1_p2 - topOffset;
        //外转点的原始坐标（左边）
        const lOuterx = p1.x + outerOffset;
        const lOutery = p1.y + p1_p2 - topOffset;
        const rInnerx = p1.x - innerOffset;
        const rInnery = p1.y + p1_p2 - topOffset;
        const rOuterx = p1.x - outerOffset;
        const rOutery = p1.y + p1_p2 - topOffset;
        if(isSharpCorner) {
            coord[0] = p1
            coord[6] = coord[0]
        }else {
            coord[0] = new THREE.Vector3(p1.x - (rInnerx - p1.x) * cosa, p1.y - (rInnerx - p1.x) * sina  )
            coord[6] =  new THREE.Vector3(p1.x + (rInnerx - p1.x) * cosa, p1.y + (rInnerx - p1.x) * sina  )
            coord[7] = coord[0]
        }
        //内外转点旋转角度a后的新坐标
        coord[1] = new THREE.Vector3(p1.x + (lInnerx - p1.x) * cosa - (lInnery - p1.y) * sina,  p1.y + (lInnerx - p1.x) * sina + (lInnery - p1.y) * cosa);
        coord[2] = new THREE.Vector3(p1.x + (lOuterx - p1.x) * cosa - (lOutery - p1.y) * sina, p1.y + (lOuterx - p1.x) * sina + (lOutery - p1.y) * cosa);
        coord[4] = new THREE.Vector3(p1.x + (rOuterx - p1.x) * cosa - (rOutery - p1.y) * sina, p1.y + (rOuterx - p1.x) * sina + (rOutery - p1.y) * cosa);
        coord[5] = new THREE.Vector3(p1.x + (rInnerx - p1.x) * cosa - (rInnery - p1.y) * sina, p1.y + (rInnerx - p1.x) * sina + (rInnery - p1.y) * cosa);
        return coord
    }
    getGripPoints(): THREE.Vector3[] {
        const center = new THREE.Vector3()
        new THREE.Line3(this.startPoint, this.endPoint).getCenter(center)
        return [
            this.startPoint,
            center,
            this.endPoint,
        ]
    }
    moveGripPointsAt(index: number, offset: Vector3): boolean {
        if(index === 0) this.startPoint.add(offset)
        if(index === 1) this.startPoint.add(offset), this.endPoint.add(offset)
        if(index === 2) this.endPoint.add(offset)
        return true
    }
}
```
效果：参考[Mx.MxDbArrow()](./MxDbArrow.md)