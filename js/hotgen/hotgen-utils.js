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

    angular.module('hotgen-message', [])
        .factory('hotgenMessage', function($rootScope){
            var broadcast_edit_node = function(){
                $rootScope.$broadcast('handle_edit_node');
            }
            var broadcast_edit_edge = function(){
                $rootScope.$broadcast('handle_edit_edge');
            }
            return {
                broadcast_edit_node: broadcast_edit_node,
                broadcast_edit_edge: broadcast_edit_edge,
            }
        });

})(window.angular);