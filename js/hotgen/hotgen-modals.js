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
                    };
                    $scope.resource_type = $rootScope.selected.resource_type.replace(/_/g, ':');
                    if ($rootScope.selected.id in $rootScope.saved_resources){
                        $scope.resource = angular.copy($rootScope.saved_resources[$rootScope.selected.id].data);
                    } else{
                        $scope.resource = {}
                    }
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
                    $scope.save = function() {
                        $mdDialog.hide();

                        $rootScope.saved_resources[$rootScope.selected.id] = {
                            data: angular.copy($scope.resource)
                        };

                        var edge_directions = hotgenGlobals.get_edge_directions();
                        var from_type = $rootScope.selected.resource_type.from;
                        var to_type = $rootScope.selected.resource_type.to;
                        var label = edge_directions[from_type][to_type].label
                        $rootScope.edges.update({
                              id: $rootScope.selected.id,
                              label: $scope.resource[label],
                              color: $rootScope.selected.from_node.icon.color,
                              dashes: false,
                            })

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
                    $scope.component = hotgenGlobals.get_resource_components()[from_type + '_' + to_type];
                }
            }
            $scope.$on('handle_edit_edge', function(event, args){
                /* Click a edge and decide to show modal or not */
                var from_type = args.from;
                var to_type = args.to;
                var edge_directions = hotgenGlobals.get_edge_directions();
                if ( !( from_type in edge_directions) || !(to_type in edge_directions[from_type])){
                    hotgenNotify.show_warning('The edge might be invalid.');
                    return;
                }
                if (! edge_directions[from_type][to_type].modal){
                    hotgenNotify.show_info('No form dialog found of this edge.');
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
