(function(angular) {
    'use strict';

    // OS::Neutron::Port

    angular_module.value('osNeutronPortSettings',
        {
            resource_key: "OS__Neutron__Port",
            icon: {
                class: 'fa-genderless',
                name: 'OS::Neutron::Port',
                code: '\uf22d',
                color: '#40a5f2',
            },
            modal_component: '<os-neutron-port port="resource" form-reference="resourceForm"></os-neutron-port>',
            edge_settings: {
                'OS__Neutron__Net': {
                    'type': 'property',
                    'property': 'network',
                    'limit': 1,
                },
                'OS__Neutron__SecurityGroup': {
                    'type': 'list',
                    'list': 'security_groups',
                    'limit': 99,
                },
            },
            necessary_properties: null
        }
    );

    angular_module.run(function(osNeutronPortSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronPortSettings.resource_key,
            osNeutronPortSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronPortSettings.resource_key,
            osNeutronPortSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronPortSettings.resource_key,
            osNeutronPortSettings.edge_settings);

    });

    function osNeutronPortController($scope, $rootScope){
        this.additional = false;
        this.$onInit = function(){
            if (typeof this.port.admin_state_up === 'undefined'){
                this.port.admin_state_up = true;
            }
            if (typeof this.port.binding === 'undefined'){
                this.port.binding = {'vnic_type': ''};
            }
            if (typeof this.port.allowed_address_pairs === 'undefined'){
                this.port.allowed_address_pairs = [{}];
            }
            if (this.additional === true && typeof this.port.fixed_ips === 'undefined'){
                this.port.fixed_ips = [];
            }
            if (this.additional === true && typeof this.port.security_groups === 'undefined'){
                this.port.security_groups = [{}];
            }
            if (this.port.device_owner){
                this.searchText = this.port.device_owner;
            }
        };
        this.device_owners = load_device_owners();
        this.querySearch = querySearch;
        this.show_not_found = true;
        this.selectedItemChange = selectedItemChange;
        this.searchTextChange   = searchTextChange;

        $scope.security_groups = $rootScope.security_groups;
        $scope.qos_policies = $rootScope.qos_policies;

        this.add_allowed_address_pair = function(){
            this.port.allowed_address_pairs.push({})
        }
        this.add_fixed_ip = function(){
            this.port.fixed_ips.push({})
        }
        this.delete_allowed_address_pair = function(index){
            this.port.allowed_address_pairs.splice(index, 1)
        }
        this.delete_fixed_ip = function(index){
            this.port.fixed_ips.splice(index, 1)
        }
        function searchTextChange(text) {
           this.port.device_owner = text;
        }

        function selectedItemChange(item) {
           this.port.device_owner = item.display;
        }

        function load_device_owners(){
            var all_device_owners = 'network:floatingip, network:router_interface, network:dhcp';
            return all_device_owners.split(/, +/g).map(function(dev_owner){
                return {
                    value: dev_owner.replace(/:/g, '_'),
                    display: dev_owner
                }
            });
        };

        function querySearch (query) {
            return query ? this.device_owners.filter( createFilterFor(query) ) : this.device_owners;
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query).replace(/:/g, '_');

          return function filterFn(dev_owner) {
            return (dev_owner.value.indexOf(lowercaseQuery) === 0);
          };
        }
    }

    angular_module.component('osNeutronPort', {
      templateUrl: '/js/resources/os__neutron__port/os__neutron__port.html',
      controller: osNeutronPortController,
      bindings:{
        'port': '=',
        'formReference': '<',
      }
    });

})(window.angular);
