var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

exports.insert = function(collection, item, callback) {
    collection.insert(
        item,
        function(err, result) {
            callback(err, result);
        });
};

exports.findAll = function(collection, callback) {
    collection.find().toArray(function(err, result) {
        callback(err, result);
    });
};

exports.findById = function(collection, id, callback) {
    if (!ObjectId.isValid(id)) {
        callback(new Error('ObjectID is invalid.'), null);
        return;
    }
    collection.findOne(
        { '_id': ObjectId.createFromHexString(id) },
        function(err, result) {
            callback(err, result);
        });
};

exports.update = function(collection, id, item, callback) {
    if (!ObjectId.isValid(id)) {
        callback(new Error('ObjectID is invalid.'), null);
        return;
    }
    collection.updateOne(
        { '_id': ObjectId.createFromHexString(id) },
        item,
        function(err, result) {
            callback(err, result);
        });
};

exports.delete = function(collection, id, callback) {
    if (!ObjectId.isValid(id)) {
        callback(new Error('ObjectID is invalid.'), null);
        return;
    }
    collection.deleteOne(
        { '_id': ObjectId.createFromHexString(id) },
        function(err, result) {
            callback(err, result);
        });
};