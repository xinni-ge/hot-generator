(function(angular) {
    'use strict';

    // OS::Nova::KeyPair
    angular_module.value('osNovaKeypairSettings',
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
            necessary_properties: null
        }
    );

    angular_module.run(function(osNovaKeypairSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNovaKeypairSettings.resource_key,
            osNovaKeypairSettings.icon);

        hotgenGlobals.update_resource_components(
            osNovaKeypairSettings.resource_key,
            osNovaKeypairSettings.modal_component);

    });


    function osNovaKeypairController($scope, $rootScope){
        ;
    }

    angular_module.component('osNovaKeypair', {
      templateUrl: '/js/resources/os__nova__keypair/os__nova__keypair.html',
      controller: osNovaKeypairController,
      bindings:{
        'keypair': '=',
        'formReference': '<',
      }
    });

})(window.angular);
