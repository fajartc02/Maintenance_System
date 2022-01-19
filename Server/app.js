require("dotenv").config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

const cron = require('node-cron')

cron.schedule('*/10 * * * * *', () => {
    console.log('RUN JOB Every 10 seconds');
    // get the client
    const mysql = require('mysql2');
    
    // create the connection to database
    const connection = mysql.createConnection({
      host: process.env.HOST_DB_NEW,
      user: process.env.USER_DB_NEW,
      database: process.env.NAME_DB_NEW,
      multipleStatements: true,
      waitForConnections: true,
      timezone: 'utc',
    });
    
    // simple query
    connection.query(
      'SELECT fid, fstatus from u5364194_smartand_tmmin3_qmms.tb_status where fstatus = 1',
      function(err, results, fields) {
        if(err) console.log(err);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({ origin: true }));
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
