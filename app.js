/**
 * Selfie
 * 
 * Simple app for taking a picture and sending it to an object 
 * detection service. See README.md for more details.
 *
 * Author: ferenc.szekely@gmail.com
 * License: MIT
 *
 * Copyright (c) 2019 Ferenc Székely
 */
'use strict';


let path = require('path');
let express = require('express');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let cors = require('cors');

// Routes
let indexRouter = require('./routes/index');
let configRouter = require('./routes/config');
let classifyRouter = require('./routes/classify');

let app = express();

app.config = require('./config/selfie.config.js');

// Route handlers
app.use('/', indexRouter);
app.use('/config', configRouter);
app.use('/classify', classifyRouter);

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let debug = require('debug')(app.config.name);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  createError(404, "No such route.");
  next();
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


if (typeof app.config.server === 'undefined' || app.config.server == '') {
  app.config.server = 'localhost';
}

app.listen(app.config.port, app.config.server, function() {
  console.log(app.config.name + ' is listening on http://' + app.config.server + ':' + app.config.port + ".\n");
  console.log("Point the browser to the URL above to use the application.\n");  
});

module.exports = app;
