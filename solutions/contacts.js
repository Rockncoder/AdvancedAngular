"use strict";

var contactsApp = angular.module("Contacts", ["firebase"]);

contactsApp.controller("ContactsController", ["$scope", "$firebase", function ($scope, $firebase) {
  var url = 'https://glaring-fire-7316.firebaseio.com/contacts',
    fireRef = new Firebase(url);

  $scope.contacts = $firebase(fireRef).$asArray();
  $scope.inEditMode = false;
  $scope.currentContact = {};
  $scope.editingContactIndex = 0;

  $scope.add = function () {
    $scope.contacts.$add($scope.currentContact);
    $scope.currentContact = {};
  };

  $scope.edit = function () {
    // once the user has accept the edit,
    // we update the contact via its index and
    // save the contacts array
    $scope.contacts[$scope.editingContactIndex] = $scope.currentContact;
    $scope.contacts.$save($scope.currentContact);
    $scope.currentContact = {};
    $scope.inEditMode = false;
  };

  $scope.select = function (index) {
    // In order to not change the list of contacts until user accepts
    // edit we make a copy of the contact and save its index
    $scope.editingContactIndex = index;
    $scope.currentContact = angular.copy($scope.contacts[index]);
    $scope.inEditMode = true;
  };

  $scope.clear = function () {
    $scope.currentContact = {};
    $scope.inEditMode = false;
  };

  $scope.delete = function (contact) {
    $scope.contacts.$remove(contact);
  };
}]);