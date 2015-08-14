(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .controller('SpotController', SpotController);

  /** @ngInject */
  function SpotController(spot, SpotService) {
    var vm = this;
    vm.spot = SpotService.formatSpot(spot);
    vm.saveToCalendar = SpotService.saveToCalendar;
    vm.removeFromCalendar = SpotService.removeFromCalendar;
    vm.addToFavorite = SpotService.addToFavorite;
    vm.removeFromFavorite = SpotService.removeFromFavorite;
    vm.removeSpot = SpotService.removeSpot;
  }
})();
