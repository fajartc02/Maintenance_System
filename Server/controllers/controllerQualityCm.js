const cmdMultipleQuery = require('../config/MultipleQueryConnection')

function gettingError(res, err) {
    return res.status(500).json({
        message: 'err',
        err
    })
}

module.exports = {
    addCmQuality: (req, res) => {
        let containerColName = []
        let containerValues = []

        let newData = req.body

        for (const key in newData) {
            const element = newData[key];
            if(element != 'null') {
                containerColName.push(key)
            }
            if(key == 'fdatePlan' || key == 'fdateActual') {
                if(element != 'null') {
                    containerValues.push(`TIMESTAMP('${element}')`)
                }
            } else {
                containerValues.push(`'${element}'`)
            }
        }
        
        let q = `INSERT INTO tb_quality_cm 
            (${containerColName.join(',')}) 
                VALUES
            (${containerValues.join(',')})`
        console.log(q);
        cmdMultipleQuery(q)
            .then(result => {
                res.status(201).json({
                    message: 'ok',
                    data: result
                })
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
    getQualityCm: (req, res) => {
        let q = `SELECT * FROM tb_quality_cm WHERE fid_quality = ${req.params.v_}`
        console.log(q);
        cmdMultipleQuery(q)
            .then(result => {
                res.status(200).json({
                    message: 'ok',
                    data: result
                })
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
    editQualityCm: (req, res) => {
        let data = req.body
        let containerFields = []
        for (const key in data) {
            const element = data[key]
            
            if(key != 'isEdit') {
                if(key != 'fupdate') {
                    containerFields.push(`${key} = '${element}'`)
                } else {
                    containerFields.push(`${key} = CURRENT_TIMESTAMP()`)
                }
            }
        }
        let q = `UPDATE tb_quality_cm SET ${containerFields.join(',')} WHERE fid = ${req.params.v_}`
    }
}