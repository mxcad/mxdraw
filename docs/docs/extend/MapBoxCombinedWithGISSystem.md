---
title: mxdraw与mapbox的使用
author: mxcad
date: '2022-8-16'
---

## mapbox地图与cad图纸是如何放在一起展示的？

mapbox是通过webgl渲染的交互式地图，而mxdraw也是利用webgl渲染实现的。

所以我们可以通过mapbox提供的自定义图层与mxdraw的控件实例渲染结合，将cad图层与地图展现出来。

如果不了解mapbox可以参考中文[官方文档](http://www.mapbox.cn/mapbox-gl-js/api/) / [国际站](https://www.mapbox.com/)

下面代码是mapbox和mxdraw结合使用的最简示例。


```sh

# 先安装对应的依赖包

npm install mapbox-gl mxdraw
```

``` html

<div id="map"></div>

```

``` js

import mapboxgl from "mapbox-gl";
import Mx from "mxdraw"
import * as THREE from "three"

// token需要自己在mapbox官网申请
mapboxgl.accessToken = "pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA"

// 北京位置的经纬度
const center = [116.391305, 39.90553]

const map = new mapboxgl.Map({
     // Mapbox GL JS 进行地图渲染的 HTML 元素，或该元素的字符串 id 。该指定元素不能有子元素。
    container: 'map',
    // 地图位置
    center,
    // 地图样式
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 16
})

// 图纸或者模型的高度
const modelAltitude = 100;

// 将 LngLat 投影转换为 墨卡托投影坐标
const point = mapboxgl.MercatorCoordinate.fromLngLat(
    center,
    modelAltitude
);
// 返回在此纬度上以墨卡托坐标单位表示的1米距离。
// 对于现实世界中使用米单位的坐标，这自然提供了转换为墨卡托投影坐标的比例尺
const lDistForM = point.meterInMercatorCoordinateUnits();

// 当前决定该cad图纸在现实中的范围是1公里
const lCADArea = 1000 * lDistForM * 1;

// 提供一些必要的mapbox信息，并且赋予了一些mxdraw提供的核心方法
let mxMap = {
    // mapbox生成的canvas元素
    canvas: null,
    // 自定义图层提供的gl上下文
    gl: void 0,
    // cad图纸的位置1
    cadLocation1: new THREE.Vector3(),
    // cad图纸的位置2
    cadLocation2: new THREE.Vector3(),
    // 海拔高度
    elevation: 0,
    // 自定义图层信息
    customLayer: {},
    // cad图纸控件对象
    mxObj: null,
    // 坐标系转换的矩阵1
    matCadToMap: new THREE.Matrix4(),
     // 坐标系转换的矩阵1
    matMapToCad: new THREE.Matrix4(),
    // 自定义图层的矩阵
    matrix: undefined,
    // 渲染函数
    render(gl, matrix){

    },
    // 坐标系相互转换的方法
    cadToMercatorCoord(pt) {
        pt.applyMatrix4(this.matCadToMap);
        return new mapboxgl.MercatorCoordinate(pt.x,pt.y,pt.z); 
    },
    
    mercatorCoordToCad(pt){
        let ptRet = new THREE.Vector3(pt.x,pt.y,pt.z);
        ptRet.applyMatrix4(this.matMapToCad);
        return ptRet; 
    },

    cadLongToMercatorCoord(len){
        let pt1 = new THREE.Vector3(0,0,0);
        let pt2 = new THREE.Vector3(len,0,0);
        pt1.applyMatrix4(this.matCadToMap);
        pt2.applyMatrix4(this.matCadToMap);
        return pt1.distanceTo(pt2);
    }

}
// 通过以上信息从而确定cad图上的具体位置
mxMap.cadLocation1 = new THREE.Vector3(point.x - lCADArea / 2, point.y - lCADArea, point.z);
mxMap.cadLocation2 = new THREE.Vector3(point.x + lCADArea, point.y + lCADArea / 2, point.z);

// 新增一个mapbox自定义图层
const customLayer = {
    id: "3d-model", // 任意不重复的ID
    type: "custom",
    renderingMode: "3d",
    async onAdd(map, gl) {
        // 同步加载mxdraw核心库
        await Mx.loadCoreCode()
        // 拿到mapbox的canvas元素
        mxMap.canvas = map.getCanvas();
        // 以及webgl上下文
        mxMap.gl = gl
        // 创建图纸控件对象
        Mx.MxFun.createMxObject({
            // mapBox 提供 mapbox的一些必要参数
            mapBox: mxMap,
            // 要打开的图纸
            cadFile: "../../demo/buf/$hhhh.dwg",
            callback: (mxObj) => {
                mxMap.mxObj = mxObj;
                mxObj.addEvent("loadComplete", () => {
                    // 更新mapbox
                    map.triggerRepaint()
                });
            }
        }); 
  
    },
    render(gl, matrix) {

        // 赋值矩阵信息
        mxMap.matrix = matrix
        // 在创建图纸后会提供一个渲染函数,用于更新图纸
        mxMap.render(gl, matrix);

        // 刷新mapbox
        map.triggerRepaint()
    }
};
// 赋值这个自定义图层的信息
mxMap.customLayer = customLayer
//  添加自定义图层

map.on('style.load', ()=> {
    map.addLayer(customLayer)
})
```

效果：  
<demo :url="$withBase('/samples/GIS/mapboxOrMxdraw.html')" /> 