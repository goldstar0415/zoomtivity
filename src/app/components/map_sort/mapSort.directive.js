(function () {
  'use strict';

  angular.module('zoomtivity')
    .directive('mapSort', function() {
      return {
        restrict: 'E',
        templateUrl: '/app/components/map_sort/map_sort.html',
        controller: mapSort,
        controllerAs: 'MapSort',
        scope: {

        }
      }
    });

  function mapSort($rootScope, $scope, MapService, $http, API_URL) {
    var vm = this;
    var originalSpotsArray = [];
    $scope.weatherForecast = [];

    $rootScope.$on('update-map-data', function(event, spots) {
      originalSpotsArray = spots;
      vm.eventsArray = [];
      vm.recreationsArray = [];
      vm.pitstopsArray = [];


      _.each(spots, function(item) {

        var type = item.spot.category.type.name;

        switch(type) {
          case 'pitstop':
            vm.pitstopsArray.push(item);
            break;
          case 'recreation':
            vm.recreationsArray.push(item);
            break;
          case 'event':
            vm.eventsArray.push(item);
            break;
        }

      });

      vm.eventsArray = MapService.SortByRating(vm.eventsArray);
      vm.recreationsArray = MapService.SortByRating(vm.recreationsArray);
      vm.pitstopsArray = MapService.SortByRating(vm.pitstopsArray);

      switch(vm.sortLayer) {
        case 'event':
          $scope.sortEventsByCategories();
          break;
        case 'recreation':
          $scope.sortRecreationsByCategories();
          break;
        case 'pitstop':
          $scope.sortPitstopsByCategories();
          break;
      }
    });


    vm.vertical = false;
    vm.sortLayer = 'event';
    vm.toggleMenu = function() {
      vm.vertical = !vm.vertical;
    };
    vm.toggleLayer = function(layer) {
      switch(layer) {
        case 'events':
              MapService.showEvents();
              vm.sortLayer = 'event';
              $scope.sortEventsByCategories();
              break;
        case 'pitstops':
              MapService.showPitstops();
              vm.sortLayer = 'pitstop';
              $scope.sortPitstopsByCategories();
              break;
        case 'recreations':
              MapService.showRecreations();
              vm.sortLayer = 'recreation';
              $scope.sortRecreationsByCategories();
              break;
        case 'other':
              MapService.showOtherLayers();
              MapService.WeatherSelection(weather);
              vm.sortLayer = 'weather';
              break;
      }
    };

    $http.get(API_URL+ '/spots/categories')
      .success(function(data) {
        for(var k in data) {
          data[k].selected = false;
          if(data[k].name == 'event'){
            $scope.eventCategories = data[k].categories;
          }

          if(data[k].name == 'recreation'){
            $scope.recreationCategories = data[k].categories;
          }

          if(data[k].name == 'pitstop'){
            $scope.pitstopCategories = data[k].categories;
          }
        }
      });

    //============================ events section ==========================
    $scope.eventsDateToggle = false;
    $scope.eventsCategoryToggle = false;
    vm.eventsSelectAll = false;

    $scope.toggleEventCategories = function() {
      $scope.sortEventsByCategories();
      if(!vm.eventsSelectAll) {
        _.map($scope.eventCategories, function(item) {
          item.selected = true;
        });
      } else {
       _.map($scope.eventCategories, function(item) {
          item.selected = false;
        });
      }
      vm.eventsSelectAll = !vm.eventsSelectAll;
    };
    $scope.sortEventsByCategories = function() {
      var categories = _.reject($scope.eventCategories, function(item) {
        return !item.selected;
      });
      vm.displayEventsArray = MapService.SortBySubcategory(vm.eventsArray, categories);
      MapService.drawSpotMarkers(vm.displayEventsArray, 'event', true);
    };
    //============================ recreation section ======================
    $scope.recreationsCategoryToggle = false;
    vm.recreationSelectAll = false;

    $scope.toggleRecreationCategories = function() {
      $scope.sortRecreationsByCategories();
      if(!vm.recreationSelectAll) {
        _.map($scope.recreationCategories, function(item) {
          item.selected = true;
        });
      } else {
        _.map($scope.recreationCategories , function(item) {
          item.selected = false;
        });
      }
      vm.recreationSelectAll = !vm.recreationSelectAll;
    };
    $scope.sortRecreationsByCategories = function() {
      var categories = _.reject($scope.recreationCategories, function(item) {
        return !item.selected;
      });
      vm.displayRrecreationsArray = MapService.SortBySubcategory(vm.recreationsArray, categories);
      MapService.drawSpotMarkers(vm.displayRrecreationsArray, 'recreation', true);
    };
    //============================ pitstop section =========================
    $scope.pitstopsCategoryToggle = false;
    vm.pitstopSelectAll = false;

    $scope.togglePitstopCategories = function() {
      $scope.sortPitstopsByCategories();
      if(!vm.pitstopSelectAll) {
        _.map($scope.pitstopCategories, function(item) {
          item.selected = true;
        });
      } else {
        _.map($scope.pitstopCategories, function(item) {
          item.selected = false;
        });
      }
      vm.pitstopSelectAll = !vm.pitstopSelectAll;
    };
    $scope.sortPitstopsByCategories = function() {
      var categories = _.reject($scope.pitstopCategories, function(item) {
        return !item.selected;
      });
      vm.displayPitstopsArray = MapService.SortBySubcategory(vm.pitstopsArray, categories);
      MapService.drawSpotMarkers(vm.displayPitstopsArray, 'pitstop', true);
    };
    //============================ weather section =========================


    function weather(resp) {
      var daily = resp.daily.data;
      for(var k in daily) {
        daily[k].formattedDate = moment(daily[k].time * 1000).format('DD MMMM');
        if(k != 0) {
          $scope.weatherForecast.push(daily[k]);
        }
      }
      $scope.currentWeather = daily[0];
      $scope.currentWeather.sunrise = moment(daily[0].sunriseTime * 1000).format('HH:mm a');
      $scope.currentWeather.sunset = moment(daily[0].sunsetTime * 1000).format('HH:mm a');
      $scope.currentWeather.temperature = ((daily[0].temperatureMax + daily[0].temperatureMin) / 2).toFixed(2);

    }
  }
})();


