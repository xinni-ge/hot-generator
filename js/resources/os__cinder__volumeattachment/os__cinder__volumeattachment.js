(function(angular) {
    'use strict';

    /* OS::Cinder::VolumeAttachment
     *
     */


    angular_module.value('osCinderVolumeAttachmentSettings',
        {
            resource_key: "OS__Cinder__VolumeAttachment",
            icon: {
                class: 'fa-plug',
                name: 'OS::Cinder::VolumeAttachment',
                code: '\uf1e6',
                color: '#0bb238'
            },
            label: 'mountpoint',
            modal_component: '<os-cinder-volume-attachment volumeattachment="resource" connectedoptions="connectedoptions" form-reference="resourceForm"></os-cinder-volume-attachment>',
            edge_settings: {
                'OS__Cinder__Volume': {
                    'type': 'property',
                    'property': 'volume_id',
                    'limit': 1,
                    'occupied': false, //* whether can be connected to any other resource */
                    'lonely': false,  //* whether can be connected  to one more  other resource */
                    'handler': osCinderVolumeAttachmentController.handle_edge_volume_id,
                    'modal': null
                },
                'OS__Nova__Server': {
                    'type': 'property',
                    'property': 'instance_uuid',
                    'limit': 1,
                    'occupied': false,
                    'handler': osCinderVolumeAttachmentController.handle_edge_instance_uuid,
                    'modal': null
                },
            },
            necessary_properties: {
                'instance_uuid': 'OS__Nova__Server',
                'volume_id': 'OS__Cinder__Volume',
            }
        }
    );

    angular_module.run(function(osCinderVolumeAttachmentSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osCinderVolumeAttachmentSettings.resource_key,
            osCinderVolumeAttachmentSettings.icon);

        hotgenGlobals.update_node_labels(
            osCinderVolumeAttachmentSettings.resource_key,
            osCinderVolumeAttachmentSettings.label);

        hotgenGlobals.update_resource_components(
            osCinderVolumeAttachmentSettings.resource_key,
            osCinderVolumeAttachmentSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osCinderVolumeAttachmentSettings.resource_key,
            osCinderVolumeAttachmentSettings.edge_settings);

    });


    // Define  <os-cinder-volume> controller
    function osCinderVolumeAttachmentController($scope, $rootScope, ){
        this.$onInit = function(){
            if (typeof this.connectedoptions === 'undefined'){
                $scope.connected_options = []
            } else{
                $scope.connected_options = this.connectedoptions;
            }
            $scope.volumes = $scope.get_volume_id_options();
            $scope.instances = $scope.get_instance_uuid_options();

        }
        $scope.get_volume_id_options = function(){
            if ('volume_id' in $scope.connected_options){
                var resource_volumes = [];
                for (var idx in $scope.connected_options.volume_id){
                    var item = $scope.connected_options.volume_id[idx];
                    resource_volumes.push({
                        id: item.resource_type+' ('+item.id.slice(0, 6)+'...)',
                        name: item.value
                    })
                }
                return $rootScope.volumes.concat(resource_volumes);
            }
            return $rootScope.volumes;
        }
        $scope.get_instance_uuid_options = function(){
            if ('instance_uuid' in $scope.connected_options){
                var resource_instances = [];
                for (var idx in $scope.connected_options.instance_uuid){
                    var item = $scope.connected_options.instance_uuid[idx];
                    resource_instances.push({
                        id: item.resource_type+' ('+item.id.slice(0, 6)+'...)',
                        name: item.value
                    })
                }
                return $rootScope.instances.concat(resource_instances);
            }
            return $rootScope.instances;
        }
    }

    angular_module.component('osCinderVolumeAttachment', {
        templateUrl: '/js/resources/os__cinder__volumeattachment/os__cinder__volumeattachment.html',
        controller: osCinderVolumeAttachmentController,
        bindings:{
            'volumeattachment': '=',
            'connectedoptions': '<',
            'formReference': '<',
        }
    });

})(window.angular);