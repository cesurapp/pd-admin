$(function () {
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
   * Activate Parent Menus
   * @type {*|jQuery}
   */
  let parentMenu = $('ul[data-parent]').data('parent');

  // Select Parent Menu
  if (parentMenu) {
    $(`ul a[href="${parentMenu}"]:not("ul[data-parent] a"):last`)
      .parents('li')
      .addClass('active')
  } else {
    $('ul li.active:last')
      .parents('li')
      .addClass('active')
  }
});
