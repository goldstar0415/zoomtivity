(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .factory('PermissionService', PermissionService);

  /** @ngInject */
  function PermissionService($rootScope) {
    return {
      checkPermission: checkPermission
    };

    function checkPermission(accessLevel, user) {
      user = user || $rootScope.profileUser;
      if ($rootScope.currentUser && $rootScope.currentUser.id == user.id) return true;

      var access = false;
      switch (accessLevel) {
        case 1: //all users
          access = true;
          break;
        case 2: //followers&followings
          if (!user.can_follow || user.is_following) {
            access = true;
          }
          break;
        case 3: //followings
          if (user.is_following) {
            access = true;
          }
          break;
        case 4: //authorized users
          if ($rootScope.currentUser) {
            access = true;
          }
          break;
      }

      return access;
    }

  }

})();
