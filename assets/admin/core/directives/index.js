export default {
    install(app, options) {
        app.directive('tooltip', require('./tooltip').default)
        app.directive('popover', require('./popover').default)
        app.directive('slider', require('./slider').default)
        app.directive('resize', require('./resize').default)
        app.directive('clickOutside', require('./clickOutside').default)
        app.directive('setValue', require('./vmodelValue').default)
    }
}
