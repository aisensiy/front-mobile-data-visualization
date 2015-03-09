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
        {
          'location': '116.30944 39.82278',
          'start_time': '20131201094713',
          'end_time': '20131201112222'
        },
        {
          'location': '116.39458 39.85150',
          'start_time': '20131201134713',
          'end_time': '20131201152222'
        },
        {
          'location': '116.29458 39.80150',
          'start_time': '20131201164713',
          'end_time': '20131201182222'
        },
        {
          'location': '116.30944 39.82278',
          'start_time': '20131201214713',
          'end_time': '20131201222222'
        },
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
      function remove_date(logs) {
        return logs.map(function(elem) {
          elem.start_time = elem.start_time.slice(8);
          elem.end_time = elem.end_time.slice(8);
          return elem;
        });
      }
      $scope.locations = remove_date(locations);
  }]);
