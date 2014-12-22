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
  if (this._stats) this._stats = [this._stats, _stat].join(',')
  else this._stats = _stat
  return this
}

AggregateBuilder.prototype.range = function(rangeBuilder) {
  assert(rangeBuilder, 'range builder required')
  var _range = rangeBuilder.toQString()
  if (this._ranges) this._ranges = [this._ranges, _range].join(',')
  else this._ranges = _range
  return this
}

// TODO should we really re-use the RangeBuilder here?
AggregateBuilder.prototype.distance = function(rangeBuilder) {
  assert(rangeBuilder, 'range builder required')
  var _distance = rangeBuilder.toQString().replace(':range:', ':distance:')
  if (this._distances) this._distances = [this._distances, _distance].join(',')
  else this._distances = _distance
  return this
}

AggregateBuilder.prototype.time_series = function(field, time_interval) {
  assert(field, 'field required')
  assert(time_interval, 'time invterval required')
  var _time_series = field + ':time_series:' + time_interval
  if (this._time_series) this._time_series = [this._time_series, _time_series].join(',')
  else this._time_series = _time_series
  return this
}

AggregateBuilder.prototype.toQString = function() {
  var _qstring = ''
  if (this._stats) _qstring = [_qstring, this._stats].join(',')
  if (this._ranges) _qstring = [_qstring, this._ranges].join(',')
  if (this._distances) _qstring = [_qstring, this._distances].join(',')
  if (this._time_series) _qstring = [_qstring, this._time_series].join(',')
  return _qstring
}


// Module Exports.
module.exports = AggregateBuilder
