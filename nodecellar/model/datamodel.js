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

exports.findAll = function(db, callback) {
    var cursor = db.collection('restaurants').find();
    cursor.toArray(function(err, restaurants) {
        assert.equal(err, null);
        console.log("Returned all documents in restaurants collection.");
        callback(restaurants);
    });
};

exports.findBy = function(db, callback) {
    var cursor = db.collection('restaurants').find({
        "borough": "Manhattan",
        "cuisine": "Italian",
        "name": "Vella",
        "restaurant_id": "41704620"
    });
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};