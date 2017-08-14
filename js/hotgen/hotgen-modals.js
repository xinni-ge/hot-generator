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
        function($scope, $mdDialog, hotgenNotify, hotgenMessage){
            $scope.showTabDialog = function(args){
                var template_url = "templates/resource_modal.html";
                if (args === "OS__Nova__Server"){
                    template_url = "templates/"+args.toLowerCase()+"_modal.html";
                }
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

                function DialogController($scope, $mdDialog) {
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };

                    $scope.save = function(msg) {
                      $mdDialog.hide(msg);
                    };
                }
            };

            $scope.$on('handle_edit_node', function(event, args){
                $scope.showTabDialog(args);
            });

        }]);
})(window.angular);
