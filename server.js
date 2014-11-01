'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('\x1b[31m', 'Could not connect to MongoDB!');
		console.log(err);
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// seed database - we know there will be 26 charTrackers, and they will all be initialized to a count of zero
// with id=charcode so A is id=65. The string will be uppercased so only capital letters A-Z are counted.
var char;
var charCode;
var Chartracker = mongoose.model('Chartracker');
// Clean out existing entries if any
Chartracker.remove().exec();
for(charCode='A'.charCodeAt(0);charCode<='Z'.charCodeAt(0); charCode++)
{
    var character = String.fromCharCode(charCode);
    var charTracker = new Chartracker();
    charTracker.letter = character;
    charTracker.count = 0;
    charTracker.save(function (err)
    {
        if (err)
        {
            console.log("Error seeding database: " + err);
        }
    });
}

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);