'use strict';

/**
 * @ngdoc overview
 * @name frontMobileDataVisualizationApp
 * @description
 * # frontMobileDataVisualizationApp
 *
 * Main module of the application.
 */
angular
  .module('frontMobileDataVisualizationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap.pagination'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/location', {
        templateUrl: 'views/location.html',
        controller: 'LocationCtrl'
      })
      .when('/net', {
        templateUrl: 'views/net.html',
        controller: 'NetCtrl'
      })
      .when('/app-logs', {
        templateUrl: 'views/app-logs.html',
        controller: 'AppLogsCtrl'
      })
      .when('/map/:uid/:day', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/userlist', {
        templateUrl: 'views/userlist.html',
        controller: 'UserlistCtrl'
      })
      .otherwise({
        redirectTo: '/net'
      });
  });
