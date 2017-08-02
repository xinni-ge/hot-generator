(function(angular) {
    'use strict';
    angular_module.controller('DropdownCtrl', function($scope){
            ;
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
    angular_module.directive('droppable', function($rootScope, hotgenUUID){
        return {
            link: function (scope, element){
                var el = element[0];
                el.addEventListener('dragover', function(e){
                    if (e.preventDefault){
                        e.preventDefault();
                    }
                },true);
                el.addEventListener('drop', function(e){
                    var dropped_elem_id = e.dataTransfer.getData("text");
                    var dropped_elem_base = document.getElementById(dropped_elem_id);
                    var resource_type = dropped_elem_id;
                    var dragged_resource = $rootScope.resource_types[resource_type];
                    var id = hotgenUUID.uuid()
                    $rootScope.nodes.add({
                        id: id,
                        label: id,
                        shape: 'icon',
                        icon: {
                            face: 'FontAwesome',
                            code: dragged_resource.code,
                            size: 50,
                            color: dragged_resource.color,
                        }
                    });
                    e.preventDefault();
                },false);
            }
        }
    });
})(window.angular);