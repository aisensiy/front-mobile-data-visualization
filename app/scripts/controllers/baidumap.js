'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:BaidumapCtrl
 * @description
 * # BaidumapCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('BaidumapCtrl', ['$scope', function ($scope) {
      var locations = [
        ['20141201081101', '40.46181 115.96892'],
        ['20141201081105', '40.46181 115.96892'],
        ['20141201121203', '40.46181 115.96392'],
        ['20141201131811', '40.46181 115.96892'],
        ['20141201181100', '40.46181 115.96892']
      ];
      $scope.locations = locations;
  }]);
