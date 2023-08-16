(function () {
  var mobileMenuTrigger = function (trigger, details, menuMain) {
    trigger.addEventListener('click', () => {
      if (!details.classList.contains('open')) {
        details.classList.add('open');
        details.classList.remove('close')
        if (menuMain && menuMain.style.position !== 'fixed' && details.classList.contains('open')) {
          menuMain.style.position = 'inherit';
          details.style.top = (67) + 'px';
        }
        if (menuMain && menuMain.style.position === 'fixed' && details.classList.contains('open')) {
          details.style.top = (window.scrollY + 67) + 'px';
        }

      } else {
        details.classList.add('close');
        details.classList.remove('open');
        if (menuMain && menuMain.style.position !== 'fixed' && details.classList.contains('close')) {
          menuMain.style.position = 'sticky';
        }
        if (menuMain && menuMain.style.position === 'fixed' && details.classList.contains('close')) {
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

  document.addEventListener("DOMContentLoaded", function (event) {
    if (window.innerWidth <= 1023) {
      var menuMain = document.getElementById('menu-main');
      var menuDetails = document.getElementById('menu-details');
      var menuFlowersDetails = document.getElementById('submenu-flowers');
      var menuPlantDetails = document.getElementById('submenu-plants');
      var scrollDiffSum = 0;
      setMenu(menuDetails, menuFlowersDetails, menuPlantDetails);
      menuMain.style.position = 'sticky';
      // menuDetails.style.position = 'fixed';
      
      window.addEventListener("scroll", () => {
        var currentScroll = window.scrollY;
        var scrollDiff = currentScroll - lastScroll;
        
        menuMain.style.position = 'fixed';

        menuDetails.style.transition = '';

        if (currentScroll === 0) {
          menuMain.style.position = 'sticky';
          console.log('ssssss',scrollDiff);
          if (menuDetails.classList.contains('open')) {
            menuDetails.style.transition = '0s ease';
          }
        }
        else if (scrollDiff > 0) {
          console.log('ddddd',scrollDiff);
          // TODO : open ise  top = window.scrolly+px
          // position =  absolute
          // menu ekrandan cikar cikmaz top degerini sil , pozitionu fixed yap elementleri kapat : setMenuElementClose*3
          //  menuDetails.style.top = scrollDiffSum + 'px';
          // scrolled down -- header hide
           setMenuElementClose(menuMain);
           menuDetails.style.position = 'absolute';
          // setMenuElementClose(menuDetails);
          // setMenuElementClose(menuFlowersDetails);
          // setMenuElementClose(menuPlantDetails);
        }
        else {
          console.log('erfsefrsd', scrollDiff);
          // scrolled up -- header show
          // menuDetails.style.top = scrollDiffSum + 'px';
          setMenuElementOpen(menuMain);
        }
        lastScroll = currentScroll;
      });

      menuDetails.addEventListener('scroll', () => {
        if (menuDetails.scrollTop >= 67) {
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