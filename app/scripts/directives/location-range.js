'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:locationRange
 * @description
 * # locationRange
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('locationRange', ['$window', function ($window) {
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '=',
        seed: '@'
      },
      link: function postLink(scope, element, attrs) {
        var seed = scope.seed || (+new Date) % 10;
        function clock_to_num(str) {
          var split = str.slice(8, 12)
          return +split.slice(0, 2) * 60 + +split.slice(2);
        }

        var hashCategory = function(location) {
          function hashCode(location) {
            var hash = 0;
            if (location.length == 0) {
              return hash;
            }

            var i;
            for (i = 0; i < location.length; i++) {
              var charCode = location.charCodeAt(i);
              hash = ((hash << 5) - hash) + charCode + seed;
              hash = hash & hash
            }

            if (hash < 0) {
              hash *= -1;
            }

            return hash;
          }
          var d3_category = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
            '#f7acbc', '#444693', '#121a2a', '#45224a'
          ];

          return d3_category[hashCode(location) % d3_category.length];
        };

        var gridWidth = 25;
        var width = gridWidth * 31;
        var margin = { top: 25, right: 0, bottom: 40, left: 30 };
        var height = 400 - margin.top - margin.bottom;
        var times = d3.range(24);

        var svg = d3.select(element[0]).append('svg').style('width', '100%')
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        d3.select(element[0]).append('div')
          .attr('id', 'tooltip')
          .classed('hidden', true)
          .append('p')
          .append('span')
          .attr('id', 'value');

        var y = d3.scale.linear().domain([0, 24 * 60 - 1]).range([0, height]);

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

          var dayLabels = svg.selectAll(".dayLabel")
              .data(d3.range(1, 32))
              .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridWidth; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridWidth / 2 + ", -6)");

          var time_labels = svg.selectAll('.timeLabel')
            .data(times)
            .enter().append('text')
            .text(function(d) { return d; })
            .attr('x', 0)
            .attr('y', function(d, i) { return y(i * 60); })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridWidth / 1.5 + ")");

          var heatmaps = [];
          data.forEach(function(entity) {
            var date = parseInt(entity.date);
            var no_duplicated_locations = {};
            var one_day_data = entity.locations.map(function(elem) {
              no_duplicated_locations[elem.location] = true;
              return {
                start_time: clock_to_num(elem.start_time),
                end_time: clock_to_num(elem.end_time),
                location: elem.location,
                title: elem.start_time + '-' + elem.end_time
              };
            });
            svg.selectAll('.day' + date).data(one_day_data)
              .enter().append('rect')
              .attr('x', function(d) { return gridWidth * (date - 1); })
              .attr('y', function(d) { return y(d.start_time); })
              .attr('width', gridWidth)
              .attr('height', function(d) { return y(d.end_time) - y(d.start_time); })
              .attr('title', function(d) { return d.title; })
              .attr('fill', function(d) { return hashCategory(d.location); })
              .on('mouseover', function(d) {
                d3.select(this).classed("cell-hover", true);

                //Update the tooltip position and value
                d3.select("#tooltip")
                  .style("left", (d3.event.pageX + 10) + "px")
                  .style("top", (d3.event.pageY - 10) + "px")
                  .select("#value")
                  .text(d.title + '\n' + d.location);
                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
              })
              .on('mouseout', function(d) {
                d3.select(this).classed("cell-hover",false);
                d3.select("#tooltip").classed("hidden", true);
              });
          });
        };
      }
    };
  }]);
