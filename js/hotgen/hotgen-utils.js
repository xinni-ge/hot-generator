(function() {
    'use strict';
    angular.module('hotgen-utils', ['cgNotify', 'angular-uuid'])
         .factory('hotgenUUID', ['uuid', function(uuid) {
            return {
              uuid: uuid.v4,
            };
         }])
         .factory('hotgenNotify', ['notify', '$rootScope', function(notify, $rootScope) {
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
         }])
         .factory('hotgenMessage', ['$rootScope', function($rootScope){
            var broadcast_edit_node = function(node_type){
                $rootScope.$broadcast('handle_edit_node', node_type);
            };
            var broadcast_edit_edge = function(from_type, to_type){
                $rootScope.$broadcast('handle_edit_edge', {'from': from_type, 'to': to_type});
            };
            var broadcast_load_draft = function(){
                $rootScope.$broadcast('handle_load_draft');
            }
            return {
                broadcast_edit_node: broadcast_edit_node,
                broadcast_edit_edge: broadcast_edit_edge,
                broadcast_load_draft: broadcast_load_draft,
            }
        }])
        .factory('hotgenValidate', [function(){

            var validate_keypair = function(input_string){
                var re=/^([0-9a-zA-Z_.-]{1,255})=([0-9a-zA-Z_.-]{1,255})$/
                return re.exec(input_string);
            };
            return {
                validate_keypair: validate_keypair,
            }
        }])
        .factory('hotgenUtils', function(){
            var get_resource_string = function(identity){
                return '{ get_resource: '+identity+' }';
            }
            var filter_and_return_get_resource_element = function(array, property){
                var return_val = [];
                var idx = array.length-1;
                while (idx >= 0) {
                    if (typeof array[idx] == 'string'){
                        if (array[idx].indexOf('get_resource') != -1){
                            return_val = return_val.concat(array.splice(idx, 1))
                        }
                    } else if (typeof array[idx] == 'object' && property){
                        if (array[idx][property] && array[idx][property].indexOf('get_resource') != -1){
                            return_val = return_val.concat(array.splice(idx, 1))
                        }
                    }
                    idx = idx-1;
                }
                return return_val;
            }
            var escape_characters = function(value){
                return '"'+value.replace(/\\/g, '\\\\')
                                .replace(/\"/g, '\\"')
                                .replace(/\n/g, "\\n")+'"';
            }
            var extract_keyvalue = function(value){
                var new_keyvalue = {}
                if (value instanceof Array ){
                    for (var idx in value){
                        if (value[idx] instanceof Object ){
                            if (Object.keys(value[idx]).length == 0){
                                continue;
                            }
                            new_keyvalue[value[idx].key] = value[idx].value
                        }
                    }
                }
                if (Object.keys(new_keyvalue).length == 0){
                    return null;
                }
                return new_keyvalue;

            }
            var extract_list_of_keyvalue = function(value_list){
                if (value_list instanceof Array ){
                    for (var idx in value_list){
                        if (Object.keys(value_list[idx]).length == 0){
                            value_list.splice(idx,1)
                        }
                    }
                }
                if (value_list.length == 0){
                    return null;
                }
                return value_list
            }
            var extract_list = function(value_list){
                if (value_list instanceof Array){
                    if (value_list.length == 0){
                        return null;
                    }
                }
                return value_list
            }
            return {
                get_resource_string: get_resource_string,
                escape_characters: escape_characters,
                extract_keyvalue: extract_keyvalue,
                extract_list_of_keyvalue: extract_list_of_keyvalue,
                extract_list: extract_list,
                filter_and_return_get_resource_element: filter_and_return_get_resource_element,
            };
        })
        .service('hotgenStates', function(){
            var saved_flags = {};
            var selected = {};
            var saved_resources = {};

            var get_selected = function(){
                return selected;
            }
            var set_selected = function(to_set){
                selected = to_set;
            }
            var update_saved_resources = function(key, data){
                saved_resources[key] = data;
            };
            var set_saved_resources = function(to_set){
                saved_resources = to_set;
            }
            var is_all_saved = function(){
                return false in Object.keys(saved_flags);
            };
            var get_saved_flags_length = function(){
                return Object.keys(saved_flags).length;
            }
            var get_saved_flags = function(){
                return saved_flags;
            }
            var set_saved_flags = function(to_set){
                saved_flags = to_set;
            }
            var update_saved_flags = function(key, value){
                saved_flags[key] = value;
            }
            var get_saved_resources = function(){
                return angular.copy(saved_resources);
            }
            var get_saved_resources_length = function(){
                return Object.keys(saved_resources).length;
            }
            var clear_states = function(){
                saved_resources = {}
                selected = {}
                saved_flags = {}
            }
            return {
                is_all_saved: is_all_saved,
                get_saved_resources: get_saved_resources,
                get_saved_resources_length: get_saved_resources_length,
                get_saved_flags: get_saved_flags,
                get_saved_flags_length: get_saved_flags_length,
                set_selected: set_selected,
                get_selected: get_selected,
                set_saved_resources: set_saved_resources,
                set_saved_flags: set_saved_flags,
                update_saved_flags: update_saved_flags,
                update_saved_resources: update_saved_resources,
                clear_states: clear_states,
            }
        })
        .service('hotgenGlobals', function () {
            var globals = {
                resource_icons: {},
                edge_directions: {},
                necessary_properties: {},
                resource_components: {},
                node_labels: {},
                node_admin: {},
                resource_options: {},
            };

            return {
                get_element: function(ele){
                    return globals[ele];
                },
                get_node_labels: function () {
                    return this.get_element('node_labels');
                },
                get_node_admin: function () {
                    return this.get_element('node_admin');
                },
                get_resource_icons: function () {
                    return this.get_element('resource_icons');
                },
                get_resource_components: function () {
                    return this.get_element('resource_components');
                },
                get_edge_directions: function () {
                    return this.get_element('edge_directions');
                },
                get_necessary_properties: function () {
                    return this.get_element('necessary_properties');
                },
                update_node_labels: function(key, value) {
                    globals.node_labels[key] = value;
                },
                update_node_admin: function(key, value) {
                    globals.node_admin[key] = value;
                },
                update_resource_icons: function(key, value) {
                    globals.resource_icons[key] = value;
                },
                update_resource_components: function(key, value) {
                    globals.resource_components[key] = value;
                },
                update_edge_directions: function(key, value) {
                    globals.edge_directions[key] = value;
                },
                update_necessary_properties: function(key, value) {
                    globals.necessary_properties[key] = value;
                },
                get_resource_options: function(){
                    return this.get_element('resource_options');
                },
                update_resource_options: function(u_object){
                    angular.extend(globals.resource_options, u_object)
                }
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

})();