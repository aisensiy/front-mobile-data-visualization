'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('LocationCtrl', ['$scope', 'api', function ($scope, api) {
      api.location_by_uid('1201403').success(function(data) {
        $scope.location_range_data = data;
      });
      api.location_by_uid_day('1201403', '01').success(function(data) {
        $scope.locations = remove_date(data);
      });
      function remove_date(logs) {
        return logs.map(function(elem) {
          elem.start_time = elem.start_time.slice(8);
          elem.end_time = elem.end_time.slice(8);
          return elem;
        });
      }
  }]);
