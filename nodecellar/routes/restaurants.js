var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

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
    insertDocument(db, restaurants, function() {
      db.close();
      res.send(restaurants)
    });
  });
}

var insertDocument = function(db, obj, callback) {
  db.collection('restaurants').insertOne(
    obj,
    function(err, result) {
      assert.equal(err, null);
      console.log("Inserted a document into the restaurants collection.");
      callback();
    });
};