export default {
    mounted(el, binding, vnode) {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let message = el.getAttribute('data-msg');
            let yes = el.getAttribute('data-yes')
            let no = el.getAttribute('data-no')

            vnode.dirs[0].instance.confirm[binding.value](message, yes, no).then((result) => {
                // Call Method
                if (vnode.props.hasOwnProperty('onConfirmed')) {
                    vnode.props.onConfirmed();
                    return;
                }

                // Go Link
                if (!el.hasAttribute('confirmed') && el.hasAttribute('href')) {
                    window.location.href = el.getAttribute('href');
                }
            })
        })
    }
}
