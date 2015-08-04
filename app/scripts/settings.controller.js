(function() {
    'use strict';

    angular
        .module('HomeCooked.controllers')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope', '$state', '$ionicPlatform',
        '$ionicPopup', '$ionicLoading', '$ionicHistory', 'LoginService', 'ChefService', 'HCMessaging', 'HCModalHelper'];

    function SettingsCtrl($scope, $state, $ionicPlatform,
                          $ionicPopup, $ionicLoading, $ionicHistory, LoginService, ChefService, HCMessaging, HCModalHelper) {

        var vm = this;
        vm.onChange = onChange;
        vm.onSave = onSave;
        vm.openExternalLink = openExternalLink;
        vm.openRatingLink = openRatingLink;
        vm.confirmLogout = confirmLogout;
        vm.showUpdatePayment = showUpdatePayment;

        $scope.$on('$ionicView.beforeEnter', function() {
            var user = LoginService.getUser();
            if (user.is_chef && LoginService.getChefMode()) {
                ChefService.getChef(user.id).then(function(chef) {
                    vm.user = chef;
                });
            }
            else {
                vm.user = user;
            }
        });

        function updateUserProperties() {
            if (vm.userPropertiesChanged) {
                $ionicLoading.show();
                LoginService.saveUserData({
                    email: vm.user.email,
                    phone_number: vm.user.phone_number
                })
                    .then(function() {
                        $state.go('app.settings');
                    })
                    .catch(HCMessaging.showError)
                    .finally($ionicLoading.hide);
            }
        }

        function onSave() {
            updateUserProperties();
        }

        function onChange() {
            vm.userPropertiesChanged = true;
        }

        function openRatingLink() {
            var link = $ionicPlatform.is('android') ? 'market://details?id=' : 'itms://itunes.apple.com/app/';
            return openExternalLink(link);
        }

        function openExternalLink(link) {
            return window.open(link, '_system');
        }

        function confirmLogout() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Are you sure?',
                template: 'Signing out will remove your HomeCooked data from this device. Do you want to sign out?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    LoginService.logout();
                    $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableAnimate: true
                    });
                    $state.go('zipcode-validation');
                }
            });
        }

        function showUpdatePayment() {
            HCModalHelper.showUpdatePayment();
        }
    }

})();
