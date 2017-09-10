(function(angular) {
    'use strict';

    // OS::Neutron::Router

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').value('osNeutronRouterSettings',
        {
            resource_key: "OS__Neutron__Router",
            admin: true,
            icon: {
                class: 'fa-life-bouy',
                name: 'OS::Neutron::Router',
                code: '\uf1cd',
                color: '#40a5f2'
            },
            label: 'name',
            modal_component: '<os-neutron-router router="resource" connectedoptions="connectedoptions" form-reference="resourceForm"></os-neutron-router>',
            edge_settings: {
                'OS__Neutron__Subnet': {
                    'type': 'property',
                    'property': 'ext_fixed_ips.subnet',
                    'limit': 99,
                },
            },
            necessary_properties: null
        }
    );

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator')
    .run(['osNeutronRouterSettings', 'hotgenGlobals', function(osNeutronRouterSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronRouterSettings.resource_key,
            osNeutronRouterSettings.icon);

        hotgenGlobals.update_node_admin(
            osNeutronRouterSettings.resource_key,
            osNeutronRouterSettings.admin);

        hotgenGlobals.update_resource_components(
            osNeutronRouterSettings.resource_key,
            osNeutronRouterSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronRouterSettings.resource_key,
            osNeutronRouterSettings.edge_settings);

    }]);

    function osNeutronRouterController($scope, hotgenGlobals) {
        this.$onInit = function(){
            if (typeof this.connectedoptions === 'undefined'){
                $scope.connected_options = []
            } else{
                $scope.connected_options = this.connectedoptions;
            }
            if (typeof this.router.external_gateway_info === 'undefined'){
                this.router.external_gateway_info = {"external_fixed_ips": [{}]};
            }
            if (typeof this.router.l3_agent_ids === 'undefined'){
                this.router.l3_agent_ids = [];
            }
            if (typeof this.router.tags == 'undefined'){
                this.router.tags = []
            }

            if (typeof this.router.admin_state_up === 'undefined'){
                this.router.admin_state_up = true;
            }
            if (typeof this.router.value_specs == 'undefined'){
                this.router.value_specs = [{}]
            }
            this.disable = {
                'subnets': [],
            }

            if ( $scope.connected_options['ext_fixed_ips.subnet'] && $scope.connected_options['ext_fixed_ips.subnet'].length > 0){
                for (var idx in $scope.connected_options['ext_fixed_ips.subnet']){
                    this.router.external_gateway_info.external_fixed_ips.splice(0,0, {subnet: $scope.connected_options['ext_fixed_ips.subnet'][idx].value});
                    this.disable.subnets.push($scope.connected_options['ext_fixed_ips.subnet'][idx].value);
                }
            }

            $scope.update = {subnets: $scope.get_subnets_options()}
        };

        $scope.options = hotgenGlobals.get_resource_options();

        this.add_external_fixed_ip = function(){
            this.router.external_gateway_info.external_fixed_ips.push({})
        }
        this.delete_external_fixed_ip = function(index){
            this.router.external_gateway_info.external_fixed_ips.splice(index, 1)
        }

        this.add_value_specs = function(){
            this.router.value_specs.push({})
        }
        this.delete_value_specs = function(index){
            this.router.value_specs.splice(index, 1)
        }

        $scope.get_subnets_options = function(){
            if ('ext_fixed_ips.subnet' in $scope.connected_options){
                var resource_subnets = [];
                for (var idx in $scope.connected_options['ext_fixed_ips.subnet']){
                    var item = $scope.connected_options['ext_fixed_ips.subnet'][idx];
                    resource_subnets.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $scope.options.subnets.concat(resource_subnets);
            }
            return $scope.options.subnets;
        }

    }

    osNeutronRouterController.$inject = ['$scope', 'hotgenGlobals', ];
    osNeutronRouterPath.$inject = ['horizon.dashboard.project.heat_dashboard.template_generator.basePath'];

    function osNeutronRouterPath(basePath){
        return basePath + 'js/resources/os__neutron__router/os__neutron__router.html';
    }

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').component('osNeutronRouter', {
        templateUrl: osNeutronRouterPath,
        controller: osNeutronRouterController,
        bindings:{
            'router': '=',
            'connectedoptions': '<',
            'formReference': '<',
        }
    });


})(window.angular);
