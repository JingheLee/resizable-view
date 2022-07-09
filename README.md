# ResizableView 组件

## 功能说明  
借助组件可以实现拖动滑动条改变布局大小，目前实现了横向、纵向效果，可嵌套使用，效果接近完美。


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
* ### 快速入门
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
实现效果  
<iframe src="./video/1.mp4">

## 属性说明
* ### ResizableView 组件

| 属性 | 描述 |  
| ---- | ---- |
| direction | 控制组件分布方向<br/>* 数据类型：`String`<br/>* 可选值：`horizontal`、`vertical` <br/>* 默认值： `horizontal`|
| overflow | 控制空间内容溢出处理方式，和`css`里面的`overflow`属性取值一致，默认值`hidden`|
* ### ResizableItem 组件

| 属性 | 描述 |  
| ---- | ---- |
| sliderbar-color | 滑动条的背景颜色，`String`类型，默认值`#ccc` |
| sliderbar-hover-color | 鼠标经过滑动条时的背景颜色，`String`类型，默认值`#999` |
| sliderbar-size | 滑动条宽度/高度，`String`类型，默认值`5px`<br/>建议最后一个`ResizableItem` 设置为`0px` |
| size | `ResizableItem`的宽度/高度，`String`类型，默认值`50%` |
| min-size | `ResizableItem`的最小宽度/最小高度，`String`类型，默认值`5px` |
