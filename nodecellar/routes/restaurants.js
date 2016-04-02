var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/test';
var datamodel = require('../model/datamodel');

exports.add = function(req, res) {
    var restaurants = req.body;
    console.log('Adding restaurants: ' + JSON.stringify(restaurants));

    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.send({ status: 'Error', content: err.message });
            return;
        }
        datamodel.insert(db.collection('restaurants'), restaurants, function(err, items) {
            db.close();
            if (err) {
                res.send({ status: 'Error', content: err.message });
            } else {
                res.send({ status: 'OK', content: items });
            }
        });
    });
}

exports.findAll = function(req, res) {
    console.log("Retrieving all documents in restaurants collection.");

    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.send({ status: 'Error', content: err.message });
            return;
        }
        datamodel.findAll(db.collection('restaurants'), function(err, items) {
            db.close();
            if (err) {
                res.send({ status: 'Error', content: err.message });
            } else {
                res.send({ status: 'OK', content: items });
            }
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving restaurant: ' + id);

    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.send({ status: 'Error', content: err.message });
            return;
        }
        datamodel.findById(db.collection('restaurants'), id, function(err, item) {
            db.close();
            if (err) {
                res.send({ status: 'Error', content: err.message });
            } else {
                res.send({ status: 'OK', content: item });
            }
        });
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var restaurant = req.body;
    console.log('Updating restaurant: ' + id);

    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.send({ status: 'Error', content: err.message });
            return;
        }
        datamodel.update(db.collection('restaurants'), id, restaurant, function(err, item) {
            db.close();
            if (err) {
                res.send({ status: 'Error', content: err.message });
            } else {
                res.send({ status: 'OK', content: item });
            }
        });
    });
}