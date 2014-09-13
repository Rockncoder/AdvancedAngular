"use strict";

var tempApp = angular.module('tempApp', ['ngRoute']).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/current', {
      templateUrl: 'partials/current.html',
      controller: 'CurrentCtrl'
    });
    $routeProvider.when('/history', {
      templateUrl: 'partials/history.html',
      controller: 'HistoryCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/current'});
  }]);


tempApp.filter("plusFifteen", [function () {
  return function (arrTemp) {
    var arrReturn = [];
    angular.forEach(arrTemp, function (value) {
      if (value.temp >= 15) arrReturn.push(value);
    });
    return arrReturn;
  }
}]);

tempApp.filter("minimum", [function () {
  return function (arrTemp, minimum) {
    var arrReturn = [],
      min = minimum || 15;

    angular.forEach(arrTemp, function (value) {
      if (value.temp >= min) arrReturn.push(value);
    });
    return arrReturn;
  }
}]);

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