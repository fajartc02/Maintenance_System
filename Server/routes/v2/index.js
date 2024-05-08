var router = require("express").Router();

const problemRoute = require("./problemRoute");
const { getLtbHistory } = require("../../controllers/v2/LTBHistory");

router.get("/ltb-history", getLtbHistory);

router.use("/master", problemRoute);

module.exports = router;
