(function() {
    'use strict';
    angular.module('hotgen-openstack', ['hotgen-utils',])
         .factory('openstack_agent', ['$http', '$q', 'hotgenNotify', 'hotgenGlobals',function($http, $q, hotgenNotify, hotgenGlobals) {
            var get_resource_options = function(){

                    /**********************************************************************
                     * Replaced by API response.
                     */

                  return $q(function(){
                     setTimeout(function() {
                        var response = {
                            auth: {
                                'tenant_id': '',
                                'admin': true,
                            },
                            keypair_types: [
                                {'name': 'ssh'},
                                {'name': 'x509'},
                            ],
                            keypairs: [
                                {'name': 'default'},
                                {'name': 'openstack'},
                            ],
                            security_groups: [
                                {'id': 'default', 'name': 'default'},
                                {'id': 'internal', 'name': 'internal'},
                                {'id': 'outbound', 'name': 'outbound'},
                            ],
                            volume_backups: [
                                {'id': 'a79c1fbc-2872-7c20-a28f-88ccdacc4332',  'name': 'volume-backup-20170102GMT120000'}
                            ],
                            volume_snapshots: [
                                {'id': '3e86fc96-9717-4800-a28f-87cce8f695a6', 'name': 'volume-snapshot-ubuntu1404-20170808'},
                            ],
                            instances: [
                                {'id': 'eea94a46-0a62-41b2-823c-22500175f99d', 'name': 'virtual-machine-for-test'},
                            ],
                            volumes: [
                                {'id': 'c11a6d55-70e9-4d04-a086-4451f07da0d7', 'name': 'volume-image-ubuntu1404'},
                            ],
                            image_snapshots: [
                                {'id': '15d687ce-83e8-11e6-99a3-525400180e00', 'name': 'snapshot-image-ubuntu1404'},
                            ],
                            images: [
                                {'id': 'ad936ae4-2983-4f23-9187-e47e82cb2725', 'name': 'Ubuntu-14.04.1_64'},
                                {'id': 'df1944a7-ca45-4709-9ec6-e31664133650', 'name': 'CentOS-7.1-1503_64'},
                                {'id': 'c99c0ab6-00a1-4119-b807-71229b0d9804', 'name': 'RedHatEnterpriseLinux-7.1'},
                            ],
                            floating_networks: [
                                {'id': '823ca3a8-bd8a-417d-8d32-fd1839e09d7f', 'name': 'public network'},
                            ],
                            networks: [
                                {'id': 'fd7439dd-715d-4685-8478-f1c6b65c1ba1', 'name': 'internal network 01'},
                            ],
                            floating_subnets: [
                                {'id': 'ca454447-a5b8-4891-bb61-5ff5a0e681af', 'name': 'public subnet'},
                            ],
                            subnets: [
                                {'id': '19760c5c-bffe-482e-97cb-544e6c4092ab', 'name': 'internal subnet 01'},
                            ],
                            ports: [
                                {'id': '97175254-b807-9717-0ab6-001750687cec', 'name': 'Port 1'},
                            ],
                            routers: [
                                {'id': 'f8375510-efc8-4839-9593-56e3dad07014', 'name': 'Router 1'},
                            ],
                            floatingips: [
                                {'id': '8d32c99c-b65c-f07d-0ab6-8f694a600171', },
                            ],
                            flavors: [
                                {'id': 'm1.small', 'name': 'm1.small'},
                                {'id': 'm1.medium', 'name': 'm1.medium'},
                                {'id': 'm1.large', 'name': 'm1.large'},
                            ],
                            availability_zones: [
                                { "id": "", "name": "Any Group/Zone"},
                                { "id": "zone_groupa", "name": "Zone1/Group A"},
                                { "id": "zone_groupb", "name": "Zone1/Group B"}
                            ],
                            volume_types: [
                                 {'id': 'virtio', 'name': 'virtio'},
                            ],
                            qos_policies: [
                                 {'id': '7d22dfdb-d293-4379-9814-e03758f870ef', 'name': 'Policy1'},
                            ],
                     }
                     hotgenGlobals.update_resource_options({
                            auth:{
                                tenant_id: '',
                                admin: false
                            },
                            keypair_types:[
                                {'name': 'ssh'},
                                {'name': 'x509'},
                            ],
                            image_snapshots: [],
                            floating_subnets: [],
                            qos_policies: [],
                        });
                        hotgenGlobals.update_resource_options(response);
                        hotgenNotify.show_success('Retrieve openstack resources successfully.');
                        return response;
                    }, 1000);
                  });



                    /*
                     * End replaced by API response
                     **********************************************************************
                     */
//                return $http({
//                      method: 'GET',
//                      url: '/project/template_generator/get_resource_options'
//                    }).then(function successCallback(response) {
//                        // this callback will be called asynchronously
//                        // when the response is available
//                        hotgenNotify.show_success('Retrieve openstack resources successfully.');
//                        return response.data;
//                    }, function errorCallback(response) {
//                        // called asynchronously if an error occurs
//                        // or server returns response with an error status.
//                        hotgenNotify.show_error('Cannot get openstack resources.');
//                        return null;
//                    });
            }
            return {
              get_resource_options: get_resource_options,
            };
         }])

})();