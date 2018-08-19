const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql');
require('./model/user')


const app = express();


// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'));


//Routes
app.use('/users',require('./routes/user'))



module.exports = app;