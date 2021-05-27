export default {
    mounted(el, binding, vnode) {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let href = el.hasAttribute('href') ? el.getAttribute('href') : null;
            vnode.dirs[0].instance[binding.value].show(href);
        })
    }
}
