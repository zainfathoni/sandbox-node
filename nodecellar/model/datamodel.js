 var ObjectId = require('mongodb').ObjectID;
 var assert = require('assert');

exports.insert = function(collection, item, callback) {
    collection.insert(
        item,
        function(err, result) {
            callback(err, item);
        });
};

exports.findAll = function(collection, callback) {
    collection.find().toArray(function(err, items) {
        if (items === null || items.length <= 0) {
            callback(new Error('No item found.'), items);
        } else {
            callback(null, items);
        }
    });
};

exports.findById = function(collection, id, callback) {
    if (!ObjectId.isValid(id)) {
        callback(new Error('ObjectID is invalid.'), null);
    } else {
        collection.findOne(
            {'_id': ObjectId.createFromHexString(id)},
            function(err, item) {
                if (item) {
                    callback(null, item);
                } else {
                    callback(new Error('Item is not found.'), item);
                }
            }
        );
    }
};