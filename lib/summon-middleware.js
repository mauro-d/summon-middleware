/*******************************************************************************
 * Copyright (c) 2016 Mauro Doganieri - Nicola Del Gobbo
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the license at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY
 * IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing
 * permissions and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Mauro Doganieri <mauro.doganieri@gmail.com>
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 ******************************************************************************/

'use strict'

/*!
 * Module dependencies
 */
var SummonMiddlewareError = require('./error/SummonMiddlewareError')

/**
 *
 * @param {(Function|Function[])} middleware A function or an array of functions
 * representing the express or connect middleware/middlewares to handle
 * dynamically.
 * @param {Function} predicate A function that returns a boolean value. This
 * function represents the condition for which the middleware has to be used
 * or not.
 * @returns {(Function|Function[])} A function or an array of functions
 * representing the express or connect middleware/middlewares.
 * @version 1.0.0
 * @author Nicola Del Gobbo - Mauro Doganieri
 */
module.exports = function summonMiddleware(middleware, predicate) {
    if (!middleware) {
        throw new SummonMiddlewareError('The middleware parameter must be set.')
    }
    if (!(predicate && typeof predicate === 'function')) {
        throw new SummonMiddlewareError('The predicate parameter must be a' +
            ' function');
    }
    var predicateResult = predicate.call(this);
    if (!isBoolean(predicateResult)) {
        throw new SummonMiddlewareError('The predicate parameter must be a' +
            'function that returns a boolean value.')
    }
    if (typeof middleware === 'function') {
        return wrap(middleware, predicateResult)
    } else if (Array.isArray(middleware)) {
        if (middleware.length === 0) {
            throw new SummonMiddlewareError('The middleware parameter must be' +
                ' a function or an array of functions.' +
                ' More info at: http://expressjs.com')
        }
        var wrappedMiddlewares = []
        middleware.forEach(m => {
            if (!(m && typeof m === 'function')) {
                throw new SummonMiddlewareError('The middleware parameter' +
                    ' must contain only functions.')
            }
            wrappedMiddlewares.push(wrap(m, predicateResult))
        })
        return wrappedMiddlewares
    } else {
        throw new SummonMiddlewareError('The middleware parameter must be a' +
            ' function or an array of functions.' +
            ' More info at: http://expressjs.com')
    }
}

function wrap(middleware, predicateResult) {
    return function (req, res, next) {
        next = next || noop
        if (predicateResult) {
            return middleware(req, res, next)
        }
        next()
    }
}

function isBoolean(value) {
    return value === true ||
        value === false ||
        Object.prototype.toString.call(value) === '[object Boolean]'
}

function noop() { }