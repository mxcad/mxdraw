---
title: 数据保存
author: mxcad
date: '2023-5-9'
---

用户在网页中浏览标注DWG图纸之后，会在图纸上进行审图批注，批注的内容会保存到服务器或原图纸中，下面我们将讲一下在线浏览标注DWG图纸后保存批注信息的方法。

## 批注保存到服务器的数据库中

第一种方式是将图纸中的批注或绘图数据通过 [Mx.MxFun.getCurrentDraw().saveMxEntityToJson()](https://mxcad.github.io/mxdraw_api_docs/classes/MxDrawObject.html#saveMxEntityToJson) 方法转换为JSON字符串保存到服务器的数据库中，当再次打开这张图纸的时候，再去请求得到对应的批注数据，通过 [MxFun.getCurrentDraw().loadMxEntityFromJson()](https://mxcad.github.io/mxdraw_api_docs/classes/MxDrawObject.html#loadMxEntityFromJson) 方法在前端页面中直接恢复对应的批注或绘图数据。

```ts

// 保存批注
localStorage.setItem('mx-data', Mx.MxFun.getCurrentDraw().saveMxEntityToJson());

// 恢复批注
Mx.MxFun.getCurrentDraw().loadMxEntityFromJson(localStorage.getItem('mx-data'))

```

## 批注保存到图纸中

第二种方式是将图纸上的批注或绘图内容直接保存到图纸上, 该种方式需在服务器中提前保存目标图纸的原图纸。我们提供了一个应用程序能够将批注或绘图内容与目标图纸合并保存，下面是其操作步骤：

1. 配置

在[MxDraw云图开发包](https://help.mxdraw.com/?pid=32&keywords=)中进入`MxDrawServer`目录

在该目录中存在一个`ini.js`文件中的`MxINI`函数中可以配置服务参数:

![MxDrawServer MxINI 配置截图](https://admin.mxdraw3d.com/images/ueditor/1602201516373053440.png)

2. 启动node服务

* Windows系统:

![Windows MxDrawServer 目录截图](https://admin.mxdraw3d.com/images/ueditor/1602630025566359552.png)

双击运行`start.bat`文件 启动node服务

* Linux系统:

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

其中保存批注到DWG文件的接口是`savecomment`，其参数如下:

```js
{
    filename:"保存到的DWG文件",
    savefile :"保存后的dwg",
    userConvertPath:false
}
```

你也可以参考`MxDrawServer`项目源码写出自己的后台服务。

## 其他

更多服务请参考[梦想云图Node.JS服务](https://help.mxdraw.com/?pid=115)

