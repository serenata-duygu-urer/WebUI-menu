(function () {
  var menuDetailsTop = 0;
  var setElementPositionAndTop = function (element, top, position) {
    if (element) {
      element.style.top = top;
      element.style.position = position;
    }
  };
  var mobileMenuTrigger = function (trigger, details, menuMain) {
    if (trigger && details) {
      trigger.addEventListener('click', () => {
        if (!details.classList.contains('open')) {
          details.classList.add('open');
          details.classList.remove('close')
          if (menuMain && menuMain.style.position !== 'fixed' && details.classList.contains('open')) {
            setElementPositionAndTop(menuMain, '0px', 'inherit');
            details.style.top = 64 + 'px';
          }
          if (menuMain && menuMain.style.position === 'fixed' && details.classList.contains('open')) {
            details.style.top = (window.scrollY + 64) + 'px';
          }

        } else {
          details.classList.add('close');
          details.classList.remove('open');
          if (menuMain && menuMain.style.position !== 'fixed' && details.classList.contains('close')) {
            menuMain.style.position = 'inherit';
          }
          if (menuMain && menuMain.style.position === 'fixed' && details.classList.contains('close')) {
            menuMain.style.top = '0px';
            details.style.top = '';
          }
        }
      });
    }
  };
  var setMenu = function (menuDetails, menuFlowersDetails, menuPlantDetails) {
    /** Main menu**/
    var menuMain = document.getElementById('menu-main');
    var menuBars = document.getElementById('menu-bars');
    mobileMenuTrigger(menuBars, menuDetails, menuMain);

    /** Flower sub menu**/
    var menuFlowersTrigger = document.getElementById('menu-flowers');
    mobileMenuTrigger(menuFlowersTrigger, menuFlowersDetails, null);

    /** Plant sub menu**/
    var menuPlantTrigger = document.getElementById('menu-plants');
    mobileMenuTrigger(menuPlantTrigger, menuPlantDetails, null);
  };

  var lastScroll = 0;
  var setMenuElementOpen = function (element) {
    if (element) {
      element.classList.add("open");
      element.classList.remove("close");
    }
  };
  var setMenuElementClose = function (element) {
    if (element && element.classList.contains('open')) {
      element.classList.add("close");
      element.classList.remove("open");
      element.style.top = '';
    }
  };
  var makeElementInvisible = function (element) {
    if (element) {
      element.style.display = 'none';
    }
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    if (window.innerWidth <= 1023) {
      var menuMain = document.getElementById('menu-main');
      var menuDetails = document.getElementById('menu-details');
      var menuFlowersDetails = document.getElementById('submenu-flowers');
      var menuPlantDetails = document.getElementById('submenu-plants');
      var menuFlowersDeals = document.getElementById('deal-flower');
      var menuPlantDeals = document.getElementById('deal-plant');

      // make details invisible on first load
      makeElementInvisible(menuFlowersDeals);
      makeElementInvisible(menuPlantDeals);
      setMenu(menuDetails, menuFlowersDetails, menuPlantDetails);
      menuMain.style.position = 'inherit';
      var isScrolledUp = false;
      window.addEventListener("scroll", function () {
        // TODO: fix weird movements on scroll
        var currentScroll = window.scrollY;
        var scrollDiff = currentScroll - lastScroll;
        menuDetails.style.transition = '';
        if (currentScroll === 0) {
          menuMain.style.position = 'inherit';
          if (menuDetails.classList.contains('open')) {
            menuDetails.style.transition = '0s ease';
          }
        }
        else if (scrollDiff > 0) {
          if (isScrolledUp) {
            setElementPositionAndTop(menuMain, (window.scrollY + 'px'), 'absolute');
            setElementPositionAndTop(menuDetails, ((64 + window.scrollY) + 'px'), 'absolute');
          }
          if (menuDetails.classList.contains('open') && menuDetails.style.position === 'fixed') {
            setElementPositionAndTop(menuDetails, ((64 + window.scrollY) + 'px'), 'absolute');
          }
          menuDetailsTop = isScrolledUp ? (64 + window.scrollY) : parseInt(window.getComputedStyle(document.getElementById('menu-details')).getPropertyValue('top'));
          isScrolledUp = false;
          if (menuDetails.classList.contains('open') && (menuDetailsTop) <= window.scrollY - menuDetails.clientHeight) {
            menuMain.style.top = '';
            setMenuElementClose(menuMain);
            setMenuElementClose(menuDetails);
            setMenuElementClose(menuFlowersDetails);
            setMenuElementClose(menuPlantDetails);
          }
          if (!menuDetails.classList.contains('open')) {
            menuMain.style.position = 'fixed';
            setMenuElementClose(menuMain);
          }
          menuDetails.style.position = 'absolute';
        }
        else {
          // scrolled up -- header show
          setMenuElementOpen(menuMain);
          if (menuDetails.classList.contains('open') && menuDetails.getBoundingClientRect().top > 64) {
            isScrolledUp = true;
            setElementPositionAndTop(menuMain, '', 'fixed');
            setElementPositionAndTop(menuDetails, '64px', 'fixed');
          }
        }
        lastScroll = currentScroll;
      });
    }
  });
})();