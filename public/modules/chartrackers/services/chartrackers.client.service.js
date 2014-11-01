'use strict';

//Chartrackers service used to communicate Chartrackers REST endpoints
angular.module('chartrackers').factory('Chartrackers', ['$resource',
	function($resource) {
		return $resource('chartrackers/:chartrackerId', { chartrackerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);