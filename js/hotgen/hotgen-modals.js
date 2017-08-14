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
                    hotgenNotify.show_success('close a modal');
                }, function(){
                    hotgenNotify.show_error('dismiss a modal');
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

    angular_module.controller('FormModalCtrl', ['$scope', '$mdDialog', 'hotgenNotify', 'hotgenMessage',
        function($scope, $mdDialog, hotgenNotify, hotgenMessage,){
            $scope.showTabDialog = function(args){
                var template_url = "templates/"+args.toLowerCase()+"_modal.html";
                $mdDialog.show({
                  controller: DialogController,
                  templateUrl: template_url,
                  parent: angular.element(document.body),
                  clickOutsideToClose:true
                }).then(function(){
                    hotgenNotify.show_success('close a modal');
                }, function(){
                    hotgenNotify.show_error('dismiss a modal');
                });

                function DialogController($scope, $rootScope, $mdDialog,) {
                    var s_key = $rootScope.selected.id+"_save";
                    if (s_key in sessionStorage){
                        $scope.instance = JSON.parse(sessionStorage.getItem(s_key));
                    }
                    $scope.boot_sources = [
                        {'id': 'image', 'name': 'image'},
                        {'id': 'image_snapshot', 'name': 'image snapshot'},
                        {'id': 'volume', 'name': 'volume'},
                        {'id': 'volume_snapshot', 'name': 'volume snapshot'}
                    ];
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };

                    $scope.save = function() {
                      $mdDialog.hide();
                      debugger;
                      var s_key = $rootScope.selected.id+"_save";
                      sessionStorage.setItem(s_key, JSON.stringify($scope.instance));
                    };
                    debugger;
                    $scope.availability_zones = $rootScope.availability_zones;
                }
            };

            $scope.$on('handle_edit_node', function(event, args){
                $scope.showTabDialog(args);
            });

        }]);
})(window.angular);
