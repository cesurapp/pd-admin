// Load Air Datepicker
require('air-datepicker/dist/js/datepicker.min');
require('air-datepicker/dist/js/i18n/datepicker.en');

// Custom Language
(function ($) {
  $.fn.datepicker.language['tr'] = {
    days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    daysShort: ['Pzr', 'Pts', 'Sal', 'Çrş', 'Prş', 'Cum', 'Cts'],
    daysMin: ['Pz', 'Pt', 'Sl', 'Çr', 'Pr', 'Cm', 'Ct'],
    months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Hazıran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    monthsShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    today: 'Bugün',
    clear: 'Temizle',
    dateFormat: 'mm/dd/yyyy',
    timeFormat: 'hh:ii aa',
    firstDay: 0
  };
})(jQuery);

// Load Date Time Picker
$(function () {
  $.each($('[data-picker=date]'), function (index, el) {
    $(el)
      .datepicker({
        todayButton: new Date(),
        autoClose: true,
        language: 'tr',
        position: 'top left',
        dateFormat: 'yyyy-mm-dd',
        timeFormat: 'hh:ii',
        timepicker: false
      })
      .data('datepicker')
      .selectDate(new Date(el.getAttribute('value')));
  });

  $.each($('[data-picker=datetime]'), function (index, el) {
    $(el)
      .datepicker({
        todayButton: new Date(),
        autoClose: true,
        language: 'tr',
        position: 'top left',
        dateFormat: 'yyyy-mm-dd',
        timeFormat: 'hh:ii',
        timepicker: true
      })
      .data('datepicker')
      .selectDate(new Date(el.getAttribute('value').replace(/\s/, 'T')));
  });
});
