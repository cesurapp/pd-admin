/*
 * This file is part of the EmlakPRO package.
 *
 * @package     EmlakPRO
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2013 - 2016, OTTOSISTEM (http://ottosistem.com)
 * @copyright   Copyright (c) 2016 - 2017, WriteLN Yazılım Hizmetleri San. Tic. A.Ş (http://writeln.net)
 * @license     LICENSE
 * @link        http://emlakpro.net
 *
 */

var timer;

/**
 * Global Ajax Started Handler
 */
$(document).ajaxStart(function () {
  // Set Ajax Loader
  $('.content-wrapper').append('<div class="ajax-loader"><div class="bar"></div></div>');

  var loader = $('.ajax-loader .bar');
  var width = 15;
  var increment = 5;
  timer = setInterval(function () {
    width = width + increment;
    loader.css('width', width + '%');
    if (width >= 40) {
      increment = 2;
    }
    if (width >= 70) {
      increment = 1;
    }
    if (width >= 90) {
      clearInterval(timer);
    }
  }, 50);
});

/**
 * Global Ajax Completed Handler
 */
$(document).ajaxSuccess(function () {
  // Stop Timer
  clearInterval(timer);

  // Set Ajax Complete
  $('.ajax-loader .bar')
    .css('width', '100%');

  // Remove Ajax Loader
  $('.ajax-loader').fadeOut(250, function () {
    $(this).remove();
  });
});

/**
 * Global Ajax Completed Handler
 */
$(document).ajaxError(function () {
  // Stop Timer
  clearInterval(timer);

  // Set Ajax Danger & Complete
  $('.ajax-loader .bar')
    .css('background', 'red')
    .css('box-shadow', '0 0 5px #fd4646')
    .css('width', '100%');

  // Remove Ajax Loader
  $('.ajax-loader').fadeOut(500, function () {
    $(this).remove();
  });
});