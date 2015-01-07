// Copyright 2014 Orchestrate, Inc.

/**
 * @fileoverview Range builder.
 */

// Module Dependencies.
var assert = require('assert')
var Builder = require('./builder')

/**
 * @constructor
 */
function RangeBuilder(field) {
  assert(field, 'field required')
  this._field = field
}
require('util').inherits(RangeBuilder, Builder)

RangeBuilder.prototype.min = function(min) {
  assert(min !== undefined, 'min required');
  this._min = min
  return this
}

RangeBuilder.prototype.max = function(max) {
  assert(max !== undefined, 'max required');
  this._max = max
  return this
}

RangeBuilder.prototype.between = function(min, max) {
  assert(min !== undefined, 'min required');
  assert(max !== undefined, 'max required');
  this._min = min
  this._max = max
  return this
}

RangeBuilder.prototype.build = function() {
  if (this._min === undefined) {
    this._min = '*';
  }

  if (this._max === undefined) {
    this._max = '*';
  }

  return this._min + '~' + this._max;
};

module.exports = RangeBuilder
