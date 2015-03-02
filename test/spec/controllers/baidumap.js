'use strict';

describe('Controller: BaidumapCtrl', function () {

  // load the controller's module
  beforeEach(module('frontMobileDataVisualizationApp'));

  var BaidumapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BaidumapCtrl = $controller('BaidumapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
