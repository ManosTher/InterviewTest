// Import required modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// Import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const houseController = require('./routes/houses');

// Create an Express app
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/houses', houseController.getAllHouses);
app.get('/houses/:name', houseController.getHouseByName);
app.post('/houses', houseController.addHouse);
//app.get('/houses/:id', houseController.getHouseById);
//app.put('/houses/:id', houseController.updateHouse);
//app.delete('/houses/:id', houseController.deleteHouse);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Export the app
module.exports = app;