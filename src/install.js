import ResizableView from './components/ResizableView.vue'
import ResizableItem from './components/ResizableItem.vue'

const components = [ResizableView, ResizableItem]
function install(Vue) {
    if (install.installed) return
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue)
    install(window.Vue)

export default {
    install,
    ResizableView,
    ResizableItem
}