'use strict';
(function () {
  angular.module('HomeCooked.controllers').controller('BioCtrl', BioCtrl);

  BioCtrl.$inject = ['$scope', '$ionicLoading', 'ChefService', 'LoginService', 'HCMessaging'];

  function BioCtrl($scope, $ionicLoading, ChefService, LoginService, HCMessaging) {
    var vm = this;
    vm.updateBio = updateBio;
    vm.maxLength = 600;
    vm.chefInfo = {};

    $scope.$on('$ionicView.beforeEnter', function () {
      vm.modify = false;
      ChefService.getChefInfo(LoginService.getUser().id).then(function (info) {
        vm.chefInfo = info;
      });
    });

    function updateBio() {
      $ionicLoading.show({
        template: 'Updating...'
      });
      ChefService.setChefBio(vm.chefInfo.user, vm.chefInfo.bio)
        .then(function () {
          vm.modify = false;
        })
        .catch(HCMessaging.showError)
        .finally(function () {
          $ionicLoading.hide();
        });
    }
  }
})();
