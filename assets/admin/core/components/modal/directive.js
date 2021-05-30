export default {
    mounted(el, binding, vnode) {
        el.addEventListener('click', () => {
            console.log(vnode.dirs);
            vnode.dirs[0].instance[binding.value].instance.show();
        })
    }
}
