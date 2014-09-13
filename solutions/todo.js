// Whole script is in strict mode
'use strict';

var myApp = angular.module('ToDo', []);

myApp.controller('toDoController', ['$scope', function ($scope) {
  $scope.todos = [
    {'title': 'Pet a peach', completed: false},
    {'title': 'Bite a puppy', completed: false}
  ];

  $scope.$watch('todos', function () {
    debugger;
    var anyComplete = false;
    $scope.todos.forEach(function (todo) {
      if (todo.completed) {
        anyComplete = true;
        return;
      }
    });
    $scope.isDisabled = !anyComplete;
  }, true);

  $scope.add = function () {
    $scope.todos.push({title: $scope.newTodo, completed: false});
    $scope.newTodo = "";
  };

  $scope.delete = function (index) {
    $scope.todos.splice(index, 1);
  };

  $scope.clearFinished = function () {
    $scope.todos = $scope.todos.filter(function (item) {
      return !item.completed;
    });
  };
}]);