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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/baidumap', {
        templateUrl: 'views/baidumap.html',
        controller: 'BaidumapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
