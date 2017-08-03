(function(angular) {
    'use strict';
//    angular.module('hotgen', ['hotgen-notify', 'ui.bootstrap'])
    angular_module.controller('ModalDemoCtrl',
        function($uibModal, hotgenNotify){
            var $ctrl = this;
            $ctrl.open = function(size, parentSelector){
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: size,
                });
                modalInstance.result.then(function(){
                    hotgenNotify.show_success('close a modal');
                }, function(){
                    hotgenNotify.show_error('dismiss a modal');
                });
            };
        });

    angular_module.controller('ModalInstanceCtrl', function ($uibModalInstance) {
        var $ctrl = this;
        $ctrl.template = 'heat orchestration template string';
        $ctrl.ok = function () {
            $uibModalInstance.close('ok');
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})(window.angular);