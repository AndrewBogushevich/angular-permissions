angular.module('angular-permissions')
.service('PermissionSrv', [function(){
	var WRITE	= 3;
	var READ	= 2;
	var DENIED	= 1;

	var ROLE_CLINICIAN 		= 'clinician';
	var ROLE_SUPERVISOR 	= 'supervisor';
	var ROLE_ALL			= 'all';

	var STATUS_NEW 					= 'New';
	var STATUS_AWATING_EALUATION 	= 'Awaiting Evaluation';
	var STATUS_EVALUATED 			= 'Evaluated';
	var STATUS_COMPLITED 			= 'Completed';
	var STATUS_REVIEWED				= 'Reviewed';
	var STATUS_ALL					= 'All';

	var srv = 
	{
		model: {
			[ROLE_ALL]: {
				[STATUS_ALL]: READ
			},
			[ROLE_CLINICIAN]: {
				[STATUS_ALL]:	WRITE
			},

			valObj: {
				[ROLE_ALL]: {
					[STATUS_ALL]: WRITE
				},

				objVal2: {
					[ROLE_ALL]:{
						[STATUS_ALL]: function (obj, params) {
							if (obj) {
								return WRITE;
							}
						}
					}
				}
			}
		}
	};

	function isFunction(x) {
		return Object.prototype.toString.call(x) == '[object Function]';
	}

	srv.checkPermission = function(field, jsObj, settings){
		
		var curJsObj = jsObj;

		settings = settings || {};
		var role = settings.role || srv.role;
		var status = settings.status || srv.status;
		var mode = settings.mode || srv.mode;

		var fieldsQuery = field.split('.');
		var obj = srv[mode] || srv;

		var result;
		fieldsQuery.some(function(fieldStr){//iterate array

			obj = obj[fieldStr];
			if(!obj){
				return true;//break loop
			}

			curJsObj = curJsObj ? curJsObj[fieldStr] : curJsObj;

			result = getLvlFromObj(obj, curJsObj, settings) || result;
		});

		function getLvlFromObj(p_obj, p_objJs){
			var result = p_obj[role] && ( p_obj[role][status] || p_obj[role][STATUS_ALL])
				|| p_obj[ROLE_ALL] && ( p_obj[ROLE_ALL][status] || p_obj[ROLE_ALL][STATUS_ALL]);

			if(isFunction(result)){
				result = result(p_objJs, settings);
			}

			return result;
		}

		return result || DENIED;

	}

	srv.role = undefined;
	srv.mode = undefined;
	srv.status = undefined;

	srv.init = function (callback) {
		callback(srv.role, srv.mode, srv.status);
	};

	srv.initOnChange = function(){
		srv.onChangeCallbacks = [];
	};

	srv.initOnChange();

	srv.onChange = function(func){
		srv.onChangeCallbacks.push(func);
	};

	srv.can = {
		read: READ,
		write: WRITE,
		denied: DENIED
	};

	return srv;
}])