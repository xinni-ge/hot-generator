(function(angular) {
    'use strict';

    // OS::Neutron::FloatingIPAssociation

    angular_module.value('osNeutronFloatingipAssociationSettings',
        {
            resource_key: "OS__Neutron__FloatingIPAssociation",
            icon: {
                class: 'fa-paperclip',
                name: 'OS::Neutron::FloatingIPAssociation',
                code: '\uf0c6',
                color: '#40a5f2'
            },
            modal_component: '<os-neutron-floatingip-association floatingipassociation="resource" form-reference="resourceForm"></os-neutron-floatingip-association>',
            edge_settings: {
                'OS__Neutron__FloatingIP': {
                    'type': 'property',
                    'property': 'floatingip_id',
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

    angular_module.run(function(osNeutronFloatingipAssociationSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronFloatingipAssociationSettings.resource_key,
            osNeutronFloatingipAssociationSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronFloatingipAssociationSettings.resource_key,
            osNeutronFloatingipAssociationSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronFloatingipAssociationSettings.resource_key,
            osNeutronFloatingipAssociationSettings.edge_settings);

    });
    function osNeutronFloatingipAssocationController($scope, $rootScope){
        ;
    }
    angular_module.component('osNeutronFloatingipAssociation', {
        templateUrl: '/js/resources/os__neutron__floatingipassociation/os__neutron__floatingipassociation.html',
        controller: osNeutronFloatingipAssocationController,
        bindings:{
          'floatingipassociation': '=',
          'formReference': '<',
        }
    });

})(window.angular);
