// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Search builder.
 */


// Module Dependencies.
var assert = require('assert')
var Builder = require('./builder')

/**
 * @constructor
 */
function SearchBuilder () {
  this._aggregates = [];
  this._sort = [];
}


require('util').inherits(SearchBuilder, Builder)


/**
 * Set collection.
 * @param {string} collection
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.collection = function (collection) {
  assert(collection, 'Collection required.')
  this._collection = collection
  return this
}


/**
 * Set limit.
 * @param {number} limit
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.limit = function (limit) {
  assert(limit, 'Limit required.')
  this._limit = limit
  return this
}


/**
 * Set offset.
 * @param {number} offset
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.offset = function (offset) {
  assert.equal(typeof offset, 'number', 'Offset required.')
  this._offset = offset
  return this
}


/**
 * Set sort.
 * @param {string} field
 * @param {string} order
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.sort = function (field, order) {
  assert(field, 'field required')
  assert(order, 'order required')
  this._sort.push('value.' + field + ':' + order);
  return this
}

SearchBuilder.prototype.aggregates = function(aggregateBuilder) {
  assert(aggregateBuilder, 'field required')
  var _aggregate = aggregateBuilder.build()
  this._aggregates.push(aggegate);
  return this
}

/**
 * Set query.
 * @param {string} query
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.query = function (query) {
  assert(query, 'Query required.')
  this._query = query
  return this._execute('get')
}


/**
 * Execute search.
 * @return {Object}
 * @protected
 */
SearchBuilder.prototype._execute = function (method) {
  assert(this._collection && this._query, 'Collection and query required.')
  var pathArgs = [this._collection]
  var url = this.getDelegate() && this.getDelegate().generateApiUrl(pathArgs, {
    query: this._query,
    limit: this._limit,
    offset: this._offset,
  });

  if (this._sort.length > 0) {
    url.sort = this._sort.join(",");
  }

  if (this._aggregates.length > 0) {
    url.aggregate = this._aggregates.join(",");
  }

  return this.getDelegate()['_' + method](url)
}


// Module Exports.
module.exports = SearchBuilder
