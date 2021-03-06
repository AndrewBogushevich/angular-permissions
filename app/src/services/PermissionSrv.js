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