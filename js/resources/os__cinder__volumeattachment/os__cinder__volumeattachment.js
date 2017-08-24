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
            modal_component: '<os-cinder-volume-attachment volumeattachment="resource" form-reference="resourceForm"></os-cinder-volume-attachment>',
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

        hotgenGlobals.update_resource_components(
            osCinderVolumeAttachmentSettings.resource_key,
            osCinderVolumeAttachmentSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osCinderVolumeAttachmentSettings.resource_key,
            osCinderVolumeAttachmentSettings.edge_settings);

    });


    //* Define component os-cinder-volume */
    function osCinderVolumeAttachmentController($scope, $rootScope, ){
//        this.handle_edge_volume_id = function(){
//        };
//
//        this.handle_edge_instance_uuid = function(){
//        };
    }
    angular_module.component('osCinderVolumeAttachment', {
      templateUrl: '/js/resources/os__cinder__volume/os__cinder__volume.html',
      controller: osCinderVolumeAttachmentController,
      bindings:{
        'volumeattachment': '=',
        'formReference': '<',
      }
    });

})(window.angular);
