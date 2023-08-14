(function () {
  var mobileMenuTrigger = function (trigger, details) {
    trigger.addEventListener('click', () => {
      /** Slide down. */
      if (!details.classList.contains('open')) {
        /** Show the menuDetails. */
        details.classList.add('open');
        details.classList.remove('close')
      } else {
        details.classList.add('close');
        details.classList.remove('open');
      }
    });
  };
  var setMenu = function (menuDetails, menuFlowersDetails, menuPlantDetails) {
    /** Main menu**/
    var menuBars = document.getElementById('menu-bars');
    if (menuDetails && menuBars) {
      mobileMenuTrigger(menuBars, menuDetails, false, null);
    }
    /** Flower sub menu**/
    var menuFlowersTrigger = document.getElementById('menu-flowers');
    if (menuFlowersTrigger && menuFlowersDetails) {
      mobileMenuTrigger(menuFlowersTrigger, menuFlowersDetails, true, menuDetails);
    }
    /** Plant sub menu**/
    var menuPlantTrigger = document.getElementById('menu-plants');
    if (menuPlantDetails && menuPlantTrigger) {
      mobileMenuTrigger(menuPlantTrigger, menuPlantDetails, true, menuDetails);
    }
  };

  var lastScroll = 0;

  document.addEventListener("DOMContentLoaded", function (event) {
    var menuMain = document.getElementById('menu-main');
    var menuDetails = document.getElementById('menu-details');
    var menuFlowersDetails = document.getElementById('submenu-flowers');
    var menuPlantDetails = document.getElementById('submenu-plants');
    setMenu(menuDetails, menuFlowersDetails, menuPlantDetails);
    window.addEventListener("scroll", () => {
      var currentScroll = window.scrollY;
      if (currentScroll - lastScroll > menuDetails.clientHeight) {
        // scrolled down -- header hide
        menuMain.classList.add("close");
        menuMain.classList.remove("open");
        if (menuDetails.classList.contains('open')) {
          menuDetails.classList.add('close');
          menuDetails.classList.remove('open')
        }
      } else {
        // scrolled up -- header show
        menuMain.classList.add("open");
        menuMain.classList.remove("close");
        if (menuDetails.classList.contains('open')) {
          menuDetails.classList.add('close');
          menuDetails.classList.remove('open');
        }
      }
      lastScroll = currentScroll;
    });
  });
})();