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
      location_stop_by_uid: function(uid) {
        return $http.get(root + '/location_by_uid_stop/' + uid);
      },
      location_by_uid_day: function(uid, day) {
        return $http.get(root + '/location_by_uid_day/' + uid + '/' + day);
      },
      raw_location_by_uid_day: function(uid, day) {
        return $http.get(root + '/raw_location_by_uid_day/' + uid + '/' + day);
      },
      location_stop_by_uid_day: function(uid, day) {
        return $http.get(root + '/location_by_uid_day_stop/' + uid + '/' + day);
      },
      app_log_by_uid_day: function(uid, day) {
        return $http.get(root + '/app_log_by_uid_day/' + uid + '/' + day);
      },
      location_daycount_by_uid: function(uid) {
        return $http.get(root + '/location/daycount/' + uid);
      },
      users: function(page) {
        return $http.get(root + '/users/' + (page - 1) * 100 + '/100',
            { cache: true });
      },
      user: function(uid) {
        return $http.get(root + '/users/' + uid, { cache: true });
      },
      usercount: function() {
        return $http.get(root + '/usercount');
      },
      proba_matrix: function(uid) {
        return $http.get(root + '/proba_matrix/' + uid);
      },
      holiday_proba_matrix: function(uid) {
        return $http.get(root + '/proba_matrix_holiday/' + uid);
      },
      workday_proba_matrix: function(uid) {
        return $http.get(root + '/proba_matrix_workday/' + uid);
      },
      most_proba_locations: function(uid) {
        return $http.get(root + '/most_proba_locations/' + uid);
      },
      freq_seq: function(uid) {
        return $http.get(root + '/freq_seq/' + uid, { cache: true });
      },
      site_count: function(uid) {
        return $http.get(root + '/site_count/' + uid, { cache: true });
      },
      app_count: function(uid) {
        return $http.get(root + '/app_count/' + uid, { cache: true });
      },
      web_req_hist: function(uid) {
        return $http.get(root + '/web_req_histgram/' + uid, { cache: true });
      },
      call_hist: function(uid) {
        return $http.get(root + '/call_histgram/' + uid, { cache: true });
      },
      entropy_by_uid_day: function(uid, day) {
        return $http.get(root + '/entropy_by_uid_day/' + uid + '/' + day)
      },
      semantic_data: function(uid) {
        return $http.get(root + '/semantic_data/' + uid);
      },
      speed_by_uid_day: function(uid, day) {
        return $http.get(root + '/speed_by_uid_day/' + uid + '/' + day);
      },
      speed_by_uid: function(uid) {
        return $http.get(root + '/speed_by_uid/' + uid);
      },
      user_status: function(uid) {
        return $http.get(root + '/user_status/' + uid);
      }
    }
  }]);
