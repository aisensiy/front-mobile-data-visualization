'use strict';

describe('Directive: calendarHeatmap', function () {

  // load the directive's module
  beforeEach(module('frontMobileDataVisualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<calendar-heatmap></calendar-heatmap>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the calendarHeatmap directive');
  }));
});
