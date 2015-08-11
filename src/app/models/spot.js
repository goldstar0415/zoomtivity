(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .factory('Spot', Spot);

  /** @ngInject */
  function Spot($resource, API_URL) {
    return $resource(API_URL + '/spots/:id', {id: '@id'}, {
      favorites: {
        url: API_URL + '/spots/favorites',
        isArray: true
      },
      inviteFriends: {
        url: API_URL + '/spots/invite',
        method: 'POST'
      }
    });
  }

})();
