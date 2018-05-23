/*
 * This file is part of the EmlakPRO package.
 *
 * @package     EmlakPRO
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2017 - 2018, WriteLN Yazılım Hizmetleri San. Tic. A.Ş (http://writeln.net)
 * @license     LICENSE
 * @link        http://emlakpro.net
 */

/**==================================
 Dependencies
 ==================================*/
window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js/dist/umd/popper.min');
require('bootstrap');
require('sumoselect');


/**==================================
 Modules
 ==================================*/
require('./modules/directive');
require('./modules/ajax');


/**==================================
 Page Load
 ==================================*/
$(document).ready(function () {

  $('table a').tooltip({
    delay: 300
  });
});