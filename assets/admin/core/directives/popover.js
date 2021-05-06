export default {
    mounted(el, binding) {
        let config = {
            html: true,
            placement: 'auto',
            trigger: 'focus',
        };

        if (binding.value) {
            config.content = binding.value;
        }

        new binding.instance.bootstrap.Popover(el, config);
    }
}
