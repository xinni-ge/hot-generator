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
                    content: 'here fields.',
                    required: true,
                    fields:[
                        {
                            id: '_name',
                            title: 'NAME',
                            type: 'text',
                        },
                        {
                            id: '_availability_zone',
                            title: 'AZ',
                            type: 'select',
                        },
                        {
                            id : '_count',
                            title: 'COUNT',
                            type: 'int',
                        }
                    ]
                },
                {
                    title: 'Additional',
                    content: 'here fields.',
                    required: true,
                },
            ],

        },
    })
})(window.angular);