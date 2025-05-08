const cmdMultipleQuery = require("../../config/MultipleQueryConnection");

module.exports = {
    addAnalisysNew: async(req, res) => {
        try {
            const data = await cmdMultipleQuery(
                `SELECT id from o_analisys where id_problem = ${req.params.v_} AND analisys_category = '${req.query.analisys_category}'`
            );

            if (data.length > 0) {
                await cmdMultipleQuery(
                    `UPDATE o_analisys SET json_string = '${JSON.stringify(
            req.body
          )}' where id_problem = ${req.params.v_} AND analisys_category = '${
            req.query.analisys_category
          }'`
                );
                return res.status(200).json({
                    message: "success update",
                });
            } else {
                await cmdMultipleQuery(
                    `INSERT INTO o_analisys(id_problem, json_string, analisys_category) VALUES (${
            req.params.v_
          }, '${JSON.stringify(req.body)}', '${req.query.analisys_category}')`
                );
                return res.status(200).json({
                    message: "success insert",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error add analysis",
                error,
            });
        }
    },
    getAnalisysNew: async(req, res) => {
        try {
            const data = await cmdMultipleQuery(
                `SELECT json_string from o_analisys where id_problem = ${req.params.v_} AND analisys_category = '${req.query.analisys_category}'`
            );
            return res.status(200).json({
                message: "success",
                data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error",
                err: error,
            });
        }
    },
};