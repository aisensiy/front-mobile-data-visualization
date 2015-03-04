'use strict';

describe('Directive: netFlowHeatmap', function () {

  // load the directive's module
  beforeEach(module('frontMobileDataVisualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<net-flow-heatmap></net-flow-heatmap>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the netFlowHeatmap directive');
  }));
});
