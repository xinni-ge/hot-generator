(function(angular) {
    'use strict';
    angular_module.controller('VisCtrl', ['$scope', '$rootScope', 'hotgenNotify', 'hotgenMessage', 'hotgenGlobals',
        function($scope, $rootScope, hotgenNotify, hotgenMessage, hotgenGlobals) {
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
                            $rootScope.is_saved[data.id] = false;
                        }
                    },
                    addNode: false,
                    editEdge: false,
                    deleteNode: function(data, callback){
                        delete $rootScope.is_saved[data.id]
                    },
                    deleteEdge: function(data, callback){
                        var edge_id = data.edges[0];
                        delete $rootScope.is_saved[edge_id]
                        var from_id = $rootScope.edges.get(edge_id).from
                        $rootScope.is_saved[from_id] = false
                        $rootScope.nodes.update({
                            id: from_id,
                            font: {color: '#343434'}
                        })
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
})(window.angular);
