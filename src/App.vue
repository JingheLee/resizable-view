<template>
  <div id="parent-view">
  <resizable-view>
    <resizable-item ref="left" @item-resize="onItemResize">
      <div v-html="view" ref="root"></div>
    </resizable-item>
    <resizable-item></resizable-item>
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
  },
  data(){
    return {
      'view':`<div class="class-1">
                <div id="id-1" width="100" height="200" style="100px;height:200px;"></div>
              </div>
              <div class="class-1"></div>`
    }
  },
  methods:{
    onItemResize(width,height,item){
      console.log(width,height,item)
      console.log(this.$refs.left.getSize())
    }
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
