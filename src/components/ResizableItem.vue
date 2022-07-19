<template>
    <div ref="item" :class="['rv-container','rv-rect','rv-scale']" :style="itemStyle">
        <div ref="content" :class="['rv-rect']" :style="contentStyle">
        <slot></slot>
        </div>
        <div ref="slideBar" :class="['rv-rect']" :style="slideBarStyle" @mouseenter="onMouseEnter" @mouseout="onMouseOut"></div>
    </div>
</template>

<script>
export default {
    name: 'ResizableItem',
    mounted() {
        this.direction = this.$parent.direction
    },
    props: {
        sliderbarColor: {
            type: String,
            default: '#ccc'
        },
        sliderbarHoverColor: {
            type: String,
            default: '#999'
        },
        sliderbarSize: {
            type: String,
            default: '5px'
        },
        size:{
            type:String,
            default:'50%'
        },
        minSize:{
            type:String,
            default:'0px'
        }
    },
    emits:['onItemResize'],
    data(){
        return {
            direction: 'horizontal'
        }
    },
    computed: {
        slideBarStyle() {
            let style = { backgroundColor: this.$props.sliderbarColor }
            if (this.direction === 'vertical'){
                style.height = this.$props.sliderbarSize
                style.cursor = 'ns-resize'
            }
            else{
                style.width = this.$props.sliderbarSize 
                style.cursor = 'ew-resize'
            }

            return style
        },
        contentStyle() {
            let style = {}
            if (this.direction === 'vertical')
                style.height = `calc(100% - ${this.$props.sliderbarSize})`
            else
                style.width = `calc(100% - ${this.$props.sliderbarSize})`
            return style
        },
        itemStyle() {
            let style = {}
            if (this.direction === 'vertical'){
                style.height = this.$props.size
                style.minHeight = this.$props.minSize
                style.flexDirection = 'column'
            }
            else{
                style.width = this.$props.size
                style.minWidth = this.$props.minSize
                style.flexDirection = 'row'

            }
            return style
        }
    },
    methods:{
        onMouseEnter(){
            this.$refs.slideBar.style.backgroundColor = this.$props.sliderbarHoverColor
        },
        onMouseOut(){
            this.$refs.slideBar.style.backgroundColor = this.$props.sliderbarColor
            this.$emit('item-resize',this.$refs.item.clientWidth,this.$refs.item.clientHeight)
        }
    }
}
</script>
