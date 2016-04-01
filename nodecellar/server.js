var express = require('express'),
    wines = require('./routes/wines'),
    datamodel = require('./model/datamodel');

var app = express();

app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.get('/testdb', datamodel.dbTest);

app.listen(3000);
console.log('Listening on port 3000...');