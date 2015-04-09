'use strict';

describe('Directive: periodicMatrix', function () {

  // load the directive's module
  beforeEach(module('frontMobileDataVisualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<periodic-matrix></periodic-matrix>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the periodicMatrix directive');
  }));
});
