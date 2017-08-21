(function(angular) {
    'use strict';

    // OS::Nova::Server
    function osNovaServerController($scope, $rootScope, hotgenValidate, hotgenNotify) {
        this.$onInit = function(){
            if (typeof this.instance.metadata === 'undefined'){
                this.instance.metadata = [];
            }
        }
        $scope.boot_sources = [
            {'id': 'image', 'name': 'image'},
            {'id': 'image_snapshot', 'name': 'image snapshot'},
            {'id': 'volume', 'name': 'volume'},
            {'id': 'volume_snapshot', 'name': 'volume snapshot'}
        ];
        $scope.availability_zones = $rootScope.availability_zones;
        $scope.flavors = $rootScope.flavors;
        $scope.security_groups = $rootScope.security_groups;
        $scope.images = $rootScope.images;
        $scope.image_snapshots = $rootScope.image_snapshots;
        $scope.volumes = $rootScope.volumes;
        $scope.volume_snapshots = $rootScope.volume_snapshots;
        $scope.validateMetadata = function(input_string){
            var match = hotgenValidate.validate_keypair(input_string);
            if (match){
                return undefined;
            } else{
                hotgenNotify.show_error('Invalid characters are used in metadata.');
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
                this.volume.metadata = [];
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
        $scope.validateMetadata = function(input_string){
            var match = hotgenValidate.validate_keypair(input_string);
            if (match){
                return undefined;
            } else{
                hotgenNotify.show_error('Invalid characters are used in metadata.');
                return null;
            }
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

})(window.angular);
