(function(angular) {
    'use strict';


    // OS::Nova::Server


    angular_module.value('osNovaServerSettings',
        {
            resource_key: "OS__Nova__Server",
            admin: false,
            icon: {
                class: 'fa-desktop ',
                name: 'OS::Nova::Server',
                code: '\uf108',
                color: '#483dff'
            },
            label: name,
            modal_component: '<os-nova-server instance="resource" form-reference="resourceForm"></os-nova-server>',
            edge_settings: {
                'OS__Cinder__Volume': {
                    'type': 'mapping',
                    'mapping': 'block_device_mapping_v2',
                    'limit': 99,
                    'occupied': true,
                    'lonely': true,
                   },
                'OS__Nova__KeyPair': {
                    'type': 'property',
                    'property': 'key_name',
                    'limit': 1,
                },
                'OS__Neutron__Net': {
                    'type': 'mapping',
                    'mapping': 'networks',
                    'limit': 99,
                },
                'OS__Neutron__FloatingIP': {
                    'type': 'mapping',
                    'mapping': 'networks',
                    'limit': 99,
                },
                'OS__Neutron__Subnet': {
                    'type': 'mapping',
                    'mapping': 'networks',
                    'limit': 99,
                },
                'OS__Neutron__Port': {
                    'type': 'mapping',
                    'mapping': 'networks',
                    'limit': 99,
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

    angular_module.run(function(osNovaServerSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNovaServerSettings.resource_key,
            osNovaServerSettings.icon);

        hotgenGlobals.update_node_labels(
            osNovaServerSettings.resource_key,
            osNovaServerSettings.label);

        hotgenGlobals.update_resource_components(
            osNovaServerSettings.resource_key,
            osNovaServerSettings.modal_component);

        for (var i in osNovaServerSettings.edge_settings){
            if (osNovaServerSettings.edge_settings[i].modal){
                hotgenGlobals.update_resource_components(
                    osNovaServerSettings.resource_key+'_'+i,
                    osNovaServerSettings.edge_settings[i].modal);
            }
        }

        hotgenGlobals.update_edge_directions(
            osNovaServerSettings.resource_key,
            osNovaServerSettings.edge_settings);

    });

    function osNovaServerController($scope, $rootScope, hotgenValidate, hotgenNotify) {
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
        templateUrl: '/js/resources/os__nova__server/os__nova__server.html',
        controller: osNovaServerController,
        bindings:{
          'instance': '=',
          'connectedoptions': '=',
          'formReference': '<',
        }
    });

})(window.angular);
