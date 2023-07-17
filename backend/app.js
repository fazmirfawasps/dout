const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require('cors')
const db=require('./Controllers/config/connection')
const session = require('express-session');


const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const hostRouter= require('./routes/host')

const { log } = require('console');

const app = require('express')();




// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api',express.static(path.join(__dirname, 'public')));
db.connectToMongo((err) => {
  if (err) {
    console.log('Failed to connect to database', err);
    return;
  }

  console.log('Connected to database');
});
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 864000000, // Set the maximum age of the session cookie (in milliseconds)
      httpOnly: true, // Ensure the cookie is only accessible via HTTP(S) and not JavaScript
    },
  })
);
app.use(
  cors({
    origin: ["http://htron.site", "http://admin.htron.site","http://localhost:3000", "http://localhost:3001",'admin.htron.site'],
    credentials: true,
  })
);




app.use('/api', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/host',hostRouter)

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
