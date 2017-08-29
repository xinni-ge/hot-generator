(function(angular) {
    'use strict';
    angular_module.config(function($mdThemingProvider) {
          $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('blue')
            .warnPalette('red');
        });

    angular_module.run(function ($rootScope, $translate, VisDataSet, $timeout) {
        $translate.use('en');
        $rootScope.message_level = 3;
        $rootScope.nodes = new VisDataSet();
        $rootScope.edges = new VisDataSet();
        $rootScope.saved_resources = {};
        $rootScope.selected = {};
        $rootScope.is_saved = {};

        /* *********************************************************************
         * The following selections should be replaced by OpenStack API response
         */
        $rootScope.auth = {
            'tenant_id': '',
            'admin': true,
        }

        $rootScope.keypairs = [
            {'name': 'default'},
            {'name': 'openstack'},
        ];
        $rootScope.security_groups = [
            {'id': 'default', 'name': 'default'},
            {'id': 'internal', 'name': 'internal'},
            {'id': 'outbound', 'name': 'outbound'},
        ];
        $rootScope.volume_backups = [
            {'id': 'a79c1fbc-2872-7c20-a28f-88ccdacc4332',  'name': 'volume-backup-20170102GMT120000'}
        ]
        $rootScope.volume_snapshots = [
            {'id': '3e86fc96-9717-4800-a28f-87cce8f695a6', 'name': 'volume-snapshot-ubuntu1404-20170808'},
        ];
        $rootScope.instances = [
            {'id': 'eea94a46-0a62-41b2-823c-22500175f99d', 'name': 'virtual-machine-for-test'},
        ];
        $rootScope.volumes = [
            {'id': 'c11a6d55-70e9-4d04-a086-4451f07da0d7', 'name': 'volume-image-ubuntu1404'},
        ];
        $rootScope.image_snapshots = [
            {'id': '15d687ce-83e8-11e6-99a3-525400180e00', 'name': 'snapshot-image-ubuntu1404'},
        ];
        $rootScope.images = [
            {'id': 'ad936ae4-2983-4f23-9187-e47e82cb2725', 'name': 'Ubuntu-14.04.1_64'},
            {'id': 'df1944a7-ca45-4709-9ec6-e31664133650', 'name': 'CentOS-7.1-1503_64'},
            {'id': 'c99c0ab6-00a1-4119-b807-71229b0d9804', 'name': 'RedHatEnterpriseLinux-7.1'},
        ];
        $rootScope.floating_networks = [
            {'id': '823ca3a8-bd8a-417d-8d32-fd1839e09d7f', 'name': 'public network'},
        ];
        $rootScope.floating_subnets = [
            {'id': 'ca454447-a5b8-4891-bb61-5ff5a0e681af', 'name': 'public subnet'},
        ];
        $rootScope.ports = [
            {'id': '97175254-b807-9717-0ab6-001750687cec', 'name': 'Port 1'},
        ];
        $rootScope.floatingips = [
            {'id': '8d32c99c-b65c-f07d-0ab6-8f694a600171', },
        ];
        $rootScope.flavors = [
            {'id': 'm1.small', 'name': 'm1.small'},
            {'id': 'm1.medium', 'name': 'm1.medium'},
            {'id': 'm1.large', 'name': 'm1.large'},
        ];
        $rootScope.availability_zones = [
            { "id": "", "name": "Any Group/Zone"},
            { "id": "zone_groupa", "name": "Zone1/Group A"},
            { "id": "zone_groupb", "name": "Zone1/Group B"}
        ];
        $rootScope.volume_types = [
             {'id': 'virtio', 'name': 'virtio'},
        ];
        $rootScope.qos_policies = [
             {'id': '7d22dfdb-d293-4379-9814-e03758f870ef', 'name': 'Policy1'},
        ];

        /*
         * End replaced by API response
         **********************************************************************
         */

    });
    angular_module.controller('DraftMenuCtrl', ["$scope","$rootScope",
        "$mdDialog", "hotgenNotify", "hotgenMessage",
        function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenMessage){
            $scope.openMenu = function($mdOpenMenu, ev){
                $mdOpenMenu(ev);
            };
            $scope.save_draft = function(){
                if ($rootScope.nodes.length == 0 && $rootScope.edges.length == 0){
                    hotgenNotify.show_warning('No resource to save.');
                    return;
                }
                if (localStorage.saved_counter) {
                    localStorage.saved_counter = (Number(localStorage.saved_counter) + 1)%10;
                } else {
                    localStorage.saved_counter = 0;
                }
                var data = {
                    nodes: $rootScope.nodes._data,
                    edges: $rootScope.edges._data,
                    saved_resources: $rootScope.saved_resources,
                    is_saved: $rootScope.is_saved,
                }

                var today = new Date();
                data['time'] = today.toUTCString();
                var drafts_serial = JSON.stringify(data);
                localStorage.setItem("draft_"+localStorage.saved_counter, drafts_serial);

                hotgenNotify.show_success('Draft is saved successfully at '+today.toUTCString()+'.');
            }
            $scope.load_draft = function(){
                hotgenMessage.broadcast_load_draft();
            }
            $scope.import_draft = function(){
                hotgenNotify.show_warning('Not Implemented.');
            }
            $scope.export_draft = function(){
                hotgenNotify.show_warning('Not Implemented.');
            }
    }]);

    angular_module.controller('ClearCanvasCtrl', ["$scope", "$rootScope", "hotgenNotify" ,
        function($scope, $rootScope, hotgenNotify){
            $scope.clear_canvas = function(){
                $rootScope.nodes.clear();
                $rootScope.edges.clear();
                $rootScope.selected = {};
                $rootScope.saved_resources = {};
                hotgenNotify.show_success('The Canvas has been initialized.');
            };

    }]);

})(window.angular);

