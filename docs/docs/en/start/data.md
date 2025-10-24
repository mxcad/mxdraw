---
title: Data saving
author: mxcad
date: '2023-5-9'
---

After users browse the marked DWG drawings in the web page, they will be reviewed and commented on the drawings, and the content of the annotations will be saved to the server or the original drawings. Below we will talk about the method of saving the annotation information after browsing the marked DWG drawings online.

## Comments are saved to the server's database

The first way is to pass comments or drawing data in the drawing [Mx.MxFun.getCurrentDraw().saveMxEntityToJson()](https://mxcad.github.io/mxdraw_api_docs/classes/MxDrawObject.html#saveMxEntityToJson) method converts the JSON string to the database of the server, and then requests the corresponding comment data when the drawing is opened again. pass [MxFun.getCurrentDraw().loadMxEntityFromJson()](https://mxcad.github.io/mxdraw_api_docs/classes/MxDrawObject.html#loadMxEntityFromJson)method recovers the corresponding annotation or drawing data directly in the front-end page.

```ts

// Save comment
localStorage.setItem('mx-data', Mx.MxFun.getCurrentDraw().saveMxEntityToJson());

// Recover comment
Mx.MxFun.getCurrentDraw().loadMxEntityFromJson(localStorage.getItem('mx-data'))

```

## Comments are saved to the drawing

The second method is to save the comments or drawing content on the drawing directly to the drawing, which requires the original drawing of the target drawing to be saved in advance in the server. We provide an application that can save the annotation or drawing content with the target drawing. Here is how to do it:

1. disposition

Go to the MxDrawServer directory in [MxDraw Cloud Graphics Development Kit](https://help.mxdraw.com/?pid=32&keywords=)

There is a `MxINI` function in the `ini.js` file in this directory where the service parameters can be configured:

![MxDrawServer MxINI 配置截图](https://admin.mxdraw3d.com/images/ueditor/1602201516373053440.png)

2. Start the node service

* Windows system:

![Windows MxDrawServer 目录截图](https://admin.mxdraw3d.com/images/ueditor/1602630025566359552.png)

Double-click the `start.bat` file to start the node service

* Linux system:

![Linux MxDrawServer 目录截图](https://admin.mxdraw3d.com/images/ueditor/1602630091471458304.png)

First go to the `Bin\Linux\Bin` directory to add the execution permission of the file.

```sh
su root

chmod -R 777 *

cp -r ./mx /mx

chmod -R 777 /mx/*
```

Then go to the `Bin\Linux\MxDrawServer` directory and execute the following command.

```sh
su root
chmod -R 777 *
./node app.js
```

The interface for saving comments to the DWG file is `savecomment`, with the following parameters:

```js
{
    filename:"Save to DWG file",
    savefile :"dwg after saving",
    userConvertPath:false
}
```

You can also refer to the `MxDrawServer` project source code to write your own background service.

## Other

More services please refer to [Dream Cloud map Node.JS service](https://help.mxdraw.com/?pid=115)

