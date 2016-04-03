var express = require('express');
var restaurants = require('./routes/restaurants');
var datamodel = require('./model/datamodel');

// Initialization
var app = express();

// Configuration
app.configure(function() {
    // Logger: 'default', 'short', 'tiny', 'dev'
    app.use(express.logger('dev'));

    // Body Parser
    app.use(express.bodyParser());

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
});

// Routing
app.post('/restaurants', restaurants.add);
app.get('/restaurants', restaurants.findAll);
app.get('/restaurants/:id', restaurants.findById);
app.put('/restaurants/:id', restaurants.update);
app.delete('/restaurants/:id', restaurants.delete);

// Listening
app.listen(3000);
console.log('Listening on port 3000...');