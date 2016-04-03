var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var restaurants = require('./routes/restaurants');
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
app.post('/restaurants', restaurants.add);
app.get('/restaurants', restaurants.findAll);
app.get('/restaurants/:id', restaurants.findById);
app.put('/restaurants/:id', restaurants.update);
app.delete('/restaurants/:id', restaurants.delete);

// ROUTES
// Get an instance of router
var router = express.Router();

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('im the home page!');
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    res.send('im the about page!');
});

// Apply Routes
app.use('/', router);

// START SERVER
app.listen(port);
console.log('Listening on port ' + port);