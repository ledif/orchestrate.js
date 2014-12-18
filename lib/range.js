// Copyright 2014 Orchestrate, Inc.

// Module Dependencies.
var assert = require('assert');
var Builder = require('./builder');

/**
 * @constructor
 */
function RangeBuilder () {
  this._belowStr = "";
  this._betweenStr = "";
  this._aboveStr = "";
}

require('util').inherits(RangeBuilder, Builder);

RangeBuilder.prototype.below = function(x) {
  this._belowStr = "*~" + x + ":";
  return this;
}
RangeBuilder.prototype.above = function(x) {
  this._aboveStr = "" + x + "~*";
  return this;
}
RangeBuilder.prototype.between = function(x, y) {
  this._betweenStr += "" + x + "~" + y + ":";
  return this;
}

RangeBuilder.prototype.getOptions = function() {
  return "range:" + this._belowStr + this._betweenStr + this._aboveStr;
}

// Module Exports.
module.exports = RangeBuilder;
