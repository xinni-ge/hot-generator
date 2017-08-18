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
//                    hotgenNotify.show_info('dismiss a modal');
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

    angular_module.controller('FormModalCtrl', ['$scope', '$rootScope',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage',
        function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenMessage,){
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
                      if ($scope.resource.name){
                        label = $scope.resource.name;
                      } else if ($scope.resource.ip_address){
                        label = $scope.resource.ip_address
                      } else if ($scope.resource.floating_ip_address){
                        label = $scope.resource.floating_ip_address
                      } else if ($scope.resource.fixed_ip_address){
                        label = $scope.resource.fixed_ip_address
                      } else if ($scope.resource.mountpoint){
                        label = $scope.resource.mountpoint
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
                        $scope.resource = {count:1}
                    }
                }
            };

            $scope.$on('handle_edit_node', function(event, args){
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
