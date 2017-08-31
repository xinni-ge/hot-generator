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
            modal_component: '<os-nova-server instance="resource" connectedoptions="connectedoptions" form-reference="resourceForm"></os-nova-server>',
            edge_settings: {
                'OS__Cinder__Volume': {
                    'type': 'property',
                    'property': 'block_device_mapping_v2.volume_id',
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
                    'type': 'property',
                    'property': 'networks.network',
                    'limit': 99,
                },
                'OS__Neutron__FloatingIP': {
                    'type': 'property',
                    'property': 'networks.floating_ip',
                    'limit': 99,
                },
                'OS__Neutron__Subnet': {
                    'type': 'property',
                    'property': 'networks.subnet',
                    'limit': 99,
                },
                'OS__Neutron__Port': {
                    'type': 'property',
                    'property': 'networks.port',
                    'limit': 99,
                },
                'OS__Neutron__SecurityGroup': {
                    'type': 'property',
                    'property': 'security_groups',
                    'limit': 99,
                },
            },
            necessary_properties: {
                'flavor': null
            }
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
            if (typeof this.connectedoptions === 'undefined'){
                $scope.connected_options = []
            } else{
                $scope.connected_options = this.connectedoptions;
            }
            if (typeof this.instance.metadata === 'undefined'){
                this.instance.metadata = [{}];
            }
            if (typeof this.instance.tags === 'undefined'){
                this.instance.tags = [];
            }
            if (typeof this.instance.scheduler_hints === 'undefined'){
                this.instance.scheduler_hints = [{}];
            }
            if (typeof this.instance.personality === 'undefined'){
                this.instance.personality = [{}];
            }
            if (typeof this.instance.scheduler_hints === 'undefined'){
                this.instance.scheduler_hints = [];
            }
            if (typeof this.instance.block_device_mapping === 'undefined'){
                this.instance.block_device_mapping = [{}];
            }
            if (typeof this.instance.security_groups === 'undefined'){
                this.instance.security_groups = [];
            }
            if (typeof this.instance.block_device_mapping_v2 === 'undefined'){
                this.instance.block_device_mapping_v2 = [{}];
            }
            if (typeof this.instance.networks === 'undefined'){
                this.instance.networks = [{}];
            }
            $scope.show_passwd = false;
            $scope.show_passwd_type = "password";
            $scope.bdpv2_source = {}; // Mark the source selected of every block_device_mapping_v2 item.
            $scope.how2config_networks = {};

            this.disable = {
                'key_name': false,
                'security_groups': [],
                'block_device_mapping_v2.volume_id': [],
                'networks': {},
            }

            if ( $scope.connected_options.key_name && $scope.connected_options.key_name.length > 0){
                this.instance['key_name'] = $scope.connected_options.key_name[0].value;
                this.disable.key_name = true;
            }
            if ( $scope.connected_options.security_groups && $scope.connected_options.security_groups.length > 0){
                for (var idx in $scope.connected_options.security_groups){
                    this.instance['security_groups'].push($scope.connected_options.security_groups[idx].value);
                    this.disable.security_groups.push($scope.connected_options.security_groups[idx].value);
                }
            }
            if ( $scope.connected_options['block_device_mapping_v2.volume_id'] && $scope.connected_options['block_device_mapping_v2.volume_id'].length > 0){
                for (var idx in $scope.connected_options['block_device_mapping_v2.volume_id']){
                    this.instance.block_device_mapping_v2.splice(idx, 0, {volume_id: $scope.connected_options['block_device_mapping_v2.volume_id'][idx].value});
                    this.disable['block_device_mapping_v2.volume_id'].push($scope.connected_options['block_device_mapping_v2.volume_id'][idx].value);
                    $scope.bdpv2_source[idx.toString()] = 'volume';
                }
            }

            if ( $scope.connected_options['networks.network'] && $scope.connected_options['networks.network'].length > 0){
                for (var idx in $scope.connected_options['networks.network']){
                    var before_length = this.instance.networks.length-1;
                    this.instance.networks.splice(before_length, 0, {uuid: $scope.connected_options['networks.network'][idx].value});
                    this.disable.networks[before_length.toString()] = true;
                    $scope.how2config_networks[before_length.toString()] = 'network';
                }
            }
            if ( $scope.connected_options['networks.subnet'] && $scope.connected_options['networks.subnet'].length > 0){
                for (var idx in $scope.connected_options['networks.subnet']){
                    var before_length = this.instance.networks.length-1;
                    this.instance.networks.splice(before_length, 0, {subnet: $scope.connected_options['networks.subnet'][idx].value});
                    this.disable.networks[before_length.toString()] = true;
                    $scope.how2config_networks[before_length.toString()] = 'subnet';
                }
            }
            if ( $scope.connected_options['networks.port'] && $scope.connected_options['networks.port'].length > 0){
                for (var idx in $scope.connected_options['networks.port']){
                    var before_length = this.instance.networks.length-1;
                    this.instance.networks.splice(before_length, 0, {port: $scope.connected_options['networks.port'][idx].value});
                    this.disable.networks[before_length.toString()] = true;
                    $scope.how2config_networks[before_length.toString()] = 'port';
                }
            }
            if ( $scope.connected_options['networks.floating_ip'] && $scope.connected_options['networks.floating_ip'].length > 0){
                for (var idx in $scope.connected_options['networks.floating_ip']){
                    var before_length = this.instance.networks.length-1;
                    this.instance.networks.splice(before_length, 0, {floating_ip: $scope.connected_options['networks.floating_ip'][idx].value});
                    this.disable.networks[before_length.toString()] = true;
                    $scope.how2config_networks[before_length.toString()] = 'floating_ip';
                }
            }
            $scope.keypairs = $scope.get_keypairs_options();
            $scope.networks = $scope.get_networks_options();
            $scope.subnets = $scope.get_subnets_options();
            $scope.floatingips = $scope.get_floatingips_options();
            $scope.ports = $scope.get_ports_options();
            $scope.security_groups = $scope.get_security_groups_options();
            $scope.volumes = $scope.get_volumes_options();

        }
        $scope.$watch("show_passwd", function(newValue, oldValue) {
            $scope.show_passwd_type = $scope.show_passwd ? "text" : "password";
        });

        $scope.get_security_groups_options = function(){
            if ('security_groups' in $scope.connected_options){
                var resource_secgroups = [];
                for (var idx in $scope.connected_options.security_groups){
                    var item = $scope.connected_options.security_groups[idx];
                    resource_secgroups.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.security_groups.concat(resource_secgroups);
            }
            return $rootScope.security_groups;
        }

        $scope.get_volumes_options = function(){
            if ('security_groups' in $scope.connected_options){
                var resource_volumes = [];
                for (var idx in $scope.connected_options['block_device_mapping_v2.volume_id']){
                    var item = $scope.connected_options['block_device_mapping_v2.volume_id'][idx];
                    resource_volumes.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.volumes.concat(resource_volumes);
            }
            return $rootScope.volumes;
        }

        $scope.get_keypairs_options = function(){
            if ('key_name' in $scope.connected_options){
                var resource_keypair = [];
                for (var idx in $scope.connected_options.key_name){
                    var item = $scope.connected_options.key_name[idx];
                    resource_keypair.push({
                        name: item.value
                    })
                }
                return $rootScope.keypairs.concat(resource_keypair);
            }
            return $rootScope.keypairs;
        }

        $scope.get_networks_options = function(){
            if ('networks.network' in $scope.connected_options){
                var resource_nw = [];
                for (var idx in $scope.connected_options['networks.network']){
                    var item = $scope.connected_options['networks.network'][idx];
                    resource_nw.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.networks.concat(resource_nw);
            }
            return $rootScope.networks;
        }
        $scope.get_subnets_options = function(){
            if ('networks.subnet' in $scope.connected_options){
                var resource_subnet = [];
                for (var idx in $scope.connected_options['networks.subnet']){
                    var item = $scope.connected_options['networks.subnet'][idx];
                    resource_subnet.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.subnets.concat(resource_subnet);
            }
            return $rootScope.networks;
        }
        $scope.get_floatingips_options = function(){
            if ('networks.floating_ip' in $scope.connected_options){
                var resource_fip = [];
                for (var idx in $scope.connected_options['networks.floating_ip']){
                    var item = $scope.connected_options['networks.floating_ip'][idx];
                    resource_fip.push({
                        id: item.value,
                    })
                }
                return $rootScope.floatingips.concat(resource_fip);
            }
            return $rootScope.floatingips;
        }
        $scope.get_ports_options = function(){
            if ('networks.port' in $scope.connected_options){
                var resource_port = [];
                for (var idx in $scope.connected_options['networks.port']){
                    var item = $scope.connected_options['networks.port'][idx];
                    resource_port.push({
                        id: item.value,
                        name: item.value
                    })
                }
                return $rootScope.ports.concat(resource_port);
            }
            return $rootScope.ports;
        }
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
        $scope.volume_sources_v2 = [
            {'id': 'image', 'name': 'image'},
            {'id': 'volume', 'name': 'volume'},
            {'id': 'volume_snapshot', 'name': 'volume snapshot'}
        ];
        $scope.block_device_mapping_v2 = true;
        $scope.availability_zones = $rootScope.availability_zones;
        $scope.flavors = $rootScope.flavors;
        $scope.security_groups = $rootScope.security_groups;
        $scope.keypairs = $rootScope.keypairs;
        $scope.images = $rootScope.images;
        $scope.image_snapshots = $rootScope.image_snapshots;
        $scope.volumes = $rootScope.volumes;
        $scope.volume_snapshots = $rootScope.volume_snapshots;
        $scope.deployment_swift_data = {};

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
        $scope.disk_types = [
                {'name': 'disk'},
                {'name': 'cdrom'},
        ]
        $scope.disk_buses = [
                {'name': 'ide'},
                {'name': 'lame_bus'},
                {'name': 'scsi'},
                {'name': 'usb'},
                {'name': 'virtio'},
        ];
        $scope.ephemeral_formats = [
                {'name': 'ext2'},
                {'name': 'ext3'},
                {'name': 'ext4'},
                {'name': 'xfs'},
                {'name': 'ntfs'},
        ];
        $scope.allocate_networks = [{'name': 'none'}, {'name': 'auto'}];
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
        this.delete_block_device_mapping_v2 = function(index){
            this.instance.block_device_mapping_v2.splice(index, 1)
        }
        this.add_block_device_mapping_v2 = function(){
            this.instance.block_device_mapping_v2.push({})
        }
        this.delete_networks = function(index){
            this.instance.networks.splice(index, 1)
        }
        this.add_networks = function(){
            this.instance.networks.push({})
        }
        this.delete_scheduler_hints = function(index){
            this.instance.scheduler_hints.splice(index, 1)
        }
        this.add_scheduler_hints= function(){
            this.instance.scheduler_hints.push({})
        }

    }

    angular_module.component('osNovaServer', {
        templateUrl: '/js/resources/os__nova__server/os__nova__server.html',
        controller: osNovaServerController,
        bindings:{
            'instance': '=',
            'connectedoptions': '<',
            'formReference': '<',
        }
    });

})(window.angular);
