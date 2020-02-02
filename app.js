var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var config = require('./modules/configure');

//view routers
var indexRouter = require('./routes/index');
var repositoryRouter = require('./routes/repository');
var repositoryInRouter = require('./routes/repository-in');
var repositoryOutRouter = require('./routes/repository-out');
var brandsRouter = require('./routes/brands');
var usersRouter = require('./routes/users');
var generalRouter = require('./routes/general');
var saleRouter = require('./routes/sale');
var proceedsRouter = require('./routes/proceeds');
var clientRouter = require('./routes/client');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.sessionkey));
app.use(session({
    secret: config.sessionkey,
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));


//set view routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/general', generalRouter);
app.use('/brands', brandsRouter);
app.use('/repository', repositoryRouter);
app.use('/repository-in', repositoryInRouter);
app.use('/repository-out', repositoryOutRouter);
app.use('/sale', saleRouter)
app.use('/proceeds', proceedsRouter);
app.use('/client', clientRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;