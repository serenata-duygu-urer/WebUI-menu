(function () {
  var mobileMenuTrigger = function (trigger, details, menuMain) {
    trigger.addEventListener('click', () => {
      if (!details.classList.contains('open')) {
        details.classList.add('open');
        details.classList.remove('close')
        if (menuMain && menuMain.style.position !== 'fixed'&& details.classList.contains('open')) {
          menuMain.style.position = 'inherit';
          details.style.transform = 'translateY(0em)';
        }
       
      } else {
        details.classList.add('close');
        details.classList.remove('open');
        if (menuMain && menuMain.style.position !== 'fixed' && details.classList.contains('close')) {
          // todo fix scroll csss in here 
          menuMain.style.position = 'sticky';
          details.style.transform = '';
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

  document.addEventListener("DOMContentLoaded", function (event) {
    var menuMain = document.getElementById('menu-main');
    var menuDetails = document.getElementById('menu-details');
    var menuFlowersDetails = document.getElementById('submenu-flowers');
    var menuPlantDetails = document.getElementById('submenu-plants');

    setMenu(menuDetails, menuFlowersDetails, menuPlantDetails);

    window.addEventListener("scroll", () => {
      var currentScroll = window.scrollY; 
      var scrollDiff = currentScroll - lastScroll;
      menuDetails.style.transform = '';

      menuMain.style.position = 'fixed';
      menuDetails.style.position = 'fixed';

      menuDetails.style.transition = '';

      if (currentScroll === 0) {
        menuMain.style.position = 'sticky';
        if (menuDetails.classList.contains('open')) {
          menuDetails.style.transform = 'translateY(0em)';
          menuDetails.style.transition = '0s ease';
        }
      }
      else if (scrollDiff > 0) {

        // scrolled down -- header hide
        setMenuElementClose(menuMain);
        setMenuElementClose(menuDetails);
        setMenuElementClose(menuFlowersDetails);
        setMenuElementClose(menuPlantDetails);
      }
      else {
        // scrolled up -- header show
        setMenuElementOpen(menuMain);
        // menuMain.style.top = '';
        // menuDetails.style.top = '';

      }
      lastScroll = currentScroll;
    });
  });
})();