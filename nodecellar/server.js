var express = require('express');
var restaurants = require('./routes/restaurants');
var datamodel = require('./model/datamodel');

var app = express();

app.configure(function() {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
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

app.post('/restaurants', restaurants.add);
app.get('/restaurants', restaurants.findAll);
app.get('/restaurants/:id', restaurants.findById);
app.put('/restaurants/:id', restaurants.update);
app.delete('/restaurants/:id', restaurants.delete);

app.listen(3000);
console.log('Listening on port 3000...');