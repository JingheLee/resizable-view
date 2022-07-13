<template>
    <div ref="resizableView" :class="['rv-container', 'rv-rect']" :style="resizableViewStyle" @mouseup="onMouseUp"
        @mousemove="onMouseMove">
        <slot></slot>
    </div>
</template>

<script>
import '@/assets/styles/ResizableView.css'
export default {
    name: "ResizableView",
    props: {
        direction: { type: String, default: 'horizontal' },
        maxSize: { type: String, default: '100%' },
        overflow: { type: String, default: 'hidden' }
    },
    data() {
        return {
            resizable: false,
            target: null,
            targetFlag: 'current',
            targetX: 0,
            targetY: 0,
            targetWidth: 0,
            targetHeight: 0
        }
    },
    methods: {
        onMouseDown(e) {
            this.resizable = true

            this.target = e.target.parentNode
            this.targetX = e.clientX
            this.targetY = e.clientY
            this.targetWidth = this.target.clientWidth
            this.targetHeight = this.target.clientHeight
            this.target.setAttribute('flag', this.targetFlag)

        },
        onMouseMove(e) {
            if (this.resizable) {
                // 获取当前盒子索引
                let children = this.$el.children
                let currentIndex = 0
                for (let i = 0; i < children.length; i++) {
                    let flag = children[i].getAttribute('flag')
                    if (flag === this.targetFlag) {
                        currentIndex = i
                    }
                }

                /**
                 * 根据方向计算尺寸
                 */
                if (this.direction === 'vertical') {
                    // 计算排在当前盒子前面的所有盒子高度
                    let headBoxSize = 0
                    for (let i = 0; i < currentIndex; i++)
                        headBoxSize += children[i].clientHeight
                    // 计算排在当前盒子后面的所有盒子高度
                    let tailBoxMinHeight = 0
                    let tailBoxSize = 0
                    for (let i = currentIndex + 1; i < children.length; i++){
                        tailBoxSize += children[i].clientHeight
                        tailBoxMinHeight += parseFloat(children[i].style.minHeight)
                    }
                    // 设置目标盒子高
                    let distance = e.clientY - this.targetY
                    let targetHeight = this.targetHeight + distance
                    if(this.$refs.resizableView.clientHeight-tailBoxMinHeight-headBoxSize<=targetHeight)
                        return
                    this.target.style.height = `${targetHeight}px`

                    let surplus = this.$refs.resizableView.clientHeight - this.target.clientHeight - headBoxSize - tailBoxMinHeight
                    for (let i = currentIndex + 1; i < children.length; i++){
                        let tailBoxHeight = surplus * (children[i].clientHeight-parseFloat(children[i].style.minHeight)) / (tailBoxSize-tailBoxMinHeight)
                        tailBoxHeight += parseFloat(children[i].style.minHeight)
                        children[i].style.height = `${tailBoxHeight}px`
                    }
                } else {
                    // 计算排在当前盒子前面的所有盒子宽度
                    let headBoxSize = 0
                    for (let i = 0; i < currentIndex; i++)
                        headBoxSize += children[i].clientWidth
                    // 计算排在当前盒子后面的所有盒子宽度
                    let tailBoxSize = 0
                    let tailBoxMinWidth = 0
                    for (let i = currentIndex + 1; i < children.length; i++){
                        tailBoxSize += children[i].clientWidth
                        tailBoxMinWidth += parseFloat(children[i].style.minWidth)
                    }
                    // 设置目标盒子宽度
                    let distance = e.clientX - this.targetX
                    let targetWidth = this.targetWidth + distance

                    if(this.$refs.resizableView.clientWidth-headBoxSize-tailBoxMinWidth<=targetWidth)
                        return
                    this.target.style.width = `${targetWidth}px`
                    let surplus = this.$refs.resizableView.clientWidth - this.target.clientWidth - headBoxSize-tailBoxMinWidth
                    for (let i = currentIndex + 1; i < children.length; i++){
                        let tailBoxWidth = surplus * (children[i].clientWidth-parseFloat(children[i].style.minWidth)) / (tailBoxSize-tailBoxMinWidth)
                        tailBoxWidth += parseFloat(children[i].style.minWidth)
                        children[i].style.width = `${tailBoxWidth}px`
                    }
                }
            }

        },
        onMouseUp() {
            this.resizable = false

            if (this.target !== null)
                this.target.removeAttribute('flag')
        }
    },
    computed: {
        resizableViewStyle() {
            let style = { overflow: this.overflow }
            if (this.$props.direction === 'vertical') {
                style.flexDirection = 'column'
                style.maxHeight = this.$props.maxSize
            } else {
                style.flexDirection = 'row'
                style.maxWidth = this.$props.maxSize

            }
            return style
        }
    },
    mounted() {
        let children = this.$el.children
        let i = 0
        for (i = 0; i < children.length; i++) {
            children[i].children[1].onmousedown = this.onMouseDown
        }
    }
}
</script>