(function(angular) {
    'use strict';
    angular_module.controller('IconCtrl', function($scope, resource_types){
        $scope.resource_types = resource_types;
    });

})(window.angular);