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
   * Select All Checkbox
   */
  $("[data-select-all]").change(function () {
    var self = $(this);
    var container = self.closest(self.data('select-all'));
    self.prop('checked', (self.prop('checked') == null || self.prop('checked') == true) ? false : true);
    container.find('input[type=checkbox]').prop('checked', !self.prop('checked'));
  });

  /**
   * Bootstrap Tooltip Activate
   */
  $('[data-toggle="tooltip"], [data-tooltip]').tooltip();


  /**
   * Bootstrap Popover
   */
  $('[data-toggle="popover"]')
    .popover({
      trigger: 'focus',
      html: true
    })
    .click(function (e) {
      e.preventDefault();
    });


  /**
   * Element Change Event to Other Element
   */
  $('[data-change]').change(function () {
    var element = this.getAttribute('data-change');
    var url = this.getAttribute('data-change-url') + '/' + this.value;

    // Send Ajax
    var option = '';
    $.getJSON(url, function (response) {
      $.each(response, function (key, value) {
        option += '<option value="' + key + '">' + value + '</option>';
      });

      // Write Element
      $(element).html(option);

      // Reload Sumoselect
      $(element)[0].sumo.reload();
    });
  });

  /**
   * Range Value Writer
   */
  $(document).on('input change', '[data-range]', function() {
    $(this).parent().next().html(this.value)
  });
});
