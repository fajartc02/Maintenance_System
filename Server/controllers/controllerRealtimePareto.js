const pool = require('../config/MysqlConnection');
const credentials = require('../config/Credentials')
const mysql = require('mysql');
const cmdQuery = require('../config/MysqlConnection');
const cmdMultipleQuery = require('../config/MultipleQueryConnection');


module.exports = {
    getDataPareto: (req, res) => {
        // let startDate = ''
        // let endDate = ''
        // let fline = ''
        // if (req.query.startDate) {
        //     startDate = `${req.query.startDate}`
        // }
        // if (req.query.endDate) {
        //     endDate = `${req.query.endDate}`
        // }
        // if (req.query.fline) {
        //     fline = `AND fline = '${req.query.fline}'`
        // }
        // let group = ``
        // if (req.query.isMc == 'true') {
        //     group = 'fmc_name'
        // }
        // console.log(req.query);
        // if (req.query.isProblem == 'true') {
        //     group = 'ferror_name'
        // }
        // let order = 'sum(fdur)'
        // if (req.query.isFreq == 'true') {
        //     order = 'count(fid)'
        // }
        // let qProblem = `
        // SELECT 
        //     ${group}, 
        //     ${order} AS fdur 
        // FROM v_current_error_2 
        // WHERE  
        //     date(fstart_time) >= date('${startDate}') AND 
        //     date(fstart_time) <= date('${endDate}') AND 
        //     fdur > 3 ${fline} 
        // GROUP BY ${group} 
        // ORDER BY fdur desc LIMIT 5`
        cmdMultipleQuery(req.query.containerQuery)
            .then((results) => {
                res.status(200).json({
                    message: "Success to get Pareto Problem",
                    data: results
                })
            }).catch((err) => {
                res.status(203).json({
                    message: 'Error',
                    err
                })
            });

    },
}