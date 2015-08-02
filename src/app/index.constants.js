/* global malarkey:false, toastr:false, moment:false */
(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .constant('DEBUG', true)
    .constant('API_URL', 'http://api.zoomtivity.dev')
    .constant('SOCKET_URL', 'ws://localhost:8082')
    .constant('toastr', toastr)
    .constant('moment', moment)
})();
