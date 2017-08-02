(function(angular) {
    'use strict';
    angular_module.controller('IconCtrl', function($scope, $rootScope){
        $scope.resource_types = $rootScope.resource_types;
    });

})(window.angular);