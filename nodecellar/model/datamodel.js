var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

exports.insert = function(collection, item, callback) {
    // Insert (One or Many)
    collection.insert(
        item,
        function(err, result) {
            callback(err, result);
        });
};

exports.findAll = function(collection, callback) {
    // Find To Array
    collection.find().toArray(function(err, result) {
        callback(err, result);
    });
};

// Find by Id
exports.findById = function(collection, id, callback) {
    // ObjectID Validation
    if (!ObjectId.isValid(id)) {
        callback(new Error('ObjectID is invalid.'), null);
        return;
    }

    // Find One
    collection.findOne(
        { '_id': ObjectId.createFromHexString(id) },
        function(err, result) {
            callback(err, result);
        });
};

exports.update = function(collection, id, item, callback) {
    // ObjectID Validation
    if (!ObjectId.isValid(id)) {
        callback(new Error('ObjectID is invalid.'), null);
        return;
    }

    // Update One
    collection.updateOne(
        { '_id': ObjectId.createFromHexString(id) },
        item,
        function(err, result) {
            callback(err, result);
        });
};

exports.delete = function(collection, id, callback) {
    // ObjectID Validation
    if (!ObjectId.isValid(id)) {
        callback(new Error('ObjectID is invalid.'), null);
        return;
    }

    // Delete One
    collection.deleteOne(
        { '_id': ObjectId.createFromHexString(id) },
        function(err, result) {
            callback(err, result);
        });
};