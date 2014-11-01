'use strict';

//Setting up route
angular.module('chartrackers').config(['$stateProvider',
	function($stateProvider) {
		// Chartrackers state routing
		$stateProvider.
		state('listChartrackers', {
			url: '/chartrackers',
			templateUrl: 'modules/chartrackers/views/list-chartrackers.client.view.html'
		}).
		state('createChartracker', {
			url: '/chartrackers/create',
			templateUrl: 'modules/chartrackers/views/create-chartracker.client.view.html'
		}).
		state('viewChartracker', {
			url: '/chartrackers/:chartrackerId',
			templateUrl: 'modules/chartrackers/views/view-chartracker.client.view.html'
		}).
		state('editChartracker', {
			url: '/chartrackers/:chartrackerId/edit',
			templateUrl: 'modules/chartrackers/views/edit-chartracker.client.view.html'
		});
	}
]);