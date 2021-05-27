export default {
    methods: {
        route(path, vars) {
            path = decodeURIComponent(path);

            if (vars) {
                Object.keys(vars).forEach((key) => {
                    path = path.replace(key, vars[key])
                })
            }

            return path;
        }
    }
}
