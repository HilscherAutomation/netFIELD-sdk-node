/**********************************************************************
 * Copyright (c) 2019 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/
'use strict';

var querystring = require('querystring');
var client = require('../../client');
var validate = require('../../utils/validate');
var checkers = require('../../utils/checkers');


/**
 * Get devices by organisation id
 * @param {number} organisationId
 * @param {number} page
 * @param {number} limit
 * @param {string} sortBy
 * @param {string} sortOrder asc, desc
 * @param {function} callback optional
 */
module.exports = function (organisationId, page, limit, sortBy, sortOrder, deviceType, callback) {
    if (checkers.isFunction(page)) {
        callback = page;
        page = null;
    }
    if (checkers.isFunction(limit)) {
        callback = limit;
        limit = null;
    }
    if (checkers.isFunction(sortBy)) {
        callback = sortBy;
        sortBy = null;
    }
    if (checkers.isFunction(sortOrder)) {
        callback = sortOrder;
        sortOrder = null;
    }
    if (checkers.isFunction(deviceType)) {
        callback = deviceType;
        deviceType = null;
    }
    try {
        const query = {};
        if (page !== undefined && page !== null) {
            query.page = page;
            validate.validateNumber(page);
        }
        if (limit !== undefined && limit !== null) {
            query.limit = limit;
            validate.validateNumber(limit);
        }
        if (sortBy) {
            query.sortBy = sortBy;
            validate.validateString(sortBy);
        }
        if (sortOrder) {
            query.sortOrder = sortOrder;
            validate.validateString(sortOrder);
        }
        if (deviceType) {
            query.deviceType = deviceType;
            validate.validateString(deviceType)
        }
        validate.validateNumber(organisationId);
        query.organisationId = organisationId;
        var path = '/devices?' + querystring.stringify(query);
        return client.get('auth', path, callback);
    } catch (e) {
        if (callback) {
            return callback(e, null);
        }
        return Promise.reject(e);
    }
}