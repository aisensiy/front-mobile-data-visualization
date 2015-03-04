'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:calendarHeatmap
 * @description
 * # calendarHeatmap
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('calendarHeatmap', function () {
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '=',
        weeks: '@'
      },
      link: function postLink(scope, element, attrs) {
        var cal = new Calendar();
        var weeks = cal.monthDays(+attrs.year, +attrs.month - 1);
        console.log(weeks);
      }
    };
  });
