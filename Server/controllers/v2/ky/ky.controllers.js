const cmdMultipleQuery = require("../../../config/MultipleQueryConnection");
const response = require("../../../helpers/response");
const whereConditionQuery = require("../../../helpers/whereConditionQuery");

module.exports = {
  getKY: async (req, res) => {
    try {
      req.query.is_deleted = 0;
      // console.log(req.query);
      const userData = await cmdMultipleQuery(
        `SELECT line_nm FROM tb_mt_member WHERE fname = '${req.query.name}'`
      );
      delete req.query.name;
      let lineOfUser = userData[0]?.line_nm;
      lineOfUser = lineOfUser ? lineOfUser.split(",")[0] : null;
      // CAM,CR,CH,CB,ASSY,LP,DC
      // console.log(lineOfUser);

      if (lineOfUser && req.query.INIT_COUNT == 0) {
        req.query.fline = lineOfUser;
      }
      delete req.query.INIT_COUNT;
      console.log(req.query);
      let whereCond = whereConditionQuery(req.query);
      let query = `SELECT fid as machine_id, fline as line_nm, fmc_name as machine_nm FROM tb_mc ${whereCond}`;
      // console.log(query);
      let machinesData = await cmdMultipleQuery(query);
      console.log(machinesData);
      let containerKyQueries = await machinesData.map(async (item) => {
        return `SELECT *, IF(ilustration IS NOT NULL, CONCAT('https://mt-system.id/image?path=', ilustration), null) as ilustration FROM tb_m_kymachine WHERE machine_id = ${item.machine_id}`;
      });

      let kyDataQueries = await Promise.all(containerKyQueries);
      let kyData = await cmdMultipleQuery(kyDataQueries.join(";"));

      let mapKyData = machinesData.map((item, i) => {
        // console.log(item);
        if (kyDataQueries.length == 1) {
          item.ky_data = kyData.length > 0 ? kyData : [];
          item.ky_total = kyData.length;
        } else {
          item.ky_data = kyData.length > 0 ? kyData[i] : [];
          item.ky_total = kyData.length > 0 ? kyData[i].length : 0;
        }
        return item;
      });
      response.success(res, "success to get machines ky", [
        mapKyData,
        req.query.fline,
      ]);
    } catch (error) {
      console.log(error);
      response.failed(res, "Error get ky");
    }
  },
  addKY: async (req, res) => {
    try {
      //
      const { machine_id, details, created_by, stop6_category } = req.body;
      
      // console.log(req.file);
      let path = null;
      if(req.file) {
        path = `${req.file.destination}${req.file.filename}`;
      }
      
      let q = `INSERT INTO 
        tb_m_kymachine(machine_id, details, created_by, stop6_category, ilustration) 
            VALUES 
        (${machine_id}, '${details}', '${created_by}', '${stop6_category}', ${req.file ? `'${path}'` : 'NULL'})`;
      const resInst = await cmdMultipleQuery(q);
      response.success(res, "inserted KY DATA", resInst);
    } catch (error) {
      console.log(error);
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
