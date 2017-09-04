(function(angular) {
    'use strict';

    // OS::Nova::KeyPair
    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').value('osNovaKeypairSettings',
        {
            resource_key: "OS__Nova__KeyPair",
            admin: false,
            icon: {
                class: 'fa-key ',
                name: 'OS::Nova::KeyPair',
                code: '\uf084',
                color: '#483dff'
            },
            modal_component: '<os-nova-keypair keypair="resource" form-reference="resourceForm"></os-nova-keypair>',
            edge_settings: null,
            necessary_properties: {
                'name': null
            }
        }
    );

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator')
    .run(['osNovaKeypairSettings', 'hotgenGlobals', function( osNovaKeypairSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNovaKeypairSettings.resource_key,
            osNovaKeypairSettings.icon);

        hotgenGlobals.update_resource_components(
            osNovaKeypairSettings.resource_key,
            osNovaKeypairSettings.modal_component);

    }]);


    function osNovaKeypairController($scope, $rootScope){
        $scope.keypair_types = $rootScope.keypair_types;
        $scope.admin = $rootScope.auth.admin;
    }

    osNovaKeypairController.$inject = ['$scope', '$rootScope', ];
    osNovaKeypairPath.$inject = ['horizon.dashboard.project.heat_dashboard.template_generator.basePath'];

    function osNovaKeypairPath(basePath){
        return basePath + 'js/resources/os__nova__keypair/os__nova__keypair.html';
    }

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').component('osNovaKeypair', {
        templateUrl: osNovaKeypairPath,
        controller: osNovaKeypairController,
        bindings:{
          'keypair': '=',
          'formReference': '<',
        }
    });

})(window.angular);
