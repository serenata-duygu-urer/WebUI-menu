(function () {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if (window.innerWidth <= 1023) {
    script.src = './mobile.js';
  } else {
    script.src = './desktop.js';
  }
  head.appendChild(script);
})();