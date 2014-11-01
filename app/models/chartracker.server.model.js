'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Chartracker Schema
 */
//var ChartrackerSchema = new Schema({
//	name: {
//		type: String,
//		default: '',
//		required: 'Please fill Chartracker name',
//		trim: true
//	},
//	created: {
//		type: Date,
//		default: Date.now
//	},
//	user: {
//		type: Schema.ObjectId,
//		ref: 'User'
//	}
//});

var ChartrackerSchema = new Schema({
    input:
    {
        type: String,
        default: '',
        required: 'Name of character',
        trim: true
    },
    count:
    {
        type: Number,
        required: 'need a count here'
    }
});

mongoose.model('Chartracker', ChartrackerSchema);