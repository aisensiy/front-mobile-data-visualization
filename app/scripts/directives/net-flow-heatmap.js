'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:netFlowHeatmap
 * @description
 * # netFlowHeatmap
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('netFlowHeatmap', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the netFlowHeatmap directive');
      }
    };
  });
