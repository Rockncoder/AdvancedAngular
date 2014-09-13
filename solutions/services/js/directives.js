"use strict";

tempApp.directive('rncChart', [function () {
  return {
    template: '<div id="container"></div>',
    link: function (scope, element, attrs) {
      var chart = new Morris.Line({
        element: 'container',
        xkey: 'date',
        ykeys: ['temp'],
        labels: ['Temperature']
      });

      scope.$watchCollection(attrs.rncChart, function (value) {
        chart.setData(angular.copy(value));
      });
    }
  }
}]);