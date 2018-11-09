require('hammerjs');

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
      scrollActiveButton(menuWidth, menu)
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
    $('#scroller')
      .on('click', '.left', function () {
        console.log(menuWidth);
        menu.animate({
          scrollLeft: menu.scrollLeft() - (menuWidth / 1.7)
        })
      })
      .on('click', '.right', function () {
        menu.animate({
          scrollLeft: menu.scrollLeft() + (menuWidth / 1.7)
        })
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
    $('#scroller')
      .off('click', '.left')
      .off('click', '.right')
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

  mc
    .on("panstart", function (e) {
      margin = -1 * menu.scrollLeft();
    })
    .on("pan", function (e) {
      var delta = margin + e.deltaX;
      menu.scrollLeft(-1 * delta);
    })
}

