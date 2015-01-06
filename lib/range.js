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
  assert(min, 'min required')
  this._min = min
  return this
}

RangeBuilder.prototype.max = function(max) {
  assert(max, 'max required')
  this._max = max
  return this
}

RangeBuilder.prototype.between = function(min, max) {
  assert(min, 'min required')
  assert(max, 'max required')
  this._min = min
  this._max = max
  return this
}

RangeBuilder.prototype.build = function() {
  var query = (this._min) ? this._min : '*'
  query += '~'
  query += (this._max) ? this._max : '*'
  return query
}

module.exports = RangeBuilder
