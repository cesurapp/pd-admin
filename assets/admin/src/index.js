export default {
    install(app, options) {
        app.component('sidebar', require('./sidebar').default);
        app.component('dashboard', require('./dashboard').default);
        app.component('contentMenu', require('./content-menu').default);
        app.component('ajax-form', require('./ajax-form').default);
    }
}
