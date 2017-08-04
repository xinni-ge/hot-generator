(function(angular) {
    'use strict';
    angular.module('hotgen-utils', ['cgNotify', 'angular-uuid'])
         .factory('hotgenUUID', function(uuid) {
            return {
              uuid: uuid.v4,
            };
         })
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
                }); };

            var show_error = function(message) {
                notify({
                        message: message,
                        classes: ['alert-danger',],
                });};
            var show_info = function(message) {
                notify({
                        message: message,
                        classes: ['alert-info',],
                        duration: 5000,
                });};

            var show_warning = function(message) {
                notify({
                        message: message,
                        classes: ['alert-warning',],
                });};

            return {
                show_success: show_success,
                show_error: show_error
            };
         })
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