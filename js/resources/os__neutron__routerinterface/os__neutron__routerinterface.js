(function(angular) {
    'use strict';

    // OS::Neutron::RouterInterface

    angular_module.value('osNeutronRouterInterfaceSettings',
        {
            resource_key: "OS__Neutron__RouterInterface",
            icon: {
                class: 'fa-sun-o',
                name: 'OS::Neutron::RouterInterface',
                code: '\uf185',
                color: '#40a5f2'
            },
            modal_component: '<os-neutron-router-interface routerinterface="resource" connectedoptions="connectedoptions" form-reference="resourceForm"></os-neutron-router-interface>',
            edge_settings: {
                'OS__Neutron__Port': {
                    'type': 'property',
                    'property': 'port',
                    'limit': 1,
                },
                'OS__Neutron__Router': {
                    'type': 'property',
                    'property': 'router',
                    'limit': 1,
                },
                'OS__Neutron__Subnet': {
                    'type': 'property',
                    'property': 'subnet',
                    'limit': 1,
                },
            },
            necessary_properties: null
        }
    );

    angular_module.run(function(osNeutronRouterInterfaceSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronRouterInterfaceSettings.resource_key,
            osNeutronRouterInterfaceSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronRouterInterfaceSettings.resource_key,
            osNeutronRouterInterfaceSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronRouterInterfaceSettings.resource_key,
            osNeutronRouterInterfaceSettings.edge_settings);
    });

    function osNeutronRouterInterfaceController($scope, $rootScope) {
        this.$onInit = function(){debugger;
            debugger;
            this.connectedoptions;
        }

    };
    angular_module.component('osNeutronRouterInterface', {
      templateUrl: '/js/resources/os__neutron__routerinterface/os__neutron__routerinterface.html',
      controller: osNeutronRouterInterfaceController,
      bindings:{
        'routerinterface': '=',
        'connectedoptions': '=',
        'formReference': '<',
      }
    });


})(window.angular);
