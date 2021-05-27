export default {
    install(app, options) {
        app.mixin(require('./router').default)
        app.mixin(require('./dateFormatter').default)
    }
}
