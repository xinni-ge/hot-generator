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
        function ($scope, $uibModalInstance) {
            $scope.template = 'heat orchestration template string';
            $scope.ok = function () {
                $uibModalInstance.close('ok');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);

    angular_module.controller('FormModalCtrl', ['$scope','$uibModal', 'hotgenNotify',
        function($scope, $uibModal, hotgenNotify){
            $scope.open = function(){
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/server_modal.html',
                    controller: 'FormModalInstanceCtrl',
                    controllerAs: '$formctrl',
                });
                modalInstance.result.then(function(){
                    hotgenNotify.show_success('save a form');
                }, function(){
                    hotgenNotify.show_error('close without saving');
                });
            }
        }]);

    angular_module.controller('FormModalInstanceCtrl', [ '$scope','$uibModalInstance',
        function($scope, $uibModalInstance){
            $scope.resource = "Resource";
            $scope.fields = "fields.";
            $scope.ok = function () {
                $uibModalInstance.close('ok');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
})(window.angular);
