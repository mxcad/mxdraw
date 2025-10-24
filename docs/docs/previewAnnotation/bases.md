---
title: 基础开发示例
author: mxcad
date: '2023-5-9'
---

预览批注开发模式通常是以预览和批注图纸为主的模式，可将批注保存为json格式, 在下次打开图纸时还原批注

`MxFun.createMxObject`不需要额外的参数配置，默认就是预览批注模式。

批注一般情况是不用保存到图纸中的，可以批注数据保存到浏览器缓存或者服务器数据库中实现恢复批注。

当然我们是可以将批注保存到图纸内容里[点击查看](#批注保存到图纸中)

## 实现一个自定义批注

基于[自定义图形对象](graph/MxDbEntity)或者[自定义形状图形](graph/MxDbShape)来实现一个自己的批注(批注就是图形)

```ts
import Mx from "mxdraw"
Mx.loadCoreCode().then(()=> {
    Mx.MxFun.setIniset({
        // 启用对象选择功能.
        EnableIntelliSelect: true,
    });
    // 创建控件对象
    Mx.MxFun.createMxObject({
        canvasId: "mxcad",
        cadFile: "../../demo/buf/$hhhh.dwg",
        callback: (mxDrawObject, { canvas, canvasParent }) => {

        },
    });
    // 首先我们可能需要Three.js 因为mxdraw已经加载了three.js 
    // 所以我们可以调用`Mx.MxFun.loadCoreCode`加载完核心代码后
    // 通过`Mx.MxFun.getMxFunTHREE()` 得到THREE 模块(默认加载后window对象上也会挂载THREE模块)
    const THREE = Mx.MxFun.getMxFunTHREE()
     // 自定义标注类
    class CustomAnnotations extends Mx.MxDbEntity {
        // use时触发的命令
        static cmd = "Mx_CustomAnnotations"
        // use时调用的绘制流程
        static draw = drawCustomAnnotations
        pt1 = new THREE.Vector3()
        pt2 = new THREE.Vector3()
        // 类型名称(在恢复批注数据会用到 必须与定义的class类名一致)
        getTypeName() {
            return 'CustomAnnotations'
        }

        // 绘制
        worldDraw(pWorldDraw) {
            pWorldDraw.drawLine(this.pt1, this.pt2)
            // 分别在起点中点终点画了一个圆
            pWorldDraw.drawCircle(this.pt1, 1000)
            pWorldDraw.drawCircle(this.pt2, 1000)
            const midPoint = new THREE.Vector3(
                this.pt1.x + (this.pt2.x - this.pt1.x) * 0.5,
                this.pt1.y + (this.pt2.y - this.pt1.y) * 0.5,
                0
            )
            pWorldDraw.drawCircle(midPoint, 1000)
        }

        // 点击该批注时显示的可以操作的点
        getGripPoints() {
            let ret = []
            ret.push(this.pt1)
            ret.push(this.pt2)
            let midPoint = new THREE.Vector3(
                this.pt1.x + (this.pt2.x - this.pt1.x) * 0.5,
                this.pt1.y + (this.pt2.y - this.pt1.y) * 0.5,
                0
            )
            ret.push(midPoint)
            return ret
        }
        
        // 移动操作点(add方法是Three.js 数学库中Vector3向量的加运算)
        moveGripPointsAt(index, offset) {
            if (index == 0) {
                this.pt1.add(offset)
            } else if (index == 1) {
                this.pt2.add(offset)
            } else if (index == 2) {
                this.pt1.add(offset)
                this.pt2.add(offset)
            }
            return true
        }

        // 数据输入和输出 在绘制函数中或者可变的参数都需要这样处理 确保保存批注和恢复批注无误
        dwgIn(obj) {
            this.onDwgIn(obj)
            this.pt1.copy(obj['pt1'])
            this.pt2.copy(obj['pt2'])
            return true
        }

        // 数据输出
        dwgOut(obj) {
            this.onDwgOut(obj)
            obj['pt1'] = this.pt1
            obj['pt2'] = this.pt2
            return obj
        }

        create() {
            return new CustomAnnotations()
        }
    }

    // 第一时间注册 确保在保存或者恢复批注时 该图形是存在的 使用use方法时如果没有注册会自动注册
    CustomAnnotations.register()
    // 自定义标注绘制流程函数
    async function drawCustomAnnotations() {
        // 我们需要一个绘制流程 这里使用获取点的类来获取画笔上将要点击的点
        const getPoint = new Mx.MrxDbgUiPrPoint();
       
        // 点击第一次
        let pt1 = await getPoint.go();
        if(pt1 == null){
            return;
        }
        getPoint.setBasePt(pt1.clone());
        getPoint.setUseBasePt(true);

        // 点击第二次
        let pt2 = await getPoint.go();
        if(pt2 == null){
            return;
        }

        // 示例化批注并设置两个点的坐标
        let line  = new CustomAnnotations() 
        line.pt1 = pt1;
        line.pt2 = pt2;
        // 添加到当前控件的画布中渲染
        Mx.MxFun.addToCurrentSpace(line);
    }
    // 使用use 开始绘制自定义标注
    CustomAnnotations.use()
})

```

## 保存批注和恢复批注

```ts

// 保存批注
localStorage.setItem('mx-data', Mx.MxFun.getCurrentDraw().saveMxEntityToJson());

// 恢复批注
Mx.MxFun.getCurrentDraw().loadMxEntityFromJson(localStorage.getItem('mx-data'))

```

## 批注保存到图纸中

:::tip 前提条件

+ 在服务器中是存在当前要保存的原图纸的
:::

在[MxDraw云图开发包](https://help.mxdraw.com/?pid=32&keywords=)中进入`MxDrawServer`目录

在该目录中存在一个`ini.js`文件中的`MxINI`函数中可以配置服务参数:

![MxDrawServer MxINI 配置截图](https://admin.mxdraw3d.com/images/ueditor/1602201516373053440.png)


### 启动node服务

Windows:

![Windows MxDrawServer 目录截图](https://admin.mxdraw3d.com/images/ueditor/1602630025566359552.png)

双击运行`start.bat`文件 启动node服务

Linux:

![Linux MxDrawServer 目录截图](https://admin.mxdraw3d.com/images/ueditor/1602630091471458304.png)

首先进入`Bin\Linux\Bin` 目录增加文件的执行权限

```sh
su root

chmod -R 777 *

cp -r ./mx /mx

chmod -R 777 /mx/*
```

然后进入`Bin\Linux\MxDrawServer` 目录 执行如下命令

```sh
su root
chmod -R 777 *
./node app.js
```

其中保存批注到DWG文件的接口是`savecomment`

参数:

```js
{
    filename:"保存到的DWG文件",
    savefile :"保存后的dwg",
    userConvertPath:false
}
```

你也可以参考`MxDrawServer`项目源码写出自己的后台服务。

### 前端使用



更多服务请参考[梦想云图Node.JS服务](https://help.mxdraw.com/?pid=115)

