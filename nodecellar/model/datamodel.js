var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

exports.dbTest = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err); // for unit testing
        res.send({ status: 'OK', message: 'Connected correctly to server.' });
        db.close();
    });
}

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
        {'_id': new ObjectId(id)},
        function(err, item) {
            assert.equal(err, null);
            callback(item);
        }
    );
};