let Encore              = require('@symfony/webpack-encore');
let CopyWebpackPlugin   = require('copy-webpack-plugin');

/**
 * Admin Global Requirements
 */
Encore
  .setOutputPath('public/build/admin/_global')
  .setPublicPath('/build/admin/_global')

  // Add Entry
  .addEntry('ace', './assets/admin/_global/js/ace.js')

  // Config
  .cleanupOutputBeforeBuild()
;

let adminGlobalRequirements = Encore.getWebpackConfig();
Encore.reset();

/**
 * Admin Default Theme
 */
Encore
  .setOutputPath('public/build/admin/default/')
  .setPublicPath('/build/admin/default')

  // Add Entry
  .addEntry('app', './assets/admin/default/js/app.js')
  .createSharedEntry('vendor', ['jquery'])

  // Copy Static Files
  .addPlugin(new CopyWebpackPlugin([
    {from: './assets/admin/default/preview.png', to: ''},
    {from: './assets/admin/default/xmlstyle.xml', to: ''}
  ]))

  // Configs
  .autoProvidejQuery()
  .enableSassLoader()
  .enablePostCssLoader()
  .enableSourceMaps(!Encore.isProduction())
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableVersioning(false)
;

let adminDefault = Encore.getWebpackConfig();
Encore.reset();


//-- Export Modules --//
module.exports = [adminGlobalRequirements, adminDefault];
