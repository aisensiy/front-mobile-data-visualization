'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('LocationCtrl', ['$scope', function ($scope) {
      var locations = [
        ['20141201081101', '40.46181 115.96892'],
        ['20141201081105', '40.46181 115.96892'],
        ['20141201121203', '40.46181 115.96392'],
        ['20141201131811', '40.46181 115.96892'],
        ['20141201181100', '40.46181 115.96892']
      ];
      var location_range_data = [
        {
          'date': 1,
          'locations': [
            { from: '08:13', to: '09:11', location: 'a' },
            { from: '09:12', to: '12:11', location: 'b' },
            { from: '12:12', to: '13:10', location: 'c' },
            { from: '13:11', to: '17:49', location: 'b' },
            { from: '17:50', to: '18:35', location: 'd' },
            { from: '18:36', to: '19:33', location: 'a' },
          ]
        },
        {
          'date': 2,
          'locations': [
            { from: '08:13', to: '09:11', location: 'a' },
            { from: '09:12', to: '12:11', location: 'b' },
            { from: '12:12', to: '13:10', location: 'c' },
            { from: '13:11', to: '17:49', location: 'b' },
            { from: '17:50', to: '18:35', location: 'd' },
            { from: '18:36', to: '19:33', location: 'a' },
          ]
        },
        {
          'date': 3,
          'locations': [
            { from: '08:13', to: '09:11', location: 'a' },
            { from: '09:12', to: '12:11', location: 'b' },
            { from: '12:12', to: '13:10', location: 'c' },
            { from: '13:11', to: '17:49', location: 'b' },
            { from: '17:50', to: '18:35', location: 'd' },
            { from: '18:36', to: '19:33', location: 'a' },
          ]
        }
      ];
      $scope.locations = locations;
      $scope.location_range_data = location_range_data;
  }]);
