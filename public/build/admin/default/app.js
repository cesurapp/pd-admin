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
        template = '<div class="fade modal confirm" id="confirmModal" tabindex="-1">' + '<div class="modal-dialog {modalWidth}">' + '<div class="modal-content">' + '<div class="modal-header"><h4 class="modal-title"><i class="material-icons text-warning">{modalTitle}</i></h4></div>' + '<div class="modal-body">{modalBody}</div>' + '<div class="modal-footer">' + '<button type="button" id="btnNo" class="btn btn-light no" data-dismiss="modal">{btnNo}</button>' + '<button type="button" id="btnYes" class="btn btn-success yes" >{btnYes}</button>' + '</div>' + '</div>' + '</div>' + '</div>';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTBiYTgzMDhlODMyZTUyNWFmODAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2NvbnRlbnQtbmF2LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2RpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL21vZGFsLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L3Njc3MvYXBwLnNjc3M/ZjA0MSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9kYXRlcGlja2VyLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9pMThuL2RhdGVwaWNrZXIuZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhbW1lcmpzL2hhbW1lci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJmaW5kIiwiaG92ZXIiLCJsaXN0IiwibGVuZ3RoIiwibGlzdEhlaWdodCIsIm91dGVySGVpZ2h0Iiwib3ZlcmZsb3ciLCJoZWlnaHQiLCJvZmZzZXRUb3AiLCJjc3MiLCJTdW1vU2VsZWN0Iiwic2VhcmNoIiwicGxhY2Vob2xkZXIiLCJsYW5nIiwic2VhcmNoVGV4dCIsImNhcHRpb25Gb3JtYXQiLCJjYXB0aW9uRm9ybWF0QWxsU2VsZWN0ZWQiLCJub01hdGNoIiwidGltZXIiLCJhamF4U3RhcnQiLCJhcHBlbmQiLCJsb2FkZXIiLCJ3aWR0aCIsImluY3JlbWVudCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImFqYXhTdWNjZXNzIiwiZmFkZU91dCIsInJlbW92ZSIsImFqYXhFcnJvciIsImludGVydmFsIiwidGltZSIsImJ1dHRvblNob3ciLCJwcm9jZXNzIiwid2luZG93IiwicmVzaXplIiwibmF2IiwibWVudSIsIm1lbnVJdGVtcyIsIm1lbnVJdGVtc1dpZHRoIiwibWFwIiwib2Zmc2V0V2lkdGgiLCJtZW51V2lkdGgiLCJnZXQiLCJhZGRCdXR0b24iLCJzY3JvbGxBY3RpdmVCdXR0b24iLCJyZW1vdmVCdXR0b24iLCJhY3RpdmVCdXR0b24iLCJhY3RpdmVCdXR0b25PZmZzZXQiLCJwb3NpdGlvbiIsImxlZnQiLCJzY3JvbGxMZWZ0IiwicHJlcGVuZCIsIm9uIiwiY29uc29sZSIsImxvZyIsImFuaW1hdGUiLCJhZGRTd2lwZSIsIm9mZiIsIm1hcmdpbiIsIm1jIiwiSGFtbWVyIiwiZG9tRXZlbnRzIiwiZSIsImRlbHRhIiwiZGVsdGFYIiwiZm4iLCJkYXRlcGlja2VyIiwibGFuZ3VhZ2UiLCJkYXlzIiwiZGF5c1Nob3J0IiwiZGF5c01pbiIsIm1vbnRocyIsIm1vbnRoc1Nob3J0IiwidG9kYXkiLCJjbGVhciIsImRhdGVGb3JtYXQiLCJ0aW1lRm9ybWF0IiwiZmlyc3REYXkiLCJqUXVlcnkiLCJlYWNoIiwiaW5kZXgiLCJlbCIsInRvZGF5QnV0dG9uIiwiRGF0ZSIsImF1dG9DbG9zZSIsInRpbWVwaWNrZXIiLCJkYXRhIiwic2VsZWN0RGF0ZSIsImdldEF0dHJpYnV0ZSIsInJlcGxhY2UiLCJjaGFuZ2UiLCJzZWxmIiwiY29udGFpbmVyIiwiY2xvc2VzdCIsInByb3AiLCJ0b29sdGlwIiwicG9wb3ZlciIsInRyaWdnZXIiLCJodG1sIiwiY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsImVsZW1lbnQiLCJ1cmwiLCJ2YWx1ZSIsIm9wdGlvbiIsImdldEpTT04iLCJyZXNwb25zZSIsImtleSIsInN1bW8iLCJyZWxvYWQiLCJwYXJlbnQiLCJuZXh0IiwibW9kYWxfdGl0bGUiLCJtb2RhbF9ib2R5IiwibW9kYWxfd2lkdGgiLCJ0ZW1wbGF0ZSIsIm1kbCIsImxvY2F0aW9uIiwiaHJlZiIsImF0dHIiLCJmb3JtIiwic3VibWl0IiwibW9kYWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7OztBQVVBOzs7QUFHQSxtQkFBQUEsQ0FBUSw4REFBUjs7QUFFQTs7O0FBR0EsbUJBQUFBLENBQVEsMkVBQVI7QUFDQSxtQkFBQUEsQ0FBUSxpRUFBUjtBQUNBLG1CQUFBQSxDQUFRLG1FQUFSO0FBQ0EsbUJBQUFBLENBQVEsK0VBQVI7QUFDQSxtQkFBQUEsQ0FBUSw2RUFBUjs7QUFHQTs7O0FBR0FDLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFZO0FBQzVCOzs7QUFHQUYsSUFBRSxXQUFGLEVBQWVHLElBQWYsQ0FBb0IsV0FBcEIsRUFBaUNDLEtBQWpDLENBQXVDLFlBQVk7QUFDakQsUUFBSUMsT0FBT0wsRUFBRSxJQUFGLEVBQVFHLElBQVIsQ0FBYSxJQUFiLENBQVg7QUFDQSxRQUFJRSxLQUFLQyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsVUFBSUMsYUFB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QUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixFQUFFOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxtR0FBbUcsR0FBRztBQUN0Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQUE7QUFDTCxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQSxDQUFDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9hZG1pbi9kZWZhdWx0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9hcHAuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTBiYTgzMDhlODMyZTUyNWFmODAiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxuLyoqXG4gKiBMb2FkIFNDU1MgRGVwZW5kZW5jaWVzXG4gKi9cbnJlcXVpcmUoJy4uL3Njc3MvYXBwLnNjc3MnKTtcblxuLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIE1vZHVsZXNcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbnJlcXVpcmUoJy4vbW9kdWxlcy9kaXJlY3RpdmUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9hamF4Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvbW9kYWwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9jb250ZW50LW5hdicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2RhdGVwaWNrZXInKTtcblxuXG4vKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gUGFnZSBMb2FkXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBNYWluIE5hdmlnYXRpb24gQXV0byBQb3NpdGlvblxuICAgKi9cbiAgJCgnI25hdl9tYWluJykuZmluZCgnPiB1bCA+IGxpJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgIHZhciBsaXN0ID0gJCh0aGlzKS5maW5kKCd1bCcpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICB2YXIgbGlzdEhlaWdodCA9IGxpc3Qub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHZhciBvdmVyZmxvdyA9ICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gdGhpcy5vZmZzZXRUb3A7XG5cbiAgICAgIGlmIChvdmVyZmxvdyA8IGxpc3RIZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0VG9wID4gbGlzdEhlaWdodCkge1xuICAgICAgICAgIGxpc3QuY3NzKCd0b3AnLCAnYXV0bycpO1xuICAgICAgICAgIGxpc3QuY3NzKCdib3R0b20nLCAnMCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3QuY3NzKCd0b3AnLCAnLScgKyAobGlzdEhlaWdodCAtIG92ZXJmbG93KSArICdweCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQ3VzdG9tIFNlbGVjdFxuICAgKi9cbiAgJCgnc2VsZWN0JykuU3Vtb1NlbGVjdCh7XG4gICAgc2VhcmNoOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiBsYW5nWydzZWFyY2hfcGxhY2Vob2xkZXInXSxcbiAgICBzZWFyY2hUZXh0OiBsYW5nWydzZWFyY2hfdGV4dCddLFxuICAgIGNhcHRpb25Gb3JtYXQ6IGxhbmdbJ3NlbGVjdF9jYXB0aW9uJ10sXG4gICAgY2FwdGlvbkZvcm1hdEFsbFNlbGVjdGVkOiBsYW5nWydzZWxlY3RfY2FwdGlvbl9hbGwnXSxcbiAgICBub01hdGNoOiBsYW5nWydzZWxlY3Rfbm9fbWF0Y2hlcyddXG4gIH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9hcHAuanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDEzIC0gMjAxNiwgT1RUT1NJU1RFTSAoaHR0cDovL290dG9zaXN0ZW0uY29tKVxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNiAtIDIwMTcsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICpcbiAqL1xuXG52YXIgdGltZXI7XG5cbi8qKlxuICogR2xvYmFsIEFqYXggU3RhcnRlZCBIYW5kbGVyXG4gKi9cbiQoZG9jdW1lbnQpLmFqYXhTdGFydChmdW5jdGlvbiAoKSB7XG4gIC8vIFNldCBBamF4IExvYWRlclxuICAkKCcuY29udGVudC13cmFwcGVyJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYWpheC1sb2FkZXJcIj48ZGl2IGNsYXNzPVwiYmFyXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgdmFyIGxvYWRlciA9ICQoJy5hamF4LWxvYWRlciAuYmFyJyk7XG4gIHZhciB3aWR0aCA9IDE1O1xuICB2YXIgaW5jcmVtZW50ID0gNTtcbiAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgd2lkdGggPSB3aWR0aCArIGluY3JlbWVudDtcbiAgICBsb2FkZXIuY3NzKCd3aWR0aCcsIHdpZHRoICsgJyUnKTtcbiAgICBpZiAod2lkdGggPj0gNDApIHtcbiAgICAgIGluY3JlbWVudCA9IDI7XG4gICAgfVxuICAgIGlmICh3aWR0aCA+PSA3MCkge1xuICAgICAgaW5jcmVtZW50ID0gMTtcbiAgICB9XG4gICAgaWYgKHdpZHRoID49IDkwKSB7XG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICB9XG4gIH0sIDUwKTtcbn0pO1xuXG4vKipcbiAqIEdsb2JhbCBBamF4IENvbXBsZXRlZCBIYW5kbGVyXG4gKi9cbiQoZG9jdW1lbnQpLmFqYXhTdWNjZXNzKGZ1bmN0aW9uICgpIHtcbiAgLy8gU3RvcCBUaW1lclxuICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAvLyBTZXQgQWpheCBDb21wbGV0ZVxuICAkKCcuYWpheC1sb2FkZXIgLmJhcicpXG4gICAgLmNzcygnd2lkdGgnLCAnMTAwJScpO1xuXG4gIC8vIFJlbW92ZSBBamF4IExvYWRlclxuICAkKCcuYWpheC1sb2FkZXInKS5mYWRlT3V0KDI1MCwgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucmVtb3ZlKCk7XG4gIH0pO1xufSk7XG5cbi8qKlxuICogR2xvYmFsIEFqYXggQ29tcGxldGVkIEhhbmRsZXJcbiAqL1xuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uICgpIHtcbiAgLy8gU3RvcCBUaW1lclxuICBjbGVhckludGVydmFsKHRpbWVyKTtcblxuICAvLyBTZXQgQWpheCBEYW5nZXIgJiBDb21wbGV0ZVxuICAkKCcuYWpheC1sb2FkZXIgLmJhcicpXG4gICAgLmNzcygnYmFja2dyb3VuZCcsICdyZWQnKVxuICAgIC5jc3MoJ2JveC1zaGFkb3cnLCAnMCAwIDVweCAjZmQ0NjQ2JylcbiAgICAuY3NzKCd3aWR0aCcsICcxMDAlJyk7XG5cbiAgLy8gUmVtb3ZlIEFqYXggTG9hZGVyXG4gICQoJy5hamF4LWxvYWRlcicpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL2FqYXguanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxucmVxdWlyZSgnaGFtbWVyanMnKTtcblxudmFyIGludGVydmFsID0gbnVsbDtcbnZhciB0aW1lID0gMTAwO1xudmFyIGJ1dHRvblNob3cgPSBmYWxzZTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIC8vIFN0YXJ0IEZpcnN0IFJ1blxuICBpbnRlcnZhbCA9IHNldEludGVydmFsKHByb2Nlc3MsIHRpbWUpO1xuXG4gIC8vIFJlc3RhcnQgV2luZG93IFJlc2l6ZVxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaW50ZXJ2YWwgPT09IG51bGwpIHtcbiAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwocHJvY2VzcywgdGltZSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vKipcbiAqIFByb2Nlc3MgU2Nyb2xsZXIgQnV0dG9uXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gIHZhciBuYXYgPSAkKCcjY29udGVudF9uYXYnKTtcbiAgdmFyIG1lbnUgPSBuYXYuZmluZCgnLm5hdicpO1xuICB2YXIgbWVudUl0ZW1zID0gbWVudS5maW5kKCc+IGxpJyk7XG5cbiAgaWYgKG1lbnUubGVuZ3RoKSB7XG4gICAgLy8gRmluZCBFbGVtZW50IFdpZHRoXG4gICAgdmFyIG1lbnVJdGVtc1dpZHRoID0gMDtcbiAgICBtZW51SXRlbXMubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lbnVJdGVtc1dpZHRoICs9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBPdmVyZmxvd1xuICAgIHZhciBtZW51V2lkdGggPSBtZW51LmdldCgwKS5vZmZzZXRXaWR0aDtcbiAgICBpZiAobWVudUl0ZW1zV2lkdGggPiBtZW51V2lkdGgpIHtcbiAgICAgIGFkZEJ1dHRvbihuYXYsIG1lbnUsIG1lbnVXaWR0aCk7XG4gICAgICBzY3JvbGxBY3RpdmVCdXR0b24obWVudVdpZHRoLCBtZW51KVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVCdXR0b24obmF2KTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIENMZWFyIEludGVydmFsXG4gIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICBpbnRlcnZhbCA9IG51bGw7XG59XG5cbi8qKlxuICogQWN0aXZlIEJ1dHRvbiBTY3JvbGxlclxuICogQHBhcmFtIG1lbnVXaWR0aFxuICogQHBhcmFtIG1lbnVcbiAqL1xuZnVuY3Rpb24gc2Nyb2xsQWN0aXZlQnV0dG9uKG1lbnVXaWR0aCwgbWVudSkge1xuICB2YXIgYWN0aXZlQnV0dG9uID0gbWVudS5maW5kKCdsaS5hY3RpdmUnKTtcbiAgdmFyIGFjdGl2ZUJ1dHRvbk9mZnNldCA9IGFjdGl2ZUJ1dHRvbi5wb3NpdGlvbigpLmxlZnQgKyBhY3RpdmVCdXR0b24ud2lkdGgoKTtcblxuICAvLyBDaGVjayBPdmVyZmxvd1xuICBpZiAoYWN0aXZlQnV0dG9uT2Zmc2V0ID4gbWVudVdpZHRoKSB7XG4gICAgbWVudS5zY3JvbGxMZWZ0KG1lbnUuc2Nyb2xsTGVmdCgpICsgKGFjdGl2ZUJ1dHRvbk9mZnNldCAtIG1lbnVXaWR0aCkpO1xuICB9XG59XG5cbi8qKlxuICogQWRkIFNjcm9sbGVyIEJ1dHRvblxuICogQHBhcmFtIG5hdlxuICogQHBhcmFtIG1lbnVcbiAqIEBwYXJhbSBtZW51V2lkdGhcbiAqL1xuZnVuY3Rpb24gYWRkQnV0dG9uKG5hdiwgbWVudSwgbWVudVdpZHRoKSB7XG4gIGlmIChidXR0b25TaG93ID09PSBmYWxzZSkge1xuICAgIG5hdi5wcmVwZW5kKCc8ZGl2IGlkPVwic2Nyb2xsZXJcIj48YSBjbGFzcz1cImxlZnRcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+bmF2aWdhdGVfYmVmb3JlPC9pPjwvYT48YSBjbGFzcz1cInJpZ2h0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPm5hdmlnYXRlX25leHQ8L2k+PC9hPjwvZGl2PicpO1xuXG4gICAgLy8gRW5hYmxlZCBCdXR0b25cbiAgICBidXR0b25TaG93ID0gdHJ1ZTtcblxuICAgIC8vIEVuYWJsZWQgRXZlbnRcbiAgICAkKCcjc2Nyb2xsZXInKVxuICAgICAgLm9uKCdjbGljaycsICcubGVmdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2cobWVudVdpZHRoKTtcbiAgICAgICAgbWVudS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBtZW51LnNjcm9sbExlZnQoKSAtIChtZW51V2lkdGggLyAxLjcpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLm9uKCdjbGljaycsICcucmlnaHQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1lbnUuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogbWVudS5zY3JvbGxMZWZ0KCkgKyAobWVudVdpZHRoIC8gMS43KVxuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAvLyBFbmFibGVkIFN3aXBlXG4gICAgYWRkU3dpcGUobWVudSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgU2Nyb2xsZXIgQnV0dG9uXG4gKiBAcGFyYW0gbmF2XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJ1dHRvbihuYXYpIHtcbiAgaWYgKGJ1dHRvblNob3cgPT09IHRydWUpIHtcbiAgICAvLyBEaXNhYmxlZCBCdXR0b25cbiAgICBidXR0b25TaG93ID0gZmFsc2U7XG5cbiAgICAvLyBSZW1vdmUgU2Nyb2xsZXIgQnV0dG9uXG4gICAgbmF2LmZpbmQoJyNzY3JvbGxlcicpLnJlbW92ZSgpO1xuXG4gICAgLy8gRGlzYWJsZSBFdmVudFxuICAgICQoJyNzY3JvbGxlcicpXG4gICAgICAub2ZmKCdjbGljaycsICcubGVmdCcpXG4gICAgICAub2ZmKCdjbGljaycsICcucmlnaHQnKVxuICB9XG59XG5cbi8qKlxuICogU3dpcGUgTWVudVxuICogQHBhcmFtIG1lbnVcbiAqL1xuZnVuY3Rpb24gYWRkU3dpcGUobWVudSkge1xuICB2YXIgbWFyZ2luO1xuICB2YXIgbWMgPSBuZXcgSGFtbWVyKG1lbnUuZ2V0KDApLCB7XG4gICAgZG9tRXZlbnRzOiB0cnVlXG4gIH0pO1xuXG4gIG1jXG4gICAgLm9uKFwicGFuc3RhcnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1hcmdpbiA9IC0xICogbWVudS5zY3JvbGxMZWZ0KCk7XG4gICAgfSlcbiAgICAub24oXCJwYW5cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBkZWx0YSA9IG1hcmdpbiArIGUuZGVsdGFYO1xuICAgICAgbWVudS5zY3JvbGxMZWZ0KC0xICogZGVsdGEpO1xuICAgIH0pXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvY29udGVudC1uYXYuanMiLCIvKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEVtbGFrUFJPIHBhY2thZ2UuXG4gKlxuICogQHBhY2thZ2UgICAgIEVtbGFrUFJPXG4gKiBAYXV0aG9yICAgICAgUmFtYXphbiBBUEFZRElOIDxpbGV0aXNpbUByYW1hemFuYXBheWRpbi5jb20+XG4gKiBAY29weXJpZ2h0ICAgQ29weXJpZ2h0IChjKSAyMDE3IC0gMjAxOCwgV3JpdGVMTiBZYXrEsWzEsW0gSGl6bWV0bGVyaSBTYW4uIFRpYy4gQS7FniAoaHR0cDovL3dyaXRlbG4ubmV0KVxuICogQGxpY2Vuc2UgICAgIExJQ0VOU0VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vZW1sYWtwcm8ubmV0XG4gKi9cblxuLy8gTG9hZCBBaXIgRGF0ZXBpY2tlclxucmVxdWlyZSgnYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9kYXRlcGlja2VyLm1pbicpO1xucmVxdWlyZSgnYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9pMThuL2RhdGVwaWNrZXIuZW4nKTtcblxuLy8gQ3VzdG9tIExhbmd1YWdlXG4oZnVuY3Rpb24gKCQpIHtcbiAgJC5mbi5kYXRlcGlja2VyLmxhbmd1YWdlWyd0ciddID0ge1xuICAgIGRheXM6IFsnUGF6YXInLCAnUGF6YXJ0ZXNpJywgJ1NhbMSxJywgJ8OHYXLFn2FtYmEnLCAnUGVyxZ9lbWJlJywgJ0N1bWEnLCAnQ3VtYXJ0ZXNpJ10sXG4gICAgZGF5c1Nob3J0OiBbJ1B6cicsICdQdHMnLCAnU2FsJywgJ8OHcsWfJywgJ1ByxZ8nLCAnQ3VtJywgJ0N0cyddLFxuICAgIGRheXNNaW46IFsnUHonLCAnUHQnLCAnU2wnLCAnw4dyJywgJ1ByJywgJ0NtJywgJ0N0J10sXG4gICAgbW9udGhzOiBbJ09jYWsnLCAnxZ51YmF0JywgJ01hcnQnLCAnTmlzYW4nLCAnTWF5xLFzJywgJ0hhesSxcmFuJywgJ1RlbW11eicsICdBxJ91c3RvcycsICdFeWzDvGwnLCAnRWtpbScsICdLYXPEsW0nLCAnQXJhbMSxayddLFxuICAgIG1vbnRoc1Nob3J0OiBbJ09jYScsICfFnnViJywgJ01hcicsICdOaXMnLCAnTWF5JywgJ0hheicsICdUZW0nLCAnQcSfdScsICdFeWwnLCAnRWtpJywgJ0thcycsICdBcmEnXSxcbiAgICB0b2RheTogJ0J1Z8O8bicsXG4gICAgY2xlYXI6ICdUZW1pemxlJyxcbiAgICBkYXRlRm9ybWF0OiAnbW0vZGQveXl5eScsXG4gICAgdGltZUZvcm1hdDogJ2hoOmlpIGFhJyxcbiAgICBmaXJzdERheTogMFxuICB9O1xufSkoalF1ZXJ5KTtcblxuLy8gTG9hZCBEYXRlIFRpbWUgUGlja2VyXG4kKGZ1bmN0aW9uICgpIHtcbiAgJC5lYWNoKCQoJ1tkYXRhLXBpY2tlcj1kYXRlXScpLCBmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgJChlbClcbiAgICAgIC5kYXRlcGlja2VyKHtcbiAgICAgICAgdG9kYXlCdXR0b246IG5ldyBEYXRlKCksXG4gICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICd0cicsXG4gICAgICAgIHBvc2l0aW9uOiAndG9wIGxlZnQnLFxuICAgICAgICBkYXRlRm9ybWF0OiAneXl5eS1tbS1kZCcsXG4gICAgICAgIHRpbWVGb3JtYXQ6ICdoaDppaScsXG4gICAgICAgIHRpbWVwaWNrZXI6IGZhbHNlXG4gICAgICB9KVxuICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxuICAgICAgLnNlbGVjdERhdGUobmV3IERhdGUoZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpKSk7XG4gIH0pO1xuXG4gICQuZWFjaCgkKCdbZGF0YS1waWNrZXI9ZGF0ZXRpbWVdJyksIGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAkKGVsKVxuICAgICAgLmRhdGVwaWNrZXIoe1xuICAgICAgICB0b2RheUJ1dHRvbjogbmV3IERhdGUoKSxcbiAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxuICAgICAgICBsYW5ndWFnZTogJ3RyJyxcbiAgICAgICAgcG9zaXRpb246ICd0b3AgbGVmdCcsXG4gICAgICAgIGRhdGVGb3JtYXQ6ICd5eXl5LW1tLWRkJyxcbiAgICAgICAgdGltZUZvcm1hdDogJ2hoOmlpJyxcbiAgICAgICAgdGltZXBpY2tlcjogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcbiAgICAgIC5zZWxlY3REYXRlKG5ldyBEYXRlKGVsLmdldEF0dHJpYnV0ZSgndmFsdWUnKS5yZXBsYWNlKC9cXHMvLCAnVCcpKSk7XG4gIH0pO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2FkbWluL2RlZmF1bHQvanMvbW9kdWxlcy9kYXRlcGlja2VyLmpzIiwiLypcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBFbWxha1BSTyBwYWNrYWdlLlxuICpcbiAqIEBwYWNrYWdlICAgICBFbWxha1BST1xuICogQGF1dGhvciAgICAgIFJhbWF6YW4gQVBBWURJTiA8aWxldGlzaW1AcmFtYXphbmFwYXlkaW4uY29tPlxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNyAtIDIwMTgsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIFNlbGVjdCBBbGwgQ2hlY2tib3hcbiAgICovXG4gICQoXCJbZGF0YS1zZWxlY3QtYWxsXVwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICB2YXIgY29udGFpbmVyID0gc2VsZi5jbG9zZXN0KHNlbGYuZGF0YSgnc2VsZWN0LWFsbCcpKTtcbiAgICBzZWxmLnByb3AoJ2NoZWNrZWQnLCAoc2VsZi5wcm9wKCdjaGVja2VkJykgPT0gbnVsbCB8fCBzZWxmLnByb3AoJ2NoZWNrZWQnKSA9PSB0cnVlKSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgY29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJykucHJvcCgnY2hlY2tlZCcsICFzZWxmLnByb3AoJ2NoZWNrZWQnKSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBCb290c3RyYXAgVG9vbHRpcCBBY3RpdmF0ZVxuICAgKi9cbiAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXSwgW2RhdGEtdG9vbHRpcF0nKS50b29sdGlwKCk7XG5cblxuICAvKipcbiAgICogQm9vdHN0cmFwIFBvcG92ZXJcbiAgICovXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKVxuICAgIC5wb3BvdmVyKHtcbiAgICAgIHRyaWdnZXI6ICdmb2N1cycsXG4gICAgICBodG1sOiB0cnVlXG4gICAgfSlcbiAgICAuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gIC8qKlxuICAgKiBFbGVtZW50IENoYW5nZSBFdmVudCB0byBPdGhlciBFbGVtZW50XG4gICAqL1xuICAkKCdbZGF0YS1jaGFuZ2VdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWNoYW5nZScpO1xuICAgIHZhciB1cmwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1jaGFuZ2UtdXJsJykgKyAnLycgKyB0aGlzLnZhbHVlO1xuXG4gICAgLy8gU2VuZCBBamF4XG4gICAgdmFyIG9wdGlvbiA9ICcnO1xuICAgICQuZ2V0SlNPTih1cmwsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgJC5lYWNoKHJlc3BvbnNlLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBvcHRpb24gKz0gJzxvcHRpb24gdmFsdWU9XCInICsga2V5ICsgJ1wiPicgKyB2YWx1ZSArICc8L29wdGlvbj4nO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdyaXRlIEVsZW1lbnRcbiAgICAgICQoZWxlbWVudCkuaHRtbChvcHRpb24pO1xuXG4gICAgICAvLyBSZWxvYWQgU3Vtb3NlbGVjdFxuICAgICAgJChlbGVtZW50KVswXS5zdW1vLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogUmFuZ2UgVmFsdWUgV3JpdGVyXG4gICAqL1xuICAkKGRvY3VtZW50KS5vbignaW5wdXQgY2hhbmdlJywgJ1tkYXRhLXJhbmdlXScsIGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykucGFyZW50KCkubmV4dCgpLmh0bWwodGhpcy52YWx1ZSlcbiAgfSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L2pzL21vZHVsZXMvZGlyZWN0aXZlLmpzIiwiLypcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBFbWxha1BSTyBwYWNrYWdlLlxuICpcbiAqIEBwYWNrYWdlICAgICBFbWxha1BST1xuICogQGF1dGhvciAgICAgIFJhbWF6YW4gQVBBWURJTiA8aWxldGlzaW1AcmFtYXphbmFwYXlkaW4uY29tPlxuICogQGNvcHlyaWdodCAgIENvcHlyaWdodCAoYykgMjAxNyAtIDIwMTgsIFdyaXRlTE4gWWF6xLFsxLFtIEhpem1ldGxlcmkgU2FuLiBUaWMuIEEuxZ4gKGh0dHA6Ly93cml0ZWxuLm5ldClcbiAqIEBsaWNlbnNlICAgICBMSUNFTlNFXG4gKiBAbGluayAgICAgICAgaHR0cDovL2VtbGFrcHJvLm5ldFxuICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgJCgnW2RhdGEtbW9kYWxdJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBTdG9wIFByb3BhZ2F0aW9uXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gTW9kYWwgVmFyaWFibGVcbiAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgdmFyIG1vZGFsX3RpdGxlID0gc2VsZi5kYXRhKCdtb2RhbC10aXRsZScpLFxuICAgICAgbW9kYWxfYm9keSA9IHNlbGYuZGF0YSgnbW9kYWwtYm9keScpLFxuICAgICAgbW9kYWxfd2lkdGggPSBzZWxmLmRhdGEoJ21vZGFsLXdpZHRoJyksXG4gICAgICB0ZW1wbGF0ZSA9XG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZmFkZSBtb2RhbCBjb25maXJtXCIgaWQ9XCJjb25maXJtTW9kYWxcIiB0YWJpbmRleD1cIi0xXCI+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cge21vZGFsV2lkdGh9XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj48aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdGV4dC13YXJuaW5nXCI+e21vZGFsVGl0bGV9PC9pPjwvaDQ+PC9kaXY+JyArXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPnttb2RhbEJvZHl9PC9kaXY+JyArXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiYnRuTm9cIiBjbGFzcz1cImJ0biBidG4tbGlnaHQgbm9cIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPntidG5Ob308L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJidG5ZZXNcIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyB5ZXNcIiA+e2J0blllc308L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAvLyBTZXQgQ29udGVudFxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgne21vZGFsVGl0bGV9JywgbW9kYWxfdGl0bGUgPyBtb2RhbF90aXRsZSA6ICd3YXJuaW5nJyk7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7bW9kYWxCb2R5fScsIG1vZGFsX2JvZHkgPyBtb2RhbF9ib2R5IDogbGFuZ1sncG9wdXBfZGVsZXRlX21lc3NhZ2UnXSk7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7YnRuTm99JywgbGFuZ1snYnRuX2Nsb3NlJ10pO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgne2J0blllc30nLCBsYW5nWydidG5feWVzJ10pO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgne21vZGFsV2lkdGh9JywgbW9kYWxfd2lkdGggPyBtb2RhbF93aWR0aCA6ICdtb2RhbC1zbScpO1xuXG4gICAgLy8gV3JpdGVcbiAgICB2YXIgbWRsID0gJCgnI21vZGFscycpLmh0bWwodGVtcGxhdGUpO1xuXG4gICAgLyoqXG4gICAgICogQ29uZmlybVxuICAgICAqL1xuICAgIGlmIChzZWxmLmRhdGEoJ21vZGFsJykgPT09ICdjb25maXJtJykge1xuICAgICAgbWRsLm9mZignY2xpY2snLCAnI2J0blllcycpO1xuICAgICAgbWRsLm9uKCdjbGljaycsICcjYnRuWWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNlbGYuYXR0cignaHJlZicpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlybSBGb3JtIFN1Ym1pdFxuICAgICAqL1xuICAgIGlmIChzZWxmLmRhdGEoJ21vZGFsJykgPT09ICdjb25maXJtLWZvcm0nKSB7XG4gICAgICBtZGwub2ZmKCdjbGljaycsICcjYnRuWWVzJyk7XG4gICAgICBtZGwub24oJ2NsaWNrJywgJyNidG5ZZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmb3JtID0gJChzZWxmLmRhdGEoJ2Zvcm0nKSk7XG4gICAgICAgIGZvcm0uYXR0cignYWN0aW9uJywgc2VsZi5hdHRyKCdocmVmJykgPyBzZWxmLmF0dHIoJ2hyZWYnKSA6IHNlbGYuZGF0YSgnaHJlZicpKTtcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNob3cgTW9kYWxcbiAgICAkKCcjY29uZmlybU1vZGFsJykubW9kYWwoKTtcbiAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYWRtaW4vZGVmYXVsdC9qcy9tb2R1bGVzL21vZGFsLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9hZG1pbi9kZWZhdWx0L3Njc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IC4vYXNzZXRzL2FkbWluL2RlZmF1bHQvc2Nzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIhZnVuY3Rpb24odCxlLGkpeyFmdW5jdGlvbigpe3ZhciBzLGEsbixoPVwiMi4yLjNcIixvPVwiZGF0ZXBpY2tlclwiLHI9XCIuZGF0ZXBpY2tlci1oZXJlXCIsYz0hMSxkPSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlclwiPjxpIGNsYXNzPVwiZGF0ZXBpY2tlci0tcG9pbnRlclwiPjwvaT48bmF2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbmF2XCI+PC9uYXY+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nLGw9e2NsYXNzZXM6XCJcIixpbmxpbmU6ITEsbGFuZ3VhZ2U6XCJydVwiLHN0YXJ0RGF0ZTpuZXcgRGF0ZSxmaXJzdERheTpcIlwiLHdlZWtlbmRzOls2LDBdLGRhdGVGb3JtYXQ6XCJcIixhbHRGaWVsZDpcIlwiLGFsdEZpZWxkRGF0ZUZvcm1hdDpcIkBcIix0b2dnbGVTZWxlY3RlZDohMCxrZXlib2FyZE5hdjohMCxwb3NpdGlvbjpcImJvdHRvbSBsZWZ0XCIsb2Zmc2V0OjEyLHZpZXc6XCJkYXlzXCIsbWluVmlldzpcImRheXNcIixzaG93T3RoZXJNb250aHM6ITAsc2VsZWN0T3RoZXJNb250aHM6ITAsbW92ZVRvT3RoZXJNb250aHNPblNlbGVjdDohMCxzaG93T3RoZXJZZWFyczohMCxzZWxlY3RPdGhlclllYXJzOiEwLG1vdmVUb090aGVyWWVhcnNPblNlbGVjdDohMCxtaW5EYXRlOlwiXCIsbWF4RGF0ZTpcIlwiLGRpc2FibGVOYXZXaGVuT3V0T2ZSYW5nZTohMCxtdWx0aXBsZURhdGVzOiExLG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6XCIsXCIscmFuZ2U6ITEsdG9kYXlCdXR0b246ITEsY2xlYXJCdXR0b246ITEsc2hvd0V2ZW50OlwiZm9jdXNcIixhdXRvQ2xvc2U6ITEsbW9udGhzRmllbGQ6XCJtb250aHNTaG9ydFwiLHByZXZIdG1sOic8c3ZnPjxwYXRoIGQ9XCJNIDE3LDEyIGwgLTUsNSBsIDUsNVwiPjwvcGF0aD48L3N2Zz4nLG5leHRIdG1sOic8c3ZnPjxwYXRoIGQ9XCJNIDE0LDEyIGwgNSw1IGwgLTUsNVwiPjwvcGF0aD48L3N2Zz4nLG5hdlRpdGxlczp7ZGF5czpcIk1NLCA8aT55eXl5PC9pPlwiLG1vbnRoczpcInl5eXlcIix5ZWFyczpcInl5eXkxIC0geXl5eTJcIn0sdGltZXBpY2tlcjohMSxvbmx5VGltZXBpY2tlcjohMSxkYXRlVGltZVNlcGFyYXRvcjpcIiBcIix0aW1lRm9ybWF0OlwiXCIsbWluSG91cnM6MCxtYXhIb3VyczoyNCxtaW5NaW51dGVzOjAsbWF4TWludXRlczo1OSxob3Vyc1N0ZXA6MSxtaW51dGVzU3RlcDoxLG9uU2VsZWN0OlwiXCIsb25TaG93OlwiXCIsb25IaWRlOlwiXCIsb25DaGFuZ2VNb250aDpcIlwiLG9uQ2hhbmdlWWVhcjpcIlwiLG9uQ2hhbmdlRGVjYWRlOlwiXCIsb25DaGFuZ2VWaWV3OlwiXCIsb25SZW5kZXJDZWxsOlwiXCJ9LHU9e2N0cmxSaWdodDpbMTcsMzldLGN0cmxVcDpbMTcsMzhdLGN0cmxMZWZ0OlsxNywzN10sY3RybERvd246WzE3LDQwXSxzaGlmdFJpZ2h0OlsxNiwzOV0sc2hpZnRVcDpbMTYsMzhdLHNoaWZ0TGVmdDpbMTYsMzddLHNoaWZ0RG93bjpbMTYsNDBdLGFsdFVwOlsxOCwzOF0sYWx0UmlnaHQ6WzE4LDM5XSxhbHRMZWZ0OlsxOCwzN10sYWx0RG93bjpbMTgsNDBdLGN0cmxTaGlmdFVwOlsxNiwxNywzOF19LG09ZnVuY3Rpb24odCxhKXt0aGlzLmVsPXQsdGhpcy4kZWw9ZSh0KSx0aGlzLm9wdHM9ZS5leHRlbmQoITAse30sbCxhLHRoaXMuJGVsLmRhdGEoKSkscz09aSYmKHM9ZShcImJvZHlcIikpLHRoaXMub3B0cy5zdGFydERhdGV8fCh0aGlzLm9wdHMuc3RhcnREYXRlPW5ldyBEYXRlKSxcIklOUFVUXCI9PXRoaXMuZWwubm9kZU5hbWUmJih0aGlzLmVsSXNJbnB1dD0hMCksdGhpcy5vcHRzLmFsdEZpZWxkJiYodGhpcy4kYWx0RmllbGQ9XCJzdHJpbmdcIj09dHlwZW9mIHRoaXMub3B0cy5hbHRGaWVsZD9lKHRoaXMub3B0cy5hbHRGaWVsZCk6dGhpcy5vcHRzLmFsdEZpZWxkKSx0aGlzLmluaXRlZD0hMSx0aGlzLnZpc2libGU9ITEsdGhpcy5zaWxlbnQ9ITEsdGhpcy5jdXJyZW50RGF0ZT10aGlzLm9wdHMuc3RhcnREYXRlLHRoaXMuY3VycmVudFZpZXc9dGhpcy5vcHRzLnZpZXcsdGhpcy5fY3JlYXRlU2hvcnRDdXRzKCksdGhpcy5zZWxlY3RlZERhdGVzPVtdLHRoaXMudmlld3M9e30sdGhpcy5rZXlzPVtdLHRoaXMubWluUmFuZ2U9XCJcIix0aGlzLm1heFJhbmdlPVwiXCIsdGhpcy5fcHJldk9uU2VsZWN0VmFsdWU9XCJcIix0aGlzLmluaXQoKX07bj1tLG4ucHJvdG90eXBlPXtWRVJTSU9OOmgsdmlld0luZGV4ZXM6W1wiZGF5c1wiLFwibW9udGhzXCIsXCJ5ZWFyc1wiXSxpbml0OmZ1bmN0aW9uKCl7Y3x8dGhpcy5vcHRzLmlubGluZXx8IXRoaXMuZWxJc0lucHV0fHx0aGlzLl9idWlsZERhdGVwaWNrZXJzQ29udGFpbmVyKCksdGhpcy5fYnVpbGRCYXNlSHRtbCgpLHRoaXMuX2RlZmluZUxvY2FsZSh0aGlzLm9wdHMubGFuZ3VhZ2UpLHRoaXMuX3N5bmNXaXRoTWluTWF4RGF0ZXMoKSx0aGlzLmVsSXNJbnB1dCYmKHRoaXMub3B0cy5pbmxpbmV8fCh0aGlzLl9zZXRQb3NpdGlvbkNsYXNzZXModGhpcy5vcHRzLnBvc2l0aW9uKSx0aGlzLl9iaW5kRXZlbnRzKCkpLHRoaXMub3B0cy5rZXlib2FyZE5hdiYmIXRoaXMub3B0cy5vbmx5VGltZXBpY2tlciYmdGhpcy5fYmluZEtleWJvYXJkRXZlbnRzKCksdGhpcy4kZGF0ZXBpY2tlci5vbihcIm1vdXNlZG93blwiLHRoaXMuX29uTW91c2VEb3duRGF0ZXBpY2tlci5iaW5kKHRoaXMpKSx0aGlzLiRkYXRlcGlja2VyLm9uKFwibW91c2V1cFwiLHRoaXMuX29uTW91c2VVcERhdGVwaWNrZXIuYmluZCh0aGlzKSkpLHRoaXMub3B0cy5jbGFzc2VzJiZ0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKHRoaXMub3B0cy5jbGFzc2VzKSx0aGlzLm9wdHMudGltZXBpY2tlciYmKHRoaXMudGltZXBpY2tlcj1uZXcgZS5mbi5kYXRlcGlja2VyLlRpbWVwaWNrZXIodGhpcyx0aGlzLm9wdHMpLHRoaXMuX2JpbmRUaW1lcGlja2VyRXZlbnRzKCkpLHRoaXMub3B0cy5vbmx5VGltZXBpY2tlciYmdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyhcIi1vbmx5LXRpbWVwaWNrZXItXCIpLHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld109bmV3IGUuZm4uZGF0ZXBpY2tlci5Cb2R5KHRoaXMsdGhpcy5jdXJyZW50Vmlldyx0aGlzLm9wdHMpLHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uc2hvdygpLHRoaXMubmF2PW5ldyBlLmZuLmRhdGVwaWNrZXIuTmF2aWdhdGlvbih0aGlzLHRoaXMub3B0cyksdGhpcy52aWV3PXRoaXMuY3VycmVudFZpZXcsdGhpcy4kZWwub24oXCJjbGlja0NlbGwuYWRwXCIsdGhpcy5fb25DbGlja0NlbGwuYmluZCh0aGlzKSksdGhpcy4kZGF0ZXBpY2tlci5vbihcIm1vdXNlZW50ZXJcIixcIi5kYXRlcGlja2VyLS1jZWxsXCIsdGhpcy5fb25Nb3VzZUVudGVyQ2VsbC5iaW5kKHRoaXMpKSx0aGlzLiRkYXRlcGlja2VyLm9uKFwibW91c2VsZWF2ZVwiLFwiLmRhdGVwaWNrZXItLWNlbGxcIix0aGlzLl9vbk1vdXNlTGVhdmVDZWxsLmJpbmQodGhpcykpLHRoaXMuaW5pdGVkPSEwfSxfY3JlYXRlU2hvcnRDdXRzOmZ1bmN0aW9uKCl7dGhpcy5taW5EYXRlPXRoaXMub3B0cy5taW5EYXRlP3RoaXMub3B0cy5taW5EYXRlOm5ldyBEYXRlKC04NjM5OTk5OTEzNmU1KSx0aGlzLm1heERhdGU9dGhpcy5vcHRzLm1heERhdGU/dGhpcy5vcHRzLm1heERhdGU6bmV3IERhdGUoODYzOTk5OTkxMzZlNSl9LF9iaW5kRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy4kZWwub24odGhpcy5vcHRzLnNob3dFdmVudCtcIi5hZHBcIix0aGlzLl9vblNob3dFdmVudC5iaW5kKHRoaXMpKSx0aGlzLiRlbC5vbihcIm1vdXNldXAuYWRwXCIsdGhpcy5fb25Nb3VzZVVwRWwuYmluZCh0aGlzKSksdGhpcy4kZWwub24oXCJibHVyLmFkcFwiLHRoaXMuX29uQmx1ci5iaW5kKHRoaXMpKSx0aGlzLiRlbC5vbihcImtleXVwLmFkcFwiLHRoaXMuX29uS2V5VXBHZW5lcmFsLmJpbmQodGhpcykpLGUodCkub24oXCJyZXNpemUuYWRwXCIsdGhpcy5fb25SZXNpemUuYmluZCh0aGlzKSksZShcImJvZHlcIikub24oXCJtb3VzZXVwLmFkcFwiLHRoaXMuX29uTW91c2VVcEJvZHkuYmluZCh0aGlzKSl9LF9iaW5kS2V5Ym9hcmRFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLiRlbC5vbihcImtleWRvd24uYWRwXCIsdGhpcy5fb25LZXlEb3duLmJpbmQodGhpcykpLHRoaXMuJGVsLm9uKFwia2V5dXAuYWRwXCIsdGhpcy5fb25LZXlVcC5iaW5kKHRoaXMpKSx0aGlzLiRlbC5vbihcImhvdEtleS5hZHBcIix0aGlzLl9vbkhvdEtleS5iaW5kKHRoaXMpKX0sX2JpbmRUaW1lcGlja2VyRXZlbnRzOmZ1bmN0aW9uKCl7dGhpcy4kZWwub24oXCJ0aW1lQ2hhbmdlLmFkcFwiLHRoaXMuX29uVGltZUNoYW5nZS5iaW5kKHRoaXMpKX0saXNXZWVrZW5kOmZ1bmN0aW9uKHQpe3JldHVybi0xIT09dGhpcy5vcHRzLndlZWtlbmRzLmluZGV4T2YodCl9LF9kZWZpbmVMb2NhbGU6ZnVuY3Rpb24odCl7XCJzdHJpbmdcIj09dHlwZW9mIHQ/KHRoaXMubG9jPWUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVt0XSx0aGlzLmxvY3x8KGNvbnNvbGUud2FybihcIkNhbid0IGZpbmQgbGFuZ3VhZ2UgXFxcIlwiK3QrJ1wiIGluIERhdGVwaWNrZXIubGFuZ3VhZ2UsIHdpbGwgdXNlIFwicnVcIiBpbnN0ZWFkJyksdGhpcy5sb2M9ZS5leHRlbmQoITAse30sZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1KSksdGhpcy5sb2M9ZS5leHRlbmQoITAse30sZS5mbi5kYXRlcGlja2VyLmxhbmd1YWdlLnJ1LGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVt0XSkpOnRoaXMubG9jPWUuZXh0ZW5kKCEwLHt9LGUuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZS5ydSx0KSx0aGlzLm9wdHMuZGF0ZUZvcm1hdCYmKHRoaXMubG9jLmRhdGVGb3JtYXQ9dGhpcy5vcHRzLmRhdGVGb3JtYXQpLHRoaXMub3B0cy50aW1lRm9ybWF0JiYodGhpcy5sb2MudGltZUZvcm1hdD10aGlzLm9wdHMudGltZUZvcm1hdCksXCJcIiE9PXRoaXMub3B0cy5maXJzdERheSYmKHRoaXMubG9jLmZpcnN0RGF5PXRoaXMub3B0cy5maXJzdERheSksdGhpcy5vcHRzLnRpbWVwaWNrZXImJih0aGlzLmxvYy5kYXRlRm9ybWF0PVt0aGlzLmxvYy5kYXRlRm9ybWF0LHRoaXMubG9jLnRpbWVGb3JtYXRdLmpvaW4odGhpcy5vcHRzLmRhdGVUaW1lU2VwYXJhdG9yKSksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyJiYodGhpcy5sb2MuZGF0ZUZvcm1hdD10aGlzLmxvYy50aW1lRm9ybWF0KTt2YXIgaT10aGlzLl9nZXRXb3JkQm91bmRhcnlSZWdFeHA7KHRoaXMubG9jLnRpbWVGb3JtYXQubWF0Y2goaShcImFhXCIpKXx8dGhpcy5sb2MudGltZUZvcm1hdC5tYXRjaChpKFwiQUFcIikpKSYmKHRoaXMuYW1wbT0hMCl9LF9idWlsZERhdGVwaWNrZXJzQ29udGFpbmVyOmZ1bmN0aW9uKCl7Yz0hMCxzLmFwcGVuZCgnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJzLWNvbnRhaW5lclwiIGlkPVwiZGF0ZXBpY2tlcnMtY29udGFpbmVyXCI+PC9kaXY+JyksYT1lKFwiI2RhdGVwaWNrZXJzLWNvbnRhaW5lclwiKX0sX2J1aWxkQmFzZUh0bWw6ZnVuY3Rpb24oKXt2YXIgdCxpPWUoJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWlubGluZVwiPicpO3Q9XCJJTlBVVFwiPT10aGlzLmVsLm5vZGVOYW1lP3RoaXMub3B0cy5pbmxpbmU/aS5pbnNlcnRBZnRlcih0aGlzLiRlbCk6YTppLmFwcGVuZFRvKHRoaXMuJGVsKSx0aGlzLiRkYXRlcGlja2VyPWUoZCkuYXBwZW5kVG8odCksdGhpcy4kY29udGVudD1lKFwiLmRhdGVwaWNrZXItLWNvbnRlbnRcIix0aGlzLiRkYXRlcGlja2VyKSx0aGlzLiRuYXY9ZShcIi5kYXRlcGlja2VyLS1uYXZcIix0aGlzLiRkYXRlcGlja2VyKX0sX3RyaWdnZXJPbkNoYW5nZTpmdW5jdGlvbigpe2lmKCF0aGlzLnNlbGVjdGVkRGF0ZXMubGVuZ3RoKXtpZihcIlwiPT09dGhpcy5fcHJldk9uU2VsZWN0VmFsdWUpcmV0dXJuO3JldHVybiB0aGlzLl9wcmV2T25TZWxlY3RWYWx1ZT1cIlwiLHRoaXMub3B0cy5vblNlbGVjdChcIlwiLFwiXCIsdGhpcyl9dmFyIHQsZT10aGlzLnNlbGVjdGVkRGF0ZXMsaT1uLmdldFBhcnNlZERhdGUoZVswXSkscz10aGlzLGE9bmV3IERhdGUoaS55ZWFyLGkubW9udGgsaS5kYXRlLGkuaG91cnMsaS5taW51dGVzKTt0PWUubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBzLmZvcm1hdERhdGUocy5sb2MuZGF0ZUZvcm1hdCx0KX0pLmpvaW4odGhpcy5vcHRzLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpLCh0aGlzLm9wdHMubXVsdGlwbGVEYXRlc3x8dGhpcy5vcHRzLnJhbmdlKSYmKGE9ZS5tYXAoZnVuY3Rpb24odCl7dmFyIGU9bi5nZXRQYXJzZWREYXRlKHQpO3JldHVybiBuZXcgRGF0ZShlLnllYXIsZS5tb250aCxlLmRhdGUsZS5ob3VycyxlLm1pbnV0ZXMpfSkpLHRoaXMuX3ByZXZPblNlbGVjdFZhbHVlPXQsdGhpcy5vcHRzLm9uU2VsZWN0KHQsYSx0aGlzKX0sbmV4dDpmdW5jdGlvbigpe3ZhciB0PXRoaXMucGFyc2VkRGF0ZSxlPXRoaXMub3B0cztzd2l0Y2godGhpcy52aWV3KXtjYXNlXCJkYXlzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhcix0Lm1vbnRoKzEsMSksZS5vbkNoYW5nZU1vbnRoJiZlLm9uQ2hhbmdlTW9udGgodGhpcy5wYXJzZWREYXRlLm1vbnRoLHRoaXMucGFyc2VkRGF0ZS55ZWFyKTticmVhaztjYXNlXCJtb250aHNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyKzEsdC5tb250aCwxKSxlLm9uQ2hhbmdlWWVhciYmZS5vbkNoYW5nZVllYXIodGhpcy5wYXJzZWREYXRlLnllYXIpO2JyZWFrO2Nhc2VcInllYXJzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhcisxMCwwLDEpLGUub25DaGFuZ2VEZWNhZGUmJmUub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpfX0scHJldjpmdW5jdGlvbigpe3ZhciB0PXRoaXMucGFyc2VkRGF0ZSxlPXRoaXMub3B0cztzd2l0Y2godGhpcy52aWV3KXtjYXNlXCJkYXlzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhcix0Lm1vbnRoLTEsMSksZS5vbkNoYW5nZU1vbnRoJiZlLm9uQ2hhbmdlTW9udGgodGhpcy5wYXJzZWREYXRlLm1vbnRoLHRoaXMucGFyc2VkRGF0ZS55ZWFyKTticmVhaztjYXNlXCJtb250aHNcIjp0aGlzLmRhdGU9bmV3IERhdGUodC55ZWFyLTEsdC5tb250aCwxKSxlLm9uQ2hhbmdlWWVhciYmZS5vbkNoYW5nZVllYXIodGhpcy5wYXJzZWREYXRlLnllYXIpO2JyZWFrO2Nhc2VcInllYXJzXCI6dGhpcy5kYXRlPW5ldyBEYXRlKHQueWVhci0xMCwwLDEpLGUub25DaGFuZ2VEZWNhZGUmJmUub25DaGFuZ2VEZWNhZGUodGhpcy5jdXJEZWNhZGUpfX0sZm9ybWF0RGF0ZTpmdW5jdGlvbih0LGUpe2U9ZXx8dGhpcy5kYXRlO3ZhciBpLHM9dCxhPXRoaXMuX2dldFdvcmRCb3VuZGFyeVJlZ0V4cCxoPXRoaXMubG9jLG89bi5nZXRMZWFkaW5nWmVyb051bSxyPW4uZ2V0RGVjYWRlKGUpLGM9bi5nZXRQYXJzZWREYXRlKGUpLGQ9Yy5mdWxsSG91cnMsbD1jLmhvdXJzLHU9dC5tYXRjaChhKFwiYWFcIikpfHx0Lm1hdGNoKGEoXCJBQVwiKSksbT1cImFtXCIscD10aGlzLl9yZXBsYWNlcjtzd2l0Y2godGhpcy5vcHRzLnRpbWVwaWNrZXImJnRoaXMudGltZXBpY2tlciYmdSYmKGk9dGhpcy50aW1lcGlja2VyLl9nZXRWYWxpZEhvdXJzRnJvbURhdGUoZSx1KSxkPW8oaS5ob3VycyksbD1pLmhvdXJzLG09aS5kYXlQZXJpb2QpLCEwKXtjYXNlL0AvLnRlc3Qocyk6cz1zLnJlcGxhY2UoL0AvLGUuZ2V0VGltZSgpKTtjYXNlL2FhLy50ZXN0KHMpOnM9cChzLGEoXCJhYVwiKSxtKTtjYXNlL0FBLy50ZXN0KHMpOnM9cChzLGEoXCJBQVwiKSxtLnRvVXBwZXJDYXNlKCkpO2Nhc2UvZGQvLnRlc3Qocyk6cz1wKHMsYShcImRkXCIpLGMuZnVsbERhdGUpO2Nhc2UvZC8udGVzdChzKTpzPXAocyxhKFwiZFwiKSxjLmRhdGUpO2Nhc2UvREQvLnRlc3Qocyk6cz1wKHMsYShcIkREXCIpLGguZGF5c1tjLmRheV0pO2Nhc2UvRC8udGVzdChzKTpzPXAocyxhKFwiRFwiKSxoLmRheXNTaG9ydFtjLmRheV0pO2Nhc2UvbW0vLnRlc3Qocyk6cz1wKHMsYShcIm1tXCIpLGMuZnVsbE1vbnRoKTtjYXNlL20vLnRlc3Qocyk6cz1wKHMsYShcIm1cIiksYy5tb250aCsxKTtjYXNlL01NLy50ZXN0KHMpOnM9cChzLGEoXCJNTVwiKSx0aGlzLmxvYy5tb250aHNbYy5tb250aF0pO2Nhc2UvTS8udGVzdChzKTpzPXAocyxhKFwiTVwiKSxoLm1vbnRoc1Nob3J0W2MubW9udGhdKTtjYXNlL2lpLy50ZXN0KHMpOnM9cChzLGEoXCJpaVwiKSxjLmZ1bGxNaW51dGVzKTtjYXNlL2kvLnRlc3Qocyk6cz1wKHMsYShcImlcIiksYy5taW51dGVzKTtjYXNlL2hoLy50ZXN0KHMpOnM9cChzLGEoXCJoaFwiKSxkKTtjYXNlL2gvLnRlc3Qocyk6cz1wKHMsYShcImhcIiksbCk7Y2FzZS95eXl5Ly50ZXN0KHMpOnM9cChzLGEoXCJ5eXl5XCIpLGMueWVhcik7Y2FzZS95eXl5MS8udGVzdChzKTpzPXAocyxhKFwieXl5eTFcIiksclswXSk7Y2FzZS95eXl5Mi8udGVzdChzKTpzPXAocyxhKFwieXl5eTJcIiksclsxXSk7Y2FzZS95eS8udGVzdChzKTpzPXAocyxhKFwieXlcIiksYy55ZWFyLnRvU3RyaW5nKCkuc2xpY2UoLTIpKX1yZXR1cm4gc30sX3JlcGxhY2VyOmZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gdC5yZXBsYWNlKGUsZnVuY3Rpb24odCxlLHMsYSl7cmV0dXJuIGUraSthfSl9LF9nZXRXb3JkQm91bmRhcnlSZWdFeHA6ZnVuY3Rpb24odCl7dmFyIGU9XCJcXFxcc3xcXFxcLnwtfC98XFxcXFxcXFx8LHxcXFxcJHxcXFxcIXxcXFxcP3w6fDtcIjtyZXR1cm4gbmV3IFJlZ0V4cChcIihefD58XCIrZStcIikoXCIrdCtcIikoJHw8fFwiK2UrXCIpXCIsXCJnXCIpfSxzZWxlY3REYXRlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsaT1lLm9wdHMscz1lLnBhcnNlZERhdGUsYT1lLnNlbGVjdGVkRGF0ZXMsaD1hLmxlbmd0aCxvPVwiXCI7aWYoQXJyYXkuaXNBcnJheSh0KSlyZXR1cm4gdm9pZCB0LmZvckVhY2goZnVuY3Rpb24odCl7ZS5zZWxlY3REYXRlKHQpfSk7aWYodCBpbnN0YW5jZW9mIERhdGUpe2lmKHRoaXMubGFzdFNlbGVjdGVkRGF0ZT10LHRoaXMudGltZXBpY2tlciYmdGhpcy50aW1lcGlja2VyLl9zZXRUaW1lKHQpLGUuX3RyaWdnZXIoXCJzZWxlY3REYXRlXCIsdCksdGhpcy50aW1lcGlja2VyJiYodC5zZXRIb3Vycyh0aGlzLnRpbWVwaWNrZXIuaG91cnMpLHQuc2V0TWludXRlcyh0aGlzLnRpbWVwaWNrZXIubWludXRlcykpLFwiZGF5c1wiPT1lLnZpZXcmJnQuZ2V0TW9udGgoKSE9cy5tb250aCYmaS5tb3ZlVG9PdGhlck1vbnRoc09uU2VsZWN0JiYobz1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpKSxcInllYXJzXCI9PWUudmlldyYmdC5nZXRGdWxsWWVhcigpIT1zLnllYXImJmkubW92ZVRvT3RoZXJZZWFyc09uU2VsZWN0JiYobz1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksMCwxKSksbyYmKGUuc2lsZW50PSEwLGUuZGF0ZT1vLGUuc2lsZW50PSExLGUubmF2Ll9yZW5kZXIoKSksaS5tdWx0aXBsZURhdGVzJiYhaS5yYW5nZSl7aWYoaD09PWkubXVsdGlwbGVEYXRlcylyZXR1cm47ZS5faXNTZWxlY3RlZCh0KXx8ZS5zZWxlY3RlZERhdGVzLnB1c2godCl9ZWxzZSBpLnJhbmdlPzI9PWg/KGUuc2VsZWN0ZWREYXRlcz1bdF0sZS5taW5SYW5nZT10LGUubWF4UmFuZ2U9XCJcIik6MT09aD8oZS5zZWxlY3RlZERhdGVzLnB1c2godCksZS5tYXhSYW5nZT9lLm1pblJhbmdlPXQ6ZS5tYXhSYW5nZT10LG4uYmlnZ2VyKGUubWF4UmFuZ2UsZS5taW5SYW5nZSkmJihlLm1heFJhbmdlPWUubWluUmFuZ2UsZS5taW5SYW5nZT10KSxlLnNlbGVjdGVkRGF0ZXM9W2UubWluUmFuZ2UsZS5tYXhSYW5nZV0pOihlLnNlbGVjdGVkRGF0ZXM9W3RdLGUubWluUmFuZ2U9dCk6ZS5zZWxlY3RlZERhdGVzPVt0XTtlLl9zZXRJbnB1dFZhbHVlKCksaS5vblNlbGVjdCYmZS5fdHJpZ2dlck9uQ2hhbmdlKCksaS5hdXRvQ2xvc2UmJiF0aGlzLnRpbWVwaWNrZXJJc0FjdGl2ZSYmKGkubXVsdGlwbGVEYXRlc3x8aS5yYW5nZT9pLnJhbmdlJiYyPT1lLnNlbGVjdGVkRGF0ZXMubGVuZ3RoJiZlLmhpZGUoKTplLmhpZGUoKSksZS52aWV3c1t0aGlzLmN1cnJlbnRWaWV3XS5fcmVuZGVyKCl9fSxyZW1vdmVEYXRlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuc2VsZWN0ZWREYXRlcyxpPXRoaXM7aWYodCBpbnN0YW5jZW9mIERhdGUpcmV0dXJuIGUuc29tZShmdW5jdGlvbihzLGEpe3JldHVybiBuLmlzU2FtZShzLHQpPyhlLnNwbGljZShhLDEpLGkuc2VsZWN0ZWREYXRlcy5sZW5ndGg/aS5sYXN0U2VsZWN0ZWREYXRlPWkuc2VsZWN0ZWREYXRlc1tpLnNlbGVjdGVkRGF0ZXMubGVuZ3RoLTFdOihpLm1pblJhbmdlPVwiXCIsaS5tYXhSYW5nZT1cIlwiLGkubGFzdFNlbGVjdGVkRGF0ZT1cIlwiKSxpLnZpZXdzW2kuY3VycmVudFZpZXddLl9yZW5kZXIoKSxpLl9zZXRJbnB1dFZhbHVlKCksaS5vcHRzLm9uU2VsZWN0JiZpLl90cmlnZ2VyT25DaGFuZ2UoKSwhMCk6dm9pZCAwfSl9LHRvZGF5OmZ1bmN0aW9uKCl7dGhpcy5zaWxlbnQ9ITAsdGhpcy52aWV3PXRoaXMub3B0cy5taW5WaWV3LHRoaXMuc2lsZW50PSExLHRoaXMuZGF0ZT1uZXcgRGF0ZSx0aGlzLm9wdHMudG9kYXlCdXR0b24gaW5zdGFuY2VvZiBEYXRlJiZ0aGlzLnNlbGVjdERhdGUodGhpcy5vcHRzLnRvZGF5QnV0dG9uKX0sY2xlYXI6ZnVuY3Rpb24oKXt0aGlzLnNlbGVjdGVkRGF0ZXM9W10sdGhpcy5taW5SYW5nZT1cIlwiLHRoaXMubWF4UmFuZ2U9XCJcIix0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLl9yZW5kZXIoKSx0aGlzLl9zZXRJbnB1dFZhbHVlKCksdGhpcy5vcHRzLm9uU2VsZWN0JiZ0aGlzLl90cmlnZ2VyT25DaGFuZ2UoKX0sdXBkYXRlOmZ1bmN0aW9uKHQsaSl7dmFyIHM9YXJndW1lbnRzLmxlbmd0aCxhPXRoaXMubGFzdFNlbGVjdGVkRGF0ZTtyZXR1cm4gMj09cz90aGlzLm9wdHNbdF09aToxPT1zJiZcIm9iamVjdFwiPT10eXBlb2YgdCYmKHRoaXMub3B0cz1lLmV4dGVuZCghMCx0aGlzLm9wdHMsdCkpLHRoaXMuX2NyZWF0ZVNob3J0Q3V0cygpLHRoaXMuX3N5bmNXaXRoTWluTWF4RGF0ZXMoKSx0aGlzLl9kZWZpbmVMb2NhbGUodGhpcy5vcHRzLmxhbmd1YWdlKSx0aGlzLm5hdi5fYWRkQnV0dG9uc0lmTmVlZCgpLHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcnx8dGhpcy5uYXYuX3JlbmRlcigpLHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3JlbmRlcigpLHRoaXMuZWxJc0lucHV0JiYhdGhpcy5vcHRzLmlubGluZSYmKHRoaXMuX3NldFBvc2l0aW9uQ2xhc3Nlcyh0aGlzLm9wdHMucG9zaXRpb24pLHRoaXMudmlzaWJsZSYmdGhpcy5zZXRQb3NpdGlvbih0aGlzLm9wdHMucG9zaXRpb24pKSx0aGlzLm9wdHMuY2xhc3NlcyYmdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdHMuY2xhc3NlcyksdGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyJiZ0aGlzLiRkYXRlcGlja2VyLmFkZENsYXNzKFwiLW9ubHktdGltZXBpY2tlci1cIiksdGhpcy5vcHRzLnRpbWVwaWNrZXImJihhJiZ0aGlzLnRpbWVwaWNrZXIuX2hhbmRsZURhdGUoYSksdGhpcy50aW1lcGlja2VyLl91cGRhdGVSYW5nZXMoKSx0aGlzLnRpbWVwaWNrZXIuX3VwZGF0ZUN1cnJlbnRUaW1lKCksYSYmKGEuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKSxhLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpKSksdGhpcy5fc2V0SW5wdXRWYWx1ZSgpLHRoaXN9LF9zeW5jV2l0aE1pbk1heERhdGVzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5kYXRlLmdldFRpbWUoKTt0aGlzLnNpbGVudD0hMCx0aGlzLm1pblRpbWU+dCYmKHRoaXMuZGF0ZT10aGlzLm1pbkRhdGUpLHRoaXMubWF4VGltZTx0JiYodGhpcy5kYXRlPXRoaXMubWF4RGF0ZSksdGhpcy5zaWxlbnQ9ITF9LF9pc1NlbGVjdGVkOmZ1bmN0aW9uKHQsZSl7dmFyIGk9ITE7cmV0dXJuIHRoaXMuc2VsZWN0ZWREYXRlcy5zb21lKGZ1bmN0aW9uKHMpe3JldHVybiBuLmlzU2FtZShzLHQsZSk/KGk9cywhMCk6dm9pZCAwfSksaX0sX3NldElucHV0VmFsdWU6ZnVuY3Rpb24oKXt2YXIgdCxlPXRoaXMsaT1lLm9wdHMscz1lLmxvYy5kYXRlRm9ybWF0LGE9aS5hbHRGaWVsZERhdGVGb3JtYXQsbj1lLnNlbGVjdGVkRGF0ZXMubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBlLmZvcm1hdERhdGUocyx0KX0pO2kuYWx0RmllbGQmJmUuJGFsdEZpZWxkLmxlbmd0aCYmKHQ9dGhpcy5zZWxlY3RlZERhdGVzLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gZS5mb3JtYXREYXRlKGEsdCl9KSx0PXQuam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvciksdGhpcy4kYWx0RmllbGQudmFsKHQpKSxuPW4uam9pbih0aGlzLm9wdHMubXVsdGlwbGVEYXRlc1NlcGFyYXRvciksdGhpcy4kZWwudmFsKG4pfSxfaXNJblJhbmdlOmZ1bmN0aW9uKHQsZSl7dmFyIGk9dC5nZXRUaW1lKCkscz1uLmdldFBhcnNlZERhdGUodCksYT1uLmdldFBhcnNlZERhdGUodGhpcy5taW5EYXRlKSxoPW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLm1heERhdGUpLG89bmV3IERhdGUocy55ZWFyLHMubW9udGgsYS5kYXRlKS5nZXRUaW1lKCkscj1uZXcgRGF0ZShzLnllYXIscy5tb250aCxoLmRhdGUpLmdldFRpbWUoKSxjPXtkYXk6aT49dGhpcy5taW5UaW1lJiZpPD10aGlzLm1heFRpbWUsbW9udGg6bz49dGhpcy5taW5UaW1lJiZyPD10aGlzLm1heFRpbWUseWVhcjpzLnllYXI+PWEueWVhciYmcy55ZWFyPD1oLnllYXJ9O3JldHVybiBlP2NbZV06Yy5kYXl9LF9nZXREaW1lbnNpb25zOmZ1bmN0aW9uKHQpe3ZhciBlPXQub2Zmc2V0KCk7cmV0dXJue3dpZHRoOnQub3V0ZXJXaWR0aCgpLGhlaWdodDp0Lm91dGVySGVpZ2h0KCksbGVmdDplLmxlZnQsdG9wOmUudG9wfX0sX2dldERhdGVGcm9tQ2VsbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLnBhcnNlZERhdGUscz10LmRhdGEoXCJ5ZWFyXCIpfHxlLnllYXIsYT10LmRhdGEoXCJtb250aFwiKT09aT9lLm1vbnRoOnQuZGF0YShcIm1vbnRoXCIpLG49dC5kYXRhKFwiZGF0ZVwiKXx8MTtyZXR1cm4gbmV3IERhdGUocyxhLG4pfSxfc2V0UG9zaXRpb25DbGFzc2VzOmZ1bmN0aW9uKHQpe3Q9dC5zcGxpdChcIiBcIik7dmFyIGU9dFswXSxpPXRbMV0scz1cImRhdGVwaWNrZXIgLVwiK2UrXCItXCIraStcIi0gLWZyb20tXCIrZStcIi1cIjt0aGlzLnZpc2libGUmJihzKz1cIiBhY3RpdmVcIiksdGhpcy4kZGF0ZXBpY2tlci5yZW1vdmVBdHRyKFwiY2xhc3NcIikuYWRkQ2xhc3Mocyl9LHNldFBvc2l0aW9uOmZ1bmN0aW9uKHQpe3Q9dHx8dGhpcy5vcHRzLnBvc2l0aW9uO3ZhciBlLGkscz10aGlzLl9nZXREaW1lbnNpb25zKHRoaXMuJGVsKSxhPXRoaXMuX2dldERpbWVuc2lvbnModGhpcy4kZGF0ZXBpY2tlciksbj10LnNwbGl0KFwiIFwiKSxoPXRoaXMub3B0cy5vZmZzZXQsbz1uWzBdLHI9blsxXTtzd2l0Y2gobyl7Y2FzZVwidG9wXCI6ZT1zLnRvcC1hLmhlaWdodC1oO2JyZWFrO2Nhc2VcInJpZ2h0XCI6aT1zLmxlZnQrcy53aWR0aCtoO2JyZWFrO2Nhc2VcImJvdHRvbVwiOmU9cy50b3Arcy5oZWlnaHQraDticmVhaztjYXNlXCJsZWZ0XCI6aT1zLmxlZnQtYS53aWR0aC1ofXN3aXRjaChyKXtjYXNlXCJ0b3BcIjplPXMudG9wO2JyZWFrO2Nhc2VcInJpZ2h0XCI6aT1zLmxlZnQrcy53aWR0aC1hLndpZHRoO2JyZWFrO2Nhc2VcImJvdHRvbVwiOmU9cy50b3Arcy5oZWlnaHQtYS5oZWlnaHQ7YnJlYWs7Y2FzZVwibGVmdFwiOmk9cy5sZWZ0O2JyZWFrO2Nhc2VcImNlbnRlclwiOi9sZWZ0fHJpZ2h0Ly50ZXN0KG8pP2U9cy50b3Arcy5oZWlnaHQvMi1hLmhlaWdodC8yOmk9cy5sZWZ0K3Mud2lkdGgvMi1hLndpZHRoLzJ9dGhpcy4kZGF0ZXBpY2tlci5jc3Moe2xlZnQ6aSx0b3A6ZX0pfSxzaG93OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5vcHRzLm9uU2hvdzt0aGlzLnNldFBvc2l0aW9uKHRoaXMub3B0cy5wb3NpdGlvbiksdGhpcy4kZGF0ZXBpY2tlci5hZGRDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLnZpc2libGU9ITAsdCYmdGhpcy5fYmluZFZpc2lvbkV2ZW50cyh0KX0saGlkZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMub3B0cy5vbkhpZGU7dGhpcy4kZGF0ZXBpY2tlci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5jc3Moe2xlZnQ6XCItMTAwMDAwcHhcIn0pLHRoaXMuZm9jdXNlZD1cIlwiLHRoaXMua2V5cz1bXSx0aGlzLmluRm9jdXM9ITEsdGhpcy52aXNpYmxlPSExLHRoaXMuJGVsLmJsdXIoKSx0JiZ0aGlzLl9iaW5kVmlzaW9uRXZlbnRzKHQpfSxkb3duOmZ1bmN0aW9uKHQpe3RoaXMuX2NoYW5nZVZpZXcodCxcImRvd25cIil9LHVwOmZ1bmN0aW9uKHQpe3RoaXMuX2NoYW5nZVZpZXcodCxcInVwXCIpfSxfYmluZFZpc2lvbkV2ZW50czpmdW5jdGlvbih0KXt0aGlzLiRkYXRlcGlja2VyLm9mZihcInRyYW5zaXRpb25lbmQuZHBcIiksdCh0aGlzLCExKSx0aGlzLiRkYXRlcGlja2VyLm9uZShcInRyYW5zaXRpb25lbmQuZHBcIix0LmJpbmQodGhpcyx0aGlzLCEwKSl9LF9jaGFuZ2VWaWV3OmZ1bmN0aW9uKHQsZSl7dD10fHx0aGlzLmZvY3VzZWR8fHRoaXMuZGF0ZTt2YXIgaT1cInVwXCI9PWU/dGhpcy52aWV3SW5kZXgrMTp0aGlzLnZpZXdJbmRleC0xO2k+MiYmKGk9MiksMD5pJiYoaT0wKSx0aGlzLnNpbGVudD0hMCx0aGlzLmRhdGU9bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKSx0aGlzLnNpbGVudD0hMSx0aGlzLnZpZXc9dGhpcy52aWV3SW5kZXhlc1tpXX0sX2hhbmRsZUhvdEtleTpmdW5jdGlvbih0KXt2YXIgZSxpLHMsYT1uLmdldFBhcnNlZERhdGUodGhpcy5fZ2V0Rm9jdXNlZERhdGUoKSksaD10aGlzLm9wdHMsbz0hMSxyPSExLGM9ITEsZD1hLnllYXIsbD1hLm1vbnRoLHU9YS5kYXRlO3N3aXRjaCh0KXtjYXNlXCJjdHJsUmlnaHRcIjpjYXNlXCJjdHJsVXBcIjpsKz0xLG89ITA7YnJlYWs7Y2FzZVwiY3RybExlZnRcIjpjYXNlXCJjdHJsRG93blwiOmwtPTEsbz0hMDticmVhaztjYXNlXCJzaGlmdFJpZ2h0XCI6Y2FzZVwic2hpZnRVcFwiOnI9ITAsZCs9MTticmVhaztjYXNlXCJzaGlmdExlZnRcIjpjYXNlXCJzaGlmdERvd25cIjpyPSEwLGQtPTE7YnJlYWs7Y2FzZVwiYWx0UmlnaHRcIjpjYXNlXCJhbHRVcFwiOmM9ITAsZCs9MTA7YnJlYWs7Y2FzZVwiYWx0TGVmdFwiOmNhc2VcImFsdERvd25cIjpjPSEwLGQtPTEwO2JyZWFrO2Nhc2VcImN0cmxTaGlmdFVwXCI6dGhpcy51cCgpfXM9bi5nZXREYXlzQ291bnQobmV3IERhdGUoZCxsKSksaT1uZXcgRGF0ZShkLGwsdSksdT5zJiYodT1zKSxpLmdldFRpbWUoKTx0aGlzLm1pblRpbWU/aT10aGlzLm1pbkRhdGU6aS5nZXRUaW1lKCk+dGhpcy5tYXhUaW1lJiYoaT10aGlzLm1heERhdGUpLHRoaXMuZm9jdXNlZD1pLGU9bi5nZXRQYXJzZWREYXRlKGkpLG8mJmgub25DaGFuZ2VNb250aCYmaC5vbkNoYW5nZU1vbnRoKGUubW9udGgsZS55ZWFyKSxyJiZoLm9uQ2hhbmdlWWVhciYmaC5vbkNoYW5nZVllYXIoZS55ZWFyKSxjJiZoLm9uQ2hhbmdlRGVjYWRlJiZoLm9uQ2hhbmdlRGVjYWRlKHRoaXMuY3VyRGVjYWRlKX0sX3JlZ2lzdGVyS2V5OmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMua2V5cy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlPT10fSk7ZXx8dGhpcy5rZXlzLnB1c2godCl9LF91blJlZ2lzdGVyS2V5OmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMua2V5cy5pbmRleE9mKHQpO3RoaXMua2V5cy5zcGxpY2UoZSwxKX0sX2lzSG90S2V5UHJlc3NlZDpmdW5jdGlvbigpe3ZhciB0LGU9ITEsaT10aGlzLHM9dGhpcy5rZXlzLnNvcnQoKTtmb3IodmFyIGEgaW4gdSl0PXVbYV0scy5sZW5ndGg9PXQubGVuZ3RoJiZ0LmV2ZXJ5KGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQ9PXNbZV19KSYmKGkuX3RyaWdnZXIoXCJob3RLZXlcIixhKSxlPSEwKTtyZXR1cm4gZX0sX3RyaWdnZXI6ZnVuY3Rpb24odCxlKXt0aGlzLiRlbC50cmlnZ2VyKHQsZSl9LF9mb2N1c05leHRDZWxsOmZ1bmN0aW9uKHQsZSl7ZT1lfHx0aGlzLmNlbGxUeXBlO3ZhciBpPW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLl9nZXRGb2N1c2VkRGF0ZSgpKSxzPWkueWVhcixhPWkubW9udGgsaD1pLmRhdGU7aWYoIXRoaXMuX2lzSG90S2V5UHJlc3NlZCgpKXtzd2l0Y2godCl7Y2FzZSAzNzpcImRheVwiPT1lP2gtPTE6XCJcIixcIm1vbnRoXCI9PWU/YS09MTpcIlwiLFwieWVhclwiPT1lP3MtPTE6XCJcIjticmVhaztjYXNlIDM4OlwiZGF5XCI9PWU/aC09NzpcIlwiLFwibW9udGhcIj09ZT9hLT0zOlwiXCIsXCJ5ZWFyXCI9PWU/cy09NDpcIlwiO2JyZWFrO2Nhc2UgMzk6XCJkYXlcIj09ZT9oKz0xOlwiXCIsXCJtb250aFwiPT1lP2ErPTE6XCJcIixcInllYXJcIj09ZT9zKz0xOlwiXCI7YnJlYWs7Y2FzZSA0MDpcImRheVwiPT1lP2grPTc6XCJcIixcIm1vbnRoXCI9PWU/YSs9MzpcIlwiLFwieWVhclwiPT1lP3MrPTQ6XCJcIn12YXIgbz1uZXcgRGF0ZShzLGEsaCk7by5nZXRUaW1lKCk8dGhpcy5taW5UaW1lP289dGhpcy5taW5EYXRlOm8uZ2V0VGltZSgpPnRoaXMubWF4VGltZSYmKG89dGhpcy5tYXhEYXRlKSx0aGlzLmZvY3VzZWQ9b319LF9nZXRGb2N1c2VkRGF0ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMuZm9jdXNlZHx8dGhpcy5zZWxlY3RlZERhdGVzW3RoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgtMV0sZT10aGlzLnBhcnNlZERhdGU7aWYoIXQpc3dpdGNoKHRoaXMudmlldyl7Y2FzZVwiZGF5c1wiOnQ9bmV3IERhdGUoZS55ZWFyLGUubW9udGgsKG5ldyBEYXRlKS5nZXREYXRlKCkpO2JyZWFrO2Nhc2VcIm1vbnRoc1wiOnQ9bmV3IERhdGUoZS55ZWFyLGUubW9udGgsMSk7YnJlYWs7Y2FzZVwieWVhcnNcIjp0PW5ldyBEYXRlKGUueWVhciwwLDEpfXJldHVybiB0fSxfZ2V0Q2VsbDpmdW5jdGlvbih0LGkpe2k9aXx8dGhpcy5jZWxsVHlwZTt2YXIgcyxhPW4uZ2V0UGFyc2VkRGF0ZSh0KSxoPScuZGF0ZXBpY2tlci0tY2VsbFtkYXRhLXllYXI9XCInK2EueWVhcisnXCJdJztzd2l0Y2goaSl7Y2FzZVwibW9udGhcIjpoPSdbZGF0YS1tb250aD1cIicrYS5tb250aCsnXCJdJzticmVhaztjYXNlXCJkYXlcIjpoKz0nW2RhdGEtbW9udGg9XCInK2EubW9udGgrJ1wiXVtkYXRhLWRhdGU9XCInK2EuZGF0ZSsnXCJdJ31yZXR1cm4gcz10aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXddLiRlbC5maW5kKGgpLHMubGVuZ3RoP3M6ZShcIlwiKX0sZGVzdHJveTpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dC4kZWwub2ZmKFwiLmFkcFwiKS5kYXRhKFwiZGF0ZXBpY2tlclwiLFwiXCIpLHQuc2VsZWN0ZWREYXRlcz1bXSx0LmZvY3VzZWQ9XCJcIix0LnZpZXdzPXt9LHQua2V5cz1bXSx0Lm1pblJhbmdlPVwiXCIsdC5tYXhSYW5nZT1cIlwiLHQub3B0cy5pbmxpbmV8fCF0LmVsSXNJbnB1dD90LiRkYXRlcGlja2VyLmNsb3Nlc3QoXCIuZGF0ZXBpY2tlci1pbmxpbmVcIikucmVtb3ZlKCk6dC4kZGF0ZXBpY2tlci5yZW1vdmUoKX0sX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzOmZ1bmN0aW9uKHQsZSl7dGhpcy5vcHRzLnJhbmdlP3RoaXMub3B0cy50b2dnbGVTZWxlY3RlZD90aGlzLnJlbW92ZURhdGUoZSk6MiE9dGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCYmdGhpcy5fdHJpZ2dlcihcImNsaWNrQ2VsbFwiLGUpOnRoaXMub3B0cy50b2dnbGVTZWxlY3RlZCYmdGhpcy5yZW1vdmVEYXRlKGUpLHRoaXMub3B0cy50b2dnbGVTZWxlY3RlZHx8KHRoaXMubGFzdFNlbGVjdGVkRGF0ZT10LHRoaXMub3B0cy50aW1lcGlja2VyJiYodGhpcy50aW1lcGlja2VyLl9zZXRUaW1lKHQpLHRoaXMudGltZXBpY2tlci51cGRhdGUoKSkpfSxfb25TaG93RXZlbnQ6ZnVuY3Rpb24odCl7dGhpcy52aXNpYmxlfHx0aGlzLnNob3coKX0sX29uQmx1cjpmdW5jdGlvbigpeyF0aGlzLmluRm9jdXMmJnRoaXMudmlzaWJsZSYmdGhpcy5oaWRlKCl9LF9vbk1vdXNlRG93bkRhdGVwaWNrZXI6ZnVuY3Rpb24odCl7dGhpcy5pbkZvY3VzPSEwfSxfb25Nb3VzZVVwRGF0ZXBpY2tlcjpmdW5jdGlvbih0KXt0aGlzLmluRm9jdXM9ITEsdC5vcmlnaW5hbEV2ZW50LmluRm9jdXM9ITAsdC5vcmlnaW5hbEV2ZW50LnRpbWVwaWNrZXJGb2N1c3x8dGhpcy4kZWwuZm9jdXMoKX0sX29uS2V5VXBHZW5lcmFsOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuJGVsLnZhbCgpO2V8fHRoaXMuY2xlYXIoKX0sX29uUmVzaXplOmZ1bmN0aW9uKCl7dGhpcy52aXNpYmxlJiZ0aGlzLnNldFBvc2l0aW9uKCl9LF9vbk1vdXNlVXBCb2R5OmZ1bmN0aW9uKHQpe3Qub3JpZ2luYWxFdmVudC5pbkZvY3VzfHx0aGlzLnZpc2libGUmJiF0aGlzLmluRm9jdXMmJnRoaXMuaGlkZSgpfSxfb25Nb3VzZVVwRWw6ZnVuY3Rpb24odCl7dC5vcmlnaW5hbEV2ZW50LmluRm9jdXM9ITAsc2V0VGltZW91dCh0aGlzLl9vbktleVVwR2VuZXJhbC5iaW5kKHRoaXMpLDQpfSxfb25LZXlEb3duOmZ1bmN0aW9uKHQpe3ZhciBlPXQud2hpY2g7aWYodGhpcy5fcmVnaXN0ZXJLZXkoZSksZT49MzcmJjQwPj1lJiYodC5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuX2ZvY3VzTmV4dENlbGwoZSkpLDEzPT1lJiZ0aGlzLmZvY3VzZWQpe2lmKHRoaXMuX2dldENlbGwodGhpcy5mb2N1c2VkKS5oYXNDbGFzcyhcIi1kaXNhYmxlZC1cIikpcmV0dXJuO2lmKHRoaXMudmlldyE9dGhpcy5vcHRzLm1pblZpZXcpdGhpcy5kb3duKCk7ZWxzZXt2YXIgaT10aGlzLl9pc1NlbGVjdGVkKHRoaXMuZm9jdXNlZCx0aGlzLmNlbGxUeXBlKTtpZighaSlyZXR1cm4gdGhpcy50aW1lcGlja2VyJiYodGhpcy5mb2N1c2VkLnNldEhvdXJzKHRoaXMudGltZXBpY2tlci5ob3VycyksdGhpcy5mb2N1c2VkLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpKSx2b2lkIHRoaXMuc2VsZWN0RGF0ZSh0aGlzLmZvY3VzZWQpO3RoaXMuX2hhbmRsZUFscmVhZHlTZWxlY3RlZERhdGVzKGksdGhpcy5mb2N1c2VkKX19Mjc9PWUmJnRoaXMuaGlkZSgpfSxfb25LZXlVcDpmdW5jdGlvbih0KXt2YXIgZT10LndoaWNoO3RoaXMuX3VuUmVnaXN0ZXJLZXkoZSl9LF9vbkhvdEtleTpmdW5jdGlvbih0LGUpe3RoaXMuX2hhbmRsZUhvdEtleShlKX0sX29uTW91c2VFbnRlckNlbGw6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuY2xvc2VzdChcIi5kYXRlcGlja2VyLS1jZWxsXCIpLHM9dGhpcy5fZ2V0RGF0ZUZyb21DZWxsKGkpO3RoaXMuc2lsZW50PSEwLHRoaXMuZm9jdXNlZCYmKHRoaXMuZm9jdXNlZD1cIlwiKSxpLmFkZENsYXNzKFwiLWZvY3VzLVwiKSx0aGlzLmZvY3VzZWQ9cyx0aGlzLnNpbGVudD0hMSx0aGlzLm9wdHMucmFuZ2UmJjE9PXRoaXMuc2VsZWN0ZWREYXRlcy5sZW5ndGgmJih0aGlzLm1pblJhbmdlPXRoaXMuc2VsZWN0ZWREYXRlc1swXSx0aGlzLm1heFJhbmdlPVwiXCIsbi5sZXNzKHRoaXMubWluUmFuZ2UsdGhpcy5mb2N1c2VkKSYmKHRoaXMubWF4UmFuZ2U9dGhpcy5taW5SYW5nZSx0aGlzLm1pblJhbmdlPVwiXCIpLHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld10uX3VwZGF0ZSgpKX0sX29uTW91c2VMZWF2ZUNlbGw6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuY2xvc2VzdChcIi5kYXRlcGlja2VyLS1jZWxsXCIpO2kucmVtb3ZlQ2xhc3MoXCItZm9jdXMtXCIpLHRoaXMuc2lsZW50PSEwLHRoaXMuZm9jdXNlZD1cIlwiLHRoaXMuc2lsZW50PSExfSxfb25UaW1lQ2hhbmdlOmZ1bmN0aW9uKHQsZSxpKXt2YXIgcz1uZXcgRGF0ZSxhPXRoaXMuc2VsZWN0ZWREYXRlcyxuPSExO2EubGVuZ3RoJiYobj0hMCxzPXRoaXMubGFzdFNlbGVjdGVkRGF0ZSkscy5zZXRIb3VycyhlKSxzLnNldE1pbnV0ZXMoaSksbnx8dGhpcy5fZ2V0Q2VsbChzKS5oYXNDbGFzcyhcIi1kaXNhYmxlZC1cIik/KHRoaXMuX3NldElucHV0VmFsdWUoKSx0aGlzLm9wdHMub25TZWxlY3QmJnRoaXMuX3RyaWdnZXJPbkNoYW5nZSgpKTp0aGlzLnNlbGVjdERhdGUocyl9LF9vbkNsaWNrQ2VsbDpmdW5jdGlvbih0LGUpe3RoaXMudGltZXBpY2tlciYmKGUuc2V0SG91cnModGhpcy50aW1lcGlja2VyLmhvdXJzKSxlLnNldE1pbnV0ZXModGhpcy50aW1lcGlja2VyLm1pbnV0ZXMpKSx0aGlzLnNlbGVjdERhdGUoZSl9LHNldCBmb2N1c2VkKHQpe2lmKCF0JiZ0aGlzLmZvY3VzZWQpe3ZhciBlPXRoaXMuX2dldENlbGwodGhpcy5mb2N1c2VkKTtlLmxlbmd0aCYmZS5yZW1vdmVDbGFzcyhcIi1mb2N1cy1cIil9dGhpcy5fZm9jdXNlZD10LHRoaXMub3B0cy5yYW5nZSYmMT09dGhpcy5zZWxlY3RlZERhdGVzLmxlbmd0aCYmKHRoaXMubWluUmFuZ2U9dGhpcy5zZWxlY3RlZERhdGVzWzBdLHRoaXMubWF4UmFuZ2U9XCJcIixuLmxlc3ModGhpcy5taW5SYW5nZSx0aGlzLl9mb2N1c2VkKSYmKHRoaXMubWF4UmFuZ2U9dGhpcy5taW5SYW5nZSx0aGlzLm1pblJhbmdlPVwiXCIpKSx0aGlzLnNpbGVudHx8KHRoaXMuZGF0ZT10KX0sZ2V0IGZvY3VzZWQoKXtyZXR1cm4gdGhpcy5fZm9jdXNlZH0sZ2V0IHBhcnNlZERhdGUoKXtyZXR1cm4gbi5nZXRQYXJzZWREYXRlKHRoaXMuZGF0ZSl9LHNldCBkYXRlKHQpe3JldHVybiB0IGluc3RhbmNlb2YgRGF0ZT8odGhpcy5jdXJyZW50RGF0ZT10LHRoaXMuaW5pdGVkJiYhdGhpcy5zaWxlbnQmJih0aGlzLnZpZXdzW3RoaXMudmlld10uX3JlbmRlcigpLHRoaXMubmF2Ll9yZW5kZXIoKSx0aGlzLnZpc2libGUmJnRoaXMuZWxJc0lucHV0JiZ0aGlzLnNldFBvc2l0aW9uKCkpLHQpOnZvaWQgMH0sZ2V0IGRhdGUoKXtyZXR1cm4gdGhpcy5jdXJyZW50RGF0ZX0sc2V0IHZpZXcodCl7cmV0dXJuIHRoaXMudmlld0luZGV4PXRoaXMudmlld0luZGV4ZXMuaW5kZXhPZih0KSx0aGlzLnZpZXdJbmRleDwwP3ZvaWQgMDoodGhpcy5wcmV2Vmlldz10aGlzLmN1cnJlbnRWaWV3LHRoaXMuY3VycmVudFZpZXc9dCx0aGlzLmluaXRlZCYmKHRoaXMudmlld3NbdF0/dGhpcy52aWV3c1t0XS5fcmVuZGVyKCk6dGhpcy52aWV3c1t0XT1uZXcgZS5mbi5kYXRlcGlja2VyLkJvZHkodGhpcyx0LHRoaXMub3B0cyksdGhpcy52aWV3c1t0aGlzLnByZXZWaWV3XS5oaWRlKCksdGhpcy52aWV3c1t0XS5zaG93KCksdGhpcy5uYXYuX3JlbmRlcigpLHRoaXMub3B0cy5vbkNoYW5nZVZpZXcmJnRoaXMub3B0cy5vbkNoYW5nZVZpZXcodCksdGhpcy5lbElzSW5wdXQmJnRoaXMudmlzaWJsZSYmdGhpcy5zZXRQb3NpdGlvbigpKSx0KX0sZ2V0IHZpZXcoKXtyZXR1cm4gdGhpcy5jdXJyZW50Vmlld30sZ2V0IGNlbGxUeXBlKCl7cmV0dXJuIHRoaXMudmlldy5zdWJzdHJpbmcoMCx0aGlzLnZpZXcubGVuZ3RoLTEpfSxnZXQgbWluVGltZSgpe3ZhciB0PW4uZ2V0UGFyc2VkRGF0ZSh0aGlzLm1pbkRhdGUpO3JldHVybiBuZXcgRGF0ZSh0LnllYXIsdC5tb250aCx0LmRhdGUpLmdldFRpbWUoKX0sZ2V0IG1heFRpbWUoKXt2YXIgdD1uLmdldFBhcnNlZERhdGUodGhpcy5tYXhEYXRlKTtyZXR1cm4gbmV3IERhdGUodC55ZWFyLHQubW9udGgsdC5kYXRlKS5nZXRUaW1lKCl9LGdldCBjdXJEZWNhZGUoKXtyZXR1cm4gbi5nZXREZWNhZGUodGhpcy5kYXRlKX19LG4uZ2V0RGF5c0NvdW50PWZ1bmN0aW9uKHQpe3JldHVybiBuZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpKzEsMCkuZ2V0RGF0ZSgpfSxuLmdldFBhcnNlZERhdGU9ZnVuY3Rpb24odCl7cmV0dXJue3llYXI6dC5nZXRGdWxsWWVhcigpLG1vbnRoOnQuZ2V0TW9udGgoKSxmdWxsTW9udGg6dC5nZXRNb250aCgpKzE8MTA/XCIwXCIrKHQuZ2V0TW9udGgoKSsxKTp0LmdldE1vbnRoKCkrMSxkYXRlOnQuZ2V0RGF0ZSgpLGZ1bGxEYXRlOnQuZ2V0RGF0ZSgpPDEwP1wiMFwiK3QuZ2V0RGF0ZSgpOnQuZ2V0RGF0ZSgpLGRheTp0LmdldERheSgpLGhvdXJzOnQuZ2V0SG91cnMoKSxmdWxsSG91cnM6dC5nZXRIb3VycygpPDEwP1wiMFwiK3QuZ2V0SG91cnMoKTp0LmdldEhvdXJzKCksbWludXRlczp0LmdldE1pbnV0ZXMoKSxmdWxsTWludXRlczp0LmdldE1pbnV0ZXMoKTwxMD9cIjBcIit0LmdldE1pbnV0ZXMoKTp0LmdldE1pbnV0ZXMoKX19LG4uZ2V0RGVjYWRlPWZ1bmN0aW9uKHQpe3ZhciBlPTEwKk1hdGguZmxvb3IodC5nZXRGdWxsWWVhcigpLzEwKTtyZXR1cm5bZSxlKzldfSxuLnRlbXBsYXRlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQucmVwbGFjZSgvI1xceyhbXFx3XSspXFx9L2csZnVuY3Rpb24odCxpKXtyZXR1cm4gZVtpXXx8MD09PWVbaV0/ZVtpXTp2b2lkIDB9KX0sbi5pc1NhbWU9ZnVuY3Rpb24odCxlLGkpe2lmKCF0fHwhZSlyZXR1cm4hMTt2YXIgcz1uLmdldFBhcnNlZERhdGUodCksYT1uLmdldFBhcnNlZERhdGUoZSksaD1pP2k6XCJkYXlcIixvPXtkYXk6cy5kYXRlPT1hLmRhdGUmJnMubW9udGg9PWEubW9udGgmJnMueWVhcj09YS55ZWFyLG1vbnRoOnMubW9udGg9PWEubW9udGgmJnMueWVhcj09YS55ZWFyLHllYXI6cy55ZWFyPT1hLnllYXJ9O3JldHVybiBvW2hdfSxuLmxlc3M9ZnVuY3Rpb24odCxlLGkpe3JldHVybiB0JiZlP2UuZ2V0VGltZSgpPHQuZ2V0VGltZSgpOiExfSxuLmJpZ2dlcj1mdW5jdGlvbih0LGUsaSl7cmV0dXJuIHQmJmU/ZS5nZXRUaW1lKCk+dC5nZXRUaW1lKCk6ITF9LG4uZ2V0TGVhZGluZ1plcm9OdW09ZnVuY3Rpb24odCl7cmV0dXJuIHBhcnNlSW50KHQpPDEwP1wiMFwiK3Q6dH0sbi5yZXNldFRpbWU9ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIHQ/KHQ9bi5nZXRQYXJzZWREYXRlKHQpLG5ldyBEYXRlKHQueWVhcix0Lm1vbnRoLHQuZGF0ZSkpOnZvaWQgMH0sZS5mbi5kYXRlcGlja2VyPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtpZihlLmRhdGEodGhpcyxvKSl7dmFyIGk9ZS5kYXRhKHRoaXMsbyk7aS5vcHRzPWUuZXh0ZW5kKCEwLGkub3B0cyx0KSxpLnVwZGF0ZSgpfWVsc2UgZS5kYXRhKHRoaXMsbyxuZXcgbSh0aGlzLHQpKX0pfSxlLmZuLmRhdGVwaWNrZXIuQ29uc3RydWN0b3I9bSxlLmZuLmRhdGVwaWNrZXIubGFuZ3VhZ2U9e3J1OntkYXlzOltcItCS0L7RgdC60YDQtdGB0LXQvdGM0LVcIixcItCf0L7QvdC10LTQtdC70YzQvdC40LpcIixcItCS0YLQvtGA0L3QuNC6XCIsXCLQodGA0LXQtNCwXCIsXCLQp9C10YLQstC10YDQs1wiLFwi0J/Rj9GC0L3QuNGG0LBcIixcItCh0YPQsdCx0L7RgtCwXCJdLGRheXNTaG9ydDpbXCLQktC+0YFcIixcItCf0L7QvVwiLFwi0JLRgtC+XCIsXCLQodGA0LVcIixcItCn0LXRglwiLFwi0J/Rj9GCXCIsXCLQodGD0LFcIl0sZGF5c01pbjpbXCLQktGBXCIsXCLQn9C9XCIsXCLQktGCXCIsXCLQodGAXCIsXCLQp9GCXCIsXCLQn9GCXCIsXCLQodCxXCJdLG1vbnRoczpbXCLQr9C90LLQsNGA0YxcIixcItCk0LXQstGA0LDQu9GMXCIsXCLQnNCw0YDRglwiLFwi0JDQv9GA0LXQu9GMXCIsXCLQnNCw0LlcIixcItCY0Y7QvdGMXCIsXCLQmNGO0LvRjFwiLFwi0JDQstCz0YPRgdGCXCIsXCLQodC10L3RgtGP0LHRgNGMXCIsXCLQntC60YLRj9Cx0YDRjFwiLFwi0J3QvtGP0LHRgNGMXCIsXCLQlNC10LrQsNCx0YDRjFwiXSxtb250aHNTaG9ydDpbXCLQr9C90LJcIixcItCk0LXQslwiLFwi0JzQsNGAXCIsXCLQkNC/0YBcIixcItCc0LDQuVwiLFwi0JjRjtC9XCIsXCLQmNGO0LtcIixcItCQ0LLQs1wiLFwi0KHQtdC9XCIsXCLQntC60YJcIixcItCd0L7Rj1wiLFwi0JTQtdC6XCJdLHRvZGF5Olwi0KHQtdCz0L7QtNC90Y9cIixjbGVhcjpcItCe0YfQuNGB0YLQuNGC0YxcIixkYXRlRm9ybWF0OlwiZGQubW0ueXl5eVwiLHRpbWVGb3JtYXQ6XCJoaDppaVwiLGZpcnN0RGF5OjF9fSxlKGZ1bmN0aW9uKCl7ZShyKS5kYXRlcGlja2VyKCl9KX0oKSxmdW5jdGlvbigpe3ZhciB0PXtkYXlzOic8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tZGF5cyBkYXRlcGlja2VyLS1ib2R5XCI+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLWRheXMtbmFtZXNcIj48L2Rpdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMtZGF5c1wiPjwvZGl2PjwvZGl2PicsbW9udGhzOic8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tbW9udGhzIGRhdGVwaWNrZXItLWJvZHlcIj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMtbW9udGhzXCI+PC9kaXY+PC9kaXY+Jyx5ZWFyczonPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXllYXJzIGRhdGVwaWNrZXItLWJvZHlcIj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tY2VsbHMgZGF0ZXBpY2tlci0tY2VsbHMteWVhcnNcIj48L2Rpdj48L2Rpdj4nfSxzPWUuZm4uZGF0ZXBpY2tlcixhPXMuQ29uc3RydWN0b3I7cy5Cb2R5PWZ1bmN0aW9uKHQsaSxzKXt0aGlzLmQ9dCx0aGlzLnR5cGU9aSx0aGlzLm9wdHM9cyx0aGlzLiRlbD1lKFwiXCIpLHRoaXMub3B0cy5vbmx5VGltZXBpY2tlcnx8dGhpcy5pbml0KCl9LHMuQm9keS5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt0aGlzLl9idWlsZEJhc2VIdG1sKCksdGhpcy5fcmVuZGVyKCksdGhpcy5fYmluZEV2ZW50cygpfSxfYmluZEV2ZW50czpmdW5jdGlvbigpe3RoaXMuJGVsLm9uKFwiY2xpY2tcIixcIi5kYXRlcGlja2VyLS1jZWxsXCIsZS5wcm94eSh0aGlzLl9vbkNsaWNrQ2VsbCx0aGlzKSl9LF9idWlsZEJhc2VIdG1sOmZ1bmN0aW9uKCl7dGhpcy4kZWw9ZSh0W3RoaXMudHlwZV0pLmFwcGVuZFRvKHRoaXMuZC4kY29udGVudCksdGhpcy4kbmFtZXM9ZShcIi5kYXRlcGlja2VyLS1kYXlzLW5hbWVzXCIsdGhpcy4kZWwpLHRoaXMuJGNlbGxzPWUoXCIuZGF0ZXBpY2tlci0tY2VsbHNcIix0aGlzLiRlbCl9LF9nZXREYXlOYW1lc0h0bWw6ZnVuY3Rpb24odCxlLHMsYSl7cmV0dXJuIGU9ZSE9aT9lOnQscz1zP3M6XCJcIixhPWEhPWk/YTowLGE+Nz9zOjc9PWU/dGhpcy5fZ2V0RGF5TmFtZXNIdG1sKHQsMCxzLCsrYSk6KHMrPSc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tZGF5LW5hbWUnKyh0aGlzLmQuaXNXZWVrZW5kKGUpP1wiIC13ZWVrZW5kLVwiOlwiXCIpKydcIj4nK3RoaXMuZC5sb2MuZGF5c01pbltlXStcIjwvZGl2PlwiLHRoaXMuX2dldERheU5hbWVzSHRtbCh0LCsrZSxzLCsrYSkpfSxfZ2V0Q2VsbENvbnRlbnRzOmZ1bmN0aW9uKHQsZSl7dmFyIGk9XCJkYXRlcGlja2VyLS1jZWxsIGRhdGVwaWNrZXItLWNlbGwtXCIrZSxzPW5ldyBEYXRlLG49dGhpcy5kLGg9YS5yZXNldFRpbWUobi5taW5SYW5nZSksbz1hLnJlc2V0VGltZShuLm1heFJhbmdlKSxyPW4ub3B0cyxjPWEuZ2V0UGFyc2VkRGF0ZSh0KSxkPXt9LGw9Yy5kYXRlO3N3aXRjaChlKXtjYXNlXCJkYXlcIjpuLmlzV2Vla2VuZChjLmRheSkmJihpKz1cIiAtd2Vla2VuZC1cIiksYy5tb250aCE9dGhpcy5kLnBhcnNlZERhdGUubW9udGgmJihpKz1cIiAtb3RoZXItbW9udGgtXCIsci5zZWxlY3RPdGhlck1vbnRoc3x8KGkrPVwiIC1kaXNhYmxlZC1cIiksci5zaG93T3RoZXJNb250aHN8fChsPVwiXCIpKTticmVhaztjYXNlXCJtb250aFwiOmw9bi5sb2Nbbi5vcHRzLm1vbnRoc0ZpZWxkXVtjLm1vbnRoXTticmVhaztjYXNlXCJ5ZWFyXCI6dmFyIHU9bi5jdXJEZWNhZGU7bD1jLnllYXIsKGMueWVhcjx1WzBdfHxjLnllYXI+dVsxXSkmJihpKz1cIiAtb3RoZXItZGVjYWRlLVwiLHIuc2VsZWN0T3RoZXJZZWFyc3x8KGkrPVwiIC1kaXNhYmxlZC1cIiksci5zaG93T3RoZXJZZWFyc3x8KGw9XCJcIikpfXJldHVybiByLm9uUmVuZGVyQ2VsbCYmKGQ9ci5vblJlbmRlckNlbGwodCxlKXx8e30sbD1kLmh0bWw/ZC5odG1sOmwsaSs9ZC5jbGFzc2VzP1wiIFwiK2QuY2xhc3NlczpcIlwiKSxyLnJhbmdlJiYoYS5pc1NhbWUoaCx0LGUpJiYoaSs9XCIgLXJhbmdlLWZyb20tXCIpLGEuaXNTYW1lKG8sdCxlKSYmKGkrPVwiIC1yYW5nZS10by1cIiksMT09bi5zZWxlY3RlZERhdGVzLmxlbmd0aCYmbi5mb2N1c2VkPygoYS5iaWdnZXIoaCx0KSYmYS5sZXNzKG4uZm9jdXNlZCx0KXx8YS5sZXNzKG8sdCkmJmEuYmlnZ2VyKG4uZm9jdXNlZCx0KSkmJihpKz1cIiAtaW4tcmFuZ2UtXCIpLGEubGVzcyhvLHQpJiZhLmlzU2FtZShuLmZvY3VzZWQsdCkmJihpKz1cIiAtcmFuZ2UtZnJvbS1cIiksYS5iaWdnZXIoaCx0KSYmYS5pc1NhbWUobi5mb2N1c2VkLHQpJiYoaSs9XCIgLXJhbmdlLXRvLVwiKSk6Mj09bi5zZWxlY3RlZERhdGVzLmxlbmd0aCYmYS5iaWdnZXIoaCx0KSYmYS5sZXNzKG8sdCkmJihpKz1cIiAtaW4tcmFuZ2UtXCIpKSxhLmlzU2FtZShzLHQsZSkmJihpKz1cIiAtY3VycmVudC1cIiksbi5mb2N1c2VkJiZhLmlzU2FtZSh0LG4uZm9jdXNlZCxlKSYmKGkrPVwiIC1mb2N1cy1cIiksbi5faXNTZWxlY3RlZCh0LGUpJiYoaSs9XCIgLXNlbGVjdGVkLVwiKSwoIW4uX2lzSW5SYW5nZSh0LGUpfHxkLmRpc2FibGVkKSYmKGkrPVwiIC1kaXNhYmxlZC1cIikse2h0bWw6bCxjbGFzc2VzOml9fSxfZ2V0RGF5c0h0bWw6ZnVuY3Rpb24odCl7dmFyIGU9YS5nZXREYXlzQ291bnQodCksaT1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLmdldERheSgpLHM9bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSxlKS5nZXREYXkoKSxuPWktdGhpcy5kLmxvYy5maXJzdERheSxoPTYtcyt0aGlzLmQubG9jLmZpcnN0RGF5O249MD5uP24rNzpuLGg9aD42P2gtNzpoO2Zvcih2YXIgbyxyLGM9LW4rMSxkPVwiXCIsbD1jLHU9ZStoO3U+PWw7bCsrKXI9dC5nZXRGdWxsWWVhcigpLG89dC5nZXRNb250aCgpLGQrPXRoaXMuX2dldERheUh0bWwobmV3IERhdGUocixvLGwpKTtyZXR1cm4gZH0sX2dldERheUh0bWw6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fZ2V0Q2VsbENvbnRlbnRzKHQsXCJkYXlcIik7cmV0dXJuJzxkaXYgY2xhc3M9XCInK2UuY2xhc3NlcysnXCIgZGF0YS1kYXRlPVwiJyt0LmdldERhdGUoKSsnXCIgZGF0YS1tb250aD1cIicrdC5nZXRNb250aCgpKydcIiBkYXRhLXllYXI9XCInK3QuZ2V0RnVsbFllYXIoKSsnXCI+JytlLmh0bWwrXCI8L2Rpdj5cIn0sX2dldE1vbnRoc0h0bWw6ZnVuY3Rpb24odCl7Zm9yKHZhciBlPVwiXCIsaT1hLmdldFBhcnNlZERhdGUodCkscz0wOzEyPnM7KWUrPXRoaXMuX2dldE1vbnRoSHRtbChuZXcgRGF0ZShpLnllYXIscykpLHMrKztyZXR1cm4gZX0sX2dldE1vbnRoSHRtbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLl9nZXRDZWxsQ29udGVudHModCxcIm1vbnRoXCIpO3JldHVybic8ZGl2IGNsYXNzPVwiJytlLmNsYXNzZXMrJ1wiIGRhdGEtbW9udGg9XCInK3QuZ2V0TW9udGgoKSsnXCI+JytlLmh0bWwrXCI8L2Rpdj5cIn0sX2dldFllYXJzSHRtbDpmdW5jdGlvbih0KXt2YXIgZT0oYS5nZXRQYXJzZWREYXRlKHQpLGEuZ2V0RGVjYWRlKHQpKSxpPWVbMF0tMSxzPVwiXCIsbj1pO2ZvcihuO248PWVbMV0rMTtuKyspcys9dGhpcy5fZ2V0WWVhckh0bWwobmV3IERhdGUobiwwKSk7cmV0dXJuIHN9LF9nZXRZZWFySHRtbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLl9nZXRDZWxsQ29udGVudHModCxcInllYXJcIik7cmV0dXJuJzxkaXYgY2xhc3M9XCInK2UuY2xhc3NlcysnXCIgZGF0YS15ZWFyPVwiJyt0LmdldEZ1bGxZZWFyKCkrJ1wiPicrZS5odG1sK1wiPC9kaXY+XCJ9LF9yZW5kZXJUeXBlczp7ZGF5czpmdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldERheU5hbWVzSHRtbCh0aGlzLmQubG9jLmZpcnN0RGF5KSxlPXRoaXMuX2dldERheXNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7dGhpcy4kY2VsbHMuaHRtbChlKSx0aGlzLiRuYW1lcy5odG1sKHQpfSxtb250aHM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9nZXRNb250aHNIdG1sKHRoaXMuZC5jdXJyZW50RGF0ZSk7dGhpcy4kY2VsbHMuaHRtbCh0KX0seWVhcnM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9nZXRZZWFyc0h0bWwodGhpcy5kLmN1cnJlbnREYXRlKTt0aGlzLiRjZWxscy5odG1sKHQpfX0sX3JlbmRlcjpmdW5jdGlvbigpe3RoaXMub3B0cy5vbmx5VGltZXBpY2tlcnx8dGhpcy5fcmVuZGVyVHlwZXNbdGhpcy50eXBlXS5iaW5kKHRoaXMpKCl9LF91cGRhdGU6ZnVuY3Rpb24oKXt2YXIgdCxpLHMsYT1lKFwiLmRhdGVwaWNrZXItLWNlbGxcIix0aGlzLiRjZWxscyksbj10aGlzO2EuZWFjaChmdW5jdGlvbihhLGgpe2k9ZSh0aGlzKSxzPW4uZC5fZ2V0RGF0ZUZyb21DZWxsKGUodGhpcykpLHQ9bi5fZ2V0Q2VsbENvbnRlbnRzKHMsbi5kLmNlbGxUeXBlKSxpLmF0dHIoXCJjbGFzc1wiLHQuY2xhc3Nlcyl9KX0sc2hvdzpmdW5jdGlvbigpe3RoaXMub3B0cy5vbmx5VGltZXBpY2tlcnx8KHRoaXMuJGVsLmFkZENsYXNzKFwiYWN0aXZlXCIpLHRoaXMuYWNpdHZlPSEwKX0saGlkZTpmdW5jdGlvbigpe3RoaXMuJGVsLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLHRoaXMuYWN0aXZlPSExfSxfaGFuZGxlQ2xpY2s6ZnVuY3Rpb24odCl7dmFyIGU9dC5kYXRhKFwiZGF0ZVwiKXx8MSxpPXQuZGF0YShcIm1vbnRoXCIpfHwwLHM9dC5kYXRhKFwieWVhclwiKXx8dGhpcy5kLnBhcnNlZERhdGUueWVhcixhPXRoaXMuZDtpZihhLnZpZXchPXRoaXMub3B0cy5taW5WaWV3KXJldHVybiB2b2lkIGEuZG93bihuZXcgRGF0ZShzLGksZSkpO3ZhciBuPW5ldyBEYXRlKHMsaSxlKSxoPXRoaXMuZC5faXNTZWxlY3RlZChuLHRoaXMuZC5jZWxsVHlwZSk7cmV0dXJuIGg/dm9pZCBhLl9oYW5kbGVBbHJlYWR5U2VsZWN0ZWREYXRlcy5iaW5kKGEsaCxuKSgpOnZvaWQgYS5fdHJpZ2dlcihcImNsaWNrQ2VsbFwiLG4pfSxfb25DbGlja0NlbGw6ZnVuY3Rpb24odCl7dmFyIGk9ZSh0LnRhcmdldCkuY2xvc2VzdChcIi5kYXRlcGlja2VyLS1jZWxsXCIpO2kuaGFzQ2xhc3MoXCItZGlzYWJsZWQtXCIpfHx0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpKGkpfX19KCksZnVuY3Rpb24oKXt2YXIgdD0nPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLW5hdi1hY3Rpb25cIiBkYXRhLWFjdGlvbj1cInByZXZcIj4je3ByZXZIdG1sfTwvZGl2PjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtdGl0bGVcIj4je3RpdGxlfTwvZGl2PjxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1uYXYtYWN0aW9uXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+I3tuZXh0SHRtbH08L2Rpdj4nLGk9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS1idXR0b25zXCI+PC9kaXY+JyxzPSc8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLWJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiI3thY3Rpb259XCI+I3tsYWJlbH08L3NwYW4+JyxhPWUuZm4uZGF0ZXBpY2tlcixuPWEuQ29uc3RydWN0b3I7YS5OYXZpZ2F0aW9uPWZ1bmN0aW9uKHQsZSl7dGhpcy5kPXQsdGhpcy5vcHRzPWUsdGhpcy4kYnV0dG9uc0NvbnRhaW5lcj1cIlwiLHRoaXMuaW5pdCgpfSxhLk5hdmlnYXRpb24ucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7dGhpcy5fYnVpbGRCYXNlSHRtbCgpLHRoaXMuX2JpbmRFdmVudHMoKX0sX2JpbmRFdmVudHM6ZnVuY3Rpb24oKXt0aGlzLmQuJG5hdi5vbihcImNsaWNrXCIsXCIuZGF0ZXBpY2tlci0tbmF2LWFjdGlvblwiLGUucHJveHkodGhpcy5fb25DbGlja05hdkJ1dHRvbix0aGlzKSksdGhpcy5kLiRuYXYub24oXCJjbGlja1wiLFwiLmRhdGVwaWNrZXItLW5hdi10aXRsZVwiLGUucHJveHkodGhpcy5fb25DbGlja05hdlRpdGxlLHRoaXMpKSx0aGlzLmQuJGRhdGVwaWNrZXIub24oXCJjbGlja1wiLFwiLmRhdGVwaWNrZXItLWJ1dHRvblwiLGUucHJveHkodGhpcy5fb25DbGlja05hdkJ1dHRvbix0aGlzKSl9LF9idWlsZEJhc2VIdG1sOmZ1bmN0aW9uKCl7dGhpcy5vcHRzLm9ubHlUaW1lcGlja2VyfHx0aGlzLl9yZW5kZXIoKSx0aGlzLl9hZGRCdXR0b25zSWZOZWVkKCl9LF9hZGRCdXR0b25zSWZOZWVkOmZ1bmN0aW9uKCl7dGhpcy5vcHRzLnRvZGF5QnV0dG9uJiZ0aGlzLl9hZGRCdXR0b24oXCJ0b2RheVwiKSx0aGlzLm9wdHMuY2xlYXJCdXR0b24mJnRoaXMuX2FkZEJ1dHRvbihcImNsZWFyXCIpfSxfcmVuZGVyOmZ1bmN0aW9uKCl7dmFyIGk9dGhpcy5fZ2V0VGl0bGUodGhpcy5kLmN1cnJlbnREYXRlKSxzPW4udGVtcGxhdGUodCxlLmV4dGVuZCh7dGl0bGU6aX0sdGhpcy5vcHRzKSk7dGhpcy5kLiRuYXYuaHRtbChzKSxcInllYXJzXCI9PXRoaXMuZC52aWV3JiZlKFwiLmRhdGVwaWNrZXItLW5hdi10aXRsZVwiLHRoaXMuZC4kbmF2KS5hZGRDbGFzcyhcIi1kaXNhYmxlZC1cIiksdGhpcy5zZXROYXZTdGF0dXMoKX0sX2dldFRpdGxlOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmQuZm9ybWF0RGF0ZSh0aGlzLm9wdHMubmF2VGl0bGVzW3RoaXMuZC52aWV3XSx0KX0sX2FkZEJ1dHRvbjpmdW5jdGlvbih0KXt0aGlzLiRidXR0b25zQ29udGFpbmVyLmxlbmd0aHx8dGhpcy5fYWRkQnV0dG9uc0NvbnRhaW5lcigpO3ZhciBpPXthY3Rpb246dCxsYWJlbDp0aGlzLmQubG9jW3RdfSxhPW4udGVtcGxhdGUocyxpKTtlKFwiW2RhdGEtYWN0aW9uPVwiK3QrXCJdXCIsdGhpcy4kYnV0dG9uc0NvbnRhaW5lcikubGVuZ3RofHx0aGlzLiRidXR0b25zQ29udGFpbmVyLmFwcGVuZChhKX0sX2FkZEJ1dHRvbnNDb250YWluZXI6ZnVuY3Rpb24oKXt0aGlzLmQuJGRhdGVwaWNrZXIuYXBwZW5kKGkpLHRoaXMuJGJ1dHRvbnNDb250YWluZXI9ZShcIi5kYXRlcGlja2VyLS1idXR0b25zXCIsdGhpcy5kLiRkYXRlcGlja2VyKX0sc2V0TmF2U3RhdHVzOmZ1bmN0aW9uKCl7aWYoKHRoaXMub3B0cy5taW5EYXRlfHx0aGlzLm9wdHMubWF4RGF0ZSkmJnRoaXMub3B0cy5kaXNhYmxlTmF2V2hlbk91dE9mUmFuZ2Upe3ZhciB0PXRoaXMuZC5wYXJzZWREYXRlLGU9dC5tb250aCxpPXQueWVhcixzPXQuZGF0ZTtzd2l0Y2godGhpcy5kLnZpZXcpe2Nhc2VcImRheXNcIjp0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShpLGUtMSwxKSxcIm1vbnRoXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwicHJldlwiKSx0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShpLGUrMSwxKSxcIm1vbnRoXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwibmV4dFwiKTticmVhaztjYXNlXCJtb250aHNcIjp0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShpLTEsZSxzKSxcInllYXJcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJwcmV2XCIpLHRoaXMuZC5faXNJblJhbmdlKG5ldyBEYXRlKGkrMSxlLHMpLFwieWVhclwiKXx8dGhpcy5fZGlzYWJsZU5hdihcIm5leHRcIik7YnJlYWs7Y2FzZVwieWVhcnNcIjp2YXIgYT1uLmdldERlY2FkZSh0aGlzLmQuZGF0ZSk7dGhpcy5kLl9pc0luUmFuZ2UobmV3IERhdGUoYVswXS0xLDAsMSksXCJ5ZWFyXCIpfHx0aGlzLl9kaXNhYmxlTmF2KFwicHJldlwiKSx0aGlzLmQuX2lzSW5SYW5nZShuZXcgRGF0ZShhWzFdKzEsMCwxKSxcInllYXJcIil8fHRoaXMuX2Rpc2FibGVOYXYoXCJuZXh0XCIpfX19LF9kaXNhYmxlTmF2OmZ1bmN0aW9uKHQpe2UoJ1tkYXRhLWFjdGlvbj1cIicrdCsnXCJdJyx0aGlzLmQuJG5hdikuYWRkQ2xhc3MoXCItZGlzYWJsZWQtXCIpfSxfYWN0aXZhdGVOYXY6ZnVuY3Rpb24odCl7ZSgnW2RhdGEtYWN0aW9uPVwiJyt0KydcIl0nLHRoaXMuZC4kbmF2KS5yZW1vdmVDbGFzcyhcIi1kaXNhYmxlZC1cIil9LF9vbkNsaWNrTmF2QnV0dG9uOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmNsb3Nlc3QoXCJbZGF0YS1hY3Rpb25dXCIpLHM9aS5kYXRhKFwiYWN0aW9uXCIpO3RoaXMuZFtzXSgpfSxfb25DbGlja05hdlRpdGxlOmZ1bmN0aW9uKHQpe3JldHVybiBlKHQudGFyZ2V0KS5oYXNDbGFzcyhcIi1kaXNhYmxlZC1cIik/dm9pZCAwOlwiZGF5c1wiPT10aGlzLmQudmlldz90aGlzLmQudmlldz1cIm1vbnRoc1wiOnZvaWQodGhpcy5kLnZpZXc9XCJ5ZWFyc1wiKX19fSgpLGZ1bmN0aW9uKCl7dmFyIHQ9JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lXCI+PGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudFwiPiAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWhvdXJzXCI+I3tob3VyVmlzaWJsZX08L3NwYW4+ICAgPHNwYW4gY2xhc3M9XCJkYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtY29sb25cIj46PC9zcGFuPiAgIDxzcGFuIGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LW1pbnV0ZXNcIj4je21pblZhbHVlfTwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci0tdGltZS1zbGlkZXJzXCI+ICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtcm93XCI+ICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG5hbWU9XCJob3Vyc1wiIHZhbHVlPVwiI3tob3VyVmFsdWV9XCIgbWluPVwiI3tob3VyTWlufVwiIG1heD1cIiN7aG91ck1heH1cIiBzdGVwPVwiI3tob3VyU3RlcH1cIi8+ICAgPC9kaXY+ICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtcm93XCI+ICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG5hbWU9XCJtaW51dGVzXCIgdmFsdWU9XCIje21pblZhbHVlfVwiIG1pbj1cIiN7bWluTWlufVwiIG1heD1cIiN7bWluTWF4fVwiIHN0ZXA9XCIje21pblN0ZXB9XCIvPiAgIDwvZGl2PjwvZGl2PjwvZGl2PicsaT1lLmZuLmRhdGVwaWNrZXIscz1pLkNvbnN0cnVjdG9yO2kuVGltZXBpY2tlcj1mdW5jdGlvbih0LGUpe3RoaXMuZD10LHRoaXMub3B0cz1lLHRoaXMuaW5pdCgpfSxpLlRpbWVwaWNrZXIucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7dmFyIHQ9XCJpbnB1dFwiO3RoaXMuX3NldFRpbWUodGhpcy5kLmRhdGUpLHRoaXMuX2J1aWxkSFRNTCgpLG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3RyaWRlbnQvZ2kpJiYodD1cImNoYW5nZVwiKSx0aGlzLmQuJGVsLm9uKFwic2VsZWN0RGF0ZVwiLHRoaXMuX29uU2VsZWN0RGF0ZS5iaW5kKHRoaXMpKSx0aGlzLiRyYW5nZXMub24odCx0aGlzLl9vbkNoYW5nZVJhbmdlLmJpbmQodGhpcykpLHRoaXMuJHJhbmdlcy5vbihcIm1vdXNldXBcIix0aGlzLl9vbk1vdXNlVXBSYW5nZS5iaW5kKHRoaXMpKSx0aGlzLiRyYW5nZXMub24oXCJtb3VzZW1vdmUgZm9jdXMgXCIsdGhpcy5fb25Nb3VzZUVudGVyUmFuZ2UuYmluZCh0aGlzKSksdGhpcy4kcmFuZ2VzLm9uKFwibW91c2VvdXQgYmx1clwiLHRoaXMuX29uTW91c2VPdXRSYW5nZS5iaW5kKHRoaXMpKX0sX3NldFRpbWU6ZnVuY3Rpb24odCl7dmFyIGU9cy5nZXRQYXJzZWREYXRlKHQpO3RoaXMuX2hhbmRsZURhdGUodCksdGhpcy5ob3Vycz1lLmhvdXJzPHRoaXMubWluSG91cnM/dGhpcy5taW5Ib3VyczplLmhvdXJzLHRoaXMubWludXRlcz1lLm1pbnV0ZXM8dGhpcy5taW5NaW51dGVzP3RoaXMubWluTWludXRlczplLm1pbnV0ZXN9LF9zZXRNaW5UaW1lRnJvbURhdGU6ZnVuY3Rpb24odCl7dGhpcy5taW5Ib3Vycz10LmdldEhvdXJzKCksdGhpcy5taW5NaW51dGVzPXQuZ2V0TWludXRlcygpLHRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlJiZ0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZS5nZXRIb3VycygpPnQuZ2V0SG91cnMoKSYmKHRoaXMubWluTWludXRlcz10aGlzLm9wdHMubWluTWludXRlcyl9LF9zZXRNYXhUaW1lRnJvbURhdGU6ZnVuY3Rpb24odCl7XG50aGlzLm1heEhvdXJzPXQuZ2V0SG91cnMoKSx0aGlzLm1heE1pbnV0ZXM9dC5nZXRNaW51dGVzKCksdGhpcy5kLmxhc3RTZWxlY3RlZERhdGUmJnRoaXMuZC5sYXN0U2VsZWN0ZWREYXRlLmdldEhvdXJzKCk8dC5nZXRIb3VycygpJiYodGhpcy5tYXhNaW51dGVzPXRoaXMub3B0cy5tYXhNaW51dGVzKX0sX3NldERlZmF1bHRNaW5NYXhUaW1lOmZ1bmN0aW9uKCl7dmFyIHQ9MjMsZT01OSxpPXRoaXMub3B0czt0aGlzLm1pbkhvdXJzPWkubWluSG91cnM8MHx8aS5taW5Ib3Vycz50PzA6aS5taW5Ib3Vycyx0aGlzLm1pbk1pbnV0ZXM9aS5taW5NaW51dGVzPDB8fGkubWluTWludXRlcz5lPzA6aS5taW5NaW51dGVzLHRoaXMubWF4SG91cnM9aS5tYXhIb3VyczwwfHxpLm1heEhvdXJzPnQ/dDppLm1heEhvdXJzLHRoaXMubWF4TWludXRlcz1pLm1heE1pbnV0ZXM8MHx8aS5tYXhNaW51dGVzPmU/ZTppLm1heE1pbnV0ZXN9LF92YWxpZGF0ZUhvdXJzTWludXRlczpmdW5jdGlvbih0KXt0aGlzLmhvdXJzPHRoaXMubWluSG91cnM/dGhpcy5ob3Vycz10aGlzLm1pbkhvdXJzOnRoaXMuaG91cnM+dGhpcy5tYXhIb3VycyYmKHRoaXMuaG91cnM9dGhpcy5tYXhIb3VycyksdGhpcy5taW51dGVzPHRoaXMubWluTWludXRlcz90aGlzLm1pbnV0ZXM9dGhpcy5taW5NaW51dGVzOnRoaXMubWludXRlcz50aGlzLm1heE1pbnV0ZXMmJih0aGlzLm1pbnV0ZXM9dGhpcy5tYXhNaW51dGVzKX0sX2J1aWxkSFRNTDpmdW5jdGlvbigpe3ZhciBpPXMuZ2V0TGVhZGluZ1plcm9OdW0sYT17aG91ck1pbjp0aGlzLm1pbkhvdXJzLGhvdXJNYXg6aSh0aGlzLm1heEhvdXJzKSxob3VyU3RlcDp0aGlzLm9wdHMuaG91cnNTdGVwLGhvdXJWYWx1ZTp0aGlzLmhvdXJzLGhvdXJWaXNpYmxlOmkodGhpcy5kaXNwbGF5SG91cnMpLG1pbk1pbjp0aGlzLm1pbk1pbnV0ZXMsbWluTWF4OmkodGhpcy5tYXhNaW51dGVzKSxtaW5TdGVwOnRoaXMub3B0cy5taW51dGVzU3RlcCxtaW5WYWx1ZTppKHRoaXMubWludXRlcyl9LG49cy50ZW1wbGF0ZSh0LGEpO3RoaXMuJHRpbWVwaWNrZXI9ZShuKS5hcHBlbmRUbyh0aGlzLmQuJGRhdGVwaWNrZXIpLHRoaXMuJHJhbmdlcz1lKCdbdHlwZT1cInJhbmdlXCJdJyx0aGlzLiR0aW1lcGlja2VyKSx0aGlzLiRob3Vycz1lKCdbbmFtZT1cImhvdXJzXCJdJyx0aGlzLiR0aW1lcGlja2VyKSx0aGlzLiRtaW51dGVzPWUoJ1tuYW1lPVwibWludXRlc1wiXScsdGhpcy4kdGltZXBpY2tlciksdGhpcy4kaG91cnNUZXh0PWUoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LWhvdXJzXCIsdGhpcy4kdGltZXBpY2tlciksdGhpcy4kbWludXRlc1RleHQ9ZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnQtbWludXRlc1wiLHRoaXMuJHRpbWVwaWNrZXIpLHRoaXMuZC5hbXBtJiYodGhpcy4kYW1wbT1lKCc8c3BhbiBjbGFzcz1cImRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1hbXBtXCI+JykuYXBwZW5kVG8oZShcIi5kYXRlcGlja2VyLS10aW1lLWN1cnJlbnRcIix0aGlzLiR0aW1lcGlja2VyKSkuaHRtbCh0aGlzLmRheVBlcmlvZCksdGhpcy4kdGltZXBpY2tlci5hZGRDbGFzcyhcIi1hbS1wbS1cIikpfSxfdXBkYXRlQ3VycmVudFRpbWU6ZnVuY3Rpb24oKXt2YXIgdD1zLmdldExlYWRpbmdaZXJvTnVtKHRoaXMuZGlzcGxheUhvdXJzKSxlPXMuZ2V0TGVhZGluZ1plcm9OdW0odGhpcy5taW51dGVzKTt0aGlzLiRob3Vyc1RleHQuaHRtbCh0KSx0aGlzLiRtaW51dGVzVGV4dC5odG1sKGUpLHRoaXMuZC5hbXBtJiZ0aGlzLiRhbXBtLmh0bWwodGhpcy5kYXlQZXJpb2QpfSxfdXBkYXRlUmFuZ2VzOmZ1bmN0aW9uKCl7dGhpcy4kaG91cnMuYXR0cih7bWluOnRoaXMubWluSG91cnMsbWF4OnRoaXMubWF4SG91cnN9KS52YWwodGhpcy5ob3VycyksdGhpcy4kbWludXRlcy5hdHRyKHttaW46dGhpcy5taW5NaW51dGVzLG1heDp0aGlzLm1heE1pbnV0ZXN9KS52YWwodGhpcy5taW51dGVzKX0sX2hhbmRsZURhdGU6ZnVuY3Rpb24odCl7dGhpcy5fc2V0RGVmYXVsdE1pbk1heFRpbWUoKSx0JiYocy5pc1NhbWUodCx0aGlzLmQub3B0cy5taW5EYXRlKT90aGlzLl9zZXRNaW5UaW1lRnJvbURhdGUodGhpcy5kLm9wdHMubWluRGF0ZSk6cy5pc1NhbWUodCx0aGlzLmQub3B0cy5tYXhEYXRlKSYmdGhpcy5fc2V0TWF4VGltZUZyb21EYXRlKHRoaXMuZC5vcHRzLm1heERhdGUpKSx0aGlzLl92YWxpZGF0ZUhvdXJzTWludXRlcyh0KX0sdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5fdXBkYXRlUmFuZ2VzKCksdGhpcy5fdXBkYXRlQ3VycmVudFRpbWUoKX0sX2dldFZhbGlkSG91cnNGcm9tRGF0ZTpmdW5jdGlvbih0LGUpe3ZhciBpPXQsYT10O3QgaW5zdGFuY2VvZiBEYXRlJiYoaT1zLmdldFBhcnNlZERhdGUodCksYT1pLmhvdXJzKTt2YXIgbj1lfHx0aGlzLmQuYW1wbSxoPVwiYW1cIjtpZihuKXN3aXRjaCghMCl7Y2FzZSAwPT1hOmE9MTI7YnJlYWs7Y2FzZSAxMj09YTpoPVwicG1cIjticmVhaztjYXNlIGE+MTE6YS09MTIsaD1cInBtXCJ9cmV0dXJue2hvdXJzOmEsZGF5UGVyaW9kOmh9fSxzZXQgaG91cnModCl7dGhpcy5faG91cnM9dDt2YXIgZT10aGlzLl9nZXRWYWxpZEhvdXJzRnJvbURhdGUodCk7dGhpcy5kaXNwbGF5SG91cnM9ZS5ob3Vycyx0aGlzLmRheVBlcmlvZD1lLmRheVBlcmlvZH0sZ2V0IGhvdXJzKCl7cmV0dXJuIHRoaXMuX2hvdXJzfSxfb25DaGFuZ2VSYW5nZTpmdW5jdGlvbih0KXt2YXIgaT1lKHQudGFyZ2V0KSxzPWkuYXR0cihcIm5hbWVcIik7dGhpcy5kLnRpbWVwaWNrZXJJc0FjdGl2ZT0hMCx0aGlzW3NdPWkudmFsKCksdGhpcy5fdXBkYXRlQ3VycmVudFRpbWUoKSx0aGlzLmQuX3RyaWdnZXIoXCJ0aW1lQ2hhbmdlXCIsW3RoaXMuaG91cnMsdGhpcy5taW51dGVzXSksdGhpcy5faGFuZGxlRGF0ZSh0aGlzLmQubGFzdFNlbGVjdGVkRGF0ZSksdGhpcy51cGRhdGUoKX0sX29uU2VsZWN0RGF0ZTpmdW5jdGlvbih0LGUpe3RoaXMuX2hhbmRsZURhdGUoZSksdGhpcy51cGRhdGUoKX0sX29uTW91c2VFbnRlclJhbmdlOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmF0dHIoXCJuYW1lXCIpO2UoXCIuZGF0ZXBpY2tlci0tdGltZS1jdXJyZW50LVwiK2ksdGhpcy4kdGltZXBpY2tlcikuYWRkQ2xhc3MoXCItZm9jdXMtXCIpfSxfb25Nb3VzZU91dFJhbmdlOmZ1bmN0aW9uKHQpe3ZhciBpPWUodC50YXJnZXQpLmF0dHIoXCJuYW1lXCIpO3RoaXMuZC5pbkZvY3VzfHxlKFwiLmRhdGVwaWNrZXItLXRpbWUtY3VycmVudC1cIitpLHRoaXMuJHRpbWVwaWNrZXIpLnJlbW92ZUNsYXNzKFwiLWZvY3VzLVwiKX0sX29uTW91c2VVcFJhbmdlOmZ1bmN0aW9uKHQpe3RoaXMuZC50aW1lcGlja2VySXNBY3RpdmU9ITF9fX0oKX0od2luZG93LGpRdWVyeSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9kYXRlcGlja2VyLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9kYXRlcGlja2VyLm1pbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI7KGZ1bmN0aW9uICgkKSB7ICQuZm4uZGF0ZXBpY2tlci5sYW5ndWFnZVsnZW4nXSA9IHtcclxuICAgIGRheXM6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcclxuICAgIGRheXNTaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcclxuICAgIGRheXNNaW46IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcclxuICAgIG1vbnRoczogWydKYW51YXJ5JywnRmVicnVhcnknLCdNYXJjaCcsJ0FwcmlsJywnTWF5JywnSnVuZScsICdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcclxuICAgIG1vbnRoc1Nob3J0OiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXHJcbiAgICB0b2RheTogJ1RvZGF5JyxcclxuICAgIGNsZWFyOiAnQ2xlYXInLFxyXG4gICAgZGF0ZUZvcm1hdDogJ21tL2RkL3l5eXknLFxyXG4gICAgdGltZUZvcm1hdDogJ2hoOmlpIGFhJyxcclxuICAgIGZpcnN0RGF5OiAwXHJcbn07IH0pKGpRdWVyeSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYWlyLWRhdGVwaWNrZXIvZGlzdC9qcy9pMThuL2RhdGVwaWNrZXIuZW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Fpci1kYXRlcGlja2VyL2Rpc3QvanMvaTE4bi9kYXRlcGlja2VyLmVuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qISBIYW1tZXIuSlMgLSB2Mi4wLjcgLSAyMDE2LTA0LTIyXG4gKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBKb3JpayBUYW5nZWxkZXI7XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCBleHBvcnROYW1lLCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG52YXIgVkVORE9SX1BSRUZJWEVTID0gWycnLCAnd2Via2l0JywgJ01veicsICdNUycsICdtcycsICdvJ107XG52YXIgVEVTVF9FTEVNRU5UID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbnZhciBUWVBFX0ZVTkNUSU9OID0gJ2Z1bmN0aW9uJztcblxudmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbnZhciBhYnMgPSBNYXRoLmFicztcbnZhciBub3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBzZXQgYSB0aW1lb3V0IHdpdGggYSBnaXZlbiBzY29wZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gc2V0VGltZW91dENvbnRleHQoZm4sIHRpbWVvdXQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChiaW5kRm4oZm4sIGNvbnRleHQpLCB0aW1lb3V0KTtcbn1cblxuLyoqXG4gKiBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXksIHdlIHdhbnQgdG8gZXhlY3V0ZSB0aGUgZm4gb24gZWFjaCBlbnRyeVxuICogaWYgaXQgYWludCBhbiBhcnJheSB3ZSBkb24ndCB3YW50IHRvIGRvIGEgdGhpbmcuXG4gKiB0aGlzIGlzIHVzZWQgYnkgYWxsIHRoZSBtZXRob2RzIHRoYXQgYWNjZXB0IGEgc2luZ2xlIGFuZCBhcnJheSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7KnxBcnJheX0gYXJnXG4gKiBAcGFyYW0ge1N0cmluZ30gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dF1cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpbnZva2VBcnJheUFyZyhhcmcsIGZuLCBjb250ZXh0KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgICBlYWNoKGFyZywgY29udGV4dFtmbl0sIGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHdhbGsgb2JqZWN0cyBhbmQgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRvclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoIW9iaikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgICAgIG9iai5mb3JFYWNoKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgICAgICAgIG9iai5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiB3cmFwIGEgbWV0aG9kIHdpdGggYSBkZXByZWNhdGlvbiB3YXJuaW5nIGFuZCBzdGFjayB0cmFjZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgdGhlIHN1cHBsaWVkIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gZGVwcmVjYXRlKG1ldGhvZCwgbmFtZSwgbWVzc2FnZSkge1xuICAgIHZhciBkZXByZWNhdGlvbk1lc3NhZ2UgPSAnREVQUkVDQVRFRCBNRVRIT0Q6ICcgKyBuYW1lICsgJ1xcbicgKyBtZXNzYWdlICsgJyBBVCBcXG4nO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoJ2dldC1zdGFjay10cmFjZScpO1xuICAgICAgICB2YXIgc3RhY2sgPSBlICYmIGUuc3RhY2sgPyBlLnN0YWNrLnJlcGxhY2UoL15bXlxcKF0rP1tcXG4kXS9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxccythdFxccysvZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15PYmplY3QuPGFub255bW91cz5cXHMqXFwoL2dtLCAne2Fub255bW91c30oKUAnKSA6ICdVbmtub3duIFN0YWNrIFRyYWNlJztcblxuICAgICAgICB2YXIgbG9nID0gd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLndhcm4gfHwgd2luZG93LmNvbnNvbGUubG9nKTtcbiAgICAgICAgaWYgKGxvZykge1xuICAgICAgICAgICAgbG9nLmNhbGwod2luZG93LmNvbnNvbGUsIGRlcHJlY2F0aW9uTWVzc2FnZSwgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBvYmplY3RzX3RvX2Fzc2lnblxuICogQHJldHVybnMge09iamVjdH0gdGFyZ2V0XG4gKi9cbnZhciBhc3NpZ247XG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgICBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHBhcmFtIHtCb29sZWFufSBbbWVyZ2U9ZmFsc2VdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBleHRlbmQgPSBkZXByZWNhdGUoZnVuY3Rpb24gZXh0ZW5kKGRlc3QsIHNyYywgbWVyZ2UpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFtZXJnZSB8fCAobWVyZ2UgJiYgZGVzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgZGVzdFtrZXlzW2ldXSA9IHNyY1trZXlzW2ldXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xufSwgJ2V4dGVuZCcsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogbWVyZ2UgdGhlIHZhbHVlcyBmcm9tIHNyYyBpbiB0aGUgZGVzdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyB0aGF0IGV4aXN0IGluIGRlc3Qgd2lsbCBub3QgYmUgb3ZlcndyaXR0ZW4gYnkgc3JjXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgbWVyZ2UgPSBkZXByZWNhdGUoZnVuY3Rpb24gbWVyZ2UoZGVzdCwgc3JjKSB7XG4gICAgcmV0dXJuIGV4dGVuZChkZXN0LCBzcmMsIHRydWUpO1xufSwgJ21lcmdlJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBzaW1wbGUgY2xhc3MgaW5oZXJpdGFuY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoaWxkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBiYXNlXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXNdXG4gKi9cbmZ1bmN0aW9uIGluaGVyaXQoY2hpbGQsIGJhc2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgYmFzZVAgPSBiYXNlLnByb3RvdHlwZSxcbiAgICAgICAgY2hpbGRQO1xuXG4gICAgY2hpbGRQID0gY2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlUCk7XG4gICAgY2hpbGRQLmNvbnN0cnVjdG9yID0gY2hpbGQ7XG4gICAgY2hpbGRQLl9zdXBlciA9IGJhc2VQO1xuXG4gICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXNzaWduKGNoaWxkUCwgcHJvcGVydGllcyk7XG4gICAgfVxufVxuXG4vKipcbiAqIHNpbXBsZSBmdW5jdGlvbiBiaW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gYmluZEZuKGZuLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5kRm4oKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogbGV0IGEgYm9vbGVhbiB2YWx1ZSBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBtdXN0IHJldHVybiBhIGJvb2xlYW5cbiAqIHRoaXMgZmlyc3QgaXRlbSBpbiBhcmdzIHdpbGwgYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSB2YWxcbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGJvb2xPckZuKHZhbCwgYXJncykge1xuICAgIGlmICh0eXBlb2YgdmFsID09IFRZUEVfRlVOQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIHZhbC5hcHBseShhcmdzID8gYXJnc1swXSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIHVzZSB0aGUgdmFsMiB3aGVuIHZhbDEgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0geyp9IHZhbDFcbiAqIEBwYXJhbSB7Kn0gdmFsMlxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGlmVW5kZWZpbmVkKHZhbDEsIHZhbDIpIHtcbiAgICByZXR1cm4gKHZhbDEgPT09IHVuZGVmaW5lZCkgPyB2YWwyIDogdmFsMTtcbn1cblxuLyoqXG4gKiBhZGRFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogcmVtb3ZlRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBub2RlIGlzIGluIHRoZSBnaXZlbiBwYXJlbnRcbiAqIEBtZXRob2QgaGFzUGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGhhc1BhcmVudChub2RlLCBwYXJlbnQpIHtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBzbWFsbCBpbmRleE9mIHdyYXBwZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaW5TdHIoc3RyLCBmaW5kKSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKGZpbmQpID4gLTE7XG59XG5cbi8qKlxuICogc3BsaXQgc3RyaW5nIG9uIHdoaXRlc3BhY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtBcnJheX0gd29yZHNcbiAqL1xuZnVuY3Rpb24gc3BsaXRTdHIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50cmltKCkuc3BsaXQoL1xccysvZyk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIGFycmF5IGNvbnRhaW5zIHRoZSBvYmplY3QgdXNpbmcgaW5kZXhPZiBvciBhIHNpbXBsZSBwb2x5RmlsbFxuICogQHBhcmFtIHtBcnJheX0gc3JjXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHBhcmFtIHtTdHJpbmd9IFtmaW5kQnlLZXldXG4gKiBAcmV0dXJuIHtCb29sZWFufE51bWJlcn0gZmFsc2Ugd2hlbiBub3QgZm91bmQsIG9yIHRoZSBpbmRleFxuICovXG5mdW5jdGlvbiBpbkFycmF5KHNyYywgZmluZCwgZmluZEJ5S2V5KSB7XG4gICAgaWYgKHNyYy5pbmRleE9mICYmICFmaW5kQnlLZXkpIHtcbiAgICAgICAgcmV0dXJuIHNyYy5pbmRleE9mKGZpbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoKGZpbmRCeUtleSAmJiBzcmNbaV1bZmluZEJ5S2V5XSA9PSBmaW5kKSB8fCAoIWZpbmRCeUtleSAmJiBzcmNbaV0gPT09IGZpbmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn1cblxuLyoqXG4gKiBjb252ZXJ0IGFycmF5LWxpa2Ugb2JqZWN0cyB0byByZWFsIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmosIDApO1xufVxuXG4vKipcbiAqIHVuaXF1ZSBhcnJheSB3aXRoIG9iamVjdHMgYmFzZWQgb24gYSBrZXkgKGxpa2UgJ2lkJykgb3IganVzdCBieSB0aGUgYXJyYXkncyB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gc3JjIFt7aWQ6MX0se2lkOjJ9LHtpZDoxfV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuICogQHBhcmFtIHtCb29sZWFufSBbc29ydD1GYWxzZV1cbiAqIEByZXR1cm5zIHtBcnJheX0gW3tpZDoxfSx7aWQ6Mn1dXG4gKi9cbmZ1bmN0aW9uIHVuaXF1ZUFycmF5KHNyYywga2V5LCBzb3J0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFyIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWwgPSBrZXkgPyBzcmNbaV1ba2V5XSA6IHNyY1tpXTtcbiAgICAgICAgaWYgKGluQXJyYXkodmFsdWVzLCB2YWwpIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNyY1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2ldID0gdmFsO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoZnVuY3Rpb24gc29ydFVuaXF1ZUFycmF5KGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYVtrZXldID4gYltrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHByZWZpeGVkIHByb3BlcnR5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBwcmVmaXhlZFxuICovXG5mdW5jdGlvbiBwcmVmaXhlZChvYmosIHByb3BlcnR5KSB7XG4gICAgdmFyIHByZWZpeCwgcHJvcDtcbiAgICB2YXIgY2FtZWxQcm9wID0gcHJvcGVydHlbMF0udG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgVkVORE9SX1BSRUZJWEVTLmxlbmd0aCkge1xuICAgICAgICBwcmVmaXggPSBWRU5ET1JfUFJFRklYRVNbaV07XG4gICAgICAgIHByb3AgPSAocHJlZml4KSA/IHByZWZpeCArIGNhbWVsUHJvcCA6IHByb3BlcnR5O1xuXG4gICAgICAgIGlmIChwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIHByb3A7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIGdldCBhIHVuaXF1ZSBpZFxuICogQHJldHVybnMge251bWJlcn0gdW5pcXVlSWRcbiAqL1xudmFyIF91bmlxdWVJZCA9IDE7XG5mdW5jdGlvbiB1bmlxdWVJZCgpIHtcbiAgICByZXR1cm4gX3VuaXF1ZUlkKys7XG59XG5cbi8qKlxuICogZ2V0IHRoZSB3aW5kb3cgb2JqZWN0IG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtEb2N1bWVudFZpZXd8V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB2YXIgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGVsZW1lbnQ7XG4gICAgcmV0dXJuIChkb2MuZGVmYXVsdFZpZXcgfHwgZG9jLnBhcmVudFdpbmRvdyB8fCB3aW5kb3cpO1xufVxuXG52YXIgTU9CSUxFX1JFR0VYID0gL21vYmlsZXx0YWJsZXR8aXAoYWR8aG9uZXxvZCl8YW5kcm9pZC9pO1xuXG52YXIgU1VQUE9SVF9UT1VDSCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xudmFyIFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMgPSBwcmVmaXhlZCh3aW5kb3csICdQb2ludGVyRXZlbnQnKSAhPT0gdW5kZWZpbmVkO1xudmFyIFNVUFBPUlRfT05MWV9UT1VDSCA9IFNVUFBPUlRfVE9VQ0ggJiYgTU9CSUxFX1JFR0VYLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbnZhciBJTlBVVF9UWVBFX1RPVUNIID0gJ3RvdWNoJztcbnZhciBJTlBVVF9UWVBFX1BFTiA9ICdwZW4nO1xudmFyIElOUFVUX1RZUEVfTU9VU0UgPSAnbW91c2UnO1xudmFyIElOUFVUX1RZUEVfS0lORUNUID0gJ2tpbmVjdCc7XG5cbnZhciBDT01QVVRFX0lOVEVSVkFMID0gMjU7XG5cbnZhciBJTlBVVF9TVEFSVCA9IDE7XG52YXIgSU5QVVRfTU9WRSA9IDI7XG52YXIgSU5QVVRfRU5EID0gNDtcbnZhciBJTlBVVF9DQU5DRUwgPSA4O1xuXG52YXIgRElSRUNUSU9OX05PTkUgPSAxO1xudmFyIERJUkVDVElPTl9MRUZUID0gMjtcbnZhciBESVJFQ1RJT05fUklHSFQgPSA0O1xudmFyIERJUkVDVElPTl9VUCA9IDg7XG52YXIgRElSRUNUSU9OX0RPV04gPSAxNjtcblxudmFyIERJUkVDVElPTl9IT1JJWk9OVEFMID0gRElSRUNUSU9OX0xFRlQgfCBESVJFQ1RJT05fUklHSFQ7XG52YXIgRElSRUNUSU9OX1ZFUlRJQ0FMID0gRElSRUNUSU9OX1VQIHwgRElSRUNUSU9OX0RPV047XG52YXIgRElSRUNUSU9OX0FMTCA9IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMO1xuXG52YXIgUFJPUFNfWFkgPSBbJ3gnLCAneSddO1xudmFyIFBST1BTX0NMSUVOVF9YWSA9IFsnY2xpZW50WCcsICdjbGllbnRZJ107XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBJbnB1dChtYW5hZ2VyLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgdGhpcy50YXJnZXQgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRUYXJnZXQ7XG5cbiAgICAvLyBzbWFsbGVyIHdyYXBwZXIgYXJvdW5kIHRoZSBoYW5kbGVyLCBmb3IgdGhlIHNjb3BlIGFuZCB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgbWFuYWdlcixcbiAgICAvLyBzbyB3aGVuIGRpc2FibGVkIHRoZSBpbnB1dCBldmVudHMgYXJlIGNvbXBsZXRlbHkgYnlwYXNzZWQuXG4gICAgdGhpcy5kb21IYW5kbGVyID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaWYgKGJvb2xPckZuKG1hbmFnZXIub3B0aW9ucy5lbmFibGUsIFttYW5hZ2VyXSkpIHtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlcihldik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbn1cblxuSW5wdXQucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNob3VsZCBoYW5kbGUgdGhlIGlucHV0RXZlbnQgZGF0YSBhbmQgdHJpZ2dlciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiBhZGRFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiByZW1vdmVFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogY2FsbGVkIGJ5IHRoZSBNYW5hZ2VyIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICogQHJldHVybnMge0lucHV0fVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dEluc3RhbmNlKG1hbmFnZXIpIHtcbiAgICB2YXIgVHlwZTtcbiAgICB2YXIgaW5wdXRDbGFzcyA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dENsYXNzO1xuXG4gICAgaWYgKGlucHV0Q2xhc3MpIHtcbiAgICAgICAgVHlwZSA9IGlucHV0Q2xhc3M7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICAgIFR5cGUgPSBQb2ludGVyRXZlbnRJbnB1dDtcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfT05MWV9UT1VDSCkge1xuICAgICAgICBUeXBlID0gVG91Y2hJbnB1dDtcbiAgICB9IGVsc2UgaWYgKCFTVVBQT1JUX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBNb3VzZUlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaE1vdXNlSW5wdXQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgKFR5cGUpKG1hbmFnZXIsIGlucHV0SGFuZGxlcik7XG59XG5cbi8qKlxuICogaGFuZGxlIGlucHV0IGV2ZW50c1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gaW5wdXRIYW5kbGVyKG1hbmFnZXIsIGV2ZW50VHlwZSwgaW5wdXQpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW4gPSBpbnB1dC5wb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGNoYW5nZWRQb2ludGVyc0xlbiA9IGlucHV0LmNoYW5nZWRQb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGlzRmlyc3QgPSAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG4gICAgdmFyIGlzRmluYWwgPSAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG5cbiAgICBpbnB1dC5pc0ZpcnN0ID0gISFpc0ZpcnN0O1xuICAgIGlucHV0LmlzRmluYWwgPSAhIWlzRmluYWw7XG5cbiAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICBtYW5hZ2VyLnNlc3Npb24gPSB7fTtcbiAgICB9XG5cbiAgICAvLyBzb3VyY2UgZXZlbnQgaXMgdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGRvbUV2ZW50c1xuICAgIC8vIGxpa2UgJ3RvdWNoc3RhcnQsIG1vdXNldXAsIHBvaW50ZXJkb3duJ1xuICAgIGlucHV0LmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcblxuICAgIC8vIGNvbXB1dGUgc2NhbGUsIHJvdGF0aW9uIGV0Y1xuICAgIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpO1xuXG4gICAgLy8gZW1pdCBzZWNyZXQgZXZlbnRcbiAgICBtYW5hZ2VyLmVtaXQoJ2hhbW1lci5pbnB1dCcsIGlucHV0KTtcblxuICAgIG1hbmFnZXIucmVjb2duaXplKGlucHV0KTtcbiAgICBtYW5hZ2VyLnNlc3Npb24ucHJldklucHV0ID0gaW5wdXQ7XG59XG5cbi8qKlxuICogZXh0ZW5kIHRoZSBkYXRhIHdpdGggc29tZSB1c2FibGUgcHJvcGVydGllcyBsaWtlIHNjYWxlLCByb3RhdGUsIHZlbG9jaXR5IGV0Y1xuICogQHBhcmFtIHtPYmplY3R9IG1hbmFnZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KSB7XG4gICAgdmFyIHNlc3Npb24gPSBtYW5hZ2VyLnNlc3Npb247XG4gICAgdmFyIHBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnM7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gc3RvcmUgdGhlIGZpcnN0IGlucHV0IHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYW5kIGRpcmVjdGlvblxuICAgIGlmICghc2Vzc2lvbi5maXJzdElucHV0KSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RJbnB1dCA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9XG5cbiAgICAvLyB0byBjb21wdXRlIHNjYWxlIGFuZCByb3RhdGlvbiB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBtdWx0aXBsZSB0b3VjaGVzXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID4gMSAmJiAhc2Vzc2lvbi5maXJzdE11bHRpcGxlKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaXJzdElucHV0ID0gc2Vzc2lvbi5maXJzdElucHV0O1xuICAgIHZhciBmaXJzdE11bHRpcGxlID0gc2Vzc2lvbi5maXJzdE11bHRpcGxlO1xuICAgIHZhciBvZmZzZXRDZW50ZXIgPSBmaXJzdE11bHRpcGxlID8gZmlyc3RNdWx0aXBsZS5jZW50ZXIgOiBmaXJzdElucHV0LmNlbnRlcjtcblxuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXIgPSBnZXRDZW50ZXIocG9pbnRlcnMpO1xuICAgIGlucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgIGlucHV0LmRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGZpcnN0SW5wdXQudGltZVN0YW1wO1xuXG4gICAgaW5wdXQuYW5nbGUgPSBnZXRBbmdsZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG4gICAgaW5wdXQuZGlzdGFuY2UgPSBnZXREaXN0YW5jZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG5cbiAgICBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCk7XG4gICAgaW5wdXQub2Zmc2V0RGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcblxuICAgIHZhciBvdmVyYWxsVmVsb2NpdHkgPSBnZXRWZWxvY2l0eShpbnB1dC5kZWx0YVRpbWUsIGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYID0gb3ZlcmFsbFZlbG9jaXR5Lng7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WSA9IG92ZXJhbGxWZWxvY2l0eS55O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eSA9IChhYnMob3ZlcmFsbFZlbG9jaXR5LngpID4gYWJzKG92ZXJhbGxWZWxvY2l0eS55KSkgPyBvdmVyYWxsVmVsb2NpdHkueCA6IG92ZXJhbGxWZWxvY2l0eS55O1xuXG4gICAgaW5wdXQuc2NhbGUgPSBmaXJzdE11bHRpcGxlID8gZ2V0U2NhbGUoZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMTtcbiAgICBpbnB1dC5yb3RhdGlvbiA9IGZpcnN0TXVsdGlwbGUgPyBnZXRSb3RhdGlvbihmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAwO1xuXG4gICAgaW5wdXQubWF4UG9pbnRlcnMgPSAhc2Vzc2lvbi5wcmV2SW5wdXQgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiAoKGlucHV0LnBvaW50ZXJzLmxlbmd0aCA+XG4gICAgICAgIHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKSA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6IHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKTtcblxuICAgIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCk7XG5cbiAgICAvLyBmaW5kIHRoZSBjb3JyZWN0IHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKGhhc1BhcmVudChpbnB1dC5zcmNFdmVudC50YXJnZXQsIHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gaW5wdXQuc3JjRXZlbnQudGFyZ2V0O1xuICAgIH1cbiAgICBpbnB1dC50YXJnZXQgPSB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlcjtcbiAgICB2YXIgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZJbnB1dCA9IHNlc3Npb24ucHJldklucHV0IHx8IHt9O1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfU1RBUlQgfHwgcHJldklucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfRU5EKSB7XG4gICAgICAgIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhID0ge1xuICAgICAgICAgICAgeDogcHJldklucHV0LmRlbHRhWCB8fCAwLFxuICAgICAgICAgICAgeTogcHJldklucHV0LmRlbHRhWSB8fCAwXG4gICAgICAgIH07XG5cbiAgICAgICAgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRlci54LFxuICAgICAgICAgICAgeTogY2VudGVyLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbnB1dC5kZWx0YVggPSBwcmV2RGVsdGEueCArIChjZW50ZXIueCAtIG9mZnNldC54KTtcbiAgICBpbnB1dC5kZWx0YVkgPSBwcmV2RGVsdGEueSArIChjZW50ZXIueSAtIG9mZnNldC55KTtcbn1cblxuLyoqXG4gKiB2ZWxvY2l0eSBpcyBjYWxjdWxhdGVkIGV2ZXJ5IHggbXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXNzaW9uXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGxhc3QgPSBzZXNzaW9uLmxhc3RJbnRlcnZhbCB8fCBpbnB1dCxcbiAgICAgICAgZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gbGFzdC50aW1lU3RhbXAsXG4gICAgICAgIHZlbG9jaXR5LCB2ZWxvY2l0eVgsIHZlbG9jaXR5WSwgZGlyZWN0aW9uO1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9DQU5DRUwgJiYgKGRlbHRhVGltZSA+IENPTVBVVEVfSU5URVJWQUwgfHwgbGFzdC52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICB2YXIgZGVsdGFYID0gaW5wdXQuZGVsdGFYIC0gbGFzdC5kZWx0YVg7XG4gICAgICAgIHZhciBkZWx0YVkgPSBpbnB1dC5kZWx0YVkgLSBsYXN0LmRlbHRhWTtcblxuICAgICAgICB2YXIgdiA9IGdldFZlbG9jaXR5KGRlbHRhVGltZSwgZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgICB2ZWxvY2l0eVggPSB2Lng7XG4gICAgICAgIHZlbG9jaXR5WSA9IHYueTtcbiAgICAgICAgdmVsb2NpdHkgPSAoYWJzKHYueCkgPiBhYnModi55KSkgPyB2LnggOiB2Lnk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGdldERpcmVjdGlvbihkZWx0YVgsIGRlbHRhWSk7XG5cbiAgICAgICAgc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgPSBpbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1c2UgbGF0ZXN0IHZlbG9jaXR5IGluZm8gaWYgaXQgZG9lc24ndCBvdmVydGFrZSBhIG1pbmltdW0gcGVyaW9kXG4gICAgICAgIHZlbG9jaXR5ID0gbGFzdC52ZWxvY2l0eTtcbiAgICAgICAgdmVsb2NpdHlYID0gbGFzdC52ZWxvY2l0eVg7XG4gICAgICAgIHZlbG9jaXR5WSA9IGxhc3QudmVsb2NpdHlZO1xuICAgICAgICBkaXJlY3Rpb24gPSBsYXN0LmRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBpbnB1dC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIGlucHV0LnZlbG9jaXR5WCA9IHZlbG9jaXR5WDtcbiAgICBpbnB1dC52ZWxvY2l0eVkgPSB2ZWxvY2l0eVk7XG4gICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHNpbXBsZSBjbG9uZSBmcm9tIHRoZSBpbnB1dCB1c2VkIGZvciBzdG9yYWdlIG9mIGZpcnN0SW5wdXQgYW5kIGZpcnN0TXVsdGlwbGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICogQHJldHVybnMge09iamVjdH0gY2xvbmVkSW5wdXREYXRhXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KSB7XG4gICAgLy8gbWFrZSBhIHNpbXBsZSBjb3B5IG9mIHRoZSBwb2ludGVycyBiZWNhdXNlIHdlIHdpbGwgZ2V0IGEgcmVmZXJlbmNlIGlmIHdlIGRvbid0XG4gICAgLy8gd2Ugb25seSBuZWVkIGNsaWVudFhZIGZvciB0aGUgY2FsY3VsYXRpb25zXG4gICAgdmFyIHBvaW50ZXJzID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgaW5wdXQucG9pbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvaW50ZXJzW2ldID0ge1xuICAgICAgICAgICAgY2xpZW50WDogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WCksXG4gICAgICAgICAgICBjbGllbnRZOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGltZVN0YW1wOiBub3coKSxcbiAgICAgICAgcG9pbnRlcnM6IHBvaW50ZXJzLFxuICAgICAgICBjZW50ZXI6IGdldENlbnRlcihwb2ludGVycyksXG4gICAgICAgIGRlbHRhWDogaW5wdXQuZGVsdGFYLFxuICAgICAgICBkZWx0YVk6IGlucHV0LmRlbHRhWVxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBjZW50ZXIgb2YgYWxsIHRoZSBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gcG9pbnRlcnNcbiAqIEByZXR1cm4ge09iamVjdH0gY2VudGVyIGNvbnRhaW5zIGB4YCBhbmQgYHlgIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKHBvaW50ZXJzKSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gbm8gbmVlZCB0byBsb29wIHdoZW4gb25seSBvbmUgdG91Y2hcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFgpLFxuICAgICAgICAgICAgeTogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgeCA9IDAsIHkgPSAwLCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHBvaW50ZXJzTGVuZ3RoKSB7XG4gICAgICAgIHggKz0gcG9pbnRlcnNbaV0uY2xpZW50WDtcbiAgICAgICAgeSArPSBwb2ludGVyc1tpXS5jbGllbnRZO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogcm91bmQoeCAvIHBvaW50ZXJzTGVuZ3RoKSxcbiAgICAgICAgeTogcm91bmQoeSAvIHBvaW50ZXJzTGVuZ3RoKVxuICAgIH07XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSB2ZWxvY2l0eSBiZXR3ZWVuIHR3byBwb2ludHMuIHVuaXQgaXMgaW4gcHggcGVyIG1zLlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhVGltZVxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtPYmplY3R9IHZlbG9jaXR5IGB4YCBhbmQgYHlgXG4gKi9cbmZ1bmN0aW9uIGdldFZlbG9jaXR5KGRlbHRhVGltZSwgeCwgeSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHggLyBkZWx0YVRpbWUgfHwgMCxcbiAgICAgICAgeTogeSAvIGRlbHRhVGltZSB8fCAwXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGRpcmVjdGlvbiBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7TnVtYmVyfSBkaXJlY3Rpb25cbiAqL1xuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKHgsIHkpIHtcbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgICByZXR1cm4gRElSRUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgaWYgKGFicyh4KSA+PSBhYnMoeSkpIHtcbiAgICAgICAgcmV0dXJuIHggPCAwID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgfVxuICAgIHJldHVybiB5IDwgMCA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYWJzb2x1dGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gcDEge3gsIHl9XG4gKiBAcGFyYW0ge09iamVjdH0gcDIge3gsIHl9XG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuXG4gICAgcmV0dXJuIE1hdGguc3FydCgoeCAqIHgpICsgKHkgKiB5KSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhbmdsZSBiZXR3ZWVuIHR3byBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHAxXG4gKiBAcGFyYW0ge09iamVjdH0gcDJcbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gYW5nbGVcbiAqL1xuZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCkgKiAxODAgLyBNYXRoLlBJO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgcm90YXRpb24gZGVncmVlcyBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSByb3RhdGlvblxuICovXG5mdW5jdGlvbiBnZXRSb3RhdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldEFuZ2xlKGVuZFsxXSwgZW5kWzBdLCBQUk9QU19DTElFTlRfWFkpICsgZ2V0QW5nbGUoc3RhcnRbMV0sIHN0YXJ0WzBdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgc2NhbGUgZmFjdG9yIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBubyBzY2FsZSBpcyAxLCBhbmQgZ29lcyBkb3duIHRvIDAgd2hlbiBwaW5jaGVkIHRvZ2V0aGVyLCBhbmQgYmlnZ2VyIHdoZW4gcGluY2hlZCBvdXRcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gc2NhbGVcbiAqL1xuZnVuY3Rpb24gZ2V0U2NhbGUoc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXREaXN0YW5jZShlbmRbMF0sIGVuZFsxXSwgUFJPUFNfQ0xJRU5UX1hZKSAvIGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxudmFyIE1PVVNFX0lOUFVUX01BUCA9IHtcbiAgICBtb3VzZWRvd246IElOUFVUX1NUQVJULFxuICAgIG1vdXNlbW92ZTogSU5QVVRfTU9WRSxcbiAgICBtb3VzZXVwOiBJTlBVVF9FTkRcbn07XG5cbnZhciBNT1VTRV9FTEVNRU5UX0VWRU5UUyA9ICdtb3VzZWRvd24nO1xudmFyIE1PVVNFX1dJTkRPV19FVkVOVFMgPSAnbW91c2Vtb3ZlIG1vdXNldXAnO1xuXG4vKipcbiAqIE1vdXNlIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBNb3VzZUlucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IE1PVVNFX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBNT1VTRV9XSU5ET1dfRVZFTlRTO1xuXG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7IC8vIG1vdXNlZG93biBzdGF0ZVxuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IE1PVVNFX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBvbiBzdGFydCB3ZSB3YW50IHRvIGhhdmUgdGhlIGxlZnQgbW91c2UgYnV0dG9uIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIGV2LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9NT1ZFICYmIGV2LndoaWNoICE9PSAxKSB7XG4gICAgICAgICAgICBldmVudFR5cGUgPSBJTlBVVF9FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKCF0aGlzLnByZXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxudmFyIFBPSU5URVJfSU5QVVRfTUFQID0ge1xuICAgIHBvaW50ZXJkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBwb2ludGVybW92ZTogSU5QVVRfTU9WRSxcbiAgICBwb2ludGVydXA6IElOUFVUX0VORCxcbiAgICBwb2ludGVyY2FuY2VsOiBJTlBVVF9DQU5DRUwsXG4gICAgcG9pbnRlcm91dDogSU5QVVRfQ0FOQ0VMXG59O1xuXG4vLyBpbiBJRTEwIHRoZSBwb2ludGVyIHR5cGVzIGlzIGRlZmluZWQgYXMgYW4gZW51bVxudmFyIElFMTBfUE9JTlRFUl9UWVBFX0VOVU0gPSB7XG4gICAgMjogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAzOiBJTlBVVF9UWVBFX1BFTixcbiAgICA0OiBJTlBVVF9UWVBFX01PVVNFLFxuICAgIDU6IElOUFVUX1RZUEVfS0lORUNUIC8vIHNlZSBodHRwczovL3R3aXR0ZXIuY29tL2phY29icm9zc2kvc3RhdHVzLzQ4MDU5NjQzODQ4OTg5MDgxNlxufTtcblxudmFyIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAncG9pbnRlcmRvd24nO1xudmFyIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdwb2ludGVybW92ZSBwb2ludGVydXAgcG9pbnRlcmNhbmNlbCc7XG5cbi8vIElFMTAgaGFzIHByZWZpeGVkIHN1cHBvcnQsIGFuZCBjYXNlLXNlbnNpdGl2ZVxuaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCAmJiAhd2luZG93LlBvaW50ZXJFdmVudCkge1xuICAgIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAnTVNQb2ludGVyRG93bic7XG4gICAgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ01TUG9pbnRlck1vdmUgTVNQb2ludGVyVXAgTVNQb2ludGVyQ2FuY2VsJztcbn1cblxuLyoqXG4gKiBQb2ludGVyIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBQb2ludGVyRXZlbnRJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBQT0lOVEVSX1dJTkRPV19FVkVOVFM7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5zdG9yZSA9ICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wb2ludGVyRXZlbnRzID0gW10pO1xufVxuXG5pbmhlcml0KFBvaW50ZXJFdmVudElucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBQRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICAgICAgdmFyIHJlbW92ZVBvaW50ZXIgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZXZlbnRUeXBlTm9ybWFsaXplZCA9IGV2LnR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdtcycsICcnKTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IFBPSU5URVJfSU5QVVRfTUFQW2V2ZW50VHlwZU5vcm1hbGl6ZWRdO1xuICAgICAgICB2YXIgcG9pbnRlclR5cGUgPSBJRTEwX1BPSU5URVJfVFlQRV9FTlVNW2V2LnBvaW50ZXJUeXBlXSB8fCBldi5wb2ludGVyVHlwZTtcblxuICAgICAgICB2YXIgaXNUb3VjaCA9IChwb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKTtcblxuICAgICAgICAvLyBnZXQgaW5kZXggb2YgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICB2YXIgc3RvcmVJbmRleCA9IGluQXJyYXkoc3RvcmUsIGV2LnBvaW50ZXJJZCwgJ3BvaW50ZXJJZCcpO1xuXG4gICAgICAgIC8vIHN0YXJ0IGFuZCBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChldi5idXR0b24gPT09IDAgfHwgaXNUb3VjaCkpIHtcbiAgICAgICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1c2goZXYpO1xuICAgICAgICAgICAgICAgIHN0b3JlSW5kZXggPSBzdG9yZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICByZW1vdmVQb2ludGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0IG5vdCBmb3VuZCwgc28gdGhlIHBvaW50ZXIgaGFzbid0IGJlZW4gZG93biAoc28gaXQncyBwcm9iYWJseSBhIGhvdmVyKVxuICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHN0b3JlW3N0b3JlSW5kZXhdID0gZXY7XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHN0b3JlLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IHBvaW50ZXJUeXBlLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZW1vdmVQb2ludGVyKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgZnJvbSB0aGUgc3RvcmVcbiAgICAgICAgICAgIHN0b3JlLnNwbGljZShzdG9yZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG52YXIgU0lOR0xFX1RPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCc7XG52YXIgU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIFRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBTaW5nbGVUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFM7XG4gICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFNpbmdsZVRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gU0lOR0xFX1RPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBzaG91bGQgd2UgaGFuZGxlIHRoZSB0b3VjaCBldmVudHM/XG4gICAgICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hlcyA9IG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG5cbiAgICAgICAgLy8gd2hlbiBkb25lLCByZXNldCB0aGUgc3RhcnRlZCBzdGF0ZVxuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIHRvdWNoZXNbMF0ubGVuZ3RoIC0gdG91Y2hlc1sxXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgY2hhbmdlZCA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpO1xuXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBhbGwgPSB1bmlxdWVBcnJheShhbGwuY29uY2F0KGNoYW5nZWQpLCAnaWRlbnRpZmllcicsIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBbYWxsLCBjaGFuZ2VkXTtcbn1cblxudmFyIFRPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogTXVsdGktdXNlciB0b3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLnRhcmdldElkcyA9IHt9O1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1URWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBUT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG4gICAgICAgIHZhciB0b3VjaGVzID0gZ2V0VG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcbiAgICAgICAgaWYgKCF0b3VjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGxUb3VjaGVzID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgdGFyZ2V0SWRzID0gdGhpcy50YXJnZXRJZHM7XG5cbiAgICAvLyB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIHRvdWNoLCB0aGUgcHJvY2VzcyBjYW4gYmUgc2ltcGxpZmllZFxuICAgIGlmICh0eXBlICYgKElOUFVUX1NUQVJUIHwgSU5QVVRfTU9WRSkgJiYgYWxsVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGFyZ2V0SWRzW2FsbFRvdWNoZXNbMF0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gW2FsbFRvdWNoZXMsIGFsbFRvdWNoZXNdO1xuICAgIH1cblxuICAgIHZhciBpLFxuICAgICAgICB0YXJnZXRUb3VjaGVzLFxuICAgICAgICBjaGFuZ2VkVG91Y2hlcyA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyA9IFtdLFxuICAgICAgICB0YXJnZXQgPSB0aGlzLnRhcmdldDtcblxuICAgIC8vIGdldCB0YXJnZXQgdG91Y2hlcyBmcm9tIHRvdWNoZXNcbiAgICB0YXJnZXRUb3VjaGVzID0gYWxsVG91Y2hlcy5maWx0ZXIoZnVuY3Rpb24odG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhcmVudCh0b3VjaC50YXJnZXQsIHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyBjb2xsZWN0IHRvdWNoZXNcbiAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRhcmdldElkc1t0YXJnZXRUb3VjaGVzW2ldLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBjaGFuZ2VkIHRvdWNoZXMgdG8gb25seSBjb250YWluIHRvdWNoZXMgdGhhdCBleGlzdCBpbiB0aGUgY29sbGVjdGVkIHRhcmdldCBpZHNcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5wdXNoKGNoYW5nZWRUb3VjaGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFudXAgcmVtb3ZlZCB0b3VjaGVzXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmICghY2hhbmdlZFRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgICAvLyBtZXJnZSB0YXJnZXRUb3VjaGVzIHdpdGggY2hhbmdlZFRhcmdldFRvdWNoZXMgc28gaXQgY29udGFpbnMgQUxMIHRvdWNoZXMsIGluY2x1ZGluZyAnZW5kJyBhbmQgJ2NhbmNlbCdcbiAgICAgICAgdW5pcXVlQXJyYXkodGFyZ2V0VG91Y2hlcy5jb25jYXQoY2hhbmdlZFRhcmdldFRvdWNoZXMpLCAnaWRlbnRpZmllcicsIHRydWUpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlc1xuICAgIF07XG59XG5cbi8qKlxuICogQ29tYmluZWQgdG91Y2ggYW5kIG1vdXNlIGlucHV0XG4gKlxuICogVG91Y2ggaGFzIGEgaGlnaGVyIHByaW9yaXR5IHRoZW4gbW91c2UsIGFuZCB3aGlsZSB0b3VjaGluZyBubyBtb3VzZSBldmVudHMgYXJlIGFsbG93ZWQuXG4gKiBUaGlzIGJlY2F1c2UgdG91Y2ggZGV2aWNlcyBhbHNvIGVtaXQgbW91c2UgZXZlbnRzIHdoaWxlIGRvaW5nIGEgdG91Y2guXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5cbnZhciBERURVUF9USU1FT1VUID0gMjUwMDtcbnZhciBERURVUF9ESVNUQU5DRSA9IDI1O1xuXG5mdW5jdGlvbiBUb3VjaE1vdXNlSW5wdXQoKSB7XG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBoYW5kbGVyID0gYmluZEZuKHRoaXMuaGFuZGxlciwgdGhpcyk7XG4gICAgdGhpcy50b3VjaCA9IG5ldyBUb3VjaElucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG4gICAgdGhpcy5tb3VzZSA9IG5ldyBNb3VzZUlucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG5cbiAgICB0aGlzLnByaW1hcnlUb3VjaCA9IG51bGw7XG4gICAgdGhpcy5sYXN0VG91Y2hlcyA9IFtdO1xufVxuXG5pbmhlcml0KFRvdWNoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgYW5kIHRvdWNoIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0RXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVE1FaGFuZGxlcihtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIGlzVG91Y2ggPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpLFxuICAgICAgICAgICAgaXNNb3VzZSA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9NT1VTRSk7XG5cbiAgICAgICAgaWYgKGlzTW91c2UgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcyAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzLmZpcmVzVG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gd2UncmUgaW4gYSB0b3VjaCBldmVudCwgcmVjb3JkIHRvdWNoZXMgdG8gIGRlLWR1cGUgc3ludGhldGljIG1vdXNlIGV2ZW50XG4gICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICByZWNvcmRUb3VjaGVzLmNhbGwodGhpcywgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc01vdXNlICYmIGlzU3ludGhldGljRXZlbnQuY2FsbCh0aGlzLCBpbnB1dERhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50b3VjaC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMubW91c2UuZGVzdHJveSgpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiByZWNvcmRUb3VjaGVzKGV2ZW50VHlwZSwgZXZlbnREYXRhKSB7XG4gICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeVRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXS5pZGVudGlmaWVyO1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldExhc3RUb3VjaChldmVudERhdGEpIHtcbiAgICB2YXIgdG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdO1xuXG4gICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMucHJpbWFyeVRvdWNoKSB7XG4gICAgICAgIHZhciBsYXN0VG91Y2ggPSB7eDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WX07XG4gICAgICAgIHRoaXMubGFzdFRvdWNoZXMucHVzaChsYXN0VG91Y2gpO1xuICAgICAgICB2YXIgbHRzID0gdGhpcy5sYXN0VG91Y2hlcztcbiAgICAgICAgdmFyIHJlbW92ZUxhc3RUb3VjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBsdHMuaW5kZXhPZihsYXN0VG91Y2gpO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGx0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNldFRpbWVvdXQocmVtb3ZlTGFzdFRvdWNoLCBERURVUF9USU1FT1VUKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzU3ludGhldGljRXZlbnQoZXZlbnREYXRhKSB7XG4gICAgdmFyIHggPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WCwgeSA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRZO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYXN0VG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdCA9IHRoaXMubGFzdFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHggLSB0LngpLCBkeSA9IE1hdGguYWJzKHkgLSB0LnkpO1xuICAgICAgICBpZiAoZHggPD0gREVEVVBfRElTVEFOQ0UgJiYgZHkgPD0gREVEVVBfRElTVEFOQ0UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIFBSRUZJWEVEX1RPVUNIX0FDVElPTiA9IHByZWZpeGVkKFRFU1RfRUxFTUVOVC5zdHlsZSwgJ3RvdWNoQWN0aW9uJyk7XG52YXIgTkFUSVZFX1RPVUNIX0FDVElPTiA9IFBSRUZJWEVEX1RPVUNIX0FDVElPTiAhPT0gdW5kZWZpbmVkO1xuXG4vLyBtYWdpY2FsIHRvdWNoQWN0aW9uIHZhbHVlXG52YXIgVE9VQ0hfQUNUSU9OX0NPTVBVVEUgPSAnY29tcHV0ZSc7XG52YXIgVE9VQ0hfQUNUSU9OX0FVVE8gPSAnYXV0byc7XG52YXIgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTiA9ICdtYW5pcHVsYXRpb24nOyAvLyBub3QgaW1wbGVtZW50ZWRcbnZhciBUT1VDSF9BQ1RJT05fTk9ORSA9ICdub25lJztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1ggPSAncGFuLXgnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWSA9ICdwYW4teSc7XG52YXIgVE9VQ0hfQUNUSU9OX01BUCA9IGdldFRvdWNoQWN0aW9uUHJvcHMoKTtcblxuLyoqXG4gKiBUb3VjaCBBY3Rpb25cbiAqIHNldHMgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IG9yIHVzZXMgdGhlIGpzIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFRvdWNoQWN0aW9uKG1hbmFnZXIsIHZhbHVlKSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLnNldCh2YWx1ZSk7XG59XG5cblRvdWNoQWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlIG9uIHRoZSBlbGVtZW50IG9yIGVuYWJsZSB0aGUgcG9seWZpbGxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIC8vIGZpbmQgb3V0IHRoZSB0b3VjaC1hY3Rpb24gYnkgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGlmICh2YWx1ZSA9PSBUT1VDSF9BQ1RJT05fQ09NUFVURSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvbXB1dGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOQVRJVkVfVE9VQ0hfQUNUSU9OICYmIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlICYmIFRPVUNIX0FDVElPTl9NQVBbdmFsdWVdKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZVtQUkVGSVhFRF9UT1VDSF9BQ1RJT05dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3Rpb25zID0gdmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGp1c3QgcmUtc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMubWFuYWdlci5vcHRpb25zLnRvdWNoQWN0aW9uKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY29tcHV0ZSB0aGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcmVjb2duaXplcidzIHNldHRpbmdzXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBjb21wdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgZWFjaCh0aGlzLm1hbmFnZXIucmVjb2duaXplcnMsIGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIGlmIChib29sT3JGbihyZWNvZ25pemVyLm9wdGlvbnMuZW5hYmxlLCBbcmVjb2duaXplcl0pKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IGFjdGlvbnMuY29uY2F0KHJlY29nbml6ZXIuZ2V0VG91Y2hBY3Rpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucy5qb2luKCcgJykpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgb24gZWFjaCBpbnB1dCBjeWNsZSBhbmQgcHJvdmlkZXMgdGhlIHByZXZlbnRpbmcgb2YgdGhlIGJyb3dzZXIgYmVoYXZpb3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBwcmV2ZW50RGVmYXVsdHM6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzcmNFdmVudCA9IGlucHV0LnNyY0V2ZW50O1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQub2Zmc2V0RGlyZWN0aW9uO1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b3VjaCBhY3Rpb24gZGlkIHByZXZlbnRlZCBvbmNlIHRoaXMgc2Vzc2lvblxuICAgICAgICBpZiAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkKSB7XG4gICAgICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIHZhciBoYXNOb25lID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICAgICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWV07XG4gICAgICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1hdO1xuXG4gICAgICAgIGlmIChoYXNOb25lKSB7XG4gICAgICAgICAgICAvL2RvIG5vdCBwcmV2ZW50IGRlZmF1bHRzIGlmIHRoaXMgaXMgYSB0YXAgZ2VzdHVyZVxuXG4gICAgICAgICAgICB2YXIgaXNUYXBQb2ludGVyID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSAxO1xuICAgICAgICAgICAgdmFyIGlzVGFwTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IDI7XG4gICAgICAgICAgICB2YXIgaXNUYXBUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCAyNTA7XG5cbiAgICAgICAgICAgIGlmIChpc1RhcFBvaW50ZXIgJiYgaXNUYXBNb3ZlbWVudCAmJiBpc1RhcFRvdWNoVGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgICAgIC8vIGBwYW4teCBwYW4teWAgbWVhbnMgYnJvd3NlciBoYW5kbGVzIGFsbCBzY3JvbGxpbmcvcGFubmluZywgZG8gbm90IHByZXZlbnRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNOb25lIHx8XG4gICAgICAgICAgICAoaGFzUGFuWSAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkgfHxcbiAgICAgICAgICAgIChoYXNQYW5YICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnRTcmMoc3JjRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGwgcHJldmVudERlZmF1bHQgdG8gcHJldmVudCB0aGUgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3IgKHNjcm9sbGluZyBpbiBtb3N0IGNhc2VzKVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcmNFdmVudFxuICAgICAqL1xuICAgIHByZXZlbnRTcmM6IGZ1bmN0aW9uKHNyY0V2ZW50KSB7XG4gICAgICAgIHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiB3aGVuIHRoZSB0b3VjaEFjdGlvbnMgYXJlIGNvbGxlY3RlZCB0aGV5IGFyZSBub3QgYSB2YWxpZCB2YWx1ZSwgc28gd2UgbmVlZCB0byBjbGVhbiB0aGluZ3MgdXAuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucykge1xuICAgIC8vIG5vbmVcbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpO1xuXG4gICAgLy8gaWYgYm90aCBwYW4teCBhbmQgcGFuLXkgYXJlIHNldCAoZGlmZmVyZW50IHJlY29nbml6ZXJzXG4gICAgLy8gZm9yIGRpZmZlcmVudCBkaXJlY3Rpb25zLCBlLmcuIGhvcml6b250YWwgcGFuIGJ1dCB2ZXJ0aWNhbCBzd2lwZT8pXG4gICAgLy8gd2UgbmVlZCBub25lIChhcyBvdGhlcndpc2Ugd2l0aCBwYW4teCBwYW4teSBjb21iaW5lZCBub25lIG9mIHRoZXNlXG4gICAgLy8gcmVjb2duaXplcnMgd2lsbCB3b3JrLCBzaW5jZSB0aGUgYnJvd3NlciB3b3VsZCBoYW5kbGUgYWxsIHBhbm5pbmdcbiAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICAvLyBwYW4teCBPUiBwYW4teVxuICAgIGlmIChoYXNQYW5YIHx8IGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhblggPyBUT1VDSF9BQ1RJT05fUEFOX1ggOiBUT1VDSF9BQ1RJT05fUEFOX1k7XG4gICAgfVxuXG4gICAgLy8gbWFuaXB1bGF0aW9uXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04pKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OO1xuICAgIH1cblxuICAgIHJldHVybiBUT1VDSF9BQ1RJT05fQVVUTztcbn1cblxuZnVuY3Rpb24gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpIHtcbiAgICBpZiAoIU5BVElWRV9UT1VDSF9BQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdG91Y2hNYXAgPSB7fTtcbiAgICB2YXIgY3NzU3VwcG9ydHMgPSB3aW5kb3cuQ1NTICYmIHdpbmRvdy5DU1Muc3VwcG9ydHM7XG4gICAgWydhdXRvJywgJ21hbmlwdWxhdGlvbicsICdwYW4teScsICdwYW4teCcsICdwYW4teCBwYW4teScsICdub25lJ10uZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcblxuICAgICAgICAvLyBJZiBjc3Muc3VwcG9ydHMgaXMgbm90IHN1cHBvcnRlZCBidXQgdGhlcmUgaXMgbmF0aXZlIHRvdWNoLWFjdGlvbiBhc3N1bWUgaXQgc3VwcG9ydHNcbiAgICAgICAgLy8gYWxsIHZhbHVlcy4gVGhpcyBpcyB0aGUgY2FzZSBmb3IgSUUgMTAgYW5kIDExLlxuICAgICAgICB0b3VjaE1hcFt2YWxdID0gY3NzU3VwcG9ydHMgPyB3aW5kb3cuQ1NTLnN1cHBvcnRzKCd0b3VjaC1hY3Rpb24nLCB2YWwpIDogdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG91Y2hNYXA7XG59XG5cbi8qKlxuICogUmVjb2duaXplciBmbG93IGV4cGxhaW5lZDsgKlxuICogQWxsIHJlY29nbml6ZXJzIGhhdmUgdGhlIGluaXRpYWwgc3RhdGUgb2YgUE9TU0lCTEUgd2hlbiBhIGlucHV0IHNlc3Npb24gc3RhcnRzLlxuICogVGhlIGRlZmluaXRpb24gb2YgYSBpbnB1dCBzZXNzaW9uIGlzIGZyb20gdGhlIGZpcnN0IGlucHV0IHVudGlsIHRoZSBsYXN0IGlucHV0LCB3aXRoIGFsbCBpdCdzIG1vdmVtZW50IGluIGl0LiAqXG4gKiBFeGFtcGxlIHNlc3Npb24gZm9yIG1vdXNlLWlucHV0OiBtb3VzZWRvd24gLT4gbW91c2Vtb3ZlIC0+IG1vdXNldXBcbiAqXG4gKiBPbiBlYWNoIHJlY29nbml6aW5nIGN5Y2xlIChzZWUgTWFuYWdlci5yZWNvZ25pemUpIHRoZSAucmVjb2duaXplKCkgbWV0aG9kIGlzIGV4ZWN1dGVkXG4gKiB3aGljaCBkZXRlcm1pbmVzIHdpdGggc3RhdGUgaXQgc2hvdWxkIGJlLlxuICpcbiAqIElmIHRoZSByZWNvZ25pemVyIGhhcyB0aGUgc3RhdGUgRkFJTEVELCBDQU5DRUxMRUQgb3IgUkVDT0dOSVpFRCAoZXF1YWxzIEVOREVEKSwgaXQgaXMgcmVzZXQgdG9cbiAqIFBPU1NJQkxFIHRvIGdpdmUgaXQgYW5vdGhlciBjaGFuZ2Ugb24gdGhlIG5leHQgY3ljbGUuXG4gKlxuICogICAgICAgICAgICAgICBQb3NzaWJsZVxuICogICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICstLS0tLSstLS0tLS0tLS0tLS0tLS0rXG4gKiAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICstLS0tLSstLS0tLSsgICAgICAgICAgICAgICB8XG4gKiAgICAgIHwgICAgICAgICAgIHwgICAgICAgICAgICAgICB8XG4gKiAgIEZhaWxlZCAgICAgIENhbmNlbGxlZCAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0rLS0tLS0tK1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgIFJlY29nbml6ZWQgICAgICAgQmVnYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZGVkL1JlY29nbml6ZWRcbiAqL1xudmFyIFNUQVRFX1BPU1NJQkxFID0gMTtcbnZhciBTVEFURV9CRUdBTiA9IDI7XG52YXIgU1RBVEVfQ0hBTkdFRCA9IDQ7XG52YXIgU1RBVEVfRU5ERUQgPSA4O1xudmFyIFNUQVRFX1JFQ09HTklaRUQgPSBTVEFURV9FTkRFRDtcbnZhciBTVEFURV9DQU5DRUxMRUQgPSAxNjtcbnZhciBTVEFURV9GQUlMRUQgPSAzMjtcblxuLyoqXG4gKiBSZWNvZ25pemVyXG4gKiBFdmVyeSByZWNvZ25pemVyIG5lZWRzIHRvIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIFJlY29nbml6ZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLmlkID0gdW5pcXVlSWQoKTtcblxuICAgIHRoaXMubWFuYWdlciA9IG51bGw7XG5cbiAgICAvLyBkZWZhdWx0IGlzIGVuYWJsZSB0cnVlXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZSA9IGlmVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5lbmFibGUsIHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuXG4gICAgdGhpcy5zaW11bHRhbmVvdXMgPSB7fTtcbiAgICB0aGlzLnJlcXVpcmVGYWlsID0gW107XG59XG5cblJlY29nbml6ZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBkZWZhdWx0czoge30sXG5cbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7UmVjb2duaXplcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gYWxzbyB1cGRhdGUgdGhlIHRvdWNoQWN0aW9uLCBpbiBjYXNlIHNvbWV0aGluZyBjaGFuZ2VkIGFib3V0IHRoZSBkaXJlY3Rpb25zL2VuYWJsZWQgc3RhdGVcbiAgICAgICAgdGhpcy5tYW5hZ2VyICYmIHRoaXMubWFuYWdlci50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2ltdWx0YW5lb3VzID0gdGhpcy5zaW11bHRhbmVvdXM7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKCFzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSkge1xuICAgICAgICAgICAgc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0gPSBvdGhlclJlY29nbml6ZXI7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVjb2duaXplV2l0aCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgc2ltdWx0YW5lb3VzIGxpbmsuIGl0IGRvZXNudCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBkZWxldGUgdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZXIgY2FuIG9ubHkgcnVuIHdoZW4gYW4gb3RoZXIgaXMgZmFpbGluZ1xuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXF1aXJlRmFpbCA9IHRoaXMucmVxdWlyZUZhaWw7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKGluQXJyYXkocmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcikgPT09IC0xKSB7XG4gICAgICAgICAgICByZXF1aXJlRmFpbC5wdXNoKG90aGVyUmVjb2duaXplcik7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHJlcXVpcmVGYWlsdXJlIGxpbmsuIGl0IGRvZXMgbm90IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheSh0aGlzLnJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1aXJlRmFpbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBoYXMgcmVxdWlyZSBmYWlsdXJlcyBib29sZWFuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzUmVxdWlyZUZhaWx1cmVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoID4gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaWYgdGhlIHJlY29nbml6ZXIgY2FuIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5SZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogWW91IHNob3VsZCB1c2UgYHRyeUVtaXRgIGluc3RlYWQgb2YgYGVtaXRgIGRpcmVjdGx5IHRvIGNoZWNrXG4gICAgICogdGhhdCBhbGwgdGhlIG5lZWRlZCByZWNvZ25pemVycyBoYXMgZmFpbGVkIGJlZm9yZSBlbWl0dGluZy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5tYW5hZ2VyLmVtaXQoZXZlbnQsIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICdwYW5zdGFydCcgYW5kICdwYW5tb3ZlJ1xuICAgICAgICBpZiAoc3RhdGUgPCBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQpOyAvLyBzaW1wbGUgJ2V2ZW50TmFtZScgZXZlbnRzXG5cbiAgICAgICAgaWYgKGlucHV0LmFkZGl0aW9uYWxFdmVudCkgeyAvLyBhZGRpdGlvbmFsIGV2ZW50KHBhbmxlZnQsIHBhbnJpZ2h0LCBwaW5jaGluLCBwaW5jaG91dC4uLilcbiAgICAgICAgICAgIGVtaXQoaW5wdXQuYWRkaXRpb25hbEV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBhbmVuZCBhbmQgcGFuY2FuY2VsXG4gICAgICAgIGlmIChzdGF0ZSA+PSBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoYXQgYWxsIHRoZSByZXF1aXJlIGZhaWx1cmUgcmVjb2duaXplcnMgaGFzIGZhaWxlZCxcbiAgICAgKiBpZiB0cnVlLCBpdCBlbWl0cyBhIGdlc3R1cmUgZXZlbnQsXG4gICAgICogb3RoZXJ3aXNlLCBzZXR1cCB0aGUgc3RhdGUgdG8gRkFJTEVELlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHRyeUVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLmNhbkVtaXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaXQncyBmYWlsaW5nIGFueXdheVxuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYW4gd2UgZW1pdD9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5FbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLnJlcXVpcmVGYWlsW2ldLnN0YXRlICYgKFNUQVRFX0ZBSUxFRCB8IFNUQVRFX1BPU1NJQkxFKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSB0aGUgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICAvLyBtYWtlIGEgbmV3IGNvcHkgb2YgdGhlIGlucHV0RGF0YVxuICAgICAgICAvLyBzbyB3ZSBjYW4gY2hhbmdlIHRoZSBpbnB1dERhdGEgd2l0aG91dCBtZXNzaW5nIHVwIHRoZSBvdGhlciByZWNvZ25pemVyc1xuICAgICAgICB2YXIgaW5wdXREYXRhQ2xvbmUgPSBhc3NpZ24oe30sIGlucHV0RGF0YSk7XG5cbiAgICAgICAgLy8gaXMgaXMgZW5hYmxlZCBhbmQgYWxsb3cgcmVjb2duaXppbmc/XG4gICAgICAgIGlmICghYm9vbE9yRm4odGhpcy5vcHRpb25zLmVuYWJsZSwgW3RoaXMsIGlucHV0RGF0YUNsb25lXSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCB3aGVuIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9SRUNPR05JWkVEIHwgU1RBVEVfQ0FOQ0VMTEVEIHwgU1RBVEVfRkFJTEVEKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucHJvY2VzcyhpbnB1dERhdGFDbG9uZSk7XG5cbiAgICAgICAgLy8gdGhlIHJlY29nbml6ZXIgaGFzIHJlY29nbml6ZWQgYSBnZXN0dXJlXG4gICAgICAgIC8vIHNvIHRyaWdnZXIgYW4gZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQgfCBTVEFURV9DQU5DRUxMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnRyeUVtaXQoaW5wdXREYXRhQ2xvbmUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgc3RhdGUgb2YgdGhlIHJlY29nbml6ZXJcbiAgICAgKiB0aGUgYWN0dWFsIHJlY29nbml6aW5nIGhhcHBlbnMgaW4gdGhpcyBtZXRob2RcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKiBAcmV0dXJucyB7Q29uc3R9IFNUQVRFXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXREYXRhKSB7IH0sIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBwcmVmZXJyZWQgdG91Y2gtYWN0aW9uXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbGVkIHdoZW4gdGhlIGdlc3R1cmUgaXNuJ3QgYWxsb3dlZCB0byByZWNvZ25pemVcbiAgICAgKiBsaWtlIHdoZW4gYW5vdGhlciBpcyBiZWluZyByZWNvZ25pemVkIG9yIGl0IGlzIGRpc2FibGVkXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICByZXNldDogZnVuY3Rpb24oKSB7IH1cbn07XG5cbi8qKlxuICogZ2V0IGEgdXNhYmxlIHN0cmluZywgdXNlZCBhcyBldmVudCBwb3N0Zml4XG4gKiBAcGFyYW0ge0NvbnN0fSBzdGF0ZVxuICogQHJldHVybnMge1N0cmluZ30gc3RhdGVcbiAqL1xuZnVuY3Rpb24gc3RhdGVTdHIoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgJiBTVEFURV9DQU5DRUxMRUQpIHtcbiAgICAgICAgcmV0dXJuICdjYW5jZWwnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9FTkRFRCkge1xuICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0NIQU5HRUQpIHtcbiAgICAgICAgcmV0dXJuICdtb3ZlJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQkVHQU4pIHtcbiAgICAgICAgcmV0dXJuICdzdGFydCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBkaXJlY3Rpb24gY29ucyB0byBzdHJpbmdcbiAqIEBwYXJhbSB7Q29uc3R9IGRpcmVjdGlvblxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGlyZWN0aW9uU3RyKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0RPV04pIHtcbiAgICAgICAgcmV0dXJuICdkb3duJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fVVApIHtcbiAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0xFRlQpIHtcbiAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fUklHSFQpIHtcbiAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBnZXQgYSByZWNvZ25pemVyIGJ5IG5hbWUgaWYgaXQgaXMgYm91bmQgdG8gYSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSBvdGhlclJlY29nbml6ZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICogQHJldHVybnMge1JlY29nbml6ZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCByZWNvZ25pemVyKSB7XG4gICAgdmFyIG1hbmFnZXIgPSByZWNvZ25pemVyLm1hbmFnZXI7XG4gICAgaWYgKG1hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXIuZ2V0KG90aGVyUmVjb2duaXplcik7XG4gICAgfVxuICAgIHJldHVybiBvdGhlclJlY29nbml6ZXI7XG59XG5cbi8qKlxuICogVGhpcyByZWNvZ25pemVyIGlzIGp1c3QgdXNlZCBhcyBhIGJhc2UgZm9yIHRoZSBzaW1wbGUgYXR0cmlidXRlIHJlY29nbml6ZXJzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIEF0dHJSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChBdHRyUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGVjayBpZiBpdCB0aGUgcmVjb2duaXplciByZWNlaXZlcyB2YWxpZCBpbnB1dCwgbGlrZSBpbnB1dC5kaXN0YW5jZSA+IDEwLlxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSByZWNvZ25pemVkXG4gICAgICovXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25Qb2ludGVycyA9IHRoaXMub3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgcmV0dXJuIG9wdGlvblBvaW50ZXJzID09PSAwIHx8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9uUG9pbnRlcnM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIGlucHV0IGFuZCByZXR1cm4gdGhlIHN0YXRlIGZvciB0aGUgcmVjb2duaXplclxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHsqfSBTdGF0ZVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBpbnB1dC5ldmVudFR5cGU7XG5cbiAgICAgICAgdmFyIGlzUmVjb2duaXplZCA9IHN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5hdHRyVGVzdChpbnB1dCk7XG5cbiAgICAgICAgLy8gb24gY2FuY2VsIGlucHV0IGFuZCB3ZSd2ZSByZWNvZ25pemVkIGJlZm9yZSwgcmV0dXJuIFNUQVRFX0NBTkNFTExFRFxuICAgICAgICBpZiAoaXNSZWNvZ25pemVkICYmIChldmVudFR5cGUgJiBJTlBVVF9DQU5DRUwgfHwgIWlzVmFsaWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DQU5DRUxMRUQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNSZWNvZ25pemVkIHx8IGlzVmFsaWQpIHtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9FTkRFRDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShzdGF0ZSAmIFNUQVRFX0JFR0FOKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NIQU5HRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQYW5cbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGFuZCBtb3ZlZCBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBhblJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucFggPSBudWxsO1xuICAgIHRoaXMucFkgPSBudWxsO1xufVxuXG5pbmhlcml0KFBhblJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQYW5SZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwYW4nLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fQUxMXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSxcblxuICAgIGRpcmVjdGlvblRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgaGFzTW92ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSBpbnB1dC5kaXN0YW5jZTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0LmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHZhciB5ID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIC8vIGxvY2sgdG8gYXhpcz9cbiAgICAgICAgaWYgKCEoZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh4ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHggPCAwKSA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geCAhPSB0aGlzLnBYO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFYKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHkgPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeSA8IDApID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB5ICE9IHRoaXMucFk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGhhc01vdmVkICYmIGRpc3RhbmNlID4gb3B0aW9ucy50aHJlc2hvbGQgJiYgZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gQXR0clJlY29nbml6ZXIucHJvdG90eXBlLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOIHx8ICghKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTikgJiYgdGhpcy5kaXJlY3Rpb25UZXN0KGlucHV0KSkpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuXG4gICAgICAgIHRoaXMucFggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHRoaXMucFkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5kaXJlY3Rpb24pO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBpbmNoXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlcnMgYXJlIG1vdmluZyB0b3dhcmQgKHpvb20taW4pIG9yIGF3YXkgZnJvbSBlYWNoIG90aGVyICh6b29tLW91dCkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBpbmNoUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFBpbmNoUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGluY2gnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5zY2FsZSAtIDEpID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQuc2NhbGUgIT09IDEpIHtcbiAgICAgICAgICAgIHZhciBpbk91dCA9IGlucHV0LnNjYWxlIDwgMSA/ICdpbicgOiAnb3V0JztcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGluT3V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUHJlc3NcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGZvciB4IG1zIHdpdGhvdXQgYW55IG1vdmVtZW50LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFByZXNzUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xufVxuXG5pbmhlcml0KFByZXNzUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUHJlc3NSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwcmVzcycsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0aW1lOiAyNTEsIC8vIG1pbmltYWwgdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBwcmVzc2VkXG4gICAgICAgIHRocmVzaG9sZDogOSAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX0FVVE9dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVGltZSA9IGlucHV0LmRlbHRhVGltZSA+IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKCF2YWxpZE1vdmVtZW50IHx8ICF2YWxpZFBvaW50ZXJzIHx8IChpbnB1dC5ldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAhdmFsaWRUaW1lKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgfSwgb3B0aW9ucy50aW1lLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dCAmJiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgJ3VwJywgaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFJvdGF0ZVxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXIgYXJlIG1vdmluZyBpbiBhIGNpcmN1bGFyIG1vdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUm90YXRlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFJvdGF0ZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBSb3RhdGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdyb3RhdGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5yb3RhdGlvbikgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfVxufSk7XG5cbi8qKlxuICogU3dpcGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBtb3ZpbmcgZmFzdCAodmVsb2NpdHkpLCB3aXRoIGVub3VnaCBkaXN0YW5jZSBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFN3aXBlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFN3aXBlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFN3aXBlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAnc3dpcGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICB2ZWxvY2l0eTogMC4zLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBQYW5SZWNvZ25pemVyLnByb3RvdHlwZS5nZXRUb3VjaEFjdGlvbi5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciB2ZWxvY2l0eTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgKERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgZGlyZWN0aW9uICYgaW5wdXQub2Zmc2V0RGlyZWN0aW9uICYmXG4gICAgICAgICAgICBpbnB1dC5kaXN0YW5jZSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgJiZcbiAgICAgICAgICAgIGlucHV0Lm1heFBvaW50ZXJzID09IHRoaXMub3B0aW9ucy5wb2ludGVycyAmJlxuICAgICAgICAgICAgYWJzKHZlbG9jaXR5KSA+IHRoaXMub3B0aW9ucy52ZWxvY2l0eSAmJiBpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQ7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQub2Zmc2V0RGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uLCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBBIHRhcCBpcyBlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb2luZyBhIHNtYWxsIHRhcC9jbGljay4gTXVsdGlwbGUgdGFwcyBhcmUgcmVjb2duaXplZCBpZiB0aGV5IG9jY3VyXG4gKiBiZXR3ZWVuIHRoZSBnaXZlbiBpbnRlcnZhbCBhbmQgcG9zaXRpb24uIFRoZSBkZWxheSBvcHRpb24gY2FuIGJlIHVzZWQgdG8gcmVjb2duaXplIG11bHRpLXRhcHMgd2l0aG91dCBmaXJpbmdcbiAqIGEgc2luZ2xlIHRhcC5cbiAqXG4gKiBUaGUgZXZlbnREYXRhIGZyb20gdGhlIGVtaXR0ZWQgZXZlbnQgY29udGFpbnMgdGhlIHByb3BlcnR5IGB0YXBDb3VudGAsIHdoaWNoIGNvbnRhaW5zIHRoZSBhbW91bnQgb2ZcbiAqIG11bHRpLXRhcHMgYmVpbmcgcmVjb2duaXplZC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBUYXBSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIHByZXZpb3VzIHRpbWUgYW5kIGNlbnRlcixcbiAgICAvLyB1c2VkIGZvciB0YXAgY291bnRpbmdcbiAgICB0aGlzLnBUaW1lID0gZmFsc2U7XG4gICAgdGhpcy5wQ2VudGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xuICAgIHRoaXMuY291bnQgPSAwO1xufVxuXG5pbmhlcml0KFRhcFJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAndGFwJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRhcHM6IDEsXG4gICAgICAgIGludGVydmFsOiAzMDAsIC8vIG1heCB0aW1lIGJldHdlZW4gdGhlIG11bHRpLXRhcCB0YXBzXG4gICAgICAgIHRpbWU6IDI1MCwgLy8gbWF4IHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgZG93biAobGlrZSBmaW5nZXIgb24gdGhlIHNjcmVlbilcbiAgICAgICAgdGhyZXNob2xkOiA5LCAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgICAgICBwb3NUaHJlc2hvbGQ6IDEwIC8vIGEgbXVsdGktdGFwIGNhbiBiZSBhIGJpdCBvZmYgdGhlIGluaXRpYWwgcG9zaXRpb25cbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9NQU5JUFVMQVRJT05dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgIGlmICgoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpICYmICh0aGlzLmNvdW50ID09PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKHZhbGlkTW92ZW1lbnQgJiYgdmFsaWRUb3VjaFRpbWUgJiYgdmFsaWRQb2ludGVycykge1xuICAgICAgICAgICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsaWRJbnRlcnZhbCA9IHRoaXMucFRpbWUgPyAoaW5wdXQudGltZVN0YW1wIC0gdGhpcy5wVGltZSA8IG9wdGlvbnMuaW50ZXJ2YWwpIDogdHJ1ZTtcbiAgICAgICAgICAgIHZhciB2YWxpZE11bHRpVGFwID0gIXRoaXMucENlbnRlciB8fCBnZXREaXN0YW5jZSh0aGlzLnBDZW50ZXIsIGlucHV0LmNlbnRlcikgPCBvcHRpb25zLnBvc1RocmVzaG9sZDtcblxuICAgICAgICAgICAgdGhpcy5wVGltZSA9IGlucHV0LnRpbWVTdGFtcDtcbiAgICAgICAgICAgIHRoaXMucENlbnRlciA9IGlucHV0LmNlbnRlcjtcblxuICAgICAgICAgICAgaWYgKCF2YWxpZE11bHRpVGFwIHx8ICF2YWxpZEludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAgICAgLy8gaWYgdGFwIGNvdW50IG1hdGNoZXMgd2UgaGF2ZSByZWNvZ25pemVkIGl0LFxuICAgICAgICAgICAgLy8gZWxzZSBpdCBoYXMgYmVnYW4gcmVjb2duaXppbmcuLi5cbiAgICAgICAgICAgIHZhciB0YXBDb3VudCA9IHRoaXMuY291bnQgJSBvcHRpb25zLnRhcHM7XG4gICAgICAgICAgICBpZiAodGFwQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBubyBmYWlsaW5nIHJlcXVpcmVtZW50cywgaW1tZWRpYXRlbHkgdHJpZ2dlciB0aGUgdGFwIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gb3Igd2FpdCBhcyBsb25nIGFzIHRoZSBtdWx0aXRhcCBpbnRlcnZhbCB0byB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1JlcXVpcmVGYWlsdXJlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICBmYWlsVGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50YXBDb3VudCA9IHRoaXMuY291bnQ7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFNpbXBsZSB3YXkgdG8gY3JlYXRlIGEgbWFuYWdlciB3aXRoIGEgZGVmYXVsdCBzZXQgb2YgcmVjb2duaXplcnMuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGFtbWVyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnJlY29nbml6ZXJzID0gaWZVbmRlZmluZWQob3B0aW9ucy5yZWNvZ25pemVycywgSGFtbWVyLmRlZmF1bHRzLnByZXNldCk7XG4gICAgcmV0dXJuIG5ldyBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEBjb25zdCB7c3RyaW5nfVxuICovXG5IYW1tZXIuVkVSU0lPTiA9ICcyLjAuNyc7XG5cbi8qKlxuICogZGVmYXVsdCBzZXR0aW5nc1xuICogQG5hbWVzcGFjZVxuICovXG5IYW1tZXIuZGVmYXVsdHMgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IGlmIERPTSBldmVudHMgYXJlIGJlaW5nIHRyaWdnZXJlZC5cbiAgICAgKiBCdXQgdGhpcyBpcyBzbG93ZXIgYW5kIHVudXNlZCBieSBzaW1wbGUgaW1wbGVtZW50YXRpb25zLCBzbyBkaXNhYmxlZCBieSBkZWZhdWx0LlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZG9tRXZlbnRzOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5L2ZhbGxiYWNrLlxuICAgICAqIFdoZW4gc2V0IHRvIGBjb21wdXRlYCBpdCB3aWxsIG1hZ2ljYWxseSBzZXQgdGhlIGNvcnJlY3QgdmFsdWUgYmFzZWQgb24gdGhlIGFkZGVkIHJlY29nbml6ZXJzLlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgY29tcHV0ZVxuICAgICAqL1xuICAgIHRvdWNoQWN0aW9uOiBUT1VDSF9BQ1RJT05fQ09NUFVURSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGU6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBFWFBFUklNRU5UQUwgRkVBVFVSRSAtLSBjYW4gYmUgcmVtb3ZlZC9jaGFuZ2VkXG4gICAgICogQ2hhbmdlIHRoZSBwYXJlbnQgaW5wdXQgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICogSWYgTnVsbCwgdGhlbiBpdCBpcyBiZWluZyBzZXQgdGhlIHRvIG1haW4gZWxlbWVudC5cbiAgICAgKiBAdHlwZSB7TnVsbHxFdmVudFRhcmdldH1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRUYXJnZXQ6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBmb3JjZSBhbiBpbnB1dCBjbGFzc1xuICAgICAqIEB0eXBlIHtOdWxsfEZ1bmN0aW9ufVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dENsYXNzOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCByZWNvZ25pemVyIHNldHVwIHdoZW4gY2FsbGluZyBgSGFtbWVyKClgXG4gICAgICogV2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyIHRoZXNlIHdpbGwgYmUgc2tpcHBlZC5cbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgcHJlc2V0OiBbXG4gICAgICAgIC8vIFJlY29nbml6ZXJDbGFzcywgb3B0aW9ucywgW3JlY29nbml6ZVdpdGgsIC4uLl0sIFtyZXF1aXJlRmFpbHVyZSwgLi4uXVxuICAgICAgICBbUm90YXRlUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9XSxcbiAgICAgICAgW1BpbmNoUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9LCBbJ3JvdGF0ZSddXSxcbiAgICAgICAgW1N3aXBlUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9XSxcbiAgICAgICAgW1BhblJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfSwgWydzd2lwZSddXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXJdLFxuICAgICAgICBbVGFwUmVjb2duaXplciwge2V2ZW50OiAnZG91YmxldGFwJywgdGFwczogMn0sIFsndGFwJ11dLFxuICAgICAgICBbUHJlc3NSZWNvZ25pemVyXVxuICAgIF0sXG5cbiAgICAvKipcbiAgICAgKiBTb21lIENTUyBwcm9wZXJ0aWVzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgdGhlIHdvcmtpbmcgb2YgSGFtbWVyLlxuICAgICAqIEFkZCB0aGVtIHRvIHRoaXMgbWV0aG9kIGFuZCB0aGV5IHdpbGwgYmUgc2V0IHdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlci5cbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgY3NzUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRleHQgc2VsZWN0aW9uIHRvIGltcHJvdmUgdGhlIGRyYWdnaW5nIGdlc3R1cmUuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgdGhlIFdpbmRvd3MgUGhvbmUgZ3JpcHBlcnMgd2hlbiBwcmVzc2luZyBhbiBlbGVtZW50LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRoZSBkZWZhdWx0IGNhbGxvdXQgc2hvd24gd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQuXG4gICAgICAgICAqIE9uIGlPUywgd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQgc3VjaCBhcyBhIGxpbmssIFNhZmFyaSBkaXNwbGF5c1xuICAgICAgICAgKiBhIGNhbGxvdXQgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbGluay4gVGhpcyBwcm9wZXJ0eSBhbGxvd3MgeW91IHRvIGRpc2FibGUgdGhhdCBjYWxsb3V0LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoQ2FsbG91dDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB6b29taW5nIGlzIGVuYWJsZWQuIFVzZWQgYnkgSUUxMD5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICBjb250ZW50Wm9vbWluZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgdGhhdCBhbiBlbnRpcmUgZWxlbWVudCBzaG91bGQgYmUgZHJhZ2dhYmxlIGluc3RlYWQgb2YgaXRzIGNvbnRlbnRzLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlckRyYWc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3ZlcnJpZGVzIHRoZSBoaWdobGlnaHQgY29sb3Igc2hvd24gd2hlbiB0aGUgdXNlciB0YXBzIGEgbGluayBvciBhIEphdmFTY3JpcHRcbiAgICAgICAgICogY2xpY2thYmxlIGVsZW1lbnQgaW4gaU9TLiBUaGlzIHByb3BlcnR5IG9iZXlzIHRoZSBhbHBoYSB2YWx1ZSwgaWYgc3BlY2lmaWVkLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAncmdiYSgwLDAsMCwwKSdcbiAgICAgICAgICovXG4gICAgICAgIHRhcEhpZ2hsaWdodENvbG9yOiAncmdiYSgwLDAsMCwwKSdcbiAgICB9XG59O1xuXG52YXIgU1RPUCA9IDE7XG52YXIgRk9SQ0VEX1NUT1AgPSAyO1xuXG4vKipcbiAqIE1hbmFnZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIEhhbW1lci5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgPSB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgfHwgZWxlbWVudDtcblxuICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICB0aGlzLnJlY29nbml6ZXJzID0gW107XG4gICAgdGhpcy5vbGRDc3NQcm9wcyA9IHt9O1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmlucHV0ID0gY3JlYXRlSW5wdXRJbnN0YW5jZSh0aGlzKTtcbiAgICB0aGlzLnRvdWNoQWN0aW9uID0gbmV3IFRvdWNoQWN0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy50b3VjaEFjdGlvbik7XG5cbiAgICB0b2dnbGVDc3NQcm9wcyh0aGlzLCB0cnVlKTtcblxuICAgIGVhY2godGhpcy5vcHRpb25zLnJlY29nbml6ZXJzLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciByZWNvZ25pemVyID0gdGhpcy5hZGQobmV3IChpdGVtWzBdKShpdGVtWzFdKSk7XG4gICAgICAgIGl0ZW1bMl0gJiYgcmVjb2duaXplci5yZWNvZ25pemVXaXRoKGl0ZW1bMl0pO1xuICAgICAgICBpdGVtWzNdICYmIHJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUoaXRlbVszXSk7XG4gICAgfSwgdGhpcyk7XG59XG5cbk1hbmFnZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gT3B0aW9ucyB0aGF0IG5lZWQgYSBsaXR0bGUgbW9yZSBzZXR1cFxuICAgICAgICBpZiAob3B0aW9ucy50b3VjaEFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnB1dFRhcmdldCkge1xuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXJzIGFuZCByZWluaXRpYWxpemVcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC50YXJnZXQgPSBvcHRpb25zLmlucHV0VGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHN0b3AgcmVjb2duaXppbmcgZm9yIHRoaXMgc2Vzc2lvbi5cbiAgICAgKiBUaGlzIHNlc3Npb24gd2lsbCBiZSBkaXNjYXJkZWQsIHdoZW4gYSBuZXcgW2lucHV0XXN0YXJ0IGV2ZW50IGlzIGZpcmVkLlxuICAgICAqIFdoZW4gZm9yY2VkLCB0aGUgcmVjb2duaXplciBjeWNsZSBpcyBzdG9wcGVkIGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlXVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uKGZvcmNlKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zdG9wcGVkID0gZm9yY2UgPyBGT1JDRURfU1RPUCA6IFNUT1A7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJ1biB0aGUgcmVjb2duaXplcnMhXG4gICAgICogY2FsbGVkIGJ5IHRoZSBpbnB1dEhhbmRsZXIgZnVuY3Rpb24gb24gZXZlcnkgbW92ZW1lbnQgb2YgdGhlIHBvaW50ZXJzICh0b3VjaGVzKVxuICAgICAqIGl0IHdhbGtzIHRocm91Z2ggYWxsIHRoZSByZWNvZ25pemVycyBhbmQgdHJpZXMgdG8gZGV0ZWN0IHRoZSBnZXN0dXJlIHRoYXQgaXMgYmVpbmcgbWFkZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbjtcbiAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcnVuIHRoZSB0b3VjaC1hY3Rpb24gcG9seWZpbGxcbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi5wcmV2ZW50RGVmYXVsdHMoaW5wdXREYXRhKTtcblxuICAgICAgICB2YXIgcmVjb2duaXplcjtcbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcblxuICAgICAgICAvLyB0aGlzIGhvbGRzIHRoZSByZWNvZ25pemVyIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgLy8gc28gdGhlIHJlY29nbml6ZXIncyBzdGF0ZSBuZWVkcyB0byBiZSBCRUdBTiwgQ0hBTkdFRCwgRU5ERUQgb3IgUkVDT0dOSVpFRFxuICAgICAgICAvLyBpZiBubyByZWNvZ25pemVyIGlzIGRldGVjdGluZyBhIHRoaW5nLCBpdCBpcyBzZXQgdG8gYG51bGxgXG4gICAgICAgIHZhciBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyO1xuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gdGhlIGxhc3QgcmVjb2duaXplciBpcyByZWNvZ25pemVkXG4gICAgICAgIC8vIG9yIHdoZW4gd2UncmUgaW4gYSBuZXcgc2Vzc2lvblxuICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgfHwgKGN1clJlY29nbml6ZXIgJiYgY3VyUmVjb2duaXplci5zdGF0ZSAmIFNUQVRFX1JFQ09HTklaRUQpKSB7XG4gICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCByZWNvZ25pemVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlY29nbml6ZXIgPSByZWNvZ25pemVyc1tpXTtcblxuICAgICAgICAgICAgLy8gZmluZCBvdXQgaWYgd2UgYXJlIGFsbG93ZWQgdHJ5IHRvIHJlY29nbml6ZSB0aGUgaW5wdXQgZm9yIHRoaXMgb25lLlxuICAgICAgICAgICAgLy8gMS4gICBhbGxvdyBpZiB0aGUgc2Vzc2lvbiBpcyBOT1QgZm9yY2VkIHN0b3BwZWQgKHNlZSB0aGUgLnN0b3AoKSBtZXRob2QpXG4gICAgICAgICAgICAvLyAyLiAgIGFsbG93IGlmIHdlIHN0aWxsIGhhdmVuJ3QgcmVjb2duaXplZCBhIGdlc3R1cmUgaW4gdGhpcyBzZXNzaW9uLCBvciB0aGUgdGhpcyByZWNvZ25pemVyIGlzIHRoZSBvbmVcbiAgICAgICAgICAgIC8vICAgICAgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAgICAgLy8gMy4gICBhbGxvdyBpZiB0aGUgcmVjb2duaXplciBpcyBhbGxvd2VkIHRvIHJ1biBzaW11bHRhbmVvdXMgd2l0aCB0aGUgY3VycmVudCByZWNvZ25pemVkIHJlY29nbml6ZXIuXG4gICAgICAgICAgICAvLyAgICAgIHRoaXMgY2FuIGJlIHNldHVwIHdpdGggdGhlIGByZWNvZ25pemVXaXRoKClgIG1ldGhvZCBvbiB0aGUgcmVjb2duaXplci5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQgIT09IEZPUkNFRF9TVE9QICYmICggLy8gMVxuICAgICAgICAgICAgICAgICAgICAhY3VyUmVjb2duaXplciB8fCByZWNvZ25pemVyID09IGN1clJlY29nbml6ZXIgfHwgLy8gMlxuICAgICAgICAgICAgICAgICAgICByZWNvZ25pemVyLmNhblJlY29nbml6ZVdpdGgoY3VyUmVjb2duaXplcikpKSB7IC8vIDNcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlY29nbml6ZShpbnB1dERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSByZWNvZ25pemVyIGhhcyBiZWVuIHJlY29nbml6aW5nIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGdlc3R1cmUsIHdlIHdhbnQgdG8gc3RvcmUgdGhpcyBvbmUgYXMgdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IGFjdGl2ZSByZWNvZ25pemVyLiBidXQgb25seSBpZiB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgYW4gYWN0aXZlIHJlY29nbml6ZXJcbiAgICAgICAgICAgIGlmICghY3VyUmVjb2duaXplciAmJiByZWNvZ25pemVyLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEKSkge1xuICAgICAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSByZWNvZ25pemVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldCBhIHJlY29nbml6ZXIgYnkgaXRzIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE51bGx9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChyZWNvZ25pemVyIGluc3RhbmNlb2YgUmVjb2duaXplcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY29nbml6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVjb2duaXplcnNbaV0ub3B0aW9ucy5ldmVudCA9PSByZWNvZ25pemVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBhZGQgYSByZWNvZ25pemVyIHRvIHRoZSBtYW5hZ2VyXG4gICAgICogZXhpc3RpbmcgcmVjb2duaXplcnMgd2l0aCB0aGUgc2FtZSBldmVudCBuYW1lIHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE1hbmFnZXJ9XG4gICAgICovXG4gICAgYWRkOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAnYWRkJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV4aXN0aW5nXG4gICAgICAgIHZhciBleGlzdGluZyA9IHRoaXMuZ2V0KHJlY29nbml6ZXIub3B0aW9ucy5ldmVudCk7XG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoZXhpc3RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvZ25pemVycy5wdXNoKHJlY29nbml6ZXIpO1xuICAgICAgICByZWNvZ25pemVyLm1hbmFnZXIgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgYSByZWNvZ25pemVyIGJ5IG5hbWUgb3IgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAncmVtb3ZlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjb2duaXplciA9IHRoaXMuZ2V0KHJlY29nbml6ZXIpO1xuXG4gICAgICAgIC8vIGxldCdzIG1ha2Ugc3VyZSB0aGlzIHJlY29nbml6ZXIgZXhpc3RzXG4gICAgICAgIGlmIChyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheShyZWNvZ25pemVycywgcmVjb2duaXplcik7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCBldmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdID0gaGFuZGxlcnNbZXZlbnRdIHx8IFtdO1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIGV2ZW50LCBsZWF2ZSBlbWl0IGJsYW5rIHRvIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2hhbmRsZXJdXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9mZjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdICYmIGhhbmRsZXJzW2V2ZW50XS5zcGxpY2UoaW5BcnJheShoYW5kbGVyc1tldmVudF0sIGhhbmRsZXIpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBlbWl0IGV2ZW50IHRvIHRoZSBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIC8vIHdlIGFsc28gd2FudCB0byB0cmlnZ2VyIGRvbSBldmVudHNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb21FdmVudHMpIHtcbiAgICAgICAgICAgIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBoYW5kbGVycywgc28gc2tpcCBpdCBhbGxcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc1tldmVudF0gJiYgdGhpcy5oYW5kbGVyc1tldmVudF0uc2xpY2UoKTtcbiAgICAgICAgaWYgKCFoYW5kbGVycyB8fCAhaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLnR5cGUgPSBldmVudDtcbiAgICAgICAgZGF0YS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF0YS5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2ldKGRhdGEpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlc3Ryb3kgdGhlIG1hbmFnZXIgYW5kIHVuYmluZHMgYWxsIGV2ZW50c1xuICAgICAqIGl0IGRvZXNuJ3QgdW5iaW5kIGRvbSBldmVudHMsIHRoYXQgaXMgdGhlIHVzZXIgb3duIHJlc3BvbnNpYmlsaXR5XG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCAmJiB0b2dnbGVDc3NQcm9wcyh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgICAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBhZGQvcmVtb3ZlIHRoZSBjc3MgcHJvcGVydGllcyBhcyBkZWZpbmVkIGluIG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wc1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGFkZFxuICovXG5mdW5jdGlvbiB0b2dnbGVDc3NQcm9wcyhtYW5hZ2VyLCBhZGQpIHtcbiAgICB2YXIgZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJvcDtcbiAgICBlYWNoKG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wcywgZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgcHJvcCA9IHByZWZpeGVkKGVsZW1lbnQuc3R5bGUsIG5hbWUpO1xuICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdID0gZWxlbWVudC5zdHlsZVtwcm9wXTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdIHx8ICcnO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhZGQpIHtcbiAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wcyA9IHt9O1xuICAgIH1cbn1cblxuLyoqXG4gKiB0cmlnZ2VyIGRvbSBldmVudFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICovXG5mdW5jdGlvbiB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpIHtcbiAgICB2YXIgZ2VzdHVyZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZ2VzdHVyZUV2ZW50LmluaXRFdmVudChldmVudCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgZ2VzdHVyZUV2ZW50Lmdlc3R1cmUgPSBkYXRhO1xuICAgIGRhdGEudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZ2VzdHVyZUV2ZW50KTtcbn1cblxuYXNzaWduKEhhbW1lciwge1xuICAgIElOUFVUX1NUQVJUOiBJTlBVVF9TVEFSVCxcbiAgICBJTlBVVF9NT1ZFOiBJTlBVVF9NT1ZFLFxuICAgIElOUFVUX0VORDogSU5QVVRfRU5ELFxuICAgIElOUFVUX0NBTkNFTDogSU5QVVRfQ0FOQ0VMLFxuXG4gICAgU1RBVEVfUE9TU0lCTEU6IFNUQVRFX1BPU1NJQkxFLFxuICAgIFNUQVRFX0JFR0FOOiBTVEFURV9CRUdBTixcbiAgICBTVEFURV9DSEFOR0VEOiBTVEFURV9DSEFOR0VELFxuICAgIFNUQVRFX0VOREVEOiBTVEFURV9FTkRFRCxcbiAgICBTVEFURV9SRUNPR05JWkVEOiBTVEFURV9SRUNPR05JWkVELFxuICAgIFNUQVRFX0NBTkNFTExFRDogU1RBVEVfQ0FOQ0VMTEVELFxuICAgIFNUQVRFX0ZBSUxFRDogU1RBVEVfRkFJTEVELFxuXG4gICAgRElSRUNUSU9OX05PTkU6IERJUkVDVElPTl9OT05FLFxuICAgIERJUkVDVElPTl9MRUZUOiBESVJFQ1RJT05fTEVGVCxcbiAgICBESVJFQ1RJT05fUklHSFQ6IERJUkVDVElPTl9SSUdIVCxcbiAgICBESVJFQ1RJT05fVVA6IERJUkVDVElPTl9VUCxcbiAgICBESVJFQ1RJT05fRE9XTjogRElSRUNUSU9OX0RPV04sXG4gICAgRElSRUNUSU9OX0hPUklaT05UQUw6IERJUkVDVElPTl9IT1JJWk9OVEFMLFxuICAgIERJUkVDVElPTl9WRVJUSUNBTDogRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgIERJUkVDVElPTl9BTEw6IERJUkVDVElPTl9BTEwsXG5cbiAgICBNYW5hZ2VyOiBNYW5hZ2VyLFxuICAgIElucHV0OiBJbnB1dCxcbiAgICBUb3VjaEFjdGlvbjogVG91Y2hBY3Rpb24sXG5cbiAgICBUb3VjaElucHV0OiBUb3VjaElucHV0LFxuICAgIE1vdXNlSW5wdXQ6IE1vdXNlSW5wdXQsXG4gICAgUG9pbnRlckV2ZW50SW5wdXQ6IFBvaW50ZXJFdmVudElucHV0LFxuICAgIFRvdWNoTW91c2VJbnB1dDogVG91Y2hNb3VzZUlucHV0LFxuICAgIFNpbmdsZVRvdWNoSW5wdXQ6IFNpbmdsZVRvdWNoSW5wdXQsXG5cbiAgICBSZWNvZ25pemVyOiBSZWNvZ25pemVyLFxuICAgIEF0dHJSZWNvZ25pemVyOiBBdHRyUmVjb2duaXplcixcbiAgICBUYXA6IFRhcFJlY29nbml6ZXIsXG4gICAgUGFuOiBQYW5SZWNvZ25pemVyLFxuICAgIFN3aXBlOiBTd2lwZVJlY29nbml6ZXIsXG4gICAgUGluY2g6IFBpbmNoUmVjb2duaXplcixcbiAgICBSb3RhdGU6IFJvdGF0ZVJlY29nbml6ZXIsXG4gICAgUHJlc3M6IFByZXNzUmVjb2duaXplcixcblxuICAgIG9uOiBhZGRFdmVudExpc3RlbmVycyxcbiAgICBvZmY6IHJlbW92ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGVhY2g6IGVhY2gsXG4gICAgbWVyZ2U6IG1lcmdlLFxuICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGluaGVyaXQ6IGluaGVyaXQsXG4gICAgYmluZEZuOiBiaW5kRm4sXG4gICAgcHJlZml4ZWQ6IHByZWZpeGVkXG59KTtcblxuLy8gdGhpcyBwcmV2ZW50cyBlcnJvcnMgd2hlbiBIYW1tZXIgaXMgbG9hZGVkIGluIHRoZSBwcmVzZW5jZSBvZiBhbiBBTURcbi8vICBzdHlsZSBsb2FkZXIgYnV0IGJ5IHNjcmlwdCB0YWcsIG5vdCBieSB0aGUgbG9hZGVyLlxudmFyIGZyZWVHbG9iYWwgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHt9KSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuZnJlZUdsb2JhbC5IYW1tZXIgPSBIYW1tZXI7XG5cbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBIYW1tZXI7XG4gICAgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEhhbW1lcjtcbn0gZWxzZSB7XG4gICAgd2luZG93W2V4cG9ydE5hbWVdID0gSGFtbWVyO1xufVxuXG59KSh3aW5kb3csIGRvY3VtZW50LCAnSGFtbWVyJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2hhbW1lcmpzL2hhbW1lci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9