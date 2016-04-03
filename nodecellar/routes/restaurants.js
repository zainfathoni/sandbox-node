var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/test';
var datamodel = require('../model/datamodel');

// Add
exports.add = function(req, res, next) {
    var restaurants = req.body;
    console.log('Adding restaurants: ' + JSON.stringify(restaurants));

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        datamodel.insert(db.collection('restaurants'), restaurants, function(err, items) {
            db.close();
            if (err) return next(err);
            res.send(items);
        });
    });
}

// Find All
exports.findAll = function(req, res, next) {
    console.log("Retrieving all documents in restaurants collection.");

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        datamodel.findAll(db.collection('restaurants'), function(err, items) {
            db.close();
            if (err) return next(err);
            res.send(items);
        });
    });
};

// Find by Id
exports.findById = function(req, res, next) {
    var id = req.params.id;
    console.log('Retrieving restaurant: ' + id);

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        datamodel.findById(db.collection('restaurants'), id, function(err, item) {
            db.close();
            if (err) return next(err);
            res.send(item);
        });
    });
};

// Update
exports.update = function(req, res, next) {
    var id = req.params.id;
    var restaurant = req.body;
    console.log('Updating restaurant: ' + id);

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        datamodel.update(db.collection('restaurants'), id, restaurant, function(err, item) {
            db.close();
            if (err) return next(err);
            res.send(item);
        });
    });
};

// Delete
exports.delete = function(req, res, next) {
    var id = req.params.id;
    var restaurant = req.body;
    console.log('Deleting restaurant: ' + id);

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        datamodel.delete(db.collection('restaurants'), id, function(err, item) {
            db.close();
            if (err) return next(err);
            res.send(item);
        });
    });
};