export default {
    install(app, options) {
        app.component('http', require('../config/http').default);

        app.component('modal', require('./modal').default);
        app.directive('modal', require('./modal/directive').default);

        app.component('off-canvas', require('./offcanvas').default);
        app.directive('off-canvas', require('./offcanvas/directive').default);

        app.component('confirm', require('./confirm').default);
        app.directive('confirm', require('./confirm/directive').default);

        app.component('message', require('./message').default);
        app.component('progress-bar', require('./progress').default);

        app.component('upload', require('./upload').default);
        app.component('datatable', require('./datatable').default);
        app.component('datepicker', require('./datepicker').default);
        app.component('paginator', require('./paginator').default);

        app.component('pd-checkbox', require('./forms/checkbox').default);
        app.component('pd-switch', require('./forms/switch').default);
        app.component('pd-radio', require('./forms/radio').default);
        app.component('pd-select', require('./forms/select').default);
        app.component('pd-input', require('./forms/input').default);
        app.component('pd-range', require('./forms/range').default);
        app.component('pd-color', require('./forms/colorpicker').default);

        app.use(require('vue-slicksort').plugin)
    }
}
