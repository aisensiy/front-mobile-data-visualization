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
        ["20131201094713", "116.30944 39.82278"],
        ["20131201142751", "116.39458 39.85150"],
        ["20131201150027", "116.39268 39.85241"],
        ["20131201171420", "116.39458 39.85150"],
        ["20131201174523", "116.38336 39.83360"],
        ["20131201182320", "116.30888 39.80920"],
        ["20131201182623", "116.38336 39.83360"],
      ];
      $scope.locations = locations;
  }]);
