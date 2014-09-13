// Whole script is in strict mode
'use strict';

var myTodos = angular.module('todo', []);

myTodos.controller('ToDoController', ['$scope', function($scope){

  $scope.todos = [
    {task: 'Pet a peach', completed: false},
    {task: 'Bite a kitten', completed: false},
    {task: 'Read a book', completed: false},
    {task: 'Clean the kitchen', completed: false},
    {task: 'Mop the floor', completed: false}
  ];

  $scope.$watch('todos', function() {
    var anyComplete = false;
    $scope.todos.forEach(function(todo){
      if(todo.completed){
        anyComplete = true;
        return;
      }
    });
    $scope.isDisabled = !anyComplete;
  }, true);

  $scope.delete = function(index) {
    $scope.todos.splice(index, 1);
  };

  $scope.add = function() {
    $scope.todos.push({task: $scope.newTodo, completed: false});
    $scope.newTodo = "";
  };

  $scope.clearFinished = function () {
    $scope.todos = $scope.todos.filter(function(todo){
      return !todo.completed;
    });
  };
}]);