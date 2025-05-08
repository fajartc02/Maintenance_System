const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getShifts: (req, res) => {
        let q = `SELECT id, name as label FROM m_shift`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'success get shift',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'error',
                    err
                })
            });
    }
}