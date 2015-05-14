'use strict';

describe('Controller: AppAttrsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontMobileDataVisualizationApp'));

  var AppAttrsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppAttrsCtrl = $controller('AppAttrsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
