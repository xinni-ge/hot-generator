(function(angular) {
    'use strict';

    // OS::Nova::Server
    function osNovaServerController($scope, $rootScope, hotgenValidate, hotgenNotify) {
        this.$onInit = function(){
            if (typeof this.instance.metadata === "undefined"){
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
                hotgenNotify.show_error("Invalid characters are used in metadata.");
                return null;
            }
        }
    }

    angular_module.component('osNovaServer', {
      templateUrl: 'templates/os__nova__server.html',
      controller: osNovaServerController,
      bindings:{
        "instance": "=",
        "formReference": "<",
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
        "keypair": "=",
        "formReference": "<",
      }
    });

    // OS::Cinder::Volume
    function osCinderVolumeController($scope, $rootScope, hotgenValidate, hotgenNotify) {
        this.$onInit = function(){
            if (typeof this.volume.metadata === "undefined"){
                this.volume.metadata = [];
            }
            if (typeof this.scheduler_hints.metadata === "undefined"){
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
                hotgenNotify.show_error("Invalid characters are used in metadata.");
                return null;
            }
        }
        $scope.validateSchedulerHints = function(input_string){
            var match = hotgenValidate.validate_keypair(input_string);
            if (match){
                return undefined;
            } else{
                hotgenNotify.show_error("Invalid characters are used in scheduler_hints.");
                return null;
            }
        }
    }

    angular_module.component('osCinderVolume', {
      templateUrl: 'templates/os__cinder__volume.html',
      controller: osCinderVolumeController,
      bindings:{
        "volume": "=",
        "formReference": "<",
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
        "volumeattachment": "=",
        "formReference": "<",
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
        "floatingip": "=",
        "formReference": "<",
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
        "floatingipassociation": "=",
        "formReference": "<",
      }
    });

    // OS::Neutron::Net
    function osNeutronNet($scope, $rootScope){
        this.$onInit = function(){
            if (typeof this.network.dhcp_agent_ids === "undefined"){
                this.network.dhcp_agent_ids = [];
            }
            if (typeof this.network.admin_state_up === "undefined"){
                this.network.admin_state_up = true;
            }
        }
    }
    angular_module.component('osNeutronNet', {
      templateUrl: 'templates/os__neutron__net.html',
      controller: osNeutronNet,
      bindings:{
        "network": "=",
        "formReference": "<",
      }
    });


})(window.angular);
