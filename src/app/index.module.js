(function () {
  'use strict';

  angular
    .module('zoomtivity', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngResource',
      'ngMessages',
      'ngFileUpload',
      'ui.router',
      'ui.bootstrap',
      'dialogs.main',
      'snap',
      'angular-loading-bar',
      'angular-bootstrap-select'
    ])
    .animation('.mapResize', [function() {
      return {
        setClass: function(element, addedClass, removedClass, doneFn) {
          if(window.map) {
            window.map.invalidateSize();
          }
          doneFn();
        }
      }

    }]);

})();
