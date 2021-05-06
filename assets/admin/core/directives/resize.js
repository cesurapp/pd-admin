export default {
    mounted(el, binding) {
        const callback = binding.value;

        const observer = new ResizeObserver(callback);
        observer.observe(el);

        el._onResize = observer;
    },
    unmounted(el) {
        if (!el._onResize) return

        el._onResize.unobserve(el);
        delete el._onResize;
    }
}

