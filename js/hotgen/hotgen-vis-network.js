(function(angular) {
    'use strict';
    angular_module.controller('VisCtrl',function(VisDataSet, hotgenNotify){
        var nodes= new vis.DataSet([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
        ]);
    });
})(window.angular);