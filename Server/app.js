require("dotenv").config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

const cron = require('node-cron')

async function checkIsMcActive(id, cmdMultipleQuery) {
    let q = `SELECT fmc_id, 
    ferror_name,
    fstart_time,
    fend_time FROM tb_error_log_2
  WHERE fmc_id = ${id} AND 
  fend_time IS NULL`
    cmdMultipleQuery(q)
        .then(result => {
            console.log(result);
            if (result.length < 1 || !result) {
                let qChangesStatusMc = `UPDATE tb_status SET fstatus = 0, ferror_start = NULL WHERE fid = ${id}`
                cmdMultipleQuery(qChangesStatusMc)
                    .then(resStatus => {
                        console.log(resStatus);
                    })
                    .catch(errStatus => {
                        console.log(errStatus);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

const { getAllCountermeasure, getNotifLeader } = require('./functions/notification/countermeasure')

const { getTemporaryAction } = require('./functions/notification/temporaryAction')

// Every day at 7:00am check remind countermeasure to leader MT 
cron.schedule('0 7 * * *', () => {
    getAllCountermeasure(getNotifLeader)
})

// Every monday at 7:00am check remind temporary action to leader MT 
cron.schedule('0 7 * * 1', () => {
    getTemporaryAction()
})

// Every 3 seconds check fixing bug smartandon not closed
cron.schedule('*/30 * * * * *', () => {
    const cmdMultipleQuery = require('./config/MultipleQueryConnection')
    console.log('RUN JOB check invalid data 30 minutes');
    // simple query
    let q = `SELECT fid,fstatus FROM tb_status WHERE fstatus = 1;`
    cmdMultipleQuery(q)
        .then((result) => {
            console.log(result);
            let containerResult = result
            if (containerResult.length > 0) {
                containerResult.forEach(itemProb => {
                    checkIsMcActive(itemProb.fid, cmdMultipleQuery)
                })
            }
        }).catch((err) => {
            console.error(err)
        });
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.listen(3000)

module.exports = app;