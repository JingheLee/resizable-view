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
                    let distance = e.clientY - this.targetY
                    // 设置目标盒子高
                    this.target.style.height = `${this.targetHeight + distance}px`

                    // 计算排在当前盒子后面的所有盒子高度
                    let tailBoxSize = 0
                    for (let i = currentIndex + 1; i < children.length; i++)
                        tailBoxSize += children[i].clientHeight
                    // 计算排在当前盒子前面的所有盒子高度
                    let headBoxSize = 0
                    for (let i = 0; i < currentIndex; i++)
                        headBoxSize += children[i].clientHeight


                    let surplus = this.$refs.resizableView.clientHeight - this.target.clientHeight - headBoxSize
                    for (let i = currentIndex + 1; i < children.length; i++)
                        children[i].style.height = `${surplus * children[i].clientHeight / tailBoxSize}px`
                } else {

                    let distance = e.clientX - this.targetX
                    // 设置目标盒子宽度
                    this.target.style.width = `${this.targetWidth + distance}px`

                    // 计算排在当前盒子后面的所有盒子宽度
                    let tailBoxSize = 0
                    for (let i = currentIndex + 1; i < children.length; i++)
                        tailBoxSize += children[i].clientWidth
                    // 计算排在当前盒子前面的所有盒子宽度
                    let headBoxSize = 0
                    for (let i = 0; i < currentIndex; i++)
                        headBoxSize += children[i].clientWidth


                    let surplus = this.$refs.resizableView.clientWidth - this.target.clientWidth - headBoxSize
                    for (let i = currentIndex + 1; i < children.length; i++)
                        children[i].style.width = `${surplus * children[i].clientWidth / tailBoxSize}px`
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
            } else {
                style.flexDirection = 'row'
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