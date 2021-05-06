export default {
    beforeMount(el, binding, vnode) {
        let val = binding.value;
        let type = el.getAttribute('data-type');

        if (type === 'boolean') {
            console.log(val);
            val = Boolean(val);
        }

        vnode.dirs[0].instance.forms[`${el.id}`] = val;
    }
}
