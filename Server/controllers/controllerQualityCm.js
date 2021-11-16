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
            containerColName.push(key)
            if(key == 'fdatePlan' || key == 'fdateActual') {
                containerValues.push(`TIMESTAMP('${element}')`)
            } else {
                containerValues.push(`'${element}'`)
            }
        }
        
        let q = `INSERT INTO tb_quality_cm 
            (${containerColName.join(',')}) 
                VALUES
            (${containerValues.join(',')})`
        console.log(q);
    }
}