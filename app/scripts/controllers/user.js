'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('UserCtrl', ['$scope', 'api', '$routeParams', function ($scope, api, $routeParams) {
    $scope.uid = $routeParams.uid;
    api.user($scope.uid).success(function(data) {
      $scope.user = data;
    });
    api.location_by_uid($scope.uid).success(function(data) {
      $scope.location_range_data = data;
    });
    api.location_stop_by_uid($scope.uid).success(function(data) {
      $scope.location_stop_range_data = data;
    });
    api.gprs_count_by_hour($routeParams.uid).success(function(data) {
      $scope.net_flow = data;
    });
    api.gprs_count_by_day($routeParams.uid).success(function(data) {
      $scope.net_flow_by_week = data.map(function(elem) {
        elem.day = parseInt(elem.day);
        return elem;
      });
    });
  }]);
