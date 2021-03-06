(function () {
  'use strict';

  /*
   * Directive for side menu
   */
  angular
    .module('zoomtivity')
    .directive('zmSideMenu', ZoomtivitySideMenu);

  /** @ngInject */
  function ZoomtivitySideMenu() {
    var directive = {
      restrict: 'E',
      templateUrl: '/app/components/navigation/side_menu/side_menu.html',
      scope: {
        side: '@'
      },
      controller: SideMenuController,
      controllerAs: 'SideMenu',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  function SideMenuController($state, User, snapRemote, UserService) {
    var vm = this;
    vm.$state = $state;

    //sign out user
    vm.signOut = function () {
      User.logOut(function () {
        snapRemote.getSnapper().then(function (snapper) {
          snapper.close();
        });
        UserService.logOut();
      })
    }
  }

})();
