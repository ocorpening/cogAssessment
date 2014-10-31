'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Charcount = mongoose.model('Charcount'),
	_ = require('lodash');

/**
 * Create a Charcount
 */
exports.create = function(req, res) {
	var charcount = new Charcount(req.body);
	charcount.user = req.user;

	charcount.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(charcount);
		}
	});
};

/**
 * Show the current Charcount
 */
exports.read = function(req, res) {
	res.jsonp(req.charcount);
};

/**
 * Update a Charcount
 */
exports.update = function(req, res) {
	var charcount = req.charcount ;

	charcount = _.extend(charcount , req.body);

	charcount.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(charcount);
		}
	});
};

/**
 * Delete an Charcount
 */
exports.delete = function(req, res) {
	var charcount = req.charcount ;

	charcount.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(charcount);
		}
	});
};

/**
 * List of Charcounts
 */
exports.list = function(req, res) { Charcount.find().sort('-created').populate('user', 'displayName').exec(function(err, charcounts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(charcounts);
		}
	});
};

/**
 * Charcount middleware
 */
exports.charcountByID = function(req, res, next, id) { Charcount.findById(id).populate('user', 'displayName').exec(function(err, charcount) {
		if (err) return next(err);
		if (! charcount) return next(new Error('Failed to load Charcount ' + id));
		req.charcount = charcount ;
		next();
	});
};

/**
 * Charcount authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.charcount.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};