function generateQInstTime(is_day, is_friday) {
    const cmdMultipleQuery = require('../../config/MultipleQueryConnection')
    return new Promise((resolve, reject) => {
        let containerFilter = []
        let qFilterGetTime = ''
        if (is_friday == 1) {
            containerFilter.push(`is_friday = 1`)
        } else {
            containerFilter.push(`is_friday = 0`)
        }

        if (is_day == 1) {
            containerFilter.push(`is_day = 1`)
        } else {
            containerFilter.push(`is_day = 0`)
        }

        if (containerFilter.length > 0) {
            qFilterGetTime = ` WHERE ${containerFilter.join(' AND ')}`
        }
        let qGetMTime = `
            SELECT 
                id,
                desc_minutes,
                desc_clock,
                desc_hottime,
                is_hottime,
                is_day,
                is_friday
            FROM m_time
            ${qFilterGetTime} 
            ORDER BY desc_clock ASC`
        cmdMultipleQuery(qGetMTime)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
            });
    })
}


module.exports = generateQInstTime