'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:histgram
 * @description
 * # histgram
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('histgram', ['$window', function ($window) {
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '=',
        index: '@',
        range: '@'
      },
      link: function postLink(scope, element, attrs) {

        // A formatter for counts.
        var formatCount = d3.format(",.0f");
        var barWidth = 20;
        var gap = 3;
        var rng = +scope.range;

        var margin = {top: 10, right: 30, bottom: 30, left: 40},
            width = (barWidth + gap) * rng,
            height = 200 - margin.top - margin.bottom;

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

          var x = d3.scale.linear()
            .domain([0, 23])
            .range([0, width]);


          var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.count; })])
            .range([height, 0]);

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

          var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + d[scope.index] * (barWidth + gap) + "," + y(d.count) + ")"; });

          bar.append("rect")
            .attr("x", 1)
            .attr("width", barWidth)
            .attr("height", function(d) { return height - y(d.count); });

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height + 15) + ")")
            .selectAll('.text')
            .data(d3.range(rng))
            .enter().append("text")
            .text(function(d) { return d; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("x", function(value) {
              return value * (barWidth + gap) + barWidth / 2;
            });

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        };
      }
    };
  }]);
