/**
 * Load Symfony Encore
 *
 * @type {Encore|Proxy}
 */
let Encore = require('@symfony/webpack-encore');

/**
 * Admin Assets Config
 */
Encore
    // Set Output Path
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    // Entry
    .addEntry('admin/app', './assets/admin/app.js')
    .addStyleEntry('admin/main', './assets/admin/app.scss')
    .addStyleEntry('auth', './assets/auth/auth.scss')

    // Configs
    .enableVueLoader(() => {}, { runtimeCompilerBuild: false })
    .enableSassLoader()
    .enablePostCssLoader()
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableBuildNotifications()

module.exports = Encore.getWebpackConfig();
