const router = require("express").Router();
const controller = require("../../controller/appointments/appointments.controller.js")

router.post("/appointment/:hospitalId", controller.bookAppointment);
router.get("/show/appointments/:hospitalId", controller.showAppointments)

module.exports = router;