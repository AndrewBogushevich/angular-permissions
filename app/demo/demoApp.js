(function (window, angular) {

    angular.module('demoApp', ['angular-permissions'])
        .controller('DemoCtrl',
        ['$scope', 'permissionConfig', DemoCtrl]);

    function DemoCtrl($scope, permissionConfig) {
        var demo = this;

        permissionConfig.permissionsTree = 
        {
            model: {
                role_all: {
                    status_all: 'R'
                },
                valObj: {
                    role_all: {
                        status_all: 'R'
                    },

                    objval2: {
                        role_all: {
                            status_all: function (jsObj, settings) {
                                setting = settings || {};
                                
                                if (settings.value == 5) {
                                    return 'R';
                                }
                                else if (settings.value == 10){
                                    return 'D';
                                }
                                else {
                                    return 'W';
                                }
                                
                            }
                        }
                    }
                }
            }
        };

        demo.model = {
            val1: 11,
            val2: 22,
            valObj: {
                objval1: 'obj1',
                objval2: 'obj2'
            }
        };

        demo.validate = function () {

        }

    }

}(window, angular));