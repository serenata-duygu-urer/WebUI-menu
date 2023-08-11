(function () {
  var menuTrigger = function (trigger, details, issub, maindetails) {
    trigger.addEventListener('click', () => {
      /** Slide down. */
      if (!details.classList.contains('active')) {
        /** Show the menuDetails. */
        details.classList.add('active')
        details.style.height = "auto"
        var mainMenuHeight = 0;
        if (issub) {
          mainMenuHeight = maindetails.clientHeight;
        }
        /** Get the computed height of the container. */
        var height = details.clientHeight;
        
        /** Set the height of the content as 0px, */
        /** so we can trigger the slide down animation. */
        details.style.height = "0px";
        if (issub) {
          maindetails.style.height = maindetails.clientHeight + 'px';
        }
        /** Do this after the 0px has applied. */
        /** It's like a delay or something. MAGIC! */
        setTimeout(() => {
          details.style.height = height + "px";
          if (issub) {
            maindetails.style.height = (height + mainMenuHeight) + "px";
          }
        }, 0);
        /** Slide up. */
      } else {
        /** Set the height as 0px to trigger the slide up animation. */
        var height = details.clientHeight;
        details.style.height = "0px"
        if (issub) {
          maindetails.style.height = (maindetails.clientHeight - height) + 'px';
        }
        /** Remove the `active` class when the animation ends. */
        details.addEventListener('transitionend', () => {
          details.classList.remove('active')
        }, { once: true })
      }
    });
  };

  var setMenu = function (menuDetails, menuFlowersDetails, menuPlantDetails) {
    /** Main menu**/
    var menuBars = document.getElementById('menu-bars');
    if (menuDetails && menuBars) {
      menuTrigger(menuBars, menuDetails, false, null);
    }
    /** Flower sub menu**/
    var menuFlowersTrigger = document.getElementById('menu-flowers');
    if (menuFlowersTrigger && menuFlowersDetails) {
      menuTrigger(menuFlowersTrigger, menuFlowersDetails, true, menuDetails);
    }
    /** Plant sub menu**/
    var menuPlantTrigger = document.getElementById('menu-plants');
    if (menuPlantDetails && menuPlantTrigger) {
      menuTrigger(menuPlantTrigger, menuPlantDetails, true, menuDetails);
    }
  };

  var setResizeMenu = function (element) {
    element.removeAttribute('style');
    element.style.height = element.clientHeight + 'px';
  };

  var resizeMenu = function (menuDetails, menuFlowersDetails, menuPlantDetails) {
    if (menuDetails.classList.contains('active')) {
      if (menuFlowersDetails.classList.contains('active')) {
        setResizeMenu(menuFlowersDetails);
      }
      if (menuPlantDetails.classList.contains('active')) {
        setResizeMenu(menuPlantDetails);
      }
      setResizeMenu(menuDetails);
    }
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    var menuDetails = document.getElementById('menu-details');
    var menuFlowersDetails = document.getElementById('submenu-flowers');
    var menuPlantDetails = document.getElementById('submenu-plants');
    setMenu(menuDetails, menuFlowersDetails, menuPlantDetails);
    window.addEventListener('resize', function () {
      console.log('resize');
      resizeMenu(menuDetails, menuFlowersDetails, menuPlantDetails);
    }, true);
  });
})();