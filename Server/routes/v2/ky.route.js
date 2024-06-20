const {
  getKY,
  addKY,
  editKY,
  deleteKY,
} = require("../../controllers/v2/ky/ky.controllers");

const router = require("express").Router();

router.get("/get", getKY);
router.post("/add", addKY);
router.put("/edit", editKY);
router.delete("/delete/:id", deleteKY);

module.exports = router;
