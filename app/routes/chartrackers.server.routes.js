'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var chartrackers = require('../../app/controllers/chartrackers');

	// Chartrackers Routes
	app.route('/chartrackers')
		.get(chartrackers.list);

	app.route('/chartrackers/:chartrackerId')
		.get(chartrackers.read)
		.put(chartrackers.update);

};