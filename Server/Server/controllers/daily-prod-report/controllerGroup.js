const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getGroups: (req, res) => {
        let q = `SELECT id, name as label FROM m_group`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'success get group',
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