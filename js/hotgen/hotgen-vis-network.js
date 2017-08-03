(function(angular) {
    'use strict';
    angular_module.controller('VisCtrl', ['$scope', '$rootScope', 'hotgenNotify', 'canvasStatus',
        function($scope, $rootScope, hotgenNotify, canvasStatus) {

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

                        callback(data);
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
            $scope.selectNode = function(param){
                canvasStatus.call_edit_resource();
                hotgenNotify.show_success(param);
            }

            $scope.selectEdge = function(param){
                canvasStatus.call_edit_resource();
                hotgenNotify.show_success(param);
            }
            $scope.events = {
                selectNode: $scope.selectNode,
                selectEdge: $scope.selectEdge,
            };

        }
    ]);
})(window.angular);
