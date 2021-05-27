export default function (config, apps) {
    // Remove Vue Script Tags
    document.querySelectorAll('[data-type="vue"]').forEach((scripts) => scripts.remove());

    // Add Script Src to Head
    document.querySelectorAll('[data-type="script"]').forEach((script) => {
        let hs = document.createElement('script');
        hs.setAttribute('src', script.getAttribute('src'))
        document.head.appendChild(hs);
        script.remove();
    })

    let merged = {};
    apps.forEach((app) => {
        for (const [key, value] of Object.entries(app)) {
            merged[key] = (merged[key] || []).concat(value);
        }
    })

    for (const [key, value] of Object.entries(merged)) {
        if (key === 'data') {
            merged[key] = Object.assign({}, ...value.map((x) => x()));
            config.data = () => merged[key];
        }
        if (key === 'emits') {
            config.emits = [].concat(value);
        }

        if (key === 'computed') {
            config.computed = Object.assign({}, ...value)
        }
        if (key === 'methods') {
            config.methods = Object.assign({}, ...value)
        }
        if (key === 'watch') {
            config.watch = Object.assign({}, ...value)
        }

        if (['computed', 'methods', 'watch'].indexOf(key) !== -1) {
            config[key] = Object.assign({}, ...value)
        }

        if (['beforeCreate', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'activated',
            'deactivated', 'beforeUnmount', 'unmounted'].indexOf(key) !== -1) {
            config[key] = () => value.forEach((f) => f());
        }
    }
}
