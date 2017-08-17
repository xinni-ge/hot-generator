(function(angular) {
    'use strict';
    angular_module.controller('VisCtrl', ['$scope', '$rootScope', 'hotgenNotify', 'hotgenMessage', 'edge_directions',
        function($scope, $rootScope, hotgenNotify, hotgenMessage, edge_directions) {

            $scope.options = {
                autoResize: true,
                edges: {
                    smooth: false,
                    dashes: true,
                    length: 300,
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
                        }
                    },
                    addNode: false,
                    editEdge: false
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
                    var selected_node = $rootScope.nodes._data[selected_id];
                    var selected_type = selected_node.title
                    $rootScope.selected = {
                        element: 'node',
                        resource_type: selected_type,
                        id: selected_id,
                    }

                    hotgenMessage.broadcast_edit_node(selected_type);
                } else if (params.edges.length > 0){
                    ;
                } else {
                    ;
                }
            };

            $scope.events = {
                click: $scope.click,
                onload: function(network){
                    $scope.network = network;
                }
            };

            $scope.validate_edge = function(data){
                if (data.from == data.to ){
                    hotgenNotify.show_error("The resources are already be connected.");
                    return false;
                }
                var from_node = $scope.data.nodes.get(data.from);
                var to_node = $scope.data.nodes.get(data.to);
                var from_node_type = from_node.title;
                var to_node_type = to_node.title;
                if ((! edge_directions[from_node_type]) || !(edge_directions[from_node_type][to_node_type])){
                    hotgenNotify.show_error("The resources cannot be connected.");
                    return false;
                } else{
                    var limit = edge_directions[from_node_type][to_node_type].limit;
                    var occupied = edge_directions[from_node_type][to_node_type].occupied;
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
                    if (occupied === true){
                        var to_connected = $scope.network.getConnectedNodes(data.to);
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
})(window.angular);
