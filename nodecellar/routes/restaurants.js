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
    db.collection('restaurants').insertOne({
    "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
    },
    "borough" : "Manhattan",
    "cuisine" : "Italian",
    "grades" : [
        {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
        },
        {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
        }
    ],
    "name" : "Vella",
    "restaurant_id" : "41704620"
},
        function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            callback();
        });
};