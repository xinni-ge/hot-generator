(function(angular) {
    'use strict';

    /* OS::Neutron::FloatingIP */

    angular_module.value('osNeutronFloatingipSettings',
        {
            resource_key: "OS__Neutron__FloatingIP",
            icon: {
                class: 'fa-neuter ',
                name: 'OS::Neutron::FloatingIP',
                code: '\uf22c',
                color: '#40a5f2'
            },
            modal_component: '<os-neutron-floatingip floatingip="resource" form-reference="resourceForm"></os-neutron-floatingip>',
            edge_settings: {
                'OS__Neutron__Net': {
                    'type': 'property',
                    'property': 'floating_network',
                    'limit': 1,
                },
                'OS__Neutron__Port': {
                    'type': 'property',
                    'property': 'port_id',
                    'limit': 1,
                },
            },
            necessary_properties: null
        }
    )

    angular_module.run(function(osNeutronFloatingipSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronFloatingipSettings.resource_key,
            osNeutronFloatingipSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronFloatingipSettings.resource_key,
            osNeutronFloatingipSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronFloatingipSettings.resource_key,
            osNeutronFloatingipSettings.edge_settings);
    });


    function osNeutronFloatingipController($scope, $rootScope){
        ;
    }
    angular_module.component('osNeutronFloatingip', {
      templateUrl: '/js/resources/os__neutron__floatingip/os__neutron__floatingip.html',
      controller: osNeutronFloatingipController,
      bindings:{
        'floatingip': '=',
        'formReference': '<',
      }
    });

})(window.angular);
