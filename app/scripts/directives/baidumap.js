'use strict';


var MapController = (function() {
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
    console.log(center);
    map.panTo(new BMap.Point(center[0], center[1]));

    var curve = new BMapLib.CurveLine(
      points.map(function(point) { return new BMap.Point(point[0], point[1]); }),
      {strokeColor: "#00BFFF", strokeWeight:6, strokeOpacity:0.5});
    map.addOverlay(curve);

    var bluemarker = new BMap.Icon(
        "/images/bluemarker.png",
        new BMap.Size(16, 16),
        {anchor: new BMap.Size(8, 16)});
    var markers = [];
    points.forEach(function(point) {
      point = new BMap.Point(point[0], point[1]);
      var marker = new BMap.Marker(point, {icon: bluemarker});
      map.addOverlay(marker);
      markers.push(marker);
    });

    markers.push(curve);
    this.overlays = markers;
  };

  function raw2points(raw) {
    return raw.map(function(raw_point) {
      var pair = raw_point.split(' ');
      return [+pair[1], +pair[0]];
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
/*
    # init map
    center = pointavg(pairs)
    console.log 'center:', center
    point = new BMap.Point(center[0], center[1])
    map.panTo(point)

    # add curve
    curve = new BMapLib.CurveLine(
        points,
        {strokeColor: "#00BFFF", strokeWeight:6, strokeOpacity:0.5})
    map.addOverlay(curve)

    bluemarker = new BMap.Icon("/assets/bluemarker.png",
                           new BMap.Size(16, 16),
                           {anchor: new BMap.Size(8, 16)})
    redmarker = new BMap.Icon("/assets/redmarker.png",
                           new BMap.Size(16, 16),
                           {anchor: new BMap.Size(8, 16)})

    markericons = [redmarker, bluemarker]

    # add marker
    markers = []
    for i in [0..(points.length - 1)]
      p = points[i]
      markericon = if pairs[i].length >= 3 then pairs[i][2] else 0
      marker = new BMap.Marker(p, {icon: markericons[markericon]})
      map.addOverlay(marker)
      markers.push(marker)

    format_time = (d) ->
      return moment(d).format('HH:mm:ss')

    geo = new BMap.Geocoder()

    addresses = []

    n = points.length

    for i in [0..(n - 1)]
      point = points[i]
      time = pairs[i][0]
      marker = markers[i]
      ((pair, point, marker, time) ->
        geo.getLocation point, (rs) ->
          label = new BMap.Label(format_time(time), {offset: new BMap.Size(20, -10)})
          marker.setLabel(label)
          addresses.push([time, rs, pair])
          if addresses.length == n
            if finish
              finish(addresses)
      )(pairs[i], point, marker, time)

    markers.push(curve)
    @overlays = markers
*/
/**
 * @ngdoc directive
 * @name frontMobileDataVisualizationApp.directive:baidumap
 * @description
 * # baidumap
 */
angular.module('frontMobileDataVisualizationApp')
  .directive('baidumap', function () {
    return {
      template: '<div id="map" style="height: 300px;"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var raw_points = JSON.parse(attrs.locations).map(function(point) {
          return point[1];
        });
        var map = new BMap.Map('map');
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        map.enableScrollWheelZoom()
    map.enableContinuousZoom()
    map.addControl(new BMap.NavigationControl())
        map.centerAndZoom(point, 15);
        var map_controller = new MapController();
        map_controller.render(map, raw_points);
      }
    };
  });
