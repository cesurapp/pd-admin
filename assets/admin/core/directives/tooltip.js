export default {
    mounted(el, binding) {
        new binding.instance.bootstrap.Tooltip(el);
    }
}
