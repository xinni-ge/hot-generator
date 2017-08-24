(function(angular) {
    'use strict';

    // OS::Neutron::SecurityGroup

    angular_module.value('osNeutronSecurityGroupSettings',
        {
            resource_key: "OS__Neutron__SecurityGroup",
            icon: {
                class: 'fa-shield ',
                name: 'OS::Neutron::SecurityGroup',
                code: '\uf132',
                color: '#40a5f2'
            },
            modal_component: '<os-neutron-security-group securitygroup="resource" form-reference="resourceForm"></os-neutron-security-group>',
            edge_settings: null,
            necessary_properties: null
        }
    );

    angular_module.run(function(osNeutronSecurityGroupSettings, hotgenGlobals){
        hotgenGlobals.update_resource_icons(
            osNeutronSecurityGroupSettings.resource_key,
            osNeutronSecurityGroupSettings.icon);

        hotgenGlobals.update_resource_components(
            osNeutronSecurityGroupSettings.resource_key,
            osNeutronSecurityGroupSettings.modal_component);

        hotgenGlobals.update_edge_directions(
            osNeutronSecurityGroupSettings.resource_key,
            osNeutronSecurityGroupSettings.edge_settings);

    });

    function osNeutronSecurityGroupController($scope, $rootScope) {
        this.$onInit = function(){
            if (typeof this.securitygroup.rules === 'undefined'){
                this.securitygroup.rules = [{}];
            }

        }
        this.add_rule = function(){
            this.securitygroup.rules.push({})
        }
        this.delete_rule = function(index){
            this.securitygroup.rules.splice(index, 1)
        }
    }

    angular_module.component('osNeutronSecurityGroup', {
      templateUrl: '/js/resources/os__neutron__securitygroup/os__neutron__securitygroup.html',
      controller: osNeutronSecurityGroupController,
      bindings:{
        'securitygroup': '=',
        'formReference': '<',
      }
    });

})(window.angular);
