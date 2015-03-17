'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('LocationCtrl', ['$scope', 'api', '$routeParams', function ($scope, api, $routeParams) {
    $scope.uid = $routeParams.uid;
    api.location_by_uid($scope.uid).success(function(data) {
      $scope.location_range_data = data;
    });
    api.location_daycount_by_uid($scope.uid).success(function(data) {
      $scope.dates = data;
    });
    function remove_date(logs) {
      return logs.map(function(elem) {
        elem.start_time = elem.start_time.slice(8);
        elem.end_time = elem.end_time.slice(8);
        return elem;
      });
    }
  }]);
