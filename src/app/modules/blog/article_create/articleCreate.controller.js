(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .controller('ArticleCreateController', ArticleCreateController);

  /** @ngInject */
  function ArticleCreateController($state, article, categories, toastr, API_URL, UploaderService) {
    var vm = this;
    vm = _.extend(vm, article);
    vm.categories = categories;
    vm.images = UploaderService.images;

    vm.save = save;


    function save(form) {
      if (form.$valid) {
        var req = {},
          data = angular.copy(vm),
          url = API_URL + '/posts';

        req.payload = JSON.stringify(data);
        if (vm.id) {
          req._method = 'PUT';
          url = API_URL + '/posts/' + vm.id;
        }

        UploaderService
          .upload(url, req, 'cover')
          .then(function (resp) {
            $state.go('blog.article', {id: resp.data.id});
          })
          .catch(function (resp) {
            var message = vm.images.files.length > 0 ? 'Upload failed' : 'Wrong input';
            toastr.error(message);
          });
      }
    }
  }
})();
