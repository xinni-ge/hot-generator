(function(angular) {
    'use strict';
    angular_module.controller('TempModalCtrl', ['$scope', '$rootScope',
        '$mdDialog', 'hotgenNotify', 'hotgenUtils',
        function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenUtils){

            $scope.open = function(){
                $mdDialog.show({
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    templateUrl: 'templates/modal_template.html',
                    controller: DialogController,
                }).then(function(){
                    hotgenNotify.show_success('Resource saved.');
                }, function(){
                    hotgenNotify.show_info('dismiss a modal');
                });
            };
            function DialogController($scope, $rootScope, $mdDialog) {
                    $scope.can_save = false;
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };
                    $scope.save = function(msg) {
                      // jump to stack creation page.
                      $mdDialog.hide(msg);
                    };
                    $scope.generate = function(){
                        var resource_root = {};
                        if ( false in $rootScope.is_saved){
                            hotgenNotify.show_error('Cannot generate, some resources are not saved.');
                            $scope.can_save = false;
                            return;
                        }
                        $scope.can_save = true;
                        for (var idkey in $rootScope.saved_resources){
                            var resource_type = $rootScope.saved_resources[idkey].type;
                            var resource_name = resource_type + '_' + idkey;
                            var copy_data = angular.copy($rootScope.saved_resources[idkey].data)
                            var properties = $scope.extract_properties(copy_data);
                            resource_root[resource_name] = {
                                type: resource_type.replace(/_/g, ':'),
                                properties: properties,
                            };

                        }
                        var today = new Date();
                        var template_root = {
                            heat_template_version: "2016-04-08",
                            description: 'created by HOT Generator at '+ today.toUTCString() + '.',
                            resources: resource_root
                        }
                        var json_string = JSON.stringify(template_root);
                        return json2yaml(json_string);
                    }
                    $scope.extract_properties = function(resource_data){
                        for (var property in resource_data){
                            var func = null;
                            switch (property){
                                case 'description':
                                    func =  hotgenUtils.escape_characters;
                                    break;
                                case 'metadata':
                                case 'tags':
                                    func =  hotgenUtils.extract_keyvalue;
                                    break;
                                default:
                                    break;
                            }
                            if ( func != null){
                                resource_data[property] = func(resource_data[property]);
                            }
                        }
                        return resource_data;
                    }
                    $scope.template = {
                        title: 'Template',
                        content: $scope.generate(),
                    };
                }
        }]);

    angular_module.controller('FormModalCtrl', ['$scope', '$rootScope', '$compile',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage', 'hotgenGlobals', 'hotgenUtils',
        function($scope, $rootScope, $compile, $mdDialog, hotgenNotify, hotgenMessage, hotgenGlobals, hotgenUtils){
            $scope.showTabDialog = function(){
                $mdDialog.show({
                    controller: DialogController,
                    controllerAs: 'ctrl',
                    templateUrl: 'templates/modal_resource.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true
                }).then(function(){
                    hotgenNotify.show_success('The selected resource is saved successfully.');
                }, function(){
//                    hotgenNotify.show_error('dismiss a modal');
                });

                function DialogController($scope, $rootScope, $mdDialog,) {
                    $scope.delete_resource = function() {
                        var label = $rootScope.selected.node.label;
                        $rootScope.nodes.remove($rootScope.selected.id);
                        hotgenNotify.show_success(label + ' has been delete successfully.')
                        $mdDialog.cancel();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.save = function() {
                        $mdDialog.hide();
                        $rootScope.saved_resources[$rootScope.selected.id] = {
                            type: $rootScope.selected.resource_type,
                            data: angular.copy($scope.resource)
                        };
                        var label = $rootScope.selected.node.label;
                        var prop_label = $scope.get_label($rootScope.selected.resource_type);

                        if (prop_label && $scope.resource[prop_label]){
                          label = $scope.resource[prop_label];
                        }
                        $rootScope.nodes.update({
                              id: $rootScope.selected.id,
                              label: label,
                              font: { color: $rootScope.selected.node.icon.color},
                            })
                        // Mark the node is saved.
                        $rootScope.is_saved[$rootScope.selected.id] = true;

                        // Mark edges connected from the node are saved and update style.
                        for (var idx in $scope.connectedoptions){ // debugger;
                            var connected_option = $scope.connectedoptions[idx];
                            for (var idx_edge in connected_option){
                                $rootScope.is_saved[connected_option[idx_edge].edge.id] = true;
                                $rootScope.edges.update({
                                  id: connected_option[idx_edge].edge.id,
                                  dashes: false,
                                  color: $rootScope.selected.node.icon.color,
                                })
                          }
                        }

                    };

                    $scope.resource_type = $rootScope.selected.resource_type.replace(/_/g, ':');

                    if ($rootScope.selected.id in $rootScope.saved_resources){
                        $scope.resource = angular.copy($rootScope.saved_resources[$rootScope.selected.id].data);
                    } else{
                        $scope.resource = {}
                    }
                    // Add connected edge resource
                    $scope.get_connected_options = function(){
                        var related_edges = $rootScope.network.getConnectedEdges($rootScope.selected.id);
                        var connected_options = {};
                        for (var idx in related_edges){
                            var edge = $rootScope.edges.get(related_edges[idx])
                            if (edge.from != $rootScope.selected.id ){
                                continue;
                            }
                            var node = $rootScope.nodes.get(edge.to);
                            var edge_directions = hotgenGlobals.get_edge_directions();
                            if (! ($rootScope.selected.resource_type in edge_directions)){
                                continue;
                            }
                            var mapping = edge_directions[$rootScope.selected.resource_type];
                            if (!(node.title in mapping)){
                                continue;
                            }
                            var property = mapping[node.title].property;
                            if (!(property in connected_options)){
                                connected_options[property] = [];
                            }
                            connected_options[property].push({
                                value: hotgenUtils.get_resource_string(node.title+'_'+node.id),
                                id: node.id,
                                resource_type: node.title,
                                edge: edge
                            });

                        }
                        return connected_options;
                    }
                    $scope.connectedoptions = $scope.get_connected_options()
                    $scope.component = hotgenGlobals.get_resource_components()[$rootScope.selected.resource_type];

                    $scope.get_label = function(node_type){
                        return hotgenGlobals.get_node_labels()[node_type];
                    }

                }
            };
            $scope.$on('handle_edit_node', function(event, args){
                hotgenNotify.show_info('Show details of resource ' + args.replace(/_/g, ':') +'.');
                $scope.showTabDialog();
            });

        }]);

        angular_module.controller('EdgeFormModalCtrl',  ['$scope', '$rootScope',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage', 'hotgenGlobals',
        function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenMessage, hotgenGlobals){
            $scope.showTabDialog = function(){
                    $mdDialog.show({
                      controller: EdgeDialogController,
                      controllerAs: 'ctrl',
                      templateUrl: 'templates/modal_edge.html',
                      parent: angular.element(document.body),
                      clickOutsideToClose:true
                    }).then(function(){
                        hotgenNotify.show_success('The selected edge is saved successfully.');
                    }, function(){
    //                    hotgenNotify.show_error('dismiss a modal');
                    });

                function EdgeDialogController($scope, $rootScope, $mdDialog,) {
                    $scope.delete_resource = function() {
                        $rootScope.edges.remove($rootScope.selected.id);
                        hotgenNotify.show_success('The selected edge has been delete successfully.')
                        $mdDialog.cancel();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };

                    if ($rootScope.selected.id in $rootScope.saved_resources){
                        $scope.resource = angular.copy($rootScope.saved_resources[$rootScope.selected.id].data);
                    } else{
                        $scope.resource = {}
                    }

                    var from_type = $rootScope.selected.resource_type.from;
                    var to_type = $rootScope.selected.resource_type.to;
                    $scope.from_type = from_type.replace(/_/g, ':');
                    $scope.to_type = to_type.replace(/_/g, ':');
                    $scope.from_node = {
                        class: hotgenGlobals.get_resource_icons()[from_type].class,
                        color: hotgenGlobals.get_resource_icons()[from_type].color,
                        id: $rootScope.selected.from_node.id,
                    }
                    $scope.to_node = {
                        class: hotgenGlobals.get_resource_icons()[to_type].class,
                        color: hotgenGlobals.get_resource_icons()[to_type].color,
                        id: $rootScope.selected.to_node.id,
                    }
                }
            };
            $scope.$on('handle_edit_edge', function(event, args){
                /* Click a edge and decide to show modal or not */
                var from_type = args.from;
                var to_type = args.to;
                var edge_directions = hotgenGlobals.get_edge_directions();
                if ( !( from_type in edge_directions) || !(to_type in edge_directions[from_type])){
                    hotgenNotify.show_warning('The edge might be invalid.');
                    return;
                }
                $scope.showTabDialog();
            });
        }]);

    angular_module.controller('DraftModalCtrl', ['$scope', '$rootScope',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage',
         function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenMessage,){
            $scope.showDialog = function(){
                $mdDialog.show({
                  controller: DraftDialogController,
                  templateUrl: 'templates/modal_draft.html',
                  parent: angular.element(document.body),
                  clickOutsideToClose:true
                }).then(function(){
                    hotgenNotify.show_success('The draft is loaded successfully.');
                }, function(){
//                    hotgenNotify.show_error('dismiss a modal');
                });
                function DraftDialogController($scope, $rootScope, $mdDialog,) {
                    $scope.draft_list = [];
                    $scope.latest_draft = JSON.parse(localStorage.getItem('draft_'+localStorage.saved_counter));
                    for (var i = 0 ; i < 10; i++){
                        if (localStorage.getItem('draft_'+i)){
                            var saved_drafts = JSON.parse(localStorage.getItem('draft_'+i));
                            $scope.draft_list.push(saved_drafts);
                        }
                    }
                    $scope.load = function(draft) {
                        $mdDialog.hide();
                        $rootScope.nodes.clear();
                        for (var id in draft.nodes){
                            $rootScope.nodes.add(draft.nodes[id]);
                        }
                        $rootScope.edges.clear();
                        for (var id in draft.edges){
                            $rootScope.edges.add(draft.edges[id]);
                        }
                        $rootScope.saved_resources = draft.saved_resources;
                        $rootScope.is_saved = draft.is_saved;

                    };
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };
                }
            }
            $scope.$on('handle_load_draft', function(event, args){
                $scope.showDialog();
            });

         }]);
})(window.angular);
