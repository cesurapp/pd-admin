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
  $('[data-modal]').click(function (e) {
    // Stop Propagation
    e.preventDefault();

    // Modal Variable
    var self = $(this);
    var modal_title = self.data('modal-title'),
      modal_body = self.data('modal-body'),
      modal_width = self.data('modal-width'),
      template =
        '<div class="fade modal confirm" id="confirmModal" tabindex="-1">' +
          '<div class="modal-dialog {modalWidth}">' +
            '<div class="modal-content">' +
              '<div class="modal-header"><h4 class="modal-title"><i class="material-icons text-warning">{modalTitle}</i></h4></div>' +
              '<div class="modal-body">{modalBody}</div>' +
              '<div class="modal-footer">' +
                '<button type="button" id="btnNo" class="btn btn-light no" data-dismiss="modal">{btnNo}</button>' +
                '<button type="button" id="btnYes" class="btn btn-success yes" >{btnYes}</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

    // Set Content
    template = template.replace('{modalTitle}', modal_title ? modal_title : 'warning');
    template = template.replace('{modalBody}', modal_body ? modal_body : lang['popup_delete_message']);
    template = template.replace('{btnNo}', lang['btn_close']);
    template = template.replace('{btnYes}', lang['btn_yes']);
    template = template.replace('{modalWidth}', modal_width ? modal_width : 'modal-sm');

    // Write
    var mdl = $('#modals').html(template);

    /**
     * Confirm
     */
    if (self.data('modal') === 'confirm') {
      mdl.off('click', '#btnYes');
      mdl.on('click', '#btnYes', function () {
        window.location.href = self.attr('href');
      });
    }

    /**
     * Confirm Form Submit
     */
    if (self.data('modal') === 'confirm-form') {
      mdl.off('click', '#btnYes');
      mdl.on('click', '#btnYes', function () {
        var form = $(self.data('form'));
        form.attr('action', self.attr('href') ? self.attr('href') : self.data('href'));
        form.submit();
      });
    }

    // Show Modal
    $('#confirmModal').modal();
  });
});