---
title: 命令功能
author: mxcad
date: '2024-2-25'
---

## 什么是命令功能

mxdraw.js库提供了一种可以通过输入一些特定的命令调用绘制方法，并在动态绘制过程中实现参数化绘图的功能，该种功能即为命令功能。用户若想利用命令功能绘制一个圆，可直接在命令行内调用绘圆方法，并根据用户输入圆的半径参数来确定圆的大小。

## 实现命令功能

实现命令功能主要有以下几个步骤：

### 一、监听输入

因为用户在命令模式下绘图，需要输入命令，系统会即时输出提示消息或相关命令消息，所以需要在画布所在页面添加输入框和文本显示框。此外，还需利用方法[Mx.MxFun.setCommandLineInputData()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#setCommandLineInputData)来设置命令行消息数据，利用方法[Mx.MxFun.listenForCommandLineInput()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#listenForCommandLineInput)来监听命令行消息动态更新的数据、在取点对象中设置的命令等，当监听到用户输入命令并触发enter事件时，自动执行命令。监听代码如下：

```html
<input id="mxCmdText"/>
```
```js
let event = document.getElementById('mxCmdText')
// 设置命令行消息数据 (在监听input输入框的onKeydown事件的回调函数中调用)
event.onkeydown = function (e) {
    Mx.MxFun.setCommandLineInputData(event.value, e.keyCode)
}
```
### 二、编写绘制函数

在使用命令功能时，编写绘制函数的过程中可以通过取点对象调用`setMessage`方法给用户提示必要的操作信息以及获取到使用者的输入信息或关键词。下面以绘制线段函数为例：
```js
// 线段函数
async function BR_Line() {
  const getPoint = new Mx.MrxDbgUiPrPoint();
  // 交互提示
  getPoint.setMessage("\n指定直线起点:");
  getPoint.go(async (status:number)=>{
    if(status != Mx.MrxDbgUiPrBaseReturn.kOk) return
    let pt1 = getPoint.value();
    let line = new Mx.MxDbLine();
    line.pt1 = pt1;
    getPoint.setMessage("\n指定直线终点:");
    getPoint.setUserDraw((pt:any,pw:any)=>{
        line.pt2 = pt;
        pw.drawCustomEntity(line)
  });
  line.pt2 = await getPoint.go();
  Mx.MxFun.getCurrentDraw().addMxEntity(line);
})
}
```
### 三、注册命令

将写好的绘制函数通过[Mx.MxFun.addCommand()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#addCommand)方法进行注册命令。

```js
// 注册命令名 BR_Line：命令名
Mx.MxFun.addCommand("BR_Line", ()=> {
  // 是否正在运行某个命令
  if(Mx.MxFun.isRunningCommand()) {
      return
  }
  // 目标绘制函数
  BR_Line()
})
```
### 四、执行命令、输出消息

注册好目标命令后，用户可通过[Mx.MxFun.sendStringToExecute()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#sendStringToExecute)方法手动执行输入的命令。此外，用户还可以通过[Mx.MxFun.listenForCommandLineInput()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#listenForCommandLineInput)方法按需输出提示消息或命令内容。

```js
// 手动执行命令
Mx.MxFun.sendStringToExecute("目标命令");

// 监听正在绘制中的命令提示
Mx.MxFun.listenForCommandLineInput(({ msCmdTip, msCmdDisplay, msCmdText }) => {
  console.log(msCmdTip, msCmdDisplay, msCmdText)
})
```

效果：
* 注册目标命令
* 输入命令后，触发enter事件自动执行命令或手动执行命令
* 根据命令行提示绘图

<demo :url="$withBase('/samples/commandMode/basedOnnUsing.html')" />   

完整示例代码如下：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLine 示例</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>

<body>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
    <div>
        <textarea id="mxCmdArea" rows="5" style="width:100%;overflow: scroll;" 
        placeholder="命令：" readonly></textarea>
        <input type="text" id="mxCmdText" />
    </div>
</body>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // 创建控件对象
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // canvas元素的id
        });
    })
    let event = document.getElementById('mxCmdText')
    // 设置命令行消息数据 (在监听input输入框的onKeydown事件的回调函数中调用)
    event.onkeydown = function (e) {
        Mx.MxFun.setCommandLineInputData(event.value, e.keyCode)
    }
    // 直线函数
    async function BR_Line() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        // 交互提示
        getPoint.setMessage("\n指定直线起点:");
        let pt1 = await getPoint.go();
        if (!pt1) return
        let line = new Mx.MxDbLine();
        line.pt1 = pt1;
        getPoint.setMessage("\n指定直线终点:");
        getPoint.setUserDraw((pt, pw) => {
            line.pt2 = pt;
            pw.drawCustomEntity(line)
        });
        const pt2 = await getPoint.go()
        if (!pt2) return
        line.pt2 = pt2;
        Mx.MxFun.getCurrentDraw().addMxEntity(line);
    }
    // 注册命名
    Mx.MxFun.addCommand("BR_Line", () => {
        // 是否正在运行某个命令
        if (Mx.MxFun.isRunningCommand()) {
            return
        }
        BR_Line()
    })
    // 监听正在绘制中的命令提示
    Mx.MxFun.listenForCommandLineInput(({ msCmdTip, msCmdDisplay, msCmdText }) => {
        console.log(msCmdTip, msCmdDisplay, msCmdText)
        document.getElementById('mxCmdArea').innerHTML = msCmdTip
        document.getElementById("mxCmdArea").scrollTop = document.getElementById("mxCmdArea").scrollHeight;
    })

</script>

</html>
```