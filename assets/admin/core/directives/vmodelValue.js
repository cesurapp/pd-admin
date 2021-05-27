export default {
    beforeMount(el, binding, vnode) {
        let val = null;
        let id = el.id;
        let type = el.getAttribute('data-type');

        if (type === 'boolean') {
            val = Boolean(binding.value);
        } else if (type === 'date') {
            val = new Date(binding.value)
        } else {
            val = JSON.parse(binding.value);
        }

        setTimeout(() => {
            vnode.dirs[0].instance.$root.forms[id] = val;
        }, 10);
    }
}
