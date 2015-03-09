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
    $scope.data = api.gprs_count_by_hour();
    $scope.week_data = api.gprs_count_by_day();
  }]);
