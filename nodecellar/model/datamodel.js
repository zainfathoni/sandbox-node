 var ObjectId = require('mongodb').ObjectID;
 var assert = require('assert');

exports.insert = function(db, obj, callback) {
    db.collection('restaurants').insertOne(
        obj,
        function(err, result) {
            assert.equal(err, null); // for unit testing
            callback({ status: 'OK', message: 'Inserted a document into the restaurants collection.' });
        });
};

exports.findAll = function(db, callback) {
    var cursor = db.collection('restaurants').find();
    cursor.toArray(function(err, restaurants) {
        assert.equal(err, null); // for unit testing
        callback(restaurants);
    });
};

exports.findById = function(db, id, callback) {
    db.collection('restaurants').findOne(
        {'_id': ObjectId.createFromHexString(id)},
        function(err, item) {
            assert.equal(err, null);
            callback(item);
        }
    );
};