'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Chartracker = mongoose.model('Chartracker'),
    _ = require('lodash');

/**
 * Create a Chartracker
 */
exports.create = function (req, res, next)
{
    // Express doesn't handle text/plain unfortunately. The data is not there at this point, so have to wait for it:
    if (req.is('text/*'))
    {
        req.text = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk)
        {
            req.text += chunk
        });
        var request = req;
        var response = res;
        req.on('end', function()
        {
            if (request === undefined) next()
//            var chartracker = new Chartracker(request.text);
            var chartracker = new Chartracker();
            var payload =
            chartracker.input = request.input;

            chartracker.save(function (err)
            {
                if (err)
                {
                    return response.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                else
                {
                    response.jsonp(chartracker);
                }
            });
        });
    }
    else
    {
        next();
    }
};

/**
 * Show the current Chartracker
 */
exports.read = function (req, res)
{
    res.jsonp(req.chartracker);
};

/**
 * Update the Chartracker's for the characters in the user's input
 */
exports.update = function (req, res)
{
    console.log('In charTrackers.update');
    var textEntered = req.body;
    var textEnteredArray = [].map.call(textEntered.input, function (item)
    {
        return item;
    });
    var sortedUniqText = _.uniq(textEnteredArray);

    var chartracker = req.chartracker;

    chartracker = _.extend(chartracker, req.body);

    chartracker.save(function (err)
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

/**
 * Chartracker middleware
 */
exports.chartrackerByID = function (req, res, next, id)
{
    console.log('in charTrackers.update, id = ' + id);
    next();
};

/**
 * Chartracker authorization middleware
 */
exports.hasAuthorization = function (req, res, next)
{
    if (req.chartracker.user.id !== req.user.id)
    {
        return res.status(403).send('User is not authorized');
    }
    next();
};