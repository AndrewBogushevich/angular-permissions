angular.module('angular-permissions', []);
angular.module("angular-permissions").run(["$templateCache", function($templateCache) {$templateCache.put("directives/accessField.html","<div ng-transclude=\"toRead\" ng-if=\"getAccessLvl() === can.read\"></div><div ng-transclude=\"toWrite\" ng-if=\"getAccessLvl() === can.write\"></div>");}]);
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

			$scope.can = PermissionSrv.can;	

			$scope.getAccessLvl = function getAccessLvl () {
				return PermissionSrv.checkPermission(
					$scope.permissions,
					$scope.settings
				);
			}
		}
	};

	return DDO;
}]);

angular.module('angular-permissions')
.service('PermissionSrv', ['permissionConfig', function(permissionConfig){
	var WRITE	= 'W';
	var READ	= 'R';
	var DENIED	= 'D';

	var ROLE_ALL			= 'role_all';

	var STATUS_ALL					= 'status_all';

	permissionConfig = permissionConfig || {};

	var srv = {};

	srv.permissionsTree = permissionConfig.permissionsTree || {};

	function isFunction(x) {
		return Object.prototype.toString.call(x) == '[object Function]';
	}
	
	srv.checkPermission = function(field, settings, jsObj){
		
		settings = angular.extend(permissionConfig, settings);

		var role = settings.role;
		var status = settings.status;
		var mode = settings.mode;

		var curJsObj = jsObj;

		var fieldsQuery = field.split('.');
		var curTreeElem = angular.copy(srv.permissionsTree);

		var result;
		fieldsQuery.some(function(fieldStr){//iterate array

			curTreeElem = curTreeElem[fieldStr];
			if(!curTreeElem){
				return true;//break loop
			}

			curJsObj = curJsObj ? curJsObj[fieldStr] : curJsObj;

			var lvl = getLvlFromObj(curTreeElem, curJsObj);

			if (angular.isDefined(lvl) && lvl !== 'inherit') {
				result = lvl;
			}

		});

		function getLvlFromObj(treeObj, p_objJs){
			var result = treeObj[role] && ( treeObj[role][status] || treeObj[role][STATUS_ALL])
				|| treeObj[ROLE_ALL] && ( treeObj[ROLE_ALL][status] || treeObj[ROLE_ALL][STATUS_ALL]);

			if( isFunction(result) ){
				result = result(p_objJs, settings);
			}

			return result;
		}

		return result || DENIED;

	}

	srv.can = {
		read: READ,
		write: WRITE,
		denied: DENIED
	};

	return srv;
}])
angular.module('angular-permissions')
	.constant('permissionConfig', 
	{
		role: 'clinician'
	})


