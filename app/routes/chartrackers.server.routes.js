'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var chartrackers = require('../../app/controllers/chartrackers');

	// Chartrackers Routes
	app.route('/chartrackers')
		.get(chartrackers.list)
		.post(users.requiresLogin, chartrackers.create);

	app.route('/chartrackers/:chartrackerId')
		.get(chartrackers.read)
		.put(chartrackers.update)
		.delete(chartrackers.delete);

	// Finish by binding the Chartracker middleware
//	app.param('chartrackerId', chartrackers.chartrackerByID);
};