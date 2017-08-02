(function(angular) {
  'use strict';
  angular.module('hotgen-notify', ['cgNotify'])
         .factory('hotgenNotify', function(notify) {
            notify.config({
                position: 'right',
                duration: 0,
            });
            var show_success = function(message) {
                notify({
                        message: message,
                        classes: ['alert-success',],
                        duration: 5000,
                });             };

            var show_error = function(message) {
                notify({
                        message: message,
                        classes: ['alert-danger',],
                });
            };

            return {
              show_success: show_success,
              show_error: show_error
            };
         });
})(window.angular);