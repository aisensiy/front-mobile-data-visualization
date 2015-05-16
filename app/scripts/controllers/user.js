'use strict';

/**
 * @ngdoc function
 * @name frontMobileDataVisualizationApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the frontMobileDataVisualizationApp
 */
angular.module('frontMobileDataVisualizationApp')
  .controller('UserCtrl', ['$scope', 'api', '$routeParams', function ($scope, api, $routeParams) {
    $scope.uid = $routeParams.uid;
    $scope.seed = +new Date() % 10;
    api.user($scope.uid).success(function(data) {
      $scope.user = data;
    });
    api.location_by_uid($scope.uid).success(function(data) {
      $scope.location_range_data = data;
    });
    api.location_stop_by_uid($scope.uid).success(function(data) {
      $scope.location_stop_range_data = data;
    });
    api.user_status_proba($routeParams.uid).success(function(data) {
      $scope.status_matrix = data;
      $scope.stop_proba = data['stop'].map(function(elem, idx) {
        return {
          tick: idx + 1,
          count: elem
        }
      });
      $scope.move_proba = data['move'].map(function(elem, idx) {
        return {
          tick: idx + 1,
          count: elem
        }
      });
      $scope.off_proba = data['off'].map(function(elem, idx) {
        return {
          tick: idx + 1,
          count: elem
        }
      });
    });
    api.proba_matrix($routeParams.uid).success(function(data) {
      $scope.proba_matrix = data;
    });

    // api.holiday_proba_matrix($routeParams.uid).success(function(data) {
    //   $scope.holiday_proba_matrix = data;
    // });
    // api.workday_proba_matrix($routeParams.uid).success(function(data) {
    //   $scope.workday_proba_matrix = data;
    // });

    api.freq_seq($routeParams.uid).success(function(data) {
      $scope.freq_seqs = data;
    });

    // api.semantic_data($routeParams.uid).success(function(data) {
    //   $scope.semantic_data = data;
    // });

    api.most_proba_locations($routeParams.uid).success(function(data) {
      $scope.most_proba_locations = data;
    });


    api.speed_by_uid($routeParams.uid).success(function(data) {
      $scope.total_speeds = data.filter(function(elem) {
        return elem.length > 0;
      });
    });

    api.semantic_proba_matrix($routeParams.uid).success(function(data) {
      $scope.semantic_proba_matrix = data;
    });

    api.district_proba_matrix($routeParams.uid).success(function(data) {
      $scope.district_proba_matrix = data;
    });

    api.tag_proba_matrix($routeParams.uid).success(function(data) {
      $scope.tag_proba_matrix = data;
    });

  }]);
