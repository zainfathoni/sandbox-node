var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';
var datamodel = require('../model/datamodel');

exports.findAll = function(req, res) {
    console.log("Retrieving all documents in restaurants collection.");
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        datamodel.findAll(db, function(restaurants) {
            db.close();
            res.send(restaurants);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving restaurant: ' + id);
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        datamodel.findById(db, id, function(restaurant) {
            db.close();
            res.send(restaurant);
        });
    });
};

exports.add = function(req, res) {
    var restaurants = req.body;
    console.log('Adding restaurants: ' + JSON.stringify(restaurants));

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        datamodel.insert(db, restaurants, function(msg) {
            db.close();
            res.send(msg)
        });
    });
}
