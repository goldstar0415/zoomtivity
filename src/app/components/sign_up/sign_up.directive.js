(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .directive('signUp', signUp);

  /** @ngInject */
  function signUp() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/sign_up/sign_up.html',
      controller: SignUpController,
      controllerAs: 'signUp',
      bindToController: true
    };

    /** @ngInject */
    function SignUpController(SignUpService) {
      var vm = this;

      vm.openSignUpModal = function () {
        SignUpService.openModal('SignUpModal.html', 'SignUpModalController');
      };

      vm.signUpUser = SignUpService.signUpUser;
    }

  }

})();
