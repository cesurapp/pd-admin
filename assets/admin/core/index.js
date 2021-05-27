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
         * Setup Global Mixins
         * ============
         */
        app.use(require('./mixins').default);

        /**
         * ============
         * Init Global Components
         * ============
         */
        app.use(require('./components').default);

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
                <confirm></confirm>
            `
        });
    }
}
