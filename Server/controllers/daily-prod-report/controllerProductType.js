const cmdMultipleQuery = require('../../config/MultipleQueryConnection');

module.exports = {
    getProduct: (req, res) => {
        let q = `SELECT id, name as label FROM m_product_type`
        cmdMultipleQuery(q)
            .then((result) => {
                res.status(200).json({
                    message: 'success get product type',
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