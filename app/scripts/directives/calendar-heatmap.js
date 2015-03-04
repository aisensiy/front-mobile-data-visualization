'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:calendarHeatmap
 * @description
 * # calendarHeatmap
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('calendarHeatmap', ['$window', function ($window) {
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '=',
        weeks: '@'
      },
      link: function postLink(scope, element, attrs) {
        var cal = new Calendar(1);
        var weeks = cal.monthDays(+attrs.year, +attrs.month - 1);
        var week_len = weeks.length;
        var day_idx_map = {};
        weeks.forEach(function(week, week_idx) {
          week.forEach(function(day, day_idx) {
            day_idx_map[day] = {week_idx: week_idx, day_idx: day_idx};
          });
        });

        var  gridSize = 40;
        var margin = { top: 25, right: 0, bottom: gridSize + 10, left: 30 };
        var legendElementWidth = gridSize * 2;
        var height = gridSize * 7;
        var buckets = 9;
        var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];
        var colors = ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'];
        var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

        var svg = d3.select(element[0]).append('svg').style('width', '100%')
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


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
            return;
          }

          var width = $(element[0]).width() - margin.left - margin.right;

          var colorScale = d3.scale.quantile()
            .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
            .range(colors);

          var day_labels = svg.selectAll('.dayLabel')
            .data(days)
            .enter().append('text')
            .text(function(d) { return d; })
            .attr('x', function(d, i) { return i * gridSize; })
            .attr('y', 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")

          var heatMap = svg.selectAll(".hour")
              .data(data)
              .enter().append("rect")
              .attr("x", function(d) { return day_idx_map[d.day].day_idx * gridSize; })
              .attr("y", function(d) { return day_idx_map[d.day].week_idx * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          heatMap.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

          heatMap.append("title").text(function(d) { return d.value; });

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);
        }
      }
    };
  }]);
