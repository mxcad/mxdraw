---
title: 图形对象的增删改查
author: mxcad
date: '2022-4-29'
---

::: tip 注意
 我们将图形对象分为两种: 基于[THREE.Object3D](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Object3D) 的物体对象(如[Mesh](http://www.yanhuangxueyuan.com/threejs/docs/#api/zh/objects/Mesh)) 和 基于[Mx.MxDbEntity](./MxDbEntity)的图形对象

 这里主要是对基于[Mx.MxDbEntity](./MxDbEntity)的图形对象进行CURD(增删改查)操作方法说明

 而基于[THREE.Object3D](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Object3D) 的物体对象(如Mesh)也封装了简单的[CRUD方法](#基于three-object3d的物体对象的增删改成-crud), 如果觉得功能不完全符合需求,可查阅three.js文档实现更多需求

我们推荐将基于[THREE.Object3D](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Object3D) 的物体对象封装成[Mx.MxDbEntity](./MxDbEntity)自定义图形对象
:::


## 图形对象的CRUD

```js
import Mx from "mxdraw"
// 配置 鼠标点击图形 自定选中该图形对象
 Mx.MxFun.setIniset({
    // 启用对象选择功能.
    EnableIntelliSelect: true,
    // 选择类型
    IntelliSelectType: 1,
    // 是否开启多个选择
    multipleSelect: false,
});

// 获取当前控件对象
const draw = Mx.MxFun.getCurrentDraw()
const getPoint = new Mx.MrxDbgUiPrPoint()

setTimeout(()=> {
    // 实例化线段对象line
    let line = new Mx.MxDbLine();
    // 设置第一个点位置
    line.setPoint1(getPoint.value());
    // 设置第二个点位置
    line.setPoint2(getPoint.value().clone().addScalar(10000));

    // 添加对象渲染到场景中
    draw.addMxEntity(line)

    // 如果使用setIniset 开启了图形选择功能 则点击图形会自动将该图形对象的ID加入到选中列表中
    // 这里主动将 line的id添加到选中列表中 则当前line为选中状态 
    draw.addMxCurrentSelect(line.objectId())
    // 可以通过draw.clearMxCurrentSelect() 清空选中列表

    // 得到所有用户自绘对象
    draw.getAllMxEntity()
}, 1000)
 

// 记录选中的图形对象id
let ids = []

// 连续点击
getPoint.goWhile(()=> {
    // 获取当前鼠标位置坐标并转换为文档坐标
    const { x, y, z } =  getPoint.value()
    const pt1 = Mx.MxFun.worldCoord2Doc(x, y, z)
    
    // 根据文档坐标找到对象
    const objs = draw.findMxEntityAtPoint(pt1)
    console.log(objs[0])



    // 获取当前已选中图形对象的ID列表
    ids = draw.getMxCurrentSelect()
    if(ids[0]) {
        // 根据id获取第一个选中的图形对象
        const  graph = draw.getMxEntity(ids[0])
        
        // 复制克隆对象
        console.log(graph.clone()) 
        
        // 删除对象
        setTimeout(()=> {
            graph.erase()
        }, 1000)
        
    }
})



// 也可以通过事件监听的方式获取当前已选中的图形对象ID列表
draw.addEvent("MxEntitySelectChange", (aryId)=> {
    ids = aryId
})


```
效果：
<demo :url="$withBase('/samples/graph/GraphicsOPbjectCRUD.html')" />

+ 查看该示例完整源码: [github](https://github.com/mxcad/mxdraw_docs/tree/gh-pages/samples/graph/GraphicsOPbjectCRUD.html) | [gitee](https://gitee.com/mxcadx/mxdraw_docs/tree/gh-pages/samples/graph/GraphicsOPbjectCRUD.html)


### 关于图形层级关系控制
 
我们采用控制渲染顺序的方式控制图形对象层级 通过`setRenderOrder`控制渲染顺序
```js
const getPoint = new Mx.MrxDbgUiPrPoint()

const line = new Mx.MxDbLine();
line.setPoint1(getPoint.value())
line.setPoint2(getPoint.value().clone().addScalar(10000))
const line1 = line.clone()

line.setColor('ff0000')
line1.setColor('ffffff')
line.setRenderOrder(1)
line1.setRenderOrder(2)
const draw = Mx.MxFun.getCurrentDraw()
draw.addMxEntity(line)
draw.addMxEntity(line1)
```




##  基于THREE.Object3D的物体对象的增删改成(CRUD)

::: tip 注意
 * `getIntersectObjects`无法查找我们提供的自定义图形对象如`Mx.MxDbSVG`等
:::

获取一个基于[THREE.Object3D](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Object3D) 的物体对象(如Mesh) 通过[getIntersectObjects](https://mxcad.github.io/mxdraw_api_docs/classes/MxDrawObject.html#getIntersectObjects)方法获取鼠标当前位置的物体对象

```js
import Mx from "mxdraw"
import THREE from "mxdraw"
// 获取当前控件对象
const draw = Mx.getCurrentDraw()
// 获取取点对象
const getPoint = Mx.MrxDbgUiPrPoint()

const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );
// 添加对象 第二个参数表示是否可以被getIntersectObjects选中
draw.addObject(mesh, true)

// 连续点击
getPoint.goWhile(()=> {
    // 获取当前鼠标位置坐标并转换为屏幕坐标二维坐标
    const { x, y, z } =  getPoint.value()
    const pt1 = Mx.MxFun.screenCoordLong2World(x, y, z)
    
    // 根据屏幕坐标获取对象
    const objs = draw.getIntersectObjects(pt1)
    console.log(objs[0])
    if(objs[0]) {
        // 找到对象修改颜色
        mesh.material.color  = "#ff3300"
        setTimeout(()=> {
            // 删除对象 第二个参数表示是否删除选中集中的对象
             draw.removeObject(mesh, true)
        }, 1000)

    }
})
```