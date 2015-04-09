'use strict';

var SeqMapController = (function() {
  function MapController() {
    this.overlays = [];
  }

  MapController.prototype.clean_map = function(map) {
    var i;
    this.overlays.forEach(function(overlay) {
      map.removeOverlay(overlay);
    });
  };

  MapController.prototype.render = function(map, raw) {
    var points = raw2points(raw);

    var center = get_points_center(points);
    map.panTo(new BMap.Point(center[0], center[1]));

    var curve = new BMapLib.CurveLine(
      points.map(function(point) { return new BMap.Point(point[0], point[1]); }),
      {strokeColor: "#00BFFF", strokeWeight:6, strokeOpacity:0.3});
    map.addOverlay(curve);

    var bluemarker = new BMap.Icon(
        "/images/bluemarker.png",
        new BMap.Size(16, 16),
        {anchor: new BMap.Size(8, 16)});

    var markers = [];
    var label_texts = {};

    points.forEach(function(point) {
      var map_point = new BMap.Point(point[0], point[1]);
      var marker = new BMap.Marker(map_point, {icon: bluemarker});
      map.addOverlay(marker);
      markers.push(marker);
      if (label_texts[point[0], point[1]]) {
        label_texts[point[0], point[1]].times.push(point[2] + '-' + point[3]);
      } else {
        label_texts[point[0], point[1]] = {
          point: map_point,
          times: [point[2] + '-' + point[3]]
        };
      }
    });

    // var labels = [];
    // for (points in label_texts) {
    //   var map_point = label_texts[points].point;
    //   var times = label_texts[points].times;
    //   var opts = {
    //     position: map_point,
    //     offset: new BMap.Size(15, -10)
    //   };
    //   var label = new BMap.Label(times.join('<br />'), opts);
    //   label.setStyle({
    //     color : "red",
    //     fontSize : "12px",
    //     background: 'none',
    //     border: 0,
    //     fontFamily:"微软雅黑"
    //   });
    //   map.addOverlay(label);
    //   labels.push(label);
    // }

    markers.push(curve);
    this.overlays = markers.concat(labels);
  };

  function raw2points(raw) {
    if (!raw) {
      return [];
    }
    return raw.map(function(raw_point) {
      var pair = raw_point.split(' ');
      return [+pair[0] + 0.013, +pair[1] + 0.007];
    });
  }

  function get_points_center(points) {
    var len = points.length;
    var sum = [0, 0];
    points.forEach(function(point) {
      sum[0] += point[0];
      sum[1] += point[1];
    });
    return [sum[0] / len, sum[1] / len];
  }

  return MapController;
})();

/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:seqMap
 * @description
 * # seqMap
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('seqMap', ['$window', function ($window) {
    return {
      template: '<div id="map" style="height: 400px;"></div>',
      restrict: 'E',
      scope: {
        'data': '='
      },
      link: function postLink(scope, element, attrs) {
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
          element.find('div')[0].innerHTML = '';
          var map = new BMap.Map(element.find('div')[0]);
          var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
          map.enableScrollWheelZoom()
          map.enableContinuousZoom()
          map.addControl(new BMap.NavigationControl())
          map.centerAndZoom(point, 13);

          var map_controller = new SeqMapController();
          map_controller.render(map, data);
        };
      }
    };
  }]);
