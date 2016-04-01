var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

exports.dbTest = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        res.send({status:'ok',message:'Connected correctly to server.'});
        db.close();
    });
}
