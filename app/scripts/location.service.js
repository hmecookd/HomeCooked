'use strict';
(function() {
    angular.module('HomeCooked.services').factory('LocationService', LocationService);

    LocationService.$inject = ['$timeout', '$window', 'HCMessaging'];
    function LocationService($timeout, $window, HCMessaging) {
        //center the map on user location
        var location;
        $timeout(function() {
            $window.navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationFail, {maximumAge: 30000});
        }, 200);

        return {
            getCurrentLocation: getCurrentLocation,
            getDistanceFrom: getDistanceFrom
        };

        function getCurrentLocation() {
            return location;
        }

        function getDistanceFrom(l) {
            if (!location || !l) {
                return '';
            }
            return distance(location.latitude, location.longitude, l.latitude, l.longitude).toFixed(1) + ' miles';
        }

        function distance(lat1, lon1, lat2, lon2) {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            return dist;
        }


        function onLocationSuccess(position) {
            location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        }

        function onLocationFail() {
            HCMessaging.showMessage('Error', 'Unable to retrieve your location');
        }
    }
})();
