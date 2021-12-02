const { insertData, getData, bulkInsertData } = require('../../QueryFunction/queryModule')
const formatDate = require('../../functions/formatDate')
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
            if(key != 'fend_time' && key != 'intervalDays' && key != 'fstart_time') {
                containerCols.push(key)
                containerVals.push(`'${req.body[key]}'`)
            }
        }
        let containerQuery = []
        let {fstart_time, fend_time, intervalDays} = req.body
        let dateAdd = new Date(fstart_time.split(" ")).setDate(intervalDays);
          fend_time = formatDate.YYYYMMDD_HHMM(new Date(dateAdd)).split(" ");
          for (let d = 0; d < intervalDays; d++) {
            let firstDate = new Date(this.fstart_time.join(" ")).getDate();
        let calcDateInterval = firstDate + d;
        let setupDate = new Date().setDate(calcDateInterval);
        let setupTime = new Date(setupDate).setTime(
          new Date(this.fstart_time.join(" ")).getTime()
        );
        let dateRes = formatDate.YYYYMMDD_HHMM(new Date(setupTime))
            
            // 2021-12-02 15:48:18
            // 2021-12-03 15:48:18
            // 2021-12-04 15:48:18
            // 2021-12-05 15:48:18
            // 2021-12-06 15:48:18
            // 2021-12-07 15:48:18
            // 2021-12-08 15:48:18
           
            if(containerCols.indexOf('fstart_time') == -1 || containerCols.indexOf('fend_time') == -1) {
                containerCols.push('fstart_time')
                containerCols.push('fend_time')
            }
            // containerVals.push(`'${dateRes}'`)
            let modEndTime = `${dateRes.split(' ')[0]} ${req.body.fend_time.split(' ')[1]}`
            let q = `(${containerVals.join(',')}, '${dateRes}', '${modEndTime}')`
            containerQuery.push(q)
          }
          console.log(containerCols);
          console.log(containerVals);
          console.log(containerQuery);

          bulkInsertData(tableJob, containerCols, containerQuery)
          .then(result => {
                gettingSuccess(res, 201, result)
            })
            .catch(err => {
                gettingError(res, err)
            })

          
    },
    getJobData: (req, res) => {
        let containerSomeCols = false
        let filterQuery = false
        if(req.query.someCols) {
            containerSomeCols = req.query.someCols
        }
        console.log(req.query.filterQuery);
        // if(req.query.isDay) {
        //     filterQuery = `WHERE HOUR(fstart_time) = HOUR(NOW()) + 3 AND fstart_time = CURDATE() OR HOUR(fstart_time) = HOUR(NOW()) - 21 AND fstart_time = CURDATE() INTERVAL 1 DAY`
        // }
        if(req.query.filterQuery) {
            filterQuery = req.query.filterQuery
        }
        getData(ViewJob, containerSomeCols, filterQuery)
            .then(result => {
                gettingSuccess(res, 200, result)
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
    getOeeData: (req, res) => {
        getData(viewOee, false, false)
            .then(result => {
                gettingSuccess(res, 200, result)
            })
            .catch(err => {
                gettingError(res, err)
            })
    }
}