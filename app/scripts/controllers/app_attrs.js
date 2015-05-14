'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:AppAttrsCtrl
 * @description
 * # AppAttrsCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('AppAttrsCtrl', ['$scope', 'api', '$routeParams', function ($scope, api, $routeParams) {
    $scope.uid = $routeParams.uid;
    api.user($scope.uid).success(function(data) {
      $scope.user = data;
    });
    api.app_by_uid($routeParams.uid).success(function(data) {
      $scope.app_by_uid = data;
    });
    api.site_count($routeParams.uid).success(function(data) {
      $scope.sites = data;
    });
    api.app_count($routeParams.uid).success(function(data) {
      $scope.apps = data;
    });
  }]);
