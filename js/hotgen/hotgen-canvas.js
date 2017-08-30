(function(angular) {
    'use strict';
    angular_module.controller('IconCtrl', function($scope, $rootScope, hotgenGlobals){
        $scope.resource_types = hotgenGlobals.get_resource_icons();
        $scope.admin = $rootScope.auth.admin;
        $scope.resource_admin = hotgenGlobals.get_node_admin();

    });

    angular_module.directive('draggable', function(){
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
    });
    angular_module.directive('droppable', function($rootScope, hotgenGlobals, hotgenUUID){
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
    });

})(window.angular);