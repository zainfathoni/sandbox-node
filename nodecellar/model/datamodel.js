var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

exports.dbTest = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        res.send({ status: 'ok', message: 'Connected correctly to server.' });
        db.close();
    });
}

exports.insert = function(db, obj, callback) {
    db.collection('restaurants').insertOne(
        obj,
        function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            callback();
        });
};