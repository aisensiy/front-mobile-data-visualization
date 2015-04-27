'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:speedChart
 * @description
 * # speedChart
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('speedChart', ['$window', function ($window) {
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {
        // A formatter for counts.
        var formatCount = d3.format(",.0f");
        var time_parse = d3.time.format('%Y%m%d%H%M%S').parse;

        function start_of_day(string) {
          return time_parse(string.slice(0, 8) + '000000');
        }

        function end_of_day(string) {
          return time_parse(string.slice(0, 8) + '235959');
        }

        var margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = 500,
            height = 150 - margin.top - margin.bottom;

        var svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        window.onresize = function() {
          scope.$apply();
        };

        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          scope.render(scope.data);
        });

        scope.$watch('data', function(newVals, oldVals) {
          return scope.render(newVals);
        });

        scope.render = function(data) {
          svg.selectAll('*').remove();

          if (!data) {
            return
          }

          var start = start_of_day(data[0].time),
              end = end_of_day(data[0].time);

          console.log(start);
          var x = d3.time.scale().range([0, width]).domain([start, end]);
          var y = d3.scale.linear().range([height, 0]).domain([-1, 2.5]);

          var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(13);
          var yAxis = d3.svg.axis().scale(y).orient("left");

          var line = d3.svg.line()
            .x(function(d) { return x(time_parse(d.time)); })
            .y(function(d) { return y(d.speed); });

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append('text')
            .attr("y", 6)
            .text(data[0].time.slice(0, 8));

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

          svg.append("path")
            .attr("class", "line")
            .attr("d", line(data));
        };
      }
    };
  }]);
