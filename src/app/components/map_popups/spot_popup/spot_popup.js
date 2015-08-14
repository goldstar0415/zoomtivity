(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .directive('spotPopup', spotPopup);

  /** @ngInject */
  function spotPopup() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/map_popups/spot_popup/spot_popup.html',
      controller: SpotPopupController,
      controllerAs: 'SpotPopup',
      scope: {
        data: '=spot',
        marker: '='
      }
    };
  }

  function SpotPopupController($scope, moment) {
    var firstPhotoIndex, secondPhotoIndex, reviewIndex;
    $scope.view = 'about';
    $scope.showNextPhoto = false;
    $scope.showPrevPhoto = false;

    $scope.showNextReview = false;
    $scope.showPrevReview = false;

    $scope.marker.on('click', function() {
      if($scope.data.spot.photos.length > 0) {
        getPhotosIndex(0);
      }

      if($scope.data.spot.reviews.length > 0) {
        getReviewIndex(0)
      }

      $scope.showPhotos = $scope.data.spot.photos.length > 0;
      $scope.showPhotosControls = $scope.data.spot.photos.length > 2;

      if($scope.data.spot.reviews.length > 0) {
        $scope.currentReview = $scope.data.spot.reviews[0];
      }
      $scope.view = 'about';
      $scope.$apply();
    });

    $scope.nextPhoto = function() {
      if($scope.data.spot.photos.length > 1) {
        getPhotosIndex(firstPhotoIndex + 1);
      }
    };
    $scope.prevPhoto = function() {
      if($scope.data.spot.photos.length > 1) {
        getPhotosIndex(firstPhotoIndex - 1);
      }
    };
    function getPhotosIndex(idx) {
      if(idx < 0) {
        idx = $scope.data.spot.photos.length -1;
      }

      if(idx > $scope.data.spot.photos.length -1) {
        idx = 0;
      }

      firstPhotoIndex = idx;
      $scope.firstPhotoIndex = firstPhotoIndex;
      $scope.firstPhoto = $scope.data.spot.photos[firstPhotoIndex].photo_url.medium;
      $scope.firstItem = $scope.data.spot.photos[firstPhotoIndex];

      if($scope.data.spot.photos.length > 1) {
        if(firstPhotoIndex + 1 > $scope.data.spot.photos.length - 1){
          secondPhotoIndex = 0;
        } else {
          secondPhotoIndex = firstPhotoIndex + 1;
        }
        $scope.secondPhotoIndex = secondPhotoIndex;
        $scope.secondPhoto = $scope.data.spot.photos[secondPhotoIndex].photo_url.medium;
        $scope.secondItem = $scope.data.spot.photos[secondPhotoIndex];
      }
    }


    $scope.nextReview = function() {
      if($scope.data.spot.reviews.length > 1) {
        getReviewIndex(reviewIndex + 1)
      }
    };
    $scope.prevReview = function() {
      if($scope.data.spot.reviews.length > 1) {
        getReviewIndex(reviewIndex - 1);
      }
    };
    function getReviewIndex(idx) {
      var reviews = $scope.data.spot.reviews;
      if(idx > reviews.length -1) {
        idx = 0;
      }

      if(idx < 0) {
        idx = reviews.length -1;
      }
      reviewIndex = idx;
      $scope.currentReview = reviews[idx];
    }
  }
})();
