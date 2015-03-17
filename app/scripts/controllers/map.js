'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('MapCtrl', ['$scope', '$routeParams', 'api', function ($scope, $routeParams, api) {
      $scope.uid = $routeParams.uid;
      api.location_by_uid_day($scope.uid, $routeParams.day).success(function(data) {
        $scope.locations = remove_date(data);
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
