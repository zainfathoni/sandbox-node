var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var restaurants = require('./routes/restaurants');
var sample = require('./routes/sample')
var datamodel = require('./model/datamodel');

// Initialization
var app = express();
var port = process.env.PORT || 3000;

// CONFIGURATION
// Morgan Logger
app.use(morgan('combined'));

// Body Parser
app.use(bodyParser.json());

// Development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production Error Handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Routing
app.route('/login')

    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
        res.send('this is the login form');
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });

// Apply Routes
app.use('/sample', sample);
app.use('/restaurants', restaurants);

// START SERVER
app.listen(port);
console.log('Listening on port ' + port);