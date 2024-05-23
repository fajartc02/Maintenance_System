var router = require("express").Router();

const problemRoute = require("./problemRoute");
const { getLtbHistory } = require("../../controllers/v2/LTBHistory");
const {
  getGraphQ6,
} = require("../../controllers/v2/Q6/q6_anlysis.controllers");

router.get("/ltb-history", getLtbHistory);
router.get("/q6-analysis/graph", getGraphQ6);

router.use("/master", problemRoute);

module.exports = router;
