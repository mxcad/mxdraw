# 扩展three.js功能

mxdraw 是一个基于 three.js 编写的插件，用户可以将 three.js 中实现的图形对象基于canvas 画布在 mxdraw 项目中显示。其中，mxdraw.js 提供了一个方法 `MxFun.getCurrentDraw().addObject()` 用于添加THREE.Object3D对象到当前场景中。

点击[addObject()](https://mxcad.github.io/mxdraw_api_docs/classes/MxDrawObject.html#addObject)查看更多方法详情。

## 基础绘制示例

在 mxdraw 中通过 three.js 绘制一个三角形，该三角形的三个顶点通过参数设置。

```ts
import { MxFun } from 'mxdraw';
import * as THREE from 'three';

function draw_Triangle(){
        // 定义三角形的顶点位置
    const vertices = new Float32Array([
      0, 10, 0, // 顶点1（上）
      -10, -10, 0, // 顶点2（左下）
      10, -10, 0 // 顶点3（右下）
    ]);

    // 创建BufferGeometry对象
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });//黄色

    // 创建网格
    const mesh = new THREE.Mesh(geometry, material);
    MxFun.getCurrentDraw().addObject(mesh);
}
```

效果展示：绘制三角形
<demo :url="$withBase('/samples/extend/extendThreeJs3.html')" />


## CSS2DObject

在 three.js 的示例中有一些示例中提供的类很有用，比如 CSS2DObject 就是将 CSS 元素作为 2D 对象添加到 3D 场景中的一个类
因为 mxdraw 中只加载了 three.js 的核心代码，并没有将示例中的类加载。
如果使用了模块化的包管理方式， 我们可以通过`npm install three@0.113.2` 安装依赖
然后引入使用就可以了:
```js
import {
    CSS2DRenderer,
    CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
```

当然也可以直接拷贝这些示例的相关类的源码实现， 像下面这样将`import` 改成 `const` 结构赋值

```js
 const { Matrix4, Object3D, Vector3 } = THREE
var CSS2DObject = function (element) {

    // ... 源码
};

CSS2DObject.prototype = Object.create(Object3D.prototype);
CSS2DObject.prototype.constructor = CSS2DObject;

//

var CSS2DRenderer = function () {
  // ... 源码
}

```

然后我们就可以使用CSS2DObject了，下面是一个简单的示例：

```ts
import { MxFun } from "mxdraw"
function drawCSS2DObject() {
    const mxdraw = MxFun.getCurrentDraw()
    const scene = mxdraw.getScene()
    const canvas = document.createElement("canvas")
    canvas.width = 200
    canvas.height = 200
    canvas.style.width = "200px"
    canvas.style.height = "200px"

    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2); // 圆心在 (100, 100)，半径为 50
        ctx.fillStyle = 'red'; // 设置填充色为红色
        ctx.fill(); // 填充圆形
    }
    // THREE
    const obj = new CSS2DObject(canvas)
    // 获取中点坐标
    obj.position.copy(mxdraw.getViewCenterDocCoord())
    const oCanvas = mxdraw.getCanvas()
    const labelRenderer = new CSS2DRenderer();
    // 设置渲染器的尺寸与mxdraw中的canvas一致
    labelRenderer.setSize(oCanvas.clientWidth, oCanvas.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.left = '0';
    // 不要影响鼠标点击
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);
    mxdraw.addObject(obj);

    const camera = mxdraw.getCamera()
    const render = () => {
        labelRenderer.render(scene, camera)
        window.requestAnimationFrame(() => render());
    }
    render()
}

```

<demo :url="$withBase('/samples/extend/extendThreeJsCSS2DObject.html')" />


## 扩展功能示例（three.js与mxdraw联用）

1. 在 mxdraw 中通过 three.js 绘制一个矩形，该矩形的位置通过 mxdraw 的交互取点设置。此外，用户也可以根据自身需求通过参数设置矩形的位置。

```ts
import { MxFun, MrxDbgUiPrPoint} from 'mxdraw';
import * as THREE from 'three';

function draw_react(){
    // 交互取点
    const getPoint = new MrxDbgUiPrPoint();
    getPoint.setMessage("\n 设置矩形位置:");
    let ptVal: THREE.Vector3 | null = await getPoint.go();
    if (ptVal == null) {
      return;
    }
    // 创建几何体(长10，宽10的矩形)
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })//绿色
    // 创建网格
    const cube = new THREE.Mesh(geometry, material);
    // 设置矩形位置
    cube.position.set(ptVal.x, ptVal.y, ptVal.z);
    // 也可以通过参数设置直接确定cube的位置
    // cube.position.set(0,0,0)
    MxFun.getCurrentDraw().addObject(cube);
}
```

效果展示：绘制矩形

* 点击绘制矩形按钮，执行绘制函数开始绘制
* 点击画布确定矩形中心位置
* 成功绘制矩形
<demo :url="$withBase('/samples/extend/extendThreeJsReact.html')" />

2. 在 mxdraw 中通过 three.js 绘制一个箭头，该箭头与 mxdraw 中的方法联动可实现动态绘制箭头的功能。通过 mxdraw 中的取点函数`MrxDbgUiPrPoint()`以及根据 mxdraw 中提供的动态绘制函数等，使用户可手动选择箭头的起始位置与方向，能够更加清晰的观察到用户操作与图形的交互。

```ts
import { MxFun, MrxDbgUiPrPoint } from 'mxdraw';
import * as THREE from 'three';

async function draw_arrow() {
  // 设置箭头的起点
  const getPt1 = new MrxDbgUiPrPoint();
  getPt1.setMessage("\n 设置箭头的起点:");
  let pt1: THREE.Vector3 | null = await getPt1.go();
  if (pt1 == null) {
    return;
  }

  // 设置箭头的终点
  const getPt2 = new MrxDbgUiPrPoint();
  getPt2.setMessage("\n 设置箭头的终点:");
  getPt2.setUserDraw((pt, pw) => {
    if (pt1 !== null) {
      pw.drawLine(pt1, pt)
    }
  })
  let pt2: THREE.Vector3 | null = await getPt2.go();
  if (pt2 == null) {
    return;
  }
  // 创建平面箭头的起点和终点坐标
  const origin = pt1;
  const XWeeks = new THREE.Vector3(1, 0, 0);
  // 创建箭头的起点和终点
  const arrow = new THREE.ArrowHelper(
    XWeeks, // 箭头方向
    origin.clone(), // 起点
    pt1.distanceTo(pt2), // 箭头长度
    0xff0000 // 箭头颜色
  );

  // 计算箭头旋转角度
  const vec = pt2.clone().sub(pt1);
  let angle = vec.angleTo(XWeeks);
  if (pt2.y < pt1.y) {
    angle = -angle;
  };
  arrow.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle)
  MxFun.getCurrentDraw().addObject(arrow)
}
```

效果展示：绘制箭头

* 点击绘制箭头按钮，执行绘制函数开始绘制
* 点击画布确定箭头起始点
* 动态绘制箭头方向，再次点击画布确定箭头结束点
* 成功绘制箭头
<demo :url="$withBase('/samples/extend/extendThreeJsArrow.html')" />

3. 在 mxdraw 中通过 three.js 修改对象材质颜色来实现闪烁效果。mxdraw.js 中提供了`MxThreeJS.loadSVG()`方法来加载svg，用户调用该方法输入SVG路径地址、设置svg初始颜色后，会得到SVG加载完成的回调函数。其中回调函数的参数分别为：THREE.Object3D和Array<THREE.MeshBasicMaterial>，用户可以根据自己的需求对得到的对象进行修改设置。

```ts
import { MxFun, MrxDbgUiPrPoint, MxThreeJS } from 'mxdraw';
import * as THREE from 'three';

async function draw_twinkle() {

  // 获取当前mxobj对象
  let mxobj = MxFun.getCurrentDraw();
  
  // 设置svg插入点
  const getPoint = new MrxDbgUiPrPoint();
  getPoint.setMessage("\n点取插入位置:");
  const pt = await getPoint.go();
  if (!pt) return;
  // 设置svg缩放因子
  let dScale = MxFun.screenCoordLong2Doc(100);
  // 设置svg初始颜色
  let color = new THREE.Color(0xff4e95); //修改加载svg模型的颜色，undefined则默认svg本身颜色

  // 加载SVG
  MxThreeJS.loadSVG(
    `models/svg/mark.svg`,
    color,
    (obj: any, meterials: Array<THREE.MeshBasicMaterial>): any => {
      if (obj) {
        obj.scale.multiplyScalar(dScale / 1000);
        obj.position.x = pt.x;
        obj.position.y = pt.y;
        obj.scale.y *= -1;
        obj.renderOrder = 12000;
        mxobj.addObject(obj, true);
        // 启动一个时钟，随机修改模型材质的颜色实现闪烁效果
        setInterval(()=>{
          // 设置随机颜色
          const color = 0xffffff * Math.random();
          meterials.forEach(item=>{item.color.set(color)});
          mxobj.updateDisplay();
        }, 500); 
      }
    }
  );
}
```

效果展示：闪烁

* 点击闪烁按钮，执行绘制函数开始绘制
* 点击画布确定SVG图片位置
* 绘制SVG对象并开始闪烁

<demo :url="$withBase('/samples/extend/extendThreeJsWink.html')" />
