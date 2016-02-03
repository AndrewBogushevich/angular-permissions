angular.module('angular-permissions')
.directive('accessField', [function(){

	var DDO = {
		// restrict: 'EA',
		templateUrl: 'directives/accessField.html',
		transclude: {
			'toRead': 'toRead',
			'toWrite': 'toWrite'
		},
		scope: {
			permissions: '=',
			settings: '='
		},
		controller: function ($scope, PermissionSrv) {
			var accessSco = $scope;

			var firstObjStr = $scope.permissions.split('.')[0];

			setPermissions()

			$scope.can = PermissionSrv.can;

			$scope.$watch('settings', function(newVal, oldVal) {
				setPermissions();
			})

			function setPermissions () {
				$scope.accessLvl = PermissionSrv.checkPermission(
					$scope.permissions,
					$scope.settings
				);
			}
		}
	};

	return DDO;
}]);
