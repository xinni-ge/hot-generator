(function(angular) {
    'use strict';
    angular_module.constant('resource_types', {
        'OS__Nova__KeyPair': {
            class: 'fa-key ',
            name: 'OS::Nova::KeyPair',
            code: '\uf084',
            color: '#483dff'
        },
        'OS__Nova__Server': {
            class: 'fa-desktop ',
            name: 'OS::Nova::Server',
            code: '\uf108',
            color: '#483dff'
        },
        'OS__Cinder__Volume': {
            class: 'fa-hdd-o ',
            name: 'OS::Cinder::Volume',
            code: '\uf0a0',
            color: '#0bb238'
        },
        'OS__Cinder__VolumeAttachment': {
            class: 'fa-plug',
            name: 'OS::Cinder::VolumeAttachment',
            code: '\uf1e6',
            color: '#0bb238'
        },
        'OS__Neutron__FloatingIP': {
            class: 'fa-neuter ',
            name: 'OS::Neutron::FloatingIP',
            code: '\uf22c',
            color: '#40a5f2'
        },
        'OS__Neutron__FloatingIPAssociation': {
            class: 'fa-paperclip',
            name: 'OS::Neutron::FloatingIPAssociation',
            code: '\uf0c6',
            color: '#40a5f2'
        },
        'OS__Neutron__Net': {
            class: 'fa-cloud',
            name: 'OS::Neutron::Net',
            code: '\uf0c2',
            color: '#40a5f2'
        },
        'OS__Neutron__Port': {
            class: 'fa-genderless',
            name: 'OS::Neutron::Port',
            code: '\uf22d',
            color: '#40a5f2',
        },
        'OS__Neutron__Router': {
            class: 'fa-life-bouy',
            name: 'OS::Neutron::Router',
            code: '\uf1cd',
            color: '#40a5f2'
        },
        'OS__Neutron__RouterInterface': {
            class: 'fa-sun-o',
            name: 'OS::Neutron::RouterInterface',
            code: '\uf185',
            color: '#40a5f2'
        },
        'OS__Neutron__SecuriteGroup': {
            class: 'fa-shield ',
            name: 'OS::Neutron::SecuriteGroup',
            code: '\uf132',
            color: '#40a5f2'
        },
        'OS__Neutron__Subnet': {
            class: 'fa-cloud-upload ',
            name: 'OS::Neutron::Subnet',
            code: '\uf0ee',
            color: '#40a5f2'
        }
    });
    angular_module.constant('edge_directions', {
        'OS__Cinder__VolumeAttachment': {
            'OS__Cinder__Volume': {
                'type': 'property',
                'property': 'volume_id',
            },
            'OS__Nova__Server': {
                'type': 'property',
                'property': 'instance_uuid',
            },
        },
        'OS__Nova__Server': {
            'OS__Cinder__Volume': {
                'type': 'mapping',
                'mapping': 'block_device_mapping_v2',
            },
            'OS__Nova__KeyPair': {
                'type': 'property',
                'property': 'key_name',
            },
            'OS__Neutron__Net': {
                'type': 'mapping',
                'mapping': 'networks',
            },
            'OS__Neutron__FloatingIP': {
                'type': 'mapping',
                'mapping': 'networks',
            },
            'OS__Neutron__Subnet': {
                'type': 'mapping',
                'mapping': 'networks',
            },
            'OS__Neutron__Port': {
                'type': 'mapping',
                'mapping': 'networks',
            },
            'OS__Neutron__SecurityGroup': {
                'type': 'property',
                'property': 'security_groups',
            },
        },
        'OS__Neutron__FloatingIP': {
            'OS__Neutron__Net': {
                'type': 'property',
                'property': 'floating_network',
            },
            'OS__Neutron__Port': {
                'type': 'property',
                'property': 'port_id',
            },
        },
        'OS__Neutron__FloatingIPAssociation': {
            'OS__Neutron__FloatingIP': {
                'type': 'property',
                'property': 'floatingip_id',
            },
            'OS__Neutron__Port': {
                'type': 'property',
                'property': 'port_id',
            },
        },
        'OS__Neutron__Port': {
            'OS__Neutron__Net': {
                'type': 'property',
                'property': 'network',
            },
            'OS__Neutron__SecurityGroup': {
                'type': 'property',
                'property': 'security_groups',
            },
        },
        'OS__Neutron__Router': {
            'OS__Neutron__Net': {
                'type': 'mapping',
                'property': 'external_gateway_info',
            },
            'OS__Neutron__Subnet': {
                'type': 'mapping',
                'mapping': 'external_gateway_info',
            },
        },
        'OS__Neutron__RouterInterface': {
            'OS__Neutron__Port': {
                'type': 'property',
                'property': 'port',
            },
            'OS__Neutron__Router': {
                'type': 'property',
                'property': 'router',
            },
            'OS__Neutron__Subnet': {
                'type': 'property',
                'property': 'subnet',
            },
        },
        'OS__Neutron__Subnet': {
            'OS__Neutron__Net': {
                'type': 'property',
                'property': 'network',
            },
        },
    });
})(window.angular);

