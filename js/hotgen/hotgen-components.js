(function(angular) {
  'use strict';
    function osNovaServerController($scope, $rootScope) {
        var s_key = $rootScope.selected.id+"_save";
        $scope.boot_sources = [
            {'id': 'image', 'name': 'image'},
            {'id': 'image_snapshot', 'name': 'image snapshot'},
            {'id': 'volume', 'name': 'volume'},
            {'id': 'volume_snapshot', 'name': 'volume snapshot'}
        ];
        $scope.availability_zones = $rootScope.availability_zones;
        $scope.flavors = $rootScope.flavors;
        $scope.security_groups = $rootScope.security_groups;
        $scope.images = $rootScope.images;
        $scope.image_snapshots = $rootScope.image_snapshots;
        $scope.volumes = $rootScope.volumes;
        $scope.volume_snapshots = $rootScope.volume_snapshots;
    }

    angular_module.component('osNovaServer', {
      templateUrl: 'templates/os__nova__server_modal.html',
      controller: osNovaServerController,
      bindings:{
        "instance": "=",
        "formReference": "<",
      }
    });
})(window.angular);
