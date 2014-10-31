'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Charcount Schema
 */
var CharcountSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Charcount name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Charcount', CharcountSchema);