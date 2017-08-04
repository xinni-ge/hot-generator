(function(angular) {
    'use strict';

    angular_module.run(function ($rootScope, $translate, VisDataSet) {
        $translate.use('en');
        $rootScope.nodes = new VisDataSet();
        $rootScope.edges = new VisDataSet();

    });
    angular_module.controller('DropdownCtrl', ['$scope',
        function($scope,){
           ;
    }]);



})(window.angular);