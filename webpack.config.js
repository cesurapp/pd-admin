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
  .setOutputPath('public/build/admin/')
  .setPublicPath('/build/admin')

  // Copy Static Files
  .copyFiles({
    from: './assets/admin/static'
  })

  // Add JS Entry
  .addEntry('app', './assets/admin/js/app.js')
  .addEntry('vendor', './assets/admin/js/vendor.js')

  // JS Plugins
  .addEntry('plugin/ace', './assets/admin/js/plugin/ace.js')
  .addEntry('plugin/chart', 'chart.js/dist/Chart.min.js')

  // Authorization Page
  .addStyleEntry('auth/auth', './assets/admin/scss/auth.scss')

  // Configs
  .enableSassLoader()
  .enablePostCssLoader()
  .enableSourceMaps(!Encore.isProduction())
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableVersioning(false)
  .disableSingleRuntimeChunk();

module.exports = Encore.getWebpackConfig();
