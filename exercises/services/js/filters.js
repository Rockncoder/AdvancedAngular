"use strict";

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