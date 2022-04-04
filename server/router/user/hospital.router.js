const router = require("express").Router();
const controller = require("../../controller/user/hospital.controller.js");

router.get('/', controller.getAllHospitalsData);
router.get("/:hospitalId", controller.getSingleHospitalsData)


module.exports = router;