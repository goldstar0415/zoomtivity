(function() {
    'use strict';

    angular
        .module('zoomtivity')
        .directive('spotcard', SpotCard);

    /** @ngInject */
    function SpotCard() {
        return {
            restrict: 'A',
            templateUrl: '/app/components/spot_card/spot_card.html',
            scope: {
                item: '=',
                index: '='
            },
            controller: SpotCardController,
            controllerAs: 'SpotCard',
            bindToController: true
        };

        /** @ngInject */
        function SpotCardController($rootScope, $http, $scope, SpotService, MapService, API_URL, InviteFriends, Share) {
            var vm = this;
            vm.saveToCalendar = SpotService.saveToCalendar;
            vm.removeFromCalendar = SpotService.removeFromCalendar;
            vm.addToFavorite = SpotService.addToFavorite;
            vm.removeFromFavorite = SpotService.removeFromFavorite;
            vm.unFavorite = unFavorite;
            vm.image = setImage(vm.item);
            vm.isMenuOpened = false;
            vm.toggleMenu = toggleMenu;
            vm.closeMenu = closeMenu;
            vm.openInviteModal = openInviteModal;
            vm.openShareModal = openShareModal;
            vm.openSpot = openSpot;

            function openSpot(spotId) {

                // $http.get('https://testback.zoomtivity.com/map/spots/list?ids%5B%5D=' + spotId)
                $http.get('https://testback.zoomtivity.com/spots/' + spotId)
                    .success(function success(data) {
                        $rootScope.setOpenedSpot(data);
                    });
            }

            function openInviteModal(item) {
                InviteFriends.openModal(item);
            }

            function openShareModal(item, type) {
                Share.openModal(item, type);
            }

            function toggleMenu() {
                vm.isMenuOpened = !vm.isMenuOpened;
            }

            function closeMenu() {
                vm.isMenuOpened = false;
            }

            function setImage(item) {
                if (item.category_name === 'Food') {
                    if (false) {
                        return item.cover_url.original;
                    } else {
                        var imgnum = Math.floor(item.id % 33);
                        return '../../../assets/img/placeholders/food/' + imgnum + '.jpg';
                    }
                } else {
                    if (item.cover_url) {
                        return item.cover_url.original;
                    } else {
                        return "https://testback.zoomtivity.com/uploads/missings/covers/original/missing.png";
                    }
                }
            }

            function unFavorite(spot, idx) {
              SpotService.removeFromFavorite(spot, function () {
                if ($rootScope.currentUser.id === $rootScope.profileUser.id) {
                  $scope.$parent.$parent.Favorite.spots.data.splice(idx, 1);
                  if ($scope.$parent.$parent.Favorite.markersSpots[idx].marker) {
                    MapService.GetCurrentLayer().removeLayer($scope.$parent.$parent.Favorite.markersSpots[idx].marker);
                  } else {
                    MapService.GetCurrentLayer().removeLayers($scope.$parent.$parent.Favorite.markersSpots[idx].markers)
                  }
                }
              })
            }
        }
    }
})();
