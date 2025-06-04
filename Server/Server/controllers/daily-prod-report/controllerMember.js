const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getMember: (req, res) => {
        let q = `SELECT fid as id, fname as label FROM tb_mt_member`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'success get member',
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