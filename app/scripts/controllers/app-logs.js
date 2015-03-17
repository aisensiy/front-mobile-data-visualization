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
    api.app_log_by_uid_day($routeParams.uid, '01').success(function(data) {
      $scope.logs = data;
    });
  }]);
