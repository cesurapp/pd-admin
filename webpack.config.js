let Encore              = require('@symfony/webpack-encore');
let CopyWebpackPlugin   = require('copy-webpack-plugin');

/**=========================
 Admin Global Requirements
 =========================*/
Encore
  .setOutputPath('public/build/admin/_global')
  .setPublicPath('/build/admin/_global')

  // Add Entry
  .addEntry('ace', './assets/admin/_global/js/ace.js')
  .addEntry('chartjs', 'chart.js/dist/Chart.min.js')

  // Config
  .cleanupOutputBeforeBuild()
;

let adminGlobalRequirements = Encore.getWebpackConfig();
Encore.reset();

/**=========================
 Admin Default Theme
 =========================*/
Encore
  .setOutputPath('public/build/admin/default/')
  .setPublicPath('/build/admin/default')

  // Add Entry
  .addEntry('app', './assets/admin/default/js/app.js')
  .addEntry('vendor', './assets/admin/default/js/vendor.js')
  .addStyleEntry('bootstrap', './assets/admin/default/scss/custom-bootstrap.scss')

  // Copy Static Files
  .addPlugin(new CopyWebpackPlugin([
    {from: './assets/admin/default/preview.png', to: ''},
    {from: './assets/admin/default/xmlstyle.xml', to: ''}
  ]))

  // Configs
  .addLoader({
    test: /vendor\/.+\.(jsx|js)$/, loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
  })
  .enableSassLoader()
  .enablePostCssLoader()
  .enableSourceMaps(!Encore.isProduction())
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableVersioning(false)
;

let adminDefault = Encore.getWebpackConfig();
Encore.reset();


/**=========================
 Auth Default Theme
 =========================*/
Encore
  .setOutputPath('public/build/auth/default/')
  .setPublicPath('/build/auth/default')

  // Add Entry
  .addStyleEntry('app', './assets/auth/default/scss/app.scss')

  // Copy Static Files
  .addPlugin(new CopyWebpackPlugin([
    {from: './assets/auth/default/preview.png', to: ''}
  ]))

  // Configs
  .enableSassLoader()
  .enablePostCssLoader()
  .enableSourceMaps(!Encore.isProduction())
  .cleanupOutputBeforeBuild()
  .enableVersioning(false)
;

let authDefault = Encore.getWebpackConfig();
Encore.reset();


//-- Export Modules --//
module.exports = [adminGlobalRequirements, adminDefault, authDefault];
