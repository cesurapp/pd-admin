function defaultConditional () {
    return true
}

function directive(e, el, binding) {
    const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler
    const isActive = (typeof binding.value === 'object' && binding.value.closeConditional) || defaultConditional

    if (!e || isActive(e) === false) return
    if (('isTrusted' in e && !e.isTrusted) ||
        ('pointerType' in e && !e.pointerType)
    ) return

    const elements = ((typeof binding.value === 'object' && binding.value.include) || (() => []))()
    elements.push(el)

    !elements.some(el => el.contains(e.target)) && setTimeout(() => {
        isActive(e) && handler && handler(e)
    }, 0)
}

export default {
    mounted(el, binding) {
        const onClick = (e) => directive(e, el, binding)
        const app = document.querySelector('#app') || document.body

        app.addEventListener('click', onClick, true)
        el._clickOutside = onClick
    },
    unmounted(el) {
        if (!el._clickOutside) return

        const app = document.querySelector('[data-app]') || document.body
        app && app.removeEventListener('click', el._clickOutside, true)
        delete el._clickOutside
    },
}
