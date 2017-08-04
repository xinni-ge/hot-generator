(function(angular) {
    'use strict';
    angular_module.controller('TempModalCtrl', ['$scope', '$uibModal', 'hotgenNotify',
        function($scope, $uibModal, hotgenNotify){
            $scope.open = function(){
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/template_modal.html',
                    controller: 'TempModalInstanceCtrl',
                });
                modalInstance.result.then(function(){
                    hotgenNotify.show_success('close a modal');
                }, function(){
                    hotgenNotify.show_error('dismiss a modal');
                });
            };
        }]);

    angular_module.controller('TempModalInstanceCtrl', ['$scope', '$uibModalInstance',
        function ($scope, $uibModalInstance){
            $scope.template = 'heat orchestration template string';
            $scope.ok = function (){
                $uibModalInstance.close('ok');
            };

            $scope.cancel = function (){
                $uibModalInstance.dismiss('cancel');
            };
        }]);

    angular_module.controller('FormModalCtrl', ['$scope','$uibModal', 'hotgenNotify', 'hotgenMessage',
        function($scope, $uibModal, hotgenNotify, hotgenMessage){
            $scope.open = function(){
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/resource_modal.html',
                    controller: 'FormModalInstanceCtrl',
                });
                modalInstance.result.then(function(){
                    hotgenNotify.show_success('save a form');
                }, function(){
                    hotgenNotify.show_error('close without saving');
                });
            };

            $scope.$on('handle_edit_node', function(){
                $scope.open();
            });

        }]);

    angular_module.controller('FormModalInstanceCtrl', [ '$scope','$uibModalInstance',
        '$rootScope', 'hotgenMessage', 'resource_fields',
        function($scope, $uibModalInstance, $rootScope, hotgenMessage, resource_fields){
            $scope.resource_type = $rootScope.selected.resource_type;
            $scope.title = resource_fields[$scope.resource_type].title;
            $scope.tabs = resource_fields[$scope.resource_type].tabs;

            $scope.ok = function () {
                $uibModalInstance.close('ok');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
})(window.angular);
