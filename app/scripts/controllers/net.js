'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:NetCtrl
 * @description
 * # NetCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('NetCtrl', ['api', '$scope', '$routeParams', function (api, $scope, $routeParams) {
    api.gprs_count_by_hour($routeParams.uid).success(function(data) {
      $scope.data = data;
    });
    /*
    api.gprs_count_by_day($routeParams.uid).success(function(data) {
      $scope.week_data = data.map(function(elem) {
        elem.day = parseInt(elem.day);
        return elem;
      });
    });
    api.call_count_by_day($routeParams.uid).success(function(data) {
      $scope.call_by_day = data.map(function(elem) {
        elem.day = parseInt(elem.day);
        return elem;
      });
    });
    */
    api.call_count_by_hour($routeParams.uid).success(function(data) {
      $scope.call_by_hour = data;
    });

    api.web_req_hist($routeParams.uid).success(function(data) {
      var newdata = [];
      var i = 0, j = 0;
      while(i < 24) {
        if (data[j] && i == data[j].hour) {
          data[j].count /= 24;
          newdata.push(data[j]);
          j += 1;
          i += 1;
        } else {
          newdata.push({count: 0, hour: i});
          i += 1;
        }
      }
      $scope.web_req = newdata;
    });

    api.gprs_count_by_day($routeParams.uid).success(function(data) {
      $scope.req_by_day = data;
    });

    api.call_hist($routeParams.uid).success(function(data) {
      var newdata = [];
      var i = 0, j = 0;
      while(i < 24) {
        if (data[j] && i == data[j].hour) {
          data[j].count /= 24;
          newdata.push(data[j]);
          j += 1;
        } else {
          newdata.push({count: 0, hour: i});
        }
        i += 1;
      }
      $scope.call = newdata;
    });

    api.call_count_by_day($routeParams.uid).success(function(data) {
      $scope.call_by_day = data;
    });

    api.gprs_count_by_hour($routeParams.uid).success(function(data) {
      $scope.net_flow = data;
    });
    api.gprs_count_by_day($routeParams.uid).success(function(data) {
      $scope.net_flow_by_week = data.map(function(elem) {
        elem.day = parseInt(elem.day);
        return elem;
      });
    });
  }]);
