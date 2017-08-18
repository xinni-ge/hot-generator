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
                        duration: 3000,
                }); };

            var show_error = function(message) {
                notify({
                        message: message,
                        classes: ['alert-danger',],
                        duration: 5000,
                });};
            var show_info = function(message) {
                notify({
                        message: message,
                        classes: ['alert-info',],
                        duration: 3000,
                });};

            var show_warning = function(message) {
                notify({
                        message: message,
                        classes: ['alert-warning',],
                        duration: 5000,
                });};

            return {
                show_success: show_success,
                show_error: show_error,
                show_info: show_info,
                show_warning: show_warning
            };
         })
         .factory('hotgenMessage', function($rootScope){
            var broadcast_edit_node = function(node_type){
                $rootScope.$broadcast('handle_edit_node', node_type);
            };
            var broadcast_edit_edge = function(edge_type){
                $rootScope.$broadcast('handle_edit_edge', edge_type);
            };
            var broadcast_load_draft = function(){
                $rootScope.$broadcast('handle_load_draft');
            }
            return {
                broadcast_edit_node: broadcast_edit_node,
                broadcast_edit_edge: broadcast_edit_edge,
                broadcast_load_draft: broadcast_load_draft,
            }
        })
        .factory('hotgenValidate', function(){

            var validate_keypair = function(input_string){
                var re=/^([0-9a-zA-Z_.-]{1,255})=([0-9a-zA-Z_.-]{1,255})$/
                return re.exec(input_string);
            };
            return {
                validate_keypair: validate_keypair,
            }
        })
        ;

})(window.angular);