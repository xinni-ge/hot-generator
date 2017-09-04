(function(angular) {
    'use strict';

    // OS::Neutron::Net

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').value('osNeutronNetSettings',
        {
            resource_key: "OS__Neutron__Net",
            admin: false,
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

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator')
    .run(['osNeutronNetSettings', 'hotgenGlobals', function(osNeutronNetSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronNetSettings.resource_key,
            osNeutronNetSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronNetSettings.resource_key,
            osNeutronNetSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronNetSettings.resource_key,
            osNeutronNetSettings.edge_settings);

    }]);

    function osNeutronNetController($scope, $rootScope){
        this.$onInit = function(){
            this.admin = $rootScope.auth.admin;
            if (typeof this.network.tags == 'undefined'){
                this.network.tags = []
            }
            if (typeof this.network.dhcp_agent_ids === 'undefined'){
                this.network.dhcp_agent_ids = [];
            }
            if (typeof this.network.admin_state_up === 'undefined'){
                this.network.admin_state_up = true;
            }
            if (typeof this.network.value_specs == 'undefined'){
                this.network.value_specs = [{}]
            }

        }
        this.add_value_specs = function(){
            this.network.value_specs.push({})
        }
        this.delete_value_specs = function(index){
            this.network.value_specs.splice(index, 1)
        }

        $scope.qos_policies = $rootScope.qos_policies;
    }

    osNeutronNetController.$inject = ['$scope', '$rootScope', ];
    osNeutronNetPath.$inject = ['horizon.dashboard.project.heat_dashboard.template_generator.basePath'];

    function osNeutronNetPath(basePath){
        return basePath + 'js/resources/os__neutron__net/os__neutron__net.html';
    }

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').component('osNeutronNet', {
      templateUrl: osNeutronNetPath,
      controller: osNeutronNetController,
      bindings:{
        'network': '=',
        'formReference': '<',
      }
    });

})(window.angular);
