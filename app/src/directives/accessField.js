angular.module('angular-permissions')
.directive('accessField', [function(){

	var DDO = {
		// restrict: 'EA',
		templateUrl: 'directives/accessField.html',
		transclude: {
			'toRead': '?toRead',
			'toWrite': '?toWrite'
		},
		scope: {
			permissions: '=',
			settings: '='
		},
		controller: function ($scope, PermissionSrv) {
			var firstObjStr = $scope.permissions.split('.')[0];

			var getAccessLvl = function getAccessLvl () {
				return PermissionSrv.checkPermission(
					$scope.permissions,
					$scope.settings
				);
			};
			
			$scope.can = PermissionSrv.can;	
			$scope.$watch(function(scope){
				scope.accessLvl = getAccessLvl();
			});
			
		}
	};

	return DDO;
}]);
