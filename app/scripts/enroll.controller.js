(function() {
    'use strict';

    angular
        .module('HomeCooked.controllers')
        .controller('EnrollCtrl', EnrollCtrl);

    EnrollCtrl.$inject = ['$state', '$ionicPopup', '$ionicLoading', 'LoginService', 'HCMessaging'];

    function EnrollCtrl($state, $ionicPopup, $ionicLoading, LoginService, HCMessaging) {
        var vm = this;
        var user = LoginService.getUser();
        vm.pictureCropped = '';
        vm.form = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number
        };

        vm.enroll = enroll;

        function enroll(form) {
            form.picture = form.picture.split(';base64,').pop();
            calculateAddress(form, form.address);
            $ionicLoading.show({
                template: 'Enrolling...'
            });
            LoginService.becomeChef(form)
                .then(function() {
                    $ionicPopup.show({
                        title: 'You\'re enrolled!',
                        template: 'We\'ll reach out to you soon with further instructions.',
                        buttons: [{
                            text: 'Got it!',
                            type: 'button-positive',
                            onTap: function() {
                                // Returning a value will cause the promise to resolve with the given value.
                                $state.go('app.buyer');
                            }
                        }]
                    });
                    $ionicLoading.hide();
                })
                .catch(HCMessaging.showError);
        }

        function calculateAddress(form, place) {
            if (typeof place === 'string') {
                form.address = place;
                form.coordinates = {latitude: 37.7732, longitude: -122.42134};
            }
            else {
                form.address = place.formatted_address;
                form.coordinates = {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()};
            }
        }
    }

})();
