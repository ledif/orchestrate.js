// Copyright 2014 Orchestrate, Inc.

/**
 * @fileoverview Aggregate builder.
 */

// Module Dependencies.
var assert = require('assert')
var Builder = require('./builder')

/**
 * @constructor
 */
function AggregateBuilder() {}
require('util').inherits(AggregateBuilder, Builder)

AggregateBuilder.prototype.stats = function(field) {
  assert(field, 'field required')
  var _stat = field + ':stats'
  if (this._aggregates) this._aggregates = [this._stats, _stat].join(',')
  else this._aggregates = _stat
  return this
}

AggregateBuilder.prototype.range = function(rangeBuilder) {
  assert(rangeBuilder, 'range builder required')
  var _range = rangeBuilder.build()
  if (this._aggregates) this._aggregates = [this._aggregates, _range].join(',')
  else this._aggregates = _range
  return this
}

// TODO should we really re-use the RangeBuilder here?
AggregateBuilder.prototype.distance = function(rangeBuilder) {
  assert(rangeBuilder, 'range builder required')
  var _distance = rangeBuilder.build().replace(':range:', ':distance:')
  if (this._aggregates) this._aggregates = [this._aggregates, _distance].join(',')
  else this._aggregates = _distance
  return this
}

AggregateBuilder.prototype.time_series = function(field, time_interval) {
  assert(field, 'field required')
  assert(time_interval, 'time invterval required')
  var _time_series = field + ':time_series:' + time_interval
  if (this._aggregates) this._aggregates = [this._aggregates, _time_series].join(',')
  else this._aggregates = _time_series
  return this
}

AggregateBuilder.prototype.build = function() {
  return this._aggregates
}


// Module Exports.
module.exports = AggregateBuilder
