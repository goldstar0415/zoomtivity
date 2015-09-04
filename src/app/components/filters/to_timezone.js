(function () {
  'use strict';

  angular
    .module('zoomtivity')
    .filter('toTimezone', function (DATE_FORMAT) {
      return function (input, format) {
        format = format || DATE_FORMAT.full;
        var utcOffset = moment().utcOffset();
        return moment(input, DATE_FORMAT.backend).add(utcOffset, 'm').format(format);
      }
    })

})();


