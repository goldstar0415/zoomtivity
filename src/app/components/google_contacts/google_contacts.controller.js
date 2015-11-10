(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .controller('GoogleContactsController', GoogleContactsController);

  /** @ngInject */
  function GoogleContactsController(contacts, friends, $modalInstance, API_URL, Friends) {
    var vm = this;
    vm.API_URL = API_URL;
    vm.users = contacts;

    vm.save = function () {
      $modalInstance.close();
      _.each(vm.users, function (user) {
        if (user.selected) {
          var photo = user.photo,
            user_name = (user.first_name || user.last_name || user.email || user.phone);
          Friends.save({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone
          }, function (friend) {
            if (photo) {
              convertToBase64(photo, function (data) {
                Friends.setAvatar({id: friend.id}, {avatar: data}, function (friendPhoto) {
                  friends.push(friendPhoto);
                });
              });
            } else {
              friends.push(friend);
            }

            toastr.success(user_name + ' successfully imported')
          }, function () {
            toastr.error(user_name + ' import failed')
          });
        }
      });
    };

    function convertToBase64(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function() {
        var reader  = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    }


    //close modal
    vm.close = function () {
      $modalInstance.close();
    };
  }
})();
