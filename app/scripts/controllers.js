'use strict';
angular.module('HomeCooked.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.login();
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Open the login modal
    $scope.logout = function () {
      $scope.loginData = {};
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('SellerCtrl', function () {
  })
  .controller('BuyerCtrl', function ($scope) {
    $scope.findChefs = function () {
      console.log(arguments);
    };
    $scope.openOrders = function () {
      console.log(arguments);
    };
  });