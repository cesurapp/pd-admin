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
 Modules
 ==================================*/
require('./modules/directive');
require('./modules/ajax');
require('./modules/modal');
require('./modules/content-nav');
require('./modules/datepicker');
require('./modules/menu');
require('./modules/dashboard');

/**==================================
 Page Load
 ==================================*/
$(document).ready(function () {
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
