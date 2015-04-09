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
      .when('/location/:uid', {
        templateUrl: 'views/location.html',
        controller: 'LocationCtrl'
      })
      .when('/net/:uid', {
        templateUrl: 'views/net.html',
        controller: 'NetCtrl'
      })
      .when('/app-logs/:uid', {
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
      .when('/user/:uid', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      .otherwise({
        redirectTo: '/test'
      });
  });
