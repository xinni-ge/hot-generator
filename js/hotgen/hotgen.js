(function() {
    'use strict';

    angular
        .module('horizon.dashboard.project.heat_dashboard.template_generator',
            ['ngMaterial', 'ngMessages', 'ngSanitize',
             'hotgen-utils', 'ui.bootstrap', 'ngVis',
            ])
        .config(['$mdThemingProvider', function($mdThemingProvider) {
          $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('blue')
            .warnPalette('red');
            }])
        .config(['$provide', '$windowProvider', function($provide, $windowProvider){
//                var path = $windowProvider.$get().STATIC_URL + 'dashboard/project/heat_dashboard/template_generator/';
                var path = '/'
                $provide.constant('horizon.dashboard.project.heat_dashboard.template_generator.basePath', path);

        }])
        .run(['$rootScope', function ($rootScope,
                ) {

            /* *********************************************************************
             * The following selections should be replaced by OpenStack API response
             */

            $rootScope.auth = {
                'tenant_id': '',
                'admin': true,
            }

            $rootScope.keypair_types = [
                {'name': 'ssh'},
                {'name': 'x509'},
            ];

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
            $rootScope.networks = [
                {'id': 'fd7439dd-715d-4685-8478-f1c6b65c1ba1', 'name': 'internal network 01'},
            ];
            $rootScope.floating_subnets = [
                {'id': 'ca454447-a5b8-4891-bb61-5ff5a0e681af', 'name': 'public subnet'},
            ];
            $rootScope.subnets = [
                {'id': '19760c5c-bffe-482e-97cb-544e6c4092ab', 'name': 'internal subnet 01'},
            ];
            $rootScope.ports = [
                {'id': '97175254-b807-9717-0ab6-001750687cec', 'name': 'Port 1'},
            ];
            $rootScope.routers = [
                {'id': 'f8375510-efc8-4839-9593-56e3dad07014', 'name': 'Router 1'},
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

        }]);
    angular.module('horizon.dashboard.project.heat_dashboard.template_generator')
    .controller('DraftMenuCtrl', ["$scope","$rootScope",
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

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').controller('ClearCanvasCtrl', ["$scope", "$rootScope", "hotgenNotify" ,
        function($scope, $rootScope, hotgenNotify){
            $scope.clear_canvas = function(){
                $rootScope.nodes.clear();
                $rootScope.edges.clear();
                $rootScope.selected = {};
                $rootScope.saved_resources = {};
                $rootScope.is_saved = {};
                hotgenNotify.show_success('The Canvas has been initialized.');
            };

    }]);

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').controller('IconCtrl', ['$scope','$rootScope','hotgenGlobals',function($scope, $rootScope, hotgenGlobals){
        $scope.resource_types = hotgenGlobals.get_resource_icons();
        $scope.admin = $rootScope.auth.admin;
        $scope.resource_admin = hotgenGlobals.get_node_admin();

    }]);

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').directive('draggable', [function(){
        return function (scope, element){
            var el = element[0];
            el.draggable = true;
            el.addEventListener('dragstart', function(e){
                this.style.opacity = '0.4';
                e.dataTransfer.setData('text', e.target.id);
            }, false);

            el.addEventListener('dragend', function(e){
                this.style.opacity = '1.0';
            }, false);

        }
    }]);
    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').directive('droppable',
    ['$rootScope', 'hotgenGlobals', 'hotgenUUID', function($rootScope, hotgenGlobals, hotgenUUID){
        return {
            link: function (scope, element){
                var el = element[0];
                el.addEventListener('dragover', function(e){
                    if (e.preventDefault){
                        e.preventDefault();
                    }
                },true);
                el.addEventListener('drop', function(e){
                    var resource_types = hotgenGlobals.get_resource_icons();
                    var dropped_elem_id = e.dataTransfer.getData("text");
                    var dropped_elem_base = document.getElementById(dropped_elem_id);
                    var resource_type = dropped_elem_id;
                    var dragged_resource = resource_types[resource_type];
                    var id = hotgenUUID.uuid(resource_type);
                    $rootScope.nodes.add({
                        id: id,
                        label: resource_type+'('+id.slice(0, 6)+'...)',
                        shape: 'icon',
                        title: resource_type,
                        icon: {
                            face: 'FontAwesome',
                            code: dragged_resource.code,
                            size: 50,
                            color: dragged_resource.color,
                        }
                    });
                    $rootScope.is_saved[id] = false;
                    e.preventDefault();
                },false);
            }
        }
    }]);
    angular.module('horizon.dashboard.project.heat_dashboard.template_generator')
    .controller('horizon.dashboard.project.heat_dashboard.template_generator.TempModalCtrl', ['$scope', '$rootScope',
        '$mdDialog', 'hotgenNotify', 'hotgenUtils',
        'horizon.dashboard.project.heat_dashboard.template_generator.basePath',
        function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenUtils, basePath){
            $scope.open = function(){
                $mdDialog.show({
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    templateUrl: basePath+'templates/modal_template.html',
                    controller: DialogController,
                }).then(function(){
                    hotgenNotify.show_success('Resource saved.');
                }, function(){
                    hotgenNotify.show_info('dismiss a modal');
                });
            };
            DialogController.$inject = ['$scope', '$rootScope', '$mdDialog'];
            function DialogController($scope, $rootScope, $mdDialog) {
                    $scope.all_saved = false;
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };
                    $scope.save = function(msg) {
                      // jump to stack creation page.
                      $mdDialog.hide(msg);
                    };
                    $scope.generate = function(){
                        var resource_root = {};
                        if( Object.keys($rootScope.is_saved).length == 0 || Object.keys($rootScope.saved_resources).length == 0){
                            $scope.all_saved = false;
                            return 'Cannot generate, no resource has been saved.';
                        }
                        if (Object.values($rootScope.is_saved).indexOf(false) >= 0){
                            $scope.all_saved = false;
                            return 'Cannot generate, some resources are not saved.';
                        }
                        $scope.all_saved = true;
                        for (var idkey in $rootScope.saved_resources){
                            var resource_type = $rootScope.saved_resources[idkey].type;
                            var resource_name = resource_type + '_' + idkey;
                            var copy_data = angular.copy($rootScope.saved_resources[idkey].data)
                            var properties = $scope.extract_properties(copy_data);
                            resource_root[resource_name] = {
                                type: resource_type.replace(/_/g, ':'),
                                properties: properties,
                            };

                        }
                        var today = new Date();
                        var template_root = {
                            heat_template_version: "2017-09-01",
                            description: 'version 2017-09-01 created by HOT Generator at '+ today.toUTCString() + '.',
                            resources: resource_root
                        }
                        var json_string = JSON.stringify(template_root);
                        return json2yaml(json_string);
                    }
                    $scope.extract_properties = function(resource_data){
                        for (var property in resource_data){
                            var func = null;
                            switch (property){
                                case 'description':
                                case 'public_key':
                                    func =  hotgenUtils.escape_characters;
                                    break;
                                case 'metadata':
                                case 'scheduler_hints':
                                case 'value_specs':
                                    func =  hotgenUtils.extract_keyvalue;
                                    break;
                                case 'allocation_pools':
                                case 'allowed_address_pairs':
                                case 'block_device_mapping':
                                case 'block_device_mapping_v2':
                                case 'fixed_ips':
                                case 'host_routes':
                                case 'personality':
                                    func = hotgenUtils.extract_list_of_keyvalue;
                                    break;
                                case 'dns_nameservers':
                                case 'dhcp_agent_ids':
                                case 'tags':
                                    func = hotgenUtils.extract_list;
                                default:
                                    break;
                            }
                            if ( func != null){
                                var processed_value = func(resource_data[property]);
                                if (processed_value != null){
                                    resource_data[property] = processed_value;
                                } else{
                                    delete resource_data[property]
                                }
                            }
                        }
                        return resource_data;
                    }
                    $scope.template = {
                        title: 'Template',
                        content: $scope.generate(),
                    };
                }
        }]);

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').controller('FormModalCtrl', ['$scope', '$rootScope', '$compile',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage', 'hotgenGlobals', 'hotgenUtils',
        'horizon.dashboard.project.heat_dashboard.template_generator.basePath',
        function($scope, $rootScope, $compile, $mdDialog,
                 hotgenNotify, hotgenMessage, hotgenGlobals, hotgenUtils, basePath){
            $scope.showTabDialog = function(){
                $mdDialog.show({
                    controller: DialogController,
                    controllerAs: 'ctrl',
                    templateUrl: basePath+'templates/modal_resource.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true
                }).then(function(){
                    hotgenNotify.show_success('The selected resource is saved successfully.');
                }, function(){
//                    hotgenNotify.show_error('dismiss a modal');
                });
                DialogController.$inject = ['$scope', '$rootScope', '$mdDialog'];
                function DialogController($scope, $rootScope, $mdDialog,) {
                    $scope.delete_resource = function() {
                        var label = $rootScope.selected.node.label;
                        $rootScope.network.deleteSelected();
                        hotgenNotify.show_success(label + ' has been delete successfully.')
                        $mdDialog.cancel();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.save = function() {
                        $mdDialog.hide();
                        $rootScope.saved_resources[$rootScope.selected.id] = {
                            type: $rootScope.selected.resource_type,
                            data: angular.copy($scope.resource)
                        };
                        var label = $rootScope.selected.node.label;
                        var prop_label = $scope.get_label($rootScope.selected.resource_type);

                        if (prop_label && $scope.resource[prop_label]){
                          label = $scope.resource[prop_label];
                        }
                        $rootScope.nodes.update({
                              id: $rootScope.selected.id,
                              label: label,
                              font: { color: $rootScope.selected.node.icon.color},
                            })
                        // Mark the node is saved.
                        $rootScope.is_saved[$rootScope.selected.id] = true;

                        // Mark edges connected from the node are saved and update style.
                        for (var idx in $scope.connectedoptions){
                            var connected_option = $scope.connectedoptions[idx];
                            for (var idx_edge in connected_option){
                                $rootScope.is_saved[connected_option[idx_edge].edge.id] = true;
                                $rootScope.edges.update({
                                  id: connected_option[idx_edge].edge.id,
                                  dashes: false,
                                  color: $rootScope.selected.node.icon.color,
                                })
                          }
                        }

                    };

                    $scope.resource_type = $rootScope.selected.resource_type.replace(/_/g, ':');

                    if ($rootScope.selected.id in $rootScope.saved_resources){
                        $scope.resource = angular.copy($rootScope.saved_resources[$rootScope.selected.id].data);
                    } else{
                        $scope.resource = {}
                    }
                    // Add connected edge resource
                    $scope.get_connected_options = function(){
                        var related_edges = $rootScope.network.getConnectedEdges($rootScope.selected.id);
                        var connected_options = {};
                        for (var idx in related_edges){
                            var edge = $rootScope.edges.get(related_edges[idx])
                            if (edge.from != $rootScope.selected.id ){
                                continue;
                            }
                            var node = $rootScope.nodes.get(edge.to);
                            var edge_directions = hotgenGlobals.get_edge_directions();
                            if (! ($rootScope.selected.resource_type in edge_directions)){
                                continue;
                            }
                            var mapping = edge_directions[$rootScope.selected.resource_type];
                            if (!(node.title in mapping)){
                                continue;
                            }
                            var property = mapping[node.title].property;
                            if (!(property in connected_options)){
                                connected_options[property] = [];
                            }
                            connected_options[property].push({
                                value: hotgenUtils.get_resource_string(node.title+'_'+node.id),
                                id: node.id,
                                resource_type: node.title,
                                edge: edge
                            });

                        }
                        return connected_options;
                    }
                    $scope.connectedoptions = $scope.get_connected_options()
                    $scope.component = hotgenGlobals.get_resource_components()[$rootScope.selected.resource_type];

                    $scope.get_label = function(node_type){
                        return hotgenGlobals.get_node_labels()[node_type];
                    }

                }
            };
            $scope.$on('handle_edit_node', function(event, args){
                hotgenNotify.show_info('Show details of resource ' + args.replace(/_/g, ':') +'.');
                $scope.showTabDialog();
            });

        }]);

        angular.module('horizon.dashboard.project.heat_dashboard.template_generator').controller('EdgeFormModalCtrl',  ['$scope', '$rootScope',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage', 'hotgenGlobals',
        'horizon.dashboard.project.heat_dashboard.template_generator.basePath',
        function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenMessage, hotgenGlobals,basePath){
            $scope.showTabDialog = function(){
                    $mdDialog.show({
                      controller: EdgeDialogController,
                      controllerAs: 'ctrl',
                      templateUrl: basePath+'templates/modal_edge.html',
                      parent: angular.element(document.body),
                      clickOutsideToClose:true
                    }).then(function(){
                        hotgenNotify.show_success('The selected edge is saved successfully.');
                    }, function(){
    //                    hotgenNotify.show_error('dismiss a modal');
                    });
                EdgeDialogController.$inject = ['$scope', '$rootScope', '$mdDialog'];
                function EdgeDialogController($scope, $rootScope, $mdDialog,) {
                    $scope.delete_resource = function() {
                        $rootScope.network.deleteSelected();
                        hotgenNotify.show_success('The selected edge has been delete successfully.')
                        $mdDialog.cancel();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };

                    if ($rootScope.selected.id in $rootScope.saved_resources){
                        $scope.resource = angular.copy($rootScope.saved_resources[$rootScope.selected.id].data);
                    } else{
                        $scope.resource = {}
                    }

                    var from_type = $rootScope.selected.resource_type.from;
                    var to_type = $rootScope.selected.resource_type.to;
                    $scope.from_type = from_type.replace(/_/g, ':');
                    $scope.to_type = to_type.replace(/_/g, ':');
                    $scope.from_node = {
                        class: hotgenGlobals.get_resource_icons()[from_type].class,
                        color: hotgenGlobals.get_resource_icons()[from_type].color,
                        id: $rootScope.selected.from_node.id,
                    }
                    $scope.to_node = {
                        class: hotgenGlobals.get_resource_icons()[to_type].class,
                        color: hotgenGlobals.get_resource_icons()[to_type].color,
                        id: $rootScope.selected.to_node.id,
                    }
                }
            };
            $scope.$on('handle_edit_edge', function(event, args){
                /* Click a edge and decide to show modal or not */
                var from_type = args.from;
                var to_type = args.to;
                var edge_directions = hotgenGlobals.get_edge_directions();
                if ( !( from_type in edge_directions) || !(to_type in edge_directions[from_type])){
                    hotgenNotify.show_warning('The edge might be invalid.');
                    return;
                }
                $scope.showTabDialog();
            });
        }]);

    angular.module('horizon.dashboard.project.heat_dashboard.template_generator').controller('DraftModalCtrl', ['$scope', '$rootScope',
        '$mdDialog', 'hotgenNotify', 'hotgenMessage',
        'horizon.dashboard.project.heat_dashboard.template_generator.basePath',
         function($scope, $rootScope, $mdDialog, hotgenNotify, hotgenMessage, basePath){
            $scope.showDialog = function(){
                $mdDialog.show({
                  controller: DraftDialogController,
                  templateUrl: basePath + 'templates/modal_draft.html',
                  parent: angular.element(document.body),
                  clickOutsideToClose:true
                }).then(function(){
                    hotgenNotify.show_success('The draft is loaded successfully.');
                }, function(){
//                    hotgenNotify.show_error('dismiss a modal');
                });
                DraftDialogController.$inject = ['$scope', '$rootScope', '$mdDialog'];
                function DraftDialogController($scope, $rootScope, $mdDialog,) {
                    $scope.draft_list = [];
                    $scope.latest_draft = JSON.parse(localStorage.getItem('draft_'+localStorage.saved_counter));
                    for (var i = 0 ; i < 10; i++){
                        if (localStorage.getItem('draft_'+i)){
                            var saved_drafts = JSON.parse(localStorage.getItem('draft_'+i));
                            $scope.draft_list.push(saved_drafts);
                        }
                    }
                    $scope.load = function(draft) {
                        $mdDialog.hide();
                        $rootScope.nodes.clear();
                        for (var id in draft.nodes){
                            $rootScope.nodes.add(draft.nodes[id]);
                        }
                        $rootScope.edges.clear();
                        for (var id in draft.edges){
                            $rootScope.edges.add(draft.edges[id]);
                        }
                        $rootScope.saved_resources = draft.saved_resources;
                        $rootScope.is_saved = draft.is_saved;

                    };
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };
                }
            }
            $scope.$on('handle_load_draft', function(event, args){
                $scope.showDialog();
            });

         }]);
        angular.module('horizon.dashboard.project.heat_dashboard.template_generator').controller('VisCtrl', ['$scope', '$rootScope', 'hotgenNotify', 'hotgenMessage', 'hotgenGlobals', 'VisDataSet',
        function($scope, $rootScope, hotgenNotify, hotgenMessage, hotgenGlobals, VisDataSet) {
            $rootScope.message_level = 3;
            $rootScope.nodes = new VisDataSet();
            $rootScope.edges = new VisDataSet();
            $rootScope.saved_resources = {};
            $rootScope.selected = {};
            $rootScope.is_saved = {};
            $scope.options = {
                autoResize: true,
                edges: {
                    smooth: false,
//                    arrows: 'to',
                    dashes: true,
//                    length: 300,
                    color: {
                        color: '#848484',
                        highlight: '#848484',
                        hover: '#848484',
                    }
                },
                interaction: {
                    hover: true,
                },
                physics: {
                    enabled: true,
                    solver: 'forceAtlas2Based',
                    forceAtlas2Based: {
                        avoidOverlap: 1,
                    },
                    barnesHut: {
                        avoidOverlap: 1
                    }
                },
                manipulation: {
                    enabled: true,
                    addEdge: function(data, callback){
                        var valid = $scope.validate_edge(data);
                        if (valid == false){
                            callback(null);
                        } else{
                            hotgenNotify.show_success("Successfully connected.");
                            callback(data);
                            $rootScope.nodes.update({
                                id: data.from,
                                font: {color: '#343434'}
                            })
                            $rootScope.is_saved[data.id] = false;
                            $rootScope.is_saved[data.from] = false;
                        }
                    },
                    addNode: false,
                    editEdge: false,
                    deleteNode: function(data, callback){
                        var node_ids = data.nodes;
                        var edge_ids = data.edges;
                        for (var idx in node_ids){
                            delete $rootScope.is_saved[node_ids[idx]];
                        }
                        for (var idx in edge_ids){
                            delete $rootScope.is_saved[edge_ids[idx]];
                        }
                        callback(data);
                    },
                    deleteEdge: function(data, callback){
                        var edge_ids = data.edges;
                        for (var idx in edge_ids){
                            var edge_id = edge_ids[idx];
                            delete $rootScope.is_saved[edge_id];
                            var from_id = $rootScope.edges.get(edge_id).from;
                            $rootScope.is_saved[from_id] = false;
                            $rootScope.nodes.update({
                                id: from_id,
                                font: {color: '#343434'}
                            })
                        }

                        callback(data);
                    },
                },
                locales: {
                    en: {
                        edit: 'Edit',
                        del: 'Delete this resource',
                        back: 'Back',
                        addNode: 'Add Node', // hided
                        addEdge: 'Connect Resources',
                        editNode: 'Edit Node',
                        editEdge: 'Edit Connection', // hided
                        // All of following is not used.
                        addDescription: 'Click in an empty space to place a new node.',
                        edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
                        editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
                        createEdgeError: 'Cannot link edges to a cluster.',
                        deleteClusterError: 'Clusters cannot be deleted.',
                        editClusterError: 'Clusters cannot be edited.'
                    },
                    ja: {
                        edit: '編集',
                        del: 'このリソースを削除する',
                        back: '戻る',
                        addNode: 'Add Node', // hided
                        addEdge: 'リソースを接続',
                        editNode: 'Edit Node', // hided
                        editEdge: '接电脑端続を編集', // hided
                        // All of following is not used.
                        addDescription: 'Click in an empty space to place a new node.',
                        edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
                        editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
                        createEdgeError: 'Cannot link edges to a cluster.',
                        deleteClusterError: 'Clusters cannot be deleted.',
                        editClusterError: 'Clusters cannot be edited.'
                    },
                },
            };

            $scope.data = {
                nodes: $rootScope.nodes,
                edges: $rootScope.edges
            };
            $scope.click = function(params){
                if (params.nodes.length > 0){
                    var selected_id = params.nodes[0];
                    var selected_node = $rootScope.nodes.get(selected_id);
                    var selected_type = selected_node.title
                    $rootScope.selected = {
                        element: 'node',
                        resource_type: selected_type,
                        id: selected_id,
                        node: selected_node,
                    }

                    hotgenMessage.broadcast_edit_node(selected_type);
                } else if (params.edges.length > 0){
                    var selected_id = params.edges[0];
                    var selected_edge = $rootScope.edges.get(selected_id);
                    var from_node = $rootScope.nodes.get(selected_edge.from);
                    var to_node = $rootScope.nodes.get(selected_edge.to);

                    $rootScope.selected = {
                        element: 'edge',
                        resource_type: {from: from_node.title, to: to_node.title},
                        from_node: from_node,
                        to_node: to_node,
                        id: selected_id,
                        edge: selected_edge,
                    }
                    hotgenMessage.broadcast_edit_edge(from_node.title, to_node.title);
                } else {
                    ;
                }
            };

            $scope.events = {
                click: $scope.click,
                onload: function(network){
                    $scope.network = network;
                    $rootScope.network = network;
                }
            };

            $scope.get_added_edge_id = function(old_edge_ids, new_edge_ids){
                for (var id in new_edge_ids){
                    if (old_edge_ids.indexOf(new_edge_ids[id]) == -1){
                        return new_edge_ids[id];
                    }
                }
            }
            $scope.get_modal = function(data){
                var from_node = $scope.get_node(data.from);
                var to_node = $scope.get_node(data.to);
                var mapping = $scope.get_mapping(from_node.title, to_node.title);
                if (mapping){
                    return mapping.modal;
                }
                return ;
            }

            $scope.get_mapping = function (from_type, to_type){
                var edge_directions = hotgenGlobals.get_edge_directions()
                if ((! edge_directions[from_type]) || !(edge_directions[from_type][to_type])){
                    hotgenNotify.show_error(to_type.replace(/_/g, ':')+" cannot be connected with "+from_type.replace(/_/g, ':')+".");
                    return false;
                }
                return edge_directions[from_type][to_type]

            }

            $scope.get_node = function(node_id){
                return $scope.data.nodes.get(node_id);
            }

            $scope.validate_edge = function(data){
                if (data.from == data.to ){
                    hotgenNotify.show_error("The resource cannot be connected with itself.");
                    return false;
                }
                var from_node = $scope.get_node(data.from);
                var to_node = $scope.get_node(data.to);
                var from_node_type = from_node.title;
                var to_node_type = to_node.title;
                var edge_directions = hotgenGlobals.get_edge_directions()
                if ((! edge_directions[from_node_type]) || !(edge_directions[from_node_type][to_node_type])){
                    hotgenNotify.show_error(to_node.label+" cannot be connected with "+from_node.label+".");
                    return false;
                } else{
                    var limit = edge_directions[from_node_type][to_node_type].limit;
                    var occupied = edge_directions[from_node_type][to_node_type].occupied;
                    var lonely = edge_directions[from_node_type][to_node_type].lonely;
                    var from_connected = $scope.network.getConnectedNodes(data.from);
                    var count = 0;
                    for(var idx in from_connected){
                        var item_title = $scope.data.nodes.get(from_connected[idx]).title;
                        if (to_node_type == item_title){
                            count += 1;
                        }
                    }
                    if (count >= limit){
                        hotgenNotify.show_error("The number of connections between the resources is out of limit.");
                        return false;
                    }
                    var to_connected = $scope.network.getConnectedNodes(data.to);
                    if (lonely === true && to_connected.length > 0) {
                        hotgenNotify.show_error(to_node.label+" cannot be connected with "+from_node.label+".");
                        return false;
                    }
                    if (occupied === true){
                        for (var idx in to_connected){
                            var item_title = $scope.data.nodes.get(to_connected[idx]).title;
                            if (from_node_type == item_title){
                                hotgenNotify.show_error(to_node.label+" has already been connected with "+from_node_type+".");
                                return false;
                            }
                        }
                    }
                }
                return true;
            }
        }
    ]);
})();

