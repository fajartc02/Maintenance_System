const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getDepartment: (req, res) => {
        let q = `SELECT id, name as label FROM m_department`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'success get department',
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