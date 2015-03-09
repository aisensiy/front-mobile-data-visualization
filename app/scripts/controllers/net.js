'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:NetCtrl
 * @description
 * # NetCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('NetCtrl', ['api', '$scope', function (api, $scope) {
    api.gprs_count_by_hour('58661900').success(function(data) {
      $scope.data = data;
    });
    api.gprs_count_by_day('58661900').success(function(data) {
      $scope.week_data = data.map(function(elem) {
        elem.day = parseInt(elem.day);
        return elem;
      });
    });
  }]);
