const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

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
    checkScreen: (req, res) => {
        let queryCheck = `SELECT * FROM m_screen WHERE status = 0 LIMIT 1`
        cmdMultipleQuery(queryCheck)
            .then(result => {
                gettingSuccess(res, 200, result)
                    // cmdMultipleQuery()
            })
            .catch(err => {
                gettingError(res, err)
            })
    },
    updateScreen: (req, res) => {
        let updateQuery = `UPDATE m_screen SET status = ${req.body.status} WHERE path = '${req.body.path}'`
        console.log(updateQuery);
        cmdMultipleQuery(updateQuery)
            .then(result => {
                gettingSuccess(res, 201, result)
            })
            .catch(err => {
                gettingError(res, err)
            })
    }
}