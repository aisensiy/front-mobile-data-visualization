'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:AppLogsCtrl
 * @description
 * # AppLogsCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('AppLogsCtrl', ['api', '$scope', '$routeParams', function (api, $scope, $routeParams) {
    api.location_daycount_by_uid($routeParams.uid).success(function(data) {
      $scope.dates = data;
    });
    $scope.getlog = function(day) {
      $scope.cur_day = day;
      api.app_log_by_uid_day($routeParams.uid, day.slice(6, 8)).success(function(data) {
        $scope.logs = data;
      });
    };
  }]);
