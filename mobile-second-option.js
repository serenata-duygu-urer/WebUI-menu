(function () {
  var lastScroll = 0;
  var makeElementInvisible = function (element) {
    if (element) {
      element.style.display = 'none';
    }
  };

  var setMenuElementOpen = function (element) {
    if (element && !element.classList.contains('open')) {
      element.classList.add("open");
    }
  };

  var setMenuElementClose = function (element) {
    if (element && element.classList.contains('open')) {
      element.classList.remove("open");
    }
  };

  var menuTrigger = function (trigger, element, overlay, mainMenu, needToCloseDetail) {
    if (trigger && element) {
      trigger.addEventListener('click', () => {
        if (!element.classList.contains('open')) {
          if (overlay && mainMenu) {
            overlay.style.display = 'block';
            setMenuElementClose(mainMenu);
          }
          setMenuElementOpen(element);
          if (!mainMenu && needToCloseDetail && needToCloseDetail.classList.contains('open')) {
            setMenuElementClose(needToCloseDetail);
          }
        } else {
          setMenuElementClose(element);
          if (overlay && mainMenu) {
            overlay.style.display = 'none';
            setMenuElementOpen(mainMenu);
            element.querySelectorAll('.menu-submenu-list').forEach(function(e) {
              if (e.classList.contains('open')){
                setMenuElementClose(e);
              }
            });

          }
        }
      });
    }
  }
  document.addEventListener("DOMContentLoaded", function (event) {
    if (window.innerWidth <= 1023) {
      var menuMain = document.getElementById('menu-main');
      var menuBars = document.getElementById('menu-bars');
      var menuDetails = document.getElementById('menu-details');
      var menuOverlay = document.getElementById('menu-overlay');
      menuTrigger(menuBars, menuDetails, menuOverlay, menuMain);

      var menuFlowersDeals = document.getElementById('deal-flower');
      var menuPlantDeals = document.getElementById('deal-plant');
      makeElementInvisible(menuFlowersDeals);
      makeElementInvisible(menuPlantDeals);

      var menuFlowersTrigger = document.getElementById('menu-flowers');
      var menuPlantTrigger = document.getElementById('menu-plants');

      var menuFlowersDetails = document.getElementById('submenu-flowers');
      var menuPlantDetails = document.getElementById('submenu-plants');

      menuTrigger(menuFlowersTrigger, menuFlowersDetails, null, null, menuPlantDetails);
      menuTrigger(menuPlantTrigger, menuPlantDetails, null, null, menuFlowersDetails);

      window.addEventListener("scroll", function () {
        var currentScroll = window.scrollY;
        if (menuDetails && !menuDetails.classList.contains('open')) {
          if (currentScroll === 0) {
            // on top of the page 
            setMenuElementOpen(menuMain);
          }
          else if (currentScroll - lastScroll > 0) {
            // scrolled down 
            setMenuElementClose(menuMain);
          }
          else {
            // scrolled up -- header show
            setMenuElementOpen(menuMain);
          }
        }
        lastScroll = currentScroll;
      });

    }
  });
})();