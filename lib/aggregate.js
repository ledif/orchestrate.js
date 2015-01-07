// Copyright 2014 Orchestrate, Inc.

/**
 * @fileoverview Aggregate builder.
 */

// Module Dependencies.
var assert = require('assert');
var Builder = require('./builder');

/**
 * @constructor
 */
function AggregateBuilder() {
  this._aggregates = [];
}
require('util').inherits(AggregateBuilder, Builder);

AggregateBuilder.prototype.stats = function(field) {
  assert(field, 'field required');
  this._aggregates.push(field + ':stats');
  return this;
};

AggregateBuilder.prototype.range = function(rangeBuilder) {
  assert(rangeBuilder, 'range builder required');
  var range = rangeBuilder.build();
  this._aggregates.push(range);
  return this;
};

// TODO should we really re-use the RangeBuilder here?
AggregateBuilder.prototype.distance = function(rangeBuilder) {
  assert(rangeBuilder, 'range builder required');
  var distance = rangeBuilder.build().replace(':range:', ':distance:');
  this._aggregates.push(distance);
  return this;
};

AggregateBuilder.prototype.time_series = function(field, time_interval) {
  assert(field, 'field required');
  assert(time_interval, 'time interval required');
  var time_series = field + ':time_series:' + time_interval;
  this._aggregates.push(time_series);
  return this;
};

AggregateBuilder.prototype.build = function() {
  return this._aggregates.join(",");
};


// Module Exports.
module.exports = AggregateBuilder;
