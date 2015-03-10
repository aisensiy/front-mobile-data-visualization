'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:AppLogsCtrl
 * @description
 * # AppLogsCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('AppLogsCtrl', ['api', '$scope', function (api, $scope) {
    api.app_log_by_uid_day('58661900', '01').success(function(data) {
      $scope.logs = data;
    });
  }]);
