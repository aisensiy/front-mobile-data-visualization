'use strict';

/**
 * @ngdoc service
 * @name frontMobileDataVisualizationApp.api
 * @description
 * # api
 * Service in the frontMobileDataVisualizationApp.
 */
angular.module('frontMobileDataVisualizationApp')
  .service('api', ['$http', function ($http) {
    var root = 'http://localhost:5000';
    return {
      gprs_count_by_hour: function(uid) {
        return $http.get(root + '/gprs_count_by_hour/' + uid);
      },
      gprs_count_by_day: function(uid) {
        return $http.get(root + '/gprs_count_by_day/' + uid);
      },
      location_by_uid: function(uid) {
        return $http.get(root + '/location_by_uid/' + uid);
      },
      location_by_uid_day: function(uid, day) {
        return $http.get(root + '/location_by_uid_day/' + uid + '/' + day);
      },
      app_log_by_uid_day: function(uid, day) {
        return $http.get(root + '/app_log_by_uid_day/' + uid + '/' + day);
      },
      location_daycount_by_uid: function(uid) {
        return $http.get(root + '/location/daycount/' + uid);
      }
    }
  }]);
