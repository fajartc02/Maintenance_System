const cmdMultipleQuery = require("../../config/MultipleQueryConnection");
const response = require("../../helpers/response");

module.exports = {
  getLtbHistory: async (req, res) => {
    try {
      const { year, line_id = null } = req.query;
      let condLTB = `IF((line_id = 7 AND fdur >= 15) OR (line_id <> 7 AND fdur >= 120), true, false)`;
      line_id ? (condLTB += ` AND line_id = ${line_id}`) : "";
      let q = `SELECT 
            fid, 
            fstart_time, 
            line_id, 
            fline, 
            fmc_name, 
            ferror_name, 
            fdur as duration,
            ${condLTB} as is_ltb
        FROM 
            v_current_error_2 
        WHERE 
            YEAR(fstart_time) = ${year} AND ${condLTB}`;
      const errorsData = await cmdMultipleQuery(q);
      response.success(res, "GET LTB HISTORY", errorsData);
    } catch (error) {
      response.error(res, "Error get ltb history");
    }
  },
};
