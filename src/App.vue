<template>
  <div id="parent-view">
    <resizable-view>
      <resizable-item style="background-color:bisque;" size="30%"></resizable-item>
      <resizable-item style="background-color:blanchedalmond;" size="70%" sliderbar-size="0px">
        <!-- <resizable-view direction="vertical">
        <resizable-item style="background-color:burlywood;" size="50%">
          <resizable-view>
            <resizable-item style="background-color:blueviolet;" :min-size="200"></resizable-item>
            <resizable-item style="background-color:cornflowerblue" :sliderbar-size="0"></resizable-item>
          </resizable-view>
        </resizable-item>
        <resizable-item style="background-color:chocolate;" size="30%"></resizable-item>
        <resizable-item style="background-color:coral;" size="20%" :sliderbar-size="0"></resizable-item>
      </resizable-view> -->
      </resizable-item>
    </resizable-view>
  </div>
</template>

<script>
import ResizableView from './components/ResizableView.vue'
import ResizableItem from './components/ResizableItem.vue'

export default {
  name: 'App',
  components: {
    ResizableView,
    ResizableItem
  }
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
