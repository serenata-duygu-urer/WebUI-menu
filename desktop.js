(function () {
  var makeElementInvisible = function (element) {
    if (element) {
      element.style.top= (-1 * element.clientHeight)+'px'
      element.style.opacity = 0;
    }
  };
  var elementHoverProperty = function (trigger, element) {
    if (trigger && element) {
      trigger.addEventListener('mouseover', () => {
        element.style.top= '';
        element.style.opacity = 1;
      });
    }
  };

  var elementHoverEndProperty = function (trigger, element) {
    if (trigger && element) {
    trigger.addEventListener('mouseleave', () => {
      makeElementInvisible(element);
    })}
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    if (window.innerWidth > 1023) {
      var menuFlowersTrigger = document.getElementById('menu-flowers');
      var menuPlantTrigger = document.getElementById('menu-plants');
      var menuFlowersDetails = document.getElementById('submenu-flowers');
      var menuPlantDetails = document.getElementById('submenu-plants');
      var dropdownFlowers = document.getElementById('dropdown-flowers');
      var dropdownPlants = document.getElementById('dropdown-plants');


      // make details invisible on first load
      makeElementInvisible(menuFlowersDetails);
      makeElementInvisible(menuPlantDetails);

      // add elements hover property

      elementHoverProperty(menuPlantTrigger, menuPlantDetails);
      elementHoverEndProperty(dropdownPlants, menuPlantDetails);
      elementHoverProperty(menuFlowersTrigger, menuFlowersDetails);
      elementHoverEndProperty(dropdownFlowers, menuFlowersDetails);


    }
  });
})();