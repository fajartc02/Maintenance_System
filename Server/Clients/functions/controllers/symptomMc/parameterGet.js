const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

async function gettingSuccess(res, data) {
    return await res.status(200).json({
        message: 'OK',
        data
    })
}

function gettingError(res, err) {
    return res.status(200).json({
        message: 'Err',
        err
    })
}


module.exports = {
    getParameters: async(req, res) => {
        let strColName = ''
        if (req.query.reqColName) {
            strColName = req.query.reqColName
        } else {
            strColName = '*'
        }
        let q = `SELECT DISTINCT ftemp_name FROM tb_temperature`
        if (req.query.params) {
            console.log(req.query.params);
            let arrReqParams = req.query.params.split(',')
            q += ' WHERE'
            q += ` (`
            let tempArrParams = []
            arrReqParams.forEach((paramName, i) => {
                let tempStrParam = ''
                tempStrParam += `ftemp_name LIKE '%${paramName}%'`
                tempArrParams.push(tempStrParam)
            })
            q += `${tempArrParams.join(' OR ')}`
            q += `)`
        }
        await cmdMultipleQuery(q)
            .then(async(result) => {
                await gettingSuccess(res, result)
            }).catch(async(err) => {
                await gettingError(res, err)
            });
    },
    getAvailableMc: (req, res) => {
        let q = `SELECT DISTINCT fmc_name FROM tb_temperature ORDER BY fmc_name ASC`
        cmdMultipleQuery(q)
            .then((results) => {
                gettingSuccess(res, results)
            }).catch((err) => {
                gettingError(res, err)
            });
    },
}