(function(angular) {
    'use strict';
    angular_module.controller('TempModalCtrl', ['$scope', '$mdDialog', 'hotgenNotify',
        function($scope, $mdDialog, hotgenNotify){

            $scope.open = function(){
                $mdDialog.show({
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    templateUrl: 'templates/template_modal.html',
                    controller: DialogController,
                }).then(function(){
                    hotgenNotify.show_success('Resource saved.');
                }, function(){
//                    hotgenNotify.show_info('dismiss a modal');
                });
            };
            function DialogController($scope, $mdDialog) {
                    $scope.template = {
                        title: "Template",
                        content: "An example template string."
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
                var template_url = "templates/resource_modal.html";
                $mdDialog.show({
                  controller: DialogController,
                  controllerAs: "ctrl",
                  templateUrl: template_url,
                  parent: angular.element(document.body),
                  clickOutsideToClose:true
                }).then(function(){
                    hotgenNotify.show_success('close a modal');
                }, function(){
//                    hotgenNotify.show_error('dismiss a modal');
                });

                function DialogController($scope, $rootScope, $mdDialog,) {
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };
                    $scope.save = function() {
                      $mdDialog.hide();
                      $rootScope.saved_resources[$rootScope.selected.id] = {
                          type: $rootScope.selected.resource_type,
                          data: angular.copy($scope.instance)
                      }
                    };
                    $scope.resource_type = $rootScope.selected.resource_type;
                    if ($rootScope.selected.id in $rootScope.saved_resources){
                        $scope.instance = angular.copy($rootScope.saved_resources[$rootScope.selected.id].data);
                    } else{
                        $scope.instance = {count:1}
                    }

                }
            };

            $scope.$on('handle_edit_node', function(event, args){
                $scope.showTabDialog();
            });

        }]);
})(window.angular);
