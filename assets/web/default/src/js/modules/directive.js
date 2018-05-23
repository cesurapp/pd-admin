/*
 * This file is part of the EmlakPRO package.
 *
 * @package     EmlakPRO
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2017 - 2018, WriteLN Yazılım Hizmetleri San. Tic. A.Ş (http://writeln.net)
 * @license     LICENSE
 * @link        http://emlakpro.net
 */

$(document).ready(function () {
  /**
   * Bootstrap Tooltip Activate
   */
  $('[data-toggle="tooltip"], [title]').tooltip();

  /**
   * Bootstrap Popover Activate
   */
  $('[data-toggle="popover"]').popover({
    trigger: 'focus',
    html: true
  });

  /**
   * Sumo Select
   */
  $('select').SumoSelect({
    search: true,
    searchText: ''
  });

  /**
   * Element Change Event
   */
  $('[data-change]').change(function () {
    var element = this.getAttribute('data-change');
    var url = this.getAttribute('data-change-url') +'/'+ this.value;

    // Send Ajax
    var option = '';
    $.getJSON(url, function (response) {
      $.each(response, function (key, value) {
        option += '<option value="'+key+'">'+value+'</option>';
      });

      // Write Element
      $(element).html(option);

      // Reload Sumoselect
      $(element)[0].sumo.reload();
    });
  });

});