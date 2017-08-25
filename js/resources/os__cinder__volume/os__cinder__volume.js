(function() {
    'use strict';

    /* OS::Cinder::Volume
     *
     */

    angular_module.value('osCinderVolumeSettings',
        {
            resource_key: "OS__Cinder__Volume",
            icon: {
                class: 'fa-hdd-o ',
                name: 'OS::Cinder::Volume',
                code: '\uf0a0',
                color: '#0bb238'
            },
            label: 'name',
            modal_component: '<os-cinder-volume volume="resource" connectedoptions="connectedoptions" form-reference="resourceForm"></os-cinder-volume>',
            edge_settings: null,
            necessary_properties: null
        }
    )

    // Register the resource to globals
    angular_module.run(function(osCinderVolumeSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osCinderVolumeSettings.resource_key ,
            osCinderVolumeSettings.icon);

        hotgenGlobals.update_node_labels(
            osCinderVolumeSettings.resource_key ,
            osCinderVolumeSettings.label);

        hotgenGlobals.update_resource_components(
            osCinderVolumeSettings.resource_key,
            osCinderVolumeSettings.modal_component);
    });


    // Define  <os-cinder-volume> controller
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
            {'id': 'volume', 'name': 'volume'},
            {'id': 'volume_snapshot', 'name': 'volume snapshot'},
            {'id': 'backup', 'name': 'backup'},
        ];
        $scope.availability_zones = $rootScope.availability_zones;
        $scope.images = $rootScope.images;
        $scope.volumes = $rootScope.volumes;
        $scope.backups = $rootScope.volume_backups;
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
      templateUrl: '/js/resources/os__cinder__volume/os__cinder__volume.html',
      controller: osCinderVolumeController,
      bindings:{
        'volume': '=',
        'connectedoptions': '=',
        'formReference': '<',
      }
    });


})(window.angular);
