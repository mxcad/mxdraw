---
title: Custom 自定义图形
author: mxcad
date: '2022-4-22'
---

## 如何实现一个自定义图形

我们可以通过继承Mx.MxDbEntity的方式实现一个自定义的图形类，下面以实现一个可以画任意线段的自定义图形对象为例。

点击 [Mx.MxDbEntity API](https://mxcad.github.io/mxdraw_api_docs/classes/MxDbEntity.html) 查看详细的实现规范。

``` js
import Mx from "mxdraw"
import THREE from "three"

// 继承自定义图形对象 实现画任意线段的功能
class MxAnyLine extends  Mx.MxDbEntity {
    // 顶点列表
    points = []

    // 线段中心点
    centerPt = new THREE.Vector3()

    // 动态绘制
    worldDraw(pWorldDraw) {
        // 创建任意线段three.js的线对象
        const line = createAnyLine(this.points)
        // 计算线对象的包围盒
        line.geometry.computeBoundingBox()
        // 获取中心点
        line.geometry.boundingBox.getCenter(this.centerPt)
        // 动态绘制这个线对象
        pWorldDraw.drawEntity(line)
    }
    // 显示操作的顶点 点击这个顶点就可以进行移动操作
    getGripPoints() {
        return [this.centerPt]
    }

    // 显示的顶点移动事件， index表示移动的是那个点， offset是移动的偏移量
    moveGripPointsAt(index, offset) {
        this.points.forEach((pt)=> {
            pt.add(offset);
        })
        
        return true;
    }

    // 自定义对象在绘制时会重新创建
    create() {
        return new MxAnyLine()
    }

    // 因为绘制会不断创建新的对象，所以这里是将上一个对象属性复制给新的对象
    dwgIn(obj) {
        // 这里是公共的属性
        this.onDwgIn(obj);

        // 这里是自定义对象自己的属性
        let ary = obj["points"];
        this.points = [];
        this.centerPt  = obj["centerPt"];
        ary.forEach((val) => {
            this.points.push(val.clone());
        });
        return true;
    }
    // 输出同理 就是新对象和旧对象属性的复制 确保在绘制的时候这些属性值存在
    dwgOut(obj) {
        // 这里是公共的属性
        this.onDwgOut(obj);
        obj["points"] = [];
        obj["centerPt"] = this.centerPt
        this.points.forEach((val) => {
            obj["points"].push(val.clone());
        });
        return obj
    }
}


// 创建任意线的three.js线段对象 这部分代码请参考three.js文档
function createAnyLine(points) {
    const curve = new THREE.CatmullRomCurve3(points, false,  "chordal"); 
    points = curve.getPoints( 50 )
    const geometry = new THREE.BufferGeometry()
    const divisions = Math.round( 12 * points.length );
    let point = new THREE.Vector3();
    const positions =[]
    const colors = []
    const color = new THREE.Color("#ff0000");
    for ( let i = 0, l = divisions; i < l; i ++ ) { 
        const t = i / l;
        point = curve.getPoint( t );
        positions.push( point.x, point.y, point.z );
        colors.push( color.r, color.g, color.b );
    }
    geometry.setAttribute( 'position',new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color',new THREE.Float32BufferAttribute( colors, 3 ) );
    const material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 10 } )
    const splineObject = new THREE.Line( geometry, material )
    splineObject.computeLineDistances();
    return splineObject
}

```
自定义图形对象动态绘制的说明:

1、动态绘制`worldDraw`方法本质上是在创建three.js的物体对象，并将其添加到场景中渲染

2、每次触发动态绘制`worldDraw`，就会将原本的实例对象删掉(同时也会删除渲染的three.js物体对象)，通过`create`方法重新创建实例

3、有些数据是需要保存在自定义对象中，`dwgIn`和`dwgOut`方法就是保证在执行`worldDraw`方式时用到的数据不会在创建后不丢失

4、`getGripPoints`方法是在点击这个渲染好的图形时提供一个操作点位，点击操作点移动的回调函数`moveGripPointsAt`, 显然这些操作一样会触发`worldDraw`方法

::: tip
+ 实现自定义图形对象需要three.js的知识点，推荐结合本示例代码 在[three.js文档](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Line)中查找不会的three.js知识进行学习
:::

效果：参考[绘制任意线mxdbanyline](./MxDbLine.md#任意线段-mxdbanyline)


## JSON格式化自定义图形对象实现保存和恢复

```js
import Mx from "mxdraw"
// 获取当前控件对象
let mxobj = Mx.MxFun.getCurrentDraw();

// 将画布中的自定义图形对象转换为JSON字符串
const sSaveData = mxobj.saveMxEntityToJson();

// 将画布中的所有自定义图形对象删除
mxobj.eraseAllMxEntity();


// 通过JSON字符串恢复删除的所有自定义图形对象 
mxobj.loadMxEntityFromJson(sSaveData)

// 最后更新显示视图
mxobj.updateDisplay();
```