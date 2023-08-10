(function () {
  var menuTrigger = function (trigger, details, issub, maintrigger, maindetails) {
    trigger.addEventListener('click', () => {
      /** Slide down. */

      /***TODO add main fix */
      if (!details.classList.contains('active')) {
        /** Show the menuDetails. */
        details.classList.add('active')
        details.style.height = "auto"

        /** Get the computed height of the container. */
        var height = details.clientHeight + "px"
        // var height = "auto"

        /** Set the height of the content as 0px, */
        /** so we can trigger the slide down animation. */
        details.style.height = "0px"

        /** Do this after the 0px has applied. */
        /** It's like a delay or something. MAGIC! */
        setTimeout(() => {
          details.style.height = height
        }, 0)

        /** Slide up. */
      } else {
        /** Set the height as 0px to trigger the slide up animation. */
        details.style.height = "0px"

        /** Remove the `active` class when the animation ends. */
        details.addEventListener('transitionend', () => {
          details.classList.remove('active')
        }, { once: true })
      }

    });
  }
  document.addEventListener("DOMContentLoaded", function (event) {
    /** Main menu**/
    var menuDetails = document.getElementById('menu-details');
    var menuBars = document.getElementById('menu-bars');
    if(menuDetails && menuBars){
      menuTrigger(menuBars, menuDetails, false, null, null);
    }
    /** Flower sub menu**/
    var menuFlowersDetails = document.getElementById('submenu-flowers');
    var menuFlowersTrigger = document.getElementById('menu-flowers');
    if(menuFlowersTrigger && menuFlowersDetails){
      menuTrigger(menuFlowersTrigger, menuFlowersDetails, true, menuBars, menuDetails);
    }
    /** Plant sub menu**/
    var menuPlantDetails = document.getElementById('submenu-plants');
    var menuPlantTrigger = document.getElementById('menu-plants');
    if(menuPlantDetails && menuPlantTrigger){
      menuTrigger(menuPlantTrigger, menuPlantDetails, true, menuBars, menuDetails);
    }
  });
})();