(function () {
  var menuDetailsTop = 0;
  var mobileMenuTrigger = function (trigger, details, menuMain) {
    trigger.addEventListener('click', () => {
      if (!details.classList.contains('open')) {
        details.classList.add('open');
        details.classList.remove('close')
        if (menuMain && menuMain.style.position !== 'fixed' && details.classList.contains('open')) {
          menuMain.style.position = 'inherit';
          menuMain.style.top = '0px';
          details.style.top = (64) + 'px';
        }
        if (menuMain && menuMain.style.position === 'fixed' && details.classList.contains('open')) {
          /// menuMain.style.top = window.scrollY + 'px';
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
  };
  var setMenu = function (menuDetails, menuFlowersDetails, menuPlantDetails) {
    /** Main menu**/
    var menuMain = document.getElementById('menu-main');
    var menuBars = document.getElementById('menu-bars');
    if (menuDetails && menuBars) {
      mobileMenuTrigger(menuBars, menuDetails, menuMain);
    }
    /** Flower sub menu**/
    var menuFlowersTrigger = document.getElementById('menu-flowers');
    if (menuFlowersTrigger && menuFlowersDetails) {
      mobileMenuTrigger(menuFlowersTrigger, menuFlowersDetails, null);
    }
    /** Plant sub menu**/
    var menuPlantTrigger = document.getElementById('menu-plants');
    if (menuPlantDetails && menuPlantTrigger) {
      mobileMenuTrigger(menuPlantTrigger, menuPlantDetails, null);
    }
  };

  var lastScroll = 0;
  var setMenuElementOpen = function (element) {
    element.classList.add("open");
    element.classList.remove("close");
  };
  var setMenuElementClose = function (element) {
    if (element.classList.contains('open')) {
      element.classList.add("close");
      element.classList.remove("open");
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
      var scrollDiffSum = 0;

      // make details invisible on first load
      makeElementInvisible(menuFlowersDeals);
      makeElementInvisible(menuPlantDeals);
      setMenu(menuDetails, menuFlowersDetails, menuPlantDetails);
      menuMain.style.position = 'inherit';

      window.addEventListener("scroll", () => {
        var currentScroll = window.scrollY;
        var scrollDiff = currentScroll - lastScroll;

        menuDetails.style.transition = '';
        menuDetailsTop = parseInt(window.getComputedStyle(menuDetails).getPropertyValue('top'));
        if (currentScroll === 0) {
          menuMain.style.position = 'inherit';
          if (menuDetails.classList.contains('open')) {
            menuDetails.style.transition = '0s ease';
          }
        }
        else if (scrollDiff > 0) {
          // TODO : open ise  top = window.scrolly+px
          // position =  absolute
          // scrolled down -- header hide

          if (menuDetails.classList.contains('open') && (menuDetailsTop) < window.scrollY - menuDetails.clientHeight) {
            setMenuElementClose(menuMain);
            setMenuElementClose(menuDetails);
            setMenuElementClose(menuFlowersDetails);
            setMenuElementClose(menuPlantDetails);
            menuMain.style.position = 'absolute';
            menuDetails.style.top = (64 + window.scrollY) + 'px';
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
          menuDetails.getBoundingClientRect().top
          if (menuDetails.classList.contains('open') && menuDetails.getBoundingClientRect().top > 64) {
            menuDetails.style.position = 'fixed';
            menuDetails.style.top = '64px';
          }
        }
        lastScroll = currentScroll;
      });

      menuDetails.addEventListener('scroll', () => {
        if (menuDetails.scrollTop >= 64) {
          setMenuElementClose(menuMain);
          menuDetails.style.top = '0em';
        } else {
          setMenuElementOpen(menuMain);
          menuDetails.style.top = '4em';
        }
      });
    }
  });
})();