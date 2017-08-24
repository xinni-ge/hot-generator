(function(angular) {
    'use strict';

    // OS::Neutron::Net

    angular_module.value('osNeutronNetSettings',
        {
            resource_key: "OS__Neutron__Net",
            icon: {
                class: 'fa-cloud',
                name: 'OS::Neutron::Net',
                code: '\uf0c2',
                color: '#40a5f2'
            },
            modal_component: '<os-neutron-net network="resource" form-reference="resourceForm"></os-neutron-net>',
            edge_settings: null,
            necessary_properties: null
        }
    );

    angular_module.run(function(osNeutronNetSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronNetSettings.resource_key,
            osNeutronNetSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronNetSettings.resource_key,
            osNeutronNetSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronNetSettings.resource_key,
            osNeutronNetSettings.edge_settings);

    });

    function osNeutronNetController($scope, $rootScope){
        this.$onInit = function(){
            if (typeof this.network.dhcp_agent_ids === 'undefined'){
                this.network.dhcp_agent_ids = [];
            }
            if (typeof this.network.admin_state_up === 'undefined'){
                this.network.admin_state_up = true;
            }
        }
    }
    angular_module.component('osNeutronNet', {
      templateUrl: '/js/resources/os__neutron__net/os__neutron__net.html',
      controller: osNeutronNetController,
      bindings:{
        'network': '=',
        'formReference': '<',
      }
    });

})(window.angular);
