(function (window, angular) {

    angular.module('demoApp', ['angular-permissions'])
        .controller('DemoCtrl',
        ['$scope', DemoCtrl]);

    function DemoCtrl($scope) {
        var demo = this;

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