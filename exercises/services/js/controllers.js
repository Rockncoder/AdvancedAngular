///Parse
"use strict";

tempApp.controller('CurrentCtrl', ['$scope', 'reading', function ($scope, reading) {
  $scope.temp = 17;
  $scope.save = function() {
    reading.save($scope.temp);
  };
}]);

tempApp.controller('HistoryCtrl', ['$scope', 'reading', function ($scope, reading) {
  reading.query(function(data){
    $scope.historyData = data;
    $scope.$apply();
  });
  $scope.tempMin = 15;
}]);
