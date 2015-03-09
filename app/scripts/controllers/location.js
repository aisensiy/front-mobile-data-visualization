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
      function remove_date(logs) {
        return logs.map(function(elem) {
          elem.start_time = elem.start_time.slice(8);
          elem.end_time = elem.end_time.slice(8);
          return elem;
        });
      }
      $scope.locations = remove_date(locations);
  }]);
