(function(angular) {
    'use strict';


    // OS::Neutron::Subnet

    angular_module.value('osNeutronSubnetSettings',
        {
            resource_key: "OS__Neutron__Subnet",
            admin: false,
            icon: {
                class: 'fa-cloud-upload ',
                name: 'OS::Neutron::Subnet',
                code: '\uf0ee',
                color: '#40a5f2'
            },
            modal_component: '<os-neutron-subnet subnet="resource" form-reference="resourceForm"></os-neutron-subnet>',
            edge_settings: {
                'OS__Neutron__Net': {
                    'type': 'property',
                    'property': 'network',
                    'limit': 1,
                },
            },
            necessary_properties: null
        }
    );

    angular_module.run(function(osNeutronSubnetSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronSubnetSettings.resource_key,
            osNeutronSubnetSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronSubnetSettings.resource_key,
            osNeutronSubnetSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronSubnetSettings.resource_key,
            osNeutronSubnetSettings.edge_settings);

    });


    function osNeutronSubnetController($scope, $rootScope, hotgenNotify) {
        this.admin=true
        this.$onInit = function(){
            if (typeof this.subnet.allocation_pools === 'undefined'){
                this.subnet.allocation_pools = [{}];
            }
            if (typeof this.subnet.host_routes === 'undefined'){
                this.subnet.host_routes = [{}];
            }
            if (typeof this.subnet.dns_nameservers === 'undefined'){
                this.subnet.dns_nameservers = [];
            }

        }
        this.add_allocation_pool = function(){
            this.subnet.allocation_pools.push({})
        }
        this.delete_allocation_pool = function(index){
            this.subnet.allocation_pools.splice(index, 1)
        }
        this.add_hostroute = function(){
            this.subnet.host_routes.push({})
        }
        this.delete_hostroute = function(index){
            this.subnet.host_routes.splice(index, 1)
        }
        $scope.validate_dns = function (input_string){
            var re =  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            var match = re.exec(input_string);
            if (match){
                return undefined;
            } else{
                hotgenNotify.show_error('Invalid nameserver address.');
                return null;
            }

        }
    }

    angular_module.component('osNeutronSubnet', {
      templateUrl: '/js/resources/os__neutron__subnet/os__neutron__subnet.html',
      controller: osNeutronSubnetController,
      bindings:{
        'subnet': '=',
        'formReference': '<',
      }
    });


})(window.angular);
