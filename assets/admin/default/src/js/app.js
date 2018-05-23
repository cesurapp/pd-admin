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
require('./modules/modal');
require('./modules/content-nav');
require('./modules/datepicker');


/**==================================
 Page Load
 ==================================*/
$(document).ready(function () {
  /**
   * Main Navigation Auto Position
   */
  $('#nav_main').find('> ul > li').hover(function () {
    var list = $(this).find('ul');
    if (list.length >= 1) {
      var listHeight = list.outerHeight();
      var overflow = $(document).height() - this.offsetTop;

      if (overflow < listHeight) {
        if (this.offsetTop > listHeight) {
          list.css('top', 'auto');
          list.css('bottom', '0');
        } else {
          list.css('top', '-' + (listHeight - overflow) + 'px');
        }
      }
    }
  });

  /**
   * Custom Select
   */
  $('select').SumoSelect({
    search: true,
    placeholder: lang['search_placeholder'],
    searchText: lang['search_text'],
    captionFormat: lang['select_caption'],
    captionFormatAllSelected: lang['select_caption_all'],
    noMatch: lang['select_no_matches']
  });

});