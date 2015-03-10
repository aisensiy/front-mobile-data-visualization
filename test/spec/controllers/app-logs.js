'use strict';

describe('Controller: AppLogsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontMobileDataVisualizationApp'));

  var AppLogsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppLogsCtrl = $controller('AppLogsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
