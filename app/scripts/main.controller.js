'use strict';
var MainCtrl = ['$scope', '$ionicLoading', '$state', '$ionicPopup', 'LoginService',
  function($scope, $ionicLoading, $state, $ionicPopup, LoginService) {
    var that = this;

    $scope.$on('$ionicView.beforeEnter', function(){
      that.doingLogin = that.doingSignup = false;
      that.isLoggedIn = !!LoginService.getUser();
    });

    that.login = function(loginType, user, pass) {
      $ionicLoading.show({
        template: 'Doing login...'
      });
      LoginService.login(loginType, user, pass).then(function didLogin() {
        $ionicLoading.hide();
        $state.go('app.buyer');
        that.doingLogin = that.doingSignup = false;
      }, function didNotLogin(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Couldn\'t login',
          template: err
        });
      });
    };
  }];

angular.module('HomeCooked.controllers').controller('MainCtrl', MainCtrl);
