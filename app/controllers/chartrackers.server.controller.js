'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Chartracker = mongoose.model('Chartracker'),
    _ = require('lodash');

/**
 * Show the current Chartracker
 */
exports.read = function (req, res)
{
    res.jsonp(req.chartracker);
};

/**
 * Update the Chartracker's for the characters in the user's input: req.body is the text they entered.
 */
exports.update = function (req, res)
{
    var textEntered = req.body.input.toUpperCase();
    var textEnteredArray = [].map.call(textEntered, function (item)
    {
        return item;
    });
    var sortedUniqText = _.uniq(textEnteredArray);
    sortedUniqText.every(function(letter)
    {
        var text = textEntered;
        Chartracker.findOne({letter: letter}, function(err, charTracker)
        {
            // get count for this character in the original string
            var regexp = new RegExp(letter, "g");
            var count = (text.match(regexp)||[]).length + charTracker.count;
            charTracker.count = count;
            charTracker.save(function (err)
            {
                if (err)
                {
                    console.log("Error saving: " + err);
                }
                // saved!
            });
        });
        return true;
    });
};

/**
 * Delete an Chartracker
 */
exports.delete = function (req, res)
{
    var chartracker = req.chartracker;

    chartracker.remove(function (err)
    {
        if (err)
        {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.jsonp(chartracker);
        }
    });
};

/**
 * List of Chartrackers
 */
exports.list = function (req, res)
{
    Chartracker.find().sort('-created').populate('user', 'displayName').exec(function (err, chartrackers)
    {
        if (err)
        {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.jsonp(chartrackers);
        }
    });
};