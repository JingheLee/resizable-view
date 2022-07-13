# ResizableView 

## 功能说明  
借助组件可以实现拖动滑动条改变布局大小，目前实现了横向、纵向效果，支持嵌套使用。

演示效果：  
![](https://github.com/JingheLee/resizable-view/tree/master/demo/gif/3.gif)

## 安装与使用
* ### 安装
```
npm install resizable-view
```
* ### 引入项目
``` javascript
import {createApp} from 'vue'
import App from './App.vue'
// 引入组件和样式表
import ResizableView from 'resizable-view'
import 'resizable-view/dist/resizable-view.css'

const app = createApp(App)
// 注册到Vue
app.use(ResizableView)

app.mount('#app')

```
* ### 横向布局
``` Vue
<template>
  <div id="parent-view">
    <resizable-view>
      <resizable-item style="background-color:bisque;" size="30%"></resizable-item>
      <resizable-item style="background-color:blanchedalmond;" size="70%" sliderbar-size="0px">
      </resizable-item>
    </resizable-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#parent-view {
  width: 100%;
  height: 100vh;
}
</style>

```
示例效果:
![](https://github.com/JingheLee/resizable-view/tree/master/demo/gif/1.gif)  

* ### 纵向布局  
这里用到了`ResizableView`组件的`direction`属性来控制布局方向，另外使用了`ResizableItem`组件的`min-size`属性来限制第一个盒子的最小高度
``` vue
<template>
  <div id="parent-view">
    <resizable-view direction="vertical">
      <resizable-item style="background-color:bisque;" size="30%" min-size="100px"></resizable-item>
      <resizable-item style="background-color:blanchedalmond;" size="70%" sliderbar-size="0px">
      </resizable-item>
    </resizable-view>
  </div>
</template>

<script>


export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#parent-view {
  width: 100%;
  height: 100vh;
}
</style>

```  
示例效果： 
![](https://github.com/JingheLee/resizable-view/tree/master/demo/gif/2.gif)

* ### 嵌套使用
``` Vue
<template>
  <div id="parent-view">
    <resizable-view>
      <resizable-item style="background-color:bisque;" size="30%"></resizable-item>
      <resizable-item style="background-color:blanchedalmond;" size="70%" sliderbar-size="0px">
        <resizable-view direction="vertical">
        <resizable-item style="background-color:burlywood;" size="50%">
          <resizable-view>
            <resizable-item style="background-color:blueviolet;" min-size="200px"></resizable-item>
            <resizable-item style="background-color:cornflowerblue" sliderbar-size="0px"></resizable-item>
          </resizable-view>
        </resizable-item>
        <resizable-item style="background-color:chocolate;" size="30%"></resizable-item>
        <resizable-item style="background-color:coral;" size="20%" sliderbar-size="0px"></resizable-item>
      </resizable-view>
      </resizable-item>
    </resizable-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#parent-view {
  width: 100%;
  height: 100vh;
}
</style>

```  
示例效果：
![](https://github.com/JingheLee/resizable-view/tree/master/demo/gif/3.gif)

## 属性说明
* ### ResizableView 组件

| 属性 | 描述 |  
| ---- | ---- |
| direction | 控制组件分布方向<br/>* 数据类型：`String`<br/>* 可选值：`horizontal`、`vertical` <br/>* 默认值： `horizontal`|
| overflow | 控制空间内容溢出处理方式，和`css`里面的`overflow`属性取值一致，默认值`hidden`|
* ### ResizableItem 组件
  * 属性  

    | 属性 | 描述 |  
    | ---- | ---- |
    | sliderbar-color | 滑动条的背景颜色，`String`类型，默认值`#ccc` |
    | sliderbar-hover-color | 鼠标经过滑动条时的背景颜色，`String`类型，默认值`#999` |
    | sliderbar-size | 滑动条宽度/高度，`String`类型，默认值`5px`<br/>建议最后一个`ResizableItem` 设置为`0px` |
    | size | `ResizableItem`的宽度/高度，`String`类型，默认值`50%` |
    | min-size | `ResizableItem`的最小宽度/最小高度，`String`类型，默认值`0px` |   

  * 事件  

    | 事件 | 描述 |
    | ---- | ---- |
    | onItemResize(width,height) | 在 `ResizableItem` 调整大小的时触发,传入组件最新的宽、高值 |

## 演示项目
[下载地址](https://github.com/JingheLee/resizable-view/tree/master/demo/demo.zip)  
  
    
      
      