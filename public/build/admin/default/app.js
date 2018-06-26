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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQzNDAyZjNiNjFiZTA2Y2MwMjUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2NvbnRlbnQtbmF2LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2RpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvbW9kdWxlcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9zY3NzL2FwcC5zY3NzP2YwNDEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvZGF0ZXBpY2tlci5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvaTE4bi9kYXRlcGlja2VyLmVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiU3Vtb1NlbGVjdCIsInNlYXJjaCIsInBsYWNlaG9sZGVyIiwibGFuZyIsInNlYXJjaFRleHQiLCJjYXB0aW9uRm9ybWF0IiwiY2FwdGlvbkZvcm1hdEFsbFNlbGVjdGVkIiwibm9NYXRjaCIsInRpbWVyIiwiYWpheFN0YXJ0IiwiYXBwZW5kIiwibG9hZGVyIiwid2lkdGgiLCJpbmNyZW1lbnQiLCJzZXRJbnRlcnZhbCIsImNzcyIsImNsZWFySW50ZXJ2YWwiLCJhamF4U3VjY2VzcyIsImZhZGVPdXQiLCJyZW1vdmUiLCJhamF4RXJyb3IiLCJpbnRlcnZhbCIsInRpbWUiLCJidXR0b25TaG93IiwicHJvY2VzcyIsIndpbmRvdyIsInJlc2l6ZSIsIm5hdiIsIm1lbnUiLCJmaW5kIiwibWVudUl0ZW1zIiwibGVuZ3RoIiwibWVudUl0ZW1zV2lkdGgiLCJtYXAiLCJvZmZzZXRXaWR0aCIsIm1lbnVXaWR0aCIsImdldCIsImFkZEJ1dHRvbiIsInNjcm9sbEFjdGl2ZUJ1dHRvbiIsInJlbW92ZUJ1dHRvbiIsImFjdGl2ZUJ1dHRvbiIsImFjdGl2ZUJ1dHRvbk9mZnNldCIsInBvc2l0aW9uIiwibGVmdCIsInNjcm9sbExlZnQiLCJwcmVwZW5kIiwib24iLCJjb25zb2xlIiwibG9nIiwiYW5pbWF0ZSIsImFkZFN3aXBlIiwib2ZmIiwibWFyZ2luIiwibWMiLCJIYW1tZXIiLCJkb21FdmVudHMiLCJlIiwiZGVsdGEiLCJkZWx0YVgiLCJmbiIsImRhdGVwaWNrZXIiLCJsYW5ndWFnZSIsImRheXMiLCJkYXlzU2hvcnQiLCJkYXlzTWluIiwibW9udGhzIiwibW9udGhzU2hvcnQiLCJ0b2RheSIsImNsZWFyIiwiZGF0ZUZvcm1hdCIsInRpbWVGb3JtYXQiLCJmaXJzdERheSIsImpRdWVyeSIsImVhY2giLCJpbmRleCIsImVsIiwidG9kYXlCdXR0b24iLCJEYXRlIiwiYXV0b0Nsb3NlIiwidGltZXBpY2tlciIsImRhdGEiLCJzZWxlY3REYXRlIiwiZ2V0QXR0cmlidXRlIiwicmVwbGFjZSIsImNoYW5nZSIsInNlbGYiLCJjb250YWluZXIiLCJjbG9zZXN0IiwicHJvcCIsInRvb2x0aXAiLCJwb3BvdmVyIiwidHJpZ2dlciIsImh0bWwiLCJjbGljayIsInByZXZlbnREZWZhdWx0IiwiZWxlbWVudCIsInVybCIsInZhbHVlIiwib3B0aW9uIiwiZ2V0SlNPTiIsInJlc3BvbnNlIiwia2V5Iiwic3VtbyIsInJlbG9hZCIsInBhcmVudCIsIm5leHQiLCJob3ZlciIsImxpc3QiLCJsaXN0SGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJvdmVyZmxvdyIsImhlaWdodCIsIm9mZnNldFRvcCIsInBhcmVudE1lbnUiLCJwYXJlbnRzIiwiYWRkQ2xhc3MiLCJtb2RhbF90aXRsZSIsIm1vZGFsX2JvZHkiLCJtb2RhbF93aWR0aCIsInRlbXBsYXRlIiwibWRsIiwibG9jYXRpb24iLCJocmVmIiwiYXR0ciIsImZvcm0iLCJzdWJtaXQiLCJtb2RhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7Ozs7O0FBVUE7OztBQUdBLG1CQUFBQSxDQUFRLDhEQUFSOztBQUVBOzs7QUFHQSxtQkFBQUEsQ0FBUSwyRUFBUjtBQUNBLG1CQUFBQSxDQUFRLGlFQUFSO0FBQ0EsbUJBQUFBLENBQVEsbUVBQVI7QUFDQSxtQkFBQUEsQ0FBUSwrRUFBUjtBQUNBLG1CQUFBQSxDQUFRLDZFQUFSO0FBQ0EsbUJBQUFBLENBQVEsaUVBQVI7O0FBR0E7OztBQUdBQyxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBWTtBQUM1Qjs7O0FBR0FGLElBQUUsUUFBRixFQUFZRyxVQUFaLENBQXVCO0FBQ3JCQyxZQUFRLElBRGE7QUFFckJDLGlC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LEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPLEtBQUs7QUFDdkIsV0FBVyxPQUFPLEtBQUs7QUFDdkIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7O0FBRXpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLFVBQVU7QUFDVixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVB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QUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FB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InNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9hZG1pbi9kZWZhdWx0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9hcHAuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDQzNDAyZjNiNjFiZTA2Y2MwMjUiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxuLyoqXG4gKiBMb2FkIFNDU1MgRGVwZW5kZW5jaWVzXG4gKi9cbnJlcXVpcmUoJy4uL3Njc3MvYXBwLnNjc3MnKTtcblxuLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIE1vZHVsZXNcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbnJlcXVpcmUoJy4vbW9kdWxlcy9kaXJlY3RpdmUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9hamF4Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvbW9kYWwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9jb250ZW50LW5hdicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2RhdGVwaWNrZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9tZW51Jyk7XG5cblxuLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIFBhZ2UgTG9hZFxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQ3VzdG9tIFNlbGVjdFxuICAgKi9cbiAgJCgnc2VsZWN0JykuU3Vtb1NlbGVjdCh7XG4gICAgc2VhcmNoOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiBsYW5nWydzZWFyY2hfcGxhY2Vob2xkZXInXSxcbiAgICBzZWFyY2hUZXh0OiBsYW5nWydzZWFyY2hfdGV4dCddLFxuICAgIGNhcHRpb25Gb3JtYXQ6IGxhbmdbJ3NlbGVjdF9jYXB0aW9uJ10sXG4gICAgY2FwdGlvbkZvcm1hdEFsbFNlbGVjdGVkOiBsYW5nWydzZWxlY3RfY2FwdGlvbl9hbGwnXSxcbiAgICBub01hdGNoOiBsYW5nWydzZWxlY3Rfbm9fbWF0Y2hlcyddXG4gIH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9hcHAuanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDEzIC0gMjAxNiwgT1RUT1NJU1RFTSAoaHR0cDovL290dG9zaXN0ZW0uY29tKVxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNiAtIDIwMTcsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICpcbiAqL1xuXG52YXIgdGltZXI7XG5cbi8qKlxuICogR2xvYmFsIEFqYXggU3RhcnRlZCBIYW5kbGVyXG4gKi9cbiQoZG9jdW1lbnQpLmFqYXhTdGFydChmdW5jdGlvbiAoKSB7XG4gIC8vIFNldCBBamF4IExvYWRlclxuICAkKCcuY29udGVudC13cmFwcGVyJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYWpheC1sb2FkZXJcIj48ZGl2IGNsYXNzPVwiYmFyXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgdmFyIGxvYWRlciA9ICQoJy5hamF4LWxvYWRlciAuYmFyJyk7XG4gIHZhciB3aWR0aCA9IDE1O1xuICB2YXIgaW5jcmVtZW50ID0gNTtcbiAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgd2lkdGggPSB3aWR0aCArIGluY3JlbWVudDtcbiAgICBsb2FkZXIuY3NzKCd3aWR0aCcsIHdpZHRoICsgJyUnKTtcbiAgICBpZiAod2lkdGggPj0gNDApIHtcbiAgICAgIGluY3JlbWVudCA9IDI7XG4gICAgfVxuICAgIGlmICh3aWR0aCA+PSA3MCkge1xuICAgICAgaW5jcmVtZW50ID0gMTtcbiAgICB9XG4gICAgaWYgKHdpZHRoID49IDkwKSB7XG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICB9XG4gIH0sIDUwKTtcbn0pO1xuXG4vKipcbiAqIEdsb2JhbCBBamF4IENvbXBsZXRlZCBIYW5kbGVyXG4gKi9cbiQoZG9jdW1lbnQpLmFqYXhTdWNjZXNzKGZ1bmN0aW9uICgpIHtcbiAgLy8gU3RvcCBUaW1lclxuICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAvLyBTZXQgQWpheCBDb21wbGV0ZVxuICAkKCcuYWpheC1sb2FkZXIgLmJhcicpXG4gICAgLmNzcygnd2lkdGgnLCAnMTAwJScpO1xuXG4gIC8vIFJlbW92ZSBBamF4IExvYWRlclxuICAkKCcuYWpheC1sb2FkZXInKS5mYWRlT3V0KDI1MCwgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucmVtb3ZlKCk7XG4gIH0pO1xufSk7XG5cbi8qKlxuICogR2xvYmFsIEFqYXggQ29tcGxldGVkIEhhbmRsZXJcbiAqL1xuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uICgpIHtcbiAgLy8gU3RvcCBUaW1lclxuICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAvLyBTZXQgQWpheCBEYW5nZXIgJiBDb21wbGV0ZVxuICAkKCcuYWpheC1sb2FkZXIgLmJhcicpXG4gICAgLmNzcygnYmFja2dyb3VuZCcsICdyZWQnKVxuICAgIC5jc3MoJ2JveC1zaGFkb3cnLCAnMCAwIDVweCAjZmQ0NjQ2JylcbiAgICAuY3NzKCd3aWR0aCcsICcxMDAlJyk7XG5cbiAgLy8gUmVtb3ZlIEFqYXggTG9hZGVyXG4gICQoJy5hamF4LWxvYWRlcicpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2FqYXguanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxucmVxdWlyZSgnaGFtbWVyanMnKTtcblxudmFyIGludGVydmFsID0gbnVsbDtcbnZhciB0aW1lID0gMTAwO1xudmFyIGJ1dHRvblNob3cgPSBmYWxzZTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIC8vIFN0YXJ0IEZpcnN0IFJ1blxuICBpbnRlcnZhbCA9IHNldEludGVydmFsKHByb2Nlc3MsIHRpbWUpO1xuXG4gIC8vIFJlc3RhcnQgV2luZG93IFJlc2l6ZVxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaW50ZXJ2YWwgPT09IG51bGwpIHtcbiAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwocHJvY2VzcywgdGltZSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vKipcbiAqIFByb2Nlc3MgU2Nyb2xsZXIgQnV0dG9uXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gIHZhciBuYXYgPSAkKCcjY29udGVudF9uYXYnKTtcbiAgdmFyIG1lbnUgPSBuYXYuZmluZCgnLm5hdicpO1xuICB2YXIgbWVudUl0ZW1zID0gbWVudS5maW5kKCc+IGxpJyk7XG5cbiAgaWYgKG1lbnUubGVuZ3RoKSB7XG4gICAgLy8gRmluZCBFbGVtZW50IFdpZHRoXG4gICAgdmFyIG1lbnVJdGVtc1dpZHRoID0gMDtcbiAgICBtZW51SXRlbXMubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lbnVJdGVtc1dpZHRoICs9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBPdmVyZmxvd1xuICAgIHZhciBtZW51V2lkdGggPSBtZW51LmdldCgwKS5vZmZzZXRXaWR0aDtcbiAgICBpZiAobWVudUl0ZW1zV2lkdGggPiBtZW51V2lkdGgpIHtcbiAgICAgIGFkZEJ1dHRvbihuYXYsIG1lbnUsIG1lbnVXaWR0aCk7XG4gICAgICBzY3JvbGxBY3RpdmVCdXR0b24obWVudVdpZHRoLCBtZW51KVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVCdXR0b24obmF2KTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIENMZWFyIEludGVydmFsXG4gIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICBpbnRlcnZhbCA9IG51bGw7XG59XG5cbi8qKlxuICogQWN0aXZlIEJ1dHRvbiBTY3JvbGxlclxuICogQHBhcmFtIG1lbnVXaWR0aFxuICogQHBhcmFtIG1lbnVcbiAqL1xuZnVuY3Rpb24gc2Nyb2xsQWN0aXZlQnV0dG9uKG1lbnVXaWR0aCwgbWVudSkge1xuICB2YXIgYWN0aXZlQnV0dG9uID0gbWVudS5maW5kKCdsaS5hY3RpdmUnKTtcbiAgdmFyIGFjdGl2ZUJ1dHRvbk9mZnNldCA9IGFjdGl2ZUJ1dHRvbi5wb3NpdGlvbigpLmxlZnQgKyBhY3RpdmVCdXR0b24ud2lkdGgoKTtcblxuICAvLyBDaGVjayBPdmVyZmxvd1xuICBpZiAoYWN0aXZlQnV0dG9uT2Zmc2V0ID4gbWVudVdpZHRoKSB7XG4gICAgbWVudS5zY3JvbGxMZWZ0KG1lbnUuc2Nyb2xsTGVmdCgpICsgKGFjdGl2ZUJ1dHRvbk9mZnNldCAtIG1lbnVXaWR0aCkpO1xuICB9XG59XG5cbi8qKlxuICogQWRkIFNjcm9sbGVyIEJ1dHRvblxuICogQHBhcmFtIG5hdlxuICogQHBhcmFtIG1lbnVcbiAqIEBwYXJhbSBtZW51V2lkdGhcbiAqL1xuZnVuY3Rpb24gYWRkQnV0dG9uKG5hdiwgbWVudSwgbWVudVdpZHRoKSB7XG4gIGlmIChidXR0b25TaG93ID09PSBmYWxzZSkge1xuICAgIG5hdi5wcmVwZW5kKCc8ZGl2IGlkPVwic2Nyb2xsZXJcIj48YSBjbGFzcz1cImxlZnRcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+bmF2aWdhdGVfYmVmb3JlPC9pPjwvYT48YSBjbGFzcz1cInJpZ2h0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPm5hdmlnYXRlX25leHQ8L2k+PC9hPjwvZGl2PicpO1xuXG4gICAgLy8gRW5hYmxlZCBCdXR0b25cbiAgICBidXR0b25TaG93ID0gdHJ1ZTtcblxuICAgIC8vIEVuYWJsZWQgRXZlbnRcbiAgICAkKCcjc2Nyb2xsZXInKVxuICAgICAgLm9uKCdjbGljaycsICcubGVmdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2cobWVudVdpZHRoKTtcbiAgICAgICAgbWVudS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBtZW51LnNjcm9sbExlZnQoKSAtIChtZW51V2lkdGggLyAxLjcpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLm9uKCdjbGljaycsICcucmlnaHQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1lbnUuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogbWVudS5zY3JvbGxMZWZ0KCkgKyAobWVudVdpZHRoIC8gMS43KVxuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAvLyBFbmFibGVkIFN3aXBlXG4gICAgYWRkU3dpcGUobWVudSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgU2Nyb2xsZXIgQnV0dG9uXG4gKiBAcGFyYW0gbmF2XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJ1dHRvbihuYXYpIHtcbiAgaWYgKGJ1dHRvblNob3cgPT09IHRydWUpIHtcbiAgICAvLyBEaXNhYmxlZCBCdXR0b25cbiAgICBidXR0b25TaG93ID0gZmFsc2U7XG5cbiAgICAvLyBSZW1vdmUgU2Nyb2xsZXIgQnV0dG9uXG4gICAgbmF2LmZpbmQoJyNzY3JvbGxlcicpLnJlbW92ZSgpO1xuXG4gICAgLy8gRGlzYWJsZSBFdmVudFxuICAgICQoJyNzY3JvbGxlcicpXG4gICAgICAub2ZmKCdjbGljaycsICcubGVmdCcpXG4gICAgICAub2ZmKCdjbGljaycsICcucmlnaHQnKVxuICB9XG59XG5cbi8qKlxuICogU3dpcGUgTWVudVxuICogQHBhcmFtIG1lbnVcbiAqL1xuZnVuY3Rpb24gYWRkU3dpcGUobWVudSkge1xuICB2YXIgbWFyZ2luO1xuICB2YXIgbWMgPSBuZXcgSGFtbWVyKG1lbnUuZ2V0KDApLCB7XG4gICAgZG9tRXZlbnRzOiB0cnVlXG4gIH0pO1xuXG4gIG1jXG4gICAgLm9uKFwicGFuc3RhcnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1hcmdpbiA9IC0xICogbWVudS5zY3JvbGxMZWZ0KCk7XG4gICAgfSlcbiAgICAub24oXCJwYW5cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBkZWx0YSA9IG1hcmdpbiArIGUuZGVsdGFYO1xuICAgICAgbWVudS5zY3JvbGxMZWZ0KC0xICogZGVsdGEpO1xuICAgIH0pXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvY29udGVudC1uYXYuanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxuLy8gTG9hZCBBaXIgRGF0ZXBpY2tlclxucmVxdWlyZSgnYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9kYXRlcGlja2VyLm1pbicpO1xucmVxdWlyZSgnYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9pMThuL2RhdGVwaWNrZXIuZW4nKTtcblxuLy8gQ3VzdG9tIExhbmd1YWdlXG4oZnVuY3Rpb24gKCQpIHtcbiAgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlWyd0ciddID0ge1xuICAgIGRheXM6IFsnUGF6YXInLCAnUGF6YXJ0ZXNpJywgJ1NhbMSxJywgJ8OHYXLFn2FtYmEnLCAnUGVyxZ9lbWJlJywgJ0N1bWEnLCAnQ3VtYXJ0ZXNpJ10sXG4gICAgZGF5c1Nob3J0OiBbJ1B6cicsICdQdHMnLCAnU2FsJywgJ8OHcsWfJywgJ1ByxZ8nLCAnQ3VtJywgJ0N0cyddLFxuICAgIGRheXNNaW46IFsnUHonLCAnUHQnLCAnU2wnLCAnw4dyJywgJ1ByJywgJ0NtJywgJ0N0J10sXG4gICAgbW9udGhzOiBbJ09jYWsnLCAnxZ51YmF0JywgJ01hcnQnLCAnTmlzYW4nLCAnTWF5xLFzJywgJ0hhesSxcmFuJywgJ1RlbW11eicsICdBxJ91c3RvcycsICdFeWzDvGwnLCAnRWtpbScsICdLYXPEsW0nLCAnQXJhbMSxayddLFxuICAgIG1vbnRoc1Nob3J0OiBbJ09jYScsICfFnnViJywgJ01hcicsICdOaXMnLCAnTWF5JywgJ0hheicsICdUZW0nLCAnQcSfdScsICdFeWwnLCAnRWtpJywgJ0thcycsICdBcmEnXSxcbiAgICB0b2RheTogJ0J1Z8O8bicsXG4gICAgY2xlYXI6ICdUZW1pemxlJyxcbiAgICBkYXRlRm9ybWF0OiAnbW0vZGQveXl5eScsXG4gICAgdGltZUZvcm1hdDogJ2hoOmlpIGFhJyxcbiAgICBmaXJzdERheTogMFxuICB9O1xufSkoalF1ZXJ5KTtcblxuLy8gTG9hZCBEYXRlIFRpbWUgUGlja2VyXG4kKGZ1bmN0aW9uICgpIHtcbiAgJC5lYWNoKCQoJ1tkYXRhLXBpY2tlcj1kYXRlXScpLCBmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgJChlbClcbiAgICAgIC5kYXRlcGlja2VyKHtcbiAgICAgICAgdG9kYXlCdXR0b246IG5ldyBEYXRlKCksXG4gICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICd0cicsXG4gICAgICAgIHBvc2l0aW9uOiAndG9wIGxlZnQnLFxuICAgICAgICBkYXRlRm9ybWF0OiAneXl5eS1tbS1kZCcsXG4gICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gICAgICAgIHRpbWVwaWNrZXI6IGZhbHNlXG4gICAgICB9KVxuICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxuICAgICAgLnNlbGVjdERhdGUobmV3IERhdGUoZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpKSk7XG4gIH0pO1xuXG4gICQuZWFjaCgkKCdbZGF0YS1waWNrZXI9ZGF0ZXRpbWVdJyksIGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAkKGVsKVxuICAgICAgLmRhdGVwaWNrZXIoe1xuICAgICAgICB0b2RheUJ1dHRvbjogbmV3IERhdGUoKSxcbiAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxuICAgICAgICBsYW5ndWFnZTogJ3RyJyxcbiAgICAgICAgcG9zaXRpb246ICd0b3AgbGVmdCcsXG4gICAgICAgIGRhdGVGb3JtYXQ6ICd5eXl5LW1tLWRkJyxcbiAgICAgICAgdGltZUZvcm1hdDogJ2hoOmlpJyxcbiAgICAgICAgdGltZXBpY2tlcjogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcbiAgICAgIC5zZWxlY3REYXRlKG5ldyBEYXRlKGVsLmdldEF0dHJpYnV0ZSgndmFsdWUnKS5yZXBsYWNlKC9cXHMvLCAnVCcpKSk7XG4gIH0pO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvbW9kdWxlcy9kYXRlcGlja2VyLmpzIiwiLypcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBFbWxha1BSTyBwYWNrYWdlLlxuICpcbiAqIEBwYWNrYWdlICAgICBFbWxha1BST1xuICogQGF1dGhvciAgICAgIFJhbWF6YW4gQVBBWURJTiA8aWxldGlzaW1AcmFtYXphbmFwYXlkaW4uY29tPlxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNyAtIDIwMTgsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIFNlbGVjdCBBbGwgQ2hlY2tib3hcbiAgICovXG4gICQoXCJbZGF0YS1zZWxlY3QtYWxsXVwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICB2YXIgY29udGFpbmVyID0gc2VsZi5jbG9zZXN0KHNlbGYuZGF0YSgnc2VsZWN0LWFsbCcpKTtcbiAgICBzZWxmLnByb3AoJ2NoZWNrZWQnLCAoc2VsZi5wcm9wKCdjaGVja2VkJykgPT0gbnVsbCB8fCBzZWxmLnByb3AoJ2NoZWNrZWQnKSA9PSB0cnVlKSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgY29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJykucHJvcCgnY2hlY2tlZCcsICFzZWxmLnByb3AoJ2NoZWNrZWQnKSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBCb290c3RyYXAgVG9vbHRpcCBBY3RpdmF0ZVxuICAgKi9cbiAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXSwgW2RhdGEtdG9vbHRpcF0nKS50b29sdGlwKCk7XG5cblxuICAvKipcbiAgICogQm9vdHN0cmFwIFBvcG92ZXJcbiAgICovXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKVxuICAgIC5wb3BvdmVyKHtcbiAgICAgIHRyaWdnZXI6ICdmb2N1cycsXG4gICAgICBodG1sOiB0cnVlXG4gICAgfSlcbiAgICAuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gIC8qKlxuICAgKiBFbGVtZW50IENoYW5nZSBFdmVudCB0byBPdGhlciBFbGVtZW50XG4gICAqL1xuICAkKCdbZGF0YS1jaGFuZ2VdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWNoYW5nZScpO1xuICAgIHZhciB1cmwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1jaGFuZ2UtdXJsJykgKyAnLycgKyB0aGlzLnZhbHVlO1xuXG4gICAgLy8gU2VuZCBBamF4XG4gICAgdmFyIG9wdGlvbiA9ICcnO1xuICAgICQuZ2V0SlNPTih1cmwsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgJC5lYWNoKHJlc3BvbnNlLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBvcHRpb24gKz0gJzxvcHRpb24gdmFsdWU9XCInICsga2V5ICsgJ1wiPicgKyB2YWx1ZSArICc8L29wdGlvbj4nO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdyaXRlIEVsZW1lbnRcbiAgICAgICQoZWxlbWVudCkuaHRtbChvcHRpb24pO1xuXG4gICAgICAvLyBSZWxvYWQgU3Vtb3NlbGVjdFxuICAgICAgJChlbGVtZW50KVswXS5zdW1vLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogUmFuZ2UgVmFsdWUgV3JpdGVyXG4gICAqL1xuICAkKGRvY3VtZW50KS5vbignaW5wdXQgY2hhbmdlJywgJ1tkYXRhLXJhbmdlXScsIGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykucGFyZW50KCkubmV4dCgpLmh0bWwodGhpcy52YWx1ZSlcbiAgfSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGlyZWN0aXZlLmpzIiwiJChmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBNYWluIE5hdmlnYXRpb24gQXV0byBQb3NpdGlvblxuICAgKi9cbiAgJCgnI25hdl9tYWluJykuZmluZCgnPiB1bCA+IGxpJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgIHZhciBsaXN0ID0gJCh0aGlzKS5maW5kKCd1bCcpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICB2YXIgbGlzdEhlaWdodCA9IGxpc3Qub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHZhciBvdmVyZmxvdyA9ICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gdGhpcy5vZmZzZXRUb3A7XG5cbiAgICAgIGlmIChvdmVyZmxvdyA8IGxpc3RIZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0VG9wID4gbGlzdEhlaWdodCkge1xuICAgICAgICAgIGxpc3QuY3NzKCd0b3AnLCAnYXV0bycpO1xuICAgICAgICAgIGxpc3QuY3NzKCdib3R0b20nLCAnMCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3QuY3NzKCd0b3AnLCAnLScgKyAobGlzdEhlaWdodCAtIG92ZXJmbG93KSArICdweCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQWN0aXZhdGUgUGFyZW50IE1lbnVzXG4gICAqIEB0eXBlIHsqfGpRdWVyeX1cbiAgICovXG4gIGxldCBwYXJlbnRNZW51ID0gJCgndWxbZGF0YS1wYXJlbnRdJykuZGF0YSgncGFyZW50Jyk7XG5cbiAgLy8gU2VsZWN0IFBhcmVudCBNZW51XG4gIGlmIChwYXJlbnRNZW51KSB7XG4gICAgJChgdWwgYVtocmVmPVwiJHtwYXJlbnRNZW51fVwiXTpub3QoXCJ1bFtkYXRhLXBhcmVudF0gYVwiKTpsYXN0YClcbiAgICAgIC5wYXJlbnRzKCdsaScpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gIH0gZWxzZSB7XG4gICAgJCgndWwgbGkuYWN0aXZlOmxhc3QnKVxuICAgICAgLnBhcmVudHMoJ2xpJylcbiAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL21lbnUuanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAkKCdbZGF0YS1tb2RhbF0nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIC8vIFN0b3AgUHJvcGFnYXRpb25cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBNb2RhbCBWYXJpYWJsZVxuICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICB2YXIgbW9kYWxfdGl0bGUgPSBzZWxmLmRhdGEoJ21vZGFsLXRpdGxlJyksXG4gICAgICBtb2RhbF9ib2R5ID0gc2VsZi5kYXRhKCdtb2RhbC1ib2R5JyksXG4gICAgICBtb2RhbF93aWR0aCA9IHNlbGYuZGF0YSgnbW9kYWwtd2lkdGgnKSxcbiAgICAgIHRlbXBsYXRlID1cbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmYWRlIG1vZGFsIGNvbmZpcm1cIiBpZD1cImNvbmZpcm1Nb2RhbFwiIHRhYmluZGV4PVwiLTFcIj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyB7bW9kYWxXaWR0aH1cIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPjxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPnttb2RhbFRpdGxlfTwvaT48L2g0PjwvZGl2PicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj57bW9kYWxCb2R5fTwvZGl2PicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImJ0bk5vXCIgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtcHJpbWFyeSBub1wiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+e2J0bk5vfTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImJ0blllc1wiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIHllc1wiID57YnRuWWVzfTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JztcblxuICAgIC8vIFNldCBDb250ZW50XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7bW9kYWxUaXRsZX0nLCBtb2RhbF90aXRsZSA/IG1vZGFsX3RpdGxlIDogJ3dhcm5pbmcnKTtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoJ3ttb2RhbEJvZHl9JywgbW9kYWxfYm9keSA/IG1vZGFsX2JvZHkgOiBsYW5nWydwb3B1cF9kZWxldGVfbWVzc2FnZSddKTtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoJ3tidG5Ob30nLCBsYW5nWydidG5fY2xvc2UnXSk7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7YnRuWWVzfScsIGxhbmdbJ2J0bl95ZXMnXSk7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7bW9kYWxXaWR0aH0nLCBtb2RhbF93aWR0aCA/IG1vZGFsX3dpZHRoIDogJ21vZGFsLXNtJyk7XG5cbiAgICAvLyBXcml0ZVxuICAgIHZhciBtZGwgPSAkKCcjbW9kYWxzJykuaHRtbCh0ZW1wbGF0ZSk7XG5cbiAgICAvKipcbiAgICAgKiBDb25maXJtXG4gICAgICovXG4gICAgaWYgKHNlbGYuZGF0YSgnbW9kYWwnKSA9PT0gJ2NvbmZpcm0nKSB7XG4gICAgICBtZGwub2ZmKCdjbGljaycsICcjYnRuWWVzJyk7XG4gICAgICBtZGwub24oJ2NsaWNrJywgJyNidG5ZZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc2VsZi5hdHRyKCdocmVmJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maXJtIEZvcm0gU3VibWl0XG4gICAgICovXG4gICAgaWYgKHNlbGYuZGF0YSgnbW9kYWwnKSA9PT0gJ2NvbmZpcm0tZm9ybScpIHtcbiAgICAgIG1kbC5vZmYoJ2NsaWNrJywgJyNidG5ZZXMnKTtcbiAgICAgIG1kbC5vbignY2xpY2snLCAnI2J0blllcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZvcm0gPSAkKHNlbGYuZGF0YSgnZm9ybScpKTtcbiAgICAgICAgZm9ybS5hdHRyKCdhY3Rpb24nLCBzZWxmLmF0dHIoJ2hyZWYnKSA/IHNlbGYuYXR0cignaHJlZicpIDogc2VsZi5kYXRhKCdocmVmJykpO1xuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5mb1xuICAgICAqL1xuICAgIGlmIChzZWxmLmRhdGEoJ21vZGFsJykgPT09ICdpbmZvJykge1xuICAgICAgY29uc29sZS5sb2cobWRsKTtcbiAgICAgICQobWRsKS5maW5kKCcjYnRuWWVzJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gU2hvdyBNb2RhbFxuICAgICQoJyNjb25maXJtTW9kYWwnKS5tb2RhbCgpO1xuICB9KTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvbW9kdWxlcy9tb2RhbC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9zY3NzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L3Njc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiIWZ1bmN0aW9uKHQsZSxpKXshZnVuY3Rpb24oKXt2YXIgcyxhLG4saD1cIjIuMi4zXCIsbz1cImRhdGVwaWNrZXJcIixyPVwiLmRhdGVwaWNrZXItaGVyZVwiLGM9ITEsZD0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJcIj48aSBjbGFzcz1cImRhdGVwaWNrZXItLXBvaW50ZXJcIj48L2k+PG5hdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdlwiPjwvbmF2PjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1jb250ZW50XCI+PC9kaXY+PC9kaXY+JyxsPXtjbGFzc2VzOlwiXCIsaW5saW5lOiExLGxhbmd1YWdlOlwicnVcIixzdGFydERhdGU6bmV3IERhdGUsZmlyc3REYXk6XCJcIix3ZWVrZW5kczpbNiwwXSxkYXRlRm9ybWF0OlwiXCIsYWx0RmllbGQ6XCJcIixhbHRGaWVsZERhdGVGb3JtYXQ6XCJAXCIsdG9nZ2xlU2VsZWN0ZWQ6ITAsa2V5Ym9hcmROYXY6ITAscG9zaXRpb246XCJib3R0b20gbGVmdFwiLG9mZnNldDoxMix2aWV3OlwiZGF5c1wiLG1pblZpZXc6XCJkYXlzXCIsc2hvd090aGVyTW9udGhzOiEwLHNlbGVjdE90aGVyTW9udGhzOiEwLG1vdmVUb090aGVyTW9udGhzT25TZWxlY3Q6ITAsc2hvd090aGVyWWVhcnM6ITAsc2VsZWN0T3RoZXJZZWFyczohMCxtb3ZlVG9PdGhlclllYXJzT25TZWxlY3Q6ITAsbWluRGF0ZTpcIlwiLG1heERhdGU6XCJcIixkaXNhYmxlTmF2V2hlbk91dE9mUmFuZ2U6ITAsbXVsdGlwbGVEYXRlczohMSxtdWx0aXBsZURhdGVzU2VwYXJhdG9yOlwiLFwiLHJhbmdlOiExLHRvZGF5QnV0dG9uOiExLGNsZWFyQnV0dG9uOiExLHNob3dFdmVudDpcImZvY3VzXCIsYXV0b0Nsb3NlOiExLG1vbnRoc0ZpZWxkOlwibW9udGhzU2hvcnRcIixwcmV2SHRtbDonPHN2Zz48cGF0aCBkPVwiTSAxNywxMiBsIC01LDUgbCA1LDVcIj48L3BhdGg+PC9zdmc+JyxuZXh0SHRtbDonPHN2Zz48cGF0aCBkPVwiTSAxNCwxMiBsIDUsNSBsIC01LDVcIj48L3BhdGg+PC9zdmc+JyxuYXZUaXRsZXM6e2RheXM6XCJNTSwgPGk+eXl5eTwvaT5cIixtb250aHM6XCJ5eXl5XCIseWVhcnM6XCJ5eXl5MSAtIHl5eXkyXCJ9LHRpbWVwaWNrZXI6ITEsb25seVRpbWVwaWNrZXI6ITEsZGF0ZVRpbWVTZXBhcmF0b3I6XCIgXCIsdGltZUZvcm1hdDpcIlwiLG1pbkhvdXJzOjAsbWF4SG91cnM6MjQsbWluTWludXRlczowLG1heE1pbnV0ZXM6NTksaG91cnNTdGVwOjEsbWludXRlc1N0ZXA6MSxvblNlbGVjdDpcIlwiLG9uU2hvdzpcIlwiLG9uSGlkZTpcIlwiLG9uQ2hhbmdlTW9udGg6XCJcIixvbkNoYW5nZVllYXI6XCJcIixvbkNoYW5nZURlY2FkZTpcIlwiLG9uQ2hhbmdlVmlldzpcIlwiLG9uUmVuZGVyQ2VsbDpcIlwifSx1PXtjdHJsUmlnaHQ6WzE3LDM5XSxjdHJsVXA6WzE3LDM4XSxjdHJsTGVmdDpbMTcsMzddLGN0cmxEb3duOlsxNyw0MF0sc2hpZnRSaWdodDpbMTYsMzldLHNoaWZ0VXA6WzE2LDM4XSxzaGlmdExlZnQ6WzE2LDM3XSxzaGlmdERvd246WzE2LDQwXSxhbHRVcDpbMTgsMzhdLGFsdFJpZ2h0OlsxOCwzOV0sYWx0TGVmdDpbMTgsMzddLGFsdERvd246WzE4LDQwXSxjdHJsU2hpZnRVcDpbMTYsMTcsMzhdfSxtPWZ1bmN0aW9uKHQsYSl7dGhpcy5lbD10LHRoaXMuJGVsPWUodCksdGhpcy5vcHRzPWUuZXh0ZW5kKCEwLHt9LGwsYSx0aGlzLiRlbC5kYXRhKCkpLHM9PWkmJihzPWUoXCJib2R5XCIpKSx0aGlzLm9wdHMuc3RhcnREYXRlfHwodGhpcy5vcHRzLnN0YXJ0RGF0ZT1uZXcgRGF0ZSksXCJJTlBVVFwiPT10aGlzLmVsLm5vZGVOYW1lJiYodGhpcy5lbElzSW5wdXQ9ITApLHRoaXMub3B0cy5hbHRGaWVsZCYmKHRoaXMuJGFsdEZpZWxkPVwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLm9wdHMuYWx0RmllbGQ/ZSh0aGlzLm9wdHMuYWx0RmllbGQpOnRoaXMub3B0cy5hbHRGaWVsZCksdGhpcy5pbml0ZWQ9ITEsdGhpcy52aXNpYmxlPSExLHRoaXMuc2lsZW50PSExLHRoaXMuY3VycmVudERhdGU9dGhpcy5vcHRzLnN0YXJ0RGF0ZSx0aGlzLmN1cnJlbnRWaWV3PXRoaXMub3B0cy52aWV3LHRoaXMuX2NyZWF0ZVNob3J0Q3V0cygpLHRoaXMuc2VsZWN0ZWREYXRlcz1bXSx0aGlzLnZpZXdzPXt9LHRoaXMua2V5cz1bXSx0aGlzLm1pblJhbmdlPVwiXCIsdGhpcy5tYXhSYW5nZT1cIlwiLHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlPVwiXCIsdGhpcy5pbml0KCl9O249bSxuLnByb3RvdHlwZT17VkVSU0lPTjpoLHZpZXdJbmRleGVzOltcImRheXNcIixcIm1vbnRoc1wiLFwieWVhcnNcIl0saW5pdDpmdW5jdGlvbigpe2N8fHRoaXMub3B0cy5pbmxpbmV8fCF0aGlzLmVsSXNJbnB1dHx8dGhpcy5fYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcigpLHRoaXMuX2J1aWxkQmFzZUh0bWwoKSx0aGlzLl9kZWZpbmVMb2NhbGUodGhpcy5vcHRzLmxhbmd1YWdlKSx0aGlzLl9zeW5jV2l0aE1pbk1heERhdGVzKCksdGhpcy5lbElzSW5wdXQmJih0aGlzLm9wdHMuaW5saW5lfHwodGhpcy5fc2V0UG9zaXRpb25DbGFzc2VzKHRoaXMub3B0cy5wb3NpdGlvbiksdGhpcy5fYmluZEV2ZW50cygpKSx0aGlzLm9wdHMua2V5Ym9hcmROYXYmJiF0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJnRoaXMuX2JpbmRLZXlib2FyZEV2ZW50cygpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZWRvd25cIix0aGlzLl9vbk1vdXNlRG93bkRhdGVwaWNrZXIuYmluZCh0aGlzKSksdGhpcy4kZGF0ZXBpY2tlci5vbihcIm1vdXNldXBcIix0aGlzLl9vbk1vdXNlVXBEYXRlcGlja2VyLmJpbmQodGhpcykpKSx0aGlzLm9wdHMuY2xhc3NlcyYmdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdHMuY2xhc3NlcyksdGhpcy5vcHRzLnRpbWVwaWNrZXImJih0aGlzLnRpbWVwaWNrZXI9bmV3IGUuZm4uZGF0ZXBpY2tlci5UaW1lcGlja2VyKHRoaXMsdGhpcy5vcHRzKSx0aGlzLl9iaW5kVGltZXBpY2tlckV2ZW50cygpKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXImJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoXCItb25seS10aW1lcGlja2VyLVwiKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddPW5ldyBlLmZuLmRhdGVwaWNrZXIuQm9keSh0aGlzLHRoaXMuY3VycmVudFZpZXcsdGhpcy5vcHRzKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLnNob3coKSx0aGlzLm5hdj1uZXcgZS5mbi5kYXRlcGlja2VyLk5hdmlnYXRpb24odGhpcyx0aGlzLm9wdHMpLHRoaXMudmlldz10aGlzLmN1cnJlbnRWaWV3LHRoaXMuJGVsLm9uKFwiY2xpY2tDZWxsLmFkcFwiLHRoaXMuX29uQ2xpY2tDZWxsLmJpbmQodGhpcykpLHRoaXMuJGRhdGVwaWNrZXIub24oXCJtb3VzZWVudGVyXCIsXCIuZGF0ZXBpY2tlci0tY2VsbFwiLHRoaXMuX29uTW91c2VFbnRlckNlbGwuYmluZCh0aGlzKSksdGhpcy4kZGF0ZXBpY2tlci5vbihcIm1vdXNlbGVhdmVcIixcIi5kYXRlcGlja2VyLS1jZWxsXCIsdGhpcy5fb25Nb3VzZUxlYXZlQ2VsbC5iaW5kKHRoaXMpKSx0aGlzLmluaXRlZD0hMH0sX2NyZWF0ZVNob3J0Q3V0czpmdW5jdGlvbigpe3RoaXMubWluRGF0ZT10aGlzLm9wdHMubWluRGF0ZT90aGlzLm9wdHMubWluRGF0ZTpuZXcgRGF0ZSgtODYzOTk5OTkxMzZlNSksdGhpcy5tYXhEYXRlPXRoaXMub3B0cy5tYXhEYXRlP3RoaXMub3B0cy5tYXhEYXRlOm5ldyBEYXRlKDg2Mzk5OTk5MTM2ZTUpfSxfYmluZEV2ZW50czpmdW5jdGlvbigpe3RoaXMuJGVsLm9uKHRoaXMub3B0cy5zaG93RXZlbnQrXCIuYWRwXCIsdGhpcy5fb25TaG93RXZlbnQuYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJtb3VzZXVwLmFkcFwiLHRoaXMuX29uTW91c2VVcEVsLmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwiYmx1ci5hZHBcIix0aGlzLl9vbkJsdXIuYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJrZXl1cC5hZHBcIix0aGlzLl9vbktleVVwR2VuZXJhbC5iaW5kKHRoaXMpKSxlKHQpLm9uKFwicmVzaXplLmFkcFwiLHRoaXMuX29uUmVzaXplLmJpbmQodGhpcykpLGUoXCJib2R5XCIpLm9uKFwibW91c2V1cC5hZHBcIix0aGlzLl9vbk1vdXNlVXBCb2R5LmJpbmQodGhpcykpfSxfYmluZEtleWJvYXJkRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy4kZWwub24oXCJrZXlkb3duLmFkcFwiLHRoaXMuX29uS2V5RG93bi5iaW5kKHRoaXMpKSx0aGlzLiRlbC5vbihcImtleXVwLmFkcFwiLHRoaXMuX29uS2V5VXAuYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJob3RLZXkuYWRwXCIsdGhpcy5fb25Ib3RLZXkuYmluZCh0aGlzKSl9LF9iaW5kVGltZXBpY2tlckV2ZW50czpmdW5jdGlvbigpe3RoaXMuJGVsLm9uKFwidGltZUNoYW5nZS5hZHBcIix0aGlzLl9vblRpbWVDaGFuZ2UuYmluZCh0aGlzKSl9LGlzV2Vla2VuZDpmdW5jdGlvbih0KXtyZXR1cm4tMSE9PXRoaXMub3B0cy53ZWVrZW5kcy5pbmRleE9mKHQpfSxfZGVmaW5lTG9jYWxlOmZ1bmN0aW9uKHQpe1wic3RyaW5nXCI9PXR5cGVvZiB0Pyh0aGlzLmxvYz1lLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbdF0sdGhpcy5sb2N8fChjb25zb2xlLndhcm4oXCJDYW4ndCBmaW5kIGxhbmd1YWdlIFxcXCJcIit0KydcIiBpbiBEYXRlcGlja2VyLmxhbmd1YWdlLCB3aWxsIHVzZSBcInJ1XCIgaW5zdGVhZCcpLHRoaXMubG9jPWUuZXh0ZW5kKCEwLHt9LGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSkpLHRoaXMubG9jPWUuZXh0ZW5kKCEwLHt9LGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbdF0pKTp0aGlzLmxvYz1lLmV4dGVuZCghMCx7fSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2UucnUsdCksdGhpcy5vcHRzLmRhdGVGb3JtYXQmJih0aGlzLmxvYy5kYXRlRm9ybWF0PXRoaXMub3B0cy5kYXRlRm9ybWF0KSx0aGlzLm9wdHMudGltZUZvcm1hdCYmKHRoaXMubG9jLnRpbWVGb3JtYXQ9dGhpcy5vcHRzLnRpbWVGb3JtYXQpLFwiXCIhPT10aGlzLm9wdHMuZmlyc3REYXkmJih0aGlzLmxvYy5maXJzdERheT10aGlzLm9wdHMuZmlyc3REYXkpLHRoaXMub3B0cy50aW1lcGlja2VyJiYodGhpcy5sb2MuZGF0ZUZvcm1hdD1bdGhpcy5sb2MuZGF0ZUZvcm1hdCx0aGlzLmxvYy50aW1lRm9ybWF0XS5qb2luKHRoaXMub3B0cy5kYXRlVGltZVNlcGFyYXRvcikpLHRoaXMub3B0cy5vbmx5VGltZXBpY2tlciYmKHRoaXMubG9jLmRhdGVGb3JtYXQ9dGhpcy5sb2MudGltZUZvcm1hdCk7dmFyIGk9dGhpcy5fZ2V0V29yZEJvdW5kYXJ5UmVnRXhwOyh0aGlzLmxvYy50aW1lRm9ybWF0Lm1hdGNoKGkoXCJhYVwiKSl8fHRoaXMubG9jLnRpbWVGb3JtYXQubWF0Y2goaShcIkFBXCIpKSkmJih0aGlzLmFtcG09ITApfSxfYnVpbGREYXRlcGlja2Vyc0NvbnRhaW5lcjpmdW5jdGlvbigpe2M9ITAscy5hcHBlbmQoJzxkaXYgY2xhc3M9XCJkYXRlcGlja2Vycy1jb250YWluZXJcIiBpZD1cImRhdGVwaWNrZXJzLWNvbnRhaW5lclwiPjwvZGl2PicpLGE9ZShcIiNkYXRlcGlja2Vycy1jb250YWluZXJcIil9LF9idWlsZEJhc2VIdG1sOmZ1bmN0aW9uKCl7dmFyIHQsaT1lKCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1pbmxpbmVcIj4nKTt0PVwiSU5QVVRcIj09dGhpcy5lbC5ub2RlTmFtZT90aGlzLm9wdHMuaW5saW5lP2kuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpOmE6aS5hcHBlbmRUbyh0aGlzLiRlbCksdGhpcy4kZGF0ZXBpY2tlcj1lKGQpLmFwcGVuZFRvKHQpLHRoaXMuJGNvbnRlbnQ9ZShcIi5kYXRlcGlja2VyLS1jb250ZW50XCIsdGhpcy4kZGF0ZXBpY2tlciksdGhpcy4kbmF2PWUoXCIuZGF0ZXBpY2tlci0tbmF2XCIsdGhpcy4kZGF0ZXBpY2tlcil9LF90cmlnZ2VyT25DaGFuZ2U6ZnVuY3Rpb24oKXtpZighdGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCl7aWYoXCJcIj09PXRoaXMuX3ByZXZPblNlbGVjdFZhbHVlKXJldHVybjtyZXR1cm4gdGhpcy5fcHJldk9uU2VsZWN0VmFsdWU9XCJcIix0aGlzLm9wdHMub25TZWxlY3QoXCJcIixcIlwiLHRoaXMpfXZhciB0LGU9dGhpcy5zZWxlY3RlZERhdGVzLGk9bi5nZXRQYXJzZWREYXRlKGVbMF0pLHM9dGhpcyxhPW5ldyBEYXRlKGkueWVhcixpLm1vbnRoLGkuZGF0ZSxpLmhvdXJzLGkubWludXRlcyk7dD1lLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gcy5mb3JtYXREYXRlKHMubG9jLmRhdGVGb3JtYXQsdCl9KS5qb2luKHRoaXMub3B0cy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKSwodGhpcy5vcHRzLm11bHRpcGxlRGF0ZXN8fHRoaXMub3B0cy5yYW5nZSkmJihhPWUubWFwKGZ1bmN0aW9uKHQpe3ZhciBlPW4uZ2V0UGFyc2VkRGF0ZSh0KTtyZXR1cm4gbmV3IERhdGUoZS55ZWFyLGUubW9udGgsZS5kYXRlLGUuaG91cnMsZS5taW51dGVzKX0pKSx0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZT10LHRoaXMub3B0cy5vblNlbGVjdCh0LGEsdGhpcyl9LG5leHQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnBhcnNlZERhdGUsZT10aGlzLm9wdHM7c3dpdGNoKHRoaXMudmlldyl7Y2FzZVwiZGF5c1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIsdC5tb250aCsxLDEpLGUub25DaGFuZ2VNb250aCYmZS5vbkNoYW5nZU1vbnRoKHRoaXMucGFyc2VkRGF0ZS5tb250aCx0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwibW9udGhzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhcisxLHQubW9udGgsMSksZS5vbkNoYW5nZVllYXImJmUub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTticmVhaztjYXNlXCJ5ZWFyc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIrMTAsMCwxKSxlLm9uQ2hhbmdlRGVjYWRlJiZlLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKX19LHByZXY6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLnBhcnNlZERhdGUsZT10aGlzLm9wdHM7c3dpdGNoKHRoaXMudmlldyl7Y2FzZVwiZGF5c1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXIsdC5tb250aC0xLDEpLGUub25DaGFuZ2VNb250aCYmZS5vbkNoYW5nZU1vbnRoKHRoaXMucGFyc2VkRGF0ZS5tb250aCx0aGlzLnBhcnNlZERhdGUueWVhcik7YnJlYWs7Y2FzZVwibW9udGhzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhci0xLHQubW9udGgsMSksZS5vbkNoYW5nZVllYXImJmUub25DaGFuZ2VZZWFyKHRoaXMucGFyc2VkRGF0ZS55ZWFyKTticmVhaztjYXNlXCJ5ZWFyc1wiOnRoaXMuZGF0ZT1uZXcgRGF0ZSh0LnllYXItMTAsMCwxKSxlLm9uQ2hhbmdlRGVjYWRlJiZlLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKX19LGZvcm1hdERhdGU6ZnVuY3Rpb24odCxlKXtlPWV8fHRoaXMuZGF0ZTt2YXIgaSxzPXQsYT10aGlzLl9nZXRXb3JkQm91bmRhcnlSZWdFeHAsaD10aGlzLmxvYyxvPW4uZ2V0TGVhZGluZ1plcm9OdW0scj1uLmdldERlY2FkZShlKSxjPW4uZ2V0UGFyc2VkRGF0ZShlKSxkPWMuZnVsbEhvdXJzLGw9Yy5ob3Vycyx1PXQubWF0Y2goYShcImFhXCIpKXx8dC5tYXRjaChhKFwiQUFcIikpLG09XCJhbVwiLHA9dGhpcy5fcmVwbGFjZXI7c3dpdGNoKHRoaXMub3B0cy50aW1lcGlja2VyJiZ0aGlzLnRpbWVwaWNrZXImJnUmJihpPXRoaXMudGltZXBpY2tlci5fZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlKGUsdSksZD1vKGkuaG91cnMpLGw9aS5ob3VycyxtPWkuZGF5UGVyaW9kKSwhMCl7Y2FzZS9ALy50ZXN0KHMpOnM9cy5yZXBsYWNlKC9ALyxlLmdldFRpbWUoKSk7Y2FzZS9hYS8udGVzdChzKTpzPXAocyxhKFwiYWFcIiksbSk7Y2FzZS9BQS8udGVzdChzKTpzPXAocyxhKFwiQUFcIiksbS50b1VwcGVyQ2FzZSgpKTtjYXNlL2RkLy50ZXN0KHMpOnM9cChzLGEoXCJkZFwiKSxjLmZ1bGxEYXRlKTtjYXNlL2QvLnRlc3Qocyk6cz1wKHMsYShcImRcIiksYy5kYXRlKTtjYXNlL0RELy50ZXN0KHMpOnM9cChzLGEoXCJERFwiKSxoLmRheXNbYy5kYXldKTtjYXNlL0QvLnRlc3Qocyk6cz1wKHMsYShcIkRcIiksaC5kYXlzU2hvcnRbYy5kYXldKTtjYXNlL21tLy50ZXN0KHMpOnM9cChzLGEoXCJtbVwiKSxjLmZ1bGxNb250aCk7Y2FzZS9tLy50ZXN0KHMpOnM9cChzLGEoXCJtXCIpLGMubW9udGgrMSk7Y2FzZS9NTS8udGVzdChzKTpzPXAocyxhKFwiTU1cIiksdGhpcy5sb2MubW9udGhzW2MubW9udGhdKTtjYXNlL00vLnRlc3Qocyk6cz1wKHMsYShcIk1cIiksaC5tb250aHNTaG9ydFtjLm1vbnRoXSk7Y2FzZS9paS8udGVzdChzKTpzPXAocyxhKFwiaWlcIiksYy5mdWxsTWludXRlcyk7Y2FzZS9pLy50ZXN0KHMpOnM9cChzLGEoXCJpXCIpLGMubWludXRlcyk7Y2FzZS9oaC8udGVzdChzKTpzPXAocyxhKFwiaGhcIiksZCk7Y2FzZS9oLy50ZXN0KHMpOnM9cChzLGEoXCJoXCIpLGwpO2Nhc2UveXl5eS8udGVzdChzKTpzPXAocyxhKFwieXl5eVwiKSxjLnllYXIpO2Nhc2UveXl5eTEvLnRlc3Qocyk6cz1wKHMsYShcInl5eXkxXCIpLHJbMF0pO2Nhc2UveXl5eTIvLnRlc3Qocyk6cz1wKHMsYShcInl5eXkyXCIpLHJbMV0pO2Nhc2UveXkvLnRlc3Qocyk6cz1wKHMsYShcInl5XCIpLGMueWVhci50b1N0cmluZygpLnNsaWNlKC0yKSl9cmV0dXJuIHN9LF9yZXBsYWNlcjpmdW5jdGlvbih0LGUsaSl7cmV0dXJuIHQucmVwbGFjZShlLGZ1bmN0aW9uKHQsZSxzLGEpe3JldHVybiBlK2krYX0pfSxfZ2V0V29yZEJvdW5kYXJ5UmVnRXhwOmZ1bmN0aW9uKHQpe3ZhciBlPVwiXFxcXHN8XFxcXC58LXwvfFxcXFxcXFxcfCx8XFxcXCR8XFxcXCF8XFxcXD98Onw7XCI7cmV0dXJuIG5ldyBSZWdFeHAoXCIoXnw+fFwiK2UrXCIpKFwiK3QrXCIpKCR8PHxcIitlK1wiKVwiLFwiZ1wiKX0sc2VsZWN0RGF0ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLGk9ZS5vcHRzLHM9ZS5wYXJzZWREYXRlLGE9ZS5zZWxlY3RlZERhdGVzLGg9YS5sZW5ndGgsbz1cIlwiO2lmKEFycmF5LmlzQXJyYXkodCkpcmV0dXJuIHZvaWQgdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe2Uuc2VsZWN0RGF0ZSh0KX0pO2lmKHQgaW5zdGFuY2VvZiBEYXRlKXtpZih0aGlzLmxhc3RTZWxlY3RlZERhdGU9dCx0aGlzLnRpbWVwaWNrZXImJnRoaXMudGltZXBpY2tlci5fc2V0VGltZSh0KSxlLl90cmlnZ2VyKFwic2VsZWN0RGF0ZVwiLHQpLHRoaXMudGltZXBpY2tlciYmKHQuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKSx0LnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpKSxcImRheXNcIj09ZS52aWV3JiZ0LmdldE1vbnRoKCkhPXMubW9udGgmJmkubW92ZVRvT3RoZXJNb250aHNPblNlbGVjdCYmKG89bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKSksXCJ5ZWFyc1wiPT1lLnZpZXcmJnQuZ2V0RnVsbFllYXIoKSE9cy55ZWFyJiZpLm1vdmVUb090aGVyWWVhcnNPblNlbGVjdCYmKG89bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLDAsMSkpLG8mJihlLnNpbGVudD0hMCxlLmRhdGU9byxlLnNpbGVudD0hMSxlLm5hdi5fcmVuZGVyKCkpLGkubXVsdGlwbGVEYXRlcyYmIWkucmFuZ2Upe2lmKGg9PT1pLm11bHRpcGxlRGF0ZXMpcmV0dXJuO2UuX2lzU2VsZWN0ZWQodCl8fGUuc2VsZWN0ZWREYXRlcy5wdXNoKHQpfWVsc2UgaS5yYW5nZT8yPT1oPyhlLnNlbGVjdGVkRGF0ZXM9W3RdLGUubWluUmFuZ2U9dCxlLm1heFJhbmdlPVwiXCIpOjE9PWg/KGUuc2VsZWN0ZWREYXRlcy5wdXNoKHQpLGUubWF4UmFuZ2U/ZS5taW5SYW5nZT10OmUubWF4UmFuZ2U9dCxuLmJpZ2dlcihlLm1heFJhbmdlLGUubWluUmFuZ2UpJiYoZS5tYXhSYW5nZT1lLm1pblJhbmdlLGUubWluUmFuZ2U9dCksZS5zZWxlY3RlZERhdGVzPVtlLm1pblJhbmdlLGUubWF4UmFuZ2VdKTooZS5zZWxlY3RlZERhdGVzPVt0XSxlLm1pblJhbmdlPXQpOmUuc2VsZWN0ZWREYXRlcz1bdF07ZS5fc2V0SW5wdXRWYWx1ZSgpLGkub25TZWxlY3QmJmUuX3RyaWdnZXJPbkNoYW5nZSgpLGkuYXV0b0Nsb3NlJiYhdGhpcy50aW1lcGlja2VySXNBY3RpdmUmJihpLm11bHRpcGxlRGF0ZXN8fGkucmFuZ2U/aS5yYW5nZSYmMj09ZS5zZWxlY3RlZERhdGVzLmxlbmd0aCYmZS5oaWRlKCk6ZS5oaWRlKCkpLGUudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpfX0scmVtb3ZlRGF0ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLnNlbGVjdGVkRGF0ZXMsaT10aGlzO2lmKHQgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBlLnNvbWUoZnVuY3Rpb24ocyxhKXtyZXR1cm4gbi5pc1NhbWUocyx0KT8oZS5zcGxpY2UoYSwxKSxpLnNlbGVjdGVkRGF0ZXMubGVuZ3RoP2kubGFzdFNlbGVjdGVkRGF0ZT1pLnNlbGVjdGVkRGF0ZXNbaS5zZWxlY3RlZERhdGVzLmxlbmd0aC0xXTooaS5taW5SYW5nZT1cIlwiLGkubWF4UmFuZ2U9XCJcIixpLmxhc3RTZWxlY3RlZERhdGU9XCJcIiksaS52aWV3c1tpLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCksaS5fc2V0SW5wdXRWYWx1ZSgpLGkub3B0cy5vblNlbGVjdCYmaS5fdHJpZ2dlck9uQ2hhbmdlKCksITApOnZvaWQgMH0pfSx0b2RheTpmdW5jdGlvbigpe3RoaXMuc2lsZW50PSEwLHRoaXMudmlldz10aGlzLm9wdHMubWluVmlldyx0aGlzLnNpbGVudD0hMSx0aGlzLmRhdGU9bmV3IERhdGUsdGhpcy5vcHRzLnRvZGF5QnV0dG9uIGluc3RhbmNlb2YgRGF0ZSYmdGhpcy5zZWxlY3REYXRlKHRoaXMub3B0cy50b2RheUJ1dHRvbil9LGNsZWFyOmZ1bmN0aW9uKCl7dGhpcy5zZWxlY3RlZERhdGVzPVtdLHRoaXMubWluUmFuZ2U9XCJcIix0aGlzLm1heFJhbmdlPVwiXCIsdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCksdGhpcy5fc2V0SW5wdXRWYWx1ZSgpLHRoaXMub3B0cy5vblNlbGVjdCYmdGhpcy5fdHJpZ2dlck9uQ2hhbmdlKCl9LHVwZGF0ZTpmdW5jdGlvbih0LGkpe3ZhciBzPWFyZ3VtZW50cy5sZW5ndGgsYT10aGlzLmxhc3RTZWxlY3RlZERhdGU7cmV0dXJuIDI9PXM/dGhpcy5vcHRzW3RdPWk6MT09cyYmXCJvYmplY3RcIj09dHlwZW9mIHQmJih0aGlzLm9wdHM9ZS5leHRlbmQoITAsdGhpcy5vcHRzLHQpKSx0aGlzLl9jcmVhdGVTaG9ydEN1dHMoKSx0aGlzLl9zeW5jV2l0aE1pbk1heERhdGVzKCksdGhpcy5fZGVmaW5lTG9jYWxlKHRoaXMub3B0cy5sYW5ndWFnZSksdGhpcy5uYXYuX2FkZEJ1dHRvbnNJZk5lZWQoKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMubmF2Ll9yZW5kZXIoKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKSx0aGlzLmVsSXNJbnB1dCYmIXRoaXMub3B0cy5pbmxpbmUmJih0aGlzLl9zZXRQb3NpdGlvbkNsYXNzZXModGhpcy5vcHRzLnBvc2l0aW9uKSx0aGlzLnZpc2libGUmJnRoaXMuc2V0UG9zaXRpb24odGhpcy5vcHRzLnBvc2l0aW9uKSksdGhpcy5vcHRzLmNsYXNzZXMmJnRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRzLmNsYXNzZXMpLHRoaXMub3B0cy5vbmx5VGltZXBpY2tlciYmdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyhcIi1vbmx5LXRpbWVwaWNrZXItXCIpLHRoaXMub3B0cy50aW1lcGlja2VyJiYoYSYmdGhpcy50aW1lcGlja2VyLl9oYW5kbGVEYXRlKGEpLHRoaXMudGltZXBpY2tlci5fdXBkYXRlUmFuZ2VzKCksdGhpcy50aW1lcGlja2VyLl91cGRhdGVDdXJyZW50VGltZSgpLGEmJihhLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3VycyksYS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSkpLHRoaXMuX3NldElucHV0VmFsdWUoKSx0aGlzfSxfc3luY1dpdGhNaW5NYXhEYXRlczpmdW5jdGlvbigpe3ZhciB0PXRoaXMuZGF0ZS5nZXRUaW1lKCk7dGhpcy5zaWxlbnQ9ITAsdGhpcy5taW5UaW1lPnQmJih0aGlzLmRhdGU9dGhpcy5taW5EYXRlKSx0aGlzLm1heFRpbWU8dCYmKHRoaXMuZGF0ZT10aGlzLm1heERhdGUpLHRoaXMuc2lsZW50PSExfSxfaXNTZWxlY3RlZDpmdW5jdGlvbih0LGUpe3ZhciBpPSExO3JldHVybiB0aGlzLnNlbGVjdGVkRGF0ZXMuc29tZShmdW5jdGlvbihzKXtyZXR1cm4gbi5pc1NhbWUocyx0LGUpPyhpPXMsITApOnZvaWQgMH0pLGl9LF9zZXRJbnB1dFZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLGk9ZS5vcHRzLHM9ZS5sb2MuZGF0ZUZvcm1hdCxhPWkuYWx0RmllbGREYXRlRm9ybWF0LG49ZS5zZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gZS5mb3JtYXREYXRlKHMsdCl9KTtpLmFsdEZpZWxkJiZlLiRhbHRGaWVsZC5sZW5ndGgmJih0PXRoaXMuc2VsZWN0ZWREYXRlcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGUuZm9ybWF0RGF0ZShhLHQpfSksdD10LmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpLHRoaXMuJGFsdEZpZWxkLnZhbCh0KSksbj1uLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpLHRoaXMuJGVsLnZhbChuKX0sX2lzSW5SYW5nZTpmdW5jdGlvbih0LGUpe3ZhciBpPXQuZ2V0VGltZSgpLHM9bi5nZXRQYXJzZWREYXRlKHQpLGE9bi5nZXRQYXJzZWREYXRlKHRoaXMubWluRGF0ZSksaD1uLmdldFBhcnNlZERhdGUodGhpcy5tYXhEYXRlKSxvPW5ldyBEYXRlKHMueWVhcixzLm1vbnRoLGEuZGF0ZSkuZ2V0VGltZSgpLHI9bmV3IERhdGUocy55ZWFyLHMubW9udGgsaC5kYXRlKS5nZXRUaW1lKCksYz17ZGF5Omk+PXRoaXMubWluVGltZSYmaTw9dGhpcy5tYXhUaW1lLG1vbnRoOm8+PXRoaXMubWluVGltZSYmcjw9dGhpcy5tYXhUaW1lLHllYXI6cy55ZWFyPj1hLnllYXImJnMueWVhcjw9aC55ZWFyfTtyZXR1cm4gZT9jW2VdOmMuZGF5fSxfZ2V0RGltZW5zaW9uczpmdW5jdGlvbih0KXt2YXIgZT10Lm9mZnNldCgpO3JldHVybnt3aWR0aDp0Lm91dGVyV2lkdGgoKSxoZWlnaHQ6dC5vdXRlckhlaWdodCgpLGxlZnQ6ZS5sZWZ0LHRvcDplLnRvcH19LF9nZXREYXRlRnJvbUNlbGw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5wYXJzZWREYXRlLHM9dC5kYXRhKFwieWVhclwiKXx8ZS55ZWFyLGE9dC5kYXRhKFwibW9udGhcIik9PWk/ZS5tb250aDp0LmRhdGEoXCJtb250aFwiKSxuPXQuZGF0YShcImRhdGVcIil8fDE7cmV0dXJuIG5ldyBEYXRlKHMsYSxuKX0sX3NldFBvc2l0aW9uQ2xhc3NlczpmdW5jdGlvbih0KXt0PXQuc3BsaXQoXCIgXCIpO3ZhciBlPXRbMF0saT10WzFdLHM9XCJkYXRlcGlja2VyIC1cIitlK1wiLVwiK2krXCItIC1mcm9tLVwiK2UrXCItXCI7dGhpcy52aXNpYmxlJiYocys9XCIgYWN0aXZlXCIpLHRoaXMuJGRhdGVwaWNrZXIucmVtb3ZlQXR0cihcImNsYXNzXCIpLmFkZENsYXNzKHMpfSxzZXRQb3NpdGlvbjpmdW5jdGlvbih0KXt0PXR8fHRoaXMub3B0cy5wb3NpdGlvbjt2YXIgZSxpLHM9dGhpcy5fZ2V0RGltZW5zaW9ucyh0aGlzLiRlbCksYT10aGlzLl9nZXREaW1lbnNpb25zKHRoaXMuJGRhdGVwaWNrZXIpLG49dC5zcGxpdChcIiBcIiksaD10aGlzLm9wdHMub2Zmc2V0LG89blswXSxyPW5bMV07c3dpdGNoKG8pe2Nhc2VcInRvcFwiOmU9cy50b3AtYS5oZWlnaHQtaDticmVhaztjYXNlXCJyaWdodFwiOmk9cy5sZWZ0K3Mud2lkdGgraDticmVhaztjYXNlXCJib3R0b21cIjplPXMudG9wK3MuaGVpZ2h0K2g7YnJlYWs7Y2FzZVwibGVmdFwiOmk9cy5sZWZ0LWEud2lkdGgtaH1zd2l0Y2gocil7Y2FzZVwidG9wXCI6ZT1zLnRvcDticmVhaztjYXNlXCJyaWdodFwiOmk9cy5sZWZ0K3Mud2lkdGgtYS53aWR0aDticmVhaztjYXNlXCJib3R0b21cIjplPXMudG9wK3MuaGVpZ2h0LWEuaGVpZ2h0O2JyZWFrO2Nhc2VcImxlZnRcIjppPXMubGVmdDticmVhaztjYXNlXCJjZW50ZXJcIjovbGVmdHxyaWdodC8udGVzdChvKT9lPXMudG9wK3MuaGVpZ2h0LzItYS5oZWlnaHQvMjppPXMubGVmdCtzLndpZHRoLzItYS53aWR0aC8yfXRoaXMuJGRhdGVwaWNrZXIuY3NzKHtsZWZ0OmksdG9wOmV9KX0sc2hvdzpmdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0cy5vblNob3c7dGhpcy5zZXRQb3NpdGlvbih0aGlzLm9wdHMucG9zaXRpb24pLHRoaXMuJGRhdGVwaWNrZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIiksdGhpcy52aXNpYmxlPSEwLHQmJnRoaXMuX2JpbmRWaXNpb25FdmVudHModCl9LGhpZGU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdHMub25IaWRlO3RoaXMuJGRhdGVwaWNrZXIucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuY3NzKHtsZWZ0OlwiLTEwMDAwMHB4XCJ9KSx0aGlzLmZvY3VzZWQ9XCJcIix0aGlzLmtleXM9W10sdGhpcy5pbkZvY3VzPSExLHRoaXMudmlzaWJsZT0hMSx0aGlzLiRlbC5ibHVyKCksdCYmdGhpcy5fYmluZFZpc2lvbkV2ZW50cyh0KX0sZG93bjpmdW5jdGlvbih0KXt0aGlzLl9jaGFuZ2VWaWV3KHQsXCJkb3duXCIpfSx1cDpmdW5jdGlvbih0KXt0aGlzLl9jaGFuZ2VWaWV3KHQsXCJ1cFwiKX0sX2JpbmRWaXNpb25FdmVudHM6ZnVuY3Rpb24odCl7dGhpcy4kZGF0ZXBpY2tlci5vZmYoXCJ0cmFuc2l0aW9uZW5kLmRwXCIpLHQodGhpcywhMSksdGhpcy4kZGF0ZXBpY2tlci5vbmUoXCJ0cmFuc2l0aW9uZW5kLmRwXCIsdC5iaW5kKHRoaXMsdGhpcywhMCkpfSxfY2hhbmdlVmlldzpmdW5jdGlvbih0LGUpe3Q9dHx8dGhpcy5mb2N1c2VkfHx0aGlzLmRhdGU7dmFyIGk9XCJ1cFwiPT1lP3RoaXMudmlld0luZGV4KzE6dGhpcy52aWV3SW5kZXgtMTtpPjImJihpPTIpLDA+aSYmKGk9MCksdGhpcy5zaWxlbnQ9ITAsdGhpcy5kYXRlPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSksdGhpcy5zaWxlbnQ9ITEsdGhpcy52aWV3PXRoaXMudmlld0luZGV4ZXNbaV19LF9oYW5kbGVIb3RLZXk6ZnVuY3Rpb24odCl7dmFyIGUsaSxzLGE9bi5nZXRQYXJzZWREYXRlKHRoaXMuX2dldEZvY3VzZWREYXRlKCkpLGg9dGhpcy5vcHRzLG89ITEscj0hMSxjPSExLGQ9YS55ZWFyLGw9YS5tb250aCx1PWEuZGF0ZTtzd2l0Y2godCl7Y2FzZVwiY3RybFJpZ2h0XCI6Y2FzZVwiY3RybFVwXCI6bCs9MSxvPSEwO2JyZWFrO2Nhc2VcImN0cmxMZWZ0XCI6Y2FzZVwiY3RybERvd25cIjpsLT0xLG89ITA7YnJlYWs7Y2FzZVwic2hpZnRSaWdodFwiOmNhc2VcInNoaWZ0VXBcIjpyPSEwLGQrPTE7YnJlYWs7Y2FzZVwic2hpZnRMZWZ0XCI6Y2FzZVwic2hpZnREb3duXCI6cj0hMCxkLT0xO2JyZWFrO2Nhc2VcImFsdFJpZ2h0XCI6Y2FzZVwiYWx0VXBcIjpjPSEwLGQrPTEwO2JyZWFrO2Nhc2VcImFsdExlZnRcIjpjYXNlXCJhbHREb3duXCI6Yz0hMCxkLT0xMDticmVhaztjYXNlXCJjdHJsU2hpZnRVcFwiOnRoaXMudXAoKX1zPW4uZ2V0RGF5c0NvdW50KG5ldyBEYXRlKGQsbCkpLGk9bmV3IERhdGUoZCxsLHUpLHU+cyYmKHU9cyksaS5nZXRUaW1lKCk8dGhpcy5taW5UaW1lP2k9dGhpcy5taW5EYXRlOmkuZ2V0VGltZSgpPnRoaXMubWF4VGltZSYmKGk9dGhpcy5tYXhEYXRlKSx0aGlzLmZvY3VzZWQ9aSxlPW4uZ2V0UGFyc2VkRGF0ZShpKSxvJiZoLm9uQ2hhbmdlTW9udGgmJmgub25DaGFuZ2VNb250aChlLm1vbnRoLGUueWVhciksciYmaC5vbkNoYW5nZVllYXImJmgub25DaGFuZ2VZZWFyKGUueWVhciksYyYmaC5vbkNoYW5nZURlY2FkZSYmaC5vbkNoYW5nZURlY2FkZSh0aGlzLmN1ckRlY2FkZSl9LF9yZWdpc3RlcktleTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLmtleXMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gZT09dH0pO2V8fHRoaXMua2V5cy5wdXNoKHQpfSxfdW5SZWdpc3RlcktleTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLmtleXMuaW5kZXhPZih0KTt0aGlzLmtleXMuc3BsaWNlKGUsMSl9LF9pc0hvdEtleVByZXNzZWQ6ZnVuY3Rpb24oKXt2YXIgdCxlPSExLGk9dGhpcyxzPXRoaXMua2V5cy5zb3J0KCk7Zm9yKHZhciBhIGluIHUpdD11W2FdLHMubGVuZ3RoPT10Lmxlbmd0aCYmdC5ldmVyeShmdW5jdGlvbih0LGUpe3JldHVybiB0PT1zW2VdfSkmJihpLl90cmlnZ2VyKFwiaG90S2V5XCIsYSksZT0hMCk7cmV0dXJuIGV9LF90cmlnZ2VyOmZ1bmN0aW9uKHQsZSl7dGhpcy4kZWwudHJpZ2dlcih0LGUpfSxfZm9jdXNOZXh0Q2VsbDpmdW5jdGlvbih0LGUpe2U9ZXx8dGhpcy5jZWxsVHlwZTt2YXIgaT1uLmdldFBhcnNlZERhdGUodGhpcy5fZ2V0Rm9jdXNlZERhdGUoKSkscz1pLnllYXIsYT1pLm1vbnRoLGg9aS5kYXRlO2lmKCF0aGlzLl9pc0hvdEtleVByZXNzZWQoKSl7c3dpdGNoKHQpe2Nhc2UgMzc6XCJkYXlcIj09ZT9oLT0xOlwiXCIsXCJtb250aFwiPT1lP2EtPTE6XCJcIixcInllYXJcIj09ZT9zLT0xOlwiXCI7YnJlYWs7Y2FzZSAzODpcImRheVwiPT1lP2gtPTc6XCJcIixcIm1vbnRoXCI9PWU/YS09MzpcIlwiLFwieWVhclwiPT1lP3MtPTQ6XCJcIjticmVhaztjYXNlIDM5OlwiZGF5XCI9PWU/aCs9MTpcIlwiLFwibW9udGhcIj09ZT9hKz0xOlwiXCIsXCJ5ZWFyXCI9PWU/cys9MTpcIlwiO2JyZWFrO2Nhc2UgNDA6XCJkYXlcIj09ZT9oKz03OlwiXCIsXCJtb250aFwiPT1lP2ErPTM6XCJcIixcInllYXJcIj09ZT9zKz00OlwiXCJ9dmFyIG89bmV3IERhdGUocyxhLGgpO28uZ2V0VGltZSgpPHRoaXMubWluVGltZT9vPXRoaXMubWluRGF0ZTpvLmdldFRpbWUoKT50aGlzLm1heFRpbWUmJihvPXRoaXMubWF4RGF0ZSksdGhpcy5mb2N1c2VkPW99fSxfZ2V0Rm9jdXNlZERhdGU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmZvY3VzZWR8fHRoaXMuc2VsZWN0ZWREYXRlc1t0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoLTFdLGU9dGhpcy5wYXJzZWREYXRlO2lmKCF0KXN3aXRjaCh0aGlzLnZpZXcpe2Nhc2VcImRheXNcIjp0PW5ldyBEYXRlKGUueWVhcixlLm1vbnRoLChuZXcgRGF0ZSkuZ2V0RGF0ZSgpKTticmVhaztjYXNlXCJtb250aHNcIjp0PW5ldyBEYXRlKGUueWVhcixlLm1vbnRoLDEpO2JyZWFrO2Nhc2VcInllYXJzXCI6dD1uZXcgRGF0ZShlLnllYXIsMCwxKX1yZXR1cm4gdH0sX2dldENlbGw6ZnVuY3Rpb24odCxpKXtpPWl8fHRoaXMuY2VsbFR5cGU7dmFyIHMsYT1uLmdldFBhcnNlZERhdGUodCksaD0nLmRhdGVwaWNrZXItLWNlbGxbZGF0YS15ZWFyPVwiJythLnllYXIrJ1wiXSc7c3dpdGNoKGkpe2Nhc2VcIm1vbnRoXCI6aD0nW2RhdGEtbW9udGg9XCInK2EubW9udGgrJ1wiXSc7YnJlYWs7Y2FzZVwiZGF5XCI6aCs9J1tkYXRhLW1vbnRoPVwiJythLm1vbnRoKydcIl1bZGF0YS1kYXRlPVwiJythLmRhdGUrJ1wiXSd9cmV0dXJuIHM9dGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS4kZWwuZmluZChoKSxzLmxlbmd0aD9zOmUoXCJcIil9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3QuJGVsLm9mZihcIi5hZHBcIikuZGF0YShcImRhdGVwaWNrZXJcIixcIlwiKSx0LnNlbGVjdGVkRGF0ZXM9W10sdC5mb2N1c2VkPVwiXCIsdC52aWV3cz17fSx0LmtleXM9W10sdC5taW5SYW5nZT1cIlwiLHQubWF4UmFuZ2U9XCJcIix0Lm9wdHMuaW5saW5lfHwhdC5lbElzSW5wdXQ/dC4kZGF0ZXBpY2tlci5jbG9zZXN0KFwiLmRhdGVwaWNrZXItaW5saW5lXCIpLnJlbW92ZSgpOnQuJGRhdGVwaWNrZXIucmVtb3ZlKCl9LF9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlczpmdW5jdGlvbih0LGUpe3RoaXMub3B0cy5yYW5nZT90aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQ/dGhpcy5yZW1vdmVEYXRlKGUpOjIhPXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgmJnRoaXMuX3RyaWdnZXIoXCJjbGlja0NlbGxcIixlKTp0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWQmJnRoaXMucmVtb3ZlRGF0ZShlKSx0aGlzLm9wdHMudG9nZ2xlU2VsZWN0ZWR8fCh0aGlzLmxhc3RTZWxlY3RlZERhdGU9dCx0aGlzLm9wdHMudGltZXBpY2tlciYmKHRoaXMudGltZXBpY2tlci5fc2V0VGltZSh0KSx0aGlzLnRpbWVwaWNrZXIudXBkYXRlKCkpKX0sX29uU2hvd0V2ZW50OmZ1bmN0aW9uKHQpe3RoaXMudmlzaWJsZXx8dGhpcy5zaG93KCl9LF9vbkJsdXI6ZnVuY3Rpb24oKXshdGhpcy5pbkZvY3VzJiZ0aGlzLnZpc2libGUmJnRoaXMuaGlkZSgpfSxfb25Nb3VzZURvd25EYXRlcGlja2VyOmZ1bmN0aW9uKHQpe3RoaXMuaW5Gb2N1cz0hMH0sX29uTW91c2VVcERhdGVwaWNrZXI6ZnVuY3Rpb24odCl7dGhpcy5pbkZvY3VzPSExLHQub3JpZ2luYWxFdmVudC5pbkZvY3VzPSEwLHQub3JpZ2luYWxFdmVudC50aW1lcGlja2VyRm9jdXN8fHRoaXMuJGVsLmZvY3VzKCl9LF9vbktleVVwR2VuZXJhbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLiRlbC52YWwoKTtlfHx0aGlzLmNsZWFyKCl9LF9vblJlc2l6ZTpmdW5jdGlvbigpe3RoaXMudmlzaWJsZSYmdGhpcy5zZXRQb3NpdGlvbigpfSxfb25Nb3VzZVVwQm9keTpmdW5jdGlvbih0KXt0Lm9yaWdpbmFsRXZlbnQuaW5Gb2N1c3x8dGhpcy52aXNpYmxlJiYhdGhpcy5pbkZvY3VzJiZ0aGlzLmhpZGUoKX0sX29uTW91c2VVcEVsOmZ1bmN0aW9uKHQpe3Qub3JpZ2luYWxFdmVudC5pbkZvY3VzPSEwLHNldFRpbWVvdXQodGhpcy5fb25LZXlVcEdlbmVyYWwuYmluZCh0aGlzKSw0KX0sX29uS2V5RG93bjpmdW5jdGlvbih0KXt2YXIgZT10LndoaWNoO2lmKHRoaXMuX3JlZ2lzdGVyS2V5KGUpLGU+PTM3JiY0MD49ZSYmKHQucHJldmVudERlZmF1bHQoKSx0aGlzLl9mb2N1c05leHRDZWxsKGUpKSwxMz09ZSYmdGhpcy5mb2N1c2VkKXtpZih0aGlzLl9nZXRDZWxsKHRoaXMuZm9jdXNlZCkuaGFzQ2xhc3MoXCItZGlzYWJsZWQtXCIpKXJldHVybjtpZih0aGlzLnZpZXchPXRoaXMub3B0cy5taW5WaWV3KXRoaXMuZG93bigpO2Vsc2V7dmFyIGk9dGhpcy5faXNTZWxlY3RlZCh0aGlzLmZvY3VzZWQsdGhpcy5jZWxsVHlwZSk7aWYoIWkpcmV0dXJuIHRoaXMudGltZXBpY2tlciYmKHRoaXMuZm9jdXNlZC5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpLHRoaXMuZm9jdXNlZC5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSksdm9pZCB0aGlzLnNlbGVjdERhdGUodGhpcy5mb2N1c2VkKTt0aGlzLl9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlcyhpLHRoaXMuZm9jdXNlZCl9fTI3PT1lJiZ0aGlzLmhpZGUoKX0sX29uS2V5VXA6ZnVuY3Rpb24odCl7dmFyIGU9dC53aGljaDt0aGlzLl91blJlZ2lzdGVyS2V5KGUpfSxfb25Ib3RLZXk6ZnVuY3Rpb24odCxlKXt0aGlzLl9oYW5kbGVIb3RLZXkoZSl9LF9vbk1vdXNlRW50ZXJDZWxsOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmNsb3Nlc3QoXCIuZGF0ZXBpY2tlci0tY2VsbFwiKSxzPXRoaXMuX2dldERhdGVGcm9tQ2VsbChpKTt0aGlzLnNpbGVudD0hMCx0aGlzLmZvY3VzZWQmJih0aGlzLmZvY3VzZWQ9XCJcIiksaS5hZGRDbGFzcyhcIi1mb2N1cy1cIiksdGhpcy5mb2N1c2VkPXMsdGhpcy5zaWxlbnQ9ITEsdGhpcy5vcHRzLnJhbmdlJiYxPT10aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiYodGhpcy5taW5SYW5nZT10aGlzLnNlbGVjdGVkRGF0ZXNbMF0sdGhpcy5tYXhSYW5nZT1cIlwiLG4ubGVzcyh0aGlzLm1pblJhbmdlLHRoaXMuZm9jdXNlZCkmJih0aGlzLm1heFJhbmdlPXRoaXMubWluUmFuZ2UsdGhpcy5taW5SYW5nZT1cIlwiKSx0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl91cGRhdGUoKSl9LF9vbk1vdXNlTGVhdmVDZWxsOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmNsb3Nlc3QoXCIuZGF0ZXBpY2tlci0tY2VsbFwiKTtpLnJlbW92ZUNsYXNzKFwiLWZvY3VzLVwiKSx0aGlzLnNpbGVudD0hMCx0aGlzLmZvY3VzZWQ9XCJcIix0aGlzLnNpbGVudD0hMX0sX29uVGltZUNoYW5nZTpmdW5jdGlvbih0LGUsaSl7dmFyIHM9bmV3IERhdGUsYT10aGlzLnNlbGVjdGVkRGF0ZXMsbj0hMTthLmxlbmd0aCYmKG49ITAscz10aGlzLmxhc3RTZWxlY3RlZERhdGUpLHMuc2V0SG91cnMoZSkscy5zZXRNaW51dGVzKGkpLG58fHRoaXMuX2dldENlbGwocykuaGFzQ2xhc3MoXCItZGlzYWJsZWQtXCIpPyh0aGlzLl9zZXRJbnB1dFZhbHVlKCksdGhpcy5vcHRzLm9uU2VsZWN0JiZ0aGlzLl90cmlnZ2VyT25DaGFuZ2UoKSk6dGhpcy5zZWxlY3REYXRlKHMpfSxfb25DbGlja0NlbGw6ZnVuY3Rpb24odCxlKXt0aGlzLnRpbWVwaWNrZXImJihlLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3VycyksZS5zZXRNaW51dGVzKHRoaXMudGltZXBpY2tlci5taW51dGVzKSksdGhpcy5zZWxlY3REYXRlKGUpfSxzZXQgZm9jdXNlZCh0KXtpZighdCYmdGhpcy5mb2N1c2VkKXt2YXIgZT10aGlzLl9nZXRDZWxsKHRoaXMuZm9jdXNlZCk7ZS5sZW5ndGgmJmUucmVtb3ZlQ2xhc3MoXCItZm9jdXMtXCIpfXRoaXMuX2ZvY3VzZWQ9dCx0aGlzLm9wdHMucmFuZ2UmJjE9PXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgmJih0aGlzLm1pblJhbmdlPXRoaXMuc2VsZWN0ZWREYXRlc1swXSx0aGlzLm1heFJhbmdlPVwiXCIsbi5sZXNzKHRoaXMubWluUmFuZ2UsdGhpcy5fZm9jdXNlZCkmJih0aGlzLm1heFJhbmdlPXRoaXMubWluUmFuZ2UsdGhpcy5taW5SYW5nZT1cIlwiKSksdGhpcy5zaWxlbnR8fCh0aGlzLmRhdGU9dCl9LGdldCBmb2N1c2VkKCl7cmV0dXJuIHRoaXMuX2ZvY3VzZWR9LGdldCBwYXJzZWREYXRlKCl7cmV0dXJuIG4uZ2V0UGFyc2VkRGF0ZSh0aGlzLmRhdGUpfSxzZXQgZGF0ZSh0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIERhdGU/KHRoaXMuY3VycmVudERhdGU9dCx0aGlzLmluaXRlZCYmIXRoaXMuc2lsZW50JiYodGhpcy52aWV3c1t0aGlzLnZpZXddLl9yZW5kZXIoKSx0aGlzLm5hdi5fcmVuZGVyKCksdGhpcy52aXNpYmxlJiZ0aGlzLmVsSXNJbnB1dCYmdGhpcy5zZXRQb3NpdGlvbigpKSx0KTp2b2lkIDB9LGdldCBkYXRlKCl7cmV0dXJuIHRoaXMuY3VycmVudERhdGV9LHNldCB2aWV3KHQpe3JldHVybiB0aGlzLnZpZXdJbmRleD10aGlzLnZpZXdJbmRleGVzLmluZGV4T2YodCksdGhpcy52aWV3SW5kZXg8MD92b2lkIDA6KHRoaXMucHJldlZpZXc9dGhpcy5jdXJyZW50Vmlldyx0aGlzLmN1cnJlbnRWaWV3PXQsdGhpcy5pbml0ZWQmJih0aGlzLnZpZXdzW3RdP3RoaXMudmlld3NbdF0uX3JlbmRlcigpOnRoaXMudmlld3NbdF09bmV3IGUuZm4uZGF0ZXBpY2tlci5Cb2R5KHRoaXMsdCx0aGlzLm9wdHMpLHRoaXMudmlld3NbdGhpcy5wcmV2Vmlld10uaGlkZSgpLHRoaXMudmlld3NbdF0uc2hvdygpLHRoaXMubmF2Ll9yZW5kZXIoKSx0aGlzLm9wdHMub25DaGFuZ2VWaWV3JiZ0aGlzLm9wdHMub25DaGFuZ2VWaWV3KHQpLHRoaXMuZWxJc0lucHV0JiZ0aGlzLnZpc2libGUmJnRoaXMuc2V0UG9zaXRpb24oKSksdCl9LGdldCB2aWV3KCl7cmV0dXJuIHRoaXMuY3VycmVudFZpZXd9LGdldCBjZWxsVHlwZSgpe3JldHVybiB0aGlzLnZpZXcuc3Vic3RyaW5nKDAsdGhpcy52aWV3Lmxlbmd0aC0xKX0sZ2V0IG1pblRpbWUoKXt2YXIgdD1uLmdldFBhcnNlZERhdGUodGhpcy5taW5EYXRlKTtyZXR1cm4gbmV3IERhdGUodC55ZWFyLHQubW9udGgsdC5kYXRlKS5nZXRUaW1lKCl9LGdldCBtYXhUaW1lKCl7dmFyIHQ9bi5nZXRQYXJzZWREYXRlKHRoaXMubWF4RGF0ZSk7cmV0dXJuIG5ldyBEYXRlKHQueWVhcix0Lm1vbnRoLHQuZGF0ZSkuZ2V0VGltZSgpfSxnZXQgY3VyRGVjYWRlKCl7cmV0dXJuIG4uZ2V0RGVjYWRlKHRoaXMuZGF0ZSl9fSxuLmdldERheXNDb3VudD1mdW5jdGlvbih0KXtyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSsxLDApLmdldERhdGUoKX0sbi5nZXRQYXJzZWREYXRlPWZ1bmN0aW9uKHQpe3JldHVybnt5ZWFyOnQuZ2V0RnVsbFllYXIoKSxtb250aDp0LmdldE1vbnRoKCksZnVsbE1vbnRoOnQuZ2V0TW9udGgoKSsxPDEwP1wiMFwiKyh0LmdldE1vbnRoKCkrMSk6dC5nZXRNb250aCgpKzEsZGF0ZTp0LmdldERhdGUoKSxmdWxsRGF0ZTp0LmdldERhdGUoKTwxMD9cIjBcIit0LmdldERhdGUoKTp0LmdldERhdGUoKSxkYXk6dC5nZXREYXkoKSxob3Vyczp0LmdldEhvdXJzKCksZnVsbEhvdXJzOnQuZ2V0SG91cnMoKTwxMD9cIjBcIit0LmdldEhvdXJzKCk6dC5nZXRIb3VycygpLG1pbnV0ZXM6dC5nZXRNaW51dGVzKCksZnVsbE1pbnV0ZXM6dC5nZXRNaW51dGVzKCk8MTA/XCIwXCIrdC5nZXRNaW51dGVzKCk6dC5nZXRNaW51dGVzKCl9fSxuLmdldERlY2FkZT1mdW5jdGlvbih0KXt2YXIgZT0xMCpNYXRoLmZsb29yKHQuZ2V0RnVsbFllYXIoKS8xMCk7cmV0dXJuW2UsZSs5XX0sbi50ZW1wbGF0ZT1mdW5jdGlvbih0LGUpe3JldHVybiB0LnJlcGxhY2UoLyNcXHsoW1xcd10rKVxcfS9nLGZ1bmN0aW9uKHQsaSl7cmV0dXJuIGVbaV18fDA9PT1lW2ldP2VbaV06dm9pZCAwfSl9LG4uaXNTYW1lPWZ1bmN0aW9uKHQsZSxpKXtpZighdHx8IWUpcmV0dXJuITE7dmFyIHM9bi5nZXRQYXJzZWREYXRlKHQpLGE9bi5nZXRQYXJzZWREYXRlKGUpLGg9aT9pOlwiZGF5XCIsbz17ZGF5OnMuZGF0ZT09YS5kYXRlJiZzLm1vbnRoPT1hLm1vbnRoJiZzLnllYXI9PWEueWVhcixtb250aDpzLm1vbnRoPT1hLm1vbnRoJiZzLnllYXI9PWEueWVhcix5ZWFyOnMueWVhcj09YS55ZWFyfTtyZXR1cm4gb1toXX0sbi5sZXNzPWZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gdCYmZT9lLmdldFRpbWUoKTx0LmdldFRpbWUoKTohMX0sbi5iaWdnZXI9ZnVuY3Rpb24odCxlLGkpe3JldHVybiB0JiZlP2UuZ2V0VGltZSgpPnQuZ2V0VGltZSgpOiExfSxuLmdldExlYWRpbmdaZXJvTnVtPWZ1bmN0aW9uKHQpe3JldHVybiBwYXJzZUludCh0KTwxMD9cIjBcIit0OnR9LG4ucmVzZXRUaW1lPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0Pyh0PW4uZ2V0UGFyc2VkRGF0ZSh0KSxuZXcgRGF0ZSh0LnllYXIsdC5tb250aCx0LmRhdGUpKTp2b2lkIDB9LGUuZm4uZGF0ZXBpY2tlcj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7aWYoZS5kYXRhKHRoaXMsbykpe3ZhciBpPWUuZGF0YSh0aGlzLG8pO2kub3B0cz1lLmV4dGVuZCghMCxpLm9wdHMsdCksaS51cGRhdGUoKX1lbHNlIGUuZGF0YSh0aGlzLG8sbmV3IG0odGhpcyx0KSl9KX0sZS5mbi5kYXRlcGlja2VyLkNvbnN0cnVjdG9yPW0sZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlPXtydTp7ZGF5czpbXCLQktC+0YHQutGA0LXRgdC10L3RjNC1XCIsXCLQn9C+0L3QtdC00LXQu9GM0L3QuNC6XCIsXCLQktGC0L7RgNC90LjQulwiLFwi0KHRgNC10LTQsFwiLFwi0KfQtdGC0LLQtdGA0LNcIixcItCf0Y/RgtC90LjRhtCwXCIsXCLQodGD0LHQsdC+0YLQsFwiXSxkYXlzU2hvcnQ6W1wi0JLQvtGBXCIsXCLQn9C+0L1cIixcItCS0YLQvlwiLFwi0KHRgNC1XCIsXCLQp9C10YJcIixcItCf0Y/RglwiLFwi0KHRg9CxXCJdLGRheXNNaW46W1wi0JLRgVwiLFwi0J/QvVwiLFwi0JLRglwiLFwi0KHRgFwiLFwi0KfRglwiLFwi0J/RglwiLFwi0KHQsVwiXSxtb250aHM6W1wi0K/QvdCy0LDRgNGMXCIsXCLQpNC10LLRgNCw0LvRjFwiLFwi0JzQsNGA0YJcIixcItCQ0L/RgNC10LvRjFwiLFwi0JzQsNC5XCIsXCLQmNGO0L3RjFwiLFwi0JjRjtC70YxcIixcItCQ0LLQs9GD0YHRglwiLFwi0KHQtdC90YLRj9Cx0YDRjFwiLFwi0J7QutGC0Y/QsdGA0YxcIixcItCd0L7Rj9Cx0YDRjFwiLFwi0JTQtdC60LDQsdGA0YxcIl0sbW9udGhzU2hvcnQ6W1wi0K/QvdCyXCIsXCLQpNC10LJcIixcItCc0LDRgFwiLFwi0JDQv9GAXCIsXCLQnNCw0LlcIixcItCY0Y7QvVwiLFwi0JjRjtC7XCIsXCLQkNCy0LNcIixcItCh0LXQvVwiLFwi0J7QutGCXCIsXCLQndC+0Y9cIixcItCU0LXQulwiXSx0b2RheTpcItCh0LXQs9C+0LTQvdGPXCIsY2xlYXI6XCLQntGH0LjRgdGC0LjRgtGMXCIsZGF0ZUZvcm1hdDpcImRkLm1tLnl5eXlcIix0aW1lRm9ybWF0OlwiaGg6aWlcIixmaXJzdERheToxfX0sZShmdW5jdGlvbigpe2UocikuZGF0ZXBpY2tlcigpfSl9KCksZnVuY3Rpb24oKXt2YXIgdD17ZGF5czonPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheXMgZGF0ZXBpY2tlci0tYm9keVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1kYXlzLW5hbWVzXCI+PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLWRheXNcIj48L2Rpdj48L2Rpdj4nLG1vbnRoczonPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW1vbnRocyBkYXRlcGlja2VyLS1ib2R5XCI+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLW1vbnRoc1wiPjwvZGl2PjwvZGl2PicseWVhcnM6JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS15ZWFycyBkYXRlcGlja2VyLS1ib2R5XCI+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNlbGxzIGRhdGVwaWNrZXItLWNlbGxzLXllYXJzXCI+PC9kaXY+PC9kaXY+J30scz1lLmZuLmRhdGVwaWNrZXIsYT1zLkNvbnN0cnVjdG9yO3MuQm9keT1mdW5jdGlvbih0LGkscyl7dGhpcy5kPXQsdGhpcy50eXBlPWksdGhpcy5vcHRzPXMsdGhpcy4kZWw9ZShcIlwiKSx0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMuaW5pdCgpfSxzLkJvZHkucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7dGhpcy5fYnVpbGRCYXNlSHRtbCgpLHRoaXMuX3JlbmRlcigpLHRoaXMuX2JpbmRFdmVudHMoKX0sX2JpbmRFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLiRlbC5vbihcImNsaWNrXCIsXCIuZGF0ZXBpY2tlci0tY2VsbFwiLGUucHJveHkodGhpcy5fb25DbGlja0NlbGwsdGhpcykpfSxfYnVpbGRCYXNlSHRtbDpmdW5jdGlvbigpe3RoaXMuJGVsPWUodFt0aGlzLnR5cGVdKS5hcHBlbmRUbyh0aGlzLmQuJGNvbnRlbnQpLHRoaXMuJG5hbWVzPWUoXCIuZGF0ZXBpY2tlci0tZGF5cy1uYW1lc1wiLHRoaXMuJGVsKSx0aGlzLiRjZWxscz1lKFwiLmRhdGVwaWNrZXItLWNlbGxzXCIsdGhpcy4kZWwpfSxfZ2V0RGF5TmFtZXNIdG1sOmZ1bmN0aW9uKHQsZSxzLGEpe3JldHVybiBlPWUhPWk/ZTp0LHM9cz9zOlwiXCIsYT1hIT1pP2E6MCxhPjc/czo3PT1lP3RoaXMuX2dldERheU5hbWVzSHRtbCh0LDAscywrK2EpOihzKz0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheS1uYW1lJysodGhpcy5kLmlzV2Vla2VuZChlKT9cIiAtd2Vla2VuZC1cIjpcIlwiKSsnXCI+Jyt0aGlzLmQubG9jLmRheXNNaW5bZV0rXCI8L2Rpdj5cIix0aGlzLl9nZXREYXlOYW1lc0h0bWwodCwrK2UscywrK2EpKX0sX2dldENlbGxDb250ZW50czpmdW5jdGlvbih0LGUpe3ZhciBpPVwiZGF0ZXBpY2tlci0tY2VsbCBkYXRlcGlja2VyLS1jZWxsLVwiK2Uscz1uZXcgRGF0ZSxuPXRoaXMuZCxoPWEucmVzZXRUaW1lKG4ubWluUmFuZ2UpLG89YS5yZXNldFRpbWUobi5tYXhSYW5nZSkscj1uLm9wdHMsYz1hLmdldFBhcnNlZERhdGUodCksZD17fSxsPWMuZGF0ZTtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6bi5pc1dlZWtlbmQoYy5kYXkpJiYoaSs9XCIgLXdlZWtlbmQtXCIpLGMubW9udGghPXRoaXMuZC5wYXJzZWREYXRlLm1vbnRoJiYoaSs9XCIgLW90aGVyLW1vbnRoLVwiLHIuc2VsZWN0T3RoZXJNb250aHN8fChpKz1cIiAtZGlzYWJsZWQtXCIpLHIuc2hvd090aGVyTW9udGhzfHwobD1cIlwiKSk7YnJlYWs7Y2FzZVwibW9udGhcIjpsPW4ubG9jW24ub3B0cy5tb250aHNGaWVsZF1bYy5tb250aF07YnJlYWs7Y2FzZVwieWVhclwiOnZhciB1PW4uY3VyRGVjYWRlO2w9Yy55ZWFyLChjLnllYXI8dVswXXx8Yy55ZWFyPnVbMV0pJiYoaSs9XCIgLW90aGVyLWRlY2FkZS1cIixyLnNlbGVjdE90aGVyWWVhcnN8fChpKz1cIiAtZGlzYWJsZWQtXCIpLHIuc2hvd090aGVyWWVhcnN8fChsPVwiXCIpKX1yZXR1cm4gci5vblJlbmRlckNlbGwmJihkPXIub25SZW5kZXJDZWxsKHQsZSl8fHt9LGw9ZC5odG1sP2QuaHRtbDpsLGkrPWQuY2xhc3Nlcz9cIiBcIitkLmNsYXNzZXM6XCJcIiksci5yYW5nZSYmKGEuaXNTYW1lKGgsdCxlKSYmKGkrPVwiIC1yYW5nZS1mcm9tLVwiKSxhLmlzU2FtZShvLHQsZSkmJihpKz1cIiAtcmFuZ2UtdG8tXCIpLDE9PW4uc2VsZWN0ZWREYXRlcy5sZW5ndGgmJm4uZm9jdXNlZD8oKGEuYmlnZ2VyKGgsdCkmJmEubGVzcyhuLmZvY3VzZWQsdCl8fGEubGVzcyhvLHQpJiZhLmJpZ2dlcihuLmZvY3VzZWQsdCkpJiYoaSs9XCIgLWluLXJhbmdlLVwiKSxhLmxlc3Mobyx0KSYmYS5pc1NhbWUobi5mb2N1c2VkLHQpJiYoaSs9XCIgLXJhbmdlLWZyb20tXCIpLGEuYmlnZ2VyKGgsdCkmJmEuaXNTYW1lKG4uZm9jdXNlZCx0KSYmKGkrPVwiIC1yYW5nZS10by1cIikpOjI9PW4uc2VsZWN0ZWREYXRlcy5sZW5ndGgmJmEuYmlnZ2VyKGgsdCkmJmEubGVzcyhvLHQpJiYoaSs9XCIgLWluLXJhbmdlLVwiKSksYS5pc1NhbWUocyx0LGUpJiYoaSs9XCIgLWN1cnJlbnQtXCIpLG4uZm9jdXNlZCYmYS5pc1NhbWUodCxuLmZvY3VzZWQsZSkmJihpKz1cIiAtZm9jdXMtXCIpLG4uX2lzU2VsZWN0ZWQodCxlKSYmKGkrPVwiIC1zZWxlY3RlZC1cIiksKCFuLl9pc0luUmFuZ2UodCxlKXx8ZC5kaXNhYmxlZCkmJihpKz1cIiAtZGlzYWJsZWQtXCIpLHtodG1sOmwsY2xhc3NlczppfX0sX2dldERheXNIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPWEuZ2V0RGF5c0NvdW50KHQpLGk9bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXREYXkoKSxzPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksZSkuZ2V0RGF5KCksbj1pLXRoaXMuZC5sb2MuZmlyc3REYXksaD02LXMrdGhpcy5kLmxvYy5maXJzdERheTtuPTA+bj9uKzc6bixoPWg+Nj9oLTc6aDtmb3IodmFyIG8scixjPS1uKzEsZD1cIlwiLGw9Yyx1PWUraDt1Pj1sO2wrKylyPXQuZ2V0RnVsbFllYXIoKSxvPXQuZ2V0TW9udGgoKSxkKz10aGlzLl9nZXREYXlIdG1sKG5ldyBEYXRlKHIsbyxsKSk7cmV0dXJuIGR9LF9nZXREYXlIdG1sOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2dldENlbGxDb250ZW50cyh0LFwiZGF5XCIpO3JldHVybic8ZGl2IGNsYXNzPVwiJytlLmNsYXNzZXMrJ1wiIGRhdGEtZGF0ZT1cIicrdC5nZXREYXRlKCkrJ1wiIGRhdGEtbW9udGg9XCInK3QuZ2V0TW9udGgoKSsnXCIgZGF0YS15ZWFyPVwiJyt0LmdldEZ1bGxZZWFyKCkrJ1wiPicrZS5odG1sK1wiPC9kaXY+XCJ9LF9nZXRNb250aHNIdG1sOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1cIlwiLGk9YS5nZXRQYXJzZWREYXRlKHQpLHM9MDsxMj5zOyllKz10aGlzLl9nZXRNb250aEh0bWwobmV3IERhdGUoaS55ZWFyLHMpKSxzKys7cmV0dXJuIGV9LF9nZXRNb250aEh0bWw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fZ2V0Q2VsbENvbnRlbnRzKHQsXCJtb250aFwiKTtyZXR1cm4nPGRpdiBjbGFzcz1cIicrZS5jbGFzc2VzKydcIiBkYXRhLW1vbnRoPVwiJyt0LmdldE1vbnRoKCkrJ1wiPicrZS5odG1sK1wiPC9kaXY+XCJ9LF9nZXRZZWFyc0h0bWw6ZnVuY3Rpb24odCl7dmFyIGU9KGEuZ2V0UGFyc2VkRGF0ZSh0KSxhLmdldERlY2FkZSh0KSksaT1lWzBdLTEscz1cIlwiLG49aTtmb3IobjtuPD1lWzFdKzE7bisrKXMrPXRoaXMuX2dldFllYXJIdG1sKG5ldyBEYXRlKG4sMCkpO3JldHVybiBzfSxfZ2V0WWVhckh0bWw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fZ2V0Q2VsbENvbnRlbnRzKHQsXCJ5ZWFyXCIpO3JldHVybic8ZGl2IGNsYXNzPVwiJytlLmNsYXNzZXMrJ1wiIGRhdGEteWVhcj1cIicrdC5nZXRGdWxsWWVhcigpKydcIj4nK2UuaHRtbCtcIjwvZGl2PlwifSxfcmVuZGVyVHlwZXM6e2RheXM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9nZXREYXlOYW1lc0h0bWwodGhpcy5kLmxvYy5maXJzdERheSksZT10aGlzLl9nZXREYXlzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO3RoaXMuJGNlbGxzLmh0bWwoZSksdGhpcy4kbmFtZXMuaHRtbCh0KX0sbW9udGhzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0TW9udGhzSHRtbCh0aGlzLmQuY3VycmVudERhdGUpO3RoaXMuJGNlbGxzLmh0bWwodCl9LHllYXJzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fZ2V0WWVhcnNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7dGhpcy4kY2VsbHMuaHRtbCh0KX19LF9yZW5kZXI6ZnVuY3Rpb24oKXt0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fHRoaXMuX3JlbmRlclR5cGVzW3RoaXMudHlwZV0uYmluZCh0aGlzKSgpfSxfdXBkYXRlOmZ1bmN0aW9uKCl7dmFyIHQsaSxzLGE9ZShcIi5kYXRlcGlja2VyLS1jZWxsXCIsdGhpcy4kY2VsbHMpLG49dGhpczthLmVhY2goZnVuY3Rpb24oYSxoKXtpPWUodGhpcykscz1uLmQuX2dldERhdGVGcm9tQ2VsbChlKHRoaXMpKSx0PW4uX2dldENlbGxDb250ZW50cyhzLG4uZC5jZWxsVHlwZSksaS5hdHRyKFwiY2xhc3NcIix0LmNsYXNzZXMpfSl9LHNob3c6ZnVuY3Rpb24oKXt0aGlzLm9wdHMub25seVRpbWVwaWNrZXJ8fCh0aGlzLiRlbC5hZGRDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLmFjaXR2ZT0hMCl9LGhpZGU6ZnVuY3Rpb24oKXt0aGlzLiRlbC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLmFjdGl2ZT0hMX0sX2hhbmRsZUNsaWNrOmZ1bmN0aW9uKHQpe3ZhciBlPXQuZGF0YShcImRhdGVcIil8fDEsaT10LmRhdGEoXCJtb250aFwiKXx8MCxzPXQuZGF0YShcInllYXJcIil8fHRoaXMuZC5wYXJzZWREYXRlLnllYXIsYT10aGlzLmQ7aWYoYS52aWV3IT10aGlzLm9wdHMubWluVmlldylyZXR1cm4gdm9pZCBhLmRvd24obmV3IERhdGUocyxpLGUpKTt2YXIgbj1uZXcgRGF0ZShzLGksZSksaD10aGlzLmQuX2lzU2VsZWN0ZWQobix0aGlzLmQuY2VsbFR5cGUpO3JldHVybiBoP3ZvaWQgYS5faGFuZGxlQWxyZWFkeVNlbGVjdGVkRGF0ZXMuYmluZChhLGgsbikoKTp2b2lkIGEuX3RyaWdnZXIoXCJjbGlja0NlbGxcIixuKX0sX29uQ2xpY2tDZWxsOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmNsb3Nlc3QoXCIuZGF0ZXBpY2tlci0tY2VsbFwiKTtpLmhhc0NsYXNzKFwiLWRpc2FibGVkLVwiKXx8dGhpcy5faGFuZGxlQ2xpY2suYmluZCh0aGlzKShpKX19fSgpLGZ1bmN0aW9uKCl7dmFyIHQ9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIgZGF0YS1hY3Rpb249XCJwcmV2XCI+I3twcmV2SHRtbH08L2Rpdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LXRpdGxlXCI+I3t0aXRsZX08L2Rpdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiIGRhdGEtYWN0aW9uPVwibmV4dFwiPiN7bmV4dEh0bWx9PC9kaXY+JyxpPSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tYnV0dG9uc1wiPjwvZGl2Picscz0nPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS1idXR0b25cIiBkYXRhLWFjdGlvbj1cIiN7YWN0aW9ufVwiPiN7bGFiZWx9PC9zcGFuPicsYT1lLmZuLmRhdGVwaWNrZXIsbj1hLkNvbnN0cnVjdG9yO2EuTmF2aWdhdGlvbj1mdW5jdGlvbih0LGUpe3RoaXMuZD10LHRoaXMub3B0cz1lLHRoaXMuJGJ1dHRvbnNDb250YWluZXI9XCJcIix0aGlzLmluaXQoKX0sYS5OYXZpZ2F0aW9uLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3RoaXMuX2J1aWxkQmFzZUh0bWwoKSx0aGlzLl9iaW5kRXZlbnRzKCl9LF9iaW5kRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy5kLiRuYXYub24oXCJjbGlja1wiLFwiLmRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIixlLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZCdXR0b24sdGhpcykpLHRoaXMuZC4kbmF2Lm9uKFwiY2xpY2tcIixcIi5kYXRlcGlja2VyLS1uYXYtdGl0bGVcIixlLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZUaXRsZSx0aGlzKSksdGhpcy5kLiRkYXRlcGlja2VyLm9uKFwiY2xpY2tcIixcIi5kYXRlcGlja2VyLS1idXR0b25cIixlLnByb3h5KHRoaXMuX29uQ2xpY2tOYXZCdXR0b24sdGhpcykpfSxfYnVpbGRCYXNlSHRtbDpmdW5jdGlvbigpe3RoaXMub3B0cy5vbmx5VGltZXBpY2tlcnx8dGhpcy5fcmVuZGVyKCksdGhpcy5fYWRkQnV0dG9uc0lmTmVlZCgpfSxfYWRkQnV0dG9uc0lmTmVlZDpmdW5jdGlvbigpe3RoaXMub3B0cy50b2RheUJ1dHRvbiYmdGhpcy5fYWRkQnV0dG9uKFwidG9kYXlcIiksdGhpcy5vcHRzLmNsZWFyQnV0dG9uJiZ0aGlzLl9hZGRCdXR0b24oXCJjbGVhclwiKX0sX3JlbmRlcjpmdW5jdGlvbigpe3ZhciBpPXRoaXMuX2dldFRpdGxlKHRoaXMuZC5jdXJyZW50RGF0ZSkscz1uLnRlbXBsYXRlKHQsZS5leHRlbmQoe3RpdGxlOml9LHRoaXMub3B0cykpO3RoaXMuZC4kbmF2Lmh0bWwocyksXCJ5ZWFyc1wiPT10aGlzLmQudmlldyYmZShcIi5kYXRlcGlja2VyLS1uYXYtdGl0bGVcIix0aGlzLmQuJG5hdikuYWRkQ2xhc3MoXCItZGlzYWJsZWQtXCIpLHRoaXMuc2V0TmF2U3RhdHVzKCl9LF9nZXRUaXRsZTpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5kLmZvcm1hdERhdGUodGhpcy5vcHRzLm5hdlRpdGxlc1t0aGlzLmQudmlld10sdCl9LF9hZGRCdXR0b246ZnVuY3Rpb24odCl7dGhpcy4kYnV0dG9uc0NvbnRhaW5lci5sZW5ndGh8fHRoaXMuX2FkZEJ1dHRvbnNDb250YWluZXIoKTt2YXIgaT17YWN0aW9uOnQsbGFiZWw6dGhpcy5kLmxvY1t0XX0sYT1uLnRlbXBsYXRlKHMsaSk7ZShcIltkYXRhLWFjdGlvbj1cIit0K1wiXVwiLHRoaXMuJGJ1dHRvbnNDb250YWluZXIpLmxlbmd0aHx8dGhpcy4kYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoYSl9LF9hZGRCdXR0b25zQ29udGFpbmVyOmZ1bmN0aW9uKCl7dGhpcy5kLiRkYXRlcGlja2VyLmFwcGVuZChpKSx0aGlzLiRidXR0b25zQ29udGFpbmVyPWUoXCIuZGF0ZXBpY2tlci0tYnV0dG9uc1wiLHRoaXMuZC4kZGF0ZXBpY2tlcil9LHNldE5hdlN0YXR1czpmdW5jdGlvbigpe2lmKCh0aGlzLm9wdHMubWluRGF0ZXx8dGhpcy5vcHRzLm1heERhdGUpJiZ0aGlzLm9wdHMuZGlzYWJsZU5hdldoZW5PdXRPZlJhbmdlKXt2YXIgdD10aGlzLmQucGFyc2VkRGF0ZSxlPXQubW9udGgsaT10LnllYXIscz10LmRhdGU7c3dpdGNoKHRoaXMuZC52aWV3KXtjYXNlXCJkYXlzXCI6dGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaSxlLTEsMSksXCJtb250aFwiKXx8dGhpcy5fZGlzYWJsZU5hdihcInByZXZcIiksdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaSxlKzEsMSksXCJtb250aFwiKXx8dGhpcy5fZGlzYWJsZU5hdihcIm5leHRcIik7YnJlYWs7Y2FzZVwibW9udGhzXCI6dGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoaS0xLGUscyksXCJ5ZWFyXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwicHJldlwiKSx0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShpKzEsZSxzKSxcInllYXJcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJuZXh0XCIpO2JyZWFrO2Nhc2VcInllYXJzXCI6dmFyIGE9bi5nZXREZWNhZGUodGhpcy5kLmRhdGUpO3RoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGFbMF0tMSwwLDEpLFwieWVhclwiKXx8dGhpcy5fZGlzYWJsZU5hdihcInByZXZcIiksdGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoYVsxXSsxLDAsMSksXCJ5ZWFyXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwibmV4dFwiKX19fSxfZGlzYWJsZU5hdjpmdW5jdGlvbih0KXtlKCdbZGF0YS1hY3Rpb249XCInK3QrJ1wiXScsdGhpcy5kLiRuYXYpLmFkZENsYXNzKFwiLWRpc2FibGVkLVwiKX0sX2FjdGl2YXRlTmF2OmZ1bmN0aW9uKHQpe2UoJ1tkYXRhLWFjdGlvbj1cIicrdCsnXCJdJyx0aGlzLmQuJG5hdikucmVtb3ZlQ2xhc3MoXCItZGlzYWJsZWQtXCIpfSxfb25DbGlja05hdkJ1dHRvbjpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5jbG9zZXN0KFwiW2RhdGEtYWN0aW9uXVwiKSxzPWkuZGF0YShcImFjdGlvblwiKTt0aGlzLmRbc10oKX0sX29uQ2xpY2tOYXZUaXRsZTpmdW5jdGlvbih0KXtyZXR1cm4gZSh0LnRhcmdldCkuaGFzQ2xhc3MoXCItZGlzYWJsZWQtXCIpP3ZvaWQgMDpcImRheXNcIj09dGhpcy5kLnZpZXc/dGhpcy5kLnZpZXc9XCJtb250aHNcIjp2b2lkKHRoaXMuZC52aWV3PVwieWVhcnNcIil9fX0oKSxmdW5jdGlvbigpe3ZhciB0PSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZVwiPjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnRcIj4gICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3Vyc1wiPiN7aG91clZpc2libGV9PC9zcGFuPiAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWNvbG9uXCI+Ojwvc3Bhbj4gICA8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1taW51dGVzXCI+I3ttaW5WYWx1ZX08L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtc2xpZGVyc1wiPiAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPiAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwiaG91cnNcIiB2YWx1ZT1cIiN7aG91clZhbHVlfVwiIG1pbj1cIiN7aG91ck1pbn1cIiBtYXg9XCIje2hvdXJNYXh9XCIgc3RlcD1cIiN7aG91clN0ZXB9XCIvPiAgIDwvZGl2PiAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLXJvd1wiPiAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwibWludXRlc1wiIHZhbHVlPVwiI3ttaW5WYWx1ZX1cIiBtaW49XCIje21pbk1pbn1cIiBtYXg9XCIje21pbk1heH1cIiBzdGVwPVwiI3ttaW5TdGVwfVwiLz4gICA8L2Rpdj48L2Rpdj48L2Rpdj4nLGk9ZS5mbi5kYXRlcGlja2VyLHM9aS5Db25zdHJ1Y3RvcjtpLlRpbWVwaWNrZXI9ZnVuY3Rpb24odCxlKXt0aGlzLmQ9dCx0aGlzLm9wdHM9ZSx0aGlzLmluaXQoKX0saS5UaW1lcGlja2VyLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3ZhciB0PVwiaW5wdXRcIjt0aGlzLl9zZXRUaW1lKHRoaXMuZC5kYXRlKSx0aGlzLl9idWlsZEhUTUwoKSxuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC90cmlkZW50L2dpKSYmKHQ9XCJjaGFuZ2VcIiksdGhpcy5kLiRlbC5vbihcInNlbGVjdERhdGVcIix0aGlzLl9vblNlbGVjdERhdGUuYmluZCh0aGlzKSksdGhpcy4kcmFuZ2VzLm9uKHQsdGhpcy5fb25DaGFuZ2VSYW5nZS5iaW5kKHRoaXMpKSx0aGlzLiRyYW5nZXMub24oXCJtb3VzZXVwXCIsdGhpcy5fb25Nb3VzZVVwUmFuZ2UuYmluZCh0aGlzKSksdGhpcy4kcmFuZ2VzLm9uKFwibW91c2Vtb3ZlIGZvY3VzIFwiLHRoaXMuX29uTW91c2VFbnRlclJhbmdlLmJpbmQodGhpcykpLHRoaXMuJHJhbmdlcy5vbihcIm1vdXNlb3V0IGJsdXJcIix0aGlzLl9vbk1vdXNlT3V0UmFuZ2UuYmluZCh0aGlzKSl9LF9zZXRUaW1lOmZ1bmN0aW9uKHQpe3ZhciBlPXMuZ2V0UGFyc2VkRGF0ZSh0KTt0aGlzLl9oYW5kbGVEYXRlKHQpLHRoaXMuaG91cnM9ZS5ob3Vyczx0aGlzLm1pbkhvdXJzP3RoaXMubWluSG91cnM6ZS5ob3Vycyx0aGlzLm1pbnV0ZXM9ZS5taW51dGVzPHRoaXMubWluTWludXRlcz90aGlzLm1pbk1pbnV0ZXM6ZS5taW51dGVzfSxfc2V0TWluVGltZUZyb21EYXRlOmZ1bmN0aW9uKHQpe3RoaXMubWluSG91cnM9dC5nZXRIb3VycygpLHRoaXMubWluTWludXRlcz10LmdldE1pbnV0ZXMoKSx0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSYmdGhpcy5kLmxhc3RTZWxlY3RlZERhdGUuZ2V0SG91cnMoKT50LmdldEhvdXJzKCkmJih0aGlzLm1pbk1pbnV0ZXM9dGhpcy5vcHRzLm1pbk1pbnV0ZXMpfSxfc2V0TWF4VGltZUZyb21EYXRlOmZ1bmN0aW9uKHQpe1xudGhpcy5tYXhIb3Vycz10LmdldEhvdXJzKCksdGhpcy5tYXhNaW51dGVzPXQuZ2V0TWludXRlcygpLHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlJiZ0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZS5nZXRIb3VycygpPHQuZ2V0SG91cnMoKSYmKHRoaXMubWF4TWludXRlcz10aGlzLm9wdHMubWF4TWludXRlcyl9LF9zZXREZWZhdWx0TWluTWF4VGltZTpmdW5jdGlvbigpe3ZhciB0PTIzLGU9NTksaT10aGlzLm9wdHM7dGhpcy5taW5Ib3Vycz1pLm1pbkhvdXJzPDB8fGkubWluSG91cnM+dD8wOmkubWluSG91cnMsdGhpcy5taW5NaW51dGVzPWkubWluTWludXRlczwwfHxpLm1pbk1pbnV0ZXM+ZT8wOmkubWluTWludXRlcyx0aGlzLm1heEhvdXJzPWkubWF4SG91cnM8MHx8aS5tYXhIb3Vycz50P3Q6aS5tYXhIb3Vycyx0aGlzLm1heE1pbnV0ZXM9aS5tYXhNaW51dGVzPDB8fGkubWF4TWludXRlcz5lP2U6aS5tYXhNaW51dGVzfSxfdmFsaWRhdGVIb3Vyc01pbnV0ZXM6ZnVuY3Rpb24odCl7dGhpcy5ob3Vyczx0aGlzLm1pbkhvdXJzP3RoaXMuaG91cnM9dGhpcy5taW5Ib3Vyczp0aGlzLmhvdXJzPnRoaXMubWF4SG91cnMmJih0aGlzLmhvdXJzPXRoaXMubWF4SG91cnMpLHRoaXMubWludXRlczx0aGlzLm1pbk1pbnV0ZXM/dGhpcy5taW51dGVzPXRoaXMubWluTWludXRlczp0aGlzLm1pbnV0ZXM+dGhpcy5tYXhNaW51dGVzJiYodGhpcy5taW51dGVzPXRoaXMubWF4TWludXRlcyl9LF9idWlsZEhUTUw6ZnVuY3Rpb24oKXt2YXIgaT1zLmdldExlYWRpbmdaZXJvTnVtLGE9e2hvdXJNaW46dGhpcy5taW5Ib3Vycyxob3VyTWF4OmkodGhpcy5tYXhIb3VycyksaG91clN0ZXA6dGhpcy5vcHRzLmhvdXJzU3RlcCxob3VyVmFsdWU6dGhpcy5ob3Vycyxob3VyVmlzaWJsZTppKHRoaXMuZGlzcGxheUhvdXJzKSxtaW5NaW46dGhpcy5taW5NaW51dGVzLG1pbk1heDppKHRoaXMubWF4TWludXRlcyksbWluU3RlcDp0aGlzLm9wdHMubWludXRlc1N0ZXAsbWluVmFsdWU6aSh0aGlzLm1pbnV0ZXMpfSxuPXMudGVtcGxhdGUodCxhKTt0aGlzLiR0aW1lcGlja2VyPWUobikuYXBwZW5kVG8odGhpcy5kLiRkYXRlcGlja2VyKSx0aGlzLiRyYW5nZXM9ZSgnW3R5cGU9XCJyYW5nZVwiXScsdGhpcy4kdGltZXBpY2tlciksdGhpcy4kaG91cnM9ZSgnW25hbWU9XCJob3Vyc1wiXScsdGhpcy4kdGltZXBpY2tlciksdGhpcy4kbWludXRlcz1lKCdbbmFtZT1cIm1pbnV0ZXNcIl0nLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJGhvdXJzVGV4dD1lKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1ob3Vyc1wiLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuJG1pbnV0ZXNUZXh0PWUoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LW1pbnV0ZXNcIix0aGlzLiR0aW1lcGlja2VyKSx0aGlzLmQuYW1wbSYmKHRoaXMuJGFtcG09ZSgnPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtYW1wbVwiPicpLmFwcGVuZFRvKGUoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50XCIsdGhpcy4kdGltZXBpY2tlcikpLmh0bWwodGhpcy5kYXlQZXJpb2QpLHRoaXMuJHRpbWVwaWNrZXIuYWRkQ2xhc3MoXCItYW0tcG0tXCIpKX0sX3VwZGF0ZUN1cnJlbnRUaW1lOmZ1bmN0aW9uKCl7dmFyIHQ9cy5nZXRMZWFkaW5nWmVyb051bSh0aGlzLmRpc3BsYXlIb3VycyksZT1zLmdldExlYWRpbmdaZXJvTnVtKHRoaXMubWludXRlcyk7dGhpcy4kaG91cnNUZXh0Lmh0bWwodCksdGhpcy4kbWludXRlc1RleHQuaHRtbChlKSx0aGlzLmQuYW1wbSYmdGhpcy4kYW1wbS5odG1sKHRoaXMuZGF5UGVyaW9kKX0sX3VwZGF0ZVJhbmdlczpmdW5jdGlvbigpe3RoaXMuJGhvdXJzLmF0dHIoe21pbjp0aGlzLm1pbkhvdXJzLG1heDp0aGlzLm1heEhvdXJzfSkudmFsKHRoaXMuaG91cnMpLHRoaXMuJG1pbnV0ZXMuYXR0cih7bWluOnRoaXMubWluTWludXRlcyxtYXg6dGhpcy5tYXhNaW51dGVzfSkudmFsKHRoaXMubWludXRlcyl9LF9oYW5kbGVEYXRlOmZ1bmN0aW9uKHQpe3RoaXMuX3NldERlZmF1bHRNaW5NYXhUaW1lKCksdCYmKHMuaXNTYW1lKHQsdGhpcy5kLm9wdHMubWluRGF0ZSk/dGhpcy5fc2V0TWluVGltZUZyb21EYXRlKHRoaXMuZC5vcHRzLm1pbkRhdGUpOnMuaXNTYW1lKHQsdGhpcy5kLm9wdHMubWF4RGF0ZSkmJnRoaXMuX3NldE1heFRpbWVGcm9tRGF0ZSh0aGlzLmQub3B0cy5tYXhEYXRlKSksdGhpcy5fdmFsaWRhdGVIb3Vyc01pbnV0ZXModCl9LHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuX3VwZGF0ZVJhbmdlcygpLHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCl9LF9nZXRWYWxpZEhvdXJzRnJvbURhdGU6ZnVuY3Rpb24odCxlKXt2YXIgaT10LGE9dDt0IGluc3RhbmNlb2YgRGF0ZSYmKGk9cy5nZXRQYXJzZWREYXRlKHQpLGE9aS5ob3Vycyk7dmFyIG49ZXx8dGhpcy5kLmFtcG0saD1cImFtXCI7aWYobilzd2l0Y2goITApe2Nhc2UgMD09YTphPTEyO2JyZWFrO2Nhc2UgMTI9PWE6aD1cInBtXCI7YnJlYWs7Y2FzZSBhPjExOmEtPTEyLGg9XCJwbVwifXJldHVybntob3VyczphLGRheVBlcmlvZDpofX0sc2V0IGhvdXJzKHQpe3RoaXMuX2hvdXJzPXQ7dmFyIGU9dGhpcy5fZ2V0VmFsaWRIb3Vyc0Zyb21EYXRlKHQpO3RoaXMuZGlzcGxheUhvdXJzPWUuaG91cnMsdGhpcy5kYXlQZXJpb2Q9ZS5kYXlQZXJpb2R9LGdldCBob3Vycygpe3JldHVybiB0aGlzLl9ob3Vyc30sX29uQ2hhbmdlUmFuZ2U6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkscz1pLmF0dHIoXCJuYW1lXCIpO3RoaXMuZC50aW1lcGlja2VySXNBY3RpdmU9ITAsdGhpc1tzXT1pLnZhbCgpLHRoaXMuX3VwZGF0ZUN1cnJlbnRUaW1lKCksdGhpcy5kLl90cmlnZ2VyKFwidGltZUNoYW5nZVwiLFt0aGlzLmhvdXJzLHRoaXMubWludXRlc10pLHRoaXMuX2hhbmRsZURhdGUodGhpcy5kLmxhc3RTZWxlY3RlZERhdGUpLHRoaXMudXBkYXRlKCl9LF9vblNlbGVjdERhdGU6ZnVuY3Rpb24odCxlKXt0aGlzLl9oYW5kbGVEYXRlKGUpLHRoaXMudXBkYXRlKCl9LF9vbk1vdXNlRW50ZXJSYW5nZTpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5hdHRyKFwibmFtZVwiKTtlKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1cIitpLHRoaXMuJHRpbWVwaWNrZXIpLmFkZENsYXNzKFwiLWZvY3VzLVwiKX0sX29uTW91c2VPdXRSYW5nZTpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KS5hdHRyKFwibmFtZVwiKTt0aGlzLmQuaW5Gb2N1c3x8ZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtXCIraSx0aGlzLiR0aW1lcGlja2VyKS5yZW1vdmVDbGFzcyhcIi1mb2N1cy1cIil9LF9vbk1vdXNlVXBSYW5nZTpmdW5jdGlvbih0KXt0aGlzLmQudGltZXBpY2tlcklzQWN0aXZlPSExfX19KCl9KHdpbmRvdyxqUXVlcnkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvZGF0ZXBpY2tlci5taW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvZGF0ZXBpY2tlci5taW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiOyhmdW5jdGlvbiAoJCkgeyAkLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2VbJ2VuJ10gPSB7XHJcbiAgICBkYXlzOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J10sXHJcbiAgICBkYXlzU2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXHJcbiAgICBkYXlzTWluOiBbJ1N1JywgJ01vJywgJ1R1JywgJ1dlJywgJ1RoJywgJ0ZyJywgJ1NhJ10sXHJcbiAgICBtb250aHM6IFsnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLCdBcHJpbCcsJ01heScsJ0p1bmUnLCAnSnVseScsJ0F1Z3VzdCcsJ1NlcHRlbWJlcicsJ09jdG9iZXInLCdOb3ZlbWJlcicsJ0RlY2VtYmVyJ10sXHJcbiAgICBtb250aHNTaG9ydDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxyXG4gICAgdG9kYXk6ICdUb2RheScsXHJcbiAgICBjbGVhcjogJ0NsZWFyJyxcclxuICAgIGRhdGVGb3JtYXQ6ICdtbS9kZC95eXl5JyxcclxuICAgIHRpbWVGb3JtYXQ6ICdoaDppaSBhYScsXHJcbiAgICBmaXJzdERheTogMFxyXG59OyB9KShqUXVlcnkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvaTE4bi9kYXRlcGlja2VyLmVuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9haXItZGF0ZXBpY2tlci9kaXN0L2pzL2kxOG4vZGF0ZXBpY2tlci5lbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiEgSGFtbWVyLkpTIC0gdjIuMC43IC0gMjAxNi0wNC0yMlxuICogaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSm9yaWsgVGFuZ2VsZGVyO1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgZXhwb3J0TmFtZSwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxudmFyIFZFTkRPUl9QUkVGSVhFUyA9IFsnJywgJ3dlYmtpdCcsICdNb3onLCAnTVMnLCAnbXMnLCAnbyddO1xudmFyIFRFU1RfRUxFTUVOVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG52YXIgVFlQRV9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG5cbnZhciByb3VuZCA9IE1hdGgucm91bmQ7XG52YXIgYWJzID0gTWF0aC5hYnM7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogc2V0IGEgdGltZW91dCB3aXRoIGEgZ2l2ZW4gc2NvcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZW91dFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHNldFRpbWVvdXRDb250ZXh0KGZuLCB0aW1lb3V0LCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoYmluZEZuKGZuLCBjb250ZXh0KSwgdGltZW91dCk7XG59XG5cbi8qKlxuICogaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCB3ZSB3YW50IHRvIGV4ZWN1dGUgdGhlIGZuIG9uIGVhY2ggZW50cnlcbiAqIGlmIGl0IGFpbnQgYW4gYXJyYXkgd2UgZG9uJ3Qgd2FudCB0byBkbyBhIHRoaW5nLlxuICogdGhpcyBpcyB1c2VkIGJ5IGFsbCB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIHNpbmdsZSBhbmQgYXJyYXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp8QXJyYXl9IGFyZ1xuICogQHBhcmFtIHtTdHJpbmd9IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHRdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW52b2tlQXJyYXlBcmcoYXJnLCBmbiwgY29udGV4dCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgZWFjaChhcmcsIGNvbnRleHRbZm5dLCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiB3YWxrIG9iamVjdHMgYW5kIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKCFvYmopIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvYmouZm9yRWFjaCkge1xuICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgb2JqLmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoaSkgJiYgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogd3JhcCBhIG1ldGhvZCB3aXRoIGEgZGVwcmVjYXRpb24gd2FybmluZyBhbmQgc3RhY2sgdHJhY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIHRoZSBzdXBwbGllZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGRlcHJlY2F0ZShtZXRob2QsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICB2YXIgZGVwcmVjYXRpb25NZXNzYWdlID0gJ0RFUFJFQ0FURUQgTUVUSE9EOiAnICsgbmFtZSArICdcXG4nICsgbWVzc2FnZSArICcgQVQgXFxuJztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEVycm9yKCdnZXQtc3RhY2stdHJhY2UnKTtcbiAgICAgICAgdmFyIHN0YWNrID0gZSAmJiBlLnN0YWNrID8gZS5zdGFjay5yZXBsYWNlKC9eW15cXChdKz9bXFxuJF0vZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMrYXRcXHMrL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eT2JqZWN0Ljxhbm9ueW1vdXM+XFxzKlxcKC9nbSwgJ3thbm9ueW1vdXN9KClAJykgOiAnVW5rbm93biBTdGFjayBUcmFjZSc7XG5cbiAgICAgICAgdmFyIGxvZyA9IHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS53YXJuIHx8IHdpbmRvdy5jb25zb2xlLmxvZyk7XG4gICAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgICAgIGxvZy5jYWxsKHdpbmRvdy5jb25zb2xlLCBkZXByZWNhdGlvbk1lc3NhZ2UsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gey4uLk9iamVjdH0gb2JqZWN0c190b19hc3NpZ25cbiAqIEByZXR1cm5zIHtPYmplY3R9IHRhcmdldFxuICovXG52YXIgYXNzaWduO1xuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG59IGVsc2Uge1xuICAgIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW21lcmdlPWZhbHNlXVxuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgZXh0ZW5kID0gZGVwcmVjYXRlKGZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzcmMsIG1lcmdlKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzcmMpO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICghbWVyZ2UgfHwgKG1lcmdlICYmIGRlc3Rba2V5c1tpXV0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGRlc3Rba2V5c1tpXV0gPSBzcmNba2V5c1tpXV07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbn0sICdleHRlbmQnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIG1lcmdlIHRoZSB2YWx1ZXMgZnJvbSBzcmMgaW4gdGhlIGRlc3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgdGhhdCBleGlzdCBpbiBkZXN0IHdpbGwgbm90IGJlIG92ZXJ3cml0dGVuIGJ5IHNyY1xuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIG1lcmdlID0gZGVwcmVjYXRlKGZ1bmN0aW9uIG1lcmdlKGRlc3QsIHNyYykge1xuICAgIHJldHVybiBleHRlbmQoZGVzdCwgc3JjLCB0cnVlKTtcbn0sICdtZXJnZScsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogc2ltcGxlIGNsYXNzIGluaGVyaXRhbmNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGlsZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gYmFzZVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzXVxuICovXG5mdW5jdGlvbiBpbmhlcml0KGNoaWxkLCBiYXNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIGJhc2VQID0gYmFzZS5wcm90b3R5cGUsXG4gICAgICAgIGNoaWxkUDtcblxuICAgIGNoaWxkUCA9IGNoaWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYmFzZVApO1xuICAgIGNoaWxkUC5jb25zdHJ1Y3RvciA9IGNoaWxkO1xuICAgIGNoaWxkUC5fc3VwZXIgPSBiYXNlUDtcblxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGFzc2lnbihjaGlsZFAsIHByb3BlcnRpZXMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBzaW1wbGUgZnVuY3Rpb24gYmluZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGJpbmRGbihmbiwgY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBib3VuZEZuKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGxldCBhIGJvb2xlYW4gdmFsdWUgYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgbXVzdCByZXR1cm4gYSBib29sZWFuXG4gKiB0aGlzIGZpcnN0IGl0ZW0gaW4gYXJncyB3aWxsIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gdmFsXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJnc11cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBib29sT3JGbih2YWwsIGFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PSBUWVBFX0ZVTkNUSU9OKSB7XG4gICAgICAgIHJldHVybiB2YWwuYXBwbHkoYXJncyA/IGFyZ3NbMF0gfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiB1c2UgdGhlIHZhbDIgd2hlbiB2YWwxIGlzIHVuZGVmaW5lZFxuICogQHBhcmFtIHsqfSB2YWwxXG4gKiBAcGFyYW0geyp9IHZhbDJcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBpZlVuZGVmaW5lZCh2YWwxLCB2YWwyKSB7XG4gICAgcmV0dXJuICh2YWwxID09PSB1bmRlZmluZWQpID8gdmFsMiA6IHZhbDE7XG59XG5cbi8qKlxuICogYWRkRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgbm9kZSBpcyBpbiB0aGUgZ2l2ZW4gcGFyZW50XG4gKiBAbWV0aG9kIGhhc1BhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBoYXNQYXJlbnQobm9kZSwgcGFyZW50KSB7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogc21hbGwgaW5kZXhPZiB3cmFwcGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHJldHVybnMge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGluU3RyKHN0ciwgZmluZCkge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihmaW5kKSA+IC0xO1xufVxuXG4vKipcbiAqIHNwbGl0IHN0cmluZyBvbiB3aGl0ZXNwYWNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7QXJyYXl9IHdvcmRzXG4gKi9cbmZ1bmN0aW9uIHNwbGl0U3RyKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KC9cXHMrL2cpO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBhcnJheSBjb250YWlucyB0aGUgb2JqZWN0IHVzaW5nIGluZGV4T2Ygb3IgYSBzaW1wbGUgcG9seUZpbGxcbiAqIEBwYXJhbSB7QXJyYXl9IHNyY1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZmluZEJ5S2V5XVxuICogQHJldHVybiB7Qm9vbGVhbnxOdW1iZXJ9IGZhbHNlIHdoZW4gbm90IGZvdW5kLCBvciB0aGUgaW5kZXhcbiAqL1xuZnVuY3Rpb24gaW5BcnJheShzcmMsIGZpbmQsIGZpbmRCeUtleSkge1xuICAgIGlmIChzcmMuaW5kZXhPZiAmJiAhZmluZEJ5S2V5KSB7XG4gICAgICAgIHJldHVybiBzcmMuaW5kZXhPZihmaW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKChmaW5kQnlLZXkgJiYgc3JjW2ldW2ZpbmRCeUtleV0gPT0gZmluZCkgfHwgKCFmaW5kQnlLZXkgJiYgc3JjW2ldID09PSBmaW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG59XG5cbi8qKlxuICogY29udmVydCBhcnJheS1saWtlIG9iamVjdHMgdG8gcmVhbCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqLCAwKTtcbn1cblxuLyoqXG4gKiB1bmlxdWUgYXJyYXkgd2l0aCBvYmplY3RzIGJhc2VkIG9uIGEga2V5IChsaWtlICdpZCcpIG9yIGp1c3QgYnkgdGhlIGFycmF5J3MgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IHNyYyBbe2lkOjF9LHtpZDoyfSx7aWQ6MX1dXG4gKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NvcnQ9RmFsc2VdXG4gKiBAcmV0dXJucyB7QXJyYXl9IFt7aWQ6MX0se2lkOjJ9XVxuICovXG5mdW5jdGlvbiB1bmlxdWVBcnJheShzcmMsIGtleSwgc29ydCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhciBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICB2YXIgdmFsID0ga2V5ID8gc3JjW2ldW2tleV0gOiBzcmNbaV07XG4gICAgICAgIGlmIChpbkFycmF5KHZhbHVlcywgdmFsKSA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChzcmNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlc1tpXSA9IHZhbDtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmIChzb3J0KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KGZ1bmN0aW9uIHNvcnRVbmlxdWVBcnJheShhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFba2V5XSA+IGJba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8qKlxuICogZ2V0IHRoZSBwcmVmaXhlZCBwcm9wZXJ0eVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7U3RyaW5nfFVuZGVmaW5lZH0gcHJlZml4ZWRcbiAqL1xuZnVuY3Rpb24gcHJlZml4ZWQob2JqLCBwcm9wZXJ0eSkge1xuICAgIHZhciBwcmVmaXgsIHByb3A7XG4gICAgdmFyIGNhbWVsUHJvcCA9IHByb3BlcnR5WzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IFZFTkRPUl9QUkVGSVhFUy5sZW5ndGgpIHtcbiAgICAgICAgcHJlZml4ID0gVkVORE9SX1BSRUZJWEVTW2ldO1xuICAgICAgICBwcm9wID0gKHByZWZpeCkgPyBwcmVmaXggKyBjYW1lbFByb3AgOiBwcm9wZXJ0eTtcblxuICAgICAgICBpZiAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBnZXQgYSB1bmlxdWUgaWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHVuaXF1ZUlkXG4gKi9cbnZhciBfdW5pcXVlSWQgPSAxO1xuZnVuY3Rpb24gdW5pcXVlSWQoKSB7XG4gICAgcmV0dXJuIF91bmlxdWVJZCsrO1xufVxuXG4vKipcbiAqIGdldCB0aGUgd2luZG93IG9iamVjdCBvZiBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RG9jdW1lbnRWaWV3fFdpbmRvd31cbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93Rm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgdmFyIGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBlbGVtZW50O1xuICAgIHJldHVybiAoZG9jLmRlZmF1bHRWaWV3IHx8IGRvYy5wYXJlbnRXaW5kb3cgfHwgd2luZG93KTtcbn1cblxudmFyIE1PQklMRV9SRUdFWCA9IC9tb2JpbGV8dGFibGV0fGlwKGFkfGhvbmV8b2QpfGFuZHJvaWQvaTtcblxudmFyIFNVUFBPUlRfVE9VQ0ggPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KTtcbnZhciBTVVBQT1JUX1BPSU5URVJfRVZFTlRTID0gcHJlZml4ZWQod2luZG93LCAnUG9pbnRlckV2ZW50JykgIT09IHVuZGVmaW5lZDtcbnZhciBTVVBQT1JUX09OTFlfVE9VQ0ggPSBTVVBQT1JUX1RPVUNIICYmIE1PQklMRV9SRUdFWC50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG52YXIgSU5QVVRfVFlQRV9UT1VDSCA9ICd0b3VjaCc7XG52YXIgSU5QVVRfVFlQRV9QRU4gPSAncGVuJztcbnZhciBJTlBVVF9UWVBFX01PVVNFID0gJ21vdXNlJztcbnZhciBJTlBVVF9UWVBFX0tJTkVDVCA9ICdraW5lY3QnO1xuXG52YXIgQ09NUFVURV9JTlRFUlZBTCA9IDI1O1xuXG52YXIgSU5QVVRfU1RBUlQgPSAxO1xudmFyIElOUFVUX01PVkUgPSAyO1xudmFyIElOUFVUX0VORCA9IDQ7XG52YXIgSU5QVVRfQ0FOQ0VMID0gODtcblxudmFyIERJUkVDVElPTl9OT05FID0gMTtcbnZhciBESVJFQ1RJT05fTEVGVCA9IDI7XG52YXIgRElSRUNUSU9OX1JJR0hUID0gNDtcbnZhciBESVJFQ1RJT05fVVAgPSA4O1xudmFyIERJUkVDVElPTl9ET1dOID0gMTY7XG5cbnZhciBESVJFQ1RJT05fSE9SSVpPTlRBTCA9IERJUkVDVElPTl9MRUZUIHwgRElSRUNUSU9OX1JJR0hUO1xudmFyIERJUkVDVElPTl9WRVJUSUNBTCA9IERJUkVDVElPTl9VUCB8IERJUkVDVElPTl9ET1dOO1xudmFyIERJUkVDVElPTl9BTEwgPSBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTDtcblxudmFyIFBST1BTX1hZID0gWyd4JywgJ3knXTtcbnZhciBQUk9QU19DTElFTlRfWFkgPSBbJ2NsaWVudFgnLCAnY2xpZW50WSddO1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSW5wdXQobWFuYWdlciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIHRoaXMudGFyZ2V0ID0gbWFuYWdlci5vcHRpb25zLmlucHV0VGFyZ2V0O1xuXG4gICAgLy8gc21hbGxlciB3cmFwcGVyIGFyb3VuZCB0aGUgaGFuZGxlciwgZm9yIHRoZSBzY29wZSBhbmQgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIG1hbmFnZXIsXG4gICAgLy8gc28gd2hlbiBkaXNhYmxlZCB0aGUgaW5wdXQgZXZlbnRzIGFyZSBjb21wbGV0ZWx5IGJ5cGFzc2VkLlxuICAgIHRoaXMuZG9tSGFuZGxlciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGlmIChib29sT3JGbihtYW5hZ2VyLm9wdGlvbnMuZW5hYmxlLCBbbWFuYWdlcl0pKSB7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZXIoZXYpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG59XG5cbklucHV0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzaG91bGQgaGFuZGxlIHRoZSBpbnB1dEV2ZW50IGRhdGEgYW5kIHRyaWdnZXIgdGhlIGNhbGxiYWNrXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgYWRkRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIGNhbGxlZCBieSB0aGUgTWFuYWdlciBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRJbnN0YW5jZShtYW5hZ2VyKSB7XG4gICAgdmFyIFR5cGU7XG4gICAgdmFyIGlucHV0Q2xhc3MgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRDbGFzcztcblxuICAgIGlmIChpbnB1dENsYXNzKSB7XG4gICAgICAgIFR5cGUgPSBpbnB1dENsYXNzO1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9QT0lOVEVSX0VWRU5UUykge1xuICAgICAgICBUeXBlID0gUG9pbnRlckV2ZW50SW5wdXQ7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX09OTFlfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoSW5wdXQ7XG4gICAgfSBlbHNlIGlmICghU1VQUE9SVF9UT1VDSCkge1xuICAgICAgICBUeXBlID0gTW91c2VJbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBUeXBlID0gVG91Y2hNb3VzZUlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IChUeXBlKShtYW5hZ2VyLCBpbnB1dEhhbmRsZXIpO1xufVxuXG4vKipcbiAqIGhhbmRsZSBpbnB1dCBldmVudHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGlucHV0SGFuZGxlcihtYW5hZ2VyLCBldmVudFR5cGUsIGlucHV0KSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBjaGFuZ2VkUG9pbnRlcnNMZW4gPSBpbnB1dC5jaGFuZ2VkUG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBpc0ZpcnN0ID0gKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuICAgIHZhciBpc0ZpbmFsID0gKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuXG4gICAgaW5wdXQuaXNGaXJzdCA9ICEhaXNGaXJzdDtcbiAgICBpbnB1dC5pc0ZpbmFsID0gISFpc0ZpbmFsO1xuXG4gICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgbWFuYWdlci5zZXNzaW9uID0ge307XG4gICAgfVxuXG4gICAgLy8gc291cmNlIGV2ZW50IGlzIHRoZSBub3JtYWxpemVkIHZhbHVlIG9mIHRoZSBkb21FdmVudHNcbiAgICAvLyBsaWtlICd0b3VjaHN0YXJ0LCBtb3VzZXVwLCBwb2ludGVyZG93bidcbiAgICBpbnB1dC5ldmVudFR5cGUgPSBldmVudFR5cGU7XG5cbiAgICAvLyBjb21wdXRlIHNjYWxlLCByb3RhdGlvbiBldGNcbiAgICBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KTtcblxuICAgIC8vIGVtaXQgc2VjcmV0IGV2ZW50XG4gICAgbWFuYWdlci5lbWl0KCdoYW1tZXIuaW5wdXQnLCBpbnB1dCk7XG5cbiAgICBtYW5hZ2VyLnJlY29nbml6ZShpbnB1dCk7XG4gICAgbWFuYWdlci5zZXNzaW9uLnByZXZJbnB1dCA9IGlucHV0O1xufVxuXG4vKipcbiAqIGV4dGVuZCB0aGUgZGF0YSB3aXRoIHNvbWUgdXNhYmxlIHByb3BlcnRpZXMgbGlrZSBzY2FsZSwgcm90YXRlLCB2ZWxvY2l0eSBldGNcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYW5hZ2VyXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCkge1xuICAgIHZhciBzZXNzaW9uID0gbWFuYWdlci5zZXNzaW9uO1xuICAgIHZhciBwb2ludGVycyA9IGlucHV0LnBvaW50ZXJzO1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIHN0b3JlIHRoZSBmaXJzdCBpbnB1dCB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGFuZCBkaXJlY3Rpb25cbiAgICBpZiAoIXNlc3Npb24uZmlyc3RJbnB1dCkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0SW5wdXQgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfVxuXG4gICAgLy8gdG8gY29tcHV0ZSBzY2FsZSBhbmQgcm90YXRpb24gd2UgbmVlZCB0byBzdG9yZSB0aGUgbXVsdGlwbGUgdG91Y2hlc1xuICAgIGlmIChwb2ludGVyc0xlbmd0aCA+IDEgJiYgIXNlc3Npb24uZmlyc3RNdWx0aXBsZSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3RJbnB1dCA9IHNlc3Npb24uZmlyc3RJbnB1dDtcbiAgICB2YXIgZmlyc3RNdWx0aXBsZSA9IHNlc3Npb24uZmlyc3RNdWx0aXBsZTtcbiAgICB2YXIgb2Zmc2V0Q2VudGVyID0gZmlyc3RNdWx0aXBsZSA/IGZpcnN0TXVsdGlwbGUuY2VudGVyIDogZmlyc3RJbnB1dC5jZW50ZXI7XG5cbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyID0gZ2V0Q2VudGVyKHBvaW50ZXJzKTtcbiAgICBpbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICBpbnB1dC5kZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBmaXJzdElucHV0LnRpbWVTdGFtcDtcblxuICAgIGlucHV0LmFuZ2xlID0gZ2V0QW5nbGUob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuICAgIGlucHV0LmRpc3RhbmNlID0gZ2V0RGlzdGFuY2Uob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuXG4gICAgY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpO1xuICAgIGlucHV0Lm9mZnNldERpcmVjdGlvbiA9IGdldERpcmVjdGlvbihpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG5cbiAgICB2YXIgb3ZlcmFsbFZlbG9jaXR5ID0gZ2V0VmVsb2NpdHkoaW5wdXQuZGVsdGFUaW1lLCBpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WCA9IG92ZXJhbGxWZWxvY2l0eS54O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVkgPSBvdmVyYWxsVmVsb2NpdHkueTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHkgPSAoYWJzKG92ZXJhbGxWZWxvY2l0eS54KSA+IGFicyhvdmVyYWxsVmVsb2NpdHkueSkpID8gb3ZlcmFsbFZlbG9jaXR5LnggOiBvdmVyYWxsVmVsb2NpdHkueTtcblxuICAgIGlucHV0LnNjYWxlID0gZmlyc3RNdWx0aXBsZSA/IGdldFNjYWxlKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDE7XG4gICAgaW5wdXQucm90YXRpb24gPSBmaXJzdE11bHRpcGxlID8gZ2V0Um90YXRpb24oZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMDtcblxuICAgIGlucHV0Lm1heFBvaW50ZXJzID0gIXNlc3Npb24ucHJldklucHV0ID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogKChpbnB1dC5wb2ludGVycy5sZW5ndGggPlxuICAgICAgICBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycykgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycyk7XG5cbiAgICBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpO1xuXG4gICAgLy8gZmluZCB0aGUgY29ycmVjdCB0YXJnZXRcbiAgICB2YXIgdGFyZ2V0ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmIChoYXNQYXJlbnQoaW5wdXQuc3JjRXZlbnQudGFyZ2V0LCB0YXJnZXQpKSB7XG4gICAgICAgIHRhcmdldCA9IGlucHV0LnNyY0V2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaW5wdXQudGFyZ2V0ID0gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG4gICAgdmFyIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2SW5wdXQgPSBzZXNzaW9uLnByZXZJbnB1dCB8fCB7fTtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX1NUQVJUIHx8IHByZXZJbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX0VORCkge1xuICAgICAgICBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IHByZXZJbnB1dC5kZWx0YVggfHwgMCxcbiAgICAgICAgICAgIHk6IHByZXZJbnB1dC5kZWx0YVkgfHwgMFxuICAgICAgICB9O1xuXG4gICAgICAgIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBjZW50ZXIueCxcbiAgICAgICAgICAgIHk6IGNlbnRlci55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaW5wdXQuZGVsdGFYID0gcHJldkRlbHRhLnggKyAoY2VudGVyLnggLSBvZmZzZXQueCk7XG4gICAgaW5wdXQuZGVsdGFZID0gcHJldkRlbHRhLnkgKyAoY2VudGVyLnkgLSBvZmZzZXQueSk7XG59XG5cbi8qKlxuICogdmVsb2NpdHkgaXMgY2FsY3VsYXRlZCBldmVyeSB4IG1zXG4gKiBAcGFyYW0ge09iamVjdH0gc2Vzc2lvblxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBsYXN0ID0gc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgfHwgaW5wdXQsXG4gICAgICAgIGRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGxhc3QudGltZVN0YW1wLFxuICAgICAgICB2ZWxvY2l0eSwgdmVsb2NpdHlYLCB2ZWxvY2l0eVksIGRpcmVjdGlvbjtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfQ0FOQ0VMICYmIChkZWx0YVRpbWUgPiBDT01QVVRFX0lOVEVSVkFMIHx8IGxhc3QudmVsb2NpdHkgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IGlucHV0LmRlbHRhWCAtIGxhc3QuZGVsdGFYO1xuICAgICAgICB2YXIgZGVsdGFZID0gaW5wdXQuZGVsdGFZIC0gbGFzdC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIHYgPSBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgICAgdmVsb2NpdHlYID0gdi54O1xuICAgICAgICB2ZWxvY2l0eVkgPSB2Lnk7XG4gICAgICAgIHZlbG9jaXR5ID0gKGFicyh2LngpID4gYWJzKHYueSkpID8gdi54IDogdi55O1xuICAgICAgICBkaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIHNlc3Npb24ubGFzdEludGVydmFsID0gaW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXNlIGxhdGVzdCB2ZWxvY2l0eSBpbmZvIGlmIGl0IGRvZXNuJ3Qgb3ZlcnRha2UgYSBtaW5pbXVtIHBlcmlvZFxuICAgICAgICB2ZWxvY2l0eSA9IGxhc3QudmVsb2NpdHk7XG4gICAgICAgIHZlbG9jaXR5WCA9IGxhc3QudmVsb2NpdHlYO1xuICAgICAgICB2ZWxvY2l0eVkgPSBsYXN0LnZlbG9jaXR5WTtcbiAgICAgICAgZGlyZWN0aW9uID0gbGFzdC5kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgaW5wdXQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBpbnB1dC52ZWxvY2l0eVggPSB2ZWxvY2l0eVg7XG4gICAgaW5wdXQudmVsb2NpdHlZID0gdmVsb2NpdHlZO1xuICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBzaW1wbGUgY2xvbmUgZnJvbSB0aGUgaW5wdXQgdXNlZCBmb3Igc3RvcmFnZSBvZiBmaXJzdElucHV0IGFuZCBmaXJzdE11bHRpcGxlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9IGNsb25lZElucHV0RGF0YVxuICovXG5mdW5jdGlvbiBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCkge1xuICAgIC8vIG1ha2UgYSBzaW1wbGUgY29weSBvZiB0aGUgcG9pbnRlcnMgYmVjYXVzZSB3ZSB3aWxsIGdldCBhIHJlZmVyZW5jZSBpZiB3ZSBkb24ndFxuICAgIC8vIHdlIG9ubHkgbmVlZCBjbGllbnRYWSBmb3IgdGhlIGNhbGN1bGF0aW9uc1xuICAgIHZhciBwb2ludGVycyA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb2ludGVyc1tpXSA9IHtcbiAgICAgICAgICAgIGNsaWVudFg6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFgpLFxuICAgICAgICAgICAgY2xpZW50WTogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHRpbWVTdGFtcDogbm93KCksXG4gICAgICAgIHBvaW50ZXJzOiBwb2ludGVycyxcbiAgICAgICAgY2VudGVyOiBnZXRDZW50ZXIocG9pbnRlcnMpLFxuICAgICAgICBkZWx0YVg6IGlucHV0LmRlbHRhWCxcbiAgICAgICAgZGVsdGFZOiBpbnB1dC5kZWx0YVlcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgY2VudGVyIG9mIGFsbCB0aGUgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtPYmplY3R9IGNlbnRlciBjb250YWlucyBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRlcihwb2ludGVycykge1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB3aGVuIG9ubHkgb25lIHRvdWNoXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRYKSxcbiAgICAgICAgICAgIHk6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHggPSAwLCB5ID0gMCwgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBwb2ludGVyc0xlbmd0aCkge1xuICAgICAgICB4ICs9IHBvaW50ZXJzW2ldLmNsaWVudFg7XG4gICAgICAgIHkgKz0gcG9pbnRlcnNbaV0uY2xpZW50WTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHJvdW5kKHggLyBwb2ludGVyc0xlbmd0aCksXG4gICAgICAgIHk6IHJvdW5kKHkgLyBwb2ludGVyc0xlbmd0aClcbiAgICB9O1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHkgYmV0d2VlbiB0d28gcG9pbnRzLiB1bml0IGlzIGluIHB4IHBlciBtcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVRpbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7T2JqZWN0fSB2ZWxvY2l0eSBgeGAgYW5kIGB5YFxuICovXG5mdW5jdGlvbiBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIHgsIHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4IC8gZGVsdGFUaW1lIHx8IDAsXG4gICAgICAgIHk6IHkgLyBkZWx0YVRpbWUgfHwgMFxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBkaXJlY3Rpb24gYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge051bWJlcn0gZGlyZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIERJUkVDVElPTl9OT05FO1xuICAgIH1cblxuICAgIGlmIChhYnMoeCkgPj0gYWJzKHkpKSB7XG4gICAgICAgIHJldHVybiB4IDwgMCA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgIH1cbiAgICByZXR1cm4geSA8IDAgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFic29sdXRlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHAxIHt4LCB5fVxuICogQHBhcmFtIHtPYmplY3R9IHAyIHt4LCB5fVxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoKHggKiB4KSArICh5ICogeSkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYW5nbGUgYmV0d2VlbiB0d28gY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMVxuICogQHBhcmFtIHtPYmplY3R9IHAyXG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGFuZ2xlXG4gKi9cbmZ1bmN0aW9uIGdldEFuZ2xlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpICogMTgwIC8gTWF0aC5QSTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHJvdGF0aW9uIGRlZ3JlZXMgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gcm90YXRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0Um90YXRpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXRBbmdsZShlbmRbMV0sIGVuZFswXSwgUFJPUFNfQ0xJRU5UX1hZKSArIGdldEFuZ2xlKHN0YXJ0WzFdLCBzdGFydFswXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHNjYWxlIGZhY3RvciBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogbm8gc2NhbGUgaXMgMSwgYW5kIGdvZXMgZG93biB0byAwIHdoZW4gcGluY2hlZCB0b2dldGhlciwgYW5kIGJpZ2dlciB3aGVuIHBpbmNoZWQgb3V0XG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHNjYWxlXG4gKi9cbmZ1bmN0aW9uIGdldFNjYWxlKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0sIFBST1BTX0NMSUVOVF9YWSkgLyBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbnZhciBNT1VTRV9JTlBVVF9NQVAgPSB7XG4gICAgbW91c2Vkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBtb3VzZW1vdmU6IElOUFVUX01PVkUsXG4gICAgbW91c2V1cDogSU5QVVRfRU5EXG59O1xuXG52YXIgTU9VU0VfRUxFTUVOVF9FVkVOVFMgPSAnbW91c2Vkb3duJztcbnZhciBNT1VTRV9XSU5ET1dfRVZFTlRTID0gJ21vdXNlbW92ZSBtb3VzZXVwJztcblxuLyoqXG4gKiBNb3VzZSBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gTW91c2VJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBNT1VTRV9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gTU9VU0VfV0lORE9XX0VWRU5UUztcblxuICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlOyAvLyBtb3VzZWRvd24gc3RhdGVcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTUVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBNT1VTRV9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gb24gc3RhcnQgd2Ugd2FudCB0byBoYXZlIHRoZSBsZWZ0IG1vdXNlIGJ1dHRvbiBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiBldi5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfTU9WRSAmJiBldi53aGljaCAhPT0gMSkge1xuICAgICAgICAgICAgZXZlbnRUeXBlID0gSU5QVVRfRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmICghdGhpcy5wcmVzc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBQT0lOVEVSX0lOUFVUX01BUCA9IHtcbiAgICBwb2ludGVyZG93bjogSU5QVVRfU1RBUlQsXG4gICAgcG9pbnRlcm1vdmU6IElOUFVUX01PVkUsXG4gICAgcG9pbnRlcnVwOiBJTlBVVF9FTkQsXG4gICAgcG9pbnRlcmNhbmNlbDogSU5QVVRfQ0FOQ0VMLFxuICAgIHBvaW50ZXJvdXQ6IElOUFVUX0NBTkNFTFxufTtcblxuLy8gaW4gSUUxMCB0aGUgcG9pbnRlciB0eXBlcyBpcyBkZWZpbmVkIGFzIGFuIGVudW1cbnZhciBJRTEwX1BPSU5URVJfVFlQRV9FTlVNID0ge1xuICAgIDI6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgMzogSU5QVVRfVFlQRV9QRU4sXG4gICAgNDogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICA1OiBJTlBVVF9UWVBFX0tJTkVDVCAvLyBzZWUgaHR0cHM6Ly90d2l0dGVyLmNvbS9qYWNvYnJvc3NpL3N0YXR1cy80ODA1OTY0Mzg0ODk4OTA4MTZcbn07XG5cbnZhciBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ3BvaW50ZXJkb3duJztcbnZhciBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAncG9pbnRlcm1vdmUgcG9pbnRlcnVwIHBvaW50ZXJjYW5jZWwnO1xuXG4vLyBJRTEwIGhhcyBwcmVmaXhlZCBzdXBwb3J0LCBhbmQgY2FzZS1zZW5zaXRpdmVcbmlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQgJiYgIXdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ01TUG9pbnRlckRvd24nO1xuICAgIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdNU1BvaW50ZXJNb3ZlIE1TUG9pbnRlclVwIE1TUG9pbnRlckNhbmNlbCc7XG59XG5cbi8qKlxuICogUG9pbnRlciBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gUG9pbnRlckV2ZW50SW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gUE9JTlRFUl9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gUE9JTlRFUl9XSU5ET1dfRVZFTlRTO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RvcmUgPSAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucG9pbnRlckV2ZW50cyA9IFtdKTtcbn1cblxuaW5oZXJpdChQb2ludGVyRXZlbnRJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gUEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHRoaXMuc3RvcmU7XG4gICAgICAgIHZhciByZW1vdmVQb2ludGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGV2ZW50VHlwZU5vcm1hbGl6ZWQgPSBldi50eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnbXMnLCAnJyk7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBQT0lOVEVSX0lOUFVUX01BUFtldmVudFR5cGVOb3JtYWxpemVkXTtcbiAgICAgICAgdmFyIHBvaW50ZXJUeXBlID0gSUUxMF9QT0lOVEVSX1RZUEVfRU5VTVtldi5wb2ludGVyVHlwZV0gfHwgZXYucG9pbnRlclR5cGU7XG5cbiAgICAgICAgdmFyIGlzVG91Y2ggPSAocG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCk7XG5cbiAgICAgICAgLy8gZ2V0IGluZGV4IG9mIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgdmFyIHN0b3JlSW5kZXggPSBpbkFycmF5KHN0b3JlLCBldi5wb2ludGVySWQsICdwb2ludGVySWQnKTtcblxuICAgICAgICAvLyBzdGFydCBhbmQgbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAoZXYuYnV0dG9uID09PSAwIHx8IGlzVG91Y2gpKSB7XG4gICAgICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgICBzdG9yZUluZGV4ID0gc3RvcmUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgcmVtb3ZlUG9pbnRlciA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdCBub3QgZm91bmQsIHNvIHRoZSBwb2ludGVyIGhhc24ndCBiZWVuIGRvd24gKHNvIGl0J3MgcHJvYmFibHkgYSBob3ZlcilcbiAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICBzdG9yZVtzdG9yZUluZGV4XSA9IGV2O1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBzdG9yZSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBwb2ludGVyVHlwZSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVtb3ZlUG9pbnRlcikge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlXG4gICAgICAgICAgICBzdG9yZS5zcGxpY2Uoc3RvcmVJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIFNJTkdMRV9UT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQnO1xudmFyIFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBUb3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gU2luZ2xlVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTaW5nbGVUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFNJTkdMRV9UT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gc2hvdWxkIHdlIGhhbmRsZSB0aGUgdG91Y2ggZXZlbnRzP1xuICAgICAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoZXMgPSBub3JtYWxpemVTaW5nbGVUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuXG4gICAgICAgIC8vIHdoZW4gZG9uZSwgcmVzZXQgdGhlIHN0YXJ0ZWQgc3RhdGVcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiB0b3VjaGVzWzBdLmxlbmd0aCAtIHRvdWNoZXNbMV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVTaW5nbGVUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbCA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIGNoYW5nZWQgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKTtcblxuICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgYWxsID0gdW5pcXVlQXJyYXkoYWxsLmNvbmNhdChjaGFuZ2VkKSwgJ2lkZW50aWZpZXInLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2FsbCwgY2hhbmdlZF07XG59XG5cbnZhciBUT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFRPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIE11bHRpLXVzZXIgdG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFRPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy50YXJnZXRJZHMgPSB7fTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuICAgICAgICB2YXIgdG91Y2hlcyA9IGdldFRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG4gICAgICAgIGlmICghdG91Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsVG91Y2hlcyA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIHRhcmdldElkcyA9IHRoaXMudGFyZ2V0SWRzO1xuXG4gICAgLy8gd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSB0b3VjaCwgdGhlIHByb2Nlc3MgY2FuIGJlIHNpbXBsaWZpZWRcbiAgICBpZiAodHlwZSAmIChJTlBVVF9TVEFSVCB8IElOUFVUX01PVkUpICYmIGFsbFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRhcmdldElkc1thbGxUb3VjaGVzWzBdLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFthbGxUb3VjaGVzLCBhbGxUb3VjaGVzXTtcbiAgICB9XG5cbiAgICB2YXIgaSxcbiAgICAgICAgdGFyZ2V0VG91Y2hlcyxcbiAgICAgICAgY2hhbmdlZFRvdWNoZXMgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMgPSBbXSxcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAvLyBnZXQgdGFyZ2V0IHRvdWNoZXMgZnJvbSB0b3VjaGVzXG4gICAgdGFyZ2V0VG91Y2hlcyA9IGFsbFRvdWNoZXMuZmlsdGVyKGZ1bmN0aW9uKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiBoYXNQYXJlbnQodG91Y2gudGFyZ2V0LCB0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29sbGVjdCB0b3VjaGVzXG4gICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRJZHNbdGFyZ2V0VG91Y2hlc1tpXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgY2hhbmdlZCB0b3VjaGVzIHRvIG9ubHkgY29udGFpbiB0b3VjaGVzIHRoYXQgZXhpc3QgaW4gdGhlIGNvbGxlY3RlZCB0YXJnZXQgaWRzXG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBjaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXSkge1xuICAgICAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMucHVzaChjaGFuZ2VkVG91Y2hlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhbnVwIHJlbW92ZWQgdG91Y2hlc1xuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICBkZWxldGUgdGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoIWNoYW5nZWRUYXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLy8gbWVyZ2UgdGFyZ2V0VG91Y2hlcyB3aXRoIGNoYW5nZWRUYXJnZXRUb3VjaGVzIHNvIGl0IGNvbnRhaW5zIEFMTCB0b3VjaGVzLCBpbmNsdWRpbmcgJ2VuZCcgYW5kICdjYW5jZWwnXG4gICAgICAgIHVuaXF1ZUFycmF5KHRhcmdldFRvdWNoZXMuY29uY2F0KGNoYW5nZWRUYXJnZXRUb3VjaGVzKSwgJ2lkZW50aWZpZXInLCB0cnVlKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXNcbiAgICBdO1xufVxuXG4vKipcbiAqIENvbWJpbmVkIHRvdWNoIGFuZCBtb3VzZSBpbnB1dFxuICpcbiAqIFRvdWNoIGhhcyBhIGhpZ2hlciBwcmlvcml0eSB0aGVuIG1vdXNlLCBhbmQgd2hpbGUgdG91Y2hpbmcgbm8gbW91c2UgZXZlbnRzIGFyZSBhbGxvd2VkLlxuICogVGhpcyBiZWNhdXNlIHRvdWNoIGRldmljZXMgYWxzbyBlbWl0IG1vdXNlIGV2ZW50cyB3aGlsZSBkb2luZyBhIHRvdWNoLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuXG52YXIgREVEVVBfVElNRU9VVCA9IDI1MDA7XG52YXIgREVEVVBfRElTVEFOQ0UgPSAyNTtcblxuZnVuY3Rpb24gVG91Y2hNb3VzZUlucHV0KCkge1xuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgaGFuZGxlciA9IGJpbmRGbih0aGlzLmhhbmRsZXIsIHRoaXMpO1xuICAgIHRoaXMudG91Y2ggPSBuZXcgVG91Y2hJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuICAgIHRoaXMubW91c2UgPSBuZXcgTW91c2VJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuXG4gICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBudWxsO1xuICAgIHRoaXMubGFzdFRvdWNoZXMgPSBbXTtcbn1cblxuaW5oZXJpdChUb3VjaE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGFuZCB0b3VjaCBldmVudHNcbiAgICAgKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dEV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRNRWhhbmRsZXIobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBpc1RvdWNoID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKSxcbiAgICAgICAgICAgIGlzTW91c2UgPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfTU9VU0UpO1xuXG4gICAgICAgIGlmIChpc01vdXNlICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcy5maXJlc1RvdWNoRXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHdlJ3JlIGluIGEgdG91Y2ggZXZlbnQsIHJlY29yZCB0b3VjaGVzIHRvICBkZS1kdXBlIHN5bnRoZXRpYyBtb3VzZSBldmVudFxuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgcmVjb3JkVG91Y2hlcy5jYWxsKHRoaXMsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNNb3VzZSAmJiBpc1N5bnRoZXRpY0V2ZW50LmNhbGwodGhpcywgaW5wdXREYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayhtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudG91Y2guZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm1vdXNlLmRlc3Ryb3koKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcmVjb3JkVG91Y2hlcyhldmVudFR5cGUsIGV2ZW50RGF0YSkge1xuICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUb3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF0uaWRlbnRpZmllcjtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRMYXN0VG91Y2goZXZlbnREYXRhKSB7XG4gICAgdmFyIHRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXTtcblxuICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnByaW1hcnlUb3VjaCkge1xuICAgICAgICB2YXIgbGFzdFRvdWNoID0ge3g6IHRvdWNoLmNsaWVudFgsIHk6IHRvdWNoLmNsaWVudFl9O1xuICAgICAgICB0aGlzLmxhc3RUb3VjaGVzLnB1c2gobGFzdFRvdWNoKTtcbiAgICAgICAgdmFyIGx0cyA9IHRoaXMubGFzdFRvdWNoZXM7XG4gICAgICAgIHZhciByZW1vdmVMYXN0VG91Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpID0gbHRzLmluZGV4T2YobGFzdFRvdWNoKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRUaW1lb3V0KHJlbW92ZUxhc3RUb3VjaCwgREVEVVBfVElNRU9VVCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bnRoZXRpY0V2ZW50KGV2ZW50RGF0YSkge1xuICAgIHZhciB4ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFgsIHkgPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGFzdFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzLmxhc3RUb3VjaGVzW2ldO1xuICAgICAgICB2YXIgZHggPSBNYXRoLmFicyh4IC0gdC54KSwgZHkgPSBNYXRoLmFicyh5IC0gdC55KTtcbiAgICAgICAgaWYgKGR4IDw9IERFRFVQX0RJU1RBTkNFICYmIGR5IDw9IERFRFVQX0RJU1RBTkNFKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gPSBwcmVmaXhlZChURVNUX0VMRU1FTlQuc3R5bGUsICd0b3VjaEFjdGlvbicpO1xudmFyIE5BVElWRV9UT1VDSF9BQ1RJT04gPSBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gIT09IHVuZGVmaW5lZDtcblxuLy8gbWFnaWNhbCB0b3VjaEFjdGlvbiB2YWx1ZVxudmFyIFRPVUNIX0FDVElPTl9DT01QVVRFID0gJ2NvbXB1dGUnO1xudmFyIFRPVUNIX0FDVElPTl9BVVRPID0gJ2F1dG8nO1xudmFyIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04gPSAnbWFuaXB1bGF0aW9uJzsgLy8gbm90IGltcGxlbWVudGVkXG52YXIgVE9VQ0hfQUNUSU9OX05PTkUgPSAnbm9uZSc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9YID0gJ3Bhbi14JztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1kgPSAncGFuLXknO1xudmFyIFRPVUNIX0FDVElPTl9NQVAgPSBnZXRUb3VjaEFjdGlvblByb3BzKCk7XG5cbi8qKlxuICogVG91Y2ggQWN0aW9uXG4gKiBzZXRzIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBvciB1c2VzIHRoZSBqcyBhbHRlcm5hdGl2ZVxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBUb3VjaEFjdGlvbihtYW5hZ2VyLCB2YWx1ZSkge1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5zZXQodmFsdWUpO1xufVxuXG5Ub3VjaEFjdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZSBvbiB0aGUgZWxlbWVudCBvciBlbmFibGUgdGhlIHBvbHlmaWxsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBmaW5kIG91dCB0aGUgdG91Y2gtYWN0aW9uIGJ5IHRoZSBldmVudCBoYW5kbGVyc1xuICAgICAgICBpZiAodmFsdWUgPT0gVE9VQ0hfQUNUSU9OX0NPTVBVVEUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jb21wdXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTkFUSVZFX1RPVUNIX0FDVElPTiAmJiB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZSAmJiBUT1VDSF9BQ1RJT05fTUFQW3ZhbHVlXSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGVbUFJFRklYRURfVE9VQ0hfQUNUSU9OXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHZhbHVlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBqdXN0IHJlLXNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWVcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLm1hbmFnZXIub3B0aW9ucy50b3VjaEFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvbXB1dGUgdGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgYmFzZWQgb24gdGhlIHJlY29nbml6ZXIncyBzZXR0aW5nc1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgY29tcHV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGVhY2godGhpcy5tYW5hZ2VyLnJlY29nbml6ZXJzLCBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICBpZiAoYm9vbE9yRm4ocmVjb2duaXplci5vcHRpb25zLmVuYWJsZSwgW3JlY29nbml6ZXJdKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChyZWNvZ25pemVyLmdldFRvdWNoQWN0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMuam9pbignICcpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgaXMgY2FsbGVkIG9uIGVhY2ggaW5wdXQgY3ljbGUgYW5kIHByb3ZpZGVzIHRoZSBwcmV2ZW50aW5nIG9mIHRoZSBicm93c2VyIGJlaGF2aW9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgcHJldmVudERlZmF1bHRzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3JjRXZlbnQgPSBpbnB1dC5zcmNFdmVudDtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0Lm9mZnNldERpcmVjdGlvbjtcblxuICAgICAgICAvLyBpZiB0aGUgdG91Y2ggYWN0aW9uIGRpZCBwcmV2ZW50ZWQgb25jZSB0aGlzIHNlc3Npb25cbiAgICAgICAgaWYgKHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCkge1xuICAgICAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgaGFzTm9uZSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1ldO1xuICAgICAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9YXTtcblxuICAgICAgICBpZiAoaGFzTm9uZSkge1xuICAgICAgICAgICAgLy9kbyBub3QgcHJldmVudCBkZWZhdWx0cyBpZiB0aGlzIGlzIGEgdGFwIGdlc3R1cmVcblxuICAgICAgICAgICAgdmFyIGlzVGFwUG9pbnRlciA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIHZhciBpc1RhcE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCAyO1xuICAgICAgICAgICAgdmFyIGlzVGFwVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgMjUwO1xuXG4gICAgICAgICAgICBpZiAoaXNUYXBQb2ludGVyICYmIGlzVGFwTW92ZW1lbnQgJiYgaXNUYXBUb3VjaFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgICAgICAvLyBgcGFuLXggcGFuLXlgIG1lYW5zIGJyb3dzZXIgaGFuZGxlcyBhbGwgc2Nyb2xsaW5nL3Bhbm5pbmcsIGRvIG5vdCBwcmV2ZW50XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzTm9uZSB8fFxuICAgICAgICAgICAgKGhhc1BhblkgJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHx8XG4gICAgICAgICAgICAoaGFzUGFuWCAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50U3JjKHNyY0V2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsIHByZXZlbnREZWZhdWx0IHRvIHByZXZlbnQgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW9yIChzY3JvbGxpbmcgaW4gbW9zdCBjYXNlcylcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3JjRXZlbnRcbiAgICAgKi9cbiAgICBwcmV2ZW50U3JjOiBmdW5jdGlvbihzcmNFdmVudCkge1xuICAgICAgICB0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogd2hlbiB0aGUgdG91Y2hBY3Rpb25zIGFyZSBjb2xsZWN0ZWQgdGhleSBhcmUgbm90IGEgdmFsaWQgdmFsdWUsIHNvIHdlIG5lZWQgdG8gY2xlYW4gdGhpbmdzIHVwLiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uc1xuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMpIHtcbiAgICAvLyBub25lXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcblxuICAgIC8vIGlmIGJvdGggcGFuLXggYW5kIHBhbi15IGFyZSBzZXQgKGRpZmZlcmVudCByZWNvZ25pemVyc1xuICAgIC8vIGZvciBkaWZmZXJlbnQgZGlyZWN0aW9ucywgZS5nLiBob3Jpem9udGFsIHBhbiBidXQgdmVydGljYWwgc3dpcGU/KVxuICAgIC8vIHdlIG5lZWQgbm9uZSAoYXMgb3RoZXJ3aXNlIHdpdGggcGFuLXggcGFuLXkgY29tYmluZWQgbm9uZSBvZiB0aGVzZVxuICAgIC8vIHJlY29nbml6ZXJzIHdpbGwgd29yaywgc2luY2UgdGhlIGJyb3dzZXIgd291bGQgaGFuZGxlIGFsbCBwYW5uaW5nXG4gICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgLy8gcGFuLXggT1IgcGFuLXlcbiAgICBpZiAoaGFzUGFuWCB8fCBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBoYXNQYW5YID8gVE9VQ0hfQUNUSU9OX1BBTl9YIDogVE9VQ0hfQUNUSU9OX1BBTl9ZO1xuICAgIH1cblxuICAgIC8vIG1hbmlwdWxhdGlvblxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTjtcbiAgICB9XG5cbiAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX0FVVE87XG59XG5cbmZ1bmN0aW9uIGdldFRvdWNoQWN0aW9uUHJvcHMoKSB7XG4gICAgaWYgKCFOQVRJVkVfVE9VQ0hfQUNUSU9OKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRvdWNoTWFwID0ge307XG4gICAgdmFyIGNzc1N1cHBvcnRzID0gd2luZG93LkNTUyAmJiB3aW5kb3cuQ1NTLnN1cHBvcnRzO1xuICAgIFsnYXV0bycsICdtYW5pcHVsYXRpb24nLCAncGFuLXknLCAncGFuLXgnLCAncGFuLXggcGFuLXknLCAnbm9uZSddLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XG5cbiAgICAgICAgLy8gSWYgY3NzLnN1cHBvcnRzIGlzIG5vdCBzdXBwb3J0ZWQgYnV0IHRoZXJlIGlzIG5hdGl2ZSB0b3VjaC1hY3Rpb24gYXNzdW1lIGl0IHN1cHBvcnRzXG4gICAgICAgIC8vIGFsbCB2YWx1ZXMuIFRoaXMgaXMgdGhlIGNhc2UgZm9yIElFIDEwIGFuZCAxMS5cbiAgICAgICAgdG91Y2hNYXBbdmFsXSA9IGNzc1N1cHBvcnRzID8gd2luZG93LkNTUy5zdXBwb3J0cygndG91Y2gtYWN0aW9uJywgdmFsKSA6IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdWNoTWFwO1xufVxuXG4vKipcbiAqIFJlY29nbml6ZXIgZmxvdyBleHBsYWluZWQ7ICpcbiAqIEFsbCByZWNvZ25pemVycyBoYXZlIHRoZSBpbml0aWFsIHN0YXRlIG9mIFBPU1NJQkxFIHdoZW4gYSBpbnB1dCBzZXNzaW9uIHN0YXJ0cy5cbiAqIFRoZSBkZWZpbml0aW9uIG9mIGEgaW5wdXQgc2Vzc2lvbiBpcyBmcm9tIHRoZSBmaXJzdCBpbnB1dCB1bnRpbCB0aGUgbGFzdCBpbnB1dCwgd2l0aCBhbGwgaXQncyBtb3ZlbWVudCBpbiBpdC4gKlxuICogRXhhbXBsZSBzZXNzaW9uIGZvciBtb3VzZS1pbnB1dDogbW91c2Vkb3duIC0+IG1vdXNlbW92ZSAtPiBtb3VzZXVwXG4gKlxuICogT24gZWFjaCByZWNvZ25pemluZyBjeWNsZSAoc2VlIE1hbmFnZXIucmVjb2duaXplKSB0aGUgLnJlY29nbml6ZSgpIG1ldGhvZCBpcyBleGVjdXRlZFxuICogd2hpY2ggZGV0ZXJtaW5lcyB3aXRoIHN0YXRlIGl0IHNob3VsZCBiZS5cbiAqXG4gKiBJZiB0aGUgcmVjb2duaXplciBoYXMgdGhlIHN0YXRlIEZBSUxFRCwgQ0FOQ0VMTEVEIG9yIFJFQ09HTklaRUQgKGVxdWFscyBFTkRFRCksIGl0IGlzIHJlc2V0IHRvXG4gKiBQT1NTSUJMRSB0byBnaXZlIGl0IGFub3RoZXIgY2hhbmdlIG9uIHRoZSBuZXh0IGN5Y2xlLlxuICpcbiAqICAgICAgICAgICAgICAgUG9zc2libGVcbiAqICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICArLS0tLS0rLS0tLS0tLS0tLS0tLS0tK1xuICogICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICArLS0tLS0rLS0tLS0rICAgICAgICAgICAgICAgfFxuICogICAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgICAgfFxuICogICBGYWlsZWQgICAgICBDYW5jZWxsZWQgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLStcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICBSZWNvZ25pemVkICAgICAgIEJlZ2FuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRlZC9SZWNvZ25pemVkXG4gKi9cbnZhciBTVEFURV9QT1NTSUJMRSA9IDE7XG52YXIgU1RBVEVfQkVHQU4gPSAyO1xudmFyIFNUQVRFX0NIQU5HRUQgPSA0O1xudmFyIFNUQVRFX0VOREVEID0gODtcbnZhciBTVEFURV9SRUNPR05JWkVEID0gU1RBVEVfRU5ERUQ7XG52YXIgU1RBVEVfQ0FOQ0VMTEVEID0gMTY7XG52YXIgU1RBVEVfRkFJTEVEID0gMzI7XG5cbi8qKlxuICogUmVjb2duaXplclxuICogRXZlcnkgcmVjb2duaXplciBuZWVkcyB0byBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBSZWNvZ25pemVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5pZCA9IHVuaXF1ZUlkKCk7XG5cbiAgICB0aGlzLm1hbmFnZXIgPSBudWxsO1xuXG4gICAgLy8gZGVmYXVsdCBpcyBlbmFibGUgdHJ1ZVxuICAgIHRoaXMub3B0aW9ucy5lbmFibGUgPSBpZlVuZGVmaW5lZCh0aGlzLm9wdGlvbnMuZW5hYmxlLCB0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcblxuICAgIHRoaXMuc2ltdWx0YW5lb3VzID0ge307XG4gICAgdGhpcy5yZXF1aXJlRmFpbCA9IFtdO1xufVxuXG5SZWNvZ25pemVyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgZGVmYXVsdHM6IHt9LFxuXG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1JlY29nbml6ZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGFsc28gdXBkYXRlIHRoZSB0b3VjaEFjdGlvbiwgaW4gY2FzZSBzb21ldGhpbmcgY2hhbmdlZCBhYm91dCB0aGUgZGlyZWN0aW9ucy9lbmFibGVkIHN0YXRlXG4gICAgICAgIHRoaXMubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNpbXVsdGFuZW91cyA9IHRoaXMuc2ltdWx0YW5lb3VzO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmICghc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0pIHtcbiAgICAgICAgICAgIHNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdID0gb3RoZXJSZWNvZ25pemVyO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlY29nbml6ZVdpdGgodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHNpbXVsdGFuZW91cyBsaW5rLiBpdCBkb2VzbnQgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemVyIGNhbiBvbmx5IHJ1biB3aGVuIGFuIG90aGVyIGlzIGZhaWxpbmdcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVxdWlyZUZhaWwgPSB0aGlzLnJlcXVpcmVGYWlsO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmIChpbkFycmF5KHJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpID09PSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZUZhaWwucHVzaChvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSByZXF1aXJlRmFpbHVyZSBsaW5rLiBpdCBkb2VzIG5vdCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkodGhpcy5yZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZUZhaWwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaGFzIHJlcXVpcmUgZmFpbHVyZXMgYm9vbGVhblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc1JlcXVpcmVGYWlsdXJlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCA+IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlmIHRoZSByZWNvZ25pemVyIGNhbiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFlvdSBzaG91bGQgdXNlIGB0cnlFbWl0YCBpbnN0ZWFkIG9mIGBlbWl0YCBkaXJlY3RseSB0byBjaGVja1xuICAgICAqIHRoYXQgYWxsIHRoZSBuZWVkZWQgcmVjb2duaXplcnMgaGFzIGZhaWxlZCBiZWZvcmUgZW1pdHRpbmcuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYubWFuYWdlci5lbWl0KGV2ZW50LCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAncGFuc3RhcnQnIGFuZCAncGFubW92ZSdcbiAgICAgICAgaWYgKHN0YXRlIDwgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50KTsgLy8gc2ltcGxlICdldmVudE5hbWUnIGV2ZW50c1xuXG4gICAgICAgIGlmIChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpIHsgLy8gYWRkaXRpb25hbCBldmVudChwYW5sZWZ0LCBwYW5yaWdodCwgcGluY2hpbiwgcGluY2hvdXQuLi4pXG4gICAgICAgICAgICBlbWl0KGlucHV0LmFkZGl0aW9uYWxFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYW5lbmQgYW5kIHBhbmNhbmNlbFxuICAgICAgICBpZiAoc3RhdGUgPj0gU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGF0IGFsbCB0aGUgcmVxdWlyZSBmYWlsdXJlIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQsXG4gICAgICogaWYgdHJ1ZSwgaXQgZW1pdHMgYSBnZXN0dXJlIGV2ZW50LFxuICAgICAqIG90aGVyd2lzZSwgc2V0dXAgdGhlIHN0YXRlIHRvIEZBSUxFRC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICB0cnlFbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5jYW5FbWl0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGl0J3MgZmFpbGluZyBhbnl3YXlcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FuIHdlIGVtaXQ/XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuRW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5yZXF1aXJlRmFpbFtpXS5zdGF0ZSAmIChTVEFURV9GQUlMRUQgfCBTVEFURV9QT1NTSUJMRSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgLy8gbWFrZSBhIG5ldyBjb3B5IG9mIHRoZSBpbnB1dERhdGFcbiAgICAgICAgLy8gc28gd2UgY2FuIGNoYW5nZSB0aGUgaW5wdXREYXRhIHdpdGhvdXQgbWVzc2luZyB1cCB0aGUgb3RoZXIgcmVjb2duaXplcnNcbiAgICAgICAgdmFyIGlucHV0RGF0YUNsb25lID0gYXNzaWduKHt9LCBpbnB1dERhdGEpO1xuXG4gICAgICAgIC8vIGlzIGlzIGVuYWJsZWQgYW5kIGFsbG93IHJlY29nbml6aW5nP1xuICAgICAgICBpZiAoIWJvb2xPckZuKHRoaXMub3B0aW9ucy5lbmFibGUsIFt0aGlzLCBpbnB1dERhdGFDbG9uZV0pKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB3ZSd2ZSByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfUkVDT0dOSVpFRCB8IFNUQVRFX0NBTkNFTExFRCB8IFNUQVRFX0ZBSUxFRCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnByb2Nlc3MoaW5wdXREYXRhQ2xvbmUpO1xuXG4gICAgICAgIC8vIHRoZSByZWNvZ25pemVyIGhhcyByZWNvZ25pemVkIGEgZ2VzdHVyZVxuICAgICAgICAvLyBzbyB0cmlnZ2VyIGFuIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEIHwgU1RBVEVfQ0FOQ0VMTEVEKSkge1xuICAgICAgICAgICAgdGhpcy50cnlFbWl0KGlucHV0RGF0YUNsb25lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHN0YXRlIG9mIHRoZSByZWNvZ25pemVyXG4gICAgICogdGhlIGFjdHVhbCByZWNvZ25pemluZyBoYXBwZW5zIGluIHRoaXMgbWV0aG9kXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICogQHJldHVybnMge0NvbnN0fSBTVEFURVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0RGF0YSkgeyB9LCAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgcHJlZmVycmVkIHRvdWNoLWFjdGlvblxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBnZXN0dXJlIGlzbid0IGFsbG93ZWQgdG8gcmVjb2duaXplXG4gICAgICogbGlrZSB3aGVuIGFub3RoZXIgaXMgYmVpbmcgcmVjb2duaXplZCBvciBpdCBpcyBkaXNhYmxlZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkgeyB9XG59O1xuXG4vKipcbiAqIGdldCBhIHVzYWJsZSBzdHJpbmcsIHVzZWQgYXMgZXZlbnQgcG9zdGZpeFxuICogQHBhcmFtIHtDb25zdH0gc3RhdGVcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHN0YXRlU3RyKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlICYgU1RBVEVfQ0FOQ0VMTEVEKSB7XG4gICAgICAgIHJldHVybiAnY2FuY2VsJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9DSEFOR0VEKSB7XG4gICAgICAgIHJldHVybiAnbW92ZSc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0JFR0FOKSB7XG4gICAgICAgIHJldHVybiAnc3RhcnQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZGlyZWN0aW9uIGNvbnMgdG8gc3RyaW5nXG4gKiBAcGFyYW0ge0NvbnN0fSBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRpcmVjdGlvblN0cihkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9ET1dOKSB7XG4gICAgICAgIHJldHVybiAnZG93bic7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1VQKSB7XG4gICAgICAgIHJldHVybiAndXAnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9MRUZUKSB7XG4gICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1JJR0hUKSB7XG4gICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZ2V0IGEgcmVjb2duaXplciBieSBuYW1lIGlmIGl0IGlzIGJvdW5kIHRvIGEgbWFuYWdlclxuICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gb3RoZXJSZWNvZ25pemVyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAqIEByZXR1cm5zIHtSZWNvZ25pemVyfVxuICovXG5mdW5jdGlvbiBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgcmVjb2duaXplcikge1xuICAgIHZhciBtYW5hZ2VyID0gcmVjb2duaXplci5tYW5hZ2VyO1xuICAgIGlmIChtYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiBtYW5hZ2VyLmdldChvdGhlclJlY29nbml6ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gb3RoZXJSZWNvZ25pemVyO1xufVxuXG4vKipcbiAqIFRoaXMgcmVjb2duaXplciBpcyBqdXN0IHVzZWQgYXMgYSBiYXNlIGZvciB0aGUgc2ltcGxlIGF0dHJpYnV0ZSByZWNvZ25pemVycy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBBdHRyUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoQXR0clJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDFcbiAgICAgICAgICovXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2hlY2sgaWYgaXQgdGhlIHJlY29nbml6ZXIgcmVjZWl2ZXMgdmFsaWQgaW5wdXQsIGxpa2UgaW5wdXQuZGlzdGFuY2UgPiAxMC5cbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gcmVjb2duaXplZFxuICAgICAqL1xuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9uUG9pbnRlcnMgPSB0aGlzLm9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHJldHVybiBvcHRpb25Qb2ludGVycyA9PT0gMCB8fCBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvblBvaW50ZXJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIHRoZSBpbnB1dCBhbmQgcmV0dXJuIHRoZSBzdGF0ZSBmb3IgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Kn0gU3RhdGVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gaW5wdXQuZXZlbnRUeXBlO1xuXG4gICAgICAgIHZhciBpc1JlY29nbml6ZWQgPSBzdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuYXR0clRlc3QoaW5wdXQpO1xuXG4gICAgICAgIC8vIG9uIGNhbmNlbCBpbnB1dCBhbmQgd2UndmUgcmVjb2duaXplZCBiZWZvcmUsIHJldHVybiBTVEFURV9DQU5DRUxMRURcbiAgICAgICAgaWYgKGlzUmVjb2duaXplZCAmJiAoZXZlbnRUeXBlICYgSU5QVVRfQ0FOQ0VMIHx8ICFpc1ZhbGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0FOQ0VMTEVEO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUmVjb2duaXplZCB8fCBpc1ZhbGlkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfRU5ERUQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEoc3RhdGUgJiBTVEFURV9CRUdBTikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DSEFOR0VEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGFuXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBhbmQgbW92ZWQgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQYW5SZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBYID0gbnVsbDtcbiAgICB0aGlzLnBZID0gbnVsbDtcbn1cblxuaW5oZXJpdChQYW5SZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGFuUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGFuJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0FMTFxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1kpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH0sXG5cbiAgICBkaXJlY3Rpb25UZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIGhhc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gaW5wdXQuZGlzdGFuY2U7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5kaXJlY3Rpb247XG4gICAgICAgIHZhciB4ID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB2YXIgeSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICAvLyBsb2NrIHRvIGF4aXM/XG4gICAgICAgIGlmICghKGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeCA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh4IDwgMCkgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHggIT0gdGhpcy5wWDtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh5ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHkgPCAwKSA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geSAhPSB0aGlzLnBZO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBoYXNNb3ZlZCAmJiBkaXN0YW5jZSA+IG9wdGlvbnMudGhyZXNob2xkICYmIGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIEF0dHJSZWNvZ25pemVyLnByb3RvdHlwZS5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTiB8fCAoISh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pICYmIHRoaXMuZGlyZWN0aW9uVGVzdChpbnB1dCkpKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcblxuICAgICAgICB0aGlzLnBYID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB0aGlzLnBZID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQuZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQaW5jaFxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXJzIGFyZSBtb3ZpbmcgdG93YXJkICh6b29tLWluKSBvciBhd2F5IGZyb20gZWFjaCBvdGhlciAoem9vbS1vdXQpLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQaW5jaFJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChQaW5jaFJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BpbmNoJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQuc2NhbGUgLSAxKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICB2YXIgaW5PdXQgPSBpbnB1dC5zY2FsZSA8IDEgPyAnaW4nIDogJ291dCc7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBpbk91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFByZXNzXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBmb3IgeCBtcyB3aXRob3V0IGFueSBtb3ZlbWVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQcmVzc1JlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbn1cblxuaW5oZXJpdChQcmVzc1JlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFByZXNzUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncHJlc3MnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGltZTogMjUxLCAvLyBtaW5pbWFsIHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgcHJlc3NlZFxuICAgICAgICB0aHJlc2hvbGQ6IDkgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9BVVRPXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPiBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICghdmFsaWRNb3ZlbWVudCB8fCAhdmFsaWRQb2ludGVycyB8fCAoaW5wdXQuZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgIXZhbGlkVGltZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQgJiYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArICd1cCcsIGlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBSb3RhdGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVyIGFyZSBtb3ZpbmcgaW4gYSBjaXJjdWxhciBtb3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFJvdGF0ZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChSb3RhdGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUm90YXRlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncm90YXRlJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQucm90YXRpb24pID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFN3aXBlXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgbW92aW5nIGZhc3QgKHZlbG9jaXR5KSwgd2l0aCBlbm91Z2ggZGlzdGFuY2UgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBTd2lwZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTd2lwZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBTd2lwZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3N3aXBlJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgdmVsb2NpdHk6IDAuMyxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUGFuUmVjb2duaXplci5wcm90b3R5cGUuZ2V0VG91Y2hBY3Rpb24uY2FsbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgdmVsb2NpdHk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIChESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIGRpcmVjdGlvbiAmIGlucHV0Lm9mZnNldERpcmVjdGlvbiAmJlxuICAgICAgICAgICAgaW5wdXQuZGlzdGFuY2UgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkICYmXG4gICAgICAgICAgICBpbnB1dC5tYXhQb2ludGVycyA9PSB0aGlzLm9wdGlvbnMucG9pbnRlcnMgJiZcbiAgICAgICAgICAgIGFicyh2ZWxvY2l0eSkgPiB0aGlzLm9wdGlvbnMudmVsb2NpdHkgJiYgaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0Lm9mZnNldERpcmVjdGlvbik7XG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbiwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQSB0YXAgaXMgZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG9pbmcgYSBzbWFsbCB0YXAvY2xpY2suIE11bHRpcGxlIHRhcHMgYXJlIHJlY29nbml6ZWQgaWYgdGhleSBvY2N1clxuICogYmV0d2VlbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwgYW5kIHBvc2l0aW9uLiBUaGUgZGVsYXkgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJlY29nbml6ZSBtdWx0aS10YXBzIHdpdGhvdXQgZmlyaW5nXG4gKiBhIHNpbmdsZSB0YXAuXG4gKlxuICogVGhlIGV2ZW50RGF0YSBmcm9tIHRoZSBlbWl0dGVkIGV2ZW50IGNvbnRhaW5zIHRoZSBwcm9wZXJ0eSBgdGFwQ291bnRgLCB3aGljaCBjb250YWlucyB0aGUgYW1vdW50IG9mXG4gKiBtdWx0aS10YXBzIGJlaW5nIHJlY29nbml6ZWQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gVGFwUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBwcmV2aW91cyB0aW1lIGFuZCBjZW50ZXIsXG4gICAgLy8gdXNlZCBmb3IgdGFwIGNvdW50aW5nXG4gICAgdGhpcy5wVGltZSA9IGZhbHNlO1xuICAgIHRoaXMucENlbnRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbn1cblxuaW5oZXJpdChUYXBSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3RhcCcsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0YXBzOiAxLFxuICAgICAgICBpbnRlcnZhbDogMzAwLCAvLyBtYXggdGltZSBiZXR3ZWVuIHRoZSBtdWx0aS10YXAgdGFwc1xuICAgICAgICB0aW1lOiAyNTAsIC8vIG1heCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIGRvd24gKGxpa2UgZmluZ2VyIG9uIHRoZSBzY3JlZW4pXG4gICAgICAgIHRocmVzaG9sZDogOSwgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICAgICAgcG9zVGhyZXNob2xkOiAxMCAvLyBhIG11bHRpLXRhcCBjYW4gYmUgYSBiaXQgb2ZmIHRoZSBpbml0aWFsIHBvc2l0aW9uXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICBpZiAoKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSAmJiAodGhpcy5jb3VudCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICh2YWxpZE1vdmVtZW50ICYmIHZhbGlkVG91Y2hUaW1lICYmIHZhbGlkUG9pbnRlcnMpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZhbGlkSW50ZXJ2YWwgPSB0aGlzLnBUaW1lID8gKGlucHV0LnRpbWVTdGFtcCAtIHRoaXMucFRpbWUgPCBvcHRpb25zLmludGVydmFsKSA6IHRydWU7XG4gICAgICAgICAgICB2YXIgdmFsaWRNdWx0aVRhcCA9ICF0aGlzLnBDZW50ZXIgfHwgZ2V0RGlzdGFuY2UodGhpcy5wQ2VudGVyLCBpbnB1dC5jZW50ZXIpIDwgb3B0aW9ucy5wb3NUaHJlc2hvbGQ7XG5cbiAgICAgICAgICAgIHRoaXMucFRpbWUgPSBpbnB1dC50aW1lU3RhbXA7XG4gICAgICAgICAgICB0aGlzLnBDZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRNdWx0aVRhcCB8fCAhdmFsaWRJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRhcCBjb3VudCBtYXRjaGVzIHdlIGhhdmUgcmVjb2duaXplZCBpdCxcbiAgICAgICAgICAgIC8vIGVsc2UgaXQgaGFzIGJlZ2FuIHJlY29nbml6aW5nLi4uXG4gICAgICAgICAgICB2YXIgdGFwQ291bnQgPSB0aGlzLmNvdW50ICUgb3B0aW9ucy50YXBzO1xuICAgICAgICAgICAgaWYgKHRhcENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gZmFpbGluZyByZXF1aXJlbWVudHMsIGltbWVkaWF0ZWx5IHRyaWdnZXIgdGhlIHRhcCBldmVudFxuICAgICAgICAgICAgICAgIC8vIG9yIHdhaXQgYXMgbG9uZyBhcyB0aGUgbXVsdGl0YXAgaW50ZXJ2YWwgdG8gdHJpZ2dlclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNSZXF1aXJlRmFpbHVyZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgZmFpbFRpbWVvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGFwQ291bnQgPSB0aGlzLmNvdW50O1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBTaW1wbGUgd2F5IHRvIGNyZWF0ZSBhIG1hbmFnZXIgd2l0aCBhIGRlZmF1bHQgc2V0IG9mIHJlY29nbml6ZXJzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhhbW1lcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5yZWNvZ25pemVycyA9IGlmVW5kZWZpbmVkKG9wdGlvbnMucmVjb2duaXplcnMsIEhhbW1lci5kZWZhdWx0cy5wcmVzZXQpO1xuICAgIHJldHVybiBuZXcgTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBAY29uc3Qge3N0cmluZ31cbiAqL1xuSGFtbWVyLlZFUlNJT04gPSAnMi4wLjcnO1xuXG4vKipcbiAqIGRlZmF1bHQgc2V0dGluZ3NcbiAqIEBuYW1lc3BhY2VcbiAqL1xuSGFtbWVyLmRlZmF1bHRzID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBpZiBET00gZXZlbnRzIGFyZSBiZWluZyB0cmlnZ2VyZWQuXG4gICAgICogQnV0IHRoaXMgaXMgc2xvd2VyIGFuZCB1bnVzZWQgYnkgc2ltcGxlIGltcGxlbWVudGF0aW9ucywgc28gZGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGRvbUV2ZW50czogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eS9mYWxsYmFjay5cbiAgICAgKiBXaGVuIHNldCB0byBgY29tcHV0ZWAgaXQgd2lsbCBtYWdpY2FsbHkgc2V0IHRoZSBjb3JyZWN0IHZhbHVlIGJhc2VkIG9uIHRoZSBhZGRlZCByZWNvZ25pemVycy5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IGNvbXB1dGVcbiAgICAgKi9cbiAgICB0b3VjaEFjdGlvbjogVE9VQ0hfQUNUSU9OX0NPTVBVVEUsXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgZW5hYmxlOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogRVhQRVJJTUVOVEFMIEZFQVRVUkUgLS0gY2FuIGJlIHJlbW92ZWQvY2hhbmdlZFxuICAgICAqIENoYW5nZSB0aGUgcGFyZW50IGlucHV0IHRhcmdldCBlbGVtZW50LlxuICAgICAqIElmIE51bGwsIHRoZW4gaXQgaXMgYmVpbmcgc2V0IHRoZSB0byBtYWluIGVsZW1lbnQuXG4gICAgICogQHR5cGUge051bGx8RXZlbnRUYXJnZXR9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0VGFyZ2V0OiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogZm9yY2UgYW4gaW5wdXQgY2xhc3NcbiAgICAgKiBAdHlwZSB7TnVsbHxGdW5jdGlvbn1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRDbGFzczogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcmVjb2duaXplciBzZXR1cCB3aGVuIGNhbGxpbmcgYEhhbW1lcigpYFxuICAgICAqIFdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlciB0aGVzZSB3aWxsIGJlIHNraXBwZWQuXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHByZXNldDogW1xuICAgICAgICAvLyBSZWNvZ25pemVyQ2xhc3MsIG9wdGlvbnMsIFtyZWNvZ25pemVXaXRoLCAuLi5dLCBbcmVxdWlyZUZhaWx1cmUsIC4uLl1cbiAgICAgICAgW1JvdGF0ZVJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfV0sXG4gICAgICAgIFtQaW5jaFJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfSwgWydyb3RhdGUnXV0sXG4gICAgICAgIFtTd2lwZVJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfV0sXG4gICAgICAgIFtQYW5SZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH0sIFsnc3dpcGUnXV0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXIsIHtldmVudDogJ2RvdWJsZXRhcCcsIHRhcHM6IDJ9LCBbJ3RhcCddXSxcbiAgICAgICAgW1ByZXNzUmVjb2duaXplcl1cbiAgICBdLFxuXG4gICAgLyoqXG4gICAgICogU29tZSBDU1MgcHJvcGVydGllcyBjYW4gYmUgdXNlZCB0byBpbXByb3ZlIHRoZSB3b3JraW5nIG9mIEhhbW1lci5cbiAgICAgKiBBZGQgdGhlbSB0byB0aGlzIG1ldGhvZCBhbmQgdGhleSB3aWxsIGJlIHNldCB3aGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIuXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqL1xuICAgIGNzc1Byb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0ZXh0IHNlbGVjdGlvbiB0byBpbXByb3ZlIHRoZSBkcmFnZ2luZyBnZXN0dXJlLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIHRoZSBXaW5kb3dzIFBob25lIGdyaXBwZXJzIHdoZW4gcHJlc3NpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaFNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0aGUgZGVmYXVsdCBjYWxsb3V0IHNob3duIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0LlxuICAgICAgICAgKiBPbiBpT1MsIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0IHN1Y2ggYXMgYSBsaW5rLCBTYWZhcmkgZGlzcGxheXNcbiAgICAgICAgICogYSBjYWxsb3V0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxpbmsuIFRoaXMgcHJvcGVydHkgYWxsb3dzIHlvdSB0byBkaXNhYmxlIHRoYXQgY2FsbG91dC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaENhbGxvdXQ6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHdoZXRoZXIgem9vbWluZyBpcyBlbmFibGVkLiBVc2VkIGJ5IElFMTA+XG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGVudFpvb21pbmc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHRoYXQgYW4gZW50aXJlIGVsZW1lbnQgc2hvdWxkIGJlIGRyYWdnYWJsZSBpbnN0ZWFkIG9mIGl0cyBjb250ZW50cy4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJEcmFnOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE92ZXJyaWRlcyB0aGUgaGlnaGxpZ2h0IGNvbG9yIHNob3duIHdoZW4gdGhlIHVzZXIgdGFwcyBhIGxpbmsgb3IgYSBKYXZhU2NyaXB0XG4gICAgICAgICAqIGNsaWNrYWJsZSBlbGVtZW50IGluIGlPUy4gVGhpcyBwcm9wZXJ0eSBvYmV5cyB0aGUgYWxwaGEgdmFsdWUsIGlmIHNwZWNpZmllZC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ3JnYmEoMCwwLDAsMCknXG4gICAgICAgICAqL1xuICAgICAgICB0YXBIaWdobGlnaHRDb2xvcjogJ3JnYmEoMCwwLDAsMCknXG4gICAgfVxufTtcblxudmFyIFNUT1AgPSAxO1xudmFyIEZPUkNFRF9TVE9QID0gMjtcblxuLyoqXG4gKiBNYW5hZ2VyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCBIYW1tZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0ID0gdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0IHx8IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgdGhpcy5yZWNvZ25pemVycyA9IFtdO1xuICAgIHRoaXMub2xkQ3NzUHJvcHMgPSB7fTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pbnB1dCA9IGNyZWF0ZUlucHV0SW5zdGFuY2UodGhpcyk7XG4gICAgdGhpcy50b3VjaEFjdGlvbiA9IG5ldyBUb3VjaEFjdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuXG4gICAgdG9nZ2xlQ3NzUHJvcHModGhpcywgdHJ1ZSk7XG5cbiAgICBlYWNoKHRoaXMub3B0aW9ucy5yZWNvZ25pemVycywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgcmVjb2duaXplciA9IHRoaXMuYWRkKG5ldyAoaXRlbVswXSkoaXRlbVsxXSkpO1xuICAgICAgICBpdGVtWzJdICYmIHJlY29nbml6ZXIucmVjb2duaXplV2l0aChpdGVtWzJdKTtcbiAgICAgICAgaXRlbVszXSAmJiByZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKGl0ZW1bM10pO1xuICAgIH0sIHRoaXMpO1xufVxuXG5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIE9wdGlvbnMgdGhhdCBuZWVkIGEgbGl0dGxlIG1vcmUgc2V0dXBcbiAgICAgICAgaWYgKG9wdGlvbnMudG91Y2hBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW5wdXRUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vIENsZWFuIHVwIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVycyBhbmQgcmVpbml0aWFsaXplXG4gICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudGFyZ2V0ID0gb3B0aW9ucy5pbnB1dFRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBzdG9wIHJlY29nbml6aW5nIGZvciB0aGlzIHNlc3Npb24uXG4gICAgICogVGhpcyBzZXNzaW9uIHdpbGwgYmUgZGlzY2FyZGVkLCB3aGVuIGEgbmV3IFtpbnB1dF1zdGFydCBldmVudCBpcyBmaXJlZC5cbiAgICAgKiBXaGVuIGZvcmNlZCwgdGhlIHJlY29nbml6ZXIgY3ljbGUgaXMgc3RvcHBlZCBpbW1lZGlhdGVseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZV1cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbihmb3JjZSkge1xuICAgICAgICB0aGlzLnNlc3Npb24uc3RvcHBlZCA9IGZvcmNlID8gRk9SQ0VEX1NUT1AgOiBTVE9QO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBydW4gdGhlIHJlY29nbml6ZXJzIVxuICAgICAqIGNhbGxlZCBieSB0aGUgaW5wdXRIYW5kbGVyIGZ1bmN0aW9uIG9uIGV2ZXJ5IG1vdmVtZW50IG9mIHRoZSBwb2ludGVycyAodG91Y2hlcylcbiAgICAgKiBpdCB3YWxrcyB0aHJvdWdoIGFsbCB0aGUgcmVjb2duaXplcnMgYW5kIHRyaWVzIHRvIGRldGVjdCB0aGUgZ2VzdHVyZSB0aGF0IGlzIGJlaW5nIG1hZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLnNlc3Npb247XG4gICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJ1biB0aGUgdG91Y2gtYWN0aW9uIHBvbHlmaWxsXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24ucHJldmVudERlZmF1bHRzKGlucHV0RGF0YSk7XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXI7XG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG5cbiAgICAgICAgLy8gdGhpcyBob2xkcyB0aGUgcmVjb2duaXplciB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgIC8vIHNvIHRoZSByZWNvZ25pemVyJ3Mgc3RhdGUgbmVlZHMgdG8gYmUgQkVHQU4sIENIQU5HRUQsIEVOREVEIG9yIFJFQ09HTklaRURcbiAgICAgICAgLy8gaWYgbm8gcmVjb2duaXplciBpcyBkZXRlY3RpbmcgYSB0aGluZywgaXQgaXMgc2V0IHRvIGBudWxsYFxuICAgICAgICB2YXIgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplcjtcblxuICAgICAgICAvLyByZXNldCB3aGVuIHRoZSBsYXN0IHJlY29nbml6ZXIgaXMgcmVjb2duaXplZFxuICAgICAgICAvLyBvciB3aGVuIHdlJ3JlIGluIGEgbmV3IHNlc3Npb25cbiAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyIHx8IChjdXJSZWNvZ25pemVyICYmIGN1clJlY29nbml6ZXIuc3RhdGUgJiBTVEFURV9SRUNPR05JWkVEKSkge1xuICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgcmVjb2duaXplcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZWNvZ25pemVyID0gcmVjb2duaXplcnNbaV07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3V0IGlmIHdlIGFyZSBhbGxvd2VkIHRyeSB0byByZWNvZ25pemUgdGhlIGlucHV0IGZvciB0aGlzIG9uZS5cbiAgICAgICAgICAgIC8vIDEuICAgYWxsb3cgaWYgdGhlIHNlc3Npb24gaXMgTk9UIGZvcmNlZCBzdG9wcGVkIChzZWUgdGhlIC5zdG9wKCkgbWV0aG9kKVxuICAgICAgICAgICAgLy8gMi4gICBhbGxvdyBpZiB3ZSBzdGlsbCBoYXZlbid0IHJlY29nbml6ZWQgYSBnZXN0dXJlIGluIHRoaXMgc2Vzc2lvbiwgb3IgdGhlIHRoaXMgcmVjb2duaXplciBpcyB0aGUgb25lXG4gICAgICAgICAgICAvLyAgICAgIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgICAgIC8vIDMuICAgYWxsb3cgaWYgdGhlIHJlY29nbml6ZXIgaXMgYWxsb3dlZCB0byBydW4gc2ltdWx0YW5lb3VzIHdpdGggdGhlIGN1cnJlbnQgcmVjb2duaXplZCByZWNvZ25pemVyLlxuICAgICAgICAgICAgLy8gICAgICB0aGlzIGNhbiBiZSBzZXR1cCB3aXRoIHRoZSBgcmVjb2duaXplV2l0aCgpYCBtZXRob2Qgb24gdGhlIHJlY29nbml6ZXIuXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkICE9PSBGT1JDRURfU1RPUCAmJiAoIC8vIDFcbiAgICAgICAgICAgICAgICAgICAgIWN1clJlY29nbml6ZXIgfHwgcmVjb2duaXplciA9PSBjdXJSZWNvZ25pemVyIHx8IC8vIDJcbiAgICAgICAgICAgICAgICAgICAgcmVjb2duaXplci5jYW5SZWNvZ25pemVXaXRoKGN1clJlY29nbml6ZXIpKSkgeyAvLyAzXG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZWNvZ25pemUoaW5wdXREYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZXNldCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVjb2duaXplciBoYXMgYmVlbiByZWNvZ25pemluZyB0aGUgaW5wdXQgYXMgYSB2YWxpZCBnZXN0dXJlLCB3ZSB3YW50IHRvIHN0b3JlIHRoaXMgb25lIGFzIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBhY3RpdmUgcmVjb2duaXplci4gYnV0IG9ubHkgaWYgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGFuIGFjdGl2ZSByZWNvZ25pemVyXG4gICAgICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgJiYgcmVjb2duaXplci5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCkpIHtcbiAgICAgICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gcmVjb2duaXplcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXQgYSByZWNvZ25pemVyIGJ5IGl0cyBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxOdWxsfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAocmVjb2duaXplciBpbnN0YW5jZW9mIFJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWNvZ25pemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlY29nbml6ZXJzW2ldLm9wdGlvbnMuZXZlbnQgPT0gcmVjb2duaXplcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgcmVjb2duaXplciB0byB0aGUgbWFuYWdlclxuICAgICAqIGV4aXN0aW5nIHJlY29nbml6ZXJzIHdpdGggdGhlIHNhbWUgZXZlbnQgbmFtZSB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxNYW5hZ2VyfVxuICAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ2FkZCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBleGlzdGluZ1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLmdldChyZWNvZ25pemVyLm9wdGlvbnMuZXZlbnQpO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGV4aXN0aW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjb2duaXplcnMucHVzaChyZWNvZ25pemVyKTtcbiAgICAgICAgcmVjb2duaXplci5tYW5hZ2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGEgcmVjb2duaXplciBieSBuYW1lIG9yIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ3JlbW92ZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29nbml6ZXIgPSB0aGlzLmdldChyZWNvZ25pemVyKTtcblxuICAgICAgICAvLyBsZXQncyBtYWtlIHN1cmUgdGhpcyByZWNvZ25pemVyIGV4aXN0c1xuICAgICAgICBpZiAocmVjb2duaXplcikge1xuICAgICAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkocmVjb2duaXplcnMsIHJlY29nbml6ZXIpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSA9IGhhbmRsZXJzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCBldmVudCwgbGVhdmUgZW1pdCBibGFuayB0byByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXVxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvZmY6IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tldmVudF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSAmJiBoYW5kbGVyc1tldmVudF0uc3BsaWNlKGluQXJyYXkoaGFuZGxlcnNbZXZlbnRdLCBoYW5kbGVyKSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZW1pdCBldmVudCB0byB0aGUgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gdHJpZ2dlciBkb20gZXZlbnRzXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG9tRXZlbnRzKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gaGFuZGxlcnMsIHNvIHNraXAgaXQgYWxsXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdICYmIHRoaXMuaGFuZGxlcnNbZXZlbnRdLnNsaWNlKCk7XG4gICAgICAgIGlmICghaGFuZGxlcnMgfHwgIWhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS50eXBlID0gZXZlbnQ7XG4gICAgICAgIGRhdGEucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRhdGEuc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXShkYXRhKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXN0cm95IHRoZSBtYW5hZ2VyIGFuZCB1bmJpbmRzIGFsbCBldmVudHNcbiAgICAgKiBpdCBkb2Vzbid0IHVuYmluZCBkb20gZXZlbnRzLCB0aGF0IGlzIHRoZSB1c2VyIG93biByZXNwb25zaWJpbGl0eVxuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgJiYgdG9nZ2xlQ3NzUHJvcHModGhpcywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogYWRkL3JlbW92ZSB0aGUgY3NzIHByb3BlcnRpZXMgYXMgZGVmaW5lZCBpbiBtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtCb29sZWFufSBhZGRcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlQ3NzUHJvcHMobWFuYWdlciwgYWRkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKCFlbGVtZW50LnN0eWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3A7XG4gICAgZWFjaChtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHByb3AgPSBwcmVmaXhlZChlbGVtZW50LnN0eWxlLCBuYW1lKTtcbiAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSA9IGVsZW1lbnQuc3R5bGVbcHJvcF07XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSB8fCAnJztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghYWRkKSB7XG4gICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHMgPSB7fTtcbiAgICB9XG59XG5cbi8qKlxuICogdHJpZ2dlciBkb20gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqL1xuZnVuY3Rpb24gdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKSB7XG4gICAgdmFyIGdlc3R1cmVFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGdlc3R1cmVFdmVudC5pbml0RXZlbnQoZXZlbnQsIHRydWUsIHRydWUpO1xuICAgIGdlc3R1cmVFdmVudC5nZXN0dXJlID0gZGF0YTtcbiAgICBkYXRhLnRhcmdldC5kaXNwYXRjaEV2ZW50KGdlc3R1cmVFdmVudCk7XG59XG5cbmFzc2lnbihIYW1tZXIsIHtcbiAgICBJTlBVVF9TVEFSVDogSU5QVVRfU1RBUlQsXG4gICAgSU5QVVRfTU9WRTogSU5QVVRfTU9WRSxcbiAgICBJTlBVVF9FTkQ6IElOUFVUX0VORCxcbiAgICBJTlBVVF9DQU5DRUw6IElOUFVUX0NBTkNFTCxcblxuICAgIFNUQVRFX1BPU1NJQkxFOiBTVEFURV9QT1NTSUJMRSxcbiAgICBTVEFURV9CRUdBTjogU1RBVEVfQkVHQU4sXG4gICAgU1RBVEVfQ0hBTkdFRDogU1RBVEVfQ0hBTkdFRCxcbiAgICBTVEFURV9FTkRFRDogU1RBVEVfRU5ERUQsXG4gICAgU1RBVEVfUkVDT0dOSVpFRDogU1RBVEVfUkVDT0dOSVpFRCxcbiAgICBTVEFURV9DQU5DRUxMRUQ6IFNUQVRFX0NBTkNFTExFRCxcbiAgICBTVEFURV9GQUlMRUQ6IFNUQVRFX0ZBSUxFRCxcblxuICAgIERJUkVDVElPTl9OT05FOiBESVJFQ1RJT05fTk9ORSxcbiAgICBESVJFQ1RJT05fTEVGVDogRElSRUNUSU9OX0xFRlQsXG4gICAgRElSRUNUSU9OX1JJR0hUOiBESVJFQ1RJT05fUklHSFQsXG4gICAgRElSRUNUSU9OX1VQOiBESVJFQ1RJT05fVVAsXG4gICAgRElSRUNUSU9OX0RPV046IERJUkVDVElPTl9ET1dOLFxuICAgIERJUkVDVElPTl9IT1JJWk9OVEFMOiBESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICBESVJFQ1RJT05fVkVSVElDQUw6IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICBESVJFQ1RJT05fQUxMOiBESVJFQ1RJT05fQUxMLFxuXG4gICAgTWFuYWdlcjogTWFuYWdlcixcbiAgICBJbnB1dDogSW5wdXQsXG4gICAgVG91Y2hBY3Rpb246IFRvdWNoQWN0aW9uLFxuXG4gICAgVG91Y2hJbnB1dDogVG91Y2hJbnB1dCxcbiAgICBNb3VzZUlucHV0OiBNb3VzZUlucHV0LFxuICAgIFBvaW50ZXJFdmVudElucHV0OiBQb2ludGVyRXZlbnRJbnB1dCxcbiAgICBUb3VjaE1vdXNlSW5wdXQ6IFRvdWNoTW91c2VJbnB1dCxcbiAgICBTaW5nbGVUb3VjaElucHV0OiBTaW5nbGVUb3VjaElucHV0LFxuXG4gICAgUmVjb2duaXplcjogUmVjb2duaXplcixcbiAgICBBdHRyUmVjb2duaXplcjogQXR0clJlY29nbml6ZXIsXG4gICAgVGFwOiBUYXBSZWNvZ25pemVyLFxuICAgIFBhbjogUGFuUmVjb2duaXplcixcbiAgICBTd2lwZTogU3dpcGVSZWNvZ25pemVyLFxuICAgIFBpbmNoOiBQaW5jaFJlY29nbml6ZXIsXG4gICAgUm90YXRlOiBSb3RhdGVSZWNvZ25pemVyLFxuICAgIFByZXNzOiBQcmVzc1JlY29nbml6ZXIsXG5cbiAgICBvbjogYWRkRXZlbnRMaXN0ZW5lcnMsXG4gICAgb2ZmOiByZW1vdmVFdmVudExpc3RlbmVycyxcbiAgICBlYWNoOiBlYWNoLFxuICAgIG1lcmdlOiBtZXJnZSxcbiAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBpbmhlcml0OiBpbmhlcml0LFxuICAgIGJpbmRGbjogYmluZEZuLFxuICAgIHByZWZpeGVkOiBwcmVmaXhlZFxufSk7XG5cbi8vIHRoaXMgcHJldmVudHMgZXJyb3JzIHdoZW4gSGFtbWVyIGlzIGxvYWRlZCBpbiB0aGUgcHJlc2VuY2Ugb2YgYW4gQU1EXG4vLyAgc3R5bGUgbG9hZGVyIGJ1dCBieSBzY3JpcHQgdGFnLCBub3QgYnkgdGhlIGxvYWRlci5cbnZhciBmcmVlR2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB7fSkpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbmZyZWVHbG9iYWwuSGFtbWVyID0gSGFtbWVyO1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gSGFtbWVyO1xuICAgIH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBIYW1tZXI7XG59IGVsc2Uge1xuICAgIHdpbmRvd1tleHBvcnROYW1lXSA9IEhhbW1lcjtcbn1cblxufSkod2luZG93LCBkb2N1bWVudCwgJ0hhbW1lcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaGFtbWVyanMvaGFtbWVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==