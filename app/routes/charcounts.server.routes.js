'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var charcounts = require('../../app/controllers/charcounts');

	// Charcounts Routes
	app.route('/charcounts')
		.get(charcounts.list)
		.post(users.requiresLogin, charcounts.create);

	app.route('/charcounts/:charcountId')
		.get(charcounts.read)
		.put(users.requiresLogin, charcounts.hasAuthorization, charcounts.update)
		.delete(users.requiresLogin, charcounts.hasAuthorization, charcounts.delete);

	// Finish by binding the Charcount middleware
	app.param('charcountId', charcounts.charcountByID);
};