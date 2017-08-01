(function(angular) {
    'use strict';
    angular_module.controller('VisCtrl', ['$scope', 'VisDataSet',
        function($scope, VisDataSet) {
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
//                    addEdge: eclAddEdge,
                    addNode: false,
                    editEdge: false
                },
                // locale: 'en', /* default */
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
                        editEdge: '接続を編集', // hided
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
            $scope.nodes = new VisDataSet();
            $scope.edges = new VisDataSet();
            $scope.nodes.add([
                {id: 1, label: 'Node 1'},
                {id: 2, label: 'Node 2'},
                {id: 3, label: 'Node 3'},
                {id: 4, label: 'Node 4'},
                {id: 5, label: 'Node 5'}
            ]);
            $scope.edges.add([
                {id: 1, from: 1, to: 2},
                {id: 2, from: 3, to: 2}
            ]);
            $scope.data = {
                nodes: $scope.nodes,
                edges: $scope.edges
            };
        }
    ]);
})(window.angular);