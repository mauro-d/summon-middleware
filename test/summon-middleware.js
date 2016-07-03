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

'use strict';

/*!
 * Module dependencies
 */
var express = require('express');
var request = require('supertest');
var responsePoweredBy = require('response-powered-by');
var summonMiddleware = require('../');

var POWERED_BY = "@NickNaso";
var DEFAULT_POWERED_BY = "Express";

describe("Test summon-middleware()", function () {

    it('Should use the responsePoweredBy middleware -- predicate is true', function (done) {
        var app = express()
            .use(summonMiddleware(responsePoweredBy(POWERED_BY), function () {
                return true;
            }))
            .get('/', function (req, res) {
                res.send('Summon Middleware');
            });
        request(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.get('X-Powered-By')).toEqual(POWERED_BY);
                    done();
                }
            })
    });

    it('Should not use the responsePoweredBy middleware -- predicate is false', function (done) {
        var app = express()
            .use(summonMiddleware(responsePoweredBy(POWERED_BY), function () {
                return false;
            }))
            .get('/', function (req, res) {
                res.send('Summon Middleware');
            });
        request(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.get('X-Powered-By')).toEqual(DEFAULT_POWERED_BY);
                    done();
                }
            })
    });
    
});