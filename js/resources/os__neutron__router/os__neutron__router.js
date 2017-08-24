(function(angular) {
    'use strict';

    // OS::Neutron::Router

    angular_module.value('osNeutronRouterSettings',
        {
            resource_key: "OS__Neutron__Router",
            icon: {
                class: 'fa-life-bouy',
                name: 'OS::Neutron::Router',
                code: '\uf1cd',
                color: '#40a5f2'
            },
            modal_component: '<os-neutron-router router="resource" form-reference="resourceForm"></os-neutron-router>',
            edge_settings: {
                'OS__Neutron__Net': {
                    'type': 'mapping',
                    'property': 'external_gateway_info',
                    'limit': 99,
                },
                'OS__Neutron__Subnet': {
                    'type': 'mapping',
                    'mapping': 'external_gateway_info',
                    'limit': 99,
                },
            },
            necessary_properties: null
        }
    );

    angular_module.run(function(osNeutronRouterSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronRouterSettings.resource_key,
            osNeutronRouterSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronRouterSettings.resource_key,
            osNeutronRouterSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronRouterSettings.resource_key,
            osNeutronRouterSettings.edge_settings);

    });

    function osNeutronRouterController($scope, $rootScope) {
        this.$onInit = function(){
            if (typeof this.router.external_gateway_info === 'undefined'){
                this.router.external_gateway_info = {"external_fixed_ips": [{}]};
            }
            if (typeof this.router.l3_agent_ids === 'undefined'){
                this.router.l3_agent_ids = [];
            }
            if (typeof this.router.admin_state_up === 'undefined'){
                this.router.admin_state_up = true;
            }

        };
        this.add_external_fixed_ip = function(){
            this.router.external_gateway_info.external_fixed_ips.push({})
        }
        this.delete_external_fixed_ip = function(index){
            this.router.external_gateway_info.external_fixed_ips.splice(index, 1)
        }

    }

    angular_module.component('osNeutronRouter', {
      templateUrl: '/js/resources/os__neutron__router/os__neutron__router.html',
      controller: osNeutronRouterController,
      bindings:{
        'router': '=',
        'formReference': '<',
      }
    });


})(window.angular);
