"use strict";

var contactsApp = angular.module("Contacts", ["firebase"]);

contactsApp.controller("ContactsController", ["$scope", "$firebase", function ($scope, $firebase) {
  var url = 'https://glaring-fire-7316.firebaseio.com/contacts',
    fireRef = new Firebase(url);
}]);