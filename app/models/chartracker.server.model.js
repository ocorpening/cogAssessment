'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ChartrackerSchema = new Schema({
    letter:
    {
        type: String,
        unique : true,
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