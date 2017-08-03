(function(angular) {
    'use strict';
    angular_module.config(function ($translateProvider) {
        $translateProvider.translations('en', {
            TITLE: 'Generate Template',
            SUBTITLE: 'Please drag and drop resource icons into center canvas to define resource for template.',
            CREATE_TEMPLATE: 'Create Template',
            MANAGE_DRAFT: 'Manage Draft', // hided
            CLEAR_ALL: 'Clear All',
            OK: 'OK',
            CANCEL: 'Cancel',
        });
        $translateProvider.translations('ja', {
            TITLE: 'テンプレートの作成',
            SUBTITLE: 'リソース毎のアイコンを中央のキャンバスにドラッグ・ドロップすることで、テンプレートに追加するリソースを定義してください。',
            CREATE_TEMPLATE: 'テンプレートの作成',
            MANAGE_DRAFT: '下書きの管理', // hided
            CLEAR_ALL: 'キャンバスを初期化',
            OK: '作成',
            CANCEL: 'キャンセル',
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');
    });

    angular_module.run(function ($rootScope, $translate, VisDataSet) {
        $translate.use('en');
        $rootScope.nodes = new VisDataSet();
        $rootScope.edges = new VisDataSet();
        $rootScope.resource_types = {
            'OS__Nova__Server': {
                class: 'fa-desktop ',
                name: 'OS::Nova::Server',
                code: '\uf108',
                color: '#483dff'
            },
            'OS__Cinder__Volume': {
                class: 'fa-cube ',
                name: 'OS::Cinder::Volume',
                code: '\uf1b2',
                color: '#483dff'
            },
            'OS__Neutron__Net': {
                class: 'fa-cloud',
                name: 'OS::Neutron::Net',
                code: '\uf0c2',
                color: '#add8e6'
            },
            'OS__Neutron__Subnet': {
                class: 'fa-cloud ',
                name: 'OS::Cinder::Volume',
                code: '\uf0c2',
                color: '#add8e6'
            }
        };
    });
    angular_module.controller('DropdownCtrl', ['$scope',
        function($scope,){
           ;
    }]);

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