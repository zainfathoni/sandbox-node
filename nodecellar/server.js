var express = require('express');
var wines = require('./routes/wines');
var datamodel = require('./model/datamodel');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.get('/dbtest', datamodel.dbTest);
app.post('/wines', wines.addWine);

app.listen(3000);
console.log('Listening on port 3000...');