const db = require('../../config/MysqlConnection');

module.exports = {
    addWarga: (req, res) => {
        let q = `INSERT INTO tb_w_pca (id, blok, kepala_keluarga, no_hp, anggota_keluarga)
        VALUES
            ('${req.body.id}', '${req.body.blok}', '${req.body.kepala_keluarga}', '${req.body.no_hp}', '${req.body.anggota_keluarga}')`
        db(q)
            .then((result) => {
                res.status(201).json({
                    message: 'Success to add warga',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error To add warga',
                    err: err.message
                })
            });
    },
    getWarga: (req, res) => {
        let q = `SELECT * FROM tb_w_pca`
        db(q)
            .then((result) => {
                res.status(200).json({
                    message: 'Success to get warga',
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error To get warga',
                    err: err.message
                })
            });
    }
}