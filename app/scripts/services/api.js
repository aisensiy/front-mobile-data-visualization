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
      },
      gprs_count_by_day: function(uid) {},
      location_by_uid: function(uid) {
        var location_range_data = [
          {
            'date': 1,
            'locations': [
              { from: '08:13', to: '09:11', location: 'a' },
              { from: '09:12', to: '12:11', location: 'b' },
              { from: '12:12', to: '13:10', location: 'c' },
              { from: '13:11', to: '17:49', location: 'b' },
              { from: '17:50', to: '18:35', location: 'd' },
              { from: '18:36', to: '19:33', location: 'a' },
            ]
          },
          {
            'date': 2,
            'locations': [
              { from: '08:13', to: '09:11', location: 'a' },
              { from: '09:12', to: '12:11', location: 'b' },
              { from: '12:12', to: '13:10', location: 'c' },
              { from: '13:11', to: '17:49', location: 'b' },
              { from: '17:50', to: '18:35', location: 'd' },
              { from: '18:36', to: '19:33', location: 'a' },
            ]
          },
          {
            'date': 3,
            'locations': [
              { from: '08:13', to: '09:11', location: 'a' },
              { from: '09:12', to: '12:11', location: 'b' },
              { from: '12:12', to: '13:10', location: 'c' },
              { from: '13:11', to: '17:49', location: 'b' },
              { from: '17:50', to: '18:35', location: 'd' },
              { from: '18:36', to: '19:33', location: 'a' },
            ]
          }
        ];
        return location_range_data;
      },
      location_by_uid_day: function(uid, day) {},
      app_log_by_uid_day: function(uid, day) {}
    }
  }]);
