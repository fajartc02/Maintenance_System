const {
    getKY,
    addKY,
    editKY,
    deleteKY,
} = require("../../controllers/v2/ky/ky.controllers");
const uploadKyImg = require("../../functions/newUploadKy");

const router = require("express").Router();

router.get("/get", getKY);
router.post("/add", uploadKyImg.single("ilustration"), addKY);
router.put("/edit", uploadKyImg.single("ilustration"), editKY);
router.delete("/delete/:id", deleteKY);

module.exports = router;