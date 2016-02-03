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

			PermissionSrv.onChange(function(){
				$scope.accessLvl = PermissionSrv.checkPermission(
					$scope.permissions,
					{	[firstObjStr]: $scope.$parent.$eval(firstObjStr)	}, //pass jsObj entity
					$scope.settings
				);
			});

			$scope.accessLvl = PermissionSrv.checkPermission(
				$scope.permissions,
				{	[firstObjStr]: $scope.$parent.$eval(firstObjStr)	}, //pass jsObj entity
				$scope.settings
			);

			$scope.can = PermissionSrv.can;
		}
	};

	return DDO;
}]);
