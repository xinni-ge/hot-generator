(function(angular) {
    'use strict';

    // OS::Nova::Server
    function osNovaServerController($scope, $rootScope, hotgenValidate, hotgenNotify, $log) {
        this.$onInit = function(){
            if (typeof this.instance.metadata === 'undefined'){
                this.instance.metadata = [{}];
            }
            if (typeof this.instance.personality === 'undefined'){
                this.instance.personality = [{}];
            }
            if (typeof this.instance.scheduler_hints === 'undefined'){
                this.instance.scheduler_hints = [];
            }
            if (typeof this.instance.block_device_mapping === 'undefined'){
                this.instance.block_device_mapping = [];
            }
            $scope.show_passwd = false;
            $scope.show_passwd_type = "password";
        }
        $scope.$watch("show_passwd", function(newValue, oldValue) {
            $scope.show_passwd_type = $scope.show_passwd ? "text" : "password";
        });

        $scope.boot_sources = [
            {'id': 'image', 'name': 'image'},
            {'id': 'image_snapshot', 'name': 'image snapshot'},
            {'id': 'volume', 'name': 'volume'},
            {'id': 'volume_snapshot', 'name': 'volume snapshot'}
        ];
        $scope.volume_sources = [
            {'id': 'volume', 'name': 'volume'},
            {'id': 'volume_snapshot', 'name': 'volume snapshot'}
        ];
        $scope.availability_zones = $rootScope.availability_zones;
        $scope.flavors = $rootScope.flavors;
        $scope.security_groups = $rootScope.security_groups;
        $scope.keypairs = $rootScope.keypairs;
        $scope.images = $rootScope.images;
        $scope.image_snapshots = $rootScope.image_snapshots;
        $scope.volumes = $rootScope.volumes;
        $scope.volume_snapshots = $rootScope.volume_snapshots;
        $scope.flavor_update_policies = [
                {'name': 'RESIZE', 'default': true},
                {'name': 'REPLACE'},
        ];
        $scope.image_update_policies = [
                {'name': 'REBUILD', 'default': true},
                {'name': 'REPLACE'},
                {'name': 'REBUILD_PRESERVE_EPHEMERAL'},
        ];
        $scope.disk_configs = [
                {'name': 'AUTO', 'default': true},
                {'name': 'MANUAL'},
        ];
        $scope.software_config_transports = [
                {'name': 'POLL_SERVER_CFN', 'default': true},
                {'name': 'POLL_SERVER_HEAT'},
                {'name': 'POLL_TEMP_URL'},
                {'name': 'ZAQAR_MESSAGE'},
        ];
        $scope.user_data_update_policies = [
                {'name': 'REPLACE', 'default': true},
                {'name': 'IGNORE'},
        ];
        $scope.user_data_formats = [
                {'name': 'HEAT_CFNTOOLS', 'default': true},
                {'name': 'RAW'},
                {'name': 'SOFTWARE_CONFIG'}
        ];

        this.delete_metadata = function(index){
            this.instance.metadata.splice(index, 1)

        }
        this.add_metadata = function(){
            this.instance.metadata.push({})
        }
        this.delete_personality = function(index){
            this.instance.personality.splice(index, 1)

        }
        this.add_personality = function(){
            this.instance.personality.push({})
        }
        this.delete_block_device_mapping = function(index){
            this.instance.block_device_mapping.splice(index, 1)

        }
        this.add_block_device_mapping = function(){
            this.instance.block_device_mapping.push({})
        }
        $scope.validateSchedulerHints = function(input_string){
            var match = hotgenValidate.validate_keypair(input_string);
            if (match){
                return undefined;
            } else{
                hotgenNotify.show_error('Invalid characters are used in scheduler_hints.');
                return null;
            }
        }

    }

    angular_module.component('osNovaServer', {
      templateUrl: 'templates/os__nova__server.html',
      controller: osNovaServerController,
      bindings:{
        'instance': '=',
        'formReference': '<',
      }
    });

    // OS::Nova::KeyPair
    function osNovaKeypairController($scope, $rootScope){
        ;
    }

    angular_module.component('osNovaKeypair', {
      templateUrl: 'templates/os__nova__keypair.html',
      controller: osNovaKeypairController,
      bindings:{
        'keypair': '=',
        'formReference': '<',
      }
    });

    // OS::Cinder::Volume
    function osCinderVolumeController($scope, $rootScope, hotgenValidate, hotgenNotify) {
        this.$onInit = function(){
            if (typeof this.volume.metadata === 'undefined'){
                this.volume.metadata = [{}];
            }
            if (typeof this.volume.scheduler_hints === 'undefined'){
                this.volume.scheduler_hints = [];
            }
        }
        $scope.boot_sources = [
            {'id': 'image', 'name': 'image'},
            {'id': 'image_snapshot', 'name': 'image snapshot'},
            {'id': 'volume', 'name': 'volume'},
            {'id': 'volume_snapshot', 'name': 'volume snapshot'},
            {'id': 'backup', 'name': 'backup'},
        ];
        $scope.availability_zones = $rootScope.availability_zones;
        $scope.images = $rootScope.images;
        $scope.image_snapshots = $rootScope.image_snapshots;
        $scope.volumes = $rootScope.volumes;
        $scope.volume_snapshots = $rootScope.volume_snapshots;
        $scope.vtypes = $rootScope.volume_types;

        $scope.validateSchedulerHints = function(input_string){
            var match = hotgenValidate.validate_keypair(input_string);
            if (match){
                return undefined;
            } else{
                hotgenNotify.show_error('Invalid characters are used in scheduler_hints.');
                return null;
            }
        }
        this.delete_metadata = function(index){
            this.volume.metadata.splice(index, 1)

        }
        this.add_metadata = function(){
            this.volume.metadata.push({})
        }
    }

    angular_module.component('osCinderVolume', {
      templateUrl: 'templates/os__cinder__volume.html',
      controller: osCinderVolumeController,
      bindings:{
        'volume': '=',
        'formReference': '<',
      }
    });

    // OS::Cinder::VolumeAttachment
    function osCinderVolumeAttachmentController($scope, $rootScope, ){
        ;
    }
    angular_module.component('osCinderVolumeAttachment', {
      templateUrl: 'templates/os__cinder__volumeattachment.html',
      controller: osCinderVolumeAttachmentController,
      bindings:{
        'volumeattachment': '=',
        'formReference': '<',
      }
    });

    // OS::Neutron::FloatingIP
    function osNeutronFloatingipController($scope, $rootScope){
        ;
    }
    angular_module.component('osNeutronFloatingip', {
      templateUrl: 'templates/os__neutron__floatingip.html',
      controller: osNeutronFloatingipController,
      bindings:{
        'floatingip': '=',
        'formReference': '<',
      }
    });

    // OS::Neutron::FloatingIPAssociation
    function osNeutronFloatingipAssocationController($scope, $rootScope){
        ;
    }
    angular_module.component('osNeutronFloatingipAssociation', {
        templateUrl: 'templates/os__neutron__floatingipassociation.html',
        controller: osNeutronFloatingipAssocationController,
        bindings:{
          'floatingipassociation': '=',
          'formReference': '<',
        }
    });

    // OS::Neutron::Net
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
      templateUrl: 'templates/os__neutron__net.html',
      controller: osNeutronNetController,
      bindings:{
        'network': '=',
        'formReference': '<',
      }
    });

    // OS::Neutron::Port
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
      templateUrl: 'templates/os__neutron__port.html',
      controller: osNeutronPortController,
      bindings:{
        'port': '=',
        'formReference': '<',
      }
    });

    // OS::Neutron::Router
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
      templateUrl: 'templates/os__neutron__router.html',
      controller: osNeutronRouterController,
      bindings:{
        'router': '=',
        'formReference': '<',
      }
    });


    // OS::Neutron::RouterInterface
    function osNeutronRouterInterfaceController($scope, $rootScope) {
        if (typeof this.routerinterface === 'undefined'){
            this.message = 'Connect router interface icon to router and port/subnet in the canvas.';
        } else{
            this.message = null;
        }
    };
    angular_module.component('osNeutronRouterInterface', {
      templateUrl: 'templates/os__neutron__routerinterface.html',
      controller: osNeutronRouterInterfaceController,
      bindings:{
        'routerinterface': '=',
        'formReference': '<',
      }
    });


    // OS::Neutron::SecurityGroup
    function osNeutronSecurityGroupController($scope, $rootScope) {
        this.$onInit = function(){
            if (typeof this.securitygroup.rules === 'undefined'){
                this.securitygroup.rules = [{}];
            }

        }
        this.add_rule = function(){
            this.securitygroup.rules.push({})
        }
        this.delete_rule = function(index){
            this.securitygroup.rules.splice(index, 1)
        }
    }

    angular_module.component('osNeutronSecurityGroup', {
      templateUrl: 'templates/os__neutron__securitygroup.html',
      controller: osNeutronSecurityGroupController,
      bindings:{
        'securitygroup': '=',
        'formReference': '<',
      }
    });

    // OS::Neutron::Subnet
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
      templateUrl: 'templates/os__neutron__subnet.html',
      controller: osNeutronSubnetController,
      bindings:{
        'subnet': '=',
        'formReference': '<',
      }
    });

})(window.angular);
