const cmdMultipleQuery = require("../../../config/MultipleQueryConnection");
const response = require("../../../helpers/response");
const whereConditionQuery = require("../../../helpers/whereConditionQuery");

module.exports = {
  getKY: async (req, res) => {
    try {
      req.query.is_deleted = 0;
      console.log(req.query);
      let whereCond = whereConditionQuery(req.query);
      let query = `SELECT fid as machine_id, fline as line_nm, fmc_name as machine_nm FROM tb_mc ${whereCond}`;
      console.log(query);
      let machinesData = await cmdMultipleQuery(query);
      let containerKyQueries = await machinesData.map(async (item) => {
        return `SELECT * FROM tb_m_kymachine WHERE machine_id = ${item.machine_id}`;
      });

      let kyDataQueries = await Promise.all(containerKyQueries);
      let kyData = await cmdMultipleQuery(kyDataQueries.join(";"));

      let mapKyData = machinesData.map((item, i) => {
        console.log(item);
        console.log(kyData);
        item.ky_data = kyData.length > 0 ? kyData : [];
        // console.log(item);
        item.ky_total = kyData.length > 0 ? kyData.length : 0;
        return item;
      });
      response.success(res, "success to get machines ky", mapKyData);
    } catch (error) {
      console.log(error);
      response.failed(res, "Error get ky");
    }
  },
  addKY: async (req, res) => {
    try {
      const { machine_id, details, created_by, stop6_category } = req.body;
      let q = `INSERT INTO 
        tb_m_kymachine(machine_id, details, created_by, stop6_category) 
            VALUES 
        (${machine_id}, '${details}', '${created_by}', '${stop6_category}')`;
      const resInst = await cmdMultipleQuery(q);
      response.success(res, "inserted KY DATA", resInst);
    } catch (error) {
      response.failed(res, "Error to add new ky");
    }
  },
  editKY: async (req, res) => {
    try {
      const { machine_id, details, created_by, stop6_category, id } = req.body;
      let q = `UPDATE 
        tb_m_kymachine 
        SET 
          details = '${details}', 
          created_by = '${created_by}', 
          stop6_category = '${stop6_category}', 
          created_dt = CURRENT_TIMESTAMP 
        WHERE id = ${id}`;

      const resp = await cmdMultipleQuery(q);
      response.success(res, "KY data updated", resp);
    } catch (error) {
      response.failed(res, "Error to edit new ky");
    }
  },
  deleteKY: async (req, res) => {
    try {
      const { id } = req.params;
      let q = `DELETE FROM tb_m_kymachine WHERE id = ${id}`;

      const resp = await cmdMultipleQuery(q);
      response.success(res, "KY data updated", resp);
    } catch (error) {
      response.failed(res, "Error to edit new ky");
    }
  },
};
