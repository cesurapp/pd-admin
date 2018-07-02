/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/admin/default/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/admin/default/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/admin/default/js/app.js":
/*!****************************************!*\
  !*** ./assets/admin/default/js/app.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
 * This file is part of the EmlakPRO package.
 *
 * @package     EmlakPRO
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2017 - 2018, WriteLN Yazılım Hizmetleri San. Tic. A.Ş (http://writeln.net)
 * @license     LICENSE
 * @link        http://emlakpro.net
 */

/**
 * Load SCSS Dependencies
 */
__webpack_require__(/*! ../scss/app.scss */ "./assets/admin/default/scss/app.scss");

/**==================================
 Modules
 ==================================*/
__webpack_require__(/*! ./modules/directive */ "./assets/admin/default/js/modules/directive.js");
__webpack_require__(/*! ./modules/ajax */ "./assets/admin/default/js/modules/ajax.js");
__webpack_require__(/*! ./modules/modal */ "./assets/admin/default/js/modules/modal.js");
__webpack_require__(/*! ./modules/content-nav */ "./assets/admin/default/js/modules/content-nav.js");
__webpack_require__(/*! ./modules/datepicker */ "./assets/admin/default/js/modules/datepicker.js");
__webpack_require__(/*! ./modules/menu */ "./assets/admin/default/js/modules/menu.js");
__webpack_require__(/*! ./modules/dashboard */ "./assets/admin/default/js/modules/dashboard.js");

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

/***/ }),

/***/ "./assets/admin/default/js/modules/ajax.js":
/*!*************************************************!*\
  !*** ./assets/admin/default/js/modules/ajax.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

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
  $('.ajax-loader .bar').css('width', '100%');

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
  $('.ajax-loader .bar').css('background', 'red').css('box-shadow', '0 0 5px #fd4646').css('width', '100%');

  // Remove Ajax Loader
  $('.ajax-loader').fadeOut(500, function () {
    $(this).remove();
  });
});

/***/ }),

/***/ "./assets/admin/default/js/modules/content-nav.js":
/*!********************************************************!*\
  !*** ./assets/admin/default/js/modules/content-nav.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
 * This file is part of the EmlakPRO package.
 *
 * @package     EmlakPRO
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2017 - 2018, WriteLN Yazılım Hizmetleri San. Tic. A.Ş (http://writeln.net)
 * @license     LICENSE
 * @link        http://emlakpro.net
 */

__webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");

var interval = null;
var time = 100;
var buttonShow = false;

$(function () {
  // Start First Run
  interval = setInterval(process, time);

  // Restart Window Resize
  $(window).resize(function () {
    if (interval === null) {
      interval = setInterval(process, time);
    }
  });
});

/**
 * Process Scroller Button
 */
function process() {
  var nav = $('#content_nav');
  var menu = nav.find('.nav');
  var menuItems = menu.find('> li');

  if (menu.length) {
    // Find Element Width
    var menuItemsWidth = 0;
    menuItems.map(function () {
      menuItemsWidth += this.offsetWidth;
    });

    // Check Overflow
    var menuWidth = menu.get(0).offsetWidth;
    if (menuItemsWidth > menuWidth) {
      addButton(nav, menu, menuWidth);
      scrollActiveButton(menuWidth, menu);
    } else {
      removeButton(nav);
    }
  }

  // CLear Interval
  clearInterval(interval);
  interval = null;
}

/**
 * Active Button Scroller
 * @param menuWidth
 * @param menu
 */
function scrollActiveButton(menuWidth, menu) {
  var activeButton = menu.find('li.active');
  var activeButtonOffset = activeButton.position().left + activeButton.width();

  // Check Overflow
  if (activeButtonOffset > menuWidth) {
    menu.scrollLeft(menu.scrollLeft() + (activeButtonOffset - menuWidth));
  }
}

/**
 * Add Scroller Button
 * @param nav
 * @param menu
 * @param menuWidth
 */
function addButton(nav, menu, menuWidth) {
  if (buttonShow === false) {
    nav.prepend('<div id="scroller"><a class="left"><i class="material-icons">navigate_before</i></a><a class="right"><i class="material-icons">navigate_next</i></a></div>');

    // Enabled Button
    buttonShow = true;

    // Enabled Event
    $('#scroller').on('click', '.left', function () {
      console.log(menuWidth);
      menu.animate({
        scrollLeft: menu.scrollLeft() - menuWidth / 1.7
      });
    }).on('click', '.right', function () {
      menu.animate({
        scrollLeft: menu.scrollLeft() + menuWidth / 1.7
      });
    });

    // Enabled Swipe
    addSwipe(menu);
  }
}

/**
 * Remove Scroller Button
 * @param nav
 */
function removeButton(nav) {
  if (buttonShow === true) {
    // Disabled Button
    buttonShow = false;

    // Remove Scroller Button
    nav.find('#scroller').remove();

    // Disable Event
    $('#scroller').off('click', '.left').off('click', '.right');
  }
}

/**
 * Swipe Menu
 * @param menu
 */
function addSwipe(menu) {
  var margin;
  var mc = new Hammer(menu.get(0), {
    domEvents: true
  });

  mc.on("panstart", function (e) {
    margin = -1 * menu.scrollLeft();
  }).on("pan", function (e) {
    var delta = margin + e.deltaX;
    menu.scrollLeft(-1 * delta);
  });
}

/***/ }),

/***/ "./assets/admin/default/js/modules/dashboard.js":
/*!******************************************************!*\
  !*** ./assets/admin/default/js/modules/dashboard.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Widget Sortable
 */
var Sortable = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/Sortable.js");
$(document).ready(function () {
  var el = document.querySelector('.dashboard');
  if (el) {
    new Sortable(el, {
      draggable: ".widget",
      handle: ".mover",
      animation: 200,
      forceFallback: true,

      onEnd: function onEnd(evt) {
        $.each(evt.to.children, function (index, element) {
          // Get Order URL
          var orderUrl = $(element).data('order');
          orderUrl = orderUrl.replace('0', index);

          // Send Ajax Data
          $.ajax({
            url: orderUrl,
            dataType: 'json',
            complete: function complete(response) {}
          });
        });
      }
    });
  }
});

/***/ }),

/***/ "./assets/admin/default/js/modules/datepicker.js":
/*!*******************************************************!*\
  !*** ./assets/admin/default/js/modules/datepicker.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
 * This file is part of the EmlakPRO package.
 *
 * @package     EmlakPRO
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2017 - 2018, WriteLN Yazılım Hizmetleri San. Tic. A.Ş (http://writeln.net)
 * @license     LICENSE
 * @link        http://emlakpro.net
 */

// Load Air Datepicker
__webpack_require__(/*! air-datepicker/dist/js/datepicker.min */ "./node_modules/air-datepicker/dist/js/datepicker.min.js");
__webpack_require__(/*! air-datepicker/dist/js/i18n/datepicker.en */ "./node_modules/air-datepicker/dist/js/i18n/datepicker.en.js");

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
    $(el).datepicker({
      todayButton: new Date(),
      autoClose: true,
      language: 'tr',
      position: 'top left',
      dateFormat: 'yyyy-mm-dd',
      timeFormat: 'hh:ii',
      timepicker: false
    }).data('datepicker').selectDate(new Date(el.getAttribute('value')));
  });

  $.each($('[data-picker=datetime]'), function (index, el) {
    $(el).datepicker({
      todayButton: new Date(),
      autoClose: true,
      language: 'tr',
      position: 'top left',
      dateFormat: 'yyyy-mm-dd',
      timeFormat: 'hh:ii',
      timepicker: true
    }).data('datepicker').selectDate(new Date(el.getAttribute('value').replace(/\s/, 'T')));
  });
});

/***/ }),

/***/ "./assets/admin/default/js/modules/directive.js":
/*!******************************************************!*\
  !*** ./assets/admin/default/js/modules/directive.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

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
    self.prop('checked', self.prop('checked') == null || self.prop('checked') == true ? false : true);
    container.find('input[type=checkbox]').prop('checked', !self.prop('checked'));
  });

  /**
   * Bootstrap Tooltip Activate
   */
  $('[data-toggle="tooltip"], [data-tooltip]').tooltip();

  /**
   * Bootstrap Popover
   */
  $('[data-toggle="popover"]').popover({
    trigger: 'focus',
    html: true
  }).click(function (e) {
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
  $(document).on('input change', '[data-range]', function () {
    $(this).parent().next().html(this.value);
  });
});

/***/ }),

/***/ "./assets/admin/default/js/modules/menu.js":
/*!*************************************************!*\
  !*** ./assets/admin/default/js/modules/menu.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

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
  var parentMenu = $('ul[data-parent]').data('parent');

  // Select Parent Menu
  if (parentMenu) {
    $('ul a[href="' + parentMenu + '"]:not("ul[data-parent] a"):last').parents('li').addClass('active');
  } else {
    $('ul li.active:last').parents('li').addClass('active');
  }
});

/***/ }),

/***/ "./assets/admin/default/js/modules/modal.js":
/*!**************************************************!*\
  !*** ./assets/admin/default/js/modules/modal.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

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
        template = '<div class="fade modal confirm" id="confirmModal" tabindex="-1">' + '<div class="modal-dialog {modalWidth}">' + '<div class="modal-content">' + '<div class="modal-header"><h4 class="modal-title"><i class="material-icons">{modalTitle}</i></h4></div>' + '<div class="modal-body">{modalBody}</div>' + '<div class="modal-footer">' + '<button type="button" id="btnNo" class="btn btn-outline-primary no" data-dismiss="modal">{btnNo}</button>' + '<button type="button" id="btnYes" class="btn btn-success yes" >{btnYes}</button>' + '</div>' + '</div>' + '</div>' + '</div>';

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

    /**
     * Info
     */
    if (self.data('modal') === 'info') {
      console.log(mdl);
      $(mdl).find('#btnYes').remove();
    }

    // Show Modal
    $('#confirmModal').modal();
  });
});

/***/ }),

/***/ "./assets/admin/default/scss/app.scss":
/*!********************************************!*\
  !*** ./assets/admin/default/scss/app.scss ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/air-datepicker/dist/js/datepicker.min.js":
/*!***************************************************************!*\
  !*** ./node_modules/air-datepicker/dist/js/datepicker.min.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

!function(t,e,i){!function(){var s,a,n,h="2.2.3",o="datepicker",r=".datepicker-here",c=!1,d='<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>',l={classes:"",inline:!1,language:"ru",startDate:new Date,firstDay:"",weekends:[6,0],dateFormat:"",altField:"",altFieldDateFormat:"@",toggleSelected:!0,keyboardNav:!0,position:"bottom left",offset:12,view:"days",minView:"days",showOtherMonths:!0,selectOtherMonths:!0,moveToOtherMonthsOnSelect:!0,showOtherYears:!0,selectOtherYears:!0,moveToOtherYearsOnSelect:!0,minDate:"",maxDate:"",disableNavWhenOutOfRange:!0,multipleDates:!1,multipleDatesSeparator:",",range:!1,todayButton:!1,clearButton:!1,showEvent:"focus",autoClose:!1,monthsField:"monthsShort",prevHtml:'<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',nextHtml:'<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',navTitles:{days:"MM, <i>yyyy</i>",months:"yyyy",years:"yyyy1 - yyyy2"},timepicker:!1,onlyTimepicker:!1,dateTimeSeparator:" ",timeFormat:"",minHours:0,maxHours:24,minMinutes:0,maxMinutes:59,hoursStep:1,minutesStep:1,onSelect:"",onShow:"",onHide:"",onChangeMonth:"",onChangeYear:"",onChangeDecade:"",onChangeView:"",onRenderCell:""},u={ctrlRight:[17,39],ctrlUp:[17,38],ctrlLeft:[17,37],ctrlDown:[17,40],shiftRight:[16,39],shiftUp:[16,38],shiftLeft:[16,37],shiftDown:[16,40],altUp:[18,38],altRight:[18,39],altLeft:[18,37],altDown:[18,40],ctrlShiftUp:[16,17,38]},m=function(t,a){this.el=t,this.$el=e(t),this.opts=e.extend(!0,{},l,a,this.$el.data()),s==i&&(s=e("body")),this.opts.startDate||(this.opts.startDate=new Date),"INPUT"==this.el.nodeName&&(this.elIsInput=!0),this.opts.altField&&(this.$altField="string"==typeof this.opts.altField?e(this.opts.altField):this.opts.altField),this.inited=!1,this.visible=!1,this.silent=!1,this.currentDate=this.opts.startDate,this.currentView=this.opts.view,this._createShortCuts(),this.selectedDates=[],this.views={},this.keys=[],this.minRange="",this.maxRange="",this._prevOnSelectValue="",this.init()};n=m,n.prototype={VERSION:h,viewIndexes:["days","months","years"],init:function(){c||this.opts.inline||!this.elIsInput||this._buildDatepickersContainer(),this._buildBaseHtml(),this._defineLocale(this.opts.language),this._syncWithMinMaxDates(),this.elIsInput&&(this.opts.inline||(this._setPositionClasses(this.opts.position),this._bindEvents()),this.opts.keyboardNav&&!this.opts.onlyTimepicker&&this._bindKeyboardEvents(),this.$datepicker.on("mousedown",this._onMouseDownDatepicker.bind(this)),this.$datepicker.on("mouseup",this._onMouseUpDatepicker.bind(this))),this.opts.classes&&this.$datepicker.addClass(this.opts.classes),this.opts.timepicker&&(this.timepicker=new e.fn.datepicker.Timepicker(this,this.opts),this._bindTimepickerEvents()),this.opts.onlyTimepicker&&this.$datepicker.addClass("-only-timepicker-"),this.views[this.currentView]=new e.fn.datepicker.Body(this,this.currentView,this.opts),this.views[this.currentView].show(),this.nav=new e.fn.datepicker.Navigation(this,this.opts),this.view=this.currentView,this.$el.on("clickCell.adp",this._onClickCell.bind(this)),this.$datepicker.on("mouseenter",".datepicker--cell",this._onMouseEnterCell.bind(this)),this.$datepicker.on("mouseleave",".datepicker--cell",this._onMouseLeaveCell.bind(this)),this.inited=!0},_createShortCuts:function(){this.minDate=this.opts.minDate?this.opts.minDate:new Date(-86399999136e5),this.maxDate=this.opts.maxDate?this.opts.maxDate:new Date(86399999136e5)},_bindEvents:function(){this.$el.on(this.opts.showEvent+".adp",this._onShowEvent.bind(this)),this.$el.on("mouseup.adp",this._onMouseUpEl.bind(this)),this.$el.on("blur.adp",this._onBlur.bind(this)),this.$el.on("keyup.adp",this._onKeyUpGeneral.bind(this)),e(t).on("resize.adp",this._onResize.bind(this)),e("body").on("mouseup.adp",this._onMouseUpBody.bind(this))},_bindKeyboardEvents:function(){this.$el.on("keydown.adp",this._onKeyDown.bind(this)),this.$el.on("keyup.adp",this._onKeyUp.bind(this)),this.$el.on("hotKey.adp",this._onHotKey.bind(this))},_bindTimepickerEvents:function(){this.$el.on("timeChange.adp",this._onTimeChange.bind(this))},isWeekend:function(t){return-1!==this.opts.weekends.indexOf(t)},_defineLocale:function(t){"string"==typeof t?(this.loc=e.fn.datepicker.language[t],this.loc||(console.warn("Can't find language \""+t+'" in Datepicker.language, will use "ru" instead'),this.loc=e.extend(!0,{},e.fn.datepicker.language.ru)),this.loc=e.extend(!0,{},e.fn.datepicker.language.ru,e.fn.datepicker.language[t])):this.loc=e.extend(!0,{},e.fn.datepicker.language.ru,t),this.opts.dateFormat&&(this.loc.dateFormat=this.opts.dateFormat),this.opts.timeFormat&&(this.loc.timeFormat=this.opts.timeFormat),""!==this.opts.firstDay&&(this.loc.firstDay=this.opts.firstDay),this.opts.timepicker&&(this.loc.dateFormat=[this.loc.dateFormat,this.loc.timeFormat].join(this.opts.dateTimeSeparator)),this.opts.onlyTimepicker&&(this.loc.dateFormat=this.loc.timeFormat);var i=this._getWordBoundaryRegExp;(this.loc.timeFormat.match(i("aa"))||this.loc.timeFormat.match(i("AA")))&&(this.ampm=!0)},_buildDatepickersContainer:function(){c=!0,s.append('<div class="datepickers-container" id="datepickers-container"></div>'),a=e("#datepickers-container")},_buildBaseHtml:function(){var t,i=e('<div class="datepicker-inline">');t="INPUT"==this.el.nodeName?this.opts.inline?i.insertAfter(this.$el):a:i.appendTo(this.$el),this.$datepicker=e(d).appendTo(t),this.$content=e(".datepicker--content",this.$datepicker),this.$nav=e(".datepicker--nav",this.$datepicker)},_triggerOnChange:function(){if(!this.selectedDates.length){if(""===this._prevOnSelectValue)return;return this._prevOnSelectValue="",this.opts.onSelect("","",this)}var t,e=this.selectedDates,i=n.getParsedDate(e[0]),s=this,a=new Date(i.year,i.month,i.date,i.hours,i.minutes);t=e.map(function(t){return s.formatDate(s.loc.dateFormat,t)}).join(this.opts.multipleDatesSeparator),(this.opts.multipleDates||this.opts.range)&&(a=e.map(function(t){var e=n.getParsedDate(t);return new Date(e.year,e.month,e.date,e.hours,e.minutes)})),this._prevOnSelectValue=t,this.opts.onSelect(t,a,this)},next:function(){var t=this.parsedDate,e=this.opts;switch(this.view){case"days":this.date=new Date(t.year,t.month+1,1),e.onChangeMonth&&e.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(t.year+1,t.month,1),e.onChangeYear&&e.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(t.year+10,0,1),e.onChangeDecade&&e.onChangeDecade(this.curDecade)}},prev:function(){var t=this.parsedDate,e=this.opts;switch(this.view){case"days":this.date=new Date(t.year,t.month-1,1),e.onChangeMonth&&e.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(t.year-1,t.month,1),e.onChangeYear&&e.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(t.year-10,0,1),e.onChangeDecade&&e.onChangeDecade(this.curDecade)}},formatDate:function(t,e){e=e||this.date;var i,s=t,a=this._getWordBoundaryRegExp,h=this.loc,o=n.getLeadingZeroNum,r=n.getDecade(e),c=n.getParsedDate(e),d=c.fullHours,l=c.hours,u=t.match(a("aa"))||t.match(a("AA")),m="am",p=this._replacer;switch(this.opts.timepicker&&this.timepicker&&u&&(i=this.timepicker._getValidHoursFromDate(e,u),d=o(i.hours),l=i.hours,m=i.dayPeriod),!0){case/@/.test(s):s=s.replace(/@/,e.getTime());case/aa/.test(s):s=p(s,a("aa"),m);case/AA/.test(s):s=p(s,a("AA"),m.toUpperCase());case/dd/.test(s):s=p(s,a("dd"),c.fullDate);case/d/.test(s):s=p(s,a("d"),c.date);case/DD/.test(s):s=p(s,a("DD"),h.days[c.day]);case/D/.test(s):s=p(s,a("D"),h.daysShort[c.day]);case/mm/.test(s):s=p(s,a("mm"),c.fullMonth);case/m/.test(s):s=p(s,a("m"),c.month+1);case/MM/.test(s):s=p(s,a("MM"),this.loc.months[c.month]);case/M/.test(s):s=p(s,a("M"),h.monthsShort[c.month]);case/ii/.test(s):s=p(s,a("ii"),c.fullMinutes);case/i/.test(s):s=p(s,a("i"),c.minutes);case/hh/.test(s):s=p(s,a("hh"),d);case/h/.test(s):s=p(s,a("h"),l);case/yyyy/.test(s):s=p(s,a("yyyy"),c.year);case/yyyy1/.test(s):s=p(s,a("yyyy1"),r[0]);case/yyyy2/.test(s):s=p(s,a("yyyy2"),r[1]);case/yy/.test(s):s=p(s,a("yy"),c.year.toString().slice(-2))}return s},_replacer:function(t,e,i){return t.replace(e,function(t,e,s,a){return e+i+a})},_getWordBoundaryRegExp:function(t){var e="\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";return new RegExp("(^|>|"+e+")("+t+")($|<|"+e+")","g")},selectDate:function(t){var e=this,i=e.opts,s=e.parsedDate,a=e.selectedDates,h=a.length,o="";if(Array.isArray(t))return void t.forEach(function(t){e.selectDate(t)});if(t instanceof Date){if(this.lastSelectedDate=t,this.timepicker&&this.timepicker._setTime(t),e._trigger("selectDate",t),this.timepicker&&(t.setHours(this.timepicker.hours),t.setMinutes(this.timepicker.minutes)),"days"==e.view&&t.getMonth()!=s.month&&i.moveToOtherMonthsOnSelect&&(o=new Date(t.getFullYear(),t.getMonth(),1)),"years"==e.view&&t.getFullYear()!=s.year&&i.moveToOtherYearsOnSelect&&(o=new Date(t.getFullYear(),0,1)),o&&(e.silent=!0,e.date=o,e.silent=!1,e.nav._render()),i.multipleDates&&!i.range){if(h===i.multipleDates)return;e._isSelected(t)||e.selectedDates.push(t)}else i.range?2==h?(e.selectedDates=[t],e.minRange=t,e.maxRange=""):1==h?(e.selectedDates.push(t),e.maxRange?e.minRange=t:e.maxRange=t,n.bigger(e.maxRange,e.minRange)&&(e.maxRange=e.minRange,e.minRange=t),e.selectedDates=[e.minRange,e.maxRange]):(e.selectedDates=[t],e.minRange=t):e.selectedDates=[t];e._setInputValue(),i.onSelect&&e._triggerOnChange(),i.autoClose&&!this.timepickerIsActive&&(i.multipleDates||i.range?i.range&&2==e.selectedDates.length&&e.hide():e.hide()),e.views[this.currentView]._render()}},removeDate:function(t){var e=this.selectedDates,i=this;if(t instanceof Date)return e.some(function(s,a){return n.isSame(s,t)?(e.splice(a,1),i.selectedDates.length?i.lastSelectedDate=i.selectedDates[i.selectedDates.length-1]:(i.minRange="",i.maxRange="",i.lastSelectedDate=""),i.views[i.currentView]._render(),i._setInputValue(),i.opts.onSelect&&i._triggerOnChange(),!0):void 0})},today:function(){this.silent=!0,this.view=this.opts.minView,this.silent=!1,this.date=new Date,this.opts.todayButton instanceof Date&&this.selectDate(this.opts.todayButton)},clear:function(){this.selectedDates=[],this.minRange="",this.maxRange="",this.views[this.currentView]._render(),this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()},update:function(t,i){var s=arguments.length,a=this.lastSelectedDate;return 2==s?this.opts[t]=i:1==s&&"object"==typeof t&&(this.opts=e.extend(!0,this.opts,t)),this._createShortCuts(),this._syncWithMinMaxDates(),this._defineLocale(this.opts.language),this.nav._addButtonsIfNeed(),this.opts.onlyTimepicker||this.nav._render(),this.views[this.currentView]._render(),this.elIsInput&&!this.opts.inline&&(this._setPositionClasses(this.opts.position),this.visible&&this.setPosition(this.opts.position)),this.opts.classes&&this.$datepicker.addClass(this.opts.classes),this.opts.onlyTimepicker&&this.$datepicker.addClass("-only-timepicker-"),this.opts.timepicker&&(a&&this.timepicker._handleDate(a),this.timepicker._updateRanges(),this.timepicker._updateCurrentTime(),a&&(a.setHours(this.timepicker.hours),a.setMinutes(this.timepicker.minutes))),this._setInputValue(),this},_syncWithMinMaxDates:function(){var t=this.date.getTime();this.silent=!0,this.minTime>t&&(this.date=this.minDate),this.maxTime<t&&(this.date=this.maxDate),this.silent=!1},_isSelected:function(t,e){var i=!1;return this.selectedDates.some(function(s){return n.isSame(s,t,e)?(i=s,!0):void 0}),i},_setInputValue:function(){var t,e=this,i=e.opts,s=e.loc.dateFormat,a=i.altFieldDateFormat,n=e.selectedDates.map(function(t){return e.formatDate(s,t)});i.altField&&e.$altField.length&&(t=this.selectedDates.map(function(t){return e.formatDate(a,t)}),t=t.join(this.opts.multipleDatesSeparator),this.$altField.val(t)),n=n.join(this.opts.multipleDatesSeparator),this.$el.val(n)},_isInRange:function(t,e){var i=t.getTime(),s=n.getParsedDate(t),a=n.getParsedDate(this.minDate),h=n.getParsedDate(this.maxDate),o=new Date(s.year,s.month,a.date).getTime(),r=new Date(s.year,s.month,h.date).getTime(),c={day:i>=this.minTime&&i<=this.maxTime,month:o>=this.minTime&&r<=this.maxTime,year:s.year>=a.year&&s.year<=h.year};return e?c[e]:c.day},_getDimensions:function(t){var e=t.offset();return{width:t.outerWidth(),height:t.outerHeight(),left:e.left,top:e.top}},_getDateFromCell:function(t){var e=this.parsedDate,s=t.data("year")||e.year,a=t.data("month")==i?e.month:t.data("month"),n=t.data("date")||1;return new Date(s,a,n)},_setPositionClasses:function(t){t=t.split(" ");var e=t[0],i=t[1],s="datepicker -"+e+"-"+i+"- -from-"+e+"-";this.visible&&(s+=" active"),this.$datepicker.removeAttr("class").addClass(s)},setPosition:function(t){t=t||this.opts.position;var e,i,s=this._getDimensions(this.$el),a=this._getDimensions(this.$datepicker),n=t.split(" "),h=this.opts.offset,o=n[0],r=n[1];switch(o){case"top":e=s.top-a.height-h;break;case"right":i=s.left+s.width+h;break;case"bottom":e=s.top+s.height+h;break;case"left":i=s.left-a.width-h}switch(r){case"top":e=s.top;break;case"right":i=s.left+s.width-a.width;break;case"bottom":e=s.top+s.height-a.height;break;case"left":i=s.left;break;case"center":/left|right/.test(o)?e=s.top+s.height/2-a.height/2:i=s.left+s.width/2-a.width/2}this.$datepicker.css({left:i,top:e})},show:function(){var t=this.opts.onShow;this.setPosition(this.opts.position),this.$datepicker.addClass("active"),this.visible=!0,t&&this._bindVisionEvents(t)},hide:function(){var t=this.opts.onHide;this.$datepicker.removeClass("active").css({left:"-100000px"}),this.focused="",this.keys=[],this.inFocus=!1,this.visible=!1,this.$el.blur(),t&&this._bindVisionEvents(t)},down:function(t){this._changeView(t,"down")},up:function(t){this._changeView(t,"up")},_bindVisionEvents:function(t){this.$datepicker.off("transitionend.dp"),t(this,!1),this.$datepicker.one("transitionend.dp",t.bind(this,this,!0))},_changeView:function(t,e){t=t||this.focused||this.date;var i="up"==e?this.viewIndex+1:this.viewIndex-1;i>2&&(i=2),0>i&&(i=0),this.silent=!0,this.date=new Date(t.getFullYear(),t.getMonth(),1),this.silent=!1,this.view=this.viewIndexes[i]},_handleHotKey:function(t){var e,i,s,a=n.getParsedDate(this._getFocusedDate()),h=this.opts,o=!1,r=!1,c=!1,d=a.year,l=a.month,u=a.date;switch(t){case"ctrlRight":case"ctrlUp":l+=1,o=!0;break;case"ctrlLeft":case"ctrlDown":l-=1,o=!0;break;case"shiftRight":case"shiftUp":r=!0,d+=1;break;case"shiftLeft":case"shiftDown":r=!0,d-=1;break;case"altRight":case"altUp":c=!0,d+=10;break;case"altLeft":case"altDown":c=!0,d-=10;break;case"ctrlShiftUp":this.up()}s=n.getDaysCount(new Date(d,l)),i=new Date(d,l,u),u>s&&(u=s),i.getTime()<this.minTime?i=this.minDate:i.getTime()>this.maxTime&&(i=this.maxDate),this.focused=i,e=n.getParsedDate(i),o&&h.onChangeMonth&&h.onChangeMonth(e.month,e.year),r&&h.onChangeYear&&h.onChangeYear(e.year),c&&h.onChangeDecade&&h.onChangeDecade(this.curDecade)},_registerKey:function(t){var e=this.keys.some(function(e){return e==t});e||this.keys.push(t)},_unRegisterKey:function(t){var e=this.keys.indexOf(t);this.keys.splice(e,1)},_isHotKeyPressed:function(){var t,e=!1,i=this,s=this.keys.sort();for(var a in u)t=u[a],s.length==t.length&&t.every(function(t,e){return t==s[e]})&&(i._trigger("hotKey",a),e=!0);return e},_trigger:function(t,e){this.$el.trigger(t,e)},_focusNextCell:function(t,e){e=e||this.cellType;var i=n.getParsedDate(this._getFocusedDate()),s=i.year,a=i.month,h=i.date;if(!this._isHotKeyPressed()){switch(t){case 37:"day"==e?h-=1:"","month"==e?a-=1:"","year"==e?s-=1:"";break;case 38:"day"==e?h-=7:"","month"==e?a-=3:"","year"==e?s-=4:"";break;case 39:"day"==e?h+=1:"","month"==e?a+=1:"","year"==e?s+=1:"";break;case 40:"day"==e?h+=7:"","month"==e?a+=3:"","year"==e?s+=4:""}var o=new Date(s,a,h);o.getTime()<this.minTime?o=this.minDate:o.getTime()>this.maxTime&&(o=this.maxDate),this.focused=o}},_getFocusedDate:function(){var t=this.focused||this.selectedDates[this.selectedDates.length-1],e=this.parsedDate;if(!t)switch(this.view){case"days":t=new Date(e.year,e.month,(new Date).getDate());break;case"months":t=new Date(e.year,e.month,1);break;case"years":t=new Date(e.year,0,1)}return t},_getCell:function(t,i){i=i||this.cellType;var s,a=n.getParsedDate(t),h='.datepicker--cell[data-year="'+a.year+'"]';switch(i){case"month":h='[data-month="'+a.month+'"]';break;case"day":h+='[data-month="'+a.month+'"][data-date="'+a.date+'"]'}return s=this.views[this.currentView].$el.find(h),s.length?s:e("")},destroy:function(){var t=this;t.$el.off(".adp").data("datepicker",""),t.selectedDates=[],t.focused="",t.views={},t.keys=[],t.minRange="",t.maxRange="",t.opts.inline||!t.elIsInput?t.$datepicker.closest(".datepicker-inline").remove():t.$datepicker.remove()},_handleAlreadySelectedDates:function(t,e){this.opts.range?this.opts.toggleSelected?this.removeDate(e):2!=this.selectedDates.length&&this._trigger("clickCell",e):this.opts.toggleSelected&&this.removeDate(e),this.opts.toggleSelected||(this.lastSelectedDate=t,this.opts.timepicker&&(this.timepicker._setTime(t),this.timepicker.update()))},_onShowEvent:function(t){this.visible||this.show()},_onBlur:function(){!this.inFocus&&this.visible&&this.hide()},_onMouseDownDatepicker:function(t){this.inFocus=!0},_onMouseUpDatepicker:function(t){this.inFocus=!1,t.originalEvent.inFocus=!0,t.originalEvent.timepickerFocus||this.$el.focus()},_onKeyUpGeneral:function(t){var e=this.$el.val();e||this.clear()},_onResize:function(){this.visible&&this.setPosition()},_onMouseUpBody:function(t){t.originalEvent.inFocus||this.visible&&!this.inFocus&&this.hide()},_onMouseUpEl:function(t){t.originalEvent.inFocus=!0,setTimeout(this._onKeyUpGeneral.bind(this),4)},_onKeyDown:function(t){var e=t.which;if(this._registerKey(e),e>=37&&40>=e&&(t.preventDefault(),this._focusNextCell(e)),13==e&&this.focused){if(this._getCell(this.focused).hasClass("-disabled-"))return;if(this.view!=this.opts.minView)this.down();else{var i=this._isSelected(this.focused,this.cellType);if(!i)return this.timepicker&&(this.focused.setHours(this.timepicker.hours),this.focused.setMinutes(this.timepicker.minutes)),void this.selectDate(this.focused);this._handleAlreadySelectedDates(i,this.focused)}}27==e&&this.hide()},_onKeyUp:function(t){var e=t.which;this._unRegisterKey(e)},_onHotKey:function(t,e){this._handleHotKey(e)},_onMouseEnterCell:function(t){var i=e(t.target).closest(".datepicker--cell"),s=this._getDateFromCell(i);this.silent=!0,this.focused&&(this.focused=""),i.addClass("-focus-"),this.focused=s,this.silent=!1,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",n.less(this.minRange,this.focused)&&(this.maxRange=this.minRange,this.minRange=""),this.views[this.currentView]._update())},_onMouseLeaveCell:function(t){var i=e(t.target).closest(".datepicker--cell");i.removeClass("-focus-"),this.silent=!0,this.focused="",this.silent=!1},_onTimeChange:function(t,e,i){var s=new Date,a=this.selectedDates,n=!1;a.length&&(n=!0,s=this.lastSelectedDate),s.setHours(e),s.setMinutes(i),n||this._getCell(s).hasClass("-disabled-")?(this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()):this.selectDate(s)},_onClickCell:function(t,e){this.timepicker&&(e.setHours(this.timepicker.hours),e.setMinutes(this.timepicker.minutes)),this.selectDate(e)},set focused(t){if(!t&&this.focused){var e=this._getCell(this.focused);e.length&&e.removeClass("-focus-")}this._focused=t,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",n.less(this.minRange,this._focused)&&(this.maxRange=this.minRange,this.minRange="")),this.silent||(this.date=t)},get focused(){return this._focused},get parsedDate(){return n.getParsedDate(this.date)},set date(t){return t instanceof Date?(this.currentDate=t,this.inited&&!this.silent&&(this.views[this.view]._render(),this.nav._render(),this.visible&&this.elIsInput&&this.setPosition()),t):void 0},get date(){return this.currentDate},set view(t){return this.viewIndex=this.viewIndexes.indexOf(t),this.viewIndex<0?void 0:(this.prevView=this.currentView,this.currentView=t,this.inited&&(this.views[t]?this.views[t]._render():this.views[t]=new e.fn.datepicker.Body(this,t,this.opts),this.views[this.prevView].hide(),this.views[t].show(),this.nav._render(),this.opts.onChangeView&&this.opts.onChangeView(t),this.elIsInput&&this.visible&&this.setPosition()),t)},get view(){return this.currentView},get cellType(){return this.view.substring(0,this.view.length-1)},get minTime(){var t=n.getParsedDate(this.minDate);return new Date(t.year,t.month,t.date).getTime()},get maxTime(){var t=n.getParsedDate(this.maxDate);return new Date(t.year,t.month,t.date).getTime()},get curDecade(){return n.getDecade(this.date)}},n.getDaysCount=function(t){return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()},n.getParsedDate=function(t){return{year:t.getFullYear(),month:t.getMonth(),fullMonth:t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,date:t.getDate(),fullDate:t.getDate()<10?"0"+t.getDate():t.getDate(),day:t.getDay(),hours:t.getHours(),fullHours:t.getHours()<10?"0"+t.getHours():t.getHours(),minutes:t.getMinutes(),fullMinutes:t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes()}},n.getDecade=function(t){var e=10*Math.floor(t.getFullYear()/10);return[e,e+9]},n.template=function(t,e){return t.replace(/#\{([\w]+)\}/g,function(t,i){return e[i]||0===e[i]?e[i]:void 0})},n.isSame=function(t,e,i){if(!t||!e)return!1;var s=n.getParsedDate(t),a=n.getParsedDate(e),h=i?i:"day",o={day:s.date==a.date&&s.month==a.month&&s.year==a.year,month:s.month==a.month&&s.year==a.year,year:s.year==a.year};return o[h]},n.less=function(t,e,i){return t&&e?e.getTime()<t.getTime():!1},n.bigger=function(t,e,i){return t&&e?e.getTime()>t.getTime():!1},n.getLeadingZeroNum=function(t){return parseInt(t)<10?"0"+t:t},n.resetTime=function(t){return"object"==typeof t?(t=n.getParsedDate(t),new Date(t.year,t.month,t.date)):void 0},e.fn.datepicker=function(t){return this.each(function(){if(e.data(this,o)){var i=e.data(this,o);i.opts=e.extend(!0,i.opts,t),i.update()}else e.data(this,o,new m(this,t))})},e.fn.datepicker.Constructor=m,e.fn.datepicker.language={ru:{days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],daysShort:["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],today:"Сегодня",clear:"Очистить",dateFormat:"dd.mm.yyyy",timeFormat:"hh:ii",firstDay:1}},e(function(){e(r).datepicker()})}(),function(){var t={days:'<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',months:'<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',years:'<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'},s=e.fn.datepicker,a=s.Constructor;s.Body=function(t,i,s){this.d=t,this.type=i,this.opts=s,this.$el=e(""),this.opts.onlyTimepicker||this.init()},s.Body.prototype={init:function(){this._buildBaseHtml(),this._render(),this._bindEvents()},_bindEvents:function(){this.$el.on("click",".datepicker--cell",e.proxy(this._onClickCell,this))},_buildBaseHtml:function(){this.$el=e(t[this.type]).appendTo(this.d.$content),this.$names=e(".datepicker--days-names",this.$el),this.$cells=e(".datepicker--cells",this.$el)},_getDayNamesHtml:function(t,e,s,a){return e=e!=i?e:t,s=s?s:"",a=a!=i?a:0,a>7?s:7==e?this._getDayNamesHtml(t,0,s,++a):(s+='<div class="datepicker--day-name'+(this.d.isWeekend(e)?" -weekend-":"")+'">'+this.d.loc.daysMin[e]+"</div>",this._getDayNamesHtml(t,++e,s,++a))},_getCellContents:function(t,e){var i="datepicker--cell datepicker--cell-"+e,s=new Date,n=this.d,h=a.resetTime(n.minRange),o=a.resetTime(n.maxRange),r=n.opts,c=a.getParsedDate(t),d={},l=c.date;switch(e){case"day":n.isWeekend(c.day)&&(i+=" -weekend-"),c.month!=this.d.parsedDate.month&&(i+=" -other-month-",r.selectOtherMonths||(i+=" -disabled-"),r.showOtherMonths||(l=""));break;case"month":l=n.loc[n.opts.monthsField][c.month];break;case"year":var u=n.curDecade;l=c.year,(c.year<u[0]||c.year>u[1])&&(i+=" -other-decade-",r.selectOtherYears||(i+=" -disabled-"),r.showOtherYears||(l=""))}return r.onRenderCell&&(d=r.onRenderCell(t,e)||{},l=d.html?d.html:l,i+=d.classes?" "+d.classes:""),r.range&&(a.isSame(h,t,e)&&(i+=" -range-from-"),a.isSame(o,t,e)&&(i+=" -range-to-"),1==n.selectedDates.length&&n.focused?((a.bigger(h,t)&&a.less(n.focused,t)||a.less(o,t)&&a.bigger(n.focused,t))&&(i+=" -in-range-"),a.less(o,t)&&a.isSame(n.focused,t)&&(i+=" -range-from-"),a.bigger(h,t)&&a.isSame(n.focused,t)&&(i+=" -range-to-")):2==n.selectedDates.length&&a.bigger(h,t)&&a.less(o,t)&&(i+=" -in-range-")),a.isSame(s,t,e)&&(i+=" -current-"),n.focused&&a.isSame(t,n.focused,e)&&(i+=" -focus-"),n._isSelected(t,e)&&(i+=" -selected-"),(!n._isInRange(t,e)||d.disabled)&&(i+=" -disabled-"),{html:l,classes:i}},_getDaysHtml:function(t){var e=a.getDaysCount(t),i=new Date(t.getFullYear(),t.getMonth(),1).getDay(),s=new Date(t.getFullYear(),t.getMonth(),e).getDay(),n=i-this.d.loc.firstDay,h=6-s+this.d.loc.firstDay;n=0>n?n+7:n,h=h>6?h-7:h;for(var o,r,c=-n+1,d="",l=c,u=e+h;u>=l;l++)r=t.getFullYear(),o=t.getMonth(),d+=this._getDayHtml(new Date(r,o,l));return d},_getDayHtml:function(t){var e=this._getCellContents(t,"day");return'<div class="'+e.classes+'" data-date="'+t.getDate()+'" data-month="'+t.getMonth()+'" data-year="'+t.getFullYear()+'">'+e.html+"</div>"},_getMonthsHtml:function(t){for(var e="",i=a.getParsedDate(t),s=0;12>s;)e+=this._getMonthHtml(new Date(i.year,s)),s++;return e},_getMonthHtml:function(t){var e=this._getCellContents(t,"month");return'<div class="'+e.classes+'" data-month="'+t.getMonth()+'">'+e.html+"</div>"},_getYearsHtml:function(t){var e=(a.getParsedDate(t),a.getDecade(t)),i=e[0]-1,s="",n=i;for(n;n<=e[1]+1;n++)s+=this._getYearHtml(new Date(n,0));return s},_getYearHtml:function(t){var e=this._getCellContents(t,"year");return'<div class="'+e.classes+'" data-year="'+t.getFullYear()+'">'+e.html+"</div>"},_renderTypes:{days:function(){var t=this._getDayNamesHtml(this.d.loc.firstDay),e=this._getDaysHtml(this.d.currentDate);this.$cells.html(e),this.$names.html(t)},months:function(){var t=this._getMonthsHtml(this.d.currentDate);this.$cells.html(t)},years:function(){var t=this._getYearsHtml(this.d.currentDate);this.$cells.html(t)}},_render:function(){this.opts.onlyTimepicker||this._renderTypes[this.type].bind(this)()},_update:function(){var t,i,s,a=e(".datepicker--cell",this.$cells),n=this;a.each(function(a,h){i=e(this),s=n.d._getDateFromCell(e(this)),t=n._getCellContents(s,n.d.cellType),i.attr("class",t.classes)})},show:function(){this.opts.onlyTimepicker||(this.$el.addClass("active"),this.acitve=!0)},hide:function(){this.$el.removeClass("active"),this.active=!1},_handleClick:function(t){var e=t.data("date")||1,i=t.data("month")||0,s=t.data("year")||this.d.parsedDate.year,a=this.d;if(a.view!=this.opts.minView)return void a.down(new Date(s,i,e));var n=new Date(s,i,e),h=this.d._isSelected(n,this.d.cellType);return h?void a._handleAlreadySelectedDates.bind(a,h,n)():void a._trigger("clickCell",n)},_onClickCell:function(t){var i=e(t.target).closest(".datepicker--cell");i.hasClass("-disabled-")||this._handleClick.bind(this)(i)}}}(),function(){var t='<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',i='<div class="datepicker--buttons"></div>',s='<span class="datepicker--button" data-action="#{action}">#{label}</span>',a=e.fn.datepicker,n=a.Constructor;a.Navigation=function(t,e){this.d=t,this.opts=e,this.$buttonsContainer="",this.init()},a.Navigation.prototype={init:function(){this._buildBaseHtml(),this._bindEvents()},_bindEvents:function(){this.d.$nav.on("click",".datepicker--nav-action",e.proxy(this._onClickNavButton,this)),this.d.$nav.on("click",".datepicker--nav-title",e.proxy(this._onClickNavTitle,this)),this.d.$datepicker.on("click",".datepicker--button",e.proxy(this._onClickNavButton,this))},_buildBaseHtml:function(){this.opts.onlyTimepicker||this._render(),this._addButtonsIfNeed()},_addButtonsIfNeed:function(){this.opts.todayButton&&this._addButton("today"),this.opts.clearButton&&this._addButton("clear")},_render:function(){var i=this._getTitle(this.d.currentDate),s=n.template(t,e.extend({title:i},this.opts));this.d.$nav.html(s),"years"==this.d.view&&e(".datepicker--nav-title",this.d.$nav).addClass("-disabled-"),this.setNavStatus()},_getTitle:function(t){return this.d.formatDate(this.opts.navTitles[this.d.view],t)},_addButton:function(t){this.$buttonsContainer.length||this._addButtonsContainer();var i={action:t,label:this.d.loc[t]},a=n.template(s,i);e("[data-action="+t+"]",this.$buttonsContainer).length||this.$buttonsContainer.append(a)},_addButtonsContainer:function(){this.d.$datepicker.append(i),this.$buttonsContainer=e(".datepicker--buttons",this.d.$datepicker)},setNavStatus:function(){if((this.opts.minDate||this.opts.maxDate)&&this.opts.disableNavWhenOutOfRange){var t=this.d.parsedDate,e=t.month,i=t.year,s=t.date;switch(this.d.view){case"days":this.d._isInRange(new Date(i,e-1,1),"month")||this._disableNav("prev"),this.d._isInRange(new Date(i,e+1,1),"month")||this._disableNav("next");break;case"months":this.d._isInRange(new Date(i-1,e,s),"year")||this._disableNav("prev"),this.d._isInRange(new Date(i+1,e,s),"year")||this._disableNav("next");break;case"years":var a=n.getDecade(this.d.date);this.d._isInRange(new Date(a[0]-1,0,1),"year")||this._disableNav("prev"),this.d._isInRange(new Date(a[1]+1,0,1),"year")||this._disableNav("next")}}},_disableNav:function(t){e('[data-action="'+t+'"]',this.d.$nav).addClass("-disabled-")},_activateNav:function(t){e('[data-action="'+t+'"]',this.d.$nav).removeClass("-disabled-")},_onClickNavButton:function(t){var i=e(t.target).closest("[data-action]"),s=i.data("action");this.d[s]()},_onClickNavTitle:function(t){return e(t.target).hasClass("-disabled-")?void 0:"days"==this.d.view?this.d.view="months":void(this.d.view="years")}}}(),function(){var t='<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>',i=e.fn.datepicker,s=i.Constructor;i.Timepicker=function(t,e){this.d=t,this.opts=e,this.init()},i.Timepicker.prototype={init:function(){var t="input";this._setTime(this.d.date),this._buildHTML(),navigator.userAgent.match(/trident/gi)&&(t="change"),this.d.$el.on("selectDate",this._onSelectDate.bind(this)),this.$ranges.on(t,this._onChangeRange.bind(this)),this.$ranges.on("mouseup",this._onMouseUpRange.bind(this)),this.$ranges.on("mousemove focus ",this._onMouseEnterRange.bind(this)),this.$ranges.on("mouseout blur",this._onMouseOutRange.bind(this))},_setTime:function(t){var e=s.getParsedDate(t);this._handleDate(t),this.hours=e.hours<this.minHours?this.minHours:e.hours,this.minutes=e.minutes<this.minMinutes?this.minMinutes:e.minutes},_setMinTimeFromDate:function(t){this.minHours=t.getHours(),this.minMinutes=t.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()>t.getHours()&&(this.minMinutes=this.opts.minMinutes)},_setMaxTimeFromDate:function(t){
this.maxHours=t.getHours(),this.maxMinutes=t.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()<t.getHours()&&(this.maxMinutes=this.opts.maxMinutes)},_setDefaultMinMaxTime:function(){var t=23,e=59,i=this.opts;this.minHours=i.minHours<0||i.minHours>t?0:i.minHours,this.minMinutes=i.minMinutes<0||i.minMinutes>e?0:i.minMinutes,this.maxHours=i.maxHours<0||i.maxHours>t?t:i.maxHours,this.maxMinutes=i.maxMinutes<0||i.maxMinutes>e?e:i.maxMinutes},_validateHoursMinutes:function(t){this.hours<this.minHours?this.hours=this.minHours:this.hours>this.maxHours&&(this.hours=this.maxHours),this.minutes<this.minMinutes?this.minutes=this.minMinutes:this.minutes>this.maxMinutes&&(this.minutes=this.maxMinutes)},_buildHTML:function(){var i=s.getLeadingZeroNum,a={hourMin:this.minHours,hourMax:i(this.maxHours),hourStep:this.opts.hoursStep,hourValue:this.hours,hourVisible:i(this.displayHours),minMin:this.minMinutes,minMax:i(this.maxMinutes),minStep:this.opts.minutesStep,minValue:i(this.minutes)},n=s.template(t,a);this.$timepicker=e(n).appendTo(this.d.$datepicker),this.$ranges=e('[type="range"]',this.$timepicker),this.$hours=e('[name="hours"]',this.$timepicker),this.$minutes=e('[name="minutes"]',this.$timepicker),this.$hoursText=e(".datepicker--time-current-hours",this.$timepicker),this.$minutesText=e(".datepicker--time-current-minutes",this.$timepicker),this.d.ampm&&(this.$ampm=e('<span class="datepicker--time-current-ampm">').appendTo(e(".datepicker--time-current",this.$timepicker)).html(this.dayPeriod),this.$timepicker.addClass("-am-pm-"))},_updateCurrentTime:function(){var t=s.getLeadingZeroNum(this.displayHours),e=s.getLeadingZeroNum(this.minutes);this.$hoursText.html(t),this.$minutesText.html(e),this.d.ampm&&this.$ampm.html(this.dayPeriod)},_updateRanges:function(){this.$hours.attr({min:this.minHours,max:this.maxHours}).val(this.hours),this.$minutes.attr({min:this.minMinutes,max:this.maxMinutes}).val(this.minutes)},_handleDate:function(t){this._setDefaultMinMaxTime(),t&&(s.isSame(t,this.d.opts.minDate)?this._setMinTimeFromDate(this.d.opts.minDate):s.isSame(t,this.d.opts.maxDate)&&this._setMaxTimeFromDate(this.d.opts.maxDate)),this._validateHoursMinutes(t)},update:function(){this._updateRanges(),this._updateCurrentTime()},_getValidHoursFromDate:function(t,e){var i=t,a=t;t instanceof Date&&(i=s.getParsedDate(t),a=i.hours);var n=e||this.d.ampm,h="am";if(n)switch(!0){case 0==a:a=12;break;case 12==a:h="pm";break;case a>11:a-=12,h="pm"}return{hours:a,dayPeriod:h}},set hours(t){this._hours=t;var e=this._getValidHoursFromDate(t);this.displayHours=e.hours,this.dayPeriod=e.dayPeriod},get hours(){return this._hours},_onChangeRange:function(t){var i=e(t.target),s=i.attr("name");this.d.timepickerIsActive=!0,this[s]=i.val(),this._updateCurrentTime(),this.d._trigger("timeChange",[this.hours,this.minutes]),this._handleDate(this.d.lastSelectedDate),this.update()},_onSelectDate:function(t,e){this._handleDate(e),this.update()},_onMouseEnterRange:function(t){var i=e(t.target).attr("name");e(".datepicker--time-current-"+i,this.$timepicker).addClass("-focus-")},_onMouseOutRange:function(t){var i=e(t.target).attr("name");this.d.inFocus||e(".datepicker--time-current-"+i,this.$timepicker).removeClass("-focus-")},_onMouseUpRange:function(t){this.d.timepickerIsActive=!1}}}()}(window,jQuery);

/***/ }),

/***/ "./node_modules/air-datepicker/dist/js/i18n/datepicker.en.js":
/*!*******************************************************************!*\
  !*** ./node_modules/air-datepicker/dist/js/i18n/datepicker.en.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

;(function ($) { $.fn.datepicker.language['en'] = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'mm/dd/yyyy',
    timeFormat: 'hh:ii aa',
    firstDay: 0
}; })(jQuery);

/***/ }),

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),

/***/ "./node_modules/sortablejs/Sortable.js":
/*!*********************************************!*\
  !*** ./node_modules/sortablejs/Sortable.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzY2ZmI5YTcyNmVhNjIwZGNkODYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2NvbnRlbnQtbmF2LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGFzaGJvYXJkLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2RpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvbW9kdWxlcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9zY3NzL2FwcC5zY3NzP2YwNDEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvZGF0ZXBpY2tlci5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvaTE4bi9kYXRlcGlja2VyLmVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvcnRhYmxlanMvU29ydGFibGUuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiU3Vtb1NlbGVjdCIsInNlYXJjaCIsInBsYWNlaG9sZGVyIiwibGFuZyIsInNlYXJjaFRleHQiLCJjYXB0aW9uRm9ybWF0IiwiY2FwdGlvbkZvcm1hdEFsbFNlbGVjdGVkIiwibm9NYXRjaCIsInRpbWVyIiwiYWpheFN0YXJ0IiwiYXBwZW5kIiwibG9hZGVyIiwid2lkdGgiLCJpbmNyZW1lbnQiLCJzZXRJbnRlcnZhbCIsImNzcyIsImNsZWFySW50ZXJ2YWwiLCJhamF4U3VjY2VzcyIsImZhZGVPdXQiLCJyZW1vdmUiLCJhamF4RXJyb3IiLCJpbnRlcnZhbCIsInRpbWUiLCJidXR0b25TaG93IiwicHJvY2VzcyIsIndpbmRvdyIsInJlc2l6ZSIsIm5hdiIsIm1lbnUiLCJmaW5kIiwibWVudUl0ZW1zIiwibGVuZ3RoIiwibWVudUl0ZW1zV2lkdGgiLCJtYXAiLCJvZmZzZXRXaWR0aCIsIm1lbnVXaWR0aCIsImdldCIsImFkZEJ1dHRvbiIsInNjcm9sbEFjdGl2ZUJ1dHRvbiIsInJlbW92ZUJ1dHRvbiIsImFjdGl2ZUJ1dHRvbiIsImFjdGl2ZUJ1dHRvbk9mZnNldCIsInBvc2l0aW9uIiwibGVmdCIsInNjcm9sbExlZnQiLCJwcmVwZW5kIiwib24iLCJjb25zb2xlIiwibG9nIiwiYW5pbWF0ZSIsImFkZFN3aXBlIiwib2ZmIiwibWFyZ2luIiwibWMiLCJIYW1tZXIiLCJkb21FdmVudHMiLCJlIiwiZGVsdGEiLCJkZWx0YVgiLCJTb3J0YWJsZSIsImVsIiwicXVlcnlTZWxlY3RvciIsImRyYWdnYWJsZSIsImhhbmRsZSIsImFuaW1hdGlvbiIsImZvcmNlRmFsbGJhY2siLCJvbkVuZCIsImV2dCIsImVhY2giLCJ0byIsImNoaWxkcmVuIiwiaW5kZXgiLCJlbGVtZW50Iiwib3JkZXJVcmwiLCJkYXRhIiwicmVwbGFjZSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsImNvbXBsZXRlIiwicmVzcG9uc2UiLCJmbiIsImRhdGVwaWNrZXIiLCJsYW5ndWFnZSIsImRheXMiLCJkYXlzU2hvcnQiLCJkYXlzTWluIiwibW9udGhzIiwibW9udGhzU2hvcnQiLCJ0b2RheSIsImNsZWFyIiwiZGF0ZUZvcm1hdCIsInRpbWVGb3JtYXQiLCJmaXJzdERheSIsImpRdWVyeSIsInRvZGF5QnV0dG9uIiwiRGF0ZSIsImF1dG9DbG9zZSIsInRpbWVwaWNrZXIiLCJzZWxlY3REYXRlIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlIiwic2VsZiIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJwcm9wIiwidG9vbHRpcCIsInBvcG92ZXIiLCJ0cmlnZ2VyIiwiaHRtbCIsImNsaWNrIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsIm9wdGlvbiIsImdldEpTT04iLCJrZXkiLCJzdW1vIiwicmVsb2FkIiwicGFyZW50IiwibmV4dCIsImhvdmVyIiwibGlzdCIsImxpc3RIZWlnaHQiLCJvdXRlckhlaWdodCIsIm92ZXJmbG93IiwiaGVpZ2h0Iiwib2Zmc2V0VG9wIiwicGFyZW50TWVudSIsInBhcmVudHMiLCJhZGRDbGFzcyIsIm1vZGFsX3RpdGxlIiwibW9kYWxfYm9keSIsIm1vZGFsX3dpZHRoIiwidGVtcGxhdGUiLCJtZGwiLCJsb2NhdGlvbiIsImhyZWYiLCJhdHRyIiwiZm9ybSIsInN1Ym1pdCIsIm1vZGFsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7Ozs7QUFVQTs7O0FBR0EsbUJBQUFBLENBQVEsOERBQVI7O0FB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELFVBQVU7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTyxLQUFLO0FBQ3ZCLFdBQVcsT0FBTyxLQUFLO0FBQ3ZCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7O0FBRUQ7QUFDQSxVQUFVO0FBQ1YsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLGdC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Q0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2xsRkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDs7QUFFQSxlQUFlO0FBQ2YscUNBQXFDOzs7QUFHckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7QUFHQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qjs7QUFFdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixlQUFlLE9BQU87QUFDdEIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxFQUFFO0FBQ2pCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsT0FBTztBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7O0FBSUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekIsYUFBYSxTQUFTO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFlBQVksWUFBWTtBQUN4QixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL2FkbWluL2RlZmF1bHQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL2FwcC5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNjZmYjlhNzI2ZWE2MjBkY2Q4NiIsIi8qXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgRW1sYWtQUk8gcGFja2FnZS5cbiAqXG4gKiBAcGFja2FnZSAgICAgRW1sYWtQUk9cbiAqIEBhdXRob3IgICAgICBSYW1hemFuIEFQQVlESU4gPGlsZXRpc2ltQHJhbWF6YW5hcGF5ZGluLmNvbT5cbiAqIEBjb3B5cmlnaHQgICBDb3B5cmlnaHQgKGMpIDIwMTcgLSAyMDE4LCBXcml0ZUxOIFlhesSxbMSxbSBIaXptZXRsZXJpIFNhbi4gVGljLiBBLsWeIChodHRwOi8vd3JpdGVsbi5uZXQpXG4gKiBAbGljZW5zZSAgICAgTElDRU5TRVxuICogQGxpbmsgICAgICAgIGh0dHA6Ly9lbWxha3Byby5uZXRcbiAqL1xuXG4vKipcbiAqIExvYWQgU0NTUyBEZXBlbmRlbmNpZXNcbiAqL1xucmVxdWlyZSgnLi4vc2Nzcy9hcHAuc2NzcycpO1xuXG4vKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gTW9kdWxlc1xuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xucmVxdWlyZSgnLi9tb2R1bGVzL2RpcmVjdGl2ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2FqYXgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9tb2RhbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2NvbnRlbnQtbmF2Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZGF0ZXBpY2tlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL21lbnUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9kYXNoYm9hcmQnKTtcblxuLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIFBhZ2UgTG9hZFxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQ3VzdG9tIFNlbGVjdFxuICAgKi9cbiAgJCgnc2VsZWN0JykuU3Vtb1NlbGVjdCh7XG4gICAgc2VhcmNoOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiBsYW5nWydzZWFyY2hfcGxhY2Vob2xkZXInXSxcbiAgICBzZWFyY2hUZXh0OiBsYW5nWydzZWFyY2hfdGV4dCddLFxuICAgIGNhcHRpb25Gb3JtYXQ6IGxhbmdbJ3NlbGVjdF9jYXB0aW9uJ10sXG4gICAgY2FwdGlvbkZvcm1hdEFsbFNlbGVjdGVkOiBsYW5nWydzZWxlY3RfY2FwdGlvbl9hbGwnXSxcbiAgICBub01hdGNoOiBsYW5nWydzZWxlY3Rfbm9fbWF0Y2hlcyddXG4gIH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9hcHAuanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDEzIC0gMjAxNiwgT1RUT1NJU1RFTSAoaHR0cDovL290dG9zaXN0ZW0uY29tKVxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNiAtIDIwMTcsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICpcbiAqL1xuXG52YXIgdGltZXI7XG5cbi8qKlxuICogR2xvYmFsIEFqYXggU3RhcnRlZCBIYW5kbGVyXG4gKi9cbiQoZG9jdW1lbnQpLmFqYXhTdGFydChmdW5jdGlvbiAoKSB7XG4gIC8vIFNldCBBamF4IExvYWRlclxuICAkKCcuY29udGVudC13cmFwcGVyJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYWpheC1sb2FkZXJcIj48ZGl2IGNsYXNzPVwiYmFyXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgdmFyIGxvYWRlciA9ICQoJy5hamF4LWxvYWRlciAuYmFyJyk7XG4gIHZhciB3aWR0aCA9IDE1O1xuICB2YXIgaW5jcmVtZW50ID0gNTtcbiAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgd2lkdGggPSB3aWR0aCArIGluY3JlbWVudDtcbiAgICBsb2FkZXIuY3NzKCd3aWR0aCcsIHdpZHRoICsgJyUnKTtcbiAgICBpZiAod2lkdGggPj0gNDApIHtcbiAgICAgIGluY3JlbWVudCA9IDI7XG4gICAgfVxuICAgIGlmICh3aWR0aCA+PSA3MCkge1xuICAgICAgaW5jcmVtZW50ID0gMTtcbiAgICB9XG4gICAgaWYgKHdpZHRoID49IDkwKSB7XG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICB9XG4gIH0sIDUwKTtcbn0pO1xuXG4vKipcbiAqIEdsb2JhbCBBamF4IENvbXBsZXRlZCBIYW5kbGVyXG4gKi9cbiQoZG9jdW1lbnQpLmFqYXhTdWNjZXNzKGZ1bmN0aW9uICgpIHtcbiAgLy8gU3RvcCBUaW1lclxuICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAvLyBTZXQgQWpheCBDb21wbGV0ZVxuICAkKCcuYWpheC1sb2FkZXIgLmJhcicpXG4gICAgLmNzcygnd2lkdGgnLCAnMTAwJScpO1xuXG4gIC8vIFJlbW92ZSBBamF4IExvYWRlclxuICAkKCcuYWpheC1sb2FkZXInKS5mYWRlT3V0KDI1MCwgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucmVtb3ZlKCk7XG4gIH0pO1xufSk7XG5cbi8qKlxuICogR2xvYmFsIEFqYXggQ29tcGxldGVkIEhhbmRsZXJcbiAqL1xuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uICgpIHtcbiAgLy8gU3RvcCBUaW1lclxuICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAvLyBTZXQgQWpheCBEYW5nZXIgJiBDb21wbGV0ZVxuICAkKCcuYWpheC1sb2FkZXIgLmJhcicpXG4gICAgLmNzcygnYmFja2dyb3VuZCcsICdyZWQnKVxuICAgIC5jc3MoJ2JveC1zaGFkb3cnLCAnMCAwIDVweCAjZmQ0NjQ2JylcbiAgICAuY3NzKCd3aWR0aCcsICcxMDAlJyk7XG5cbiAgLy8gUmVtb3ZlIEFqYXggTG9hZGVyXG4gICQoJy5hamF4LWxvYWRlcicpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2FqYXguanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxucmVxdWlyZSgnaGFtbWVyanMnKTtcblxudmFyIGludGVydmFsID0gbnVsbDtcbnZhciB0aW1lID0gMTAwO1xudmFyIGJ1dHRvblNob3cgPSBmYWxzZTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIC8vIFN0YXJ0IEZpcnN0IFJ1blxuICBpbnRlcnZhbCA9IHNldEludGVydmFsKHByb2Nlc3MsIHRpbWUpO1xuXG4gIC8vIFJlc3RhcnQgV2luZG93IFJlc2l6ZVxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaW50ZXJ2YWwgPT09IG51bGwpIHtcbiAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwocHJvY2VzcywgdGltZSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vKipcbiAqIFByb2Nlc3MgU2Nyb2xsZXIgQnV0dG9uXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gIHZhciBuYXYgPSAkKCcjY29udGVudF9uYXYnKTtcbiAgdmFyIG1lbnUgPSBuYXYuZmluZCgnLm5hdicpO1xuICB2YXIgbWVudUl0ZW1zID0gbWVudS5maW5kKCc+IGxpJyk7XG5cbiAgaWYgKG1lbnUubGVuZ3RoKSB7XG4gICAgLy8gRmluZCBFbGVtZW50IFdpZHRoXG4gICAgdmFyIG1lbnVJdGVtc1dpZHRoID0gMDtcbiAgICBtZW51SXRlbXMubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lbnVJdGVtc1dpZHRoICs9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBPdmVyZmxvd1xuICAgIHZhciBtZW51V2lkdGggPSBtZW51LmdldCgwKS5vZmZzZXRXaWR0aDtcbiAgICBpZiAobWVudUl0ZW1zV2lkdGggPiBtZW51V2lkdGgpIHtcbiAgICAgIGFkZEJ1dHRvbihuYXYsIG1lbnUsIG1lbnVXaWR0aCk7XG4gICAgICBzY3JvbGxBY3RpdmVCdXR0b24obWVudVdpZHRoLCBtZW51KVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVCdXR0b24obmF2KTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIENMZWFyIEludGVydmFsXG4gIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICBpbnRlcnZhbCA9IG51bGw7XG59XG5cbi8qKlxuICogQWN0aXZlIEJ1dHRvbiBTY3JvbGxlclxuICogQHBhcmFtIG1lbnVXaWR0aFxuICogQHBhcmFtIG1lbnVcbiAqL1xuZnVuY3Rpb24gc2Nyb2xsQWN0aXZlQnV0dG9uKG1lbnVXaWR0aCwgbWVudSkge1xuICB2YXIgYWN0aXZlQnV0dG9uID0gbWVudS5maW5kKCdsaS5hY3RpdmUnKTtcbiAgdmFyIGFjdGl2ZUJ1dHRvbk9mZnNldCA9IGFjdGl2ZUJ1dHRvbi5wb3NpdGlvbigpLmxlZnQgKyBhY3RpdmVCdXR0b24ud2lkdGgoKTtcblxuICAvLyBDaGVjayBPdmVyZmxvd1xuICBpZiAoYWN0aXZlQnV0dG9uT2Zmc2V0ID4gbWVudVdpZHRoKSB7XG4gICAgbWVudS5zY3JvbGxMZWZ0KG1lbnUuc2Nyb2xsTGVmdCgpICsgKGFjdGl2ZUJ1dHRvbk9mZnNldCAtIG1lbnVXaWR0aCkpO1xuICB9XG59XG5cbi8qKlxuICogQWRkIFNjcm9sbGVyIEJ1dHRvblxuICogQHBhcmFtIG5hdlxuICogQHBhcmFtIG1lbnVcbiAqIEBwYXJhbSBtZW51V2lkdGhcbiAqL1xuZnVuY3Rpb24gYWRkQnV0dG9uKG5hdiwgbWVudSwgbWVudVdpZHRoKSB7XG4gIGlmIChidXR0b25TaG93ID09PSBmYWxzZSkge1xuICAgIG5hdi5wcmVwZW5kKCc8ZGl2IGlkPVwic2Nyb2xsZXJcIj48YSBjbGFzcz1cImxlZnRcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+bmF2aWdhdGVfYmVmb3JlPC9pPjwvYT48YSBjbGFzcz1cInJpZ2h0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPm5hdmlnYXRlX25leHQ8L2k+PC9hPjwvZGl2PicpO1xuXG4gICAgLy8gRW5hYmxlZCBCdXR0b25cbiAgICBidXR0b25TaG93ID0gdHJ1ZTtcblxuICAgIC8vIEVuYWJsZWQgRXZlbnRcbiAgICAkKCcjc2Nyb2xsZXInKVxuICAgICAgLm9uKCdjbGljaycsICcubGVmdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2cobWVudVdpZHRoKTtcbiAgICAgICAgbWVudS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBtZW51LnNjcm9sbExlZnQoKSAtIChtZW51V2lkdGggLyAxLjcpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLm9uKCdjbGljaycsICcucmlnaHQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1lbnUuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogbWVudS5zY3JvbGxMZWZ0KCkgKyAobWVudVdpZHRoIC8gMS43KVxuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAvLyBFbmFibGVkIFN3aXBlXG4gICAgYWRkU3dpcGUobWVudSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgU2Nyb2xsZXIgQnV0dG9uXG4gKiBAcGFyYW0gbmF2XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJ1dHRvbihuYXYpIHtcbiAgaWYgKGJ1dHRvblNob3cgPT09IHRydWUpIHtcbiAgICAvLyBEaXNhYmxlZCBCdXR0b25cbiAgICBidXR0b25TaG93ID0gZmFsc2U7XG5cbiAgICAvLyBSZW1vdmUgU2Nyb2xsZXIgQnV0dG9uXG4gICAgbmF2LmZpbmQoJyNzY3JvbGxlcicpLnJlbW92ZSgpO1xuXG4gICAgLy8gRGlzYWJsZSBFdmVudFxuICAgICQoJyNzY3JvbGxlcicpXG4gICAgICAub2ZmKCdjbGljaycsICcubGVmdCcpXG4gICAgICAub2ZmKCdjbGljaycsICcucmlnaHQnKVxuICB9XG59XG5cbi8qKlxuICogU3dpcGUgTWVudVxuICogQHBhcmFtIG1lbnVcbiAqL1xuZnVuY3Rpb24gYWRkU3dpcGUobWVudSkge1xuICB2YXIgbWFyZ2luO1xuICB2YXIgbWMgPSBuZXcgSGFtbWVyKG1lbnUuZ2V0KDApLCB7XG4gICAgZG9tRXZlbnRzOiB0cnVlXG4gIH0pO1xuXG4gIG1jXG4gICAgLm9uKFwicGFuc3RhcnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1hcmdpbiA9IC0xICogbWVudS5zY3JvbGxMZWZ0KCk7XG4gICAgfSlcbiAgICAub24oXCJwYW5cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBkZWx0YSA9IG1hcmdpbiArIGUuZGVsdGFYO1xuICAgICAgbWVudS5zY3JvbGxMZWZ0KC0xICogZGVsdGEpO1xuICAgIH0pXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvY29udGVudC1uYXYuanMiLCIvKipcbiAqIFdpZGdldCBTb3J0YWJsZVxuICovXG5sZXQgU29ydGFibGUgPSByZXF1aXJlKCdzb3J0YWJsZWpzJyk7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQnKTtcbiAgaWYgKGVsKSB7XG4gICAgbmV3IFNvcnRhYmxlKGVsLCB7XG4gICAgICBkcmFnZ2FibGU6IFwiLndpZGdldFwiLFxuICAgICAgaGFuZGxlOiBcIi5tb3ZlclwiLFxuICAgICAgYW5pbWF0aW9uOiAyMDAsXG4gICAgICBmb3JjZUZhbGxiYWNrOiB0cnVlLFxuXG4gICAgICBvbkVuZDogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAkLmVhY2goZXZ0LnRvLmNoaWxkcmVuLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBHZXQgT3JkZXIgVVJMXG4gICAgICAgICAgbGV0IG9yZGVyVXJsID0gJChlbGVtZW50KS5kYXRhKCdvcmRlcicpO1xuICAgICAgICAgIG9yZGVyVXJsID0gb3JkZXJVcmwucmVwbGFjZSgnMCcsIGluZGV4KTtcblxuICAgICAgICAgIC8vIFNlbmQgQWpheCBEYXRhXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogb3JkZXJVcmwsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGFzaGJvYXJkLmpzIiwiLypcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBFbWxha1BSTyBwYWNrYWdlLlxuICpcbiAqIEBwYWNrYWdlICAgICBFbWxha1BST1xuICogQGF1dGhvciAgICAgIFJhbWF6YW4gQVBBWURJTiA8aWxldGlzaW1AcmFtYXphbmFwYXlkaW4uY29tPlxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNyAtIDIwMTgsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICovXG5cbi8vIExvYWQgQWlyIERhdGVwaWNrZXJcbnJlcXVpcmUoJ2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvZGF0ZXBpY2tlci5taW4nKTtcbnJlcXVpcmUoJ2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvaTE4bi9kYXRlcGlja2VyLmVuJyk7XG5cbi8vIEN1c3RvbSBMYW5ndWFnZVxuKGZ1bmN0aW9uICgkKSB7XG4gICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVsndHInXSA9IHtcbiAgICBkYXlzOiBbJ1BhemFyJywgJ1BhemFydGVzaScsICdTYWzEsScsICfDh2FyxZ9hbWJhJywgJ1BlcsWfZW1iZScsICdDdW1hJywgJ0N1bWFydGVzaSddLFxuICAgIGRheXNTaG9ydDogWydQenInLCAnUHRzJywgJ1NhbCcsICfDh3LFnycsICdQcsWfJywgJ0N1bScsICdDdHMnXSxcbiAgICBkYXlzTWluOiBbJ1B6JywgJ1B0JywgJ1NsJywgJ8OHcicsICdQcicsICdDbScsICdDdCddLFxuICAgIG1vbnRoczogWydPY2FrJywgJ8WedWJhdCcsICdNYXJ0JywgJ05pc2FuJywgJ01hecSxcycsICdIYXrEsXJhbicsICdUZW1tdXonLCAnQcSfdXN0b3MnLCAnRXlsw7xsJywgJ0VraW0nLCAnS2FzxLFtJywgJ0FyYWzEsWsnXSxcbiAgICBtb250aHNTaG9ydDogWydPY2EnLCAnxZ51YicsICdNYXInLCAnTmlzJywgJ01heScsICdIYXonLCAnVGVtJywgJ0HEn3UnLCAnRXlsJywgJ0VraScsICdLYXMnLCAnQXJhJ10sXG4gICAgdG9kYXk6ICdCdWfDvG4nLFxuICAgIGNsZWFyOiAnVGVtaXpsZScsXG4gICAgZGF0ZUZvcm1hdDogJ21tL2RkL3l5eXknLFxuICAgIHRpbWVGb3JtYXQ6ICdoaDppaSBhYScsXG4gICAgZmlyc3REYXk6IDBcbiAgfTtcbn0pKGpRdWVyeSk7XG5cbi8vIExvYWQgRGF0ZSBUaW1lIFBpY2tlclxuJChmdW5jdGlvbiAoKSB7XG4gICQuZWFjaCgkKCdbZGF0YS1waWNrZXI9ZGF0ZV0nKSwgZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICQoZWwpXG4gICAgICAuZGF0ZXBpY2tlcih7XG4gICAgICAgIHRvZGF5QnV0dG9uOiBuZXcgRGF0ZSgpLFxuICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXG4gICAgICAgIGxhbmd1YWdlOiAndHInLFxuICAgICAgICBwb3NpdGlvbjogJ3RvcCBsZWZ0JyxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ3l5eXktbW0tZGQnLFxuICAgICAgICB0aW1lRm9ybWF0OiAnaGg6aWknLFxuICAgICAgICB0aW1lcGlja2VyOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcbiAgICAgIC5zZWxlY3REYXRlKG5ldyBEYXRlKGVsLmdldEF0dHJpYnV0ZSgndmFsdWUnKSkpO1xuICB9KTtcblxuICAkLmVhY2goJCgnW2RhdGEtcGlja2VyPWRhdGV0aW1lXScpLCBmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgJChlbClcbiAgICAgIC5kYXRlcGlja2VyKHtcbiAgICAgICAgdG9kYXlCdXR0b246IG5ldyBEYXRlKCksXG4gICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICd0cicsXG4gICAgICAgIHBvc2l0aW9uOiAndG9wIGxlZnQnLFxuICAgICAgICBkYXRlRm9ybWF0OiAneXl5eS1tbS1kZCcsXG4gICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gICAgICAgIHRpbWVwaWNrZXI6IHRydWVcbiAgICAgIH0pXG4gICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXG4gICAgICAuc2VsZWN0RGF0ZShuZXcgRGF0ZShlbC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykucmVwbGFjZSgvXFxzLywgJ1QnKSkpO1xuICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGF0ZXBpY2tlci5qcyIsIi8qXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgRW1sYWtQUk8gcGFja2FnZS5cbiAqXG4gKiBAcGFja2FnZSAgICAgRW1sYWtQUk9cbiAqIEBhdXRob3IgICAgICBSYW1hemFuIEFQQVlESU4gPGlsZXRpc2ltQHJhbWF6YW5hcGF5ZGluLmNvbT5cbiAqIEBjb3B5cmlnaHQgICBDb3B5cmlnaHQgKGMpIDIwMTcgLSAyMDE4LCBXcml0ZUxOIFlhesSxbMSxbSBIaXptZXRsZXJpIFNhbi4gVGljLiBBLsWeIChodHRwOi8vd3JpdGVsbi5uZXQpXG4gKiBAbGljZW5zZSAgICAgTElDRU5TRVxuICogQGxpbmsgICAgICAgIGh0dHA6Ly9lbWxha3Byby5uZXRcbiAqL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBTZWxlY3QgQWxsIENoZWNrYm94XG4gICAqL1xuICAkKFwiW2RhdGEtc2VsZWN0LWFsbF1cIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgdmFyIGNvbnRhaW5lciA9IHNlbGYuY2xvc2VzdChzZWxmLmRhdGEoJ3NlbGVjdC1hbGwnKSk7XG4gICAgc2VsZi5wcm9wKCdjaGVja2VkJywgKHNlbGYucHJvcCgnY2hlY2tlZCcpID09IG51bGwgfHwgc2VsZi5wcm9wKCdjaGVja2VkJykgPT0gdHJ1ZSkgPyBmYWxzZSA6IHRydWUpO1xuICAgIGNvbnRhaW5lci5maW5kKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLnByb3AoJ2NoZWNrZWQnLCAhc2VsZi5wcm9wKCdjaGVja2VkJykpO1xuICB9KTtcblxuICAvKipcbiAgICogQm9vdHN0cmFwIFRvb2x0aXAgQWN0aXZhdGVcbiAgICovXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0sIFtkYXRhLXRvb2x0aXBdJykudG9vbHRpcCgpO1xuXG5cbiAgLyoqXG4gICAqIEJvb3RzdHJhcCBQb3BvdmVyXG4gICAqL1xuICAkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJylcbiAgICAucG9wb3Zlcih7XG4gICAgICB0cmlnZ2VyOiAnZm9jdXMnLFxuICAgICAgaHRtbDogdHJ1ZVxuICAgIH0pXG4gICAgLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cblxuICAvKipcbiAgICogRWxlbWVudCBDaGFuZ2UgRXZlbnQgdG8gT3RoZXIgRWxlbWVudFxuICAgKi9cbiAgJCgnW2RhdGEtY2hhbmdlXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1jaGFuZ2UnKTtcbiAgICB2YXIgdXJsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2hhbmdlLXVybCcpICsgJy8nICsgdGhpcy52YWx1ZTtcblxuICAgIC8vIFNlbmQgQWpheFxuICAgIHZhciBvcHRpb24gPSAnJztcbiAgICAkLmdldEpTT04odXJsLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICQuZWFjaChyZXNwb25zZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgb3B0aW9uICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGtleSArICdcIj4nICsgdmFsdWUgKyAnPC9vcHRpb24+JztcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXcml0ZSBFbGVtZW50XG4gICAgICAkKGVsZW1lbnQpLmh0bWwob3B0aW9uKTtcblxuICAgICAgLy8gUmVsb2FkIFN1bW9zZWxlY3RcbiAgICAgICQoZWxlbWVudClbMF0uc3Vtby5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJhbmdlIFZhbHVlIFdyaXRlclxuICAgKi9cbiAgJChkb2N1bWVudCkub24oJ2lucHV0IGNoYW5nZScsICdbZGF0YS1yYW5nZV0nLCBmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLm5leHQoKS5odG1sKHRoaXMudmFsdWUpXG4gIH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2RpcmVjdGl2ZS5qcyIsIiQoZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogTWFpbiBOYXZpZ2F0aW9uIEF1dG8gUG9zaXRpb25cbiAgICovXG4gICQoJyNuYXZfbWFpbicpLmZpbmQoJz4gdWwgPiBsaScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGlzdCA9ICQodGhpcykuZmluZCgndWwnKTtcbiAgICBpZiAobGlzdC5sZW5ndGggPj0gMSkge1xuICAgICAgdmFyIGxpc3RIZWlnaHQgPSBsaXN0Lm91dGVySGVpZ2h0KCk7XG4gICAgICB2YXIgb3ZlcmZsb3cgPSAkKGRvY3VtZW50KS5oZWlnaHQoKSAtIHRoaXMub2Zmc2V0VG9wO1xuXG4gICAgICBpZiAob3ZlcmZsb3cgPCBsaXN0SGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLm9mZnNldFRvcCA+IGxpc3RIZWlnaHQpIHtcbiAgICAgICAgICBsaXN0LmNzcygndG9wJywgJ2F1dG8nKTtcbiAgICAgICAgICBsaXN0LmNzcygnYm90dG9tJywgJzAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0LmNzcygndG9wJywgJy0nICsgKGxpc3RIZWlnaHQgLSBvdmVyZmxvdykgKyAncHgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIFBhcmVudCBNZW51c1xuICAgKiBAdHlwZSB7KnxqUXVlcnl9XG4gICAqL1xuICBsZXQgcGFyZW50TWVudSA9ICQoJ3VsW2RhdGEtcGFyZW50XScpLmRhdGEoJ3BhcmVudCcpO1xuXG4gIC8vIFNlbGVjdCBQYXJlbnQgTWVudVxuICBpZiAocGFyZW50TWVudSkge1xuICAgICQoYHVsIGFbaHJlZj1cIiR7cGFyZW50TWVudX1cIl06bm90KFwidWxbZGF0YS1wYXJlbnRdIGFcIik6bGFzdGApXG4gICAgICAucGFyZW50cygnbGknKVxuICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICB9IGVsc2Uge1xuICAgICQoJ3VsIGxpLmFjdGl2ZTpsYXN0JylcbiAgICAgIC5wYXJlbnRzKCdsaScpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvbW9kdWxlcy9tZW51LmpzIiwiLypcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBFbWxha1BSTyBwYWNrYWdlLlxuICpcbiAqIEBwYWNrYWdlICAgICBFbWxha1BST1xuICogQGF1dGhvciAgICAgIFJhbWF6YW4gQVBBWURJTiA8aWxldGlzaW1AcmFtYXphbmFwYXlkaW4uY29tPlxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNyAtIDIwMTgsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgJCgnW2RhdGEtbW9kYWxdJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBTdG9wIFByb3BhZ2F0aW9uXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gTW9kYWwgVmFyaWFibGVcbiAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgdmFyIG1vZGFsX3RpdGxlID0gc2VsZi5kYXRhKCdtb2RhbC10aXRsZScpLFxuICAgICAgbW9kYWxfYm9keSA9IHNlbGYuZGF0YSgnbW9kYWwtYm9keScpLFxuICAgICAgbW9kYWxfd2lkdGggPSBzZWxmLmRhdGEoJ21vZGFsLXdpZHRoJyksXG4gICAgICB0ZW1wbGF0ZSA9XG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZmFkZSBtb2RhbCBjb25maXJtXCIgaWQ9XCJjb25maXJtTW9kYWxcIiB0YWJpbmRleD1cIi0xXCI+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cge21vZGFsV2lkdGh9XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj48aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj57bW9kYWxUaXRsZX08L2k+PC9oND48L2Rpdj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+e21vZGFsQm9keX08L2Rpdj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nICtcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJidG5Ob1wiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnkgbm9cIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPntidG5Ob308L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJidG5ZZXNcIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyB5ZXNcIiA+e2J0blllc308L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAvLyBTZXQgQ29udGVudFxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgne21vZGFsVGl0bGV9JywgbW9kYWxfdGl0bGUgPyBtb2RhbF90aXRsZSA6ICd3YXJuaW5nJyk7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7bW9kYWxCb2R5fScsIG1vZGFsX2JvZHkgPyBtb2RhbF9ib2R5IDogbGFuZ1sncG9wdXBfZGVsZXRlX21lc3NhZ2UnXSk7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7YnRuTm99JywgbGFuZ1snYnRuX2Nsb3NlJ10pO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgne2J0blllc30nLCBsYW5nWydidG5feWVzJ10pO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgne21vZGFsV2lkdGh9JywgbW9kYWxfd2lkdGggPyBtb2RhbF93aWR0aCA6ICdtb2RhbC1zbScpO1xuXG4gICAgLy8gV3JpdGVcbiAgICB2YXIgbWRsID0gJCgnI21vZGFscycpLmh0bWwodGVtcGxhdGUpO1xuXG4gICAgLyoqXG4gICAgICogQ29uZmlybVxuICAgICAqL1xuICAgIGlmIChzZWxmLmRhdGEoJ21vZGFsJykgPT09ICdjb25maXJtJykge1xuICAgICAgbWRsLm9mZignY2xpY2snLCAnI2J0blllcycpO1xuICAgICAgbWRsLm9uKCdjbGljaycsICcjYnRuWWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNlbGYuYXR0cignaHJlZicpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlybSBGb3JtIFN1Ym1pdFxuICAgICAqL1xuICAgIGlmIChzZWxmLmRhdGEoJ21vZGFsJykgPT09ICdjb25maXJtLWZvcm0nKSB7XG4gICAgICBtZGwub2ZmKCdjbGljaycsICcjYnRuWWVzJyk7XG4gICAgICBtZGwub24oJ2NsaWNrJywgJyNidG5ZZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmb3JtID0gJChzZWxmLmRhdGEoJ2Zvcm0nKSk7XG4gICAgICAgIGZvcm0uYXR0cignYWN0aW9uJywgc2VsZi5hdHRyKCdocmVmJykgPyBzZWxmLmF0dHIoJ2hyZWYnKSA6IHNlbGYuZGF0YSgnaHJlZicpKTtcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZm9cbiAgICAgKi9cbiAgICBpZiAoc2VsZi5kYXRhKCdtb2RhbCcpID09PSAnaW5mbycpIHtcbiAgICAgIGNvbnNvbGUubG9nKG1kbCk7XG4gICAgICAkKG1kbCkuZmluZCgnI2J0blllcycpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIFNob3cgTW9kYWxcbiAgICAkKCcjY29uZmlybU1vZGFsJykubW9kYWwoKTtcbiAgfSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvbW9kYWwuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL2FkbWluL2RlZmF1bHQvc2Nzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9zY3NzL2FwcC5zY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiFmdW5jdGlvbih0LGUsaSl7IWZ1bmN0aW9uKCl7dmFyIHMsYSxuLGg9XCIyLjIuM1wiLG89XCJkYXRlcGlja2VyXCIscj1cIi5kYXRlcGlja2VyLWhlcmVcIixjPSExLGQ9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyXCI+PGkgY2xhc3M9XCJkYXRlcGlja2VyLS1wb2ludGVyXCI+PC9pPjxuYXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXZcIj48L25hdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY29udGVudFwiPjwvZGl2PjwvZGl2PicsbD17Y2xhc3NlczpcIlwiLGlubGluZTohMSxsYW5ndWFnZTpcInJ1XCIsc3RhcnREYXRlOm5ldyBEYXRlLGZpcnN0RGF5OlwiXCIsd2Vla2VuZHM6WzYsMF0sZGF0ZUZvcm1hdDpcIlwiLGFsdEZpZWxkOlwiXCIsYWx0RmllbGREYXRlRm9ybWF0OlwiQFwiLHRvZ2dsZVNlbGVjdGVkOiEwLGtleWJvYXJkTmF2OiEwLHBvc2l0aW9uOlwiYm90dG9tIGxlZnRcIixvZmZzZXQ6MTIsdmlldzpcImRheXNcIixtaW5WaWV3OlwiZGF5c1wiLHNob3dPdGhlck1vbnRoczohMCxzZWxlY3RPdGhlck1vbnRoczohMCxtb3ZlVG9PdGhlck1vbnRoc09uU2VsZWN0OiEwLHNob3dPdGhlclllYXJzOiEwLHNlbGVjdE90aGVyWWVhcnM6ITAsbW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0OiEwLG1pbkRhdGU6XCJcIixtYXhEYXRlOlwiXCIsZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlOiEwLG11bHRpcGxlRGF0ZXM6ITEsbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjpcIixcIixyYW5nZTohMSx0b2RheUJ1dHRvbjohMSxjbGVhckJ1dHRvbjohMSxzaG93RXZlbnQ6XCJmb2N1c1wiLGF1dG9DbG9zZTohMSxtb250aHNGaWVsZDpcIm1vbnRoc1Nob3J0XCIscHJldkh0bWw6Jzxzdmc+PHBhdGggZD1cIk0gMTcsMTIgbCAtNSw1IGwgNSw1XCI+PC9wYXRoPjwvc3ZnPicsbmV4dEh0bWw6Jzxzdmc+PHBhdGggZD1cIk0gMTQsMTIgbCA1LDUgbCAtNSw1XCI+PC9wYXRoPjwvc3ZnPicsbmF2VGl0bGVzOntkYXlzOlwiTU0sIDxpPnl5eXk8L2k+XCIsbW9udGhzOlwieXl5eVwiLHllYXJzOlwieXl5eTEgLSB5eXl5MlwifSx0aW1lcGlja2VyOiExLG9ubHlUaW1lcGlja2VyOiExLGRhdGVUaW1lU2VwYXJhdG9yOlwiIFwiLHRpbWVGb3JtYXQ6XCJcIixtaW5Ib3VyczowLG1heEhvdXJzOjI0LG1pbk1pbnV0ZXM6MCxtYXhNaW51dGVzOjU5LGhvdXJzU3RlcDoxLG1pbnV0ZXNTdGVwOjEsb25TZWxlY3Q6XCJcIixvblNob3c6XCJcIixvbkhpZGU6XCJcIixvbkNoYW5nZU1vbnRoOlwiXCIsb25DaGFuZ2VZZWFyOlwiXCIsb25DaGFuZ2VEZWNhZGU6XCJcIixvbkNoYW5nZVZpZXc6XCJcIixvblJlbmRlckNlbGw6XCJcIn0sdT17Y3RybFJpZ2h0OlsxNywzOV0sY3RybFVwOlsxNywzOF0sY3RybExlZnQ6WzE3LDM3XSxjdHJsRG93bjpbMTcsNDBdLHNoaWZ0UmlnaHQ6WzE2LDM5XSxzaGlmdFVwOlsxNiwzOF0sc2hpZnRMZWZ0OlsxNiwzN10sc2hpZnREb3duOlsxNiw0MF0sYWx0VXA6WzE4LDM4XSxhbHRSaWdodDpbMTgsMzldLGFsdExlZnQ6WzE4LDM3XSxhbHREb3duOlsxOCw0MF0sY3RybFNoaWZ0VXA6WzE2LDE3LDM4XX0sbT1mdW5jdGlvbih0LGEpe3RoaXMuZWw9dCx0aGlzLiRlbD1lKHQpLHRoaXMub3B0cz1lLmV4dGVuZCghMCx7fSxsLGEsdGhpcy4kZWwuZGF0YSgpKSxzPT1pJiYocz1lKFwiYm9keVwiKSksdGhpcy5vcHRzLnN0YXJ0RGF0ZXx8KHRoaXMub3B0cy5zdGFydERhdGU9bmV3IERhdGUpLFwiSU5QVVRcIj09dGhpcy5lbC5ub2RlTmFtZSYmKHRoaXMuZWxJc0lucHV0PSEwKSx0aGlzLm9wdHMuYWx0RmllbGQmJih0aGlzLiRhbHRGaWVsZD1cInN0cmluZ1wiPT10eXBlb2YgdGhpcy5vcHRzLmFsdEZpZWxkP2UodGhpcy5vcHRzLmFsdEZpZWxkKTp0aGlzLm9wdHMuYWx0RmllbGQpLHRoaXMuaW5pdGVkPSExLHRoaXMudmlzaWJsZT0hMSx0aGlzLnNpbGVudD0hMSx0aGlzLmN1cnJlbnREYXRlPXRoaXMub3B0cy5zdGFydERhdGUsdGhpcy5jdXJyZW50Vmlldz10aGlzLm9wdHMudmlldyx0aGlzLl9jcmVhdGVTaG9ydEN1dHMoKSx0aGlzLnNlbGVjdGVkRGF0ZXM9W10sdGhpcy52aWV3cz17fSx0aGlzLmtleXM9W10sdGhpcy5taW5SYW5nZT1cIlwiLHRoaXMubWF4UmFuZ2U9XCJcIix0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZT1cIlwiLHRoaXMuaW5pdCgpfTtuPW0sbi5wcm90b3R5cGU9e1ZFUlNJT046aCx2aWV3SW5kZXhlczpbXCJkYXlzXCIsXCJtb250aHNcIixcInllYXJzXCJdLGluaXQ6ZnVuY3Rpb24oKXtjfHx0aGlzLm9wdHMuaW5saW5lfHwhdGhpcy5lbElzSW5wdXR8fHRoaXMuX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXIoKSx0aGlzLl9idWlsZEJhc2VIdG1sKCksdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSksdGhpcy5fc3luY1dpdGhNaW5NYXhEYXRlcygpLHRoaXMuZWxJc0lucHV0JiYodGhpcy5vcHRzLmlubGluZXx8KHRoaXMuX3NldFBvc2l0aW9uQ2xhc3Nlcyh0aGlzLm9wdHMucG9zaXRpb24pLHRoaXMuX2JpbmRFdmVudHMoKSksdGhpcy5vcHRzLmtleWJvYXJkTmF2JiYhdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyJiZ0aGlzLl9iaW5kS2V5Ym9hcmRFdmVudHMoKSx0aGlzLiRkYXRlcGlja2VyLm9uKFwibW91c2Vkb3duXCIsdGhpcy5fb25Nb3VzZURvd25EYXRlcGlja2VyLmJpbmQodGhpcykpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZXVwXCIsdGhpcy5fb25Nb3VzZVVwRGF0ZXBpY2tlci5iaW5kKHRoaXMpKSksdGhpcy5vcHRzLmNsYXNzZXMmJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpLHRoaXMub3B0cy50aW1lcGlja2VyJiYodGhpcy50aW1lcGlja2VyPW5ldyBlLmZuLmRhdGVwaWNrZXIuVGltZXBpY2tlcih0aGlzLHRoaXMub3B0cyksdGhpcy5fYmluZFRpbWVwaWNrZXJFdmVudHMoKSksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyJiZ0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKFwiLW9ubHktdGltZXBpY2tlci1cIiksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XT1uZXcgZS5mbi5kYXRlcGlja2VyLkJvZHkodGhpcyx0aGlzLmN1cnJlbnRWaWV3LHRoaXMub3B0cyksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5zaG93KCksdGhpcy5uYXY9bmV3IGUuZm4uZGF0ZXBpY2tlci5OYXZpZ2F0aW9uKHRoaXMsdGhpcy5vcHRzKSx0aGlzLnZpZXc9dGhpcy5jdXJyZW50Vmlldyx0aGlzLiRlbC5vbihcImNsaWNrQ2VsbC5hZHBcIix0aGlzLl9vbkNsaWNrQ2VsbC5iaW5kKHRoaXMpKSx0aGlzLiRkYXRlcGlja2VyLm9uKFwibW91c2VlbnRlclwiLFwiLmRhdGVwaWNrZXItLWNlbGxcIix0aGlzLl9vbk1vdXNlRW50ZXJDZWxsLmJpbmQodGhpcykpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZWxlYXZlXCIsXCIuZGF0ZXBpY2tlci0tY2VsbFwiLHRoaXMuX29uTW91c2VMZWF2ZUNlbGwuYmluZCh0aGlzKSksdGhpcy5pbml0ZWQ9ITB9LF9jcmVhdGVTaG9ydEN1dHM6ZnVuY3Rpb24oKXt0aGlzLm1pbkRhdGU9dGhpcy5vcHRzLm1pbkRhdGU/dGhpcy5vcHRzLm1pbkRhdGU6bmV3IERhdGUoLTg2Mzk5OTk5MTM2ZTUpLHRoaXMubWF4RGF0ZT10aGlzLm9wdHMubWF4RGF0ZT90aGlzLm9wdHMubWF4RGF0ZTpuZXcgRGF0ZSg4NjM5OTk5OTEzNmU1KX0sX2JpbmRFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLiRlbC5vbih0aGlzLm9wdHMuc2hvd0V2ZW50K1wiLmFkcFwiLHRoaXMuX29uU2hvd0V2ZW50LmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwibW91c2V1cC5hZHBcIix0aGlzLl9vbk1vdXNlVXBFbC5iaW5kKHRoaXMpKSx0aGlzLiRlbC5vbihcImJsdXIuYWRwXCIsdGhpcy5fb25CbHVyLmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwia2V5dXAuYWRwXCIsdGhpcy5fb25LZXlVcEdlbmVyYWwuYmluZCh0aGlzKSksZSh0KS5vbihcInJlc2l6ZS5hZHBcIix0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpKSxlKFwiYm9keVwiKS5vbihcIm1vdXNldXAuYWRwXCIsdGhpcy5fb25Nb3VzZVVwQm9keS5iaW5kKHRoaXMpKX0sX2JpbmRLZXlib2FyZEV2ZW50czpmdW5jdGlvbigpe3RoaXMuJGVsLm9uKFwia2V5ZG93bi5hZHBcIix0aGlzLl9vbktleURvd24uYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJrZXl1cC5hZHBcIix0aGlzLl9vbktleVVwLmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwiaG90S2V5LmFkcFwiLHRoaXMuX29uSG90S2V5LmJpbmQodGhpcykpfSxfYmluZFRpbWVwaWNrZXJFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLiRlbC5vbihcInRpbWVDaGFuZ2UuYWRwXCIsdGhpcy5fb25UaW1lQ2hhbmdlLmJpbmQodGhpcykpfSxpc1dlZWtlbmQ6ZnVuY3Rpb24odCl7cmV0dXJuLTEhPT10aGlzLm9wdHMud2Vla2VuZHMuaW5kZXhPZih0KX0sX2RlZmluZUxvY2FsZTpmdW5jdGlvbih0KXtcInN0cmluZ1wiPT10eXBlb2YgdD8odGhpcy5sb2M9ZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlW3RdLHRoaXMubG9jfHwoY29uc29sZS53YXJuKFwiQ2FuJ3QgZmluZCBsYW5ndWFnZSBcXFwiXCIrdCsnXCIgaW4gRGF0ZXBpY2tlci5sYW5ndWFnZSwgd2lsbCB1c2UgXCJydVwiIGluc3RlYWQnKSx0aGlzLmxvYz1lLmV4dGVuZCghMCx7fSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUpKSx0aGlzLmxvYz1lLmV4dGVuZCghMCx7fSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUsZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlW3RdKSk6dGhpcy5sb2M9ZS5leHRlbmQoITAse30sZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1LHQpLHRoaXMub3B0cy5kYXRlRm9ybWF0JiYodGhpcy5sb2MuZGF0ZUZvcm1hdD10aGlzLm9wdHMuZGF0ZUZvcm1hdCksdGhpcy5vcHRzLnRpbWVGb3JtYXQmJih0aGlzLmxvYy50aW1lRm9ybWF0PXRoaXMub3B0cy50aW1lRm9ybWF0KSxcIlwiIT09dGhpcy5vcHRzLmZpcnN0RGF5JiYodGhpcy5sb2MuZmlyc3REYXk9dGhpcy5vcHRzLmZpcnN0RGF5KSx0aGlzLm9wdHMudGltZXBpY2tlciYmKHRoaXMubG9jLmRhdGVGb3JtYXQ9W3RoaXMubG9jLmRhdGVGb3JtYXQsdGhpcy5sb2MudGltZUZvcm1hdF0uam9pbih0aGlzLm9wdHMuZGF0ZVRpbWVTZXBhcmF0b3IpKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJih0aGlzLmxvYy5kYXRlRm9ybWF0PXRoaXMubG9jLnRpbWVGb3JtYXQpO3ZhciBpPXRoaXMuX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDsodGhpcy5sb2MudGltZUZvcm1hdC5tYXRjaChpKFwiYWFcIikpfHx0aGlzLmxvYy50aW1lRm9ybWF0Lm1hdGNoKGkoXCJBQVwiKSkpJiYodGhpcy5hbXBtPSEwKX0sX2J1aWxkRGF0ZXBpY2tlcnNDb250YWluZXI6ZnVuY3Rpb24oKXtjPSEwLHMuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlcnMtY29udGFpbmVyXCIgaWQ9XCJkYXRlcGlja2Vycy1jb250YWluZXJcIj48L2Rpdj4nKSxhPWUoXCIjZGF0ZXBpY2tlcnMtY29udGFpbmVyXCIpfSxfYnVpbGRCYXNlSHRtbDpmdW5jdGlvbigpe3ZhciB0LGk9ZSgnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItaW5saW5lXCI+Jyk7dD1cIklOUFVUXCI9PXRoaXMuZWwubm9kZU5hbWU/dGhpcy5vcHRzLmlubGluZT9pLmluc2VydEFmdGVyKHRoaXMuJGVsKTphOmkuYXBwZW5kVG8odGhpcy4kZWwpLHRoaXMuJGRhdGVwaWNrZXI9ZShkKS5hcHBlbmRUbyh0KSx0aGlzLiRjb250ZW50PWUoXCIuZGF0ZXBpY2tlci0tY29udGVudFwiLHRoaXMuJGRhdGVwaWNrZXIpLHRoaXMuJG5hdj1lKFwiLmRhdGVwaWNrZXItLW5hdlwiLHRoaXMuJGRhdGVwaWNrZXIpfSxfdHJpZ2dlck9uQ2hhbmdlOmZ1bmN0aW9uKCl7aWYoIXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgpe2lmKFwiXCI9PT10aGlzLl9wcmV2T25TZWxlY3RWYWx1ZSlyZXR1cm47cmV0dXJuIHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlPVwiXCIsdGhpcy5vcHRzLm9uU2VsZWN0KFwiXCIsXCJcIix0aGlzKX12YXIgdCxlPXRoaXMuc2VsZWN0ZWREYXRlcyxpPW4uZ2V0UGFyc2VkRGF0ZShlWzBdKSxzPXRoaXMsYT1uZXcgRGF0ZShpLnllYXIsaS5tb250aCxpLmRhdGUsaS5ob3VycyxpLm1pbnV0ZXMpO3Q9ZS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHMuZm9ybWF0RGF0ZShzLmxvYy5kYXRlRm9ybWF0LHQpfSkuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvciksKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzfHx0aGlzLm9wdHMucmFuZ2UpJiYoYT1lLm1hcChmdW5jdGlvbih0KXt2YXIgZT1uLmdldFBhcnNlZERhdGUodCk7cmV0dXJuIG5ldyBEYXRlKGUueWVhcixlLm1vbnRoLGUuZGF0ZSxlLmhvdXJzLGUubWludXRlcyl9KSksdGhpcy5fcHJldk9uU2VsZWN0VmFsdWU9dCx0aGlzLm9wdHMub25TZWxlY3QodCxhLHRoaXMpfSxuZXh0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5wYXJzZWREYXRlLGU9dGhpcy5vcHRzO3N3aXRjaCh0aGlzLnZpZXcpe2Nhc2VcImRheXNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyLHQubW9udGgrMSwxKSxlLm9uQ2hhbmdlTW9udGgmJmUub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsdGhpcy5wYXJzZWREYXRlLnllYXIpO2JyZWFrO2Nhc2VcIm1vbnRoc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIrMSx0Lm1vbnRoLDEpLGUub25DaGFuZ2VZZWFyJiZlLm9uQ2hhbmdlWWVhcih0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwieWVhcnNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyKzEwLDAsMSksZS5vbkNoYW5nZURlY2FkZSYmZS5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSl9fSxwcmV2OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5wYXJzZWREYXRlLGU9dGhpcy5vcHRzO3N3aXRjaCh0aGlzLnZpZXcpe2Nhc2VcImRheXNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyLHQubW9udGgtMSwxKSxlLm9uQ2hhbmdlTW9udGgmJmUub25DaGFuZ2VNb250aCh0aGlzLnBhcnNlZERhdGUubW9udGgsdGhpcy5wYXJzZWREYXRlLnllYXIpO2JyZWFrO2Nhc2VcIm1vbnRoc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXItMSx0Lm1vbnRoLDEpLGUub25DaGFuZ2VZZWFyJiZlLm9uQ2hhbmdlWWVhcih0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwieWVhcnNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyLTEwLDAsMSksZS5vbkNoYW5nZURlY2FkZSYmZS5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSl9fSxmb3JtYXREYXRlOmZ1bmN0aW9uKHQsZSl7ZT1lfHx0aGlzLmRhdGU7dmFyIGkscz10LGE9dGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwLGg9dGhpcy5sb2Msbz1uLmdldExlYWRpbmdaZXJvTnVtLHI9bi5nZXREZWNhZGUoZSksYz1uLmdldFBhcnNlZERhdGUoZSksZD1jLmZ1bGxIb3VycyxsPWMuaG91cnMsdT10Lm1hdGNoKGEoXCJhYVwiKSl8fHQubWF0Y2goYShcIkFBXCIpKSxtPVwiYW1cIixwPXRoaXMuX3JlcGxhY2VyO3N3aXRjaCh0aGlzLm9wdHMudGltZXBpY2tlciYmdGhpcy50aW1lcGlja2VyJiZ1JiYoaT10aGlzLnRpbWVwaWNrZXIuX2dldFZhbGlkSG91cnNGcm9tRGF0ZShlLHUpLGQ9byhpLmhvdXJzKSxsPWkuaG91cnMsbT1pLmRheVBlcmlvZCksITApe2Nhc2UvQC8udGVzdChzKTpzPXMucmVwbGFjZSgvQC8sZS5nZXRUaW1lKCkpO2Nhc2UvYWEvLnRlc3Qocyk6cz1wKHMsYShcImFhXCIpLG0pO2Nhc2UvQUEvLnRlc3Qocyk6cz1wKHMsYShcIkFBXCIpLG0udG9VcHBlckNhc2UoKSk7Y2FzZS9kZC8udGVzdChzKTpzPXAocyxhKFwiZGRcIiksYy5mdWxsRGF0ZSk7Y2FzZS9kLy50ZXN0KHMpOnM9cChzLGEoXCJkXCIpLGMuZGF0ZSk7Y2FzZS9ERC8udGVzdChzKTpzPXAocyxhKFwiRERcIiksaC5kYXlzW2MuZGF5XSk7Y2FzZS9ELy50ZXN0KHMpOnM9cChzLGEoXCJEXCIpLGguZGF5c1Nob3J0W2MuZGF5XSk7Y2FzZS9tbS8udGVzdChzKTpzPXAocyxhKFwibW1cIiksYy5mdWxsTW9udGgpO2Nhc2UvbS8udGVzdChzKTpzPXAocyxhKFwibVwiKSxjLm1vbnRoKzEpO2Nhc2UvTU0vLnRlc3Qocyk6cz1wKHMsYShcIk1NXCIpLHRoaXMubG9jLm1vbnRoc1tjLm1vbnRoXSk7Y2FzZS9NLy50ZXN0KHMpOnM9cChzLGEoXCJNXCIpLGgubW9udGhzU2hvcnRbYy5tb250aF0pO2Nhc2UvaWkvLnRlc3Qocyk6cz1wKHMsYShcImlpXCIpLGMuZnVsbE1pbnV0ZXMpO2Nhc2UvaS8udGVzdChzKTpzPXAocyxhKFwiaVwiKSxjLm1pbnV0ZXMpO2Nhc2UvaGgvLnRlc3Qocyk6cz1wKHMsYShcImhoXCIpLGQpO2Nhc2UvaC8udGVzdChzKTpzPXAocyxhKFwiaFwiKSxsKTtjYXNlL3l5eXkvLnRlc3Qocyk6cz1wKHMsYShcInl5eXlcIiksYy55ZWFyKTtjYXNlL3l5eXkxLy50ZXN0KHMpOnM9cChzLGEoXCJ5eXl5MVwiKSxyWzBdKTtjYXNlL3l5eXkyLy50ZXN0KHMpOnM9cChzLGEoXCJ5eXl5MlwiKSxyWzFdKTtjYXNlL3l5Ly50ZXN0KHMpOnM9cChzLGEoXCJ5eVwiKSxjLnllYXIudG9TdHJpbmcoKS5zbGljZSgtMikpfXJldHVybiBzfSxfcmVwbGFjZXI6ZnVuY3Rpb24odCxlLGkpe3JldHVybiB0LnJlcGxhY2UoZSxmdW5jdGlvbih0LGUscyxhKXtyZXR1cm4gZStpK2F9KX0sX2dldFdvcmRCb3VuZGFyeVJlZ0V4cDpmdW5jdGlvbih0KXt2YXIgZT1cIlxcXFxzfFxcXFwufC18L3xcXFxcXFxcXHwsfFxcXFwkfFxcXFwhfFxcXFw/fDp8O1wiO3JldHVybiBuZXcgUmVnRXhwKFwiKF58PnxcIitlK1wiKShcIit0K1wiKSgkfDx8XCIrZStcIilcIixcImdcIil9LHNlbGVjdERhdGU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxpPWUub3B0cyxzPWUucGFyc2VkRGF0ZSxhPWUuc2VsZWN0ZWREYXRlcyxoPWEubGVuZ3RoLG89XCJcIjtpZihBcnJheS5pc0FycmF5KHQpKXJldHVybiB2b2lkIHQuZm9yRWFjaChmdW5jdGlvbih0KXtlLnNlbGVjdERhdGUodCl9KTtpZih0IGluc3RhbmNlb2YgRGF0ZSl7aWYodGhpcy5sYXN0U2VsZWN0ZWREYXRlPXQsdGhpcy50aW1lcGlja2VyJiZ0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUodCksZS5fdHJpZ2dlcihcInNlbGVjdERhdGVcIix0KSx0aGlzLnRpbWVwaWNrZXImJih0LnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3VycyksdC5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSksXCJkYXlzXCI9PWUudmlldyYmdC5nZXRNb250aCgpIT1zLm1vbnRoJiZpLm1vdmVUb090aGVyTW9udGhzT25TZWxlY3QmJihvPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkpLFwieWVhcnNcIj09ZS52aWV3JiZ0LmdldEZ1bGxZZWFyKCkhPXMueWVhciYmaS5tb3ZlVG9PdGhlclllYXJzT25TZWxlY3QmJihvPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSwwLDEpKSxvJiYoZS5zaWxlbnQ9ITAsZS5kYXRlPW8sZS5zaWxlbnQ9ITEsZS5uYXYuX3JlbmRlcigpKSxpLm11bHRpcGxlRGF0ZXMmJiFpLnJhbmdlKXtpZihoPT09aS5tdWx0aXBsZURhdGVzKXJldHVybjtlLl9pc1NlbGVjdGVkKHQpfHxlLnNlbGVjdGVkRGF0ZXMucHVzaCh0KX1lbHNlIGkucmFuZ2U/Mj09aD8oZS5zZWxlY3RlZERhdGVzPVt0XSxlLm1pblJhbmdlPXQsZS5tYXhSYW5nZT1cIlwiKToxPT1oPyhlLnNlbGVjdGVkRGF0ZXMucHVzaCh0KSxlLm1heFJhbmdlP2UubWluUmFuZ2U9dDplLm1heFJhbmdlPXQsbi5iaWdnZXIoZS5tYXhSYW5nZSxlLm1pblJhbmdlKSYmKGUubWF4UmFuZ2U9ZS5taW5SYW5nZSxlLm1pblJhbmdlPXQpLGUuc2VsZWN0ZWREYXRlcz1bZS5taW5SYW5nZSxlLm1heFJhbmdlXSk6KGUuc2VsZWN0ZWREYXRlcz1bdF0sZS5taW5SYW5nZT10KTplLnNlbGVjdGVkRGF0ZXM9W3RdO2UuX3NldElucHV0VmFsdWUoKSxpLm9uU2VsZWN0JiZlLl90cmlnZ2VyT25DaGFuZ2UoKSxpLmF1dG9DbG9zZSYmIXRoaXMudGltZXBpY2tlcklzQWN0aXZlJiYoaS5tdWx0aXBsZURhdGVzfHxpLnJhbmdlP2kucmFuZ2UmJjI9PWUuc2VsZWN0ZWREYXRlcy5sZW5ndGgmJmUuaGlkZSgpOmUuaGlkZSgpKSxlLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKX19LHJlbW92ZURhdGU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5zZWxlY3RlZERhdGVzLGk9dGhpcztpZih0IGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gZS5zb21lKGZ1bmN0aW9uKHMsYSl7cmV0dXJuIG4uaXNTYW1lKHMsdCk/KGUuc3BsaWNlKGEsMSksaS5zZWxlY3RlZERhdGVzLmxlbmd0aD9pLmxhc3RTZWxlY3RlZERhdGU9aS5zZWxlY3RlZERhdGVzW2kuc2VsZWN0ZWREYXRlcy5sZW5ndGgtMV06KGkubWluUmFuZ2U9XCJcIixpLm1heFJhbmdlPVwiXCIsaS5sYXN0U2VsZWN0ZWREYXRlPVwiXCIpLGkudmlld3NbaS5jdXJyZW50Vmlld10uX3JlbmRlcigpLGkuX3NldElucHV0VmFsdWUoKSxpLm9wdHMub25TZWxlY3QmJmkuX3RyaWdnZXJPbkNoYW5nZSgpLCEwKTp2b2lkIDB9KX0sdG9kYXk6ZnVuY3Rpb24oKXt0aGlzLnNpbGVudD0hMCx0aGlzLnZpZXc9dGhpcy5vcHRzLm1pblZpZXcsdGhpcy5zaWxlbnQ9ITEsdGhpcy5kYXRlPW5ldyBEYXRlLHRoaXMub3B0cy50b2RheUJ1dHRvbiBpbnN0YW5jZW9mIERhdGUmJnRoaXMuc2VsZWN0RGF0ZSh0aGlzLm9wdHMudG9kYXlCdXR0b24pfSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuc2VsZWN0ZWREYXRlcz1bXSx0aGlzLm1pblJhbmdlPVwiXCIsdGhpcy5tYXhSYW5nZT1cIlwiLHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpLHRoaXMuX3NldElucHV0VmFsdWUoKSx0aGlzLm9wdHMub25TZWxlY3QmJnRoaXMuX3RyaWdnZXJPbkNoYW5nZSgpfSx1cGRhdGU6ZnVuY3Rpb24odCxpKXt2YXIgcz1hcmd1bWVudHMubGVuZ3RoLGE9dGhpcy5sYXN0U2VsZWN0ZWREYXRlO3JldHVybiAyPT1zP3RoaXMub3B0c1t0XT1pOjE9PXMmJlwib2JqZWN0XCI9PXR5cGVvZiB0JiYodGhpcy5vcHRzPWUuZXh0ZW5kKCEwLHRoaXMub3B0cyx0KSksdGhpcy5fY3JlYXRlU2hvcnRDdXRzKCksdGhpcy5fc3luY1dpdGhNaW5NYXhEYXRlcygpLHRoaXMuX2RlZmluZUxvY2FsZSh0aGlzLm9wdHMubGFuZ3VhZ2UpLHRoaXMubmF2Ll9hZGRCdXR0b25zSWZOZWVkKCksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHx0aGlzLm5hdi5fcmVuZGVyKCksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCksdGhpcy5lbElzSW5wdXQmJiF0aGlzLm9wdHMuaW5saW5lJiYodGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbiksdGhpcy52aXNpYmxlJiZ0aGlzLnNldFBvc2l0aW9uKHRoaXMub3B0cy5wb3NpdGlvbikpLHRoaXMub3B0cy5jbGFzc2VzJiZ0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKHRoaXMub3B0cy5jbGFzc2VzKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoXCItb25seS10aW1lcGlja2VyLVwiKSx0aGlzLm9wdHMudGltZXBpY2tlciYmKGEmJnRoaXMudGltZXBpY2tlci5faGFuZGxlRGF0ZShhKSx0aGlzLnRpbWVwaWNrZXIuX3VwZGF0ZVJhbmdlcygpLHRoaXMudGltZXBpY2tlci5fdXBkYXRlQ3VycmVudFRpbWUoKSxhJiYoYS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpLGEuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcykpKSx0aGlzLl9zZXRJbnB1dFZhbHVlKCksdGhpc30sX3N5bmNXaXRoTWluTWF4RGF0ZXM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmRhdGUuZ2V0VGltZSgpO3RoaXMuc2lsZW50PSEwLHRoaXMubWluVGltZT50JiYodGhpcy5kYXRlPXRoaXMubWluRGF0ZSksdGhpcy5tYXhUaW1lPHQmJih0aGlzLmRhdGU9dGhpcy5tYXhEYXRlKSx0aGlzLnNpbGVudD0hMX0sX2lzU2VsZWN0ZWQ6ZnVuY3Rpb24odCxlKXt2YXIgaT0hMTtyZXR1cm4gdGhpcy5zZWxlY3RlZERhdGVzLnNvbWUoZnVuY3Rpb24ocyl7cmV0dXJuIG4uaXNTYW1lKHMsdCxlKT8oaT1zLCEwKTp2b2lkIDB9KSxpfSxfc2V0SW5wdXRWYWx1ZTpmdW5jdGlvbigpe3ZhciB0LGU9dGhpcyxpPWUub3B0cyxzPWUubG9jLmRhdGVGb3JtYXQsYT1pLmFsdEZpZWxkRGF0ZUZvcm1hdCxuPWUuc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGUuZm9ybWF0RGF0ZShzLHQpfSk7aS5hbHRGaWVsZCYmZS4kYWx0RmllbGQubGVuZ3RoJiYodD10aGlzLnNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBlLmZvcm1hdERhdGUoYSx0KX0pLHQ9dC5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKSx0aGlzLiRhbHRGaWVsZC52YWwodCkpLG49bi5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKSx0aGlzLiRlbC52YWwobil9LF9pc0luUmFuZ2U6ZnVuY3Rpb24odCxlKXt2YXIgaT10LmdldFRpbWUoKSxzPW4uZ2V0UGFyc2VkRGF0ZSh0KSxhPW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLm1pbkRhdGUpLGg9bi5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSksbz1uZXcgRGF0ZShzLnllYXIscy5tb250aCxhLmRhdGUpLmdldFRpbWUoKSxyPW5ldyBEYXRlKHMueWVhcixzLm1vbnRoLGguZGF0ZSkuZ2V0VGltZSgpLGM9e2RheTppPj10aGlzLm1pblRpbWUmJmk8PXRoaXMubWF4VGltZSxtb250aDpvPj10aGlzLm1pblRpbWUmJnI8PXRoaXMubWF4VGltZSx5ZWFyOnMueWVhcj49YS55ZWFyJiZzLnllYXI8PWgueWVhcn07cmV0dXJuIGU/Y1tlXTpjLmRheX0sX2dldERpbWVuc2lvbnM6ZnVuY3Rpb24odCl7dmFyIGU9dC5vZmZzZXQoKTtyZXR1cm57d2lkdGg6dC5vdXRlcldpZHRoKCksaGVpZ2h0OnQub3V0ZXJIZWlnaHQoKSxsZWZ0OmUubGVmdCx0b3A6ZS50b3B9fSxfZ2V0RGF0ZUZyb21DZWxsOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMucGFyc2VkRGF0ZSxzPXQuZGF0YShcInllYXJcIil8fGUueWVhcixhPXQuZGF0YShcIm1vbnRoXCIpPT1pP2UubW9udGg6dC5kYXRhKFwibW9udGhcIiksbj10LmRhdGEoXCJkYXRlXCIpfHwxO3JldHVybiBuZXcgRGF0ZShzLGEsbil9LF9zZXRQb3NpdGlvbkNsYXNzZXM6ZnVuY3Rpb24odCl7dD10LnNwbGl0KFwiIFwiKTt2YXIgZT10WzBdLGk9dFsxXSxzPVwiZGF0ZXBpY2tlciAtXCIrZStcIi1cIitpK1wiLSAtZnJvbS1cIitlK1wiLVwiO3RoaXMudmlzaWJsZSYmKHMrPVwiIGFjdGl2ZVwiKSx0aGlzLiRkYXRlcGlja2VyLnJlbW92ZUF0dHIoXCJjbGFzc1wiKS5hZGRDbGFzcyhzKX0sc2V0UG9zaXRpb246ZnVuY3Rpb24odCl7dD10fHx0aGlzLm9wdHMucG9zaXRpb247dmFyIGUsaSxzPXRoaXMuX2dldERpbWVuc2lvbnModGhpcy4kZWwpLGE9dGhpcy5fZ2V0RGltZW5zaW9ucyh0aGlzLiRkYXRlcGlja2VyKSxuPXQuc3BsaXQoXCIgXCIpLGg9dGhpcy5vcHRzLm9mZnNldCxvPW5bMF0scj1uWzFdO3N3aXRjaChvKXtjYXNlXCJ0b3BcIjplPXMudG9wLWEuaGVpZ2h0LWg7YnJlYWs7Y2FzZVwicmlnaHRcIjppPXMubGVmdCtzLndpZHRoK2g7YnJlYWs7Y2FzZVwiYm90dG9tXCI6ZT1zLnRvcCtzLmhlaWdodCtoO2JyZWFrO2Nhc2VcImxlZnRcIjppPXMubGVmdC1hLndpZHRoLWh9c3dpdGNoKHIpe2Nhc2VcInRvcFwiOmU9cy50b3A7YnJlYWs7Y2FzZVwicmlnaHRcIjppPXMubGVmdCtzLndpZHRoLWEud2lkdGg7YnJlYWs7Y2FzZVwiYm90dG9tXCI6ZT1zLnRvcCtzLmhlaWdodC1hLmhlaWdodDticmVhaztjYXNlXCJsZWZ0XCI6aT1zLmxlZnQ7YnJlYWs7Y2FzZVwiY2VudGVyXCI6L2xlZnR8cmlnaHQvLnRlc3Qobyk/ZT1zLnRvcCtzLmhlaWdodC8yLWEuaGVpZ2h0LzI6aT1zLmxlZnQrcy53aWR0aC8yLWEud2lkdGgvMn10aGlzLiRkYXRlcGlja2VyLmNzcyh7bGVmdDppLHRvcDplfSl9LHNob3c6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdHMub25TaG93O3RoaXMuc2V0UG9zaXRpb24odGhpcy5vcHRzLnBvc2l0aW9uKSx0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKFwiYWN0aXZlXCIpLHRoaXMudmlzaWJsZT0hMCx0JiZ0aGlzLl9iaW5kVmlzaW9uRXZlbnRzKHQpfSxoaWRlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5vcHRzLm9uSGlkZTt0aGlzLiRkYXRlcGlja2VyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmNzcyh7bGVmdDpcIi0xMDAwMDBweFwifSksdGhpcy5mb2N1c2VkPVwiXCIsdGhpcy5rZXlzPVtdLHRoaXMuaW5Gb2N1cz0hMSx0aGlzLnZpc2libGU9ITEsdGhpcy4kZWwuYmx1cigpLHQmJnRoaXMuX2JpbmRWaXNpb25FdmVudHModCl9LGRvd246ZnVuY3Rpb24odCl7dGhpcy5fY2hhbmdlVmlldyh0LFwiZG93blwiKX0sdXA6ZnVuY3Rpb24odCl7dGhpcy5fY2hhbmdlVmlldyh0LFwidXBcIil9LF9iaW5kVmlzaW9uRXZlbnRzOmZ1bmN0aW9uKHQpe3RoaXMuJGRhdGVwaWNrZXIub2ZmKFwidHJhbnNpdGlvbmVuZC5kcFwiKSx0KHRoaXMsITEpLHRoaXMuJGRhdGVwaWNrZXIub25lKFwidHJhbnNpdGlvbmVuZC5kcFwiLHQuYmluZCh0aGlzLHRoaXMsITApKX0sX2NoYW5nZVZpZXc6ZnVuY3Rpb24odCxlKXt0PXR8fHRoaXMuZm9jdXNlZHx8dGhpcy5kYXRlO3ZhciBpPVwidXBcIj09ZT90aGlzLnZpZXdJbmRleCsxOnRoaXMudmlld0luZGV4LTE7aT4yJiYoaT0yKSwwPmkmJihpPTApLHRoaXMuc2lsZW50PSEwLHRoaXMuZGF0ZT1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLHRoaXMuc2lsZW50PSExLHRoaXMudmlldz10aGlzLnZpZXdJbmRleGVzW2ldfSxfaGFuZGxlSG90S2V5OmZ1bmN0aW9uKHQpe3ZhciBlLGkscyxhPW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLl9nZXRGb2N1c2VkRGF0ZSgpKSxoPXRoaXMub3B0cyxvPSExLHI9ITEsYz0hMSxkPWEueWVhcixsPWEubW9udGgsdT1hLmRhdGU7c3dpdGNoKHQpe2Nhc2VcImN0cmxSaWdodFwiOmNhc2VcImN0cmxVcFwiOmwrPTEsbz0hMDticmVhaztjYXNlXCJjdHJsTGVmdFwiOmNhc2VcImN0cmxEb3duXCI6bC09MSxvPSEwO2JyZWFrO2Nhc2VcInNoaWZ0UmlnaHRcIjpjYXNlXCJzaGlmdFVwXCI6cj0hMCxkKz0xO2JyZWFrO2Nhc2VcInNoaWZ0TGVmdFwiOmNhc2VcInNoaWZ0RG93blwiOnI9ITAsZC09MTticmVhaztjYXNlXCJhbHRSaWdodFwiOmNhc2VcImFsdFVwXCI6Yz0hMCxkKz0xMDticmVhaztjYXNlXCJhbHRMZWZ0XCI6Y2FzZVwiYWx0RG93blwiOmM9ITAsZC09MTA7YnJlYWs7Y2FzZVwiY3RybFNoaWZ0VXBcIjp0aGlzLnVwKCl9cz1uLmdldERheXNDb3VudChuZXcgRGF0ZShkLGwpKSxpPW5ldyBEYXRlKGQsbCx1KSx1PnMmJih1PXMpLGkuZ2V0VGltZSgpPHRoaXMubWluVGltZT9pPXRoaXMubWluRGF0ZTppLmdldFRpbWUoKT50aGlzLm1heFRpbWUmJihpPXRoaXMubWF4RGF0ZSksdGhpcy5mb2N1c2VkPWksZT1uLmdldFBhcnNlZERhdGUoaSksbyYmaC5vbkNoYW5nZU1vbnRoJiZoLm9uQ2hhbmdlTW9udGgoZS5tb250aCxlLnllYXIpLHImJmgub25DaGFuZ2VZZWFyJiZoLm9uQ2hhbmdlWWVhcihlLnllYXIpLGMmJmgub25DaGFuZ2VEZWNhZGUmJmgub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpfSxfcmVnaXN0ZXJLZXk6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5rZXlzLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIGU9PXR9KTtlfHx0aGlzLmtleXMucHVzaCh0KX0sX3VuUmVnaXN0ZXJLZXk6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5rZXlzLmluZGV4T2YodCk7dGhpcy5rZXlzLnNwbGljZShlLDEpfSxfaXNIb3RLZXlQcmVzc2VkOmZ1bmN0aW9uKCl7dmFyIHQsZT0hMSxpPXRoaXMscz10aGlzLmtleXMuc29ydCgpO2Zvcih2YXIgYSBpbiB1KXQ9dVthXSxzLmxlbmd0aD09dC5sZW5ndGgmJnQuZXZlcnkoZnVuY3Rpb24odCxlKXtyZXR1cm4gdD09c1tlXX0pJiYoaS5fdHJpZ2dlcihcImhvdEtleVwiLGEpLGU9ITApO3JldHVybiBlfSxfdHJpZ2dlcjpmdW5jdGlvbih0LGUpe3RoaXMuJGVsLnRyaWdnZXIodCxlKX0sX2ZvY3VzTmV4dENlbGw6ZnVuY3Rpb24odCxlKXtlPWV8fHRoaXMuY2VsbFR5cGU7dmFyIGk9bi5nZXRQYXJzZWREYXRlKHRoaXMuX2dldEZvY3VzZWREYXRlKCkpLHM9aS55ZWFyLGE9aS5tb250aCxoPWkuZGF0ZTtpZighdGhpcy5faXNIb3RLZXlQcmVzc2VkKCkpe3N3aXRjaCh0KXtjYXNlIDM3OlwiZGF5XCI9PWU/aC09MTpcIlwiLFwibW9udGhcIj09ZT9hLT0xOlwiXCIsXCJ5ZWFyXCI9PWU/cy09MTpcIlwiO2JyZWFrO2Nhc2UgMzg6XCJkYXlcIj09ZT9oLT03OlwiXCIsXCJtb250aFwiPT1lP2EtPTM6XCJcIixcInllYXJcIj09ZT9zLT00OlwiXCI7YnJlYWs7Y2FzZSAzOTpcImRheVwiPT1lP2grPTE6XCJcIixcIm1vbnRoXCI9PWU/YSs9MTpcIlwiLFwieWVhclwiPT1lP3MrPTE6XCJcIjticmVhaztjYXNlIDQwOlwiZGF5XCI9PWU/aCs9NzpcIlwiLFwibW9udGhcIj09ZT9hKz0zOlwiXCIsXCJ5ZWFyXCI9PWU/cys9NDpcIlwifXZhciBvPW5ldyBEYXRlKHMsYSxoKTtvLmdldFRpbWUoKTx0aGlzLm1pblRpbWU/bz10aGlzLm1pbkRhdGU6by5nZXRUaW1lKCk+dGhpcy5tYXhUaW1lJiYobz10aGlzLm1heERhdGUpLHRoaXMuZm9jdXNlZD1vfX0sX2dldEZvY3VzZWREYXRlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5mb2N1c2VkfHx0aGlzLnNlbGVjdGVkRGF0ZXNbdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aC0xXSxlPXRoaXMucGFyc2VkRGF0ZTtpZighdClzd2l0Y2godGhpcy52aWV3KXtjYXNlXCJkYXlzXCI6dD1uZXcgRGF0ZShlLnllYXIsZS5tb250aCwobmV3IERhdGUpLmdldERhdGUoKSk7YnJlYWs7Y2FzZVwibW9udGhzXCI6dD1uZXcgRGF0ZShlLnllYXIsZS5tb250aCwxKTticmVhaztjYXNlXCJ5ZWFyc1wiOnQ9bmV3IERhdGUoZS55ZWFyLDAsMSl9cmV0dXJuIHR9LF9nZXRDZWxsOmZ1bmN0aW9uKHQsaSl7aT1pfHx0aGlzLmNlbGxUeXBlO3ZhciBzLGE9bi5nZXRQYXJzZWREYXRlKHQpLGg9Jy5kYXRlcGlja2VyLS1jZWxsW2RhdGEteWVhcj1cIicrYS55ZWFyKydcIl0nO3N3aXRjaChpKXtjYXNlXCJtb250aFwiOmg9J1tkYXRhLW1vbnRoPVwiJythLm1vbnRoKydcIl0nO2JyZWFrO2Nhc2VcImRheVwiOmgrPSdbZGF0YS1tb250aD1cIicrYS5tb250aCsnXCJdW2RhdGEtZGF0ZT1cIicrYS5kYXRlKydcIl0nfXJldHVybiBzPXRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uJGVsLmZpbmQoaCkscy5sZW5ndGg/czplKFwiXCIpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0LiRlbC5vZmYoXCIuYWRwXCIpLmRhdGEoXCJkYXRlcGlja2VyXCIsXCJcIiksdC5zZWxlY3RlZERhdGVzPVtdLHQuZm9jdXNlZD1cIlwiLHQudmlld3M9e30sdC5rZXlzPVtdLHQubWluUmFuZ2U9XCJcIix0Lm1heFJhbmdlPVwiXCIsdC5vcHRzLmlubGluZXx8IXQuZWxJc0lucHV0P3QuJGRhdGVwaWNrZXIuY2xvc2VzdChcIi5kYXRlcGlja2VyLWlubGluZVwiKS5yZW1vdmUoKTp0LiRkYXRlcGlja2VyLnJlbW92ZSgpfSxfaGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXM6ZnVuY3Rpb24odCxlKXt0aGlzLm9wdHMucmFuZ2U/dGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkP3RoaXMucmVtb3ZlRGF0ZShlKToyIT10aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiZ0aGlzLl90cmlnZ2VyKFwiY2xpY2tDZWxsXCIsZSk6dGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkJiZ0aGlzLnJlbW92ZURhdGUoZSksdGhpcy5vcHRzLnRvZ2dsZVNlbGVjdGVkfHwodGhpcy5sYXN0U2VsZWN0ZWREYXRlPXQsdGhpcy5vcHRzLnRpbWVwaWNrZXImJih0aGlzLnRpbWVwaWNrZXIuX3NldFRpbWUodCksdGhpcy50aW1lcGlja2VyLnVwZGF0ZSgpKSl9LF9vblNob3dFdmVudDpmdW5jdGlvbih0KXt0aGlzLnZpc2libGV8fHRoaXMuc2hvdygpfSxfb25CbHVyOmZ1bmN0aW9uKCl7IXRoaXMuaW5Gb2N1cyYmdGhpcy52aXNpYmxlJiZ0aGlzLmhpZGUoKX0sX29uTW91c2VEb3duRGF0ZXBpY2tlcjpmdW5jdGlvbih0KXt0aGlzLmluRm9jdXM9ITB9LF9vbk1vdXNlVXBEYXRlcGlja2VyOmZ1bmN0aW9uKHQpe3RoaXMuaW5Gb2N1cz0hMSx0Lm9yaWdpbmFsRXZlbnQuaW5Gb2N1cz0hMCx0Lm9yaWdpbmFsRXZlbnQudGltZXBpY2tlckZvY3VzfHx0aGlzLiRlbC5mb2N1cygpfSxfb25LZXlVcEdlbmVyYWw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy4kZWwudmFsKCk7ZXx8dGhpcy5jbGVhcigpfSxfb25SZXNpemU6ZnVuY3Rpb24oKXt0aGlzLnZpc2libGUmJnRoaXMuc2V0UG9zaXRpb24oKX0sX29uTW91c2VVcEJvZHk6ZnVuY3Rpb24odCl7dC5vcmlnaW5hbEV2ZW50LmluRm9jdXN8fHRoaXMudmlzaWJsZSYmIXRoaXMuaW5Gb2N1cyYmdGhpcy5oaWRlKCl9LF9vbk1vdXNlVXBFbDpmdW5jdGlvbih0KXt0Lm9yaWdpbmFsRXZlbnQuaW5Gb2N1cz0hMCxzZXRUaW1lb3V0KHRoaXMuX29uS2V5VXBHZW5lcmFsLmJpbmQodGhpcyksNCl9LF9vbktleURvd246ZnVuY3Rpb24odCl7dmFyIGU9dC53aGljaDtpZih0aGlzLl9yZWdpc3RlcktleShlKSxlPj0zNyYmNDA+PWUmJih0LnByZXZlbnREZWZhdWx0KCksdGhpcy5fZm9jdXNOZXh0Q2VsbChlKSksMTM9PWUmJnRoaXMuZm9jdXNlZCl7aWYodGhpcy5fZ2V0Q2VsbCh0aGlzLmZvY3VzZWQpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKSlyZXR1cm47aWYodGhpcy52aWV3IT10aGlzLm9wdHMubWluVmlldyl0aGlzLmRvd24oKTtlbHNle3ZhciBpPXRoaXMuX2lzU2VsZWN0ZWQodGhpcy5mb2N1c2VkLHRoaXMuY2VsbFR5cGUpO2lmKCFpKXJldHVybiB0aGlzLnRpbWVwaWNrZXImJih0aGlzLmZvY3VzZWQuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKSx0aGlzLmZvY3VzZWQuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcykpLHZvaWQgdGhpcy5zZWxlY3REYXRlKHRoaXMuZm9jdXNlZCk7dGhpcy5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMoaSx0aGlzLmZvY3VzZWQpfX0yNz09ZSYmdGhpcy5oaWRlKCl9LF9vbktleVVwOmZ1bmN0aW9uKHQpe3ZhciBlPXQud2hpY2g7dGhpcy5fdW5SZWdpc3RlcktleShlKX0sX29uSG90S2V5OmZ1bmN0aW9uKHQsZSl7dGhpcy5faGFuZGxlSG90S2V5KGUpfSxfb25Nb3VzZUVudGVyQ2VsbDpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiLmRhdGVwaWNrZXItLWNlbGxcIikscz10aGlzLl9nZXREYXRlRnJvbUNlbGwoaSk7dGhpcy5zaWxlbnQ9ITAsdGhpcy5mb2N1c2VkJiYodGhpcy5mb2N1c2VkPVwiXCIpLGkuYWRkQ2xhc3MoXCItZm9jdXMtXCIpLHRoaXMuZm9jdXNlZD1zLHRoaXMuc2lsZW50PSExLHRoaXMub3B0cy5yYW5nZSYmMT09dGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCYmKHRoaXMubWluUmFuZ2U9dGhpcy5zZWxlY3RlZERhdGVzWzBdLHRoaXMubWF4UmFuZ2U9XCJcIixuLmxlc3ModGhpcy5taW5SYW5nZSx0aGlzLmZvY3VzZWQpJiYodGhpcy5tYXhSYW5nZT10aGlzLm1pblJhbmdlLHRoaXMubWluUmFuZ2U9XCJcIiksdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fdXBkYXRlKCkpfSxfb25Nb3VzZUxlYXZlQ2VsbDpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiLmRhdGVwaWNrZXItLWNlbGxcIik7aS5yZW1vdmVDbGFzcyhcIi1mb2N1cy1cIiksdGhpcy5zaWxlbnQ9ITAsdGhpcy5mb2N1c2VkPVwiXCIsdGhpcy5zaWxlbnQ9ITF9LF9vblRpbWVDaGFuZ2U6ZnVuY3Rpb24odCxlLGkpe3ZhciBzPW5ldyBEYXRlLGE9dGhpcy5zZWxlY3RlZERhdGVzLG49ITE7YS5sZW5ndGgmJihuPSEwLHM9dGhpcy5sYXN0U2VsZWN0ZWREYXRlKSxzLnNldEhvdXJzKGUpLHMuc2V0TWludXRlcyhpKSxufHx0aGlzLl9nZXRDZWxsKHMpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKT8odGhpcy5fc2V0SW5wdXRWYWx1ZSgpLHRoaXMub3B0cy5vblNlbGVjdCYmdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCkpOnRoaXMuc2VsZWN0RGF0ZShzKX0sX29uQ2xpY2tDZWxsOmZ1bmN0aW9uKHQsZSl7dGhpcy50aW1lcGlja2VyJiYoZS5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpLGUuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcykpLHRoaXMuc2VsZWN0RGF0ZShlKX0sc2V0IGZvY3VzZWQodCl7aWYoIXQmJnRoaXMuZm9jdXNlZCl7dmFyIGU9dGhpcy5fZ2V0Q2VsbCh0aGlzLmZvY3VzZWQpO2UubGVuZ3RoJiZlLnJlbW92ZUNsYXNzKFwiLWZvY3VzLVwiKX10aGlzLl9mb2N1c2VkPXQsdGhpcy5vcHRzLnJhbmdlJiYxPT10aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiYodGhpcy5taW5SYW5nZT10aGlzLnNlbGVjdGVkRGF0ZXNbMF0sdGhpcy5tYXhSYW5nZT1cIlwiLG4ubGVzcyh0aGlzLm1pblJhbmdlLHRoaXMuX2ZvY3VzZWQpJiYodGhpcy5tYXhSYW5nZT10aGlzLm1pblJhbmdlLHRoaXMubWluUmFuZ2U9XCJcIikpLHRoaXMuc2lsZW50fHwodGhpcy5kYXRlPXQpfSxnZXQgZm9jdXNlZCgpe3JldHVybiB0aGlzLl9mb2N1c2VkfSxnZXQgcGFyc2VkRGF0ZSgpe3JldHVybiBuLmdldFBhcnNlZERhdGUodGhpcy5kYXRlKX0sc2V0IGRhdGUodCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBEYXRlPyh0aGlzLmN1cnJlbnREYXRlPXQsdGhpcy5pbml0ZWQmJiF0aGlzLnNpbGVudCYmKHRoaXMudmlld3NbdGhpcy52aWV3XS5fcmVuZGVyKCksdGhpcy5uYXYuX3JlbmRlcigpLHRoaXMudmlzaWJsZSYmdGhpcy5lbElzSW5wdXQmJnRoaXMuc2V0UG9zaXRpb24oKSksdCk6dm9pZCAwfSxnZXQgZGF0ZSgpe3JldHVybiB0aGlzLmN1cnJlbnREYXRlfSxzZXQgdmlldyh0KXtyZXR1cm4gdGhpcy52aWV3SW5kZXg9dGhpcy52aWV3SW5kZXhlcy5pbmRleE9mKHQpLHRoaXMudmlld0luZGV4PDA/dm9pZCAwOih0aGlzLnByZXZWaWV3PXRoaXMuY3VycmVudFZpZXcsdGhpcy5jdXJyZW50Vmlldz10LHRoaXMuaW5pdGVkJiYodGhpcy52aWV3c1t0XT90aGlzLnZpZXdzW3RdLl9yZW5kZXIoKTp0aGlzLnZpZXdzW3RdPW5ldyBlLmZuLmRhdGVwaWNrZXIuQm9keSh0aGlzLHQsdGhpcy5vcHRzKSx0aGlzLnZpZXdzW3RoaXMucHJldlZpZXddLmhpZGUoKSx0aGlzLnZpZXdzW3RdLnNob3coKSx0aGlzLm5hdi5fcmVuZGVyKCksdGhpcy5vcHRzLm9uQ2hhbmdlVmlldyYmdGhpcy5vcHRzLm9uQ2hhbmdlVmlldyh0KSx0aGlzLmVsSXNJbnB1dCYmdGhpcy52aXNpYmxlJiZ0aGlzLnNldFBvc2l0aW9uKCkpLHQpfSxnZXQgdmlldygpe3JldHVybiB0aGlzLmN1cnJlbnRWaWV3fSxnZXQgY2VsbFR5cGUoKXtyZXR1cm4gdGhpcy52aWV3LnN1YnN0cmluZygwLHRoaXMudmlldy5sZW5ndGgtMSl9LGdldCBtaW5UaW1lKCl7dmFyIHQ9bi5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSk7cmV0dXJuIG5ldyBEYXRlKHQueWVhcix0Lm1vbnRoLHQuZGF0ZSkuZ2V0VGltZSgpfSxnZXQgbWF4VGltZSgpe3ZhciB0PW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLm1heERhdGUpO3JldHVybiBuZXcgRGF0ZSh0LnllYXIsdC5tb250aCx0LmRhdGUpLmdldFRpbWUoKX0sZ2V0IGN1ckRlY2FkZSgpe3JldHVybiBuLmdldERlY2FkZSh0aGlzLmRhdGUpfX0sbi5nZXREYXlzQ291bnQ9ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCkrMSwwKS5nZXREYXRlKCl9LG4uZ2V0UGFyc2VkRGF0ZT1mdW5jdGlvbih0KXtyZXR1cm57eWVhcjp0LmdldEZ1bGxZZWFyKCksbW9udGg6dC5nZXRNb250aCgpLGZ1bGxNb250aDp0LmdldE1vbnRoKCkrMTwxMD9cIjBcIisodC5nZXRNb250aCgpKzEpOnQuZ2V0TW9udGgoKSsxLGRhdGU6dC5nZXREYXRlKCksZnVsbERhdGU6dC5nZXREYXRlKCk8MTA/XCIwXCIrdC5nZXREYXRlKCk6dC5nZXREYXRlKCksZGF5OnQuZ2V0RGF5KCksaG91cnM6dC5nZXRIb3VycygpLGZ1bGxIb3Vyczp0LmdldEhvdXJzKCk8MTA/XCIwXCIrdC5nZXRIb3VycygpOnQuZ2V0SG91cnMoKSxtaW51dGVzOnQuZ2V0TWludXRlcygpLGZ1bGxNaW51dGVzOnQuZ2V0TWludXRlcygpPDEwP1wiMFwiK3QuZ2V0TWludXRlcygpOnQuZ2V0TWludXRlcygpfX0sbi5nZXREZWNhZGU9ZnVuY3Rpb24odCl7dmFyIGU9MTAqTWF0aC5mbG9vcih0LmdldEZ1bGxZZWFyKCkvMTApO3JldHVybltlLGUrOV19LG4udGVtcGxhdGU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5yZXBsYWNlKC8jXFx7KFtcXHddKylcXH0vZyxmdW5jdGlvbih0LGkpe3JldHVybiBlW2ldfHwwPT09ZVtpXT9lW2ldOnZvaWQgMH0pfSxuLmlzU2FtZT1mdW5jdGlvbih0LGUsaSl7aWYoIXR8fCFlKXJldHVybiExO3ZhciBzPW4uZ2V0UGFyc2VkRGF0ZSh0KSxhPW4uZ2V0UGFyc2VkRGF0ZShlKSxoPWk/aTpcImRheVwiLG89e2RheTpzLmRhdGU9PWEuZGF0ZSYmcy5tb250aD09YS5tb250aCYmcy55ZWFyPT1hLnllYXIsbW9udGg6cy5tb250aD09YS5tb250aCYmcy55ZWFyPT1hLnllYXIseWVhcjpzLnllYXI9PWEueWVhcn07cmV0dXJuIG9baF19LG4ubGVzcz1mdW5jdGlvbih0LGUsaSl7cmV0dXJuIHQmJmU/ZS5nZXRUaW1lKCk8dC5nZXRUaW1lKCk6ITF9LG4uYmlnZ2VyPWZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gdCYmZT9lLmdldFRpbWUoKT50LmdldFRpbWUoKTohMX0sbi5nZXRMZWFkaW5nWmVyb051bT1mdW5jdGlvbih0KXtyZXR1cm4gcGFyc2VJbnQodCk8MTA/XCIwXCIrdDp0fSxuLnJlc2V0VGltZT1mdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgdD8odD1uLmdldFBhcnNlZERhdGUodCksbmV3IERhdGUodC55ZWFyLHQubW9udGgsdC5kYXRlKSk6dm9pZCAwfSxlLmZuLmRhdGVwaWNrZXI9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2lmKGUuZGF0YSh0aGlzLG8pKXt2YXIgaT1lLmRhdGEodGhpcyxvKTtpLm9wdHM9ZS5leHRlbmQoITAsaS5vcHRzLHQpLGkudXBkYXRlKCl9ZWxzZSBlLmRhdGEodGhpcyxvLG5ldyBtKHRoaXMsdCkpfSl9LGUuZm4uZGF0ZXBpY2tlci5Db25zdHJ1Y3Rvcj1tLGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZT17cnU6e2RheXM6W1wi0JLQvtGB0LrRgNC10YHQtdC90YzQtVwiLFwi0J/QvtC90LXQtNC10LvRjNC90LjQulwiLFwi0JLRgtC+0YDQvdC40LpcIixcItCh0YDQtdC00LBcIixcItCn0LXRgtCy0LXRgNCzXCIsXCLQn9GP0YLQvdC40YbQsFwiLFwi0KHRg9Cx0LHQvtGC0LBcIl0sZGF5c1Nob3J0OltcItCS0L7RgVwiLFwi0J/QvtC9XCIsXCLQktGC0L5cIixcItCh0YDQtVwiLFwi0KfQtdGCXCIsXCLQn9GP0YJcIixcItCh0YPQsVwiXSxkYXlzTWluOltcItCS0YFcIixcItCf0L1cIixcItCS0YJcIixcItCh0YBcIixcItCn0YJcIixcItCf0YJcIixcItCh0LFcIl0sbW9udGhzOltcItCv0L3QstCw0YDRjFwiLFwi0KTQtdCy0YDQsNC70YxcIixcItCc0LDRgNGCXCIsXCLQkNC/0YDQtdC70YxcIixcItCc0LDQuVwiLFwi0JjRjtC90YxcIixcItCY0Y7Qu9GMXCIsXCLQkNCy0LPRg9GB0YJcIixcItCh0LXQvdGC0Y/QsdGA0YxcIixcItCe0LrRgtGP0LHRgNGMXCIsXCLQndC+0Y/QsdGA0YxcIixcItCU0LXQutCw0LHRgNGMXCJdLG1vbnRoc1Nob3J0OltcItCv0L3QslwiLFwi0KTQtdCyXCIsXCLQnNCw0YBcIixcItCQ0L/RgFwiLFwi0JzQsNC5XCIsXCLQmNGO0L1cIixcItCY0Y7Qu1wiLFwi0JDQstCzXCIsXCLQodC10L1cIixcItCe0LrRglwiLFwi0J3QvtGPXCIsXCLQlNC10LpcIl0sdG9kYXk6XCLQodC10LPQvtC00L3Rj1wiLGNsZWFyOlwi0J7Rh9C40YHRgtC40YLRjFwiLGRhdGVGb3JtYXQ6XCJkZC5tbS55eXl5XCIsdGltZUZvcm1hdDpcImhoOmlpXCIsZmlyc3REYXk6MX19LGUoZnVuY3Rpb24oKXtlKHIpLmRhdGVwaWNrZXIoKX0pfSgpLGZ1bmN0aW9uKCl7dmFyIHQ9e2RheXM6JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzIGRhdGVwaWNrZXItLWJvZHlcIj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tZGF5cy1uYW1lc1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1kYXlzXCI+PC9kaXY+PC9kaXY+Jyxtb250aHM6JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1tb250aHMgZGF0ZXBpY2tlci0tYm9keVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy1tb250aHNcIj48L2Rpdj48L2Rpdj4nLHllYXJzOic8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0teWVhcnMgZGF0ZXBpY2tlci0tYm9keVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jZWxscyBkYXRlcGlja2VyLS1jZWxscy15ZWFyc1wiPjwvZGl2PjwvZGl2Pid9LHM9ZS5mbi5kYXRlcGlja2VyLGE9cy5Db25zdHJ1Y3RvcjtzLkJvZHk9ZnVuY3Rpb24odCxpLHMpe3RoaXMuZD10LHRoaXMudHlwZT1pLHRoaXMub3B0cz1zLHRoaXMuJGVsPWUoXCJcIiksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHx0aGlzLmluaXQoKX0scy5Cb2R5LnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3RoaXMuX2J1aWxkQmFzZUh0bWwoKSx0aGlzLl9yZW5kZXIoKSx0aGlzLl9iaW5kRXZlbnRzKCl9LF9iaW5kRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy4kZWwub24oXCJjbGlja1wiLFwiLmRhdGVwaWNrZXItLWNlbGxcIixlLnByb3h5KHRoaXMuX29uQ2xpY2tDZWxsLHRoaXMpKX0sX2J1aWxkQmFzZUh0bWw6ZnVuY3Rpb24oKXt0aGlzLiRlbD1lKHRbdGhpcy50eXBlXSkuYXBwZW5kVG8odGhpcy5kLiRjb250ZW50KSx0aGlzLiRuYW1lcz1lKFwiLmRhdGVwaWNrZXItLWRheXMtbmFtZXNcIix0aGlzLiRlbCksdGhpcy4kY2VsbHM9ZShcIi5kYXRlcGlja2VyLS1jZWxsc1wiLHRoaXMuJGVsKX0sX2dldERheU5hbWVzSHRtbDpmdW5jdGlvbih0LGUscyxhKXtyZXR1cm4gZT1lIT1pP2U6dCxzPXM/czpcIlwiLGE9YSE9aT9hOjAsYT43P3M6Nz09ZT90aGlzLl9nZXREYXlOYW1lc0h0bWwodCwwLHMsKythKToocys9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXktbmFtZScrKHRoaXMuZC5pc1dlZWtlbmQoZSk/XCIgLXdlZWtlbmQtXCI6XCJcIikrJ1wiPicrdGhpcy5kLmxvYy5kYXlzTWluW2VdK1wiPC9kaXY+XCIsdGhpcy5fZ2V0RGF5TmFtZXNIdG1sKHQsKytlLHMsKythKSl9LF9nZXRDZWxsQ29udGVudHM6ZnVuY3Rpb24odCxlKXt2YXIgaT1cImRhdGVwaWNrZXItLWNlbGwgZGF0ZXBpY2tlci0tY2VsbC1cIitlLHM9bmV3IERhdGUsbj10aGlzLmQsaD1hLnJlc2V0VGltZShuLm1pblJhbmdlKSxvPWEucmVzZXRUaW1lKG4ubWF4UmFuZ2UpLHI9bi5vcHRzLGM9YS5nZXRQYXJzZWREYXRlKHQpLGQ9e30sbD1jLmRhdGU7c3dpdGNoKGUpe2Nhc2VcImRheVwiOm4uaXNXZWVrZW5kKGMuZGF5KSYmKGkrPVwiIC13ZWVrZW5kLVwiKSxjLm1vbnRoIT10aGlzLmQucGFyc2VkRGF0ZS5tb250aCYmKGkrPVwiIC1vdGhlci1tb250aC1cIixyLnNlbGVjdE90aGVyTW9udGhzfHwoaSs9XCIgLWRpc2FibGVkLVwiKSxyLnNob3dPdGhlck1vbnRoc3x8KGw9XCJcIikpO2JyZWFrO2Nhc2VcIm1vbnRoXCI6bD1uLmxvY1tuLm9wdHMubW9udGhzRmllbGRdW2MubW9udGhdO2JyZWFrO2Nhc2VcInllYXJcIjp2YXIgdT1uLmN1ckRlY2FkZTtsPWMueWVhciwoYy55ZWFyPHVbMF18fGMueWVhcj51WzFdKSYmKGkrPVwiIC1vdGhlci1kZWNhZGUtXCIsci5zZWxlY3RPdGhlclllYXJzfHwoaSs9XCIgLWRpc2FibGVkLVwiKSxyLnNob3dPdGhlclllYXJzfHwobD1cIlwiKSl9cmV0dXJuIHIub25SZW5kZXJDZWxsJiYoZD1yLm9uUmVuZGVyQ2VsbCh0LGUpfHx7fSxsPWQuaHRtbD9kLmh0bWw6bCxpKz1kLmNsYXNzZXM/XCIgXCIrZC5jbGFzc2VzOlwiXCIpLHIucmFuZ2UmJihhLmlzU2FtZShoLHQsZSkmJihpKz1cIiAtcmFuZ2UtZnJvbS1cIiksYS5pc1NhbWUobyx0LGUpJiYoaSs9XCIgLXJhbmdlLXRvLVwiKSwxPT1uLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiZuLmZvY3VzZWQ/KChhLmJpZ2dlcihoLHQpJiZhLmxlc3Mobi5mb2N1c2VkLHQpfHxhLmxlc3Mobyx0KSYmYS5iaWdnZXIobi5mb2N1c2VkLHQpKSYmKGkrPVwiIC1pbi1yYW5nZS1cIiksYS5sZXNzKG8sdCkmJmEuaXNTYW1lKG4uZm9jdXNlZCx0KSYmKGkrPVwiIC1yYW5nZS1mcm9tLVwiKSxhLmJpZ2dlcihoLHQpJiZhLmlzU2FtZShuLmZvY3VzZWQsdCkmJihpKz1cIiAtcmFuZ2UtdG8tXCIpKToyPT1uLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiZhLmJpZ2dlcihoLHQpJiZhLmxlc3Mobyx0KSYmKGkrPVwiIC1pbi1yYW5nZS1cIikpLGEuaXNTYW1lKHMsdCxlKSYmKGkrPVwiIC1jdXJyZW50LVwiKSxuLmZvY3VzZWQmJmEuaXNTYW1lKHQsbi5mb2N1c2VkLGUpJiYoaSs9XCIgLWZvY3VzLVwiKSxuLl9pc1NlbGVjdGVkKHQsZSkmJihpKz1cIiAtc2VsZWN0ZWQtXCIpLCghbi5faXNJblJhbmdlKHQsZSl8fGQuZGlzYWJsZWQpJiYoaSs9XCIgLWRpc2FibGVkLVwiKSx7aHRtbDpsLGNsYXNzZXM6aX19LF9nZXREYXlzSHRtbDpmdW5jdGlvbih0KXt2YXIgZT1hLmdldERheXNDb3VudCh0KSxpPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0RGF5KCkscz1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLGUpLmdldERheSgpLG49aS10aGlzLmQubG9jLmZpcnN0RGF5LGg9Ni1zK3RoaXMuZC5sb2MuZmlyc3REYXk7bj0wPm4/bis3Om4saD1oPjY/aC03Omg7Zm9yKHZhciBvLHIsYz0tbisxLGQ9XCJcIixsPWMsdT1lK2g7dT49bDtsKyspcj10LmdldEZ1bGxZZWFyKCksbz10LmdldE1vbnRoKCksZCs9dGhpcy5fZ2V0RGF5SHRtbChuZXcgRGF0ZShyLG8sbCkpO3JldHVybiBkfSxfZ2V0RGF5SHRtbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLl9nZXRDZWxsQ29udGVudHModCxcImRheVwiKTtyZXR1cm4nPGRpdiBjbGFzcz1cIicrZS5jbGFzc2VzKydcIiBkYXRhLWRhdGU9XCInK3QuZ2V0RGF0ZSgpKydcIiBkYXRhLW1vbnRoPVwiJyt0LmdldE1vbnRoKCkrJ1wiIGRhdGEteWVhcj1cIicrdC5nZXRGdWxsWWVhcigpKydcIj4nK2UuaHRtbCtcIjwvZGl2PlwifSxfZ2V0TW9udGhzSHRtbDpmdW5jdGlvbih0KXtmb3IodmFyIGU9XCJcIixpPWEuZ2V0UGFyc2VkRGF0ZSh0KSxzPTA7MTI+czspZSs9dGhpcy5fZ2V0TW9udGhIdG1sKG5ldyBEYXRlKGkueWVhcixzKSkscysrO3JldHVybiBlfSxfZ2V0TW9udGhIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2dldENlbGxDb250ZW50cyh0LFwibW9udGhcIik7cmV0dXJuJzxkaXYgY2xhc3M9XCInK2UuY2xhc3NlcysnXCIgZGF0YS1tb250aD1cIicrdC5nZXRNb250aCgpKydcIj4nK2UuaHRtbCtcIjwvZGl2PlwifSxfZ2V0WWVhcnNIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPShhLmdldFBhcnNlZERhdGUodCksYS5nZXREZWNhZGUodCkpLGk9ZVswXS0xLHM9XCJcIixuPWk7Zm9yKG47bjw9ZVsxXSsxO24rKylzKz10aGlzLl9nZXRZZWFySHRtbChuZXcgRGF0ZShuLDApKTtyZXR1cm4gc30sX2dldFllYXJIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2dldENlbGxDb250ZW50cyh0LFwieWVhclwiKTtyZXR1cm4nPGRpdiBjbGFzcz1cIicrZS5jbGFzc2VzKydcIiBkYXRhLXllYXI9XCInK3QuZ2V0RnVsbFllYXIoKSsnXCI+JytlLmh0bWwrXCI8L2Rpdj5cIn0sX3JlbmRlclR5cGVzOntkYXlzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0RGF5TmFtZXNIdG1sKHRoaXMuZC5sb2MuZmlyc3REYXkpLGU9dGhpcy5fZ2V0RGF5c0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTt0aGlzLiRjZWxscy5odG1sKGUpLHRoaXMuJG5hbWVzLmh0bWwodCl9LG1vbnRoczpmdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE1vbnRoc0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTt0aGlzLiRjZWxscy5odG1sKHQpfSx5ZWFyczpmdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldFllYXJzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO3RoaXMuJGNlbGxzLmh0bWwodCl9fSxfcmVuZGVyOmZ1bmN0aW9uKCl7dGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHx0aGlzLl9yZW5kZXJUeXBlc1t0aGlzLnR5cGVdLmJpbmQodGhpcykoKX0sX3VwZGF0ZTpmdW5jdGlvbigpe3ZhciB0LGkscyxhPWUoXCIuZGF0ZXBpY2tlci0tY2VsbFwiLHRoaXMuJGNlbGxzKSxuPXRoaXM7YS5lYWNoKGZ1bmN0aW9uKGEsaCl7aT1lKHRoaXMpLHM9bi5kLl9nZXREYXRlRnJvbUNlbGwoZSh0aGlzKSksdD1uLl9nZXRDZWxsQ29udGVudHMocyxuLmQuY2VsbFR5cGUpLGkuYXR0cihcImNsYXNzXCIsdC5jbGFzc2VzKX0pfSxzaG93OmZ1bmN0aW9uKCl7dGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHwodGhpcy4kZWwuYWRkQ2xhc3MoXCJhY3RpdmVcIiksdGhpcy5hY2l0dmU9ITApfSxoaWRlOmZ1bmN0aW9uKCl7dGhpcy4kZWwucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIiksdGhpcy5hY3RpdmU9ITF9LF9oYW5kbGVDbGljazpmdW5jdGlvbih0KXt2YXIgZT10LmRhdGEoXCJkYXRlXCIpfHwxLGk9dC5kYXRhKFwibW9udGhcIil8fDAscz10LmRhdGEoXCJ5ZWFyXCIpfHx0aGlzLmQucGFyc2VkRGF0ZS55ZWFyLGE9dGhpcy5kO2lmKGEudmlldyE9dGhpcy5vcHRzLm1pblZpZXcpcmV0dXJuIHZvaWQgYS5kb3duKG5ldyBEYXRlKHMsaSxlKSk7dmFyIG49bmV3IERhdGUocyxpLGUpLGg9dGhpcy5kLl9pc1NlbGVjdGVkKG4sdGhpcy5kLmNlbGxUeXBlKTtyZXR1cm4gaD92b2lkIGEuX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzLmJpbmQoYSxoLG4pKCk6dm9pZCBhLl90cmlnZ2VyKFwiY2xpY2tDZWxsXCIsbil9LF9vbkNsaWNrQ2VsbDpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiLmRhdGVwaWNrZXItLWNlbGxcIik7aS5oYXNDbGFzcyhcIi1kaXNhYmxlZC1cIil8fHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcykoaSl9fX0oKSxmdW5jdGlvbigpe3ZhciB0PSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwicHJldlwiPiN7cHJldkh0bWx9PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi10aXRsZVwiPiN7dGl0bGV9PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIiBkYXRhLWFjdGlvbj1cIm5leHRcIj4je25leHRIdG1sfTwvZGl2PicsaT0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWJ1dHRvbnNcIj48L2Rpdj4nLHM9JzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tYnV0dG9uXCIgZGF0YS1hY3Rpb249XCIje2FjdGlvbn1cIj4je2xhYmVsfTwvc3Bhbj4nLGE9ZS5mbi5kYXRlcGlja2VyLG49YS5Db25zdHJ1Y3RvcjthLk5hdmlnYXRpb249ZnVuY3Rpb24odCxlKXt0aGlzLmQ9dCx0aGlzLm9wdHM9ZSx0aGlzLiRidXR0b25zQ29udGFpbmVyPVwiXCIsdGhpcy5pbml0KCl9LGEuTmF2aWdhdGlvbi5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt0aGlzLl9idWlsZEJhc2VIdG1sKCksdGhpcy5fYmluZEV2ZW50cygpfSxfYmluZEV2ZW50czpmdW5jdGlvbigpe3RoaXMuZC4kbmF2Lm9uKFwiY2xpY2tcIixcIi5kYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIsZS5wcm94eSh0aGlzLl9vbkNsaWNrTmF2QnV0dG9uLHRoaXMpKSx0aGlzLmQuJG5hdi5vbihcImNsaWNrXCIsXCIuZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCIsZS5wcm94eSh0aGlzLl9vbkNsaWNrTmF2VGl0bGUsdGhpcykpLHRoaXMuZC4kZGF0ZXBpY2tlci5vbihcImNsaWNrXCIsXCIuZGF0ZXBpY2tlci0tYnV0dG9uXCIsZS5wcm94eSh0aGlzLl9vbkNsaWNrTmF2QnV0dG9uLHRoaXMpKX0sX2J1aWxkQmFzZUh0bWw6ZnVuY3Rpb24oKXt0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMuX3JlbmRlcigpLHRoaXMuX2FkZEJ1dHRvbnNJZk5lZWQoKX0sX2FkZEJ1dHRvbnNJZk5lZWQ6ZnVuY3Rpb24oKXt0aGlzLm9wdHMudG9kYXlCdXR0b24mJnRoaXMuX2FkZEJ1dHRvbihcInRvZGF5XCIpLHRoaXMub3B0cy5jbGVhckJ1dHRvbiYmdGhpcy5fYWRkQnV0dG9uKFwiY2xlYXJcIil9LF9yZW5kZXI6ZnVuY3Rpb24oKXt2YXIgaT10aGlzLl9nZXRUaXRsZSh0aGlzLmQuY3VycmVudERhdGUpLHM9bi50ZW1wbGF0ZSh0LGUuZXh0ZW5kKHt0aXRsZTppfSx0aGlzLm9wdHMpKTt0aGlzLmQuJG5hdi5odG1sKHMpLFwieWVhcnNcIj09dGhpcy5kLnZpZXcmJmUoXCIuZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCIsdGhpcy5kLiRuYXYpLmFkZENsYXNzKFwiLWRpc2FibGVkLVwiKSx0aGlzLnNldE5hdlN0YXR1cygpfSxfZ2V0VGl0bGU6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZC5mb3JtYXREYXRlKHRoaXMub3B0cy5uYXZUaXRsZXNbdGhpcy5kLnZpZXddLHQpfSxfYWRkQnV0dG9uOmZ1bmN0aW9uKHQpe3RoaXMuJGJ1dHRvbnNDb250YWluZXIubGVuZ3RofHx0aGlzLl9hZGRCdXR0b25zQ29udGFpbmVyKCk7dmFyIGk9e2FjdGlvbjp0LGxhYmVsOnRoaXMuZC5sb2NbdF19LGE9bi50ZW1wbGF0ZShzLGkpO2UoXCJbZGF0YS1hY3Rpb249XCIrdCtcIl1cIix0aGlzLiRidXR0b25zQ29udGFpbmVyKS5sZW5ndGh8fHRoaXMuJGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKGEpfSxfYWRkQnV0dG9uc0NvbnRhaW5lcjpmdW5jdGlvbigpe3RoaXMuZC4kZGF0ZXBpY2tlci5hcHBlbmQoaSksdGhpcy4kYnV0dG9uc0NvbnRhaW5lcj1lKFwiLmRhdGVwaWNrZXItLWJ1dHRvbnNcIix0aGlzLmQuJGRhdGVwaWNrZXIpfSxzZXROYXZTdGF0dXM6ZnVuY3Rpb24oKXtpZigodGhpcy5vcHRzLm1pbkRhdGV8fHRoaXMub3B0cy5tYXhEYXRlKSYmdGhpcy5vcHRzLmRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZSl7dmFyIHQ9dGhpcy5kLnBhcnNlZERhdGUsZT10Lm1vbnRoLGk9dC55ZWFyLHM9dC5kYXRlO3N3aXRjaCh0aGlzLmQudmlldyl7Y2FzZVwiZGF5c1wiOnRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGksZS0xLDEpLFwibW9udGhcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJwcmV2XCIpLHRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGksZSsxLDEpLFwibW9udGhcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJuZXh0XCIpO2JyZWFrO2Nhc2VcIm1vbnRoc1wiOnRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGktMSxlLHMpLFwieWVhclwiKXx8dGhpcy5fZGlzYWJsZU5hdihcInByZXZcIiksdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaSsxLGUscyksXCJ5ZWFyXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwibmV4dFwiKTticmVhaztjYXNlXCJ5ZWFyc1wiOnZhciBhPW4uZ2V0RGVjYWRlKHRoaXMuZC5kYXRlKTt0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShhWzBdLTEsMCwxKSxcInllYXJcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJwcmV2XCIpLHRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGFbMV0rMSwwLDEpLFwieWVhclwiKXx8dGhpcy5fZGlzYWJsZU5hdihcIm5leHRcIil9fX0sX2Rpc2FibGVOYXY6ZnVuY3Rpb24odCl7ZSgnW2RhdGEtYWN0aW9uPVwiJyt0KydcIl0nLHRoaXMuZC4kbmF2KS5hZGRDbGFzcyhcIi1kaXNhYmxlZC1cIil9LF9hY3RpdmF0ZU5hdjpmdW5jdGlvbih0KXtlKCdbZGF0YS1hY3Rpb249XCInK3QrJ1wiXScsdGhpcy5kLiRuYXYpLnJlbW92ZUNsYXNzKFwiLWRpc2FibGVkLVwiKX0sX29uQ2xpY2tOYXZCdXR0b246ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuY2xvc2VzdChcIltkYXRhLWFjdGlvbl1cIikscz1pLmRhdGEoXCJhY3Rpb25cIik7dGhpcy5kW3NdKCl9LF9vbkNsaWNrTmF2VGl0bGU6ZnVuY3Rpb24odCl7cmV0dXJuIGUodC50YXJnZXQpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKT92b2lkIDA6XCJkYXlzXCI9PXRoaXMuZC52aWV3P3RoaXMuZC52aWV3PVwibW9udGhzXCI6dm9pZCh0aGlzLmQudmlldz1cInllYXJzXCIpfX19KCksZnVuY3Rpb24oKXt2YXIgdD0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWVcIj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50XCI+ICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtaG91cnNcIj4je2hvdXJWaXNpYmxlfTwvc3Bhbj4gICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1jb2xvblwiPjo8L3NwYW4+ICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtbWludXRlc1wiPiN7bWluVmFsdWV9PC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXNsaWRlcnNcIj4gICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4gICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbmFtZT1cImhvdXJzXCIgdmFsdWU9XCIje2hvdXJWYWx1ZX1cIiBtaW49XCIje2hvdXJNaW59XCIgbWF4PVwiI3tob3VyTWF4fVwiIHN0ZXA9XCIje2hvdXJTdGVwfVwiLz4gICA8L2Rpdj4gICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1yb3dcIj4gICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbmFtZT1cIm1pbnV0ZXNcIiB2YWx1ZT1cIiN7bWluVmFsdWV9XCIgbWluPVwiI3ttaW5NaW59XCIgbWF4PVwiI3ttaW5NYXh9XCIgc3RlcD1cIiN7bWluU3RlcH1cIi8+ICAgPC9kaXY+PC9kaXY+PC9kaXY+JyxpPWUuZm4uZGF0ZXBpY2tlcixzPWkuQ29uc3RydWN0b3I7aS5UaW1lcGlja2VyPWZ1bmN0aW9uKHQsZSl7dGhpcy5kPXQsdGhpcy5vcHRzPWUsdGhpcy5pbml0KCl9LGkuVGltZXBpY2tlci5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt2YXIgdD1cImlucHV0XCI7dGhpcy5fc2V0VGltZSh0aGlzLmQuZGF0ZSksdGhpcy5fYnVpbGRIVE1MKCksbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC9naSkmJih0PVwiY2hhbmdlXCIpLHRoaXMuZC4kZWwub24oXCJzZWxlY3REYXRlXCIsdGhpcy5fb25TZWxlY3REYXRlLmJpbmQodGhpcykpLHRoaXMuJHJhbmdlcy5vbih0LHRoaXMuX29uQ2hhbmdlUmFuZ2UuYmluZCh0aGlzKSksdGhpcy4kcmFuZ2VzLm9uKFwibW91c2V1cFwiLHRoaXMuX29uTW91c2VVcFJhbmdlLmJpbmQodGhpcykpLHRoaXMuJHJhbmdlcy5vbihcIm1vdXNlbW92ZSBmb2N1cyBcIix0aGlzLl9vbk1vdXNlRW50ZXJSYW5nZS5iaW5kKHRoaXMpKSx0aGlzLiRyYW5nZXMub24oXCJtb3VzZW91dCBibHVyXCIsdGhpcy5fb25Nb3VzZU91dFJhbmdlLmJpbmQodGhpcykpfSxfc2V0VGltZTpmdW5jdGlvbih0KXt2YXIgZT1zLmdldFBhcnNlZERhdGUodCk7dGhpcy5faGFuZGxlRGF0ZSh0KSx0aGlzLmhvdXJzPWUuaG91cnM8dGhpcy5taW5Ib3Vycz90aGlzLm1pbkhvdXJzOmUuaG91cnMsdGhpcy5taW51dGVzPWUubWludXRlczx0aGlzLm1pbk1pbnV0ZXM/dGhpcy5taW5NaW51dGVzOmUubWludXRlc30sX3NldE1pblRpbWVGcm9tRGF0ZTpmdW5jdGlvbih0KXt0aGlzLm1pbkhvdXJzPXQuZ2V0SG91cnMoKSx0aGlzLm1pbk1pbnV0ZXM9dC5nZXRNaW51dGVzKCksdGhpcy5kLmxhc3RTZWxlY3RlZERhdGUmJnRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlLmdldEhvdXJzKCk+dC5nZXRIb3VycygpJiYodGhpcy5taW5NaW51dGVzPXRoaXMub3B0cy5taW5NaW51dGVzKX0sX3NldE1heFRpbWVGcm9tRGF0ZTpmdW5jdGlvbih0KXtcbnRoaXMubWF4SG91cnM9dC5nZXRIb3VycygpLHRoaXMubWF4TWludXRlcz10LmdldE1pbnV0ZXMoKSx0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSYmdGhpcy5kLmxhc3RTZWxlY3RlZERhdGUuZ2V0SG91cnMoKTx0LmdldEhvdXJzKCkmJih0aGlzLm1heE1pbnV0ZXM9dGhpcy5vcHRzLm1heE1pbnV0ZXMpfSxfc2V0RGVmYXVsdE1pbk1heFRpbWU6ZnVuY3Rpb24oKXt2YXIgdD0yMyxlPTU5LGk9dGhpcy5vcHRzO3RoaXMubWluSG91cnM9aS5taW5Ib3VyczwwfHxpLm1pbkhvdXJzPnQ/MDppLm1pbkhvdXJzLHRoaXMubWluTWludXRlcz1pLm1pbk1pbnV0ZXM8MHx8aS5taW5NaW51dGVzPmU/MDppLm1pbk1pbnV0ZXMsdGhpcy5tYXhIb3Vycz1pLm1heEhvdXJzPDB8fGkubWF4SG91cnM+dD90OmkubWF4SG91cnMsdGhpcy5tYXhNaW51dGVzPWkubWF4TWludXRlczwwfHxpLm1heE1pbnV0ZXM+ZT9lOmkubWF4TWludXRlc30sX3ZhbGlkYXRlSG91cnNNaW51dGVzOmZ1bmN0aW9uKHQpe3RoaXMuaG91cnM8dGhpcy5taW5Ib3Vycz90aGlzLmhvdXJzPXRoaXMubWluSG91cnM6dGhpcy5ob3Vycz50aGlzLm1heEhvdXJzJiYodGhpcy5ob3Vycz10aGlzLm1heEhvdXJzKSx0aGlzLm1pbnV0ZXM8dGhpcy5taW5NaW51dGVzP3RoaXMubWludXRlcz10aGlzLm1pbk1pbnV0ZXM6dGhpcy5taW51dGVzPnRoaXMubWF4TWludXRlcyYmKHRoaXMubWludXRlcz10aGlzLm1heE1pbnV0ZXMpfSxfYnVpbGRIVE1MOmZ1bmN0aW9uKCl7dmFyIGk9cy5nZXRMZWFkaW5nWmVyb051bSxhPXtob3VyTWluOnRoaXMubWluSG91cnMsaG91ck1heDppKHRoaXMubWF4SG91cnMpLGhvdXJTdGVwOnRoaXMub3B0cy5ob3Vyc1N0ZXAsaG91clZhbHVlOnRoaXMuaG91cnMsaG91clZpc2libGU6aSh0aGlzLmRpc3BsYXlIb3VycyksbWluTWluOnRoaXMubWluTWludXRlcyxtaW5NYXg6aSh0aGlzLm1heE1pbnV0ZXMpLG1pblN0ZXA6dGhpcy5vcHRzLm1pbnV0ZXNTdGVwLG1pblZhbHVlOmkodGhpcy5taW51dGVzKX0sbj1zLnRlbXBsYXRlKHQsYSk7dGhpcy4kdGltZXBpY2tlcj1lKG4pLmFwcGVuZFRvKHRoaXMuZC4kZGF0ZXBpY2tlciksdGhpcy4kcmFuZ2VzPWUoJ1t0eXBlPVwicmFuZ2VcIl0nLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJGhvdXJzPWUoJ1tuYW1lPVwiaG91cnNcIl0nLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJG1pbnV0ZXM9ZSgnW25hbWU9XCJtaW51dGVzXCJdJyx0aGlzLiR0aW1lcGlja2VyKSx0aGlzLiRob3Vyc1RleHQ9ZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtaG91cnNcIix0aGlzLiR0aW1lcGlja2VyKSx0aGlzLiRtaW51dGVzVGV4dD1lKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1taW51dGVzXCIsdGhpcy4kdGltZXBpY2tlciksdGhpcy5kLmFtcG0mJih0aGlzLiRhbXBtPWUoJzxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWFtcG1cIj4nKS5hcHBlbmRUbyhlKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudFwiLHRoaXMuJHRpbWVwaWNrZXIpKS5odG1sKHRoaXMuZGF5UGVyaW9kKSx0aGlzLiR0aW1lcGlja2VyLmFkZENsYXNzKFwiLWFtLXBtLVwiKSl9LF91cGRhdGVDdXJyZW50VGltZTpmdW5jdGlvbigpe3ZhciB0PXMuZ2V0TGVhZGluZ1plcm9OdW0odGhpcy5kaXNwbGF5SG91cnMpLGU9cy5nZXRMZWFkaW5nWmVyb051bSh0aGlzLm1pbnV0ZXMpO3RoaXMuJGhvdXJzVGV4dC5odG1sKHQpLHRoaXMuJG1pbnV0ZXNUZXh0Lmh0bWwoZSksdGhpcy5kLmFtcG0mJnRoaXMuJGFtcG0uaHRtbCh0aGlzLmRheVBlcmlvZCl9LF91cGRhdGVSYW5nZXM6ZnVuY3Rpb24oKXt0aGlzLiRob3Vycy5hdHRyKHttaW46dGhpcy5taW5Ib3VycyxtYXg6dGhpcy5tYXhIb3Vyc30pLnZhbCh0aGlzLmhvdXJzKSx0aGlzLiRtaW51dGVzLmF0dHIoe21pbjp0aGlzLm1pbk1pbnV0ZXMsbWF4OnRoaXMubWF4TWludXRlc30pLnZhbCh0aGlzLm1pbnV0ZXMpfSxfaGFuZGxlRGF0ZTpmdW5jdGlvbih0KXt0aGlzLl9zZXREZWZhdWx0TWluTWF4VGltZSgpLHQmJihzLmlzU2FtZSh0LHRoaXMuZC5vcHRzLm1pbkRhdGUpP3RoaXMuX3NldE1pblRpbWVGcm9tRGF0ZSh0aGlzLmQub3B0cy5taW5EYXRlKTpzLmlzU2FtZSh0LHRoaXMuZC5vcHRzLm1heERhdGUpJiZ0aGlzLl9zZXRNYXhUaW1lRnJvbURhdGUodGhpcy5kLm9wdHMubWF4RGF0ZSkpLHRoaXMuX3ZhbGlkYXRlSG91cnNNaW51dGVzKHQpfSx1cGRhdGU6ZnVuY3Rpb24oKXt0aGlzLl91cGRhdGVSYW5nZXMoKSx0aGlzLl91cGRhdGVDdXJyZW50VGltZSgpfSxfZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlOmZ1bmN0aW9uKHQsZSl7dmFyIGk9dCxhPXQ7dCBpbnN0YW5jZW9mIERhdGUmJihpPXMuZ2V0UGFyc2VkRGF0ZSh0KSxhPWkuaG91cnMpO3ZhciBuPWV8fHRoaXMuZC5hbXBtLGg9XCJhbVwiO2lmKG4pc3dpdGNoKCEwKXtjYXNlIDA9PWE6YT0xMjticmVhaztjYXNlIDEyPT1hOmg9XCJwbVwiO2JyZWFrO2Nhc2UgYT4xMTphLT0xMixoPVwicG1cIn1yZXR1cm57aG91cnM6YSxkYXlQZXJpb2Q6aH19LHNldCBob3Vycyh0KXt0aGlzLl9ob3Vycz10O3ZhciBlPXRoaXMuX2dldFZhbGlkSG91cnNGcm9tRGF0ZSh0KTt0aGlzLmRpc3BsYXlIb3Vycz1lLmhvdXJzLHRoaXMuZGF5UGVyaW9kPWUuZGF5UGVyaW9kfSxnZXQgaG91cnMoKXtyZXR1cm4gdGhpcy5faG91cnN9LF9vbkNoYW5nZVJhbmdlOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLHM9aS5hdHRyKFwibmFtZVwiKTt0aGlzLmQudGltZXBpY2tlcklzQWN0aXZlPSEwLHRoaXNbc109aS52YWwoKSx0aGlzLl91cGRhdGVDdXJyZW50VGltZSgpLHRoaXMuZC5fdHJpZ2dlcihcInRpbWVDaGFuZ2VcIixbdGhpcy5ob3Vycyx0aGlzLm1pbnV0ZXNdKSx0aGlzLl9oYW5kbGVEYXRlKHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlKSx0aGlzLnVwZGF0ZSgpfSxfb25TZWxlY3REYXRlOmZ1bmN0aW9uKHQsZSl7dGhpcy5faGFuZGxlRGF0ZShlKSx0aGlzLnVwZGF0ZSgpfSxfb25Nb3VzZUVudGVyUmFuZ2U6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuYXR0cihcIm5hbWVcIik7ZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtXCIraSx0aGlzLiR0aW1lcGlja2VyKS5hZGRDbGFzcyhcIi1mb2N1cy1cIil9LF9vbk1vdXNlT3V0UmFuZ2U6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuYXR0cihcIm5hbWVcIik7dGhpcy5kLmluRm9jdXN8fGUoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LVwiK2ksdGhpcy4kdGltZXBpY2tlcikucmVtb3ZlQ2xhc3MoXCItZm9jdXMtXCIpfSxfb25Nb3VzZVVwUmFuZ2U6ZnVuY3Rpb24odCl7dGhpcy5kLnRpbWVwaWNrZXJJc0FjdGl2ZT0hMX19fSgpfSh3aW5kb3csalF1ZXJ5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9haXItZGF0ZXBpY2tlci9kaXN0L2pzL2RhdGVwaWNrZXIubWluLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9haXItZGF0ZXBpY2tlci9kaXN0L2pzL2RhdGVwaWNrZXIubWluLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjsoZnVuY3Rpb24gKCQpIHsgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlWydlbiddID0ge1xyXG4gICAgZGF5czogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddLFxyXG4gICAgZGF5c1Nob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxyXG4gICAgZGF5c01pbjogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxyXG4gICAgbW9udGhzOiBbJ0phbnVhcnknLCdGZWJydWFyeScsJ01hcmNoJywnQXByaWwnLCdNYXknLCdKdW5lJywgJ0p1bHknLCdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPY3RvYmVyJywnTm92ZW1iZXInLCdEZWNlbWJlciddLFxyXG4gICAgbW9udGhzU2hvcnQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcclxuICAgIHRvZGF5OiAnVG9kYXknLFxyXG4gICAgY2xlYXI6ICdDbGVhcicsXHJcbiAgICBkYXRlRm9ybWF0OiAnbW0vZGQveXl5eScsXHJcbiAgICB0aW1lRm9ybWF0OiAnaGg6aWkgYWEnLFxyXG4gICAgZmlyc3REYXk6IDBcclxufTsgfSkoalF1ZXJ5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9haXItZGF0ZXBpY2tlci9kaXN0L2pzL2kxOG4vZGF0ZXBpY2tlci5lbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9pMThuL2RhdGVwaWNrZXIuZW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohIEhhbW1lci5KUyAtIHYyLjAuNyAtIDIwMTYtMDQtMjJcbiAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IEpvcmlrIFRhbmdlbGRlcjtcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIGV4cG9ydE5hbWUsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbnZhciBWRU5ET1JfUFJFRklYRVMgPSBbJycsICd3ZWJraXQnLCAnTW96JywgJ01TJywgJ21zJywgJ28nXTtcbnZhciBURVNUX0VMRU1FTlQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxudmFyIFRZUEVfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuXG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xudmFyIGFicyA9IE1hdGguYWJzO1xudmFyIG5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIHNldCBhIHRpbWVvdXQgd2l0aCBhIGdpdmVuIHNjb3BlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBzZXRUaW1lb3V0Q29udGV4dChmbiwgdGltZW91dCwgY29udGV4dCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGJpbmRGbihmbiwgY29udGV4dCksIHRpbWVvdXQpO1xufVxuXG4vKipcbiAqIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSwgd2Ugd2FudCB0byBleGVjdXRlIHRoZSBmbiBvbiBlYWNoIGVudHJ5XG4gKiBpZiBpdCBhaW50IGFuIGFycmF5IHdlIGRvbid0IHdhbnQgdG8gZG8gYSB0aGluZy5cbiAqIHRoaXMgaXMgdXNlZCBieSBhbGwgdGhlIG1ldGhvZHMgdGhhdCBhY2NlcHQgYSBzaW5nbGUgYW5kIGFycmF5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfEFycmF5fSBhcmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBmblxuICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0XVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGludm9rZUFycmF5QXJnKGFyZywgZm4sIGNvbnRleHQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgIGVhY2goYXJnLCBjb250ZXh0W2ZuXSwgY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogd2FsayBvYmplY3RzIGFuZCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICovXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmICghb2JqKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob2JqLmZvckVhY2gpIHtcbiAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG9iai5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgb2JqLmhhc093blByb3BlcnR5KGkpICYmIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIHdyYXAgYSBtZXRob2Qgd2l0aCBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgYW5kIHN0YWNrIHRyYWNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyB0aGUgc3VwcGxpZWQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBkZXByZWNhdGUobWV0aG9kLCBuYW1lLCBtZXNzYWdlKSB7XG4gICAgdmFyIGRlcHJlY2F0aW9uTWVzc2FnZSA9ICdERVBSRUNBVEVEIE1FVEhPRDogJyArIG5hbWUgKyAnXFxuJyArIG1lc3NhZ2UgKyAnIEFUIFxcbic7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcignZ2V0LXN0YWNrLXRyYWNlJyk7XG4gICAgICAgIHZhciBzdGFjayA9IGUgJiYgZS5zdGFjayA/IGUuc3RhY2sucmVwbGFjZSgvXlteXFwoXSs/W1xcbiRdL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzK2F0XFxzKy9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXk9iamVjdC48YW5vbnltb3VzPlxccypcXCgvZ20sICd7YW5vbnltb3VzfSgpQCcpIDogJ1Vua25vd24gU3RhY2sgVHJhY2UnO1xuXG4gICAgICAgIHZhciBsb2cgPSB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUud2FybiB8fCB3aW5kb3cuY29uc29sZS5sb2cpO1xuICAgICAgICBpZiAobG9nKSB7XG4gICAgICAgICAgICBsb2cuY2FsbCh3aW5kb3cuY29uc29sZSwgZGVwcmVjYXRpb25NZXNzYWdlLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHsuLi5PYmplY3R9IG9iamVjdHNfdG9fYXNzaWduXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0YXJnZXRcbiAqL1xudmFyIGFzc2lnbjtcbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFttZXJnZT1mYWxzZV1cbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIGV4dGVuZCA9IGRlcHJlY2F0ZShmdW5jdGlvbiBleHRlbmQoZGVzdCwgc3JjLCBtZXJnZSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBrZXlzLmxlbmd0aCkge1xuICAgICAgICBpZiAoIW1lcmdlIHx8IChtZXJnZSAmJiBkZXN0W2tleXNbaV1dID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICBkZXN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG59LCAnZXh0ZW5kJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBtZXJnZSB0aGUgdmFsdWVzIGZyb20gc3JjIGluIHRoZSBkZXN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIHRoYXQgZXhpc3QgaW4gZGVzdCB3aWxsIG5vdCBiZSBvdmVyd3JpdHRlbiBieSBzcmNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBtZXJnZSA9IGRlcHJlY2F0ZShmdW5jdGlvbiBtZXJnZShkZXN0LCBzcmMpIHtcbiAgICByZXR1cm4gZXh0ZW5kKGRlc3QsIHNyYywgdHJ1ZSk7XG59LCAnbWVyZ2UnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIHNpbXBsZSBjbGFzcyBpbmhlcml0YW5jZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGJhc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllc11cbiAqL1xuZnVuY3Rpb24gaW5oZXJpdChjaGlsZCwgYmFzZSwgcHJvcGVydGllcykge1xuICAgIHZhciBiYXNlUCA9IGJhc2UucHJvdG90eXBlLFxuICAgICAgICBjaGlsZFA7XG5cbiAgICBjaGlsZFAgPSBjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGJhc2VQKTtcbiAgICBjaGlsZFAuY29uc3RydWN0b3IgPSBjaGlsZDtcbiAgICBjaGlsZFAuX3N1cGVyID0gYmFzZVA7XG5cbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICBhc3NpZ24oY2hpbGRQLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG59XG5cbi8qKlxuICogc2ltcGxlIGZ1bmN0aW9uIGJpbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBiaW5kRm4oZm4sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYm91bmRGbigpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBsZXQgYSBib29sZWFuIHZhbHVlIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IG11c3QgcmV0dXJuIGEgYm9vbGVhblxuICogdGhpcyBmaXJzdCBpdGVtIGluIGFyZ3Mgd2lsbCBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IHZhbFxuICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gYm9vbE9yRm4odmFsLCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT0gVFlQRV9GVU5DVElPTikge1xuICAgICAgICByZXR1cm4gdmFsLmFwcGx5KGFyZ3MgPyBhcmdzWzBdIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogdXNlIHRoZSB2YWwyIHdoZW4gdmFsMSBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSB7Kn0gdmFsMVxuICogQHBhcmFtIHsqfSB2YWwyXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gaWZVbmRlZmluZWQodmFsMSwgdmFsMikge1xuICAgIHJldHVybiAodmFsMSA9PT0gdW5kZWZpbmVkKSA/IHZhbDIgOiB2YWwxO1xufVxuXG4vKipcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiByZW1vdmVFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIG5vZGUgaXMgaW4gdGhlIGdpdmVuIHBhcmVudFxuICogQG1ldGhvZCBoYXNQYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHJldHVybiB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaGFzUGFyZW50KG5vZGUsIHBhcmVudCkge1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHNtYWxsIGluZGV4T2Ygd3JhcHBlclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBpblN0cihzdHIsIGZpbmQpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2YoZmluZCkgPiAtMTtcbn1cblxuLyoqXG4gKiBzcGxpdCBzdHJpbmcgb24gd2hpdGVzcGFjZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge0FycmF5fSB3b3Jkc1xuICovXG5mdW5jdGlvbiBzcGxpdFN0cihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5zcGxpdCgvXFxzKy9nKTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgYXJyYXkgY29udGFpbnMgdGhlIG9iamVjdCB1c2luZyBpbmRleE9mIG9yIGEgc2ltcGxlIHBvbHlGaWxsXG4gKiBAcGFyYW0ge0FycmF5fSBzcmNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcGFyYW0ge1N0cmluZ30gW2ZpbmRCeUtleV1cbiAqIEByZXR1cm4ge0Jvb2xlYW58TnVtYmVyfSBmYWxzZSB3aGVuIG5vdCBmb3VuZCwgb3IgdGhlIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGluQXJyYXkoc3JjLCBmaW5kLCBmaW5kQnlLZXkpIHtcbiAgICBpZiAoc3JjLmluZGV4T2YgJiYgIWZpbmRCeUtleSkge1xuICAgICAgICByZXR1cm4gc3JjLmluZGV4T2YoZmluZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICgoZmluZEJ5S2V5ICYmIHNyY1tpXVtmaW5kQnlLZXldID09IGZpbmQpIHx8ICghZmluZEJ5S2V5ICYmIHNyY1tpXSA9PT0gZmluZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufVxuXG4vKipcbiAqIGNvbnZlcnQgYXJyYXktbGlrZSBvYmplY3RzIHRvIHJlYWwgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaiwgMCk7XG59XG5cbi8qKlxuICogdW5pcXVlIGFycmF5IHdpdGggb2JqZWN0cyBiYXNlZCBvbiBhIGtleSAobGlrZSAnaWQnKSBvciBqdXN0IGJ5IHRoZSBhcnJheSdzIHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBzcmMgW3tpZDoxfSx7aWQ6Mn0se2lkOjF9XVxuICogQHBhcmFtIHtTdHJpbmd9IFtrZXldXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzb3J0PUZhbHNlXVxuICogQHJldHVybnMge0FycmF5fSBbe2lkOjF9LHtpZDoyfV1cbiAqL1xuZnVuY3Rpb24gdW5pcXVlQXJyYXkoc3JjLCBrZXksIHNvcnQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGtleSA/IHNyY1tpXVtrZXldIDogc3JjW2ldO1xuICAgICAgICBpZiAoaW5BcnJheSh2YWx1ZXMsIHZhbCkgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goc3JjW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaV0gPSB2YWw7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydChmdW5jdGlvbiBzb3J0VW5pcXVlQXJyYXkoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhW2tleV0gPiBiW2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG4vKipcbiAqIGdldCB0aGUgcHJlZml4ZWQgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHJldHVybnMge1N0cmluZ3xVbmRlZmluZWR9IHByZWZpeGVkXG4gKi9cbmZ1bmN0aW9uIHByZWZpeGVkKG9iaiwgcHJvcGVydHkpIHtcbiAgICB2YXIgcHJlZml4LCBwcm9wO1xuICAgIHZhciBjYW1lbFByb3AgPSBwcm9wZXJ0eVswXS50b1VwcGVyQ2FzZSgpICsgcHJvcGVydHkuc2xpY2UoMSk7XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBWRU5ET1JfUFJFRklYRVMubGVuZ3RoKSB7XG4gICAgICAgIHByZWZpeCA9IFZFTkRPUl9QUkVGSVhFU1tpXTtcbiAgICAgICAgcHJvcCA9IChwcmVmaXgpID8gcHJlZml4ICsgY2FtZWxQcm9wIDogcHJvcGVydHk7XG5cbiAgICAgICAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogZ2V0IGEgdW5pcXVlIGlkXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB1bmlxdWVJZFxuICovXG52YXIgX3VuaXF1ZUlkID0gMTtcbmZ1bmN0aW9uIHVuaXF1ZUlkKCkge1xuICAgIHJldHVybiBfdW5pcXVlSWQrKztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHdpbmRvdyBvYmplY3Qgb2YgYW4gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0RvY3VtZW50Vmlld3xXaW5kb3d9XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgIHZhciBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZWxlbWVudDtcbiAgICByZXR1cm4gKGRvYy5kZWZhdWx0VmlldyB8fCBkb2MucGFyZW50V2luZG93IHx8IHdpbmRvdyk7XG59XG5cbnZhciBNT0JJTEVfUkVHRVggPSAvbW9iaWxlfHRhYmxldHxpcChhZHxob25lfG9kKXxhbmRyb2lkL2k7XG5cbnZhciBTVVBQT1JUX1RPVUNIID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyk7XG52YXIgU1VQUE9SVF9QT0lOVEVSX0VWRU5UUyA9IHByZWZpeGVkKHdpbmRvdywgJ1BvaW50ZXJFdmVudCcpICE9PSB1bmRlZmluZWQ7XG52YXIgU1VQUE9SVF9PTkxZX1RPVUNIID0gU1VQUE9SVF9UT1VDSCAmJiBNT0JJTEVfUkVHRVgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxudmFyIElOUFVUX1RZUEVfVE9VQ0ggPSAndG91Y2gnO1xudmFyIElOUFVUX1RZUEVfUEVOID0gJ3Blbic7XG52YXIgSU5QVVRfVFlQRV9NT1VTRSA9ICdtb3VzZSc7XG52YXIgSU5QVVRfVFlQRV9LSU5FQ1QgPSAna2luZWN0JztcblxudmFyIENPTVBVVEVfSU5URVJWQUwgPSAyNTtcblxudmFyIElOUFVUX1NUQVJUID0gMTtcbnZhciBJTlBVVF9NT1ZFID0gMjtcbnZhciBJTlBVVF9FTkQgPSA0O1xudmFyIElOUFVUX0NBTkNFTCA9IDg7XG5cbnZhciBESVJFQ1RJT05fTk9ORSA9IDE7XG52YXIgRElSRUNUSU9OX0xFRlQgPSAyO1xudmFyIERJUkVDVElPTl9SSUdIVCA9IDQ7XG52YXIgRElSRUNUSU9OX1VQID0gODtcbnZhciBESVJFQ1RJT05fRE9XTiA9IDE2O1xuXG52YXIgRElSRUNUSU9OX0hPUklaT05UQUwgPSBESVJFQ1RJT05fTEVGVCB8IERJUkVDVElPTl9SSUdIVDtcbnZhciBESVJFQ1RJT05fVkVSVElDQUwgPSBESVJFQ1RJT05fVVAgfCBESVJFQ1RJT05fRE9XTjtcbnZhciBESVJFQ1RJT05fQUxMID0gRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUw7XG5cbnZhciBQUk9QU19YWSA9IFsneCcsICd5J107XG52YXIgUFJPUFNfQ0xJRU5UX1hZID0gWydjbGllbnRYJywgJ2NsaWVudFknXTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0lucHV0fVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIElucHV0KG1hbmFnZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMuZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICB0aGlzLnRhcmdldCA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dFRhcmdldDtcblxuICAgIC8vIHNtYWxsZXIgd3JhcHBlciBhcm91bmQgdGhlIGhhbmRsZXIsIGZvciB0aGUgc2NvcGUgYW5kIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBtYW5hZ2VyLFxuICAgIC8vIHNvIHdoZW4gZGlzYWJsZWQgdGhlIGlucHV0IGV2ZW50cyBhcmUgY29tcGxldGVseSBieXBhc3NlZC5cbiAgICB0aGlzLmRvbUhhbmRsZXIgPSBmdW5jdGlvbihldikge1xuICAgICAgICBpZiAoYm9vbE9yRm4obWFuYWdlci5vcHRpb25zLmVuYWJsZSwgW21hbmFnZXJdKSkge1xuICAgICAgICAgICAgc2VsZi5oYW5kbGVyKGV2KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcblxufVxuXG5JbnB1dC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2hvdWxkIGhhbmRsZSB0aGUgaW5wdXRFdmVudCBkYXRhIGFuZCB0cmlnZ2VyIHRoZSBjYWxsYmFja1xuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIGFkZEV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBjYWxsZWQgYnkgdGhlIE1hbmFnZXIgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0SW5zdGFuY2UobWFuYWdlcikge1xuICAgIHZhciBUeXBlO1xuICAgIHZhciBpbnB1dENsYXNzID0gbWFuYWdlci5vcHRpb25zLmlucHV0Q2xhc3M7XG5cbiAgICBpZiAoaW5wdXRDbGFzcykge1xuICAgICAgICBUeXBlID0gaW5wdXRDbGFzcztcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgICAgVHlwZSA9IFBvaW50ZXJFdmVudElucHV0O1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9PTkxZX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaElucHV0O1xuICAgIH0gZWxzZSBpZiAoIVNVUFBPUlRfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IE1vdXNlSW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoTW91c2VJbnB1dDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyAoVHlwZSkobWFuYWdlciwgaW5wdXRIYW5kbGVyKTtcbn1cblxuLyoqXG4gKiBoYW5kbGUgaW5wdXQgZXZlbnRzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIobWFuYWdlciwgZXZlbnRUeXBlLCBpbnB1dCkge1xuICAgIHZhciBwb2ludGVyc0xlbiA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgY2hhbmdlZFBvaW50ZXJzTGVuID0gaW5wdXQuY2hhbmdlZFBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgaXNGaXJzdCA9IChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcbiAgICB2YXIgaXNGaW5hbCA9IChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcblxuICAgIGlucHV0LmlzRmlyc3QgPSAhIWlzRmlyc3Q7XG4gICAgaW5wdXQuaXNGaW5hbCA9ICEhaXNGaW5hbDtcblxuICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIG1hbmFnZXIuc2Vzc2lvbiA9IHt9O1xuICAgIH1cblxuICAgIC8vIHNvdXJjZSBldmVudCBpcyB0aGUgbm9ybWFsaXplZCB2YWx1ZSBvZiB0aGUgZG9tRXZlbnRzXG4gICAgLy8gbGlrZSAndG91Y2hzdGFydCwgbW91c2V1cCwgcG9pbnRlcmRvd24nXG4gICAgaW5wdXQuZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuXG4gICAgLy8gY29tcHV0ZSBzY2FsZSwgcm90YXRpb24gZXRjXG4gICAgY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCk7XG5cbiAgICAvLyBlbWl0IHNlY3JldCBldmVudFxuICAgIG1hbmFnZXIuZW1pdCgnaGFtbWVyLmlucHV0JywgaW5wdXQpO1xuXG4gICAgbWFuYWdlci5yZWNvZ25pemUoaW5wdXQpO1xuICAgIG1hbmFnZXIuc2Vzc2lvbi5wcmV2SW5wdXQgPSBpbnB1dDtcbn1cblxuLyoqXG4gKiBleHRlbmQgdGhlIGRhdGEgd2l0aCBzb21lIHVzYWJsZSBwcm9wZXJ0aWVzIGxpa2Ugc2NhbGUsIHJvdGF0ZSwgdmVsb2NpdHkgZXRjXG4gKiBAcGFyYW0ge09iamVjdH0gbWFuYWdlclxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpIHtcbiAgICB2YXIgc2Vzc2lvbiA9IG1hbmFnZXIuc2Vzc2lvbjtcbiAgICB2YXIgcG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycztcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBzdG9yZSB0aGUgZmlyc3QgaW5wdXQgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBhbmQgZGlyZWN0aW9uXG4gICAgaWYgKCFzZXNzaW9uLmZpcnN0SW5wdXQpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdElucHV0ID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH1cblxuICAgIC8vIHRvIGNvbXB1dGUgc2NhbGUgYW5kIHJvdGF0aW9uIHdlIG5lZWQgdG8gc3RvcmUgdGhlIG11bHRpcGxlIHRvdWNoZXNcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPiAxICYmICFzZXNzaW9uLmZpcnN0TXVsdGlwbGUpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0SW5wdXQgPSBzZXNzaW9uLmZpcnN0SW5wdXQ7XG4gICAgdmFyIGZpcnN0TXVsdGlwbGUgPSBzZXNzaW9uLmZpcnN0TXVsdGlwbGU7XG4gICAgdmFyIG9mZnNldENlbnRlciA9IGZpcnN0TXVsdGlwbGUgPyBmaXJzdE11bHRpcGxlLmNlbnRlciA6IGZpcnN0SW5wdXQuY2VudGVyO1xuXG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlciA9IGdldENlbnRlcihwb2ludGVycyk7XG4gICAgaW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgaW5wdXQuZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gZmlyc3RJbnB1dC50aW1lU3RhbXA7XG5cbiAgICBpbnB1dC5hbmdsZSA9IGdldEFuZ2xlKG9mZnNldENlbnRlciwgY2VudGVyKTtcbiAgICBpbnB1dC5kaXN0YW5jZSA9IGdldERpc3RhbmNlKG9mZnNldENlbnRlciwgY2VudGVyKTtcblxuICAgIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KTtcbiAgICBpbnB1dC5vZmZzZXREaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuXG4gICAgdmFyIG92ZXJhbGxWZWxvY2l0eSA9IGdldFZlbG9jaXR5KGlucHV0LmRlbHRhVGltZSwgaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVggPSBvdmVyYWxsVmVsb2NpdHkueDtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZID0gb3ZlcmFsbFZlbG9jaXR5Lnk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5ID0gKGFicyhvdmVyYWxsVmVsb2NpdHkueCkgPiBhYnMob3ZlcmFsbFZlbG9jaXR5LnkpKSA/IG92ZXJhbGxWZWxvY2l0eS54IDogb3ZlcmFsbFZlbG9jaXR5Lnk7XG5cbiAgICBpbnB1dC5zY2FsZSA9IGZpcnN0TXVsdGlwbGUgPyBnZXRTY2FsZShmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAxO1xuICAgIGlucHV0LnJvdGF0aW9uID0gZmlyc3RNdWx0aXBsZSA/IGdldFJvdGF0aW9uKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDA7XG5cbiAgICBpbnB1dC5tYXhQb2ludGVycyA9ICFzZXNzaW9uLnByZXZJbnB1dCA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6ICgoaW5wdXQucG9pbnRlcnMubGVuZ3RoID5cbiAgICAgICAgc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpO1xuXG4gICAgY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KTtcblxuICAgIC8vIGZpbmQgdGhlIGNvcnJlY3QgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoaGFzUGFyZW50KGlucHV0LnNyY0V2ZW50LnRhcmdldCwgdGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSBpbnB1dC5zcmNFdmVudC50YXJnZXQ7XG4gICAgfVxuICAgIGlucHV0LnRhcmdldCA9IHRhcmdldDtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyO1xuICAgIHZhciBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldklucHV0ID0gc2Vzc2lvbi5wcmV2SW5wdXQgfHwge307XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9TVEFSVCB8fCBwcmV2SW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9FTkQpIHtcbiAgICAgICAgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBwcmV2SW5wdXQuZGVsdGFYIHx8IDAsXG4gICAgICAgICAgICB5OiBwcmV2SW5wdXQuZGVsdGFZIHx8IDBcbiAgICAgICAgfTtcblxuICAgICAgICBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhID0ge1xuICAgICAgICAgICAgeDogY2VudGVyLngsXG4gICAgICAgICAgICB5OiBjZW50ZXIueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlucHV0LmRlbHRhWCA9IHByZXZEZWx0YS54ICsgKGNlbnRlci54IC0gb2Zmc2V0LngpO1xuICAgIGlucHV0LmRlbHRhWSA9IHByZXZEZWx0YS55ICsgKGNlbnRlci55IC0gb2Zmc2V0LnkpO1xufVxuXG4vKipcbiAqIHZlbG9jaXR5IGlzIGNhbGN1bGF0ZWQgZXZlcnkgeCBtc1xuICogQHBhcmFtIHtPYmplY3R9IHNlc3Npb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgbGFzdCA9IHNlc3Npb24ubGFzdEludGVydmFsIHx8IGlucHV0LFxuICAgICAgICBkZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBsYXN0LnRpbWVTdGFtcCxcbiAgICAgICAgdmVsb2NpdHksIHZlbG9jaXR5WCwgdmVsb2NpdHlZLCBkaXJlY3Rpb247XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0NBTkNFTCAmJiAoZGVsdGFUaW1lID4gQ09NUFVURV9JTlRFUlZBTCB8fCBsYXN0LnZlbG9jaXR5ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIHZhciBkZWx0YVggPSBpbnB1dC5kZWx0YVggLSBsYXN0LmRlbHRhWDtcbiAgICAgICAgdmFyIGRlbHRhWSA9IGlucHV0LmRlbHRhWSAtIGxhc3QuZGVsdGFZO1xuXG4gICAgICAgIHZhciB2ID0gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCBkZWx0YVgsIGRlbHRhWSk7XG4gICAgICAgIHZlbG9jaXR5WCA9IHYueDtcbiAgICAgICAgdmVsb2NpdHlZID0gdi55O1xuICAgICAgICB2ZWxvY2l0eSA9IChhYnModi54KSA+IGFicyh2LnkpKSA/IHYueCA6IHYueTtcbiAgICAgICAgZGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICBzZXNzaW9uLmxhc3RJbnRlcnZhbCA9IGlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVzZSBsYXRlc3QgdmVsb2NpdHkgaW5mbyBpZiBpdCBkb2Vzbid0IG92ZXJ0YWtlIGEgbWluaW11bSBwZXJpb2RcbiAgICAgICAgdmVsb2NpdHkgPSBsYXN0LnZlbG9jaXR5O1xuICAgICAgICB2ZWxvY2l0eVggPSBsYXN0LnZlbG9jaXR5WDtcbiAgICAgICAgdmVsb2NpdHlZID0gbGFzdC52ZWxvY2l0eVk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGxhc3QuZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGlucHV0LnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgaW5wdXQudmVsb2NpdHlYID0gdmVsb2NpdHlYO1xuICAgIGlucHV0LnZlbG9jaXR5WSA9IHZlbG9jaXR5WTtcbiAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG59XG5cbi8qKlxuICogY3JlYXRlIGEgc2ltcGxlIGNsb25lIGZyb20gdGhlIGlucHV0IHVzZWQgZm9yIHN0b3JhZ2Ugb2YgZmlyc3RJbnB1dCBhbmQgZmlyc3RNdWx0aXBsZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjbG9uZWRJbnB1dERhdGFcbiAqL1xuZnVuY3Rpb24gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpIHtcbiAgICAvLyBtYWtlIGEgc2ltcGxlIGNvcHkgb2YgdGhlIHBvaW50ZXJzIGJlY2F1c2Ugd2Ugd2lsbCBnZXQgYSByZWZlcmVuY2UgaWYgd2UgZG9uJ3RcbiAgICAvLyB3ZSBvbmx5IG5lZWQgY2xpZW50WFkgZm9yIHRoZSBjYWxjdWxhdGlvbnNcbiAgICB2YXIgcG9pbnRlcnMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBpbnB1dC5wb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9pbnRlcnNbaV0gPSB7XG4gICAgICAgICAgICBjbGllbnRYOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRYKSxcbiAgICAgICAgICAgIGNsaWVudFk6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aW1lU3RhbXA6IG5vdygpLFxuICAgICAgICBwb2ludGVyczogcG9pbnRlcnMsXG4gICAgICAgIGNlbnRlcjogZ2V0Q2VudGVyKHBvaW50ZXJzKSxcbiAgICAgICAgZGVsdGFYOiBpbnB1dC5kZWx0YVgsXG4gICAgICAgIGRlbHRhWTogaW5wdXQuZGVsdGFZXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGNlbnRlciBvZiBhbGwgdGhlIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludGVyc1xuICogQHJldHVybiB7T2JqZWN0fSBjZW50ZXIgY29udGFpbnMgYHhgIGFuZCBgeWAgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBnZXRDZW50ZXIocG9pbnRlcnMpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBubyBuZWVkIHRvIGxvb3Agd2hlbiBvbmx5IG9uZSB0b3VjaFxuICAgIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WCksXG4gICAgICAgICAgICB5OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgcG9pbnRlcnNMZW5ndGgpIHtcbiAgICAgICAgeCArPSBwb2ludGVyc1tpXS5jbGllbnRYO1xuICAgICAgICB5ICs9IHBvaW50ZXJzW2ldLmNsaWVudFk7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiByb3VuZCh4IC8gcG9pbnRlcnNMZW5ndGgpLFxuICAgICAgICB5OiByb3VuZCh5IC8gcG9pbnRlcnNMZW5ndGgpXG4gICAgfTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHZlbG9jaXR5IGJldHdlZW4gdHdvIHBvaW50cy4gdW5pdCBpcyBpbiBweCBwZXIgbXMuXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFUaW1lXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge09iamVjdH0gdmVsb2NpdHkgYHhgIGFuZCBgeWBcbiAqL1xuZnVuY3Rpb24gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCB4LCB5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCAvIGRlbHRhVGltZSB8fCAwLFxuICAgICAgICB5OiB5IC8gZGVsdGFUaW1lIHx8IDBcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgZGlyZWN0aW9uIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpcmVjdGlvblxuICovXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgIHJldHVybiBESVJFQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICBpZiAoYWJzKHgpID49IGFicyh5KSkge1xuICAgICAgICByZXR1cm4geCA8IDAgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICB9XG4gICAgcmV0dXJuIHkgPCAwID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhYnNvbHV0ZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMSB7eCwgeX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiB7eCwgeX1cbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gZGlzdGFuY2VcbiAqL1xuZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4ICogeCkgKyAoeSAqIHkpKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcDFcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMlxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBhbmdsZVxuICovXG5mdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KSAqIDE4MCAvIE1hdGguUEk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSByb3RhdGlvbiBkZWdyZWVzIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHJvdGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldFJvdGF0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0QW5nbGUoZW5kWzFdLCBlbmRbMF0sIFBST1BTX0NMSUVOVF9YWSkgKyBnZXRBbmdsZShzdGFydFsxXSwgc3RhcnRbMF0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBzY2FsZSBmYWN0b3IgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIG5vIHNjYWxlIGlzIDEsIGFuZCBnb2VzIGRvd24gdG8gMCB3aGVuIHBpbmNoZWQgdG9nZXRoZXIsIGFuZCBiaWdnZXIgd2hlbiBwaW5jaGVkIG91dFxuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSBzY2FsZVxuICovXG5mdW5jdGlvbiBnZXRTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdLCBQUk9QU19DTElFTlRfWFkpIC8gZ2V0RGlzdGFuY2Uoc3RhcnRbMF0sIHN0YXJ0WzFdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG52YXIgTU9VU0VfSU5QVVRfTUFQID0ge1xuICAgIG1vdXNlZG93bjogSU5QVVRfU1RBUlQsXG4gICAgbW91c2Vtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIG1vdXNldXA6IElOUFVUX0VORFxufTtcblxudmFyIE1PVVNFX0VMRU1FTlRfRVZFTlRTID0gJ21vdXNlZG93bic7XG52YXIgTU9VU0VfV0lORE9XX0VWRU5UUyA9ICdtb3VzZW1vdmUgbW91c2V1cCc7XG5cbi8qKlxuICogTW91c2UgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIE1vdXNlSW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gTU9VU0VfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IE1PVVNFX1dJTkRPV19FVkVOVFM7XG5cbiAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTsgLy8gbW91c2Vkb3duIHN0YXRlXG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1FaGFuZGxlcihldikge1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gTU9VU0VfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIG9uIHN0YXJ0IHdlIHdhbnQgdG8gaGF2ZSB0aGUgbGVmdCBtb3VzZSBidXR0b24gZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgZXYuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX01PVkUgJiYgZXYud2hpY2ggIT09IDEpIHtcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9IElOUFVUX0VORDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoIXRoaXMucHJlc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX01PVVNFLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG52YXIgUE9JTlRFUl9JTlBVVF9NQVAgPSB7XG4gICAgcG9pbnRlcmRvd246IElOUFVUX1NUQVJULFxuICAgIHBvaW50ZXJtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHBvaW50ZXJ1cDogSU5QVVRfRU5ELFxuICAgIHBvaW50ZXJjYW5jZWw6IElOUFVUX0NBTkNFTCxcbiAgICBwb2ludGVyb3V0OiBJTlBVVF9DQU5DRUxcbn07XG5cbi8vIGluIElFMTAgdGhlIHBvaW50ZXIgdHlwZXMgaXMgZGVmaW5lZCBhcyBhbiBlbnVtXG52YXIgSUUxMF9QT0lOVEVSX1RZUEVfRU5VTSA9IHtcbiAgICAyOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgIDM6IElOUFVUX1RZUEVfUEVOLFxuICAgIDQ6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgNTogSU5QVVRfVFlQRV9LSU5FQ1QgLy8gc2VlIGh0dHBzOi8vdHdpdHRlci5jb20vamFjb2Jyb3NzaS9zdGF0dXMvNDgwNTk2NDM4NDg5ODkwODE2XG59O1xuXG52YXIgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdwb2ludGVyZG93bic7XG52YXIgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ3BvaW50ZXJtb3ZlIHBvaW50ZXJ1cCBwb2ludGVyY2FuY2VsJztcblxuLy8gSUUxMCBoYXMgcHJlZml4ZWQgc3VwcG9ydCwgYW5kIGNhc2Utc2Vuc2l0aXZlXG5pZiAod2luZG93Lk1TUG9pbnRlckV2ZW50ICYmICF3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG4gICAgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdNU1BvaW50ZXJEb3duJztcbiAgICBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAnTVNQb2ludGVyTW92ZSBNU1BvaW50ZXJVcCBNU1BvaW50ZXJDYW5jZWwnO1xufVxuXG4vKipcbiAqIFBvaW50ZXIgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFBvaW50ZXJFdmVudElucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IFBPSU5URVJfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFBPSU5URVJfV0lORE9XX0VWRU5UUztcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnN0b3JlID0gKHRoaXMubWFuYWdlci5zZXNzaW9uLnBvaW50ZXJFdmVudHMgPSBbXSk7XG59XG5cbmluaGVyaXQoUG9pbnRlckV2ZW50SW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFBFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgc3RvcmUgPSB0aGlzLnN0b3JlO1xuICAgICAgICB2YXIgcmVtb3ZlUG9pbnRlciA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBldmVudFR5cGVOb3JtYWxpemVkID0gZXYudHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ21zJywgJycpO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gUE9JTlRFUl9JTlBVVF9NQVBbZXZlbnRUeXBlTm9ybWFsaXplZF07XG4gICAgICAgIHZhciBwb2ludGVyVHlwZSA9IElFMTBfUE9JTlRFUl9UWVBFX0VOVU1bZXYucG9pbnRlclR5cGVdIHx8IGV2LnBvaW50ZXJUeXBlO1xuXG4gICAgICAgIHZhciBpc1RvdWNoID0gKHBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpO1xuXG4gICAgICAgIC8vIGdldCBpbmRleCBvZiB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHZhciBzdG9yZUluZGV4ID0gaW5BcnJheShzdG9yZSwgZXYucG9pbnRlcklkLCAncG9pbnRlcklkJyk7XG5cbiAgICAgICAgLy8gc3RhcnQgYW5kIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKGV2LmJ1dHRvbiA9PT0gMCB8fCBpc1RvdWNoKSkge1xuICAgICAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHVzaChldik7XG4gICAgICAgICAgICAgICAgc3RvcmVJbmRleCA9IHN0b3JlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIHJlbW92ZVBvaW50ZXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXQgbm90IGZvdW5kLCBzbyB0aGUgcG9pbnRlciBoYXNuJ3QgYmVlbiBkb3duIChzbyBpdCdzIHByb2JhYmx5IGEgaG92ZXIpXG4gICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgc3RvcmVbc3RvcmVJbmRleF0gPSBldjtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogc3RvcmUsXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogcG9pbnRlclR5cGUsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZVBvaW50ZXIpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBzdG9yZVxuICAgICAgICAgICAgc3RvcmUuc3BsaWNlKHN0b3JlSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbnZhciBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0JztcbnZhciBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogVG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFNpbmdsZVRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUztcbiAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU2luZ2xlVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBURWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIHNob3VsZCB3ZSBoYW5kbGUgdGhlIHRvdWNoIGV2ZW50cz9cbiAgICAgICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaGVzID0gbm9ybWFsaXplU2luZ2xlVG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcblxuICAgICAgICAvLyB3aGVuIGRvbmUsIHJlc2V0IHRoZSBzdGFydGVkIHN0YXRlXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgdG91Y2hlc1swXS5sZW5ndGggLSB0b3VjaGVzWzFdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplU2luZ2xlVG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGwgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciBjaGFuZ2VkID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyk7XG5cbiAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIGFsbCA9IHVuaXF1ZUFycmF5KGFsbC5jb25jYXQoY2hhbmdlZCksICdpZGVudGlmaWVyJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFthbGwsIGNoYW5nZWRdO1xufVxuXG52YXIgVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBUT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBNdWx0aS11c2VyIHRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBUT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMudGFyZ2V0SWRzID0ge307XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTVRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFRPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBnZXRUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuICAgICAgICBpZiAoIXRvdWNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBnZXRUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbFRvdWNoZXMgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciB0YXJnZXRJZHMgPSB0aGlzLnRhcmdldElkcztcblxuICAgIC8vIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgdG91Y2gsIHRoZSBwcm9jZXNzIGNhbiBiZSBzaW1wbGlmaWVkXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfU1RBUlQgfCBJTlBVVF9NT1ZFKSAmJiBhbGxUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0YXJnZXRJZHNbYWxsVG91Y2hlc1swXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBbYWxsVG91Y2hlcywgYWxsVG91Y2hlc107XG4gICAgfVxuXG4gICAgdmFyIGksXG4gICAgICAgIHRhcmdldFRvdWNoZXMsXG4gICAgICAgIGNoYW5nZWRUb3VjaGVzID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzID0gW10sXG4gICAgICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuXG4gICAgLy8gZ2V0IHRhcmdldCB0b3VjaGVzIGZyb20gdG91Y2hlc1xuICAgIHRhcmdldFRvdWNoZXMgPSBhbGxUb3VjaGVzLmZpbHRlcihmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICByZXR1cm4gaGFzUGFyZW50KHRvdWNoLnRhcmdldCwgdGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIC8vIGNvbGxlY3QgdG91Y2hlc1xuICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0YXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGFyZ2V0SWRzW3RhcmdldFRvdWNoZXNbaV0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGNoYW5nZWQgdG91Y2hlcyB0byBvbmx5IGNvbnRhaW4gdG91Y2hlcyB0aGF0IGV4aXN0IGluIHRoZSBjb2xsZWN0ZWQgdGFyZ2V0IGlkc1xuICAgIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl0pIHtcbiAgICAgICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzLnB1c2goY2hhbmdlZFRvdWNoZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYW51cCByZW1vdmVkIHRvdWNoZXNcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgZGVsZXRlIHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICAgIC8vIG1lcmdlIHRhcmdldFRvdWNoZXMgd2l0aCBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyBzbyBpdCBjb250YWlucyBBTEwgdG91Y2hlcywgaW5jbHVkaW5nICdlbmQnIGFuZCAnY2FuY2VsJ1xuICAgICAgICB1bmlxdWVBcnJheSh0YXJnZXRUb3VjaGVzLmNvbmNhdChjaGFuZ2VkVGFyZ2V0VG91Y2hlcyksICdpZGVudGlmaWVyJywgdHJ1ZSksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzXG4gICAgXTtcbn1cblxuLyoqXG4gKiBDb21iaW5lZCB0b3VjaCBhbmQgbW91c2UgaW5wdXRcbiAqXG4gKiBUb3VjaCBoYXMgYSBoaWdoZXIgcHJpb3JpdHkgdGhlbiBtb3VzZSwgYW5kIHdoaWxlIHRvdWNoaW5nIG5vIG1vdXNlIGV2ZW50cyBhcmUgYWxsb3dlZC5cbiAqIFRoaXMgYmVjYXVzZSB0b3VjaCBkZXZpY2VzIGFsc28gZW1pdCBtb3VzZSBldmVudHMgd2hpbGUgZG9pbmcgYSB0b3VjaC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cblxudmFyIERFRFVQX1RJTUVPVVQgPSAyNTAwO1xudmFyIERFRFVQX0RJU1RBTkNFID0gMjU7XG5cbmZ1bmN0aW9uIFRvdWNoTW91c2VJbnB1dCgpIHtcbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGhhbmRsZXIgPSBiaW5kRm4odGhpcy5oYW5kbGVyLCB0aGlzKTtcbiAgICB0aGlzLnRvdWNoID0gbmV3IFRvdWNoSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcbiAgICB0aGlzLm1vdXNlID0gbmV3IE1vdXNlSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcblxuICAgIHRoaXMucHJpbWFyeVRvdWNoID0gbnVsbDtcbiAgICB0aGlzLmxhc3RUb3VjaGVzID0gW107XG59XG5cbmluaGVyaXQoVG91Y2hNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBhbmQgdG91Y2ggZXZlbnRzXG4gICAgICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRFdmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBUTUVoYW5kbGVyKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgaXNUb3VjaCA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCksXG4gICAgICAgICAgICBpc01vdXNlID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX01PVVNFKTtcblxuICAgICAgICBpZiAoaXNNb3VzZSAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMuZmlyZXNUb3VjaEV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2hlbiB3ZSdyZSBpbiBhIHRvdWNoIGV2ZW50LCByZWNvcmQgdG91Y2hlcyB0byAgZGUtZHVwZSBzeW50aGV0aWMgbW91c2UgZXZlbnRcbiAgICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgICAgIHJlY29yZFRvdWNoZXMuY2FsbCh0aGlzLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTW91c2UgJiYgaXNTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGlucHV0RGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRvdWNoLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5tb3VzZS5kZXN0cm95KCk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHJlY29yZFRvdWNoZXMoZXZlbnRUeXBlLCBldmVudERhdGEpIHtcbiAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdLmlkZW50aWZpZXI7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0TGFzdFRvdWNoKGV2ZW50RGF0YSkge1xuICAgIHZhciB0b3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF07XG5cbiAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5wcmltYXJ5VG91Y2gpIHtcbiAgICAgICAgdmFyIGxhc3RUb3VjaCA9IHt4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZfTtcbiAgICAgICAgdGhpcy5sYXN0VG91Y2hlcy5wdXNoKGxhc3RUb3VjaCk7XG4gICAgICAgIHZhciBsdHMgPSB0aGlzLmxhc3RUb3VjaGVzO1xuICAgICAgICB2YXIgcmVtb3ZlTGFzdFRvdWNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGx0cy5pbmRleE9mKGxhc3RUb3VjaCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbHRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChyZW1vdmVMYXN0VG91Y2gsIERFRFVQX1RJTUVPVVQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNTeW50aGV0aWNFdmVudChldmVudERhdGEpIHtcbiAgICB2YXIgeCA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRYLCB5ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhc3RUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5sYXN0VG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoeCAtIHQueCksIGR5ID0gTWF0aC5hYnMoeSAtIHQueSk7XG4gICAgICAgIGlmIChkeCA8PSBERURVUF9ESVNUQU5DRSAmJiBkeSA8PSBERURVUF9ESVNUQU5DRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgUFJFRklYRURfVE9VQ0hfQUNUSU9OID0gcHJlZml4ZWQoVEVTVF9FTEVNRU5ULnN0eWxlLCAndG91Y2hBY3Rpb24nKTtcbnZhciBOQVRJVkVfVE9VQ0hfQUNUSU9OID0gUFJFRklYRURfVE9VQ0hfQUNUSU9OICE9PSB1bmRlZmluZWQ7XG5cbi8vIG1hZ2ljYWwgdG91Y2hBY3Rpb24gdmFsdWVcbnZhciBUT1VDSF9BQ1RJT05fQ09NUFVURSA9ICdjb21wdXRlJztcbnZhciBUT1VDSF9BQ1RJT05fQVVUTyA9ICdhdXRvJztcbnZhciBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OID0gJ21hbmlwdWxhdGlvbic7IC8vIG5vdCBpbXBsZW1lbnRlZFxudmFyIFRPVUNIX0FDVElPTl9OT05FID0gJ25vbmUnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWCA9ICdwYW4teCc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9ZID0gJ3Bhbi15JztcbnZhciBUT1VDSF9BQ1RJT05fTUFQID0gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpO1xuXG4vKipcbiAqIFRvdWNoIEFjdGlvblxuICogc2V0cyB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgb3IgdXNlcyB0aGUganMgYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVG91Y2hBY3Rpb24obWFuYWdlciwgdmFsdWUpIHtcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuc2V0KHZhbHVlKTtcbn1cblxuVG91Y2hBY3Rpb24ucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWUgb24gdGhlIGVsZW1lbnQgb3IgZW5hYmxlIHRoZSBwb2x5ZmlsbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gZmluZCBvdXQgdGhlIHRvdWNoLWFjdGlvbiBieSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgaWYgKHZhbHVlID09IFRPVUNIX0FDVElPTl9DT01QVVRFKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29tcHV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5BVElWRV9UT1VDSF9BQ1RJT04gJiYgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGUgJiYgVE9VQ0hfQUNUSU9OX01BUFt2YWx1ZV0pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlW1BSRUZJWEVEX1RPVUNIX0FDVElPTl0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICoganVzdCByZS1zZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXQodGhpcy5tYW5hZ2VyLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjb21wdXRlIHRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IGJhc2VkIG9uIHRoZSByZWNvZ25pemVyJ3Mgc2V0dGluZ3NcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGNvbXB1dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBlYWNoKHRoaXMubWFuYWdlci5yZWNvZ25pemVycywgZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICAgICAgaWYgKGJvb2xPckZuKHJlY29nbml6ZXIub3B0aW9ucy5lbmFibGUsIFtyZWNvZ25pemVyXSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gYWN0aW9ucy5jb25jYXQocmVjb2duaXplci5nZXRUb3VjaEFjdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zLmpvaW4oJyAnKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBvbiBlYWNoIGlucHV0IGN5Y2xlIGFuZCBwcm92aWRlcyB0aGUgcHJldmVudGluZyBvZiB0aGUgYnJvd3NlciBiZWhhdmlvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHByZXZlbnREZWZhdWx0czogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNyY0V2ZW50ID0gaW5wdXQuc3JjRXZlbnQ7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5vZmZzZXREaXJlY3Rpb247XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvdWNoIGFjdGlvbiBkaWQgcHJldmVudGVkIG9uY2UgdGhpcyBzZXNzaW9uXG4gICAgICAgIGlmICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIGhhc05vbmUgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgICAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9ZXTtcbiAgICAgICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWF07XG5cbiAgICAgICAgaWYgKGhhc05vbmUpIHtcbiAgICAgICAgICAgIC8vZG8gbm90IHByZXZlbnQgZGVmYXVsdHMgaWYgdGhpcyBpcyBhIHRhcCBnZXN0dXJlXG5cbiAgICAgICAgICAgIHZhciBpc1RhcFBvaW50ZXIgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICB2YXIgaXNUYXBNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgMjtcbiAgICAgICAgICAgIHZhciBpc1RhcFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IDI1MDtcblxuICAgICAgICAgICAgaWYgKGlzVGFwUG9pbnRlciAmJiBpc1RhcE1vdmVtZW50ICYmIGlzVGFwVG91Y2hUaW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICAgICAgLy8gYHBhbi14IHBhbi15YCBtZWFucyBicm93c2VyIGhhbmRsZXMgYWxsIHNjcm9sbGluZy9wYW5uaW5nLCBkbyBub3QgcHJldmVudFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc05vbmUgfHxcbiAgICAgICAgICAgIChoYXNQYW5ZICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB8fFxuICAgICAgICAgICAgKGhhc1BhblggJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudFNyYyhzcmNFdmVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbCBwcmV2ZW50RGVmYXVsdCB0byBwcmV2ZW50IHRoZSBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvciAoc2Nyb2xsaW5nIGluIG1vc3QgY2FzZXMpXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNyY0V2ZW50XG4gICAgICovXG4gICAgcHJldmVudFNyYzogZnVuY3Rpb24oc3JjRXZlbnQpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIHdoZW4gdGhlIHRvdWNoQWN0aW9ucyBhcmUgY29sbGVjdGVkIHRoZXkgYXJlIG5vdCBhIHZhbGlkIHZhbHVlLCBzbyB3ZSBuZWVkIHRvIGNsZWFuIHRoaW5ncyB1cC4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zKSB7XG4gICAgLy8gbm9uZVxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSk7XG5cbiAgICAvLyBpZiBib3RoIHBhbi14IGFuZCBwYW4teSBhcmUgc2V0IChkaWZmZXJlbnQgcmVjb2duaXplcnNcbiAgICAvLyBmb3IgZGlmZmVyZW50IGRpcmVjdGlvbnMsIGUuZy4gaG9yaXpvbnRhbCBwYW4gYnV0IHZlcnRpY2FsIHN3aXBlPylcbiAgICAvLyB3ZSBuZWVkIG5vbmUgKGFzIG90aGVyd2lzZSB3aXRoIHBhbi14IHBhbi15IGNvbWJpbmVkIG5vbmUgb2YgdGhlc2VcbiAgICAvLyByZWNvZ25pemVycyB3aWxsIHdvcmssIHNpbmNlIHRoZSBicm93c2VyIHdvdWxkIGhhbmRsZSBhbGwgcGFubmluZ1xuICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIC8vIHBhbi14IE9SIHBhbi15XG4gICAgaWYgKGhhc1BhblggfHwgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gaGFzUGFuWCA/IFRPVUNIX0FDVElPTl9QQU5fWCA6IFRPVUNIX0FDVElPTl9QQU5fWTtcbiAgICB9XG5cbiAgICAvLyBtYW5pcHVsYXRpb25cbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTikpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT047XG4gICAgfVxuXG4gICAgcmV0dXJuIFRPVUNIX0FDVElPTl9BVVRPO1xufVxuXG5mdW5jdGlvbiBnZXRUb3VjaEFjdGlvblByb3BzKCkge1xuICAgIGlmICghTkFUSVZFX1RPVUNIX0FDVElPTikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0b3VjaE1hcCA9IHt9O1xuICAgIHZhciBjc3NTdXBwb3J0cyA9IHdpbmRvdy5DU1MgJiYgd2luZG93LkNTUy5zdXBwb3J0cztcbiAgICBbJ2F1dG8nLCAnbWFuaXB1bGF0aW9uJywgJ3Bhbi15JywgJ3Bhbi14JywgJ3Bhbi14IHBhbi15JywgJ25vbmUnXS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xuXG4gICAgICAgIC8vIElmIGNzcy5zdXBwb3J0cyBpcyBub3Qgc3VwcG9ydGVkIGJ1dCB0aGVyZSBpcyBuYXRpdmUgdG91Y2gtYWN0aW9uIGFzc3VtZSBpdCBzdXBwb3J0c1xuICAgICAgICAvLyBhbGwgdmFsdWVzLiBUaGlzIGlzIHRoZSBjYXNlIGZvciBJRSAxMCBhbmQgMTEuXG4gICAgICAgIHRvdWNoTWFwW3ZhbF0gPSBjc3NTdXBwb3J0cyA/IHdpbmRvdy5DU1Muc3VwcG9ydHMoJ3RvdWNoLWFjdGlvbicsIHZhbCkgOiB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiB0b3VjaE1hcDtcbn1cblxuLyoqXG4gKiBSZWNvZ25pemVyIGZsb3cgZXhwbGFpbmVkOyAqXG4gKiBBbGwgcmVjb2duaXplcnMgaGF2ZSB0aGUgaW5pdGlhbCBzdGF0ZSBvZiBQT1NTSUJMRSB3aGVuIGEgaW5wdXQgc2Vzc2lvbiBzdGFydHMuXG4gKiBUaGUgZGVmaW5pdGlvbiBvZiBhIGlucHV0IHNlc3Npb24gaXMgZnJvbSB0aGUgZmlyc3QgaW5wdXQgdW50aWwgdGhlIGxhc3QgaW5wdXQsIHdpdGggYWxsIGl0J3MgbW92ZW1lbnQgaW4gaXQuICpcbiAqIEV4YW1wbGUgc2Vzc2lvbiBmb3IgbW91c2UtaW5wdXQ6IG1vdXNlZG93biAtPiBtb3VzZW1vdmUgLT4gbW91c2V1cFxuICpcbiAqIE9uIGVhY2ggcmVjb2duaXppbmcgY3ljbGUgKHNlZSBNYW5hZ2VyLnJlY29nbml6ZSkgdGhlIC5yZWNvZ25pemUoKSBtZXRob2QgaXMgZXhlY3V0ZWRcbiAqIHdoaWNoIGRldGVybWluZXMgd2l0aCBzdGF0ZSBpdCBzaG91bGQgYmUuXG4gKlxuICogSWYgdGhlIHJlY29nbml6ZXIgaGFzIHRoZSBzdGF0ZSBGQUlMRUQsIENBTkNFTExFRCBvciBSRUNPR05JWkVEIChlcXVhbHMgRU5ERUQpLCBpdCBpcyByZXNldCB0b1xuICogUE9TU0lCTEUgdG8gZ2l2ZSBpdCBhbm90aGVyIGNoYW5nZSBvbiB0aGUgbmV4dCBjeWNsZS5cbiAqXG4gKiAgICAgICAgICAgICAgIFBvc3NpYmxlXG4gKiAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgKy0tLS0tKy0tLS0tLS0tLS0tLS0tLStcbiAqICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgKy0tLS0tKy0tLS0tKyAgICAgICAgICAgICAgIHxcbiAqICAgICAgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgIHxcbiAqICAgRmFpbGVkICAgICAgQ2FuY2VsbGVkICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0rXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgUmVjb2duaXplZCAgICAgICBCZWdhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kZWQvUmVjb2duaXplZFxuICovXG52YXIgU1RBVEVfUE9TU0lCTEUgPSAxO1xudmFyIFNUQVRFX0JFR0FOID0gMjtcbnZhciBTVEFURV9DSEFOR0VEID0gNDtcbnZhciBTVEFURV9FTkRFRCA9IDg7XG52YXIgU1RBVEVfUkVDT0dOSVpFRCA9IFNUQVRFX0VOREVEO1xudmFyIFNUQVRFX0NBTkNFTExFRCA9IDE2O1xudmFyIFNUQVRFX0ZBSUxFRCA9IDMyO1xuXG4vKipcbiAqIFJlY29nbml6ZXJcbiAqIEV2ZXJ5IHJlY29nbml6ZXIgbmVlZHMgdG8gZXh0ZW5kIGZyb20gdGhpcyBjbGFzcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gUmVjb2duaXplcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMuaWQgPSB1bmlxdWVJZCgpO1xuXG4gICAgdGhpcy5tYW5hZ2VyID0gbnVsbDtcblxuICAgIC8vIGRlZmF1bHQgaXMgZW5hYmxlIHRydWVcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlID0gaWZVbmRlZmluZWQodGhpcy5vcHRpb25zLmVuYWJsZSwgdHJ1ZSk7XG5cbiAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG5cbiAgICB0aGlzLnNpbXVsdGFuZW91cyA9IHt9O1xuICAgIHRoaXMucmVxdWlyZUZhaWwgPSBbXTtcbn1cblxuUmVjb2duaXplci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7fSxcblxuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtSZWNvZ25pemVyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBhbHNvIHVwZGF0ZSB0aGUgdG91Y2hBY3Rpb24sIGluIGNhc2Ugc29tZXRoaW5nIGNoYW5nZWQgYWJvdXQgdGhlIGRpcmVjdGlvbnMvZW5hYmxlZCBzdGF0ZVxuICAgICAgICB0aGlzLm1hbmFnZXIgJiYgdGhpcy5tYW5hZ2VyLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaW11bHRhbmVvdXMgPSB0aGlzLnNpbXVsdGFuZW91cztcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoIXNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdKSB7XG4gICAgICAgICAgICBzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSA9IG90aGVyUmVjb2duaXplcjtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZWNvZ25pemVXaXRoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSBzaW11bHRhbmVvdXMgbGluay4gaXQgZG9lc250IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplciBjYW4gb25seSBydW4gd2hlbiBhbiBvdGhlciBpcyBmYWlsaW5nXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlcXVpcmVGYWlsID0gdGhpcy5yZXF1aXJlRmFpbDtcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoaW5BcnJheShyZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJlcXVpcmVGYWlsLnB1c2gob3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZXF1aXJlRmFpbHVyZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgcmVxdWlyZUZhaWx1cmUgbGluay4gaXQgZG9lcyBub3QgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHRoaXMucmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcik7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVpcmVGYWlsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGhhcyByZXF1aXJlIGZhaWx1cmVzIGJvb2xlYW5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNSZXF1aXJlRmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGggPiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgcmVjb2duaXplciBjYW4gcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNhblJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICByZXR1cm4gISF0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBZb3Ugc2hvdWxkIHVzZSBgdHJ5RW1pdGAgaW5zdGVhZCBvZiBgZW1pdGAgZGlyZWN0bHkgdG8gY2hlY2tcbiAgICAgKiB0aGF0IGFsbCB0aGUgbmVlZGVkIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQgYmVmb3JlIGVtaXR0aW5nLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLm1hbmFnZXIuZW1pdChldmVudCwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJ3BhbnN0YXJ0JyBhbmQgJ3Bhbm1vdmUnXG4gICAgICAgIGlmIChzdGF0ZSA8IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCk7IC8vIHNpbXBsZSAnZXZlbnROYW1lJyBldmVudHNcblxuICAgICAgICBpZiAoaW5wdXQuYWRkaXRpb25hbEV2ZW50KSB7IC8vIGFkZGl0aW9uYWwgZXZlbnQocGFubGVmdCwgcGFucmlnaHQsIHBpbmNoaW4sIHBpbmNob3V0Li4uKVxuICAgICAgICAgICAgZW1pdChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGFuZW5kIGFuZCBwYW5jYW5jZWxcbiAgICAgICAgaWYgKHN0YXRlID49IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhhdCBhbGwgdGhlIHJlcXVpcmUgZmFpbHVyZSByZWNvZ25pemVycyBoYXMgZmFpbGVkLFxuICAgICAqIGlmIHRydWUsIGl0IGVtaXRzIGEgZ2VzdHVyZSBldmVudCxcbiAgICAgKiBvdGhlcndpc2UsIHNldHVwIHRoZSBzdGF0ZSB0byBGQUlMRUQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgdHJ5RW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuRW1pdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpdCdzIGZhaWxpbmcgYW55d2F5XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbiB3ZSBlbWl0P1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNhbkVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMucmVxdWlyZUZhaWxbaV0uc3RhdGUgJiAoU1RBVEVfRkFJTEVEIHwgU1RBVEVfUE9TU0lCTEUpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIC8vIG1ha2UgYSBuZXcgY29weSBvZiB0aGUgaW5wdXREYXRhXG4gICAgICAgIC8vIHNvIHdlIGNhbiBjaGFuZ2UgdGhlIGlucHV0RGF0YSB3aXRob3V0IG1lc3NpbmcgdXAgdGhlIG90aGVyIHJlY29nbml6ZXJzXG4gICAgICAgIHZhciBpbnB1dERhdGFDbG9uZSA9IGFzc2lnbih7fSwgaW5wdXREYXRhKTtcblxuICAgICAgICAvLyBpcyBpcyBlbmFibGVkIGFuZCBhbGxvdyByZWNvZ25pemluZz9cbiAgICAgICAgaWYgKCFib29sT3JGbih0aGlzLm9wdGlvbnMuZW5hYmxlLCBbdGhpcywgaW5wdXREYXRhQ2xvbmVdKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gd2UndmUgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX1JFQ09HTklaRUQgfCBTVEFURV9DQU5DRUxMRUQgfCBTVEFURV9GQUlMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5wcm9jZXNzKGlucHV0RGF0YUNsb25lKTtcblxuICAgICAgICAvLyB0aGUgcmVjb2duaXplciBoYXMgcmVjb2duaXplZCBhIGdlc3R1cmVcbiAgICAgICAgLy8gc28gdHJpZ2dlciBhbiBldmVudFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCB8IFNUQVRFX0NBTkNFTExFRCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJ5RW1pdChpbnB1dERhdGFDbG9uZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBzdGF0ZSBvZiB0aGUgcmVjb2duaXplclxuICAgICAqIHRoZSBhY3R1YWwgcmVjb2duaXppbmcgaGFwcGVucyBpbiB0aGlzIG1ldGhvZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqIEByZXR1cm5zIHtDb25zdH0gU1RBVEVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dERhdGEpIHsgfSwgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHByZWZlcnJlZCB0b3VjaC1hY3Rpb25cbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgZ2VzdHVyZSBpc24ndCBhbGxvd2VkIHRvIHJlY29nbml6ZVxuICAgICAqIGxpa2Ugd2hlbiBhbm90aGVyIGlzIGJlaW5nIHJlY29nbml6ZWQgb3IgaXQgaXMgZGlzYWJsZWRcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbigpIHsgfVxufTtcblxuLyoqXG4gKiBnZXQgYSB1c2FibGUgc3RyaW5nLCB1c2VkIGFzIGV2ZW50IHBvc3RmaXhcbiAqIEBwYXJhbSB7Q29uc3R9IHN0YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdGF0ZVxuICovXG5mdW5jdGlvbiBzdGF0ZVN0cihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSAmIFNUQVRFX0NBTkNFTExFRCkge1xuICAgICAgICByZXR1cm4gJ2NhbmNlbCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0VOREVEKSB7XG4gICAgICAgIHJldHVybiAnZW5kJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQ0hBTkdFRCkge1xuICAgICAgICByZXR1cm4gJ21vdmUnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9CRUdBTikge1xuICAgICAgICByZXR1cm4gJ3N0YXJ0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGRpcmVjdGlvbiBjb25zIHRvIHN0cmluZ1xuICogQHBhcmFtIHtDb25zdH0gZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBkaXJlY3Rpb25TdHIoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fRE9XTikge1xuICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9VUCkge1xuICAgICAgICByZXR1cm4gJ3VwJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fTEVGVCkge1xuICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9SSUdIVCkge1xuICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGdldCBhIHJlY29nbml6ZXIgYnkgbmFtZSBpZiBpdCBpcyBib3VuZCB0byBhIG1hbmFnZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IG90aGVyUmVjb2duaXplclxuICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gKiBAcmV0dXJucyB7UmVjb2duaXplcn1cbiAqL1xuZnVuY3Rpb24gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHJlY29nbml6ZXIpIHtcbiAgICB2YXIgbWFuYWdlciA9IHJlY29nbml6ZXIubWFuYWdlcjtcbiAgICBpZiAobWFuYWdlcikge1xuICAgICAgICByZXR1cm4gbWFuYWdlci5nZXQob3RoZXJSZWNvZ25pemVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG90aGVyUmVjb2duaXplcjtcbn1cblxuLyoqXG4gKiBUaGlzIHJlY29nbml6ZXIgaXMganVzdCB1c2VkIGFzIGEgYmFzZSBmb3IgdGhlIHNpbXBsZSBhdHRyaWJ1dGUgcmVjb2duaXplcnMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gQXR0clJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KEF0dHJSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNoZWNrIGlmIGl0IHRoZSByZWNvZ25pemVyIHJlY2VpdmVzIHZhbGlkIGlucHV0LCBsaWtlIGlucHV0LmRpc3RhbmNlID4gMTAuXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHJlY29nbml6ZWRcbiAgICAgKi9cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvblBvaW50ZXJzID0gdGhpcy5vcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICByZXR1cm4gb3B0aW9uUG9pbnRlcnMgPT09IDAgfHwgaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25Qb2ludGVycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgaW5wdXQgYW5kIHJldHVybiB0aGUgc3RhdGUgZm9yIHRoZSByZWNvZ25pemVyXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMgeyp9IFN0YXRlXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IGlucHV0LmV2ZW50VHlwZTtcblxuICAgICAgICB2YXIgaXNSZWNvZ25pemVkID0gc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmF0dHJUZXN0KGlucHV0KTtcblxuICAgICAgICAvLyBvbiBjYW5jZWwgaW5wdXQgYW5kIHdlJ3ZlIHJlY29nbml6ZWQgYmVmb3JlLCByZXR1cm4gU1RBVEVfQ0FOQ0VMTEVEXG4gICAgICAgIGlmIChpc1JlY29nbml6ZWQgJiYgKGV2ZW50VHlwZSAmIElOUFVUX0NBTkNFTCB8fCAhaXNWYWxpZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NBTkNFTExFRDtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlY29nbml6ZWQgfHwgaXNWYWxpZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0VOREVEO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKHN0YXRlICYgU1RBVEVfQkVHQU4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0hBTkdFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBhblxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gYW5kIG1vdmVkIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGFuUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wWCA9IG51bGw7XG4gICAgdGhpcy5wWSA9IG51bGw7XG59XG5cbmluaGVyaXQoUGFuUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBhblJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BhbicsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9BTExcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9LFxuXG4gICAgZGlyZWN0aW9uVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciBoYXNNb3ZlZCA9IHRydWU7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGlucHV0LmRpc3RhbmNlO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgeCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdmFyIHkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgLy8gbG9jayB0byBheGlzP1xuICAgICAgICBpZiAoIShkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHggPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeCA8IDApID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB4ICE9IHRoaXMucFg7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeSA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh5IDwgMCkgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHkgIT0gdGhpcy5wWTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICByZXR1cm4gaGFzTW92ZWQgJiYgZGlzdGFuY2UgPiBvcHRpb25zLnRocmVzaG9sZCAmJiBkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBBdHRyUmVjb2duaXplci5wcm90b3R5cGUuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgICh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4gfHwgKCEodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKSAmJiB0aGlzLmRpcmVjdGlvblRlc3QoaW5wdXQpKSk7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG5cbiAgICAgICAgdGhpcy5wWCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdGhpcy5wWSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0LmRpcmVjdGlvbik7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGluY2hcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVycyBhcmUgbW92aW5nIHRvd2FyZCAoem9vbS1pbikgb3IgYXdheSBmcm9tIGVhY2ggb3RoZXIgKHpvb20tb3V0KS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGluY2hSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUGluY2hSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwaW5jaCcsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnNjYWxlIC0gMSkgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgdmFyIGluT3V0ID0gaW5wdXQuc2NhbGUgPCAxID8gJ2luJyA6ICdvdXQnO1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgaW5PdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQcmVzc1xuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gZm9yIHggbXMgd2l0aG91dCBhbnkgbW92ZW1lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUHJlc3NSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG59XG5cbmluaGVyaXQoUHJlc3NSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQcmVzc1JlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3ByZXNzJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRpbWU6IDI1MSwgLy8gbWluaW1hbCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIHByZXNzZWRcbiAgICAgICAgdGhyZXNob2xkOiA5IC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fQVVUT107XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUaW1lID0gaW5wdXQuZGVsdGFUaW1lID4gb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAoIXZhbGlkTW92ZW1lbnQgfHwgIXZhbGlkUG9pbnRlcnMgfHwgKGlucHV0LmV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmICF2YWxpZFRpbWUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICB9LCBvcHRpb25zLnRpbWUsIHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0ICYmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyAndXAnLCBpbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogUm90YXRlXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlciBhcmUgbW92aW5nIGluIGEgY2lyY3VsYXIgbW90aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBSb3RhdGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUm90YXRlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFJvdGF0ZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3JvdGF0ZScsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnJvdGF0aW9uKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBTd2lwZVxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIG1vdmluZyBmYXN0ICh2ZWxvY2l0eSksIHdpdGggZW5vdWdoIGRpc3RhbmNlIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gU3dpcGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU3dpcGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgU3dpcGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdzd2lwZScsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHZlbG9jaXR5OiAwLjMsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBhblJlY29nbml6ZXIucHJvdG90eXBlLmdldFRvdWNoQWN0aW9uLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHZlbG9jaXR5O1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiAoRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICBkaXJlY3Rpb24gJiBpbnB1dC5vZmZzZXREaXJlY3Rpb24gJiZcbiAgICAgICAgICAgIGlucHV0LmRpc3RhbmNlID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCAmJlxuICAgICAgICAgICAgaW5wdXQubWF4UG9pbnRlcnMgPT0gdGhpcy5vcHRpb25zLnBvaW50ZXJzICYmXG4gICAgICAgICAgICBhYnModmVsb2NpdHkpID4gdGhpcy5vcHRpb25zLnZlbG9jaXR5ICYmIGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORDtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5vZmZzZXREaXJlY3Rpb24pO1xuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb24sIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEEgdGFwIGlzIGVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvaW5nIGEgc21hbGwgdGFwL2NsaWNrLiBNdWx0aXBsZSB0YXBzIGFyZSByZWNvZ25pemVkIGlmIHRoZXkgb2NjdXJcbiAqIGJldHdlZW4gdGhlIGdpdmVuIGludGVydmFsIGFuZCBwb3NpdGlvbi4gVGhlIGRlbGF5IG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZWNvZ25pemUgbXVsdGktdGFwcyB3aXRob3V0IGZpcmluZ1xuICogYSBzaW5nbGUgdGFwLlxuICpcbiAqIFRoZSBldmVudERhdGEgZnJvbSB0aGUgZW1pdHRlZCBldmVudCBjb250YWlucyB0aGUgcHJvcGVydHkgYHRhcENvdW50YCwgd2hpY2ggY29udGFpbnMgdGhlIGFtb3VudCBvZlxuICogbXVsdGktdGFwcyBiZWluZyByZWNvZ25pemVkLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFRhcFJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gcHJldmlvdXMgdGltZSBhbmQgY2VudGVyLFxuICAgIC8vIHVzZWQgZm9yIHRhcCBjb3VudGluZ1xuICAgIHRoaXMucFRpbWUgPSBmYWxzZTtcbiAgICB0aGlzLnBDZW50ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG4gICAgdGhpcy5jb3VudCA9IDA7XG59XG5cbmluaGVyaXQoVGFwUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICd0YXAnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGFwczogMSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMCwgLy8gbWF4IHRpbWUgYmV0d2VlbiB0aGUgbXVsdGktdGFwIHRhcHNcbiAgICAgICAgdGltZTogMjUwLCAvLyBtYXggdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBkb3duIChsaWtlIGZpbmdlciBvbiB0aGUgc2NyZWVuKVxuICAgICAgICB0aHJlc2hvbGQ6IDksIC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgICAgIHBvc1RocmVzaG9sZDogMTAgLy8gYSBtdWx0aS10YXAgY2FuIGJlIGEgYml0IG9mZiB0aGUgaW5pdGlhbCBwb3NpdGlvblxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTl07XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgaWYgKChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkgJiYgKHRoaXMuY291bnQgPT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAodmFsaWRNb3ZlbWVudCAmJiB2YWxpZFRvdWNoVGltZSAmJiB2YWxpZFBvaW50ZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2YWxpZEludGVydmFsID0gdGhpcy5wVGltZSA/IChpbnB1dC50aW1lU3RhbXAgLSB0aGlzLnBUaW1lIDwgb3B0aW9ucy5pbnRlcnZhbCkgOiB0cnVlO1xuICAgICAgICAgICAgdmFyIHZhbGlkTXVsdGlUYXAgPSAhdGhpcy5wQ2VudGVyIHx8IGdldERpc3RhbmNlKHRoaXMucENlbnRlciwgaW5wdXQuY2VudGVyKSA8IG9wdGlvbnMucG9zVGhyZXNob2xkO1xuXG4gICAgICAgICAgICB0aGlzLnBUaW1lID0gaW5wdXQudGltZVN0YW1wO1xuICAgICAgICAgICAgdGhpcy5wQ2VudGVyID0gaW5wdXQuY2VudGVyO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkTXVsdGlUYXAgfHwgIXZhbGlkSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgICAgICAvLyBpZiB0YXAgY291bnQgbWF0Y2hlcyB3ZSBoYXZlIHJlY29nbml6ZWQgaXQsXG4gICAgICAgICAgICAvLyBlbHNlIGl0IGhhcyBiZWdhbiByZWNvZ25pemluZy4uLlxuICAgICAgICAgICAgdmFyIHRhcENvdW50ID0gdGhpcy5jb3VudCAlIG9wdGlvbnMudGFwcztcbiAgICAgICAgICAgIGlmICh0YXBDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGZhaWxpbmcgcmVxdWlyZW1lbnRzLCBpbW1lZGlhdGVseSB0cmlnZ2VyIHRoZSB0YXAgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyBvciB3YWl0IGFzIGxvbmcgYXMgdGhlIG11bHRpdGFwIGludGVydmFsIHRvIHRyaWdnZXJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzUmVxdWlyZUZhaWx1cmVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIGZhaWxUaW1lb3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRhcENvdW50ID0gdGhpcy5jb3VudDtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogU2ltcGxlIHdheSB0byBjcmVhdGUgYSBtYW5hZ2VyIHdpdGggYSBkZWZhdWx0IHNldCBvZiByZWNvZ25pemVycy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIYW1tZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMucmVjb2duaXplcnMgPSBpZlVuZGVmaW5lZChvcHRpb25zLnJlY29nbml6ZXJzLCBIYW1tZXIuZGVmYXVsdHMucHJlc2V0KTtcbiAgICByZXR1cm4gbmV3IE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQGNvbnN0IHtzdHJpbmd9XG4gKi9cbkhhbW1lci5WRVJTSU9OID0gJzIuMC43JztcblxuLyoqXG4gKiBkZWZhdWx0IHNldHRpbmdzXG4gKiBAbmFtZXNwYWNlXG4gKi9cbkhhbW1lci5kZWZhdWx0cyA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgaWYgRE9NIGV2ZW50cyBhcmUgYmVpbmcgdHJpZ2dlcmVkLlxuICAgICAqIEJ1dCB0aGlzIGlzIHNsb3dlciBhbmQgdW51c2VkIGJ5IHNpbXBsZSBpbXBsZW1lbnRhdGlvbnMsIHNvIGRpc2FibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBkb21FdmVudHM6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkvZmFsbGJhY2suXG4gICAgICogV2hlbiBzZXQgdG8gYGNvbXB1dGVgIGl0IHdpbGwgbWFnaWNhbGx5IHNldCB0aGUgY29ycmVjdCB2YWx1ZSBiYXNlZCBvbiB0aGUgYWRkZWQgcmVjb2duaXplcnMuXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBjb21wdXRlXG4gICAgICovXG4gICAgdG91Y2hBY3Rpb246IFRPVUNIX0FDVElPTl9DT01QVVRFLFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGVuYWJsZTogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIEVYUEVSSU1FTlRBTCBGRUFUVVJFIC0tIGNhbiBiZSByZW1vdmVkL2NoYW5nZWRcbiAgICAgKiBDaGFuZ2UgdGhlIHBhcmVudCBpbnB1dCB0YXJnZXQgZWxlbWVudC5cbiAgICAgKiBJZiBOdWxsLCB0aGVuIGl0IGlzIGJlaW5nIHNldCB0aGUgdG8gbWFpbiBlbGVtZW50LlxuICAgICAqIEB0eXBlIHtOdWxsfEV2ZW50VGFyZ2V0fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dFRhcmdldDogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIGZvcmNlIGFuIGlucHV0IGNsYXNzXG4gICAgICogQHR5cGUge051bGx8RnVuY3Rpb259XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0Q2xhc3M6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHJlY29nbml6ZXIgc2V0dXAgd2hlbiBjYWxsaW5nIGBIYW1tZXIoKWBcbiAgICAgKiBXaGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIgdGhlc2Ugd2lsbCBiZSBza2lwcGVkLlxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBwcmVzZXQ6IFtcbiAgICAgICAgLy8gUmVjb2duaXplckNsYXNzLCBvcHRpb25zLCBbcmVjb2duaXplV2l0aCwgLi4uXSwgW3JlcXVpcmVGYWlsdXJlLCAuLi5dXG4gICAgICAgIFtSb3RhdGVSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX1dLFxuICAgICAgICBbUGluY2hSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX0sIFsncm90YXRlJ11dLFxuICAgICAgICBbU3dpcGVSZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH1dLFxuICAgICAgICBbUGFuUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9LCBbJ3N3aXBlJ11dLFxuICAgICAgICBbVGFwUmVjb2duaXplcl0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyLCB7ZXZlbnQ6ICdkb3VibGV0YXAnLCB0YXBzOiAyfSwgWyd0YXAnXV0sXG4gICAgICAgIFtQcmVzc1JlY29nbml6ZXJdXG4gICAgXSxcblxuICAgIC8qKlxuICAgICAqIFNvbWUgQ1NTIHByb3BlcnRpZXMgY2FuIGJlIHVzZWQgdG8gaW1wcm92ZSB0aGUgd29ya2luZyBvZiBIYW1tZXIuXG4gICAgICogQWRkIHRoZW0gdG8gdGhpcyBtZXRob2QgYW5kIHRoZXkgd2lsbCBiZSBzZXQgd2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyLlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBjc3NQcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGV4dCBzZWxlY3Rpb24gdG8gaW1wcm92ZSB0aGUgZHJhZ2dpbmcgZ2VzdHVyZS4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSB0aGUgV2luZG93cyBQaG9uZSBncmlwcGVycyB3aGVuIHByZXNzaW5nIGFuIGVsZW1lbnQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGRlZmF1bHQgY2FsbG91dCBzaG93biB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldC5cbiAgICAgICAgICogT24gaU9TLCB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldCBzdWNoIGFzIGEgbGluaywgU2FmYXJpIGRpc3BsYXlzXG4gICAgICAgICAqIGEgY2FsbG91dCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBsaW5rLiBUaGlzIHByb3BlcnR5IGFsbG93cyB5b3UgdG8gZGlzYWJsZSB0aGF0IGNhbGxvdXQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHpvb21pbmcgaXMgZW5hYmxlZC4gVXNlZCBieSBJRTEwPlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnRab29taW5nOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB0aGF0IGFuIGVudGlyZSBlbGVtZW50IHNob3VsZCBiZSBkcmFnZ2FibGUgaW5zdGVhZCBvZiBpdHMgY29udGVudHMuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyRHJhZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVycmlkZXMgdGhlIGhpZ2hsaWdodCBjb2xvciBzaG93biB3aGVuIHRoZSB1c2VyIHRhcHMgYSBsaW5rIG9yIGEgSmF2YVNjcmlwdFxuICAgICAgICAgKiBjbGlja2FibGUgZWxlbWVudCBpbiBpT1MuIFRoaXMgcHJvcGVydHkgb2JleXMgdGhlIGFscGhhIHZhbHVlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdyZ2JhKDAsMCwwLDApJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGFwSGlnaGxpZ2h0Q29sb3I6ICdyZ2JhKDAsMCwwLDApJ1xuICAgIH1cbn07XG5cbnZhciBTVE9QID0gMTtcbnZhciBGT1JDRURfU1RPUCA9IDI7XG5cbi8qKlxuICogTWFuYWdlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgSGFtbWVyLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCA9IHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCB8fCBlbGVtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgIHRoaXMucmVjb2duaXplcnMgPSBbXTtcbiAgICB0aGlzLm9sZENzc1Byb3BzID0ge307XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaW5wdXQgPSBjcmVhdGVJbnB1dEluc3RhbmNlKHRoaXMpO1xuICAgIHRoaXMudG91Y2hBY3Rpb24gPSBuZXcgVG91Y2hBY3Rpb24odGhpcywgdGhpcy5vcHRpb25zLnRvdWNoQWN0aW9uKTtcblxuICAgIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIHRydWUpO1xuXG4gICAgZWFjaCh0aGlzLm9wdGlvbnMucmVjb2duaXplcnMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIHJlY29nbml6ZXIgPSB0aGlzLmFkZChuZXcgKGl0ZW1bMF0pKGl0ZW1bMV0pKTtcbiAgICAgICAgaXRlbVsyXSAmJiByZWNvZ25pemVyLnJlY29nbml6ZVdpdGgoaXRlbVsyXSk7XG4gICAgICAgIGl0ZW1bM10gJiYgcmVjb2duaXplci5yZXF1aXJlRmFpbHVyZShpdGVtWzNdKTtcbiAgICB9LCB0aGlzKTtcbn1cblxuTWFuYWdlci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBPcHRpb25zIHRoYXQgbmVlZCBhIGxpdHRsZSBtb3JlIHNldHVwXG4gICAgICAgIGlmIChvcHRpb25zLnRvdWNoQWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmlucHV0VGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBleGlzdGluZyBldmVudCBsaXN0ZW5lcnMgYW5kIHJlaW5pdGlhbGl6ZVxuICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnRhcmdldCA9IG9wdGlvbnMuaW5wdXRUYXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogc3RvcCByZWNvZ25pemluZyBmb3IgdGhpcyBzZXNzaW9uLlxuICAgICAqIFRoaXMgc2Vzc2lvbiB3aWxsIGJlIGRpc2NhcmRlZCwgd2hlbiBhIG5ldyBbaW5wdXRdc3RhcnQgZXZlbnQgaXMgZmlyZWQuXG4gICAgICogV2hlbiBmb3JjZWQsIHRoZSByZWNvZ25pemVyIGN5Y2xlIGlzIHN0b3BwZWQgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VdXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oZm9yY2UpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnN0b3BwZWQgPSBmb3JjZSA/IEZPUkNFRF9TVE9QIDogU1RPUDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcnVuIHRoZSByZWNvZ25pemVycyFcbiAgICAgKiBjYWxsZWQgYnkgdGhlIGlucHV0SGFuZGxlciBmdW5jdGlvbiBvbiBldmVyeSBtb3ZlbWVudCBvZiB0aGUgcG9pbnRlcnMgKHRvdWNoZXMpXG4gICAgICogaXQgd2Fsa3MgdGhyb3VnaCBhbGwgdGhlIHJlY29nbml6ZXJzIGFuZCB0cmllcyB0byBkZXRlY3QgdGhlIGdlc3R1cmUgdGhhdCBpcyBiZWluZyBtYWRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5zZXNzaW9uO1xuICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBydW4gdGhlIHRvdWNoLWFjdGlvbiBwb2x5ZmlsbFxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnByZXZlbnREZWZhdWx0cyhpbnB1dERhdGEpO1xuXG4gICAgICAgIHZhciByZWNvZ25pemVyO1xuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuXG4gICAgICAgIC8vIHRoaXMgaG9sZHMgdGhlIHJlY29nbml6ZXIgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAvLyBzbyB0aGUgcmVjb2duaXplcidzIHN0YXRlIG5lZWRzIHRvIGJlIEJFR0FOLCBDSEFOR0VELCBFTkRFRCBvciBSRUNPR05JWkVEXG4gICAgICAgIC8vIGlmIG5vIHJlY29nbml6ZXIgaXMgZGV0ZWN0aW5nIGEgdGhpbmcsIGl0IGlzIHNldCB0byBgbnVsbGBcbiAgICAgICAgdmFyIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXI7XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB0aGUgbGFzdCByZWNvZ25pemVyIGlzIHJlY29nbml6ZWRcbiAgICAgICAgLy8gb3Igd2hlbiB3ZSdyZSBpbiBhIG5ldyBzZXNzaW9uXG4gICAgICAgIGlmICghY3VyUmVjb2duaXplciB8fCAoY3VyUmVjb2duaXplciAmJiBjdXJSZWNvZ25pemVyLnN0YXRlICYgU1RBVEVfUkVDT0dOSVpFRCkpIHtcbiAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHJlY29nbml6ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVjb2duaXplciA9IHJlY29nbml6ZXJzW2ldO1xuXG4gICAgICAgICAgICAvLyBmaW5kIG91dCBpZiB3ZSBhcmUgYWxsb3dlZCB0cnkgdG8gcmVjb2duaXplIHRoZSBpbnB1dCBmb3IgdGhpcyBvbmUuXG4gICAgICAgICAgICAvLyAxLiAgIGFsbG93IGlmIHRoZSBzZXNzaW9uIGlzIE5PVCBmb3JjZWQgc3RvcHBlZCAoc2VlIHRoZSAuc3RvcCgpIG1ldGhvZClcbiAgICAgICAgICAgIC8vIDIuICAgYWxsb3cgaWYgd2Ugc3RpbGwgaGF2ZW4ndCByZWNvZ25pemVkIGEgZ2VzdHVyZSBpbiB0aGlzIHNlc3Npb24sIG9yIHRoZSB0aGlzIHJlY29nbml6ZXIgaXMgdGhlIG9uZVxuICAgICAgICAgICAgLy8gICAgICB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgICAgICAvLyAzLiAgIGFsbG93IGlmIHRoZSByZWNvZ25pemVyIGlzIGFsbG93ZWQgdG8gcnVuIHNpbXVsdGFuZW91cyB3aXRoIHRoZSBjdXJyZW50IHJlY29nbml6ZWQgcmVjb2duaXplci5cbiAgICAgICAgICAgIC8vICAgICAgdGhpcyBjYW4gYmUgc2V0dXAgd2l0aCB0aGUgYHJlY29nbml6ZVdpdGgoKWAgbWV0aG9kIG9uIHRoZSByZWNvZ25pemVyLlxuICAgICAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCAhPT0gRk9SQ0VEX1NUT1AgJiYgKCAvLyAxXG4gICAgICAgICAgICAgICAgICAgICFjdXJSZWNvZ25pemVyIHx8IHJlY29nbml6ZXIgPT0gY3VyUmVjb2duaXplciB8fCAvLyAyXG4gICAgICAgICAgICAgICAgICAgIHJlY29nbml6ZXIuY2FuUmVjb2duaXplV2l0aChjdXJSZWNvZ25pemVyKSkpIHsgLy8gM1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVjb2duaXplKGlucHV0RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIHJlY29nbml6ZXIgaGFzIGJlZW4gcmVjb2duaXppbmcgdGhlIGlucHV0IGFzIGEgdmFsaWQgZ2VzdHVyZSwgd2Ugd2FudCB0byBzdG9yZSB0aGlzIG9uZSBhcyB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgYWN0aXZlIHJlY29nbml6ZXIuIGJ1dCBvbmx5IGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhbiBhY3RpdmUgcmVjb2duaXplclxuICAgICAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyICYmIHJlY29nbml6ZXIuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQpKSB7XG4gICAgICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IHJlY29nbml6ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGEgcmVjb2duaXplciBieSBpdHMgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TnVsbH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKHJlY29nbml6ZXIgaW5zdGFuY2VvZiBSZWNvZ25pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjb2duaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChyZWNvZ25pemVyc1tpXS5vcHRpb25zLmV2ZW50ID09IHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGFkZCBhIHJlY29nbml6ZXIgdG8gdGhlIG1hbmFnZXJcbiAgICAgKiBleGlzdGluZyByZWNvZ25pemVycyB3aXRoIHRoZSBzYW1lIGV2ZW50IG5hbWUgd2lsbCBiZSByZW1vdmVkXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TWFuYWdlcn1cbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdhZGQnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgZXhpc3RpbmdcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gdGhpcy5nZXQocmVjb2duaXplci5vcHRpb25zLmV2ZW50KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShleGlzdGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlY29nbml6ZXJzLnB1c2gocmVjb2duaXplcik7XG4gICAgICAgIHJlY29nbml6ZXIubWFuYWdlciA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSBhIHJlY29nbml6ZXIgYnkgbmFtZSBvciBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICByZW1vdmU6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdyZW1vdmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZWNvZ25pemVyID0gdGhpcy5nZXQocmVjb2duaXplcik7XG5cbiAgICAgICAgLy8gbGV0J3MgbWFrZSBzdXJlIHRoaXMgcmVjb2duaXplciBleGlzdHNcbiAgICAgICAgaWYgKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHJlY29nbml6ZXJzLCByZWNvZ25pemVyKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb246IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyc1tldmVudF0gfHwgW107XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgZXZlbnQsIGxlYXZlIGVtaXQgYmxhbmsgdG8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaGFuZGxlcl1cbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb2ZmOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaGFuZGxlcnNbZXZlbnRdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gJiYgaGFuZGxlcnNbZXZlbnRdLnNwbGljZShpbkFycmF5KGhhbmRsZXJzW2V2ZW50XSwgaGFuZGxlciksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGVtaXQgZXZlbnQgdG8gdGhlIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgLy8gd2UgYWxzbyB3YW50IHRvIHRyaWdnZXIgZG9tIGV2ZW50c1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRvbUV2ZW50cykge1xuICAgICAgICAgICAgdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIGhhbmRsZXJzLCBzbyBza2lwIGl0IGFsbFxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzW2V2ZW50XSAmJiB0aGlzLmhhbmRsZXJzW2V2ZW50XS5zbGljZSgpO1xuICAgICAgICBpZiAoIWhhbmRsZXJzIHx8ICFoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEudHlwZSA9IGV2ZW50O1xuICAgICAgICBkYXRhLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkYXRhLnNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IGhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbaV0oZGF0YSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVzdHJveSB0aGUgbWFuYWdlciBhbmQgdW5iaW5kcyBhbGwgZXZlbnRzXG4gICAgICogaXQgZG9lc24ndCB1bmJpbmQgZG9tIGV2ZW50cywgdGhhdCBpcyB0aGUgdXNlciBvd24gcmVzcG9uc2liaWxpdHlcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ICYmIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIGFkZC9yZW1vdmUgdGhlIGNzcyBwcm9wZXJ0aWVzIGFzIGRlZmluZWQgaW4gbWFuYWdlci5vcHRpb25zLmNzc1Byb3BzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYWRkXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUNzc1Byb3BzKG1hbmFnZXIsIGFkZCkge1xuICAgIHZhciBlbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudC5zdHlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwcm9wO1xuICAgIGVhY2gobWFuYWdlci5vcHRpb25zLmNzc1Byb3BzLCBmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICBwcm9wID0gcHJlZml4ZWQoZWxlbWVudC5zdHlsZSwgbmFtZSk7XG4gICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gPSBlbGVtZW50LnN0eWxlW3Byb3BdO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gfHwgJyc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzID0ge307XG4gICAgfVxufVxuXG4vKipcbiAqIHRyaWdnZXIgZG9tIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSkge1xuICAgIHZhciBnZXN0dXJlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBnZXN0dXJlRXZlbnQuaW5pdEV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlKTtcbiAgICBnZXN0dXJlRXZlbnQuZ2VzdHVyZSA9IGRhdGE7XG4gICAgZGF0YS50YXJnZXQuZGlzcGF0Y2hFdmVudChnZXN0dXJlRXZlbnQpO1xufVxuXG5hc3NpZ24oSGFtbWVyLCB7XG4gICAgSU5QVVRfU1RBUlQ6IElOUFVUX1NUQVJULFxuICAgIElOUFVUX01PVkU6IElOUFVUX01PVkUsXG4gICAgSU5QVVRfRU5EOiBJTlBVVF9FTkQsXG4gICAgSU5QVVRfQ0FOQ0VMOiBJTlBVVF9DQU5DRUwsXG5cbiAgICBTVEFURV9QT1NTSUJMRTogU1RBVEVfUE9TU0lCTEUsXG4gICAgU1RBVEVfQkVHQU46IFNUQVRFX0JFR0FOLFxuICAgIFNUQVRFX0NIQU5HRUQ6IFNUQVRFX0NIQU5HRUQsXG4gICAgU1RBVEVfRU5ERUQ6IFNUQVRFX0VOREVELFxuICAgIFNUQVRFX1JFQ09HTklaRUQ6IFNUQVRFX1JFQ09HTklaRUQsXG4gICAgU1RBVEVfQ0FOQ0VMTEVEOiBTVEFURV9DQU5DRUxMRUQsXG4gICAgU1RBVEVfRkFJTEVEOiBTVEFURV9GQUlMRUQsXG5cbiAgICBESVJFQ1RJT05fTk9ORTogRElSRUNUSU9OX05PTkUsXG4gICAgRElSRUNUSU9OX0xFRlQ6IERJUkVDVElPTl9MRUZULFxuICAgIERJUkVDVElPTl9SSUdIVDogRElSRUNUSU9OX1JJR0hULFxuICAgIERJUkVDVElPTl9VUDogRElSRUNUSU9OX1VQLFxuICAgIERJUkVDVElPTl9ET1dOOiBESVJFQ1RJT05fRE9XTixcbiAgICBESVJFQ1RJT05fSE9SSVpPTlRBTDogRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgRElSRUNUSU9OX1ZFUlRJQ0FMOiBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgRElSRUNUSU9OX0FMTDogRElSRUNUSU9OX0FMTCxcblxuICAgIE1hbmFnZXI6IE1hbmFnZXIsXG4gICAgSW5wdXQ6IElucHV0LFxuICAgIFRvdWNoQWN0aW9uOiBUb3VjaEFjdGlvbixcblxuICAgIFRvdWNoSW5wdXQ6IFRvdWNoSW5wdXQsXG4gICAgTW91c2VJbnB1dDogTW91c2VJbnB1dCxcbiAgICBQb2ludGVyRXZlbnRJbnB1dDogUG9pbnRlckV2ZW50SW5wdXQsXG4gICAgVG91Y2hNb3VzZUlucHV0OiBUb3VjaE1vdXNlSW5wdXQsXG4gICAgU2luZ2xlVG91Y2hJbnB1dDogU2luZ2xlVG91Y2hJbnB1dCxcblxuICAgIFJlY29nbml6ZXI6IFJlY29nbml6ZXIsXG4gICAgQXR0clJlY29nbml6ZXI6IEF0dHJSZWNvZ25pemVyLFxuICAgIFRhcDogVGFwUmVjb2duaXplcixcbiAgICBQYW46IFBhblJlY29nbml6ZXIsXG4gICAgU3dpcGU6IFN3aXBlUmVjb2duaXplcixcbiAgICBQaW5jaDogUGluY2hSZWNvZ25pemVyLFxuICAgIFJvdGF0ZTogUm90YXRlUmVjb2duaXplcixcbiAgICBQcmVzczogUHJlc3NSZWNvZ25pemVyLFxuXG4gICAgb246IGFkZEV2ZW50TGlzdGVuZXJzLFxuICAgIG9mZjogcmVtb3ZlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZWFjaDogZWFjaCxcbiAgICBtZXJnZTogbWVyZ2UsXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgaW5oZXJpdDogaW5oZXJpdCxcbiAgICBiaW5kRm46IGJpbmRGbixcbiAgICBwcmVmaXhlZDogcHJlZml4ZWRcbn0pO1xuXG4vLyB0aGlzIHByZXZlbnRzIGVycm9ycyB3aGVuIEhhbW1lciBpcyBsb2FkZWQgaW4gdGhlIHByZXNlbmNlIG9mIGFuIEFNRFxuLy8gIHN0eWxlIGxvYWRlciBidXQgYnkgc2NyaXB0IHRhZywgbm90IGJ5IHRoZSBsb2FkZXIuXG52YXIgZnJlZUdsb2JhbCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6ICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge30pKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5mcmVlR2xvYmFsLkhhbW1lciA9IEhhbW1lcjtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEhhbW1lcjtcbiAgICB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSGFtbWVyO1xufSBlbHNlIHtcbiAgICB3aW5kb3dbZXhwb3J0TmFtZV0gPSBIYW1tZXI7XG59XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQsICdIYW1tZXInKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2hhbW1lcmpzL2hhbW1lci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaGFtbWVyanMvaGFtbWVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiFcbiAqIFNvcnRhYmxlXG4gKiBAYXV0aG9yXHRSdWJhWGEgICA8dHJhc2hAcnViYXhhLm9yZz5cbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbihmdW5jdGlvbiBzb3J0YWJsZU1vZHVsZShmYWN0b3J5KSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9IFwidW5kZWZpbmVkXCIpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIHtcblx0XHQvKiBqc2hpbnQgc3ViOnRydWUgKi9cblx0XHR3aW5kb3dbXCJTb3J0YWJsZVwiXSA9IGZhY3RvcnkoKTtcblx0fVxufSkoZnVuY3Rpb24gc29ydGFibGVGYWN0b3J5KCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhd2luZG93LmRvY3VtZW50KSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIHNvcnRhYmxlRXJyb3IoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJTb3J0YWJsZS5qcyByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIik7XG5cdFx0fTtcblx0fVxuXG5cdHZhciBkcmFnRWwsXG5cdFx0cGFyZW50RWwsXG5cdFx0Z2hvc3RFbCxcblx0XHRjbG9uZUVsLFxuXHRcdHJvb3RFbCxcblx0XHRuZXh0RWwsXG5cdFx0bGFzdERvd25FbCxcblxuXHRcdHNjcm9sbEVsLFxuXHRcdHNjcm9sbFBhcmVudEVsLFxuXHRcdHNjcm9sbEN1c3RvbUZuLFxuXG5cdFx0bGFzdEVsLFxuXHRcdGxhc3RDU1MsXG5cdFx0bGFzdFBhcmVudENTUyxcblxuXHRcdG9sZEluZGV4LFxuXHRcdG5ld0luZGV4LFxuXG5cdFx0YWN0aXZlR3JvdXAsXG5cdFx0cHV0U29ydGFibGUsXG5cblx0XHRhdXRvU2Nyb2xsID0ge30sXG5cblx0XHR0YXBFdnQsXG5cdFx0dG91Y2hFdnQsXG5cblx0XHRtb3ZlZCxcblxuXHRcdC8qKiBAY29uc3QgKi9cblx0XHRSX1NQQUNFID0gL1xccysvZyxcblx0XHRSX0ZMT0FUID0gL2xlZnR8cmlnaHR8aW5saW5lLyxcblxuXHRcdGV4cGFuZG8gPSAnU29ydGFibGUnICsgKG5ldyBEYXRlKS5nZXRUaW1lKCksXG5cblx0XHR3aW4gPSB3aW5kb3csXG5cdFx0ZG9jdW1lbnQgPSB3aW4uZG9jdW1lbnQsXG5cdFx0cGFyc2VJbnQgPSB3aW4ucGFyc2VJbnQsXG5cdFx0c2V0VGltZW91dCA9IHdpbi5zZXRUaW1lb3V0LFxuXG5cdFx0JCA9IHdpbi5qUXVlcnkgfHwgd2luLlplcHRvLFxuXHRcdFBvbHltZXIgPSB3aW4uUG9seW1lcixcblxuXHRcdGNhcHR1cmVNb2RlID0gZmFsc2UsXG5cdFx0cGFzc2l2ZU1vZGUgPSBmYWxzZSxcblxuXHRcdHN1cHBvcnREcmFnZ2FibGUgPSAoJ2RyYWdnYWJsZScgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpLFxuXHRcdHN1cHBvcnRDc3NQb2ludGVyRXZlbnRzID0gKGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0Ly8gZmFsc2Ugd2hlbiBJRTExXG5cdFx0XHRpZiAoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oPzpUcmlkZW50LipydlsgOl0/MTFcXC58bXNpZSkvaSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd4Jyk7XG5cdFx0XHRlbC5zdHlsZS5jc3NUZXh0ID0gJ3BvaW50ZXItZXZlbnRzOmF1dG8nO1xuXHRcdFx0cmV0dXJuIGVsLnN0eWxlLnBvaW50ZXJFdmVudHMgPT09ICdhdXRvJztcblx0XHR9KSgpLFxuXG5cdFx0X3NpbGVudCA9IGZhbHNlLFxuXG5cdFx0YWJzID0gTWF0aC5hYnMsXG5cdFx0bWluID0gTWF0aC5taW4sXG5cblx0XHRzYXZlZElucHV0Q2hlY2tlZCA9IFtdLFxuXHRcdHRvdWNoRHJhZ092ZXJMaXN0ZW5lcnMgPSBbXSxcblxuXHRcdF9hdXRvU2Nyb2xsID0gX3Rocm90dGxlKGZ1bmN0aW9uICgvKipFdmVudCovZXZ0LCAvKipPYmplY3QqL29wdGlvbnMsIC8qKkhUTUxFbGVtZW50Ki9yb290RWwpIHtcblx0XHRcdC8vIEJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTA1NTIxXG5cdFx0XHRpZiAocm9vdEVsICYmIG9wdGlvbnMuc2Nyb2xsKSB7XG5cdFx0XHRcdHZhciBfdGhpcyA9IHJvb3RFbFtleHBhbmRvXSxcblx0XHRcdFx0XHRlbCxcblx0XHRcdFx0XHRyZWN0LFxuXHRcdFx0XHRcdHNlbnMgPSBvcHRpb25zLnNjcm9sbFNlbnNpdGl2aXR5LFxuXHRcdFx0XHRcdHNwZWVkID0gb3B0aW9ucy5zY3JvbGxTcGVlZCxcblxuXHRcdFx0XHRcdHggPSBldnQuY2xpZW50WCxcblx0XHRcdFx0XHR5ID0gZXZ0LmNsaWVudFksXG5cblx0XHRcdFx0XHR3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdFx0XHRcdHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCxcblxuXHRcdFx0XHRcdHZ4LFxuXHRcdFx0XHRcdHZ5LFxuXG5cdFx0XHRcdFx0c2Nyb2xsT2Zmc2V0WCxcblx0XHRcdFx0XHRzY3JvbGxPZmZzZXRZXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQvLyBEZWxlY3Qgc2Nyb2xsRWxcblx0XHRcdFx0aWYgKHNjcm9sbFBhcmVudEVsICE9PSByb290RWwpIHtcblx0XHRcdFx0XHRzY3JvbGxFbCA9IG9wdGlvbnMuc2Nyb2xsO1xuXHRcdFx0XHRcdHNjcm9sbFBhcmVudEVsID0gcm9vdEVsO1xuXHRcdFx0XHRcdHNjcm9sbEN1c3RvbUZuID0gb3B0aW9ucy5zY3JvbGxGbjtcblxuXHRcdFx0XHRcdGlmIChzY3JvbGxFbCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0c2Nyb2xsRWwgPSByb290RWw7XG5cblx0XHRcdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRcdFx0aWYgKChzY3JvbGxFbC5vZmZzZXRXaWR0aCA8IHNjcm9sbEVsLnNjcm9sbFdpZHRoKSB8fFxuXHRcdFx0XHRcdFx0XHRcdChzY3JvbGxFbC5vZmZzZXRIZWlnaHQgPCBzY3JvbGxFbC5zY3JvbGxIZWlnaHQpXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8qIGpzaGludCBib3NzOnRydWUgKi9cblx0XHRcdFx0XHRcdH0gd2hpbGUgKHNjcm9sbEVsID0gc2Nyb2xsRWwucGFyZW50Tm9kZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNjcm9sbEVsKSB7XG5cdFx0XHRcdFx0ZWwgPSBzY3JvbGxFbDtcblx0XHRcdFx0XHRyZWN0ID0gc2Nyb2xsRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0dnggPSAoYWJzKHJlY3QucmlnaHQgLSB4KSA8PSBzZW5zKSAtIChhYnMocmVjdC5sZWZ0IC0geCkgPD0gc2Vucyk7XG5cdFx0XHRcdFx0dnkgPSAoYWJzKHJlY3QuYm90dG9tIC0geSkgPD0gc2VucykgLSAoYWJzKHJlY3QudG9wIC0geSkgPD0gc2Vucyk7XG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdGlmICghKHZ4IHx8IHZ5KSkge1xuXHRcdFx0XHRcdHZ4ID0gKHdpbldpZHRoIC0geCA8PSBzZW5zKSAtICh4IDw9IHNlbnMpO1xuXHRcdFx0XHRcdHZ5ID0gKHdpbkhlaWdodCAtIHkgPD0gc2VucykgLSAoeSA8PSBzZW5zKTtcblxuXHRcdFx0XHRcdC8qIGpzaGludCBleHByOnRydWUgKi9cblx0XHRcdFx0XHQodnggfHwgdnkpICYmIChlbCA9IHdpbik7XG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdGlmIChhdXRvU2Nyb2xsLnZ4ICE9PSB2eCB8fCBhdXRvU2Nyb2xsLnZ5ICE9PSB2eSB8fCBhdXRvU2Nyb2xsLmVsICE9PSBlbCkge1xuXHRcdFx0XHRcdGF1dG9TY3JvbGwuZWwgPSBlbDtcblx0XHRcdFx0XHRhdXRvU2Nyb2xsLnZ4ID0gdng7XG5cdFx0XHRcdFx0YXV0b1Njcm9sbC52eSA9IHZ5O1xuXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChhdXRvU2Nyb2xsLnBpZCk7XG5cblx0XHRcdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0XHRcdGF1dG9TY3JvbGwucGlkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRzY3JvbGxPZmZzZXRZID0gdnkgPyB2eSAqIHNwZWVkIDogMDtcblx0XHRcdFx0XHRcdFx0c2Nyb2xsT2Zmc2V0WCA9IHZ4ID8gdnggKiBzcGVlZCA6IDA7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZihzY3JvbGxDdXN0b21GbikpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2Nyb2xsQ3VzdG9tRm4uY2FsbChfdGhpcywgc2Nyb2xsT2Zmc2V0WCwgc2Nyb2xsT2Zmc2V0WSwgZXZ0KTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChlbCA9PT0gd2luKSB7XG5cdFx0XHRcdFx0XHRcdFx0d2luLnNjcm9sbFRvKHdpbi5wYWdlWE9mZnNldCArIHNjcm9sbE9mZnNldFgsIHdpbi5wYWdlWU9mZnNldCArIHNjcm9sbE9mZnNldFkpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGVsLnNjcm9sbFRvcCArPSBzY3JvbGxPZmZzZXRZO1xuXHRcdFx0XHRcdFx0XHRcdGVsLnNjcm9sbExlZnQgKz0gc2Nyb2xsT2Zmc2V0WDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSwgMjQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIDMwKSxcblxuXHRcdF9wcmVwYXJlR3JvdXAgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0ZnVuY3Rpb24gdG9Gbih2YWx1ZSwgcHVsbCkge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IHZvaWQgMCB8fCB2YWx1ZSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZ3JvdXAubmFtZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh0bywgZnJvbSkge1xuXHRcdFx0XHRcdFx0dmFyIGZyb21Hcm91cCA9IGZyb20ub3B0aW9ucy5ncm91cC5uYW1lO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVsbFxuXHRcdFx0XHRcdFx0XHQ/IHZhbHVlXG5cdFx0XHRcdFx0XHRcdDogdmFsdWUgJiYgKHZhbHVlLmpvaW5cblx0XHRcdFx0XHRcdFx0XHQ/IHZhbHVlLmluZGV4T2YoZnJvbUdyb3VwKSA+IC0xXG5cdFx0XHRcdFx0XHRcdFx0OiAoZnJvbUdyb3VwID09IHZhbHVlKVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIGdyb3VwID0ge307XG5cdFx0XHR2YXIgb3JpZ2luYWxHcm91cCA9IG9wdGlvbnMuZ3JvdXA7XG5cblx0XHRcdGlmICghb3JpZ2luYWxHcm91cCB8fCB0eXBlb2Ygb3JpZ2luYWxHcm91cCAhPSAnb2JqZWN0Jykge1xuXHRcdFx0XHRvcmlnaW5hbEdyb3VwID0ge25hbWU6IG9yaWdpbmFsR3JvdXB9O1xuXHRcdFx0fVxuXG5cdFx0XHRncm91cC5uYW1lID0gb3JpZ2luYWxHcm91cC5uYW1lO1xuXHRcdFx0Z3JvdXAuY2hlY2tQdWxsID0gdG9GbihvcmlnaW5hbEdyb3VwLnB1bGwsIHRydWUpO1xuXHRcdFx0Z3JvdXAuY2hlY2tQdXQgPSB0b0ZuKG9yaWdpbmFsR3JvdXAucHV0KTtcblx0XHRcdGdyb3VwLnJldmVydENsb25lID0gb3JpZ2luYWxHcm91cC5yZXZlcnRDbG9uZTtcblxuXHRcdFx0b3B0aW9ucy5ncm91cCA9IGdyb3VwO1xuXHRcdH1cblx0O1xuXG5cdC8vIERldGVjdCBzdXBwb3J0IGEgcGFzc2l2ZSBtb2RlXG5cdHRyeSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIGBmYWxzZWAsIGJlY2F1c2UgZXZlcnl0aGluZyBzdGFydHMgdG8gd29yayBpbmNvcnJlY3RseSBhbmQgaW5zdGVhZCBvZiBkJ24nZCxcblx0XHRcdFx0Ly8gYmVnaW5zIHRoZSBwYWdlIGhhcyBzY3JvbGxlZC5cblx0XHRcdFx0cGFzc2l2ZU1vZGUgPSBmYWxzZTtcblx0XHRcdFx0Y2FwdHVyZU1vZGUgPSB7XG5cdFx0XHRcdFx0Y2FwdHVyZTogZmFsc2UsXG5cdFx0XHRcdFx0cGFzc2l2ZTogcGFzc2l2ZU1vZGVcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KSk7XG5cdH0gY2F0Y2ggKGVycikge31cblxuXHQvKipcblx0ICogQGNsYXNzICBTb3J0YWJsZVxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gIGVsXG5cdCAqIEBwYXJhbSAge09iamVjdH0gICAgICAgW29wdGlvbnNdXG5cdCAqL1xuXHRmdW5jdGlvbiBTb3J0YWJsZShlbCwgb3B0aW9ucykge1xuXHRcdGlmICghKGVsICYmIGVsLm5vZGVUeXBlICYmIGVsLm5vZGVUeXBlID09PSAxKSkge1xuXHRcdFx0dGhyb3cgJ1NvcnRhYmxlOiBgZWxgIG11c3QgYmUgSFRNTEVsZW1lbnQsIGFuZCBub3QgJyArIHt9LnRvU3RyaW5nLmNhbGwoZWwpO1xuXHRcdH1cblxuXHRcdHRoaXMuZWwgPSBlbDsgLy8gcm9vdCBlbGVtZW50XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucyA9IF9leHRlbmQoe30sIG9wdGlvbnMpO1xuXG5cblx0XHQvLyBFeHBvcnQgaW5zdGFuY2Vcblx0XHRlbFtleHBhbmRvXSA9IHRoaXM7XG5cblx0XHQvLyBEZWZhdWx0IG9wdGlvbnNcblx0XHR2YXIgZGVmYXVsdHMgPSB7XG5cdFx0XHRncm91cDogTWF0aC5yYW5kb20oKSxcblx0XHRcdHNvcnQ6IHRydWUsXG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRzdG9yZTogbnVsbCxcblx0XHRcdGhhbmRsZTogbnVsbCxcblx0XHRcdHNjcm9sbDogdHJ1ZSxcblx0XHRcdHNjcm9sbFNlbnNpdGl2aXR5OiAzMCxcblx0XHRcdHNjcm9sbFNwZWVkOiAxMCxcblx0XHRcdGRyYWdnYWJsZTogL1t1b11sL2kudGVzdChlbC5ub2RlTmFtZSkgPyAnbGknIDogJz4qJyxcblx0XHRcdGdob3N0Q2xhc3M6ICdzb3J0YWJsZS1naG9zdCcsXG5cdFx0XHRjaG9zZW5DbGFzczogJ3NvcnRhYmxlLWNob3NlbicsXG5cdFx0XHRkcmFnQ2xhc3M6ICdzb3J0YWJsZS1kcmFnJyxcblx0XHRcdGlnbm9yZTogJ2EsIGltZycsXG5cdFx0XHRmaWx0ZXI6IG51bGwsXG5cdFx0XHRwcmV2ZW50T25GaWx0ZXI6IHRydWUsXG5cdFx0XHRhbmltYXRpb246IDAsXG5cdFx0XHRzZXREYXRhOiBmdW5jdGlvbiAoZGF0YVRyYW5zZmVyLCBkcmFnRWwpIHtcblx0XHRcdFx0ZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCBkcmFnRWwudGV4dENvbnRlbnQpO1xuXHRcdFx0fSxcblx0XHRcdGRyb3BCdWJibGU6IGZhbHNlLFxuXHRcdFx0ZHJhZ292ZXJCdWJibGU6IGZhbHNlLFxuXHRcdFx0ZGF0YUlkQXR0cjogJ2RhdGEtaWQnLFxuXHRcdFx0ZGVsYXk6IDAsXG5cdFx0XHRmb3JjZUZhbGxiYWNrOiBmYWxzZSxcblx0XHRcdGZhbGxiYWNrQ2xhc3M6ICdzb3J0YWJsZS1mYWxsYmFjaycsXG5cdFx0XHRmYWxsYmFja09uQm9keTogZmFsc2UsXG5cdFx0XHRmYWxsYmFja1RvbGVyYW5jZTogMCxcblx0XHRcdGZhbGxiYWNrT2Zmc2V0OiB7eDogMCwgeTogMH0sXG5cdFx0XHRzdXBwb3J0UG9pbnRlcjogU29ydGFibGUuc3VwcG9ydFBvaW50ZXIgIT09IGZhbHNlXG5cdFx0fTtcblxuXG5cdFx0Ly8gU2V0IGRlZmF1bHQgb3B0aW9uc1xuXHRcdGZvciAodmFyIG5hbWUgaW4gZGVmYXVsdHMpIHtcblx0XHRcdCEobmFtZSBpbiBvcHRpb25zKSAmJiAob3B0aW9uc1tuYW1lXSA9IGRlZmF1bHRzW25hbWVdKTtcblx0XHR9XG5cblx0XHRfcHJlcGFyZUdyb3VwKG9wdGlvbnMpO1xuXG5cdFx0Ly8gQmluZCBhbGwgcHJpdmF0ZSBtZXRob2RzXG5cdFx0Zm9yICh2YXIgZm4gaW4gdGhpcykge1xuXHRcdFx0aWYgKGZuLmNoYXJBdCgwKSA9PT0gJ18nICYmIHR5cGVvZiB0aGlzW2ZuXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR0aGlzW2ZuXSA9IHRoaXNbZm5dLmJpbmQodGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0dXAgZHJhZyBtb2RlXG5cdFx0dGhpcy5uYXRpdmVEcmFnZ2FibGUgPSBvcHRpb25zLmZvcmNlRmFsbGJhY2sgPyBmYWxzZSA6IHN1cHBvcnREcmFnZ2FibGU7XG5cblx0XHQvLyBCaW5kIGV2ZW50c1xuXHRcdF9vbihlbCwgJ21vdXNlZG93bicsIHRoaXMuX29uVGFwU3RhcnQpO1xuXHRcdF9vbihlbCwgJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRhcFN0YXJ0KTtcblx0XHRvcHRpb25zLnN1cHBvcnRQb2ludGVyICYmIF9vbihlbCwgJ3BvaW50ZXJkb3duJywgdGhpcy5fb25UYXBTdGFydCk7XG5cblx0XHRpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcblx0XHRcdF9vbihlbCwgJ2RyYWdvdmVyJywgdGhpcyk7XG5cdFx0XHRfb24oZWwsICdkcmFnZW50ZXInLCB0aGlzKTtcblx0XHR9XG5cblx0XHR0b3VjaERyYWdPdmVyTGlzdGVuZXJzLnB1c2godGhpcy5fb25EcmFnT3Zlcik7XG5cblx0XHQvLyBSZXN0b3JlIHNvcnRpbmdcblx0XHRvcHRpb25zLnN0b3JlICYmIHRoaXMuc29ydChvcHRpb25zLnN0b3JlLmdldCh0aGlzKSk7XG5cdH1cblxuXG5cdFNvcnRhYmxlLnByb3RvdHlwZSA9IC8qKiBAbGVuZHMgU29ydGFibGUucHJvdG90eXBlICovIHtcblx0XHRjb25zdHJ1Y3RvcjogU29ydGFibGUsXG5cblx0XHRfb25UYXBTdGFydDogZnVuY3Rpb24gKC8qKiBFdmVudHxUb3VjaEV2ZW50ICovZXZ0KSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzLFxuXHRcdFx0XHRlbCA9IHRoaXMuZWwsXG5cdFx0XHRcdG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG5cdFx0XHRcdHByZXZlbnRPbkZpbHRlciA9IG9wdGlvbnMucHJldmVudE9uRmlsdGVyLFxuXHRcdFx0XHR0eXBlID0gZXZ0LnR5cGUsXG5cdFx0XHRcdHRvdWNoID0gZXZ0LnRvdWNoZXMgJiYgZXZ0LnRvdWNoZXNbMF0sXG5cdFx0XHRcdHRhcmdldCA9ICh0b3VjaCB8fCBldnQpLnRhcmdldCxcblx0XHRcdFx0b3JpZ2luYWxUYXJnZXQgPSBldnQudGFyZ2V0LnNoYWRvd1Jvb3QgJiYgKGV2dC5wYXRoICYmIGV2dC5wYXRoWzBdKSB8fCB0YXJnZXQsXG5cdFx0XHRcdGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyLFxuXHRcdFx0XHRzdGFydEluZGV4O1xuXG5cdFx0XHRfc2F2ZUlucHV0Q2hlY2tlZFN0YXRlKGVsKTtcblxuXG5cdFx0XHQvLyBEb24ndCB0cmlnZ2VyIHN0YXJ0IGV2ZW50IHdoZW4gYW4gZWxlbWVudCBpcyBiZWVuIGRyYWdnZWQsIG90aGVyd2lzZSB0aGUgZXZ0Lm9sZGluZGV4IGFsd2F5cyB3cm9uZyB3aGVuIHNldCBvcHRpb24uZ3JvdXAuXG5cdFx0XHRpZiAoZHJhZ0VsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKC9tb3VzZWRvd258cG9pbnRlcmRvd24vLnRlc3QodHlwZSkgJiYgZXZ0LmJ1dHRvbiAhPT0gMCB8fCBvcHRpb25zLmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybjsgLy8gb25seSBsZWZ0IGJ1dHRvbiBvciBlbmFibGVkXG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbmNlbCBkbmQgaWYgb3JpZ2luYWwgdGFyZ2V0IGlzIGNvbnRlbnQgZWRpdGFibGVcblx0XHRcdGlmIChvcmlnaW5hbFRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRhcmdldCA9IF9jbG9zZXN0KHRhcmdldCwgb3B0aW9ucy5kcmFnZ2FibGUsIGVsKTtcblxuXHRcdFx0aWYgKCF0YXJnZXQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobGFzdERvd25FbCA9PT0gdGFyZ2V0KSB7XG5cdFx0XHRcdC8vIElnbm9yaW5nIGR1cGxpY2F0ZSBgZG93bmBcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBkcmFnZ2VkIGVsZW1lbnQgd2l0aGluIGl0cyBwYXJlbnRcblx0XHRcdHN0YXJ0SW5kZXggPSBfaW5kZXgodGFyZ2V0LCBvcHRpb25zLmRyYWdnYWJsZSk7XG5cblx0XHRcdC8vIENoZWNrIGZpbHRlclxuXHRcdFx0aWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0aWYgKGZpbHRlci5jYWxsKHRoaXMsIGV2dCwgdGFyZ2V0LCB0aGlzKSkge1xuXHRcdFx0XHRcdF9kaXNwYXRjaEV2ZW50KF90aGlzLCBvcmlnaW5hbFRhcmdldCwgJ2ZpbHRlcicsIHRhcmdldCwgZWwsIGVsLCBzdGFydEluZGV4KTtcblx0XHRcdFx0XHRwcmV2ZW50T25GaWx0ZXIgJiYgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuOyAvLyBjYW5jZWwgZG5kXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGZpbHRlcikge1xuXHRcdFx0XHRmaWx0ZXIgPSBmaWx0ZXIuc3BsaXQoJywnKS5zb21lKGZ1bmN0aW9uIChjcml0ZXJpYSkge1xuXHRcdFx0XHRcdGNyaXRlcmlhID0gX2Nsb3Nlc3Qob3JpZ2luYWxUYXJnZXQsIGNyaXRlcmlhLnRyaW0oKSwgZWwpO1xuXG5cdFx0XHRcdFx0aWYgKGNyaXRlcmlhKSB7XG5cdFx0XHRcdFx0XHRfZGlzcGF0Y2hFdmVudChfdGhpcywgY3JpdGVyaWEsICdmaWx0ZXInLCB0YXJnZXQsIGVsLCBlbCwgc3RhcnRJbmRleCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChmaWx0ZXIpIHtcblx0XHRcdFx0XHRwcmV2ZW50T25GaWx0ZXIgJiYgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuOyAvLyBjYW5jZWwgZG5kXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuaGFuZGxlICYmICFfY2xvc2VzdChvcmlnaW5hbFRhcmdldCwgb3B0aW9ucy5oYW5kbGUsIGVsKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFByZXBhcmUgYGRyYWdzdGFydGBcblx0XHRcdHRoaXMuX3ByZXBhcmVEcmFnU3RhcnQoZXZ0LCB0b3VjaCwgdGFyZ2V0LCBzdGFydEluZGV4KTtcblx0XHR9LFxuXG5cdFx0X3ByZXBhcmVEcmFnU3RhcnQ6IGZ1bmN0aW9uICgvKiogRXZlbnQgKi9ldnQsIC8qKiBUb3VjaCAqL3RvdWNoLCAvKiogSFRNTEVsZW1lbnQgKi90YXJnZXQsIC8qKiBOdW1iZXIgKi9zdGFydEluZGV4KSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzLFxuXHRcdFx0XHRlbCA9IF90aGlzLmVsLFxuXHRcdFx0XHRvcHRpb25zID0gX3RoaXMub3B0aW9ucyxcblx0XHRcdFx0b3duZXJEb2N1bWVudCA9IGVsLm93bmVyRG9jdW1lbnQsXG5cdFx0XHRcdGRyYWdTdGFydEZuO1xuXG5cdFx0XHRpZiAodGFyZ2V0ICYmICFkcmFnRWwgJiYgKHRhcmdldC5wYXJlbnROb2RlID09PSBlbCkpIHtcblx0XHRcdFx0dGFwRXZ0ID0gZXZ0O1xuXG5cdFx0XHRcdHJvb3RFbCA9IGVsO1xuXHRcdFx0XHRkcmFnRWwgPSB0YXJnZXQ7XG5cdFx0XHRcdHBhcmVudEVsID0gZHJhZ0VsLnBhcmVudE5vZGU7XG5cdFx0XHRcdG5leHRFbCA9IGRyYWdFbC5uZXh0U2libGluZztcblx0XHRcdFx0bGFzdERvd25FbCA9IHRhcmdldDtcblx0XHRcdFx0YWN0aXZlR3JvdXAgPSBvcHRpb25zLmdyb3VwO1xuXHRcdFx0XHRvbGRJbmRleCA9IHN0YXJ0SW5kZXg7XG5cblx0XHRcdFx0dGhpcy5fbGFzdFggPSAodG91Y2ggfHwgZXZ0KS5jbGllbnRYO1xuXHRcdFx0XHR0aGlzLl9sYXN0WSA9ICh0b3VjaCB8fCBldnQpLmNsaWVudFk7XG5cblx0XHRcdFx0ZHJhZ0VsLnN0eWxlWyd3aWxsLWNoYW5nZSddID0gJ2FsbCc7XG5cblx0XHRcdFx0ZHJhZ1N0YXJ0Rm4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gRGVsYXllZCBkcmFnIGhhcyBiZWVuIHRyaWdnZXJlZFxuXHRcdFx0XHRcdC8vIHdlIGNhbiByZS1lbmFibGUgdGhlIGV2ZW50czogdG91Y2htb3ZlL21vdXNlbW92ZVxuXHRcdFx0XHRcdF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcoKTtcblxuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGVsZW1lbnQgZHJhZ2dhYmxlXG5cdFx0XHRcdFx0ZHJhZ0VsLmRyYWdnYWJsZSA9IF90aGlzLm5hdGl2ZURyYWdnYWJsZTtcblxuXHRcdFx0XHRcdC8vIENob3NlbiBpdGVtXG5cdFx0XHRcdFx0X3RvZ2dsZUNsYXNzKGRyYWdFbCwgb3B0aW9ucy5jaG9zZW5DbGFzcywgdHJ1ZSk7XG5cblx0XHRcdFx0XHQvLyBCaW5kIHRoZSBldmVudHM6IGRyYWdzdGFydC9kcmFnZW5kXG5cdFx0XHRcdFx0X3RoaXMuX3RyaWdnZXJEcmFnU3RhcnQoZXZ0LCB0b3VjaCk7XG5cblx0XHRcdFx0XHQvLyBEcmFnIHN0YXJ0IGV2ZW50XG5cdFx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQoX3RoaXMsIHJvb3RFbCwgJ2Nob29zZScsIGRyYWdFbCwgcm9vdEVsLCByb290RWwsIG9sZEluZGV4KTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIFwiZHJhZ2dhYmxlXCJcblx0XHRcdFx0b3B0aW9ucy5pZ25vcmUuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChjcml0ZXJpYSkge1xuXHRcdFx0XHRcdF9maW5kKGRyYWdFbCwgY3JpdGVyaWEudHJpbSgpLCBfZGlzYWJsZURyYWdnYWJsZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAnbW91c2V1cCcsIF90aGlzLl9vbkRyb3ApO1xuXHRcdFx0XHRfb24ob3duZXJEb2N1bWVudCwgJ3RvdWNoZW5kJywgX3RoaXMuX29uRHJvcCk7XG5cdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCBfdGhpcy5fb25Ecm9wKTtcblx0XHRcdFx0X29uKG93bmVyRG9jdW1lbnQsICdzZWxlY3RzdGFydCcsIF90aGlzKTtcblx0XHRcdFx0b3B0aW9ucy5zdXBwb3J0UG9pbnRlciAmJiBfb24ob3duZXJEb2N1bWVudCwgJ3BvaW50ZXJjYW5jZWwnLCBfdGhpcy5fb25Ecm9wKTtcblxuXHRcdFx0XHRpZiAob3B0aW9ucy5kZWxheSkge1xuXHRcdFx0XHRcdC8vIElmIHRoZSB1c2VyIG1vdmVzIHRoZSBwb2ludGVyIG9yIGxldCBnbyB0aGUgY2xpY2sgb3IgdG91Y2hcblx0XHRcdFx0XHQvLyBiZWZvcmUgdGhlIGRlbGF5IGhhcyBiZWVuIHJlYWNoZWQ6XG5cdFx0XHRcdFx0Ly8gZGlzYWJsZSB0aGUgZGVsYXllZCBkcmFnXG5cdFx0XHRcdFx0X29uKG93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0XHRcdFx0X29uKG93bmVyRG9jdW1lbnQsICd0b3VjaGVuZCcsIF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCBfdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcblx0XHRcdFx0XHRfb24ob3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAndG91Y2htb3ZlJywgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0XHRcdFx0b3B0aW9ucy5zdXBwb3J0UG9pbnRlciAmJiBfb24ob3duZXJEb2N1bWVudCwgJ3BvaW50ZXJtb3ZlJywgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cblx0XHRcdFx0XHRfdGhpcy5fZHJhZ1N0YXJ0VGltZXIgPSBzZXRUaW1lb3V0KGRyYWdTdGFydEZuLCBvcHRpb25zLmRlbGF5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkcmFnU3RhcnRGbigpO1xuXHRcdFx0XHR9XG5cblxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfZGlzYWJsZURlbGF5ZWREcmFnOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgb3duZXJEb2N1bWVudCA9IHRoaXMuZWwub3duZXJEb2N1bWVudDtcblxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2RyYWdTdGFydFRpbWVyKTtcblx0XHRcdF9vZmYob3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcblx0XHRcdF9vZmYob3duZXJEb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0XHRfb2ZmKG93bmVyRG9jdW1lbnQsICdwb2ludGVybW92ZScsIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0fSxcblxuXHRcdF90cmlnZ2VyRHJhZ1N0YXJ0OiBmdW5jdGlvbiAoLyoqIEV2ZW50ICovZXZ0LCAvKiogVG91Y2ggKi90b3VjaCkge1xuXHRcdFx0dG91Y2ggPSB0b3VjaCB8fCAoZXZ0LnBvaW50ZXJUeXBlID09ICd0b3VjaCcgPyBldnQgOiBudWxsKTtcblxuXHRcdFx0aWYgKHRvdWNoKSB7XG5cdFx0XHRcdC8vIFRvdWNoIGRldmljZSBzdXBwb3J0XG5cdFx0XHRcdHRhcEV2dCA9IHtcblx0XHRcdFx0XHR0YXJnZXQ6IGRyYWdFbCxcblx0XHRcdFx0XHRjbGllbnRYOiB0b3VjaC5jbGllbnRYLFxuXHRcdFx0XHRcdGNsaWVudFk6IHRvdWNoLmNsaWVudFlcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR0aGlzLl9vbkRyYWdTdGFydCh0YXBFdnQsICd0b3VjaCcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIXRoaXMubmF0aXZlRHJhZ2dhYmxlKSB7XG5cdFx0XHRcdHRoaXMuX29uRHJhZ1N0YXJ0KHRhcEV2dCwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0X29uKGRyYWdFbCwgJ2RyYWdlbmQnLCB0aGlzKTtcblx0XHRcdFx0X29uKHJvb3RFbCwgJ2RyYWdzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KTtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuXHRcdFx0XHRcdC8vIFRpbWVvdXQgbmVjY2Vzc2FyeSBmb3IgSUU5XG5cdFx0XHRcdFx0X25leHRUaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9kcmFnU3RhcnRlZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHJvb3RFbCAmJiBkcmFnRWwpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRcdFx0Ly8gQXBwbHkgZWZmZWN0XG5cdFx0XHRcdF90b2dnbGVDbGFzcyhkcmFnRWwsIG9wdGlvbnMuZ2hvc3RDbGFzcywgdHJ1ZSk7XG5cdFx0XHRcdF90b2dnbGVDbGFzcyhkcmFnRWwsIG9wdGlvbnMuZHJhZ0NsYXNzLCBmYWxzZSk7XG5cblx0XHRcdFx0U29ydGFibGUuYWN0aXZlID0gdGhpcztcblxuXHRcdFx0XHQvLyBEcmFnIHN0YXJ0IGV2ZW50XG5cdFx0XHRcdF9kaXNwYXRjaEV2ZW50KHRoaXMsIHJvb3RFbCwgJ3N0YXJ0JywgZHJhZ0VsLCByb290RWwsIHJvb3RFbCwgb2xkSW5kZXgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbnVsbGluZygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfZW11bGF0ZURyYWdPdmVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodG91Y2hFdnQpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2xhc3RYID09PSB0b3VjaEV2dC5jbGllbnRYICYmIHRoaXMuX2xhc3RZID09PSB0b3VjaEV2dC5jbGllbnRZKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fbGFzdFggPSB0b3VjaEV2dC5jbGllbnRYO1xuXHRcdFx0XHR0aGlzLl9sYXN0WSA9IHRvdWNoRXZ0LmNsaWVudFk7XG5cblx0XHRcdFx0aWYgKCFzdXBwb3J0Q3NzUG9pbnRlckV2ZW50cykge1xuXHRcdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2hFdnQuY2xpZW50WCwgdG91Y2hFdnQuY2xpZW50WSk7XG5cdFx0XHRcdHZhciBwYXJlbnQgPSB0YXJnZXQ7XG5cdFx0XHRcdHZhciBpID0gdG91Y2hEcmFnT3Zlckxpc3RlbmVycy5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKHRhcmdldCAmJiB0YXJnZXQuc2hhZG93Um9vdCkge1xuXHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldC5zaGFkb3dSb290LmVsZW1lbnRGcm9tUG9pbnQodG91Y2hFdnQuY2xpZW50WCwgdG91Y2hFdnQuY2xpZW50WSk7XG5cdFx0XHRcdFx0cGFyZW50ID0gdGFyZ2V0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHBhcmVudCkge1xuXHRcdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRcdGlmIChwYXJlbnRbZXhwYW5kb10pIHtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRcdFx0XHRcdHRvdWNoRHJhZ092ZXJMaXN0ZW5lcnNbaV0oe1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xpZW50WDogdG91Y2hFdnQuY2xpZW50WCxcblx0XHRcdFx0XHRcdFx0XHRcdGNsaWVudFk6IHRvdWNoRXZ0LmNsaWVudFksXG5cdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQ6IHRhcmdldCxcblx0XHRcdFx0XHRcdFx0XHRcdHJvb3RFbDogcGFyZW50XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dGFyZ2V0ID0gcGFyZW50OyAvLyBzdG9yZSBsYXN0IGVsZW1lbnRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0LyoganNoaW50IGJvc3M6dHJ1ZSAqL1xuXHRcdFx0XHRcdHdoaWxlIChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXN1cHBvcnRDc3NQb2ludGVyRXZlbnRzKSB7XG5cdFx0XHRcdFx0X2NzcyhnaG9zdEVsLCAnZGlzcGxheScsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblxuXHRcdF9vblRvdWNoTW92ZTogZnVuY3Rpb24gKC8qKlRvdWNoRXZlbnQqL2V2dCkge1xuXHRcdFx0aWYgKHRhcEV2dCkge1xuXHRcdFx0XHR2YXJcdG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG5cdFx0XHRcdFx0ZmFsbGJhY2tUb2xlcmFuY2UgPSBvcHRpb25zLmZhbGxiYWNrVG9sZXJhbmNlLFxuXHRcdFx0XHRcdGZhbGxiYWNrT2Zmc2V0ID0gb3B0aW9ucy5mYWxsYmFja09mZnNldCxcblx0XHRcdFx0XHR0b3VjaCA9IGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQsXG5cdFx0XHRcdFx0ZHggPSAodG91Y2guY2xpZW50WCAtIHRhcEV2dC5jbGllbnRYKSArIGZhbGxiYWNrT2Zmc2V0LngsXG5cdFx0XHRcdFx0ZHkgPSAodG91Y2guY2xpZW50WSAtIHRhcEV2dC5jbGllbnRZKSArIGZhbGxiYWNrT2Zmc2V0LnksXG5cdFx0XHRcdFx0dHJhbnNsYXRlM2QgPSBldnQudG91Y2hlcyA/ICd0cmFuc2xhdGUzZCgnICsgZHggKyAncHgsJyArIGR5ICsgJ3B4LDApJyA6ICd0cmFuc2xhdGUoJyArIGR4ICsgJ3B4LCcgKyBkeSArICdweCknO1xuXG5cdFx0XHRcdC8vIG9ubHkgc2V0IHRoZSBzdGF0dXMgdG8gZHJhZ2dpbmcsIHdoZW4gd2UgYXJlIGFjdHVhbGx5IGRyYWdnaW5nXG5cdFx0XHRcdGlmICghU29ydGFibGUuYWN0aXZlKSB7XG5cdFx0XHRcdFx0aWYgKGZhbGxiYWNrVG9sZXJhbmNlICYmXG5cdFx0XHRcdFx0XHRtaW4oYWJzKHRvdWNoLmNsaWVudFggLSB0aGlzLl9sYXN0WCksIGFicyh0b3VjaC5jbGllbnRZIC0gdGhpcy5fbGFzdFkpKSA8IGZhbGxiYWNrVG9sZXJhbmNlXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fZHJhZ1N0YXJ0ZWQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGFzIHdlbGwgYXMgY3JlYXRpbmcgdGhlIGdob3N0IGVsZW1lbnQgb24gdGhlIGRvY3VtZW50IGJvZHlcblx0XHRcdFx0dGhpcy5fYXBwZW5kR2hvc3QoKTtcblxuXHRcdFx0XHRtb3ZlZCA9IHRydWU7XG5cdFx0XHRcdHRvdWNoRXZ0ID0gdG91Y2g7XG5cblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAnd2Via2l0VHJhbnNmb3JtJywgdHJhbnNsYXRlM2QpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICdtb3pUcmFuc2Zvcm0nLCB0cmFuc2xhdGUzZCk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ21zVHJhbnNmb3JtJywgdHJhbnNsYXRlM2QpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICd0cmFuc2Zvcm0nLCB0cmFuc2xhdGUzZCk7XG5cblx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9hcHBlbmRHaG9zdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFnaG9zdEVsKSB7XG5cdFx0XHRcdHZhciByZWN0ID0gZHJhZ0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0XHRcdGNzcyA9IF9jc3MoZHJhZ0VsKSxcblx0XHRcdFx0XHRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuXHRcdFx0XHRcdGdob3N0UmVjdDtcblxuXHRcdFx0XHRnaG9zdEVsID0gZHJhZ0VsLmNsb25lTm9kZSh0cnVlKTtcblxuXHRcdFx0XHRfdG9nZ2xlQ2xhc3MoZ2hvc3RFbCwgb3B0aW9ucy5naG9zdENsYXNzLCBmYWxzZSk7XG5cdFx0XHRcdF90b2dnbGVDbGFzcyhnaG9zdEVsLCBvcHRpb25zLmZhbGxiYWNrQ2xhc3MsIHRydWUpO1xuXHRcdFx0XHRfdG9nZ2xlQ2xhc3MoZ2hvc3RFbCwgb3B0aW9ucy5kcmFnQ2xhc3MsIHRydWUpO1xuXG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ3RvcCcsIHJlY3QudG9wIC0gcGFyc2VJbnQoY3NzLm1hcmdpblRvcCwgMTApKTtcblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAnbGVmdCcsIHJlY3QubGVmdCAtIHBhcnNlSW50KGNzcy5tYXJnaW5MZWZ0LCAxMCkpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICd3aWR0aCcsIHJlY3Qud2lkdGgpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICdoZWlnaHQnLCByZWN0LmhlaWdodCk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ29wYWNpdHknLCAnMC44Jyk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ3pJbmRleCcsICcxMDAwMDAnKTtcblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAncG9pbnRlckV2ZW50cycsICdub25lJyk7XG5cblx0XHRcdFx0b3B0aW9ucy5mYWxsYmFja09uQm9keSAmJiBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdob3N0RWwpIHx8IHJvb3RFbC5hcHBlbmRDaGlsZChnaG9zdEVsKTtcblxuXHRcdFx0XHQvLyBGaXhpbmcgZGltZW5zaW9ucy5cblx0XHRcdFx0Z2hvc3RSZWN0ID0gZ2hvc3RFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAnd2lkdGgnLCByZWN0LndpZHRoICogMiAtIGdob3N0UmVjdC53aWR0aCk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ2hlaWdodCcsIHJlY3QuaGVpZ2h0ICogMiAtIGdob3N0UmVjdC5oZWlnaHQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uICgvKipFdmVudCovZXZ0LCAvKipib29sZWFuKi91c2VGYWxsYmFjaykge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHRcdHZhciBkYXRhVHJhbnNmZXIgPSBldnQuZGF0YVRyYW5zZmVyO1xuXHRcdFx0dmFyIG9wdGlvbnMgPSBfdGhpcy5vcHRpb25zO1xuXG5cdFx0XHRfdGhpcy5fb2ZmVXBFdmVudHMoKTtcblxuXHRcdFx0aWYgKGFjdGl2ZUdyb3VwLmNoZWNrUHVsbChfdGhpcywgX3RoaXMsIGRyYWdFbCwgZXZ0KSkge1xuXHRcdFx0XHRjbG9uZUVsID0gX2Nsb25lKGRyYWdFbCk7XG5cblx0XHRcdFx0Y2xvbmVFbC5kcmFnZ2FibGUgPSBmYWxzZTtcblx0XHRcdFx0Y2xvbmVFbC5zdHlsZVsnd2lsbC1jaGFuZ2UnXSA9ICcnO1xuXG5cdFx0XHRcdF9jc3MoY2xvbmVFbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdFx0XHRfdG9nZ2xlQ2xhc3MoY2xvbmVFbCwgX3RoaXMub3B0aW9ucy5jaG9zZW5DbGFzcywgZmFsc2UpO1xuXG5cdFx0XHRcdC8vICMxMTQzOiBJRnJhbWUgc3VwcG9ydCB3b3JrYXJvdW5kXG5cdFx0XHRcdF90aGlzLl9jbG9uZUlkID0gX25leHRUaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyb290RWwuaW5zZXJ0QmVmb3JlKGNsb25lRWwsIGRyYWdFbCk7XG5cdFx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQoX3RoaXMsIHJvb3RFbCwgJ2Nsb25lJywgZHJhZ0VsKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdF90b2dnbGVDbGFzcyhkcmFnRWwsIG9wdGlvbnMuZHJhZ0NsYXNzLCB0cnVlKTtcblxuXHRcdFx0aWYgKHVzZUZhbGxiYWNrKSB7XG5cdFx0XHRcdGlmICh1c2VGYWxsYmFjayA9PT0gJ3RvdWNoJykge1xuXHRcdFx0XHRcdC8vIEJpbmQgdG91Y2ggZXZlbnRzXG5cdFx0XHRcdFx0X29uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgX3RoaXMuX29uVG91Y2hNb3ZlKTtcblx0XHRcdFx0XHRfb24oZG9jdW1lbnQsICd0b3VjaGVuZCcsIF90aGlzLl9vbkRyb3ApO1xuXHRcdFx0XHRcdF9vbihkb2N1bWVudCwgJ3RvdWNoY2FuY2VsJywgX3RoaXMuX29uRHJvcCk7XG5cblx0XHRcdFx0XHRpZiAob3B0aW9ucy5zdXBwb3J0UG9pbnRlcikge1xuXHRcdFx0XHRcdFx0X29uKGRvY3VtZW50LCAncG9pbnRlcm1vdmUnLCBfdGhpcy5fb25Ub3VjaE1vdmUpO1xuXHRcdFx0XHRcdFx0X29uKGRvY3VtZW50LCAncG9pbnRlcnVwJywgX3RoaXMuX29uRHJvcCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIE9sZCBicndvc2VyXG5cdFx0XHRcdFx0X29uKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgX3RoaXMuX29uVG91Y2hNb3ZlKTtcblx0XHRcdFx0XHRfb24oZG9jdW1lbnQsICdtb3VzZXVwJywgX3RoaXMuX29uRHJvcCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfdGhpcy5fbG9vcElkID0gc2V0SW50ZXJ2YWwoX3RoaXMuX2VtdWxhdGVEcmFnT3ZlciwgNTApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChkYXRhVHJhbnNmZXIpIHtcblx0XHRcdFx0XHRkYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcblx0XHRcdFx0XHRvcHRpb25zLnNldERhdGEgJiYgb3B0aW9ucy5zZXREYXRhLmNhbGwoX3RoaXMsIGRhdGFUcmFuc2ZlciwgZHJhZ0VsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9vbihkb2N1bWVudCwgJ2Ryb3AnLCBfdGhpcyk7XG5cblx0XHRcdFx0Ly8gIzExNDM6INCR0YvQstCw0LXRgiDRjdC70LXQvNC10L3RgiDRgSBJRnJhbWUg0LLQvdGD0YLRgNC4INCx0LvQvtC60LjRgNGD0LXRgiBgZHJvcGAsXG5cdFx0XHRcdC8vINC/0L7RjdGC0L7QvNGDINC10YHQu9C4INCy0YvQt9Cy0LDQu9GB0Y8gYG1vdXNlb3ZlcmAsINC30L3QsNGH0LjRgiDQvdCw0LTQviDQvtGC0LzQtdC90Y/RgtGMINCy0LXRgdGMIGQnbidkLlxuXHRcdFx0XHQvLyBCcmVha2luZyBDaHJvbWUgNjIrXG5cdFx0XHRcdC8vIF9vbihkb2N1bWVudCwgJ21vdXNlb3ZlcicsIF90aGlzKTtcblxuXHRcdFx0XHRfdGhpcy5fZHJhZ1N0YXJ0SWQgPSBfbmV4dFRpY2soX3RoaXMuX2RyYWdTdGFydGVkKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X29uRHJhZ092ZXI6IGZ1bmN0aW9uICgvKipFdmVudCovZXZ0KSB7XG5cdFx0XHR2YXIgZWwgPSB0aGlzLmVsLFxuXHRcdFx0XHR0YXJnZXQsXG5cdFx0XHRcdGRyYWdSZWN0LFxuXHRcdFx0XHR0YXJnZXRSZWN0LFxuXHRcdFx0XHRyZXZlcnQsXG5cdFx0XHRcdG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG5cdFx0XHRcdGdyb3VwID0gb3B0aW9ucy5ncm91cCxcblx0XHRcdFx0YWN0aXZlU29ydGFibGUgPSBTb3J0YWJsZS5hY3RpdmUsXG5cdFx0XHRcdGlzT3duZXIgPSAoYWN0aXZlR3JvdXAgPT09IGdyb3VwKSxcblx0XHRcdFx0aXNNb3ZpbmdCZXR3ZWVuU29ydGFibGUgPSBmYWxzZSxcblx0XHRcdFx0Y2FuU29ydCA9IG9wdGlvbnMuc29ydDtcblxuXHRcdFx0aWYgKGV2dC5wcmV2ZW50RGVmYXVsdCAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQhb3B0aW9ucy5kcmFnb3ZlckJ1YmJsZSAmJiBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkcmFnRWwuYW5pbWF0ZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRtb3ZlZCA9IHRydWU7XG5cblx0XHRcdGlmIChhY3RpdmVTb3J0YWJsZSAmJiAhb3B0aW9ucy5kaXNhYmxlZCAmJlxuXHRcdFx0XHQoaXNPd25lclxuXHRcdFx0XHRcdD8gY2FuU29ydCB8fCAocmV2ZXJ0ID0gIXJvb3RFbC5jb250YWlucyhkcmFnRWwpKSAvLyBSZXZlcnRpbmcgaXRlbSBpbnRvIHRoZSBvcmlnaW5hbCBsaXN0XG5cdFx0XHRcdFx0OiAoXG5cdFx0XHRcdFx0XHRwdXRTb3J0YWJsZSA9PT0gdGhpcyB8fFxuXHRcdFx0XHRcdFx0KFxuXHRcdFx0XHRcdFx0XHQoYWN0aXZlU29ydGFibGUubGFzdFB1bGxNb2RlID0gYWN0aXZlR3JvdXAuY2hlY2tQdWxsKHRoaXMsIGFjdGl2ZVNvcnRhYmxlLCBkcmFnRWwsIGV2dCkpICYmXG5cdFx0XHRcdFx0XHRcdGdyb3VwLmNoZWNrUHV0KHRoaXMsIGFjdGl2ZVNvcnRhYmxlLCBkcmFnRWwsIGV2dClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCkgJiZcblx0XHRcdFx0KGV2dC5yb290RWwgPT09IHZvaWQgMCB8fCBldnQucm9vdEVsID09PSB0aGlzLmVsKSAvLyB0b3VjaCBmYWxsYmFja1xuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIFNtYXJ0IGF1dG8tc2Nyb2xsaW5nXG5cdFx0XHRcdF9hdXRvU2Nyb2xsKGV2dCwgb3B0aW9ucywgdGhpcy5lbCk7XG5cblx0XHRcdFx0aWYgKF9zaWxlbnQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0YXJnZXQgPSBfY2xvc2VzdChldnQudGFyZ2V0LCBvcHRpb25zLmRyYWdnYWJsZSwgZWwpO1xuXHRcdFx0XHRkcmFnUmVjdCA9IGRyYWdFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0XHRpZiAocHV0U29ydGFibGUgIT09IHRoaXMpIHtcblx0XHRcdFx0XHRwdXRTb3J0YWJsZSA9IHRoaXM7XG5cdFx0XHRcdFx0aXNNb3ZpbmdCZXR3ZWVuU29ydGFibGUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHJldmVydCkge1xuXHRcdFx0XHRcdF9jbG9uZUhpZGUoYWN0aXZlU29ydGFibGUsIHRydWUpO1xuXHRcdFx0XHRcdHBhcmVudEVsID0gcm9vdEVsOyAvLyBhY3R1YWxpemF0aW9uXG5cblx0XHRcdFx0XHRpZiAoY2xvbmVFbCB8fCBuZXh0RWwpIHtcblx0XHRcdFx0XHRcdHJvb3RFbC5pbnNlcnRCZWZvcmUoZHJhZ0VsLCBjbG9uZUVsIHx8IG5leHRFbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKCFjYW5Tb3J0KSB7XG5cdFx0XHRcdFx0XHRyb290RWwuYXBwZW5kQ2hpbGQoZHJhZ0VsKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdGlmICgoZWwuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB8fCAoZWwuY2hpbGRyZW5bMF0gPT09IGdob3N0RWwpIHx8XG5cdFx0XHRcdFx0KGVsID09PSBldnQudGFyZ2V0KSAmJiAoX2dob3N0SXNMYXN0KGVsLCBldnQpKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQvL2Fzc2lnbiB0YXJnZXQgb25seSBpZiBjb25kaXRpb24gaXMgdHJ1ZVxuXHRcdFx0XHRcdGlmIChlbC5jaGlsZHJlbi5sZW5ndGggIT09IDAgJiYgZWwuY2hpbGRyZW5bMF0gIT09IGdob3N0RWwgJiYgZWwgPT09IGV2dC50YXJnZXQpIHtcblx0XHRcdFx0XHRcdHRhcmdldCA9IGVsLmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0XHRcdFx0aWYgKHRhcmdldC5hbmltYXRlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRhcmdldFJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X2Nsb25lSGlkZShhY3RpdmVTb3J0YWJsZSwgaXNPd25lcik7XG5cblx0XHRcdFx0XHRpZiAoX29uTW92ZShyb290RWwsIGVsLCBkcmFnRWwsIGRyYWdSZWN0LCB0YXJnZXQsIHRhcmdldFJlY3QsIGV2dCkgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWRyYWdFbC5jb250YWlucyhlbCkpIHtcblx0XHRcdFx0XHRcdFx0ZWwuYXBwZW5kQ2hpbGQoZHJhZ0VsKTtcblx0XHRcdFx0XHRcdFx0cGFyZW50RWwgPSBlbDsgLy8gYWN0dWFsaXphdGlvblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLl9hbmltYXRlKGRyYWdSZWN0LCBkcmFnRWwpO1xuXHRcdFx0XHRcdFx0dGFyZ2V0ICYmIHRoaXMuX2FuaW1hdGUodGFyZ2V0UmVjdCwgdGFyZ2V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAodGFyZ2V0ICYmICF0YXJnZXQuYW5pbWF0ZWQgJiYgdGFyZ2V0ICE9PSBkcmFnRWwgJiYgKHRhcmdldC5wYXJlbnROb2RlW2V4cGFuZG9dICE9PSB2b2lkIDApKSB7XG5cdFx0XHRcdFx0aWYgKGxhc3RFbCAhPT0gdGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHRsYXN0RWwgPSB0YXJnZXQ7XG5cdFx0XHRcdFx0XHRsYXN0Q1NTID0gX2Nzcyh0YXJnZXQpO1xuXHRcdFx0XHRcdFx0bGFzdFBhcmVudENTUyA9IF9jc3ModGFyZ2V0LnBhcmVudE5vZGUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRhcmdldFJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdFx0XHR2YXIgd2lkdGggPSB0YXJnZXRSZWN0LnJpZ2h0IC0gdGFyZ2V0UmVjdC5sZWZ0LFxuXHRcdFx0XHRcdFx0aGVpZ2h0ID0gdGFyZ2V0UmVjdC5ib3R0b20gLSB0YXJnZXRSZWN0LnRvcCxcblx0XHRcdFx0XHRcdGZsb2F0aW5nID0gUl9GTE9BVC50ZXN0KGxhc3RDU1MuY3NzRmxvYXQgKyBsYXN0Q1NTLmRpc3BsYXkpXG5cdFx0XHRcdFx0XHRcdHx8IChsYXN0UGFyZW50Q1NTLmRpc3BsYXkgPT0gJ2ZsZXgnICYmIGxhc3RQYXJlbnRDU1NbJ2ZsZXgtZGlyZWN0aW9uJ10uaW5kZXhPZigncm93JykgPT09IDApLFxuXHRcdFx0XHRcdFx0aXNXaWRlID0gKHRhcmdldC5vZmZzZXRXaWR0aCA+IGRyYWdFbC5vZmZzZXRXaWR0aCksXG5cdFx0XHRcdFx0XHRpc0xvbmcgPSAodGFyZ2V0Lm9mZnNldEhlaWdodCA+IGRyYWdFbC5vZmZzZXRIZWlnaHQpLFxuXHRcdFx0XHRcdFx0aGFsZndheSA9IChmbG9hdGluZyA/IChldnQuY2xpZW50WCAtIHRhcmdldFJlY3QubGVmdCkgLyB3aWR0aCA6IChldnQuY2xpZW50WSAtIHRhcmdldFJlY3QudG9wKSAvIGhlaWdodCkgPiAwLjUsXG5cdFx0XHRcdFx0XHRuZXh0U2libGluZyA9IHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsXG5cdFx0XHRcdFx0XHRhZnRlciA9IGZhbHNlXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0aWYgKGZsb2F0aW5nKSB7XG5cdFx0XHRcdFx0XHR2YXIgZWxUb3AgPSBkcmFnRWwub2Zmc2V0VG9wLFxuXHRcdFx0XHRcdFx0XHR0Z1RvcCA9IHRhcmdldC5vZmZzZXRUb3A7XG5cblx0XHRcdFx0XHRcdGlmIChlbFRvcCA9PT0gdGdUb3ApIHtcblx0XHRcdFx0XHRcdFx0YWZ0ZXIgPSAodGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IGRyYWdFbCkgJiYgIWlzV2lkZSB8fCBoYWxmd2F5ICYmIGlzV2lkZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09PSBkcmFnRWwgfHwgZHJhZ0VsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IHRhcmdldCkge1xuXHRcdFx0XHRcdFx0XHRhZnRlciA9IChldnQuY2xpZW50WSAtIHRhcmdldFJlY3QudG9wKSAvIGhlaWdodCA+IDAuNTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGFmdGVyID0gdGdUb3AgPiBlbFRvcDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIWlzTW92aW5nQmV0d2VlblNvcnRhYmxlKSB7XG5cdFx0XHRcdFx0XHRhZnRlciA9IChuZXh0U2libGluZyAhPT0gZHJhZ0VsKSAmJiAhaXNMb25nIHx8IGhhbGZ3YXkgJiYgaXNMb25nO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBtb3ZlVmVjdG9yID0gX29uTW92ZShyb290RWwsIGVsLCBkcmFnRWwsIGRyYWdSZWN0LCB0YXJnZXQsIHRhcmdldFJlY3QsIGV2dCwgYWZ0ZXIpO1xuXG5cdFx0XHRcdFx0aWYgKG1vdmVWZWN0b3IgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRpZiAobW92ZVZlY3RvciA9PT0gMSB8fCBtb3ZlVmVjdG9yID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRhZnRlciA9IChtb3ZlVmVjdG9yID09PSAxKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0X3NpbGVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KF91bnNpbGVudCwgMzApO1xuXG5cdFx0XHRcdFx0XHRfY2xvbmVIaWRlKGFjdGl2ZVNvcnRhYmxlLCBpc093bmVyKTtcblxuXHRcdFx0XHRcdFx0aWYgKCFkcmFnRWwuY29udGFpbnMoZWwpKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChhZnRlciAmJiAhbmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChkcmFnRWwpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkcmFnRWwsIGFmdGVyID8gbmV4dFNpYmxpbmcgOiB0YXJnZXQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHBhcmVudEVsID0gZHJhZ0VsLnBhcmVudE5vZGU7IC8vIGFjdHVhbGl6YXRpb25cblxuXHRcdFx0XHRcdFx0dGhpcy5fYW5pbWF0ZShkcmFnUmVjdCwgZHJhZ0VsKTtcblx0XHRcdFx0XHRcdHRoaXMuX2FuaW1hdGUodGFyZ2V0UmVjdCwgdGFyZ2V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X2FuaW1hdGU6IGZ1bmN0aW9uIChwcmV2UmVjdCwgdGFyZ2V0KSB7XG5cdFx0XHR2YXIgbXMgPSB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uO1xuXG5cdFx0XHRpZiAobXMpIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRSZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdGlmIChwcmV2UmVjdC5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0XHRcdHByZXZSZWN0ID0gcHJldlJlY3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfY3NzKHRhcmdldCwgJ3RyYW5zaXRpb24nLCAnbm9uZScpO1xuXHRcdFx0XHRfY3NzKHRhcmdldCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnXG5cdFx0XHRcdFx0KyAocHJldlJlY3QubGVmdCAtIGN1cnJlbnRSZWN0LmxlZnQpICsgJ3B4LCdcblx0XHRcdFx0XHQrIChwcmV2UmVjdC50b3AgLSBjdXJyZW50UmVjdC50b3ApICsgJ3B4LDApJ1xuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHRhcmdldC5vZmZzZXRXaWR0aDsgLy8gcmVwYWludFxuXG5cdFx0XHRcdF9jc3ModGFyZ2V0LCAndHJhbnNpdGlvbicsICdhbGwgJyArIG1zICsgJ21zJyk7XG5cdFx0XHRcdF9jc3ModGFyZ2V0LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuXG5cdFx0XHRcdGNsZWFyVGltZW91dCh0YXJnZXQuYW5pbWF0ZWQpO1xuXHRcdFx0XHR0YXJnZXQuYW5pbWF0ZWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRfY3NzKHRhcmdldCwgJ3RyYW5zaXRpb24nLCAnJyk7XG5cdFx0XHRcdFx0X2Nzcyh0YXJnZXQsICd0cmFuc2Zvcm0nLCAnJyk7XG5cdFx0XHRcdFx0dGFyZ2V0LmFuaW1hdGVkID0gZmFsc2U7XG5cdFx0XHRcdH0sIG1zKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X29mZlVwRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgb3duZXJEb2N1bWVudCA9IHRoaXMuZWwub3duZXJEb2N1bWVudDtcblxuXHRcdFx0X29mZihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcblx0XHRcdF9vZmYoZG9jdW1lbnQsICdwb2ludGVybW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcblx0XHRcdF9vZmYob3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLl9vbkRyb3ApO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLl9vbkRyb3ApO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAncG9pbnRlcnVwJywgdGhpcy5fb25Ecm9wKTtcblx0XHRcdF9vZmYob3duZXJEb2N1bWVudCwgJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ecm9wKTtcblx0XHRcdF9vZmYob3duZXJEb2N1bWVudCwgJ3BvaW50ZXJjYW5jZWwnLCB0aGlzLl9vbkRyb3ApO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAnc2VsZWN0c3RhcnQnLCB0aGlzKTtcblx0XHR9LFxuXG5cdFx0X29uRHJvcDogZnVuY3Rpb24gKC8qKkV2ZW50Ki9ldnQpIHtcblx0XHRcdHZhciBlbCA9IHRoaXMuZWwsXG5cdFx0XHRcdG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5fbG9vcElkKTtcblx0XHRcdGNsZWFySW50ZXJ2YWwoYXV0b1Njcm9sbC5waWQpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2RyYWdTdGFydFRpbWVyKTtcblxuXHRcdFx0X2NhbmNlbE5leHRUaWNrKHRoaXMuX2Nsb25lSWQpO1xuXHRcdFx0X2NhbmNlbE5leHRUaWNrKHRoaXMuX2RyYWdTdGFydElkKTtcblxuXHRcdFx0Ly8gVW5iaW5kIGV2ZW50c1xuXHRcdFx0X29mZihkb2N1bWVudCwgJ21vdXNlb3ZlcicsIHRoaXMpO1xuXHRcdFx0X29mZihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcblxuXHRcdFx0aWYgKHRoaXMubmF0aXZlRHJhZ2dhYmxlKSB7XG5cdFx0XHRcdF9vZmYoZG9jdW1lbnQsICdkcm9wJywgdGhpcyk7XG5cdFx0XHRcdF9vZmYoZWwsICdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29mZlVwRXZlbnRzKCk7XG5cblx0XHRcdGlmIChldnQpIHtcblx0XHRcdFx0aWYgKG1vdmVkKSB7XG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0IW9wdGlvbnMuZHJvcEJ1YmJsZSAmJiBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRnaG9zdEVsICYmIGdob3N0RWwucGFyZW50Tm9kZSAmJiBnaG9zdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZ2hvc3RFbCk7XG5cblx0XHRcdFx0aWYgKHJvb3RFbCA9PT0gcGFyZW50RWwgfHwgU29ydGFibGUuYWN0aXZlLmxhc3RQdWxsTW9kZSAhPT0gJ2Nsb25lJykge1xuXHRcdFx0XHRcdC8vIFJlbW92ZSBjbG9uZVxuXHRcdFx0XHRcdGNsb25lRWwgJiYgY2xvbmVFbC5wYXJlbnROb2RlICYmIGNsb25lRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZUVsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChkcmFnRWwpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcblx0XHRcdFx0XHRcdF9vZmYoZHJhZ0VsLCAnZHJhZ2VuZCcsIHRoaXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdF9kaXNhYmxlRHJhZ2dhYmxlKGRyYWdFbCk7XG5cdFx0XHRcdFx0ZHJhZ0VsLnN0eWxlWyd3aWxsLWNoYW5nZSddID0gJyc7XG5cblx0XHRcdFx0XHQvLyBSZW1vdmUgY2xhc3Mnc1xuXHRcdFx0XHRcdF90b2dnbGVDbGFzcyhkcmFnRWwsIHRoaXMub3B0aW9ucy5naG9zdENsYXNzLCBmYWxzZSk7XG5cdFx0XHRcdFx0X3RvZ2dsZUNsYXNzKGRyYWdFbCwgdGhpcy5vcHRpb25zLmNob3NlbkNsYXNzLCBmYWxzZSk7XG5cblx0XHRcdFx0XHQvLyBEcmFnIHN0b3AgZXZlbnRcblx0XHRcdFx0XHRfZGlzcGF0Y2hFdmVudCh0aGlzLCByb290RWwsICd1bmNob29zZScsIGRyYWdFbCwgcGFyZW50RWwsIHJvb3RFbCwgb2xkSW5kZXgpO1xuXG5cdFx0XHRcdFx0aWYgKHJvb3RFbCAhPT0gcGFyZW50RWwpIHtcblx0XHRcdFx0XHRcdG5ld0luZGV4ID0gX2luZGV4KGRyYWdFbCwgb3B0aW9ucy5kcmFnZ2FibGUpO1xuXG5cdFx0XHRcdFx0XHRpZiAobmV3SW5kZXggPj0gMCkge1xuXHRcdFx0XHRcdFx0XHQvLyBBZGQgZXZlbnRcblx0XHRcdFx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQobnVsbCwgcGFyZW50RWwsICdhZGQnLCBkcmFnRWwsIHBhcmVudEVsLCByb290RWwsIG9sZEluZGV4LCBuZXdJbmRleCk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGV2ZW50XG5cdFx0XHRcdFx0XHRcdF9kaXNwYXRjaEV2ZW50KHRoaXMsIHJvb3RFbCwgJ3JlbW92ZScsIGRyYWdFbCwgcGFyZW50RWwsIHJvb3RFbCwgb2xkSW5kZXgsIG5ld0luZGV4KTtcblxuXHRcdFx0XHRcdFx0XHQvLyBkcmFnIGZyb20gb25lIGxpc3QgYW5kIGRyb3AgaW50byBhbm90aGVyXG5cdFx0XHRcdFx0XHRcdF9kaXNwYXRjaEV2ZW50KG51bGwsIHBhcmVudEVsLCAnc29ydCcsIGRyYWdFbCwgcGFyZW50RWwsIHJvb3RFbCwgb2xkSW5kZXgsIG5ld0luZGV4KTtcblx0XHRcdFx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQodGhpcywgcm9vdEVsLCAnc29ydCcsIGRyYWdFbCwgcGFyZW50RWwsIHJvb3RFbCwgb2xkSW5kZXgsIG5ld0luZGV4KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoZHJhZ0VsLm5leHRTaWJsaW5nICE9PSBuZXh0RWwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBpbmRleCBvZiB0aGUgZHJhZ2dlZCBlbGVtZW50IHdpdGhpbiBpdHMgcGFyZW50XG5cdFx0XHRcdFx0XHRcdG5ld0luZGV4ID0gX2luZGV4KGRyYWdFbCwgb3B0aW9ucy5kcmFnZ2FibGUpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChuZXdJbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZHJhZyAmIGRyb3Agd2l0aGluIHRoZSBzYW1lIGxpc3Rcblx0XHRcdFx0XHRcdFx0XHRfZGlzcGF0Y2hFdmVudCh0aGlzLCByb290RWwsICd1cGRhdGUnLCBkcmFnRWwsIHBhcmVudEVsLCByb290RWwsIG9sZEluZGV4LCBuZXdJbmRleCk7XG5cdFx0XHRcdFx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQodGhpcywgcm9vdEVsLCAnc29ydCcsIGRyYWdFbCwgcGFyZW50RWwsIHJvb3RFbCwgb2xkSW5kZXgsIG5ld0luZGV4KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChTb3J0YWJsZS5hY3RpdmUpIHtcblx0XHRcdFx0XHRcdC8qIGpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXHRcdFx0XHRcdFx0aWYgKG5ld0luZGV4ID09IG51bGwgfHwgbmV3SW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdG5ld0luZGV4ID0gb2xkSW5kZXg7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdF9kaXNwYXRjaEV2ZW50KHRoaXMsIHJvb3RFbCwgJ2VuZCcsIGRyYWdFbCwgcGFyZW50RWwsIHJvb3RFbCwgb2xkSW5kZXgsIG5ld0luZGV4KTtcblxuXHRcdFx0XHRcdFx0Ly8gU2F2ZSBzb3J0aW5nXG5cdFx0XHRcdFx0XHR0aGlzLnNhdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9udWxsaW5nKCk7XG5cdFx0fSxcblxuXHRcdF9udWxsaW5nOiBmdW5jdGlvbigpIHtcblx0XHRcdHJvb3RFbCA9XG5cdFx0XHRkcmFnRWwgPVxuXHRcdFx0cGFyZW50RWwgPVxuXHRcdFx0Z2hvc3RFbCA9XG5cdFx0XHRuZXh0RWwgPVxuXHRcdFx0Y2xvbmVFbCA9XG5cdFx0XHRsYXN0RG93bkVsID1cblxuXHRcdFx0c2Nyb2xsRWwgPVxuXHRcdFx0c2Nyb2xsUGFyZW50RWwgPVxuXG5cdFx0XHR0YXBFdnQgPVxuXHRcdFx0dG91Y2hFdnQgPVxuXG5cdFx0XHRtb3ZlZCA9XG5cdFx0XHRuZXdJbmRleCA9XG5cblx0XHRcdGxhc3RFbCA9XG5cdFx0XHRsYXN0Q1NTID1cblxuXHRcdFx0cHV0U29ydGFibGUgPVxuXHRcdFx0YWN0aXZlR3JvdXAgPVxuXHRcdFx0U29ydGFibGUuYWN0aXZlID0gbnVsbDtcblxuXHRcdFx0c2F2ZWRJbnB1dENoZWNrZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblx0XHRcdFx0ZWwuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdHNhdmVkSW5wdXRDaGVja2VkLmxlbmd0aCA9IDA7XG5cdFx0fSxcblxuXHRcdGhhbmRsZUV2ZW50OiBmdW5jdGlvbiAoLyoqRXZlbnQqL2V2dCkge1xuXHRcdFx0c3dpdGNoIChldnQudHlwZSkge1xuXHRcdFx0XHRjYXNlICdkcm9wJzpcblx0XHRcdFx0Y2FzZSAnZHJhZ2VuZCc6XG5cdFx0XHRcdFx0dGhpcy5fb25Ecm9wKGV2dCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnZHJhZ292ZXInOlxuXHRcdFx0XHRjYXNlICdkcmFnZW50ZXInOlxuXHRcdFx0XHRcdGlmIChkcmFnRWwpIHtcblx0XHRcdFx0XHRcdHRoaXMuX29uRHJhZ092ZXIoZXZ0KTtcblx0XHRcdFx0XHRcdF9nbG9iYWxEcmFnT3ZlcihldnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdtb3VzZW92ZXInOlxuXHRcdFx0XHRcdHRoaXMuX29uRHJvcChldnQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ3NlbGVjdHN0YXJ0Jzpcblx0XHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBTZXJpYWxpemVzIHRoZSBpdGVtIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5nLlxuXHRcdCAqIEByZXR1cm5zIHtTdHJpbmdbXX1cblx0XHQgKi9cblx0XHR0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgb3JkZXIgPSBbXSxcblx0XHRcdFx0ZWwsXG5cdFx0XHRcdGNoaWxkcmVuID0gdGhpcy5lbC5jaGlsZHJlbixcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdG4gPSBjaGlsZHJlbi5sZW5ndGgsXG5cdFx0XHRcdG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRcdGZvciAoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGVsID0gY2hpbGRyZW5baV07XG5cdFx0XHRcdGlmIChfY2xvc2VzdChlbCwgb3B0aW9ucy5kcmFnZ2FibGUsIHRoaXMuZWwpKSB7XG5cdFx0XHRcdFx0b3JkZXIucHVzaChlbC5nZXRBdHRyaWJ1dGUob3B0aW9ucy5kYXRhSWRBdHRyKSB8fCBfZ2VuZXJhdGVJZChlbCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcmRlcjtcblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBTb3J0cyB0aGUgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBhcnJheS5cblx0XHQgKiBAcGFyYW0gIHtTdHJpbmdbXX0gIG9yZGVyICBvcmRlciBvZiB0aGUgaXRlbXNcblx0XHQgKi9cblx0XHRzb3J0OiBmdW5jdGlvbiAob3JkZXIpIHtcblx0XHRcdHZhciBpdGVtcyA9IHt9LCByb290RWwgPSB0aGlzLmVsO1xuXG5cdFx0XHR0aGlzLnRvQXJyYXkoKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCwgaSkge1xuXHRcdFx0XHR2YXIgZWwgPSByb290RWwuY2hpbGRyZW5baV07XG5cblx0XHRcdFx0aWYgKF9jbG9zZXN0KGVsLCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlLCByb290RWwpKSB7XG5cdFx0XHRcdFx0aXRlbXNbaWRdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHRvcmRlci5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRpZiAoaXRlbXNbaWRdKSB7XG5cdFx0XHRcdFx0cm9vdEVsLnJlbW92ZUNoaWxkKGl0ZW1zW2lkXSk7XG5cdFx0XHRcdFx0cm9vdEVsLmFwcGVuZENoaWxkKGl0ZW1zW2lkXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIFNhdmUgdGhlIGN1cnJlbnQgc29ydGluZ1xuXHRcdCAqL1xuXHRcdHNhdmU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzdG9yZSA9IHRoaXMub3B0aW9ucy5zdG9yZTtcblx0XHRcdHN0b3JlICYmIHN0b3JlLnNldCh0aGlzKTtcblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBGb3IgZWFjaCBlbGVtZW50IGluIHRoZSBzZXQsIGdldCB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yIGJ5IHRlc3RpbmcgdGhlIGVsZW1lbnQgaXRzZWxmIGFuZCB0cmF2ZXJzaW5nIHVwIHRocm91Z2ggaXRzIGFuY2VzdG9ycyBpbiB0aGUgRE9NIHRyZWUuXG5cdFx0ICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgZWxcblx0XHQgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICBbc2VsZWN0b3JdICBkZWZhdWx0OiBgb3B0aW9ucy5kcmFnZ2FibGVgXG5cdFx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fG51bGx9XG5cdFx0ICovXG5cdFx0Y2xvc2VzdDogZnVuY3Rpb24gKGVsLCBzZWxlY3Rvcikge1xuXHRcdFx0cmV0dXJuIF9jbG9zZXN0KGVsLCBzZWxlY3RvciB8fCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlLCB0aGlzLmVsKTtcblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBTZXQvZ2V0IG9wdGlvblxuXHRcdCAqIEBwYXJhbSAgIHtzdHJpbmd9IG5hbWVcblx0XHQgKiBAcGFyYW0gICB7Kn0gICAgICBbdmFsdWVdXG5cdFx0ICogQHJldHVybnMgeyp9XG5cdFx0ICovXG5cdFx0b3B0aW9uOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0XHRpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9uc1tuYW1lXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnNbbmFtZV0gPSB2YWx1ZTtcblxuXHRcdFx0XHRpZiAobmFtZSA9PT0gJ2dyb3VwJykge1xuXHRcdFx0XHRcdF9wcmVwYXJlR3JvdXAob3B0aW9ucyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBEZXN0cm95XG5cdFx0ICovXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGVsID0gdGhpcy5lbDtcblxuXHRcdFx0ZWxbZXhwYW5kb10gPSBudWxsO1xuXG5cdFx0XHRfb2ZmKGVsLCAnbW91c2Vkb3duJywgdGhpcy5fb25UYXBTdGFydCk7XG5cdFx0XHRfb2ZmKGVsLCAndG91Y2hzdGFydCcsIHRoaXMuX29uVGFwU3RhcnQpO1xuXHRcdFx0X29mZihlbCwgJ3BvaW50ZXJkb3duJywgdGhpcy5fb25UYXBTdGFydCk7XG5cblx0XHRcdGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuXHRcdFx0XHRfb2ZmKGVsLCAnZHJhZ292ZXInLCB0aGlzKTtcblx0XHRcdFx0X29mZihlbCwgJ2RyYWdlbnRlcicsIHRoaXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgZHJhZ2dhYmxlIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbCgnW2RyYWdnYWJsZV0nKSwgZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dG91Y2hEcmFnT3Zlckxpc3RlbmVycy5zcGxpY2UodG91Y2hEcmFnT3Zlckxpc3RlbmVycy5pbmRleE9mKHRoaXMuX29uRHJhZ092ZXIpLCAxKTtcblxuXHRcdFx0dGhpcy5fb25Ecm9wKCk7XG5cblx0XHRcdHRoaXMuZWwgPSBlbCA9IG51bGw7XG5cdFx0fVxuXHR9O1xuXG5cblx0ZnVuY3Rpb24gX2Nsb25lSGlkZShzb3J0YWJsZSwgc3RhdGUpIHtcblx0XHRpZiAoc29ydGFibGUubGFzdFB1bGxNb2RlICE9PSAnY2xvbmUnKSB7XG5cdFx0XHRzdGF0ZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGNsb25lRWwgJiYgKGNsb25lRWwuc3RhdGUgIT09IHN0YXRlKSkge1xuXHRcdFx0X2NzcyhjbG9uZUVsLCAnZGlzcGxheScsIHN0YXRlID8gJ25vbmUnIDogJycpO1xuXG5cdFx0XHRpZiAoIXN0YXRlKSB7XG5cdFx0XHRcdGlmIChjbG9uZUVsLnN0YXRlKSB7XG5cdFx0XHRcdFx0aWYgKHNvcnRhYmxlLm9wdGlvbnMuZ3JvdXAucmV2ZXJ0Q2xvbmUpIHtcblx0XHRcdFx0XHRcdHJvb3RFbC5pbnNlcnRCZWZvcmUoY2xvbmVFbCwgbmV4dEVsKTtcblx0XHRcdFx0XHRcdHNvcnRhYmxlLl9hbmltYXRlKGRyYWdFbCwgY2xvbmVFbCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJvb3RFbC5pbnNlcnRCZWZvcmUoY2xvbmVFbCwgZHJhZ0VsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y2xvbmVFbC5zdGF0ZSA9IHN0YXRlO1xuXHRcdH1cblx0fVxuXG5cblx0ZnVuY3Rpb24gX2Nsb3Nlc3QoLyoqSFRNTEVsZW1lbnQqL2VsLCAvKipTdHJpbmcqL3NlbGVjdG9yLCAvKipIVE1MRWxlbWVudCovY3R4KSB7XG5cdFx0aWYgKGVsKSB7XG5cdFx0XHRjdHggPSBjdHggfHwgZG9jdW1lbnQ7XG5cblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKChzZWxlY3RvciA9PT0gJz4qJyAmJiBlbC5wYXJlbnROb2RlID09PSBjdHgpIHx8IF9tYXRjaGVzKGVsLCBzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWw7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoganNoaW50IGJvc3M6dHJ1ZSAqL1xuXHRcdFx0fSB3aGlsZSAoZWwgPSBfZ2V0UGFyZW50T3JIb3N0KGVsKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXG5cdGZ1bmN0aW9uIF9nZXRQYXJlbnRPckhvc3QoZWwpIHtcblx0XHR2YXIgcGFyZW50ID0gZWwuaG9zdDtcblxuXHRcdHJldHVybiAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSkgPyBwYXJlbnQgOiBlbC5wYXJlbnROb2RlO1xuXHR9XG5cblxuXHRmdW5jdGlvbiBfZ2xvYmFsRHJhZ092ZXIoLyoqRXZlbnQqL2V2dCkge1xuXHRcdGlmIChldnQuZGF0YVRyYW5zZmVyKSB7XG5cdFx0XHRldnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG5cdFx0fVxuXHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblxuXHRmdW5jdGlvbiBfb24oZWwsIGV2ZW50LCBmbikge1xuXHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCBjYXB0dXJlTW9kZSk7XG5cdH1cblxuXG5cdGZ1bmN0aW9uIF9vZmYoZWwsIGV2ZW50LCBmbikge1xuXHRcdGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCBjYXB0dXJlTW9kZSk7XG5cdH1cblxuXG5cdGZ1bmN0aW9uIF90b2dnbGVDbGFzcyhlbCwgbmFtZSwgc3RhdGUpIHtcblx0XHRpZiAoZWwpIHtcblx0XHRcdGlmIChlbC5jbGFzc0xpc3QpIHtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0W3N0YXRlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9ICgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLnJlcGxhY2UoUl9TUEFDRSwgJyAnKS5yZXBsYWNlKCcgJyArIG5hbWUgKyAnICcsICcgJyk7XG5cdFx0XHRcdGVsLmNsYXNzTmFtZSA9IChjbGFzc05hbWUgKyAoc3RhdGUgPyAnICcgKyBuYW1lIDogJycpKS5yZXBsYWNlKFJfU1BBQ0UsICcgJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXHRmdW5jdGlvbiBfY3NzKGVsLCBwcm9wLCB2YWwpIHtcblx0XHR2YXIgc3R5bGUgPSBlbCAmJiBlbC5zdHlsZTtcblxuXHRcdGlmIChzdHlsZSkge1xuXHRcdFx0aWYgKHZhbCA9PT0gdm9pZCAwKSB7XG5cdFx0XHRcdGlmIChkb2N1bWVudC5kZWZhdWx0VmlldyAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKSB7XG5cdFx0XHRcdFx0dmFsID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKGVsLmN1cnJlbnRTdHlsZSkge1xuXHRcdFx0XHRcdHZhbCA9IGVsLmN1cnJlbnRTdHlsZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBwcm9wID09PSB2b2lkIDAgPyB2YWwgOiB2YWxbcHJvcF07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKCEocHJvcCBpbiBzdHlsZSkpIHtcblx0XHRcdFx0XHRwcm9wID0gJy13ZWJraXQtJyArIHByb3A7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzdHlsZVtwcm9wXSA9IHZhbCArICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/ICcnIDogJ3B4Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXHRmdW5jdGlvbiBfZmluZChjdHgsIHRhZ05hbWUsIGl0ZXJhdG9yKSB7XG5cdFx0aWYgKGN0eCkge1xuXHRcdFx0dmFyIGxpc3QgPSBjdHguZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSksIGkgPSAwLCBuID0gbGlzdC5sZW5ndGg7XG5cblx0XHRcdGlmIChpdGVyYXRvcikge1xuXHRcdFx0XHRmb3IgKDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRcdGl0ZXJhdG9yKGxpc3RbaV0sIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBsaXN0O1xuXHRcdH1cblxuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cblxuXHRmdW5jdGlvbiBfZGlzcGF0Y2hFdmVudChzb3J0YWJsZSwgcm9vdEVsLCBuYW1lLCB0YXJnZXRFbCwgdG9FbCwgZnJvbUVsLCBzdGFydEluZGV4LCBuZXdJbmRleCkge1xuXHRcdHNvcnRhYmxlID0gKHNvcnRhYmxlIHx8IHJvb3RFbFtleHBhbmRvXSk7XG5cblx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50JyksXG5cdFx0XHRvcHRpb25zID0gc29ydGFibGUub3B0aW9ucyxcblx0XHRcdG9uTmFtZSA9ICdvbicgKyBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zdWJzdHIoMSk7XG5cblx0XHRldnQuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUpO1xuXG5cdFx0ZXZ0LnRvID0gdG9FbCB8fCByb290RWw7XG5cdFx0ZXZ0LmZyb20gPSBmcm9tRWwgfHwgcm9vdEVsO1xuXHRcdGV2dC5pdGVtID0gdGFyZ2V0RWwgfHwgcm9vdEVsO1xuXHRcdGV2dC5jbG9uZSA9IGNsb25lRWw7XG5cblx0XHRldnQub2xkSW5kZXggPSBzdGFydEluZGV4O1xuXHRcdGV2dC5uZXdJbmRleCA9IG5ld0luZGV4O1xuXG5cdFx0cm9vdEVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblxuXHRcdGlmIChvcHRpb25zW29uTmFtZV0pIHtcblx0XHRcdG9wdGlvbnNbb25OYW1lXS5jYWxsKHNvcnRhYmxlLCBldnQpO1xuXHRcdH1cblx0fVxuXG5cblx0ZnVuY3Rpb24gX29uTW92ZShmcm9tRWwsIHRvRWwsIGRyYWdFbCwgZHJhZ1JlY3QsIHRhcmdldEVsLCB0YXJnZXRSZWN0LCBvcmlnaW5hbEV2dCwgd2lsbEluc2VydEFmdGVyKSB7XG5cdFx0dmFyIGV2dCxcblx0XHRcdHNvcnRhYmxlID0gZnJvbUVsW2V4cGFuZG9dLFxuXHRcdFx0b25Nb3ZlRm4gPSBzb3J0YWJsZS5vcHRpb25zLm9uTW92ZSxcblx0XHRcdHJldFZhbDtcblxuXHRcdGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdGV2dC5pbml0RXZlbnQoJ21vdmUnLCB0cnVlLCB0cnVlKTtcblxuXHRcdGV2dC50byA9IHRvRWw7XG5cdFx0ZXZ0LmZyb20gPSBmcm9tRWw7XG5cdFx0ZXZ0LmRyYWdnZWQgPSBkcmFnRWw7XG5cdFx0ZXZ0LmRyYWdnZWRSZWN0ID0gZHJhZ1JlY3Q7XG5cdFx0ZXZ0LnJlbGF0ZWQgPSB0YXJnZXRFbCB8fCB0b0VsO1xuXHRcdGV2dC5yZWxhdGVkUmVjdCA9IHRhcmdldFJlY3QgfHwgdG9FbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRldnQud2lsbEluc2VydEFmdGVyID0gd2lsbEluc2VydEFmdGVyO1xuXG5cdFx0ZnJvbUVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblxuXHRcdGlmIChvbk1vdmVGbikge1xuXHRcdFx0cmV0VmFsID0gb25Nb3ZlRm4uY2FsbChzb3J0YWJsZSwgZXZ0LCBvcmlnaW5hbEV2dCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldFZhbDtcblx0fVxuXG5cblx0ZnVuY3Rpb24gX2Rpc2FibGVEcmFnZ2FibGUoZWwpIHtcblx0XHRlbC5kcmFnZ2FibGUgPSBmYWxzZTtcblx0fVxuXG5cblx0ZnVuY3Rpb24gX3Vuc2lsZW50KCkge1xuXHRcdF9zaWxlbnQgPSBmYWxzZTtcblx0fVxuXG5cblx0LyoqIEByZXR1cm5zIHtIVE1MRWxlbWVudHxmYWxzZX0gKi9cblx0ZnVuY3Rpb24gX2dob3N0SXNMYXN0KGVsLCBldnQpIHtcblx0XHR2YXIgbGFzdEVsID0gZWwubGFzdEVsZW1lbnRDaGlsZCxcblx0XHRcdHJlY3QgPSBsYXN0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHQvLyA1IOKAlCBtaW4gZGVsdGFcblx0XHQvLyBhYnMg4oCUINC90LXQu9GM0LfRjyDQtNC+0LHQsNCy0LvRj9GC0YwsINCwINGC0L4g0LPQu9GO0LrQuCDQv9GA0Lgg0L3QsNCy0LXQtNC10L3QuNC4INGB0LLQtdGA0YXRg1xuXHRcdHJldHVybiAoZXZ0LmNsaWVudFkgLSAocmVjdC50b3AgKyByZWN0LmhlaWdodCkgPiA1KSB8fFxuXHRcdFx0KGV2dC5jbGllbnRYIC0gKHJlY3QubGVmdCArIHJlY3Qud2lkdGgpID4gNSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBpZFxuXHQgKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBfZ2VuZXJhdGVJZChlbCkge1xuXHRcdHZhciBzdHIgPSBlbC50YWdOYW1lICsgZWwuY2xhc3NOYW1lICsgZWwuc3JjICsgZWwuaHJlZiArIGVsLnRleHRDb250ZW50LFxuXHRcdFx0aSA9IHN0ci5sZW5ndGgsXG5cdFx0XHRzdW0gPSAwO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0c3VtICs9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdW0udG9TdHJpbmcoMzYpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG9mIGFuIGVsZW1lbnQgd2l0aGluIGl0cyBwYXJlbnQgZm9yIGEgc2VsZWN0ZWQgc2V0IG9mXG5cdCAqIGVsZW1lbnRzXG5cdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0gIHtzZWxlY3Rvcn0gc2VsZWN0b3Jcblx0ICogQHJldHVybiB7bnVtYmVyfVxuXHQgKi9cblx0ZnVuY3Rpb24gX2luZGV4KGVsLCBzZWxlY3Rvcikge1xuXHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRpZiAoIWVsIHx8ICFlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKGVsICYmIChlbCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpKSB7XG5cdFx0XHRpZiAoKGVsLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdURU1QTEFURScpICYmIChzZWxlY3RvciA9PT0gJz4qJyB8fCBfbWF0Y2hlcyhlbCwgc2VsZWN0b3IpKSkge1xuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBpbmRleDtcblx0fVxuXG5cdGZ1bmN0aW9uIF9tYXRjaGVzKC8qKkhUTUxFbGVtZW50Ki9lbCwgLyoqU3RyaW5nKi9zZWxlY3Rvcikge1xuXHRcdGlmIChlbCkge1xuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLicpO1xuXG5cdFx0XHR2YXIgdGFnID0gc2VsZWN0b3Iuc2hpZnQoKS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0XHRyZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKCcgKyBzZWxlY3Rvci5qb2luKCd8JykgKyAnKSg/PVxcXFxzKScsICdnJyk7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdCh0YWcgPT09ICcnIHx8IGVsLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT0gdGFnKSAmJlxuXHRcdFx0XHQoIXNlbGVjdG9yLmxlbmd0aCB8fCAoKCcgJyArIGVsLmNsYXNzTmFtZSArICcgJykubWF0Y2gocmUpIHx8IFtdKS5sZW5ndGggPT0gc2VsZWN0b3IubGVuZ3RoKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmdW5jdGlvbiBfdGhyb3R0bGUoY2FsbGJhY2ssIG1zKSB7XG5cdFx0dmFyIGFyZ3MsIF90aGlzO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChhcmdzID09PSB2b2lkIDApIHtcblx0XHRcdFx0YXJncyA9IGFyZ3VtZW50cztcblx0XHRcdFx0X3RoaXMgPSB0aGlzO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChfdGhpcywgYXJnc1swXSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmFwcGx5KF90aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhcmdzID0gdm9pZCAwO1xuXHRcdFx0XHR9LCBtcyk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9leHRlbmQoZHN0LCBzcmMpIHtcblx0XHRpZiAoZHN0ICYmIHNyYykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRkc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRzdDtcblx0fVxuXG5cdGZ1bmN0aW9uIF9jbG9uZShlbCkge1xuXHRcdGlmIChQb2x5bWVyICYmIFBvbHltZXIuZG9tKSB7XG5cdFx0XHRyZXR1cm4gUG9seW1lci5kb20oZWwpLmNsb25lTm9kZSh0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoJCkge1xuXHRcdFx0cmV0dXJuICQoZWwpLmNsb25lKHRydWUpWzBdO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiBlbC5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gX3NhdmVJbnB1dENoZWNrZWRTdGF0ZShyb290KSB7XG5cdFx0dmFyIGlucHV0cyA9IHJvb3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jyk7XG5cdFx0dmFyIGlkeCA9IGlucHV0cy5sZW5ndGg7XG5cblx0XHR3aGlsZSAoaWR4LS0pIHtcblx0XHRcdHZhciBlbCA9IGlucHV0c1tpZHhdO1xuXHRcdFx0ZWwuY2hlY2tlZCAmJiBzYXZlZElucHV0Q2hlY2tlZC5wdXNoKGVsKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBfbmV4dFRpY2soZm4pIHtcblx0XHRyZXR1cm4gc2V0VGltZW91dChmbiwgMCk7XG5cdH1cblxuXHRmdW5jdGlvbiBfY2FuY2VsTmV4dFRpY2soaWQpIHtcblx0XHRyZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcblx0fVxuXG5cdC8vIEZpeGVkICM5NzM6XG5cdF9vbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldnQpIHtcblx0XHRpZiAoU29ydGFibGUuYWN0aXZlKSB7XG5cdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIEV4cG9ydCB1dGlsc1xuXHRTb3J0YWJsZS51dGlscyA9IHtcblx0XHRvbjogX29uLFxuXHRcdG9mZjogX29mZixcblx0XHRjc3M6IF9jc3MsXG5cdFx0ZmluZDogX2ZpbmQsXG5cdFx0aXM6IGZ1bmN0aW9uIChlbCwgc2VsZWN0b3IpIHtcblx0XHRcdHJldHVybiAhIV9jbG9zZXN0KGVsLCBzZWxlY3RvciwgZWwpO1xuXHRcdH0sXG5cdFx0ZXh0ZW5kOiBfZXh0ZW5kLFxuXHRcdHRocm90dGxlOiBfdGhyb3R0bGUsXG5cdFx0Y2xvc2VzdDogX2Nsb3Nlc3QsXG5cdFx0dG9nZ2xlQ2xhc3M6IF90b2dnbGVDbGFzcyxcblx0XHRjbG9uZTogX2Nsb25lLFxuXHRcdGluZGV4OiBfaW5kZXgsXG5cdFx0bmV4dFRpY2s6IF9uZXh0VGljayxcblx0XHRjYW5jZWxOZXh0VGljazogX2NhbmNlbE5leHRUaWNrXG5cdH07XG5cblxuXHQvKipcblx0ICogQ3JlYXRlIHNvcnRhYmxlIGluc3RhbmNlXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9ICBlbFxuXHQgKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0aW9uc11cblx0ICovXG5cdFNvcnRhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdHJldHVybiBuZXcgU29ydGFibGUoZWwsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gRXhwb3J0XG5cdFNvcnRhYmxlLnZlcnNpb24gPSAnMS43LjAnO1xuXHRyZXR1cm4gU29ydGFibGU7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NvcnRhYmxlanMvU29ydGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3NvcnRhYmxlanMvU29ydGFibGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==