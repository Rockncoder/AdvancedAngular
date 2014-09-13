"use strict";

tempApp.controller('CurrentCtrl', ['$scope', function($scope){
}]);

tempApp.controller('HistoryCtrl', ['$scope', function($scope){
  $scope.historyData = [
    {'date': '2013-04-01T17:01:22.634Z', 'temp': 8},
    {'date': '2013-04-02T17:01:22.634Z', 'temp': 13},
    {'date': '2013-04-03T17:01:22.634Z', 'temp': 15},
    {'date': '2013-04-04T17:01:22.634Z', 'temp': 11},
    {'date': '2013-04-05T17:01:22.634Z', 'temp': 15},
    {'date': '2013-04-06T17:01:22.634Z', 'temp': 17},
    {'date': '2013-04-07T17:01:22.634Z', 'temp': 21}
  ];
}]);
