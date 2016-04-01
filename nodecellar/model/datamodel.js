var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

exports.dbTest = function(req, res) {
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        res.send({status:'ok',message:'Connected correctly to server.'});
        db.close();
    });
}
