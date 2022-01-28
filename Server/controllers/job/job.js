const { insertData, getData, bulkInsertData, deleteQuery } = require('../../QueryFunction/queryModule')
const formatDate = require('../../functions/formatDate')
const cmdMultipleQuery = require('../../config/MultipleQueryConnection');
const tableJob = 'tb_jobdesk'
const ViewJob = 'v_jobdesk'
const viewOee = 'v_prod'

function gettingError(res, err) {
    res.status(500).json({
        message: 'Error',
        err
    })
}

function gettingSuccess(res, status, data) {
    res.status(status).json({
        message: 'ok',
        data
    })
}

module.exports = {
    addJobData: (req, res) => {
        let containerCols = []
        let containerVals = []
        for (const key in req.body) {
            const element = req.body[key];
            containerCols.push(key)
            containerVals.push(`'${element}'`)
        }
        // console.log(req.body);
        insertData(tableJob, containerCols, containerVals) // table_name, colsName, valsName
            .then(result => {
                gettingSuccess(res, 201, result)
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
    bulkAddJobData: (req, res) => {
        console.log('THIS BULK ADD JOB DATA');
        let containerCols = []
        let containerVals = []
        for (const key in req.body) {
            if (key != 'fend_time' && key != 'intervalDays' && key != 'fstart_time') {
                containerCols.push(key)
                containerVals.push(`'${req.body[key]}'`)
            }
        }
        let containerQueryVals = []
        let { fstart_time, fend_time, intervalDays } = req.body
        for (let i = 1; i <= intervalDays; i++) {
            console.log(fstart_time);
            console.log(fend_time);
            if (i == 1) {
                containerCols.push('fstart_time')
                containerCols.push('fend_time')
            }
            let newStartDate = new Date(formatDate.YYYYMMDD_HHMM(fstart_time)).getTime() + i * 24 * 60 * 60 * 1000
            let newDate = formatDate.YYYYMMDD(new Date(newStartDate))
            containerQueryVals.push(`(${containerVals.join(',')},'${newDate} ${fstart_time.split(' ')[1]}','${newDate} ${fend_time.split(' ')[1]}')`)
        }
        console.log(containerQueryVals);

        bulkInsertData(tableJob, containerCols, containerQueryVals)
            .then(result => {
                gettingSuccess(res, 201, result)
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
    getJobData: async(req, res) => {
        let containerSomeCols = false
        let filterQuery = false
        if (req.query.someCols) {
            containerSomeCols = req.query.someCols
        }
        console.log(req.query.filterQuery);
        // if(req.query.isDay) {
        //     filterQuery = `WHERE HOUR(fstart_time) = HOUR(NOW()) + 3 AND fstart_time = CURDATE() OR HOUR(fstart_time) = HOUR(NOW()) - 21 AND fstart_time = CURDATE() INTERVAL 1 DAY`
        // }
        if (req.query.filterQuery) {
            filterQuery = req.query.filterQuery
            if (filterQuery.includes('~')) {
                let parshingQ = filterQuery.replace(new RegExp('~', 'g'), ' ')
                console.log('===========');
                console.log(parshingQ);
                filterQuery = parshingQ
            }
        }
        await getData(ViewJob, containerSomeCols, filterQuery)
            .then(async result => {
                await gettingSuccess(res, 200, result)
            })
            .catch(async err => {
                await gettingError(res, err)
            })
    },
    getOeeData: async(req, res) => {
        await getData(viewOee, false, false)
            .then(async result => {
                await gettingSuccess(res, 200, result)
            })
            .catch(async err => {
                await gettingError(res, err)
            })
    },
    getYamazumiData: async(req, res) => {
        let containerQuery = []
        let { members } = req.body
        let filter = ''
        if (req.query.filter == 'day') {
            filter = ` AND DAY(fstart_time) = DAY(NOW())`
        } else if (req.query.filter == 'week') {
            filter = ` AND WEEK(fstart_time) = WEEK(NOW())`
        } else if (req.query.filter == 'month') {
            filter = ` AND MONTH(fstart_time) = MONTH(NOW())`
        } else if (req.query.filter == 'year') {
            filter = ` AND YEAR(fstart_time) = YEAR(NOW())`
        }
        if (req.query.fstart_time && req.query.fend_time) {
            filter = ` AND DATE(fstart_time) >= DATE('${req.query.fstart_time}') AND DATE(fstart_time) <= DATE('${req.query.fend_time}')`
        }
        members.forEach(member => {
            let q = `SELECT foperator, fgroup, SUM(fdur) AS fdur FROM u5364194_smartand_tmmin3_qmms.v_jobdesk WHERE (fgroup LIKE '%Preventive%' OR fgroup LIKE '%training%' OR fgroup LIKE '%Repair%' OR fgroup LIKE '%Safety%' OR fgroup LIKE '%Project%' OR fgroup LIKE '%Others%') AND foperator LIKE '%${member}%'${filter} GROUP BY fgroup`
            containerQuery.push(q)
        })
        console.log(containerQuery);
        cmdMultipleQuery(containerQuery.join(';'))
            .then(result => {
                console.log(result);
                gettingSuccess(res, 200, result)
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
    deleteJobData: async(req, res) => {
        let key = req.body.key
        let operator = req.body.operator
        let val = req.body.val
        await deleteQuery(tableJob, key, operator, val)
            .then(async result => {
                await gettingSuccess(res, 200, result)
            })
            .catch(async err => {
                await gettingError(res, err)
            })
    },
    editJobData: async(req, res) => {
        // fline, farea, fjob_type, fdesc, fstart_time, fend_time, foperator, fgroup, frole
        let { fid, fline, farea, fjob_type, fdesc, fstart_time, fend_time, foperator, fgroup, frole } = req.body
        let q = `UPDATE ${tableJob} SET 
            fline = '${fline}', 
            farea = '${farea}', 
            fjob_type = '${fjob_type}',
            fdesc = '${fdesc}',
            fstart_time = '${fstart_time}',
            fend_time = '${fend_time}',
            foperator = '${foperator}',
            fgroup = '${fgroup}',
            frole = '${frole}'
                WHERE fid = ${fid}`
        console.log(q)
        await cmdMultipleQuery(q)
            .then(result => {
                gettingSuccess(res, 200, result)
            })
            .catch(err => {
                gettingError(res, err)
            })
    }
}