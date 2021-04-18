const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// connecting to db
mongoose.connect('mongodb://localhost:27017/crud-mongo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('db connecting'))
.catch(e =>console.log(e));

// importing routes
const indexRoutes = require('./routes/index');

// setting.
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// router  
app.use('/', indexRoutes);

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});