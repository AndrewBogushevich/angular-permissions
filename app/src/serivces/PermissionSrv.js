angular.module('angular-permissions')
.service('PermissionSrv', ['permissionConfig', function(permissionConfig){
	var WRITE	= 3;
	var READ	= 2;
	var DENIED	= 1;

	var srv = {};

	srv.permissionsTree =
	{
		model: {
			access: READ,

			valObj: {
				access: WRITE,

				objval2: {
					access: function (settings) {
						if (settings.value == 5) {
							return READ;
						}
						else if (settings.value == 10){
							return DENIED;
						}
						else {
							return WRITE;
						}
						
					}
				}
			}
		}
	};

	function isFunction(x) {
		return Object.prototype.toString.call(x) == '[object Function]';
	}

	permissionConfig = permissionConfig || {};
	
	srv.checkPermission = function(field, settings){
		
		settings = angular.extend(permissionConfig, settings);

		var fieldsQuery = field.split('.');
		var curTreeElem = angular.copy(srv.permissionsTree);

		var result;
		fieldsQuery.some(function(fieldStr){//iterate array

			curTreeElem = curTreeElem[fieldStr];
			if(!curTreeElem){
				return true;//break loop
			}

			result = getLvlFromObj(curTreeElem, settings) || result;
		});

		function getLvlFromObj(p_obj){
			var result = p_obj.access;

			if(isFunction(result)){
				result = result(settings);
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