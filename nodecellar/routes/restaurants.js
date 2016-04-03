var mongo = require('mongodb');
var router = require('express').Router();
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;
var url = 'mongodb://localhost:27017/test';
var datamodel = require('../model/datamodel');

// route middleware to validate :name
router.param('id', function(req, res, next, id) {
    if (!ObjectId.isValid(id)) {
        next(new Error('ObjectID is invalid.'));
    } else {
        req.id = ObjectId.createFromHexString(id);
        next();
    }
});

// Add
router.post('/', function(req, res, next) {
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
});

// Find All
router.get('/', function(req, res, next) {
    console.log("Retrieving all documents in restaurants collection.");

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        datamodel.findAll(db.collection('restaurants'), function(err, items) {
            db.close();
            if (err) return next(err);
            res.send(items);
        });
    });
});

// Find by Id
router.get('/:id', function(req, res, next) {
    var id = req.id;
    console.log('Retrieving restaurant: ' + id);

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        datamodel.findById(db.collection('restaurants'), id, function(err, item) {
            db.close();
            if (err) return next(err);
            res.send(item);
        });
    });
});

// Update
router.put('/:id', function(req, res, next) {
    var id = req.id;
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
});

// Delete
router.delete('/:id', function(req, res, next) {
    var id = req.id;
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
});

module.exports = router;