export default {
    mounted(el, binding, vnode) {
        el.addEventListener('click', () => {
            vnode.dirs[0].instance[binding.value].instance.show();
        })
    }
}
