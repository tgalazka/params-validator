/*
 * The MIT License (MIT)
 * Copyright (c) 2015 Thomas Galazka
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN TH
 * SOFTWARE.
 */

/**
 * Dependencies
 */

var _ = require('underscore');

/**
 * Params Validator
 */

var Validator = module.exports = {};

var Messages = {};
Messages.errors = {
  noCallback: 'No callback function supplied!',
  noParams: 'Supplied params is not an object!',
  missingReq: function(req) {
    req = _.chain([req]).flatten().compact().value().join(', ');
    return 'Missing required parameters: #req'
      .replace('#req', req);
  }
};


Validator.present = present(true);
Validator.required = present(false);

function present(falsyAllowed) {
  return function(required, params, callback) {
    if(_.isFunction(required)) {
      callback = required;
      required = [];
      params = {};
    }

    if(_.isFunction(params)) {
      callback = params;
      params = {};
    }

    if(!_.isFunction(callback))
      throw new Error(Messages.errors.noCallback);

    if(!_.isObject(params))
      return callback(new Error(Messages.errors.noParams));

    if(!_.isArray(required)) {
      required = _.isObject(required) ? null : required;
      required = _.compact([required]);
    }

    var missing = _.chain(required)
      .map(function(key) {
        if(!params.hasOwnProperty(key))
          return key;

        return (falsyAllowed == false && !params[key])
          ? key : null;
      })
      .compact()
      .value();

    var err = null;
    if(missing && missing.length)
      err = new Error(Messages.errors.missingReq(missing));

    return callback(err, params, required);
  };
};
