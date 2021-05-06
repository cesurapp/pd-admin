export default {
    install(app, options) {
        /**
         * ============
         * Setup Bootstrap
         * ============
         */
        app.config.globalProperties.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min');

        /**
         * ============
         * Setup Global Directives
         * ============
         */
        app.use(require('./directives').default);

        /**
         * ============
         * Init Component
         * ============
         */
        app.component('modal', require('./components/modal').default);
        app.directive('modal', require('./components/modal/directive').default);
        app.component('data-table', require('./components/datatable').default);

        /**
         * ============
         * Init Core Layout
         * ============
         */
        app.component('app-core', {
            'name': 'AppCore',
            template: `
                <http></http>
                <message></message>
                <progress-bar></progress-bar>
            `,
            components: {
                'message': require('./components/message').default,
                'progress-bar': require('./components/progress').default,
                'http': require('./config/http').default
            },
        });
    }
}
