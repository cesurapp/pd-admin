export default {
    mounted(el, binding) {
        el.nextElementSibling.innerHTML = el.value;
        el.addEventListener('input', (e) => {
            e.target.nextElementSibling.innerHTML = e.target.value;
        })
    }
}
