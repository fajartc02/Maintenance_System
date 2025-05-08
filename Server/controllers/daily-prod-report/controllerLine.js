const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getLines: (req, res) => {
        let q = `SELECT id, name as label FROM m_line`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'success get line',
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