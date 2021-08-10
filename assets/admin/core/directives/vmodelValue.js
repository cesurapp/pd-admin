export default {
    beforeMount(el, binding, vnode) {
        let val = null;
        let id = el.tagName === 'DIV' ? el.querySelector('input').id : el.id;
        let type = el.getAttribute('data-type');

        if (type === 'boolean') {
            val = Boolean(binding.value);
        } else if (type === 'date') {
            val = new Date(binding.value)
        } else {
            val = binding.value;
        }

        setTimeout(() => {
            if (el.getAttribute('type') === 'radio') {
                if (el.checked) {
                    vnode.dirs[0].instance.$root.forms[id] = val;
                }
            } else if (el.getAttribute('type') === 'checkbox') {
                vnode.dirs[0].instance.$root.forms[id] = Boolean(val);
            } else {
                vnode.dirs[0].instance.$root.forms[id] = val;
            }
        }, 10);
    }
}
