const cmdMultipleQuery = require('../../config/MultipleQueryConnection');
const response = require('../../helpers/response')

module.exports = {
    getProblem: async(req, res) => {
        try {
            let { f_line } = req.query
            let q = `select prob_nm from tb_m_problem where line_nm = "${f_line}"`
            const problems = await cmdMultipleQuery(q)
            const mapProb = await problems.map(problem => {
                return problem.prob_nm
            })
            response.success(res, 'GET PROBLEM', mapProb)
        } catch (error) {
            response.failed(res, 'Error get problem')
        }
    },
    addNewProblem: async(req, res) => {
        try {
            const { line_nm, prob_nm, created_by } = req.body
            let q = `INSERT INTO tb_m_problem(line_nm, prob_nm, created_by) VALUES ('${line_nm}', '${prob_nm}', '${created_by}')`
            const resInst = await cmdMultipleQuery(q)
            response.success(res, 'inserted', resInst)
        } catch (error) {
            response.failed(res, 'Error to add new problem')
        }
    }
}