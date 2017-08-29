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
            modal_component: '<os-neutron-floatingip-association floatingipassociation="resource" connectedoptions="connectedoptions" form-reference="resourceForm"></os-neutron-floatingip-association>',
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
            necessary_properties: {
                'floatingip_id': ['OS__Neutron__FloatingIP'],
                'port_id': ['OS__Neutron__Port'],
            }
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
        this.$onInit = function(){
            if (typeof this.connectedoptions === 'undefined'){
                $scope.connected_options = []
            } else{
                $scope.connected_options = this.connectedoptions;
            }
            $scope.floatingips = $scope.get_floatingip_options();
            $scope.ports = $scope.get_port_options();
            if ( $scope.connected_options.floatingip_id && $scope.connected_options.floatingip_id.length > 0){
                this.floatingipassociation['floatingip_id'] = $scope.connected_options.floatingip_id[0].value
            }
            if ( $scope.connected_options.port_id && $scope.connected_options.port_id.length > 0){
                this.floatingipassociation['port_id'] = $scope.connected_options.port_id[0].value
            }
        }
        $scope.get_floatingip_options = function(){
            if ('floatingip_id' in $scope.connected_options){
                var resource_fip = [];
                for (var idx in $scope.connected_options.floatingip_id){
                    var item = $scope.connected_options.floatingip_id[idx];
                    resource_fip.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.floatingips.concat(resource_fip);
            }
            return $rootScope.floatingips;
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
    angular_module.component('osNeutronFloatingipAssociation', {
        templateUrl: '/js/resources/os__neutron__floatingipassociation/os__neutron__floatingipassociation.html',
        controller: osNeutronFloatingipAssocationController,
        bindings:{
          'floatingipassociation': '=',
          'formReference': '<',
          'connectedoptions': '<',
        }
    });

})(window.angular);
