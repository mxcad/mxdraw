---
title: Command function
author: mxcad
date: '2024-2-25'
---

## What is a command function

The mxdraw.js library provides a function that can call the drawing method by inputting some specific commands, and realize the parametric drawing function in the dynamic drawing process, which is the command function. If you want to draw a circle using the command function, you can directly invoke the circle drawing method on the command line and determine the size of the circle according to the radius parameter entered by the user.

## Implement the command function

There are the following steps to implement the command function:

1. Monitor input

Because users need to input commands when drawing in command mode, the system will immediately output prompt messages or related command messages, so you need to add input boxes and text display boxes on the page where the canvas is located. In addition, Still need to use methods [Mx.MxFun.setCommandLineInputData()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#setCommandLineInputData) to set the command line message data, Using the method of [Mx.MxFun.listenForCommandLineInput()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#listenForCommandLineInput) to listen to the dynamically updated data of command line messages, the commands set in the fetch object, etc. When listening to the user input commands and triggering the enter event, the command is automatically executed. The listening code is as follows:

```html
<input id="mxCmdText"/>
```
```js
let event = document.getElementById('mxCmdText')
// Set the command line message data (called in the callback function that listens for the onKeydown event in the input input box)
event.onkeydown = function (e) {
    Mx.MxFun.setCommandLineInputData(event.value, e.keyCode)
}
```
### Write a drawing function

When using the command function, in the process of writing the drawing function, you can call the `setMessage` method to prompt the user with the necessary operation information and obtain the user's input information or keywords. Here is an example of drawing a line segment function:
```js
// Line segment function
async function BR_Line() {
  const getPoint = new Mx.MrxDbgUiPrPoint();
  // Interactive prompt
  getPoint.setMessage("\n Specifies the starting point of a line:");
  getPoint.go(async (status:number)=>{
    if(status != Mx.MrxDbgUiPrBaseReturn.kOk) return
    let pt1 = getPoint.value();
    let line = new Mx.MxDbLine();
    line.pt1 = pt1;
    getPoint.setMessage("\n Specifies the end of the line:");
    getPoint.setUserDraw((pt:any,pw:any)=>{
        line.pt2 = pt;
        pw.drawCustomEntity(line)
  });
  line.pt2 = await getPoint.go();
  Mx.MxFun.getCurrentDraw().addMxEntity(line);
})
}
```
### Registration command

Will write a good draw function through [Mx. MxFun. AddCommand()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#addCommand) method to register the order.

```js
// Register command name BR_Line: indicates the name of the command
Mx.MxFun.addCommand("BR_Line", ()=> {
  // Whether a command is running
  if(Mx.MxFun.isRunningCommand()) {
      return
  }
  // Target drawing function
  BR_Line()
})
```
### Execute commands and output messages

After registering the target command, Users can through [Mx.MxFun.sendStringToExecute()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#sendStringToExecute) method Execute the entered command. In addition, Users can also through [Mx.MxFun.listenForCommandLineInput()](https://mxcad.github.io/mxdraw_api_docs/classes/MxFun.html#listenForCommandLineInput) method outputs prompt messages or command content as required.

```js
// Manual command execution
Mx.MxFun.sendStringToExecute("Target command");

// Listen for a command prompt that is being drawn
Mx.MxFun.listenForCommandLineInput(({ msCmdTip, msCmdDisplay, msCmdText }) => {
  console.log(msCmdTip, msCmdDisplay, msCmdText)
})
```

Effect:
* Register the target command
* After entering the command, the enter event is triggered to execute the command automatically or manually
* Plot according to command line prompts

<demo :url="$withBase('/samples/commandMode/basedOnnUsing.html')" />   

The full sample code is as follows:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MxDbLine Give an example</title>
    <script src="https://unpkg.com/mxdraw/dist/mxdraw.umd.js"></script>
</head>

<body>
    <div style="height: 80vh; overflow: hidden;">
        <canvas id="mxdraw"></canvas>
    </div>
    <div>
        <textarea id="mxCmdArea" rows="5" style="width:100%;overflow: scroll;" 
        placeholder="Commands:" readonly></textarea>
        <input type="text" id="mxCmdText" />
    </div>
</body>
<script type="module">
    Mx.loadCoreCode().then(async () => {
        // Create a control object
        Mx.MxFun.createMxObject({
            canvasId: "mxdraw", // id of the canvas element
        });
    })
    let event = document.getElementById('mxCmdText')
    // Set the command line message data (called in the callback function that listens for the onKeydown event in the input input box)
    event.onkeydown = function (e) {
        Mx.MxFun.setCommandLineInputData(event.value, e.keyCode)
    }
    // Linear function
    async function BR_Line() {
        const getPoint = new Mx.MrxDbgUiPrPoint();
        // Interactive prompt
        getPoint.setMessage("\n specifies the start of a line :");
        let pt1 = await getPoint.go();
        if (!pt1) return
        let line = new Mx.MxDbLine();
        line.pt1 = pt1;
        getPoint.setMessage("\n Specifies the end of the line:");
        getPoint.setUserDraw((pt, pw) => {
            line.pt2 = pt;
            pw.drawCustomEntity(line)
        });
        const pt2 = await getPoint.go()
        if (!pt2) return
        line.pt2 = pt2;
        Mx.MxFun.getCurrentDraw().addMxEntity(line);
    }
    // Registration naming
    Mx.MxFun.addCommand("BR_Line", () => {
        // Whether a command is running
        if (Mx.MxFun.isRunningCommand()) {
            return
        }
        BR_Line()
    })
    // Listen for a command prompt that is being drawn
    Mx.MxFun.listenForCommandLineInput(({ msCmdTip, msCmdDisplay, msCmdText }) => {
        console.log(msCmdTip, msCmdDisplay, msCmdText)
        document.getElementById('mxCmdArea').innerHTML = msCmdTip
        document.getElementById("mxCmdArea").scrollTop = document.getElementById("mxCmdArea").scrollHeight;
    })

</script>

</html>
```