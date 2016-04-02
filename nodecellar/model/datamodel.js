 var ObjectId = require('mongodb').ObjectID;
 var assert = require('assert');

exports.insert = function(collection, obj, callback) {
    collection.insertOne(
        obj,
        function(err, result) {
            assert.equal(err, null); // for unit testing
            callback({ status: 'OK', message: 'Inserted a document into the restaurants collection.' });
        });
};

exports.findAll = function(collection, callback) {
    var cursor = collection.find();
    cursor.toArray(function(err, items) {
        assert.equal(err, null); // for unit testing
        callback(items);
    });
};

exports.findById = function(collection, id, callback) {
    if (ObjectId.isValid(id)) {
        collection.findOne(
            {'_id': ObjectId.createFromHexString(id)},
            function(err, item) {
                callback(new Error('Item Not Found.'), item);
            }
        );
    } else {
        callback(new Error('ObjectID is invalid.'), null);
    }
};