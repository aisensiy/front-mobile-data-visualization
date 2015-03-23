'use strict';

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:timeLocationChart
 * @description
 * # timeLocationChart
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('timeLocationChart', ['$window', function ($window) {
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {
        var margin = { top: 25, right: 0, bottom: 40, left: 140 };
        var width = 800 - margin.left - margin.right;
        var line_height = 30;
        var svg = d3.select(element[0]).append('svg').style('width', '100%');
        var time_parse = d3.time.format('%Y%m%d%H%M%S').parse;

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

        function _transition_data(svg, data, x) {
          svg.selectAll(".loc")
            .data(data)
            .transition()
            .duration(500)
            .attr('cx', function(d) { return x(time_parse(d.start_time)); });
        }

        function _reset_index(svg, xAxis) {
          svg.transition()
            .duration(500)
            .select('.axis')
            .call(xAxis)
        }

        function gernerate_location_id(data) {
          var id = 1;
          var location_id_map = {};
          data.forEach(function(location) {
            if (!location_id_map[location.location]) {
              location_id_map[location.location] = id;
              id += 1;
            }
          });
          return [location_id_map, id];
        }

        function start_of_day(string) {
          console.log(string);
          return time_parse(string.slice(0, 8) + '000000');
        }

        function end_of_day(string) {
          return time_parse(string.slice(0, 8) + '235959');
        }

        scope.render = function(data) {
          svg.selectAll('*').remove();

          if (!data) {
            return;
          }

          var returns = gernerate_location_id(data);
          var location_id_map = returns[0];
          var location_count = returns[1];
          var height = line_height * location_count;

          var g = svg.attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          var start = start_of_day(data[0].start_time);
          var end = end_of_day(data[0].start_time);
          console.log(start);
          var x = d3.time.scale().range([0, width])
            .domain([start, end]);
          var y = d3.scale.linear().range([height, 0])
            .domain([0, location_count]);
          var color = d3.scale.category20();

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom").ticks(13);

          var location_list = [];
          for (var key in location_id_map) {
            location_list.push([key, location_id_map[key]]);
          }

          svg.append('g').attr('transform', 'translate(0,' + margin.top + ')')
            .selectAll('text')
            .data(location_list)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr({
              'x': self.graph_width,
              'y': function(d) {
                return y(d[1])
              }
            })
            .text(function(d) { return d[0]; })
            .style('fill', function(d) { return color(d[1]); });


          g.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'loc')
            .attr('cx', function(d) { return x(time_parse(d.start_time)); })
            .attr('cy', function(d) { return y(location_id_map[d.location]); })
            .attr('r', 4)
            .style('fill', function(d) { return color(location_id_map[d.location]); });

          g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

          function create_brush() {

            var brushmove = function() {
              var rg = brush.extent()
                var filted = []
                data.forEach(function(x) {
                  if (time_parse(x.start_time) >= rg[0] && time_parse(x.start_time) <= rg[1]) {
                    filted.push(x);
                  }
                });
            };

            var brushend = function() {
              var get_button = svg.select('.clear_button')
                if (get_button.empty()) {
                  var clearbtn = svg.append('text')
                    .attr({
                      x: width + 160,
                      y: 34
                    })
                  .attr('class', 'clear_button')
                    .text('Clear Brush');
                }

              x.domain(brush.extent());
              _transition_data(svg, data, x);
              _reset_index(svg, xAxis);
              svg.select('.brush').call(brush.clear());
              svg.classed("selecting", !brush.empty());

              clearbtn.on('click', function() {
                x.domain([start, end]);
                _transition_data(svg, data, x)
                _reset_index(svg, xAxis)
                clearbtn.remove()
              });
            };

            var brush = d3.svg.brush().x(x)
              .on('brush', brushmove)
              .on('brushend', brushend);

            g.append('g')
              .attr('class', 'brush')
              .attr('transform', "translate(0, -8)")
              .call(brush)
              .selectAll('rect')
              .attr('height', height);
          }
          create_brush();
        }
      }
    }
  }]);
