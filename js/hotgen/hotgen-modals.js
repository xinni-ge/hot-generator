(function(angular) {
    'use strict';
    angular_module.controller('TempModalCtrl', ['$scope', '$mdDialog', 'hotgenNotify',
        function($scope, $mdDialog, hotgenNotify){

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
            function DialogController($scope, $mdDialog) {
                    $scope.template = {
                        title: 'Template',
                        content: 'An example template string.'
                    };
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };

                    $scope.save = function(msg) {
                      $mdDialog.hide(msg);
                    };
                }
        }]);

    angular_module.controller('FormModalCtrl', ['$scope', '$rootScope', '$compile',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage', 'hotgenGlobals',
        function($scope, $rootScope, $compile, $mdDialog, hotgenNotify, hotgenMessage, hotgenGlobals, ){
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
                      $rootScope.is_saved[$rootScope.selected.id] = true;
                    };

                    $scope.resource_type = $rootScope.selected.resource_type.replace(/_/g, ':');

                    if ($rootScope.selected.id in $rootScope.saved_resources){
                        $scope.resource = angular.copy($rootScope.saved_resources[$rootScope.selected.id].data);
                    } else{
                        $scope.resource = {}
                    }
                    // Add connected edge resource
                    $scope.get_connected_options = function(){
                        var related_nodes = $rootScope.network.getConnectedNodes($rootScope.selected.id);
                        var connected_options = {}
                        for (var idx in related_nodes){
                            var node = $rootScope.nodes.get(related_nodes[idx]);
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
                                value: '{get_resource: '+node.title+'_'+related_nodes[idx]+' }',
                                id: related_nodes[idx],
                                resource_type: node.title,
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
