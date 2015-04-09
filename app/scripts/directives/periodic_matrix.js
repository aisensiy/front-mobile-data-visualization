'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:periodicMatrix
 * @description
 * # periodicMatrix
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('periodicMatrix', ['$window', function ($window) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {
        var gridSize = 20;
        var margin = { top: 25, right: 0, bottom: gridSize + 10, left: 140};
        var legendElementWidth = gridSize * 3;
        var height = gridSize * 20;
        var buckets = 9;
        var colors = ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'];
        var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];
        var times = d3.range(1, 49);

        var svg = d3.select(element[0]).append('svg').style('width', '100%');

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

          var locations = d3.keys(data);
          var data_ary = [];
          var i, j;
          for (i = 0; i < locations.length; i++) {
            var row = data[locations[i]];
            for (j = 0; j < row.length; j++) {
              data_ary.push({
                location: i,
                time: j,
                value: row[j]
              });
            }
          }

          var width = $(element[0]).width() - margin.left - margin.right;
          var height = gridSize * locations.length;
          svg.attr('height', height + margin.top + margin.bottom)
          var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          var colorScale = d3.scale.quantile()
            .domain([0, d3.max(data_ary, function(d) { return d.value; })])
            .range(colors);

          var location_labels = g.append('g')
            .selectAll('.dayLabel')
            .data(locations)
            .enter().append('text')
            .text(function(d) { return d; })
            .attr('x', 0)
            .attr('y', function(d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")");

          var timeLabels = g.selectAll(".timeLabel")
              .data(times)
              .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridSize; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)");

          var heatMap = g.selectAll(".hour")
              .data(data_ary)
              .enter().append("rect")
              .attr("x", function(d) { return d.time * gridSize; })
              .attr("y", function(d) { return d.location * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0])
              .attr("title", function(d) { return d.value; });

          heatMap.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

          heatMap.append("title").text(function(d) { return d.count; });

          var legend = g.selectAll(".legend")
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
            .text(function(d) { return "≥ " + d.toFixed(2); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

        };
      }
    };
  }]);
