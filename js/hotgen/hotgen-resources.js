(function(angular) {
    'use strict';
    angular_module.constant('resource_types', {
        'OS__Nova__Server': {
            class: 'fa-desktop ',
            name: 'OS::Nova::Server',
            code: '\uf108',
            color: '#483dff'
        },
        'OS__Cinder__Volume': {
            class: 'fa-cube ',
            name: 'OS::Cinder::Volume',
            code: '\uf1b2',
            color: '#483dff'
        },
        'OS__Neutron__Net': {
            class: 'fa-cloud',
            name: 'OS::Neutron::Net',
            code: '\uf0c2',
            color: '#A8CDF0'
        },
        'OS__Neutron__Subnet': {
            class: 'fa-cloud ',
            name: 'OS::Neutron::Subnet',
            code: '\uf0c2',
            color: '#add8e6'
        }
    });
    angular_module.constant('resource_fields', {
        'OS__Nova__Server': {
            title: 'CREATE_INSTANCE',
            tabs: [
                {
                    title: 'DETAILS',
                    required: true,
                    fields:[{
                            id: 'name',
                            title: 'NAME',
                            type: 'text',
                            required: true,
                        }, {
                            id: 'availability_zone',
                            title: 'AZ',
                            type: 'select',
                            options: ['groupa', 'groupb'],
                            required: false,
                        }, {
                            id : 'count',
                            title: 'COUNT',
                            type: 'number',
                            initial: '1',
                            required: true,
                        },{
                            id: 'boot_source',
                            title: 'BOOT_SOURCE',
                            type: 'select',
                            options: [{'image': 'image'},
                                {'image_snapshot': 'image snapshot'},
                                {'volume': 'volume'},
                                {'volume_snapshot': 'volume snapshot'}],
                            required: true,
                        }, {
                            id: 'image_id',
                            title: 'IMAGE',
                            type: 'select',
                            options:[
                            ]
                        },{
                            id: 'image_snapshot_id',
                            title: 'IMAGE_SNAPSHOT_ID',
                            type: 'select',
                            options:[
                            ]
                        },{
                            id: 'volume_id',
                            title: 'VOLUME_ID',
                            type: 'select',
                            options:[
                            ]
                        },{
                            id: 'volume_snapshot_id',
                            title: 'VOLUME_SNAPSHOT_ID',
                            type: 'select',
                            options:[
                            ]
                        },{
                            id: 'flavor_id',
                            title: 'FLAVOR_ID',
                            type: 'select',
                            options:[ 'm1.tiny', 'm1.small',
                            ]
                        }
                    ]
                },
                {
                    title: 'ADDITIONAL',
                    required: false,
                    fields: [{
                        id: 'security_group_id',
                        title: 'SECURITY_GROUP',
                        type: 'select',
                        options:[],
                    }, {
                        id: 'customization_script',
                        title: 'SECURITY_GROUP',
                        type: 'textarea',
                    }, {
                        id: 'metadata',
                        title: 'METADATA',
                        type: 'textarea',
                    }]
                },
            ],
        },
        'OS__Cinder__Volume': {
            title: 'CREATE_CINDER_VOLUME',
            tabs: [],
        },
        'OS__Neutron__Net': {
            title: 'CREATE_NEUTRON_NET',
            tabs: [],
        },
        'OS__Neutron__Subnet': {
            title: 'CREATE_NEUTRON_SUBNET',
            tabs: [],
        },
    })
})(window.angular);