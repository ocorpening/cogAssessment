'use strict';

//Setting up route
angular.module('charcounts').config(['$stateProvider',
	function($stateProvider) {
		// Charcounts state routing
		$stateProvider.
		state('listCharcounts', {
			url: '/charcounts',
			templateUrl: 'modules/charcounts/views/list-charcounts.client.view.html'
		}).
		state('createCharcount', {
			url: '/charcounts/create',
			templateUrl: 'modules/charcounts/views/create-charcount.client.view.html'
		}).
		state('viewCharcount', {
			url: '/charcounts/:charcountId',
			templateUrl: 'modules/charcounts/views/view-charcount.client.view.html'
		}).
		state('editCharcount', {
			url: '/charcounts/:charcountId/edit',
			templateUrl: 'modules/charcounts/views/edit-charcount.client.view.html'
		});
	}
]);