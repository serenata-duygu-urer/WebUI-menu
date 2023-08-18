var mobile = function () {
  var menuDetailsTop = 0;
  var lastScroll = 0;
  var isScrolledUp = false;
  var menuBarHeight = 64; // as pixel. equals to 4em
  var setElementPositionAndTop = function (element, top, position) {
    if (element) {
      element.style.top = top;
      element.style.position = position;
    }
  };

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
      element.style.maxHeight = '';
    }
  };

  var makeElementInvisible = function (element) {
    if (element) {
      element.style.display = 'none';
    }
  };

  var mobileMenuTrigger = function (trigger, details, menuMain, otherDetail) {
    if (trigger && details) {
      trigger.addEventListener('click', () => {
        if (!details.classList.contains('open')) {
          setMenuElementOpen(details);
          if (menuMain && menuMain.style.position !== 'fixed' && details.classList.contains('open')) {
            setElementPositionAndTop(menuMain, '0px', 'inherit');
            details.style.top = menuBarHeight + 'px';
          }
          if (menuMain && menuMain.style.position === 'fixed' && details.classList.contains('open')) {
            details.style.top = (window.scrollY + menuBarHeight) + 'px';
          }
          if (!menuMain && otherDetail && otherDetail.classList.contains('open')) {
            setMenuElementClose(otherDetail);
          }
          
        } else {
          setMenuElementClose(details);
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
    mobileMenuTrigger(menuBars, menuDetails, menuMain, null);

    /** Flower sub menu**/
    var menuFlowersTrigger = document.getElementById('menu-flowers');
    mobileMenuTrigger(menuFlowersTrigger, menuFlowersDetails, null, menuPlantDetails);

    /** Plant sub menu**/
    var menuPlantTrigger = document.getElementById('menu-plants');
    mobileMenuTrigger(menuPlantTrigger, menuPlantDetails, null, menuFlowersDetails);
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
      
      window.addEventListener("scroll", function () {
        // TODO: fix weird movements on scroll
        var currentScroll = window.scrollY;
        // var scrollDiff = currentScroll - lastScroll;
        menuDetails.style.transition = '';
        if (currentScroll === 0) {
          menuMain.style.position = 'inherit';
          if (menuDetails.classList.contains('open')) {
            menuDetails.style.transition = '0s ease';
          }
        }
        else if (currentScroll - lastScroll >= 0) {
          if (isScrolledUp) {
            menuDetails.style.transition = '0s ease';
          }
          if (isScrolledUp && menuDetails.classList.contains('open')) {
            setElementPositionAndTop(menuDetails, ((menuBarHeight + window.scrollY) + 'px'), 'absolute');
            menuDetails.style.maxHeight = 'max-content';
          }
          menuDetailsTop = isScrolledUp ? (menuBarHeight + window.scrollY) : parseInt(window.getComputedStyle(menuDetails).getPropertyValue('top'));
          isScrolledUp = false;
          if (menuDetails.classList.contains('open') && (menuDetailsTop) <= window.scrollY - (menuDetails.clientHeight + menuBarHeight)) {
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
        }
        else {
          // scrolled up -- header show
          setMenuElementOpen(menuMain);
          isScrolledUp = true;
          //  !(menuFlowersDetails.classList.contains('open') || menuPlantDetails.classList.contains('open')) &&
          if (menuDetails.classList.contains('open') && menuDetails.getBoundingClientRect().top > menuBarHeight) {
            menuDetails.style.transition = '0s ease';
            setElementPositionAndTop(menuMain, '', 'fixed');
            setElementPositionAndTop(menuDetails, menuBarHeight + 'px', 'fixed');
          }
        }
        lastScroll = currentScroll;
      });
    }
  });
}();