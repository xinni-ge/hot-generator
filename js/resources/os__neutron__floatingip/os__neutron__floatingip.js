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
            label: 'floating_ip_address',
            modal_component: '<os-neutron-floatingip floatingip="resource" connectedoptions="connectedoptions" form-reference="resourceForm"></os-neutron-floatingip>',
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
                'OS__Neutron__Subnet': {
                    'type': 'property',
                    'property': 'floating_subnet',
                    'limit': 1,
                },
            },
            necessary_properties: {
                'floating_network': ['OS__Neutron__Net']
            },
        }
    )

    angular_module.run(function(osNeutronFloatingipSettings, hotgenGlobals){
        hotgenGlobals.update_node_labels(
            osNeutronFloatingipSettings.resource_key,
            osNeutronFloatingipSettings.label);

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
        this.$onInit = function(){
            if (typeof this.connectedoptions === 'undefined'){
                $scope.connected_options = []
            } else{
                $scope.connected_options = this.connectedoptions;
            }
            $scope.floating_networks = $scope.get_floating_network_options();
            $scope.floating_subnets = $scope.get_floating_subnet_options();
            $scope.ports = $scope.get_port_options();
            if (typeof this.floatingip.value_specs == 'undefined'){
                this.floatingip.value_specs = [{}]
            }
            if ( $scope.connected_options.floating_network && $scope.connected_options.floating_network.length > 0){
                this.floatingip['floating_network'] = $scope.connected_options.floating_network[0].value
            }
            if ( $scope.connected_options.floating_subnet && $scope.connected_options.floating_subnet.length > 0){
                this.floatingip['floating_subnet'] = $scope.connected_options.floating_subnet[0].value
            }
            if ( $scope.connected_options.port_id && $scope.connected_options.port_id.length > 0){
                this.floatingip['port_id'] = $scope.connected_options.port_id[0].value
            }
        }
        this.add_value_specs = function(){
            this.floatingip.value_specs.push({})
        }
        this.delete_value_specs = function(index){
            this.floatingip.value_specs.splice(index, 1)
        }
        $scope.get_floating_network_options = function(){
            if ('floating_network' in $scope.connected_options){
                var resource_floating_network = [];
                for (var idx in $scope.connected_options.floating_network){
                    var item = $scope.connected_options.floating_network[idx];
                    resource_floating_network.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.floating_networks.concat(resource_floating_network);
            }
            return $rootScope.floating_networks;

        }
        $scope.get_floating_subnet_options = function(){
            if ('floating_subnet' in $scope.connected_options){
                var resource_floating_subnet = [];
                for (var idx in $scope.connected_options.floating_subnet){
                    var item = $scope.connected_options.floating_subnet[idx];
                    resource_floating_subnet.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.floating_subnets.concat(resource_floating_subnet);
            }
            return $rootScope.floating_subnets;
        }
        $scope.get_port_options = function(){
            if ('port_id' in $scope.connected_options){
                var resource_port = [];
                for (var idx in $scope.connected_options.port_id){
                    var item = $scope.connected_options.port_id[idx];
                    resource_port.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.ports.concat(resource_port);
            }
            return $rootScope.ports;
        }
    }
    angular_module.component('osNeutronFloatingip', {
      templateUrl: '/js/resources/os__neutron__floatingip/os__neutron__floatingip.html',
      controller: osNeutronFloatingipController,
      bindings:{
          'floatingip': '=',
          'formReference': '<',
          'connectedoptions': '<',
      }
    });

})(window.angular);
