var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';
var datamodel = require('../model/datamodel');

exports.findAll = function(req, res) {
    res.send([{ name: 'restaurant1' }, { name: 'restaurant2' }, { name: 'restaurant3' }]);
};

exports.findById = function(req, res) {
    res.send({ id: req.params.id, name: "The Name", description: "description" });
};

exports.add = function(req, res) {
    var restaurants = req.body;
    console.log('Adding restaurants: ' + JSON.stringify(restaurants));

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        datamodel.insert(db, restaurants, function() {
            db.close();
            res.send(restaurants)
        });
    });
}
