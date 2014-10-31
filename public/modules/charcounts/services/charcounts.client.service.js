'use strict';

//Charcounts service used to communicate Charcounts REST endpoints
angular.module('charcounts').factory('Charcounts', ['$resource',
	function($resource) {
		return $resource('charcounts/:charcountId', { charcountId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);