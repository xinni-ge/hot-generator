(function(angular) {
    'use strict';
    angular.module('hotgen-utils', ['cgNotify', 'angular-uuid'])
         .factory('hotgenUUID', function(uuid) {
            return {
              uuid: uuid.v4,
            };
         })
         .factory('hotgenNotify', function(notify, $rootScope) {
            notify.config({
                position: 'right',
                duration: 0,
            });
            var show_success = function(message) {
                if ($rootScope.message_level < 2){
                    return;
                }
                notify({
                        message: message,
                        classes: ['alert-success',],
                        duration: 3000,
                }); };

            var show_error = function(message) {
                if ($rootScope.message_level < 0){
                    return;
                }
                notify({
                        message: message,
                        classes: ['alert-danger',],
                        duration: 5000,
                });};
            var show_info = function(message) {
                if ($rootScope.message_level < 3){
                    return;
                }
                notify({
                        message: message,
                        classes: ['alert-info',],
                        duration: 3000,
                });};

            var show_warning = function(message) {
                if ($rootScope.message_level < 1){
                    return;
                }
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
            var broadcast_load_draft = function(){
                $rootScope.$broadcast('handle_load_draft');
            }
            return {
                broadcast_edit_node: broadcast_edit_node,
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
        .factory('hotgenUtils', function(){
            var get_resource_string = function(identity){
                return '{get_resource: '+identity+' }';
            }
            return {
                get_resource_string: get_resource_string,
            };
        })
        .service('hotgenGlobals', function () {
            var globals = {
                resource_icons: {},
                edge_directions: {},
                necessary_properties: {},
                resource_components: {},
                node_labels: {},
            };

            return {
                get_node_labels: function () {
                    return globals.node_labels;
                },
                get_resource_icons: function () {
                    return globals.resource_icons;
                },
                get_resource_components: function () {
                    return globals.resource_components;
                },
                get_edge_directions: function () {
                    return globals.edge_directions;
                },
                get_necessary_properties: function () {
                    return globals.necessary_properties;
                },
                update_node_labels: function(key, value) {
                    globals.node_labels[key] = value
                },
                update_resource_icons: function(key, value) {
                    globals.resource_icons[key] = value
                },
                update_resource_components: function(key, value) {
                    globals.resource_components[key] = value
                },
                update_edge_directions: function(key, value) {
                    globals.edge_directions[key] = value
                },
                update_necessary_properties: function(key, value) {
                    globals.necessary_properties[key] = value
                },
            };
        })
        .directive('compile', [ '$compile', function($compile){
            return {
                link: function(scope, element, attrs){
                      var content = $compile(attrs.compile)(scope);
                      element.append(content);
                }
            }
        }]);

})(window.angular);