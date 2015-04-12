'use strict';

describe('Directive: histgram', function () {

  // load the directive's module
  beforeEach(module('frontMobileDataVisualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<histgram></histgram>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the histgram directive');
  }));
});
