(function(angular) {
    'use strict';
    angular.module('hotgen-uuid', [])
         .factory('hotgenUUID', function() {
            var uuid = function(){
                var d = new Date().getTime();
                if(window.performance && typeof window.performance.now === "function"){
                    d += performance.now(); //use high-precision timer if available
                }
                var new_uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                });
                return new_uuid;
            }

            return {
              uuid: uuid,
            };
         });

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

    angular.module('hotgen-canvas', [])
        .factory('canvasStatus', function($rootScope){
            var call_edit_resource = function(){
                $rootScope.$broadcast('handle_edit_resource');
            }
            return {
                call_edit_resource: call_edit_resource,
            }
        });

})(window.angular);