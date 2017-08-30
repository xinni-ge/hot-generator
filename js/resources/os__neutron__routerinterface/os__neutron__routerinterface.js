(function(angular) {
    'use strict';

    // OS::Neutron::RouterInterface

    angular_module.value('osNeutronRouterInterfaceSettings',
        {
            resource_key: "OS__Neutron__RouterInterface",
            admin: false,
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
            necessary_properties: {
                'router': ['OS__Neutron__Router'],
            }
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
        this.$onInit = function(){
            if (typeof this.connectedoptions === 'undefined'){
                $scope.connected_options = []
            } else{
                $scope.connected_options = this.connectedoptions;
            }
            this.disable = {'port': false, 'router': false, 'subnet': false}
            $scope.subnets = $scope.get_subnets_options();
            $scope.routers = $scope.get_routers_options();
            $scope.ports = $scope.get_ports_options();


            if ( $scope.connected_options.port && $scope.connected_options.port.length > 0){
                this.routerinterface['port'] = $scope.connected_options.port[0].value
                this.disable.port = true
            }
            if ( $scope.connected_options.router && $scope.connected_options.router.length > 0){
                this.routerinterface['router'] = $scope.connected_options.router[0].value
                this.disable.router = true
            }
            if ( $scope.connected_options.subnet && $scope.connected_options.subnet.length > 0){
                this.routerinterface['subnet'] = $scope.connected_options.subnet[0].value
                this.disable.subnet = true
            }
        }
        $scope.get_subnets_options = function(){
            if ('subnet' in $scope.connected_options){
                var resource_subnets = [];
                for (var idx in $scope.connected_options.subnet){
                    var item = $scope.connected_options.subnet[idx];
                    resource_subnets.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.subnets.concat(resource_subnets);
            }
            return $rootScope.subnets;
        }
        $scope.get_ports_options = function(){
            if ('port' in $scope.connected_options){
                var resource_ports = [];
                for (var idx in $scope.connected_options.port){
                    var item = $scope.connected_options.port[idx];
                    resource_ports.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.ports.concat(resource_ports);
            }
            return $rootScope.ports;
        }
        $scope.get_routers_options = function(){
            if ('router' in $scope.connected_options){
                var resource_routers = [];
                for (var idx in $scope.connected_options.router){
                    var item = $scope.connected_options.router[idx];
                    resource_routers.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.routers.concat(resource_routers);
            }
            return $rootScope.routers;
        }
    };
    angular_module.component('osNeutronRouterInterface', {
        templateUrl: '/js/resources/os__neutron__routerinterface/os__neutron__routerinterface.html',
        controller: osNeutronRouterInterfaceController,
        bindings:{
            'routerinterface': '=',
            'connectedoptions': '<',
            'formReference': '<',
        }
    });


})(window.angular);
